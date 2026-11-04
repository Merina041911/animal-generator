"""Apply visual photo reviews, update credits, and exclude unapproved photographs."""
from pathlib import Path
from html import escape
from PIL import Image
import hashlib
import json
import re
import shutil

ROOT = Path(__file__).resolve().parent.parent
SITE = ROOT / 'animal-generator'
REVIEW = SITE / 'animal-photos/review'
library_path = SITE / 'animal-library.js'
animals = json.loads(library_path.read_text().split('=', 1)[1].strip().rstrip(';'))
reports = sorted(REVIEW.glob('*-fullbody-review.json'))
previous_audit_path = SITE / 'animal-photos/fullbody-audit.json'
previous_audit = {x['id']: x for x in json.loads(previous_audit_path.read_text())} if previous_audit_path.exists() else {}
reviews = {}
for filename in reports:
    for review in json.loads(filename.read_text()):
        if review['id'] in reviews:
            raise ValueError('Duplicate review: ' + review['id'])
        reviews[review['id']] = review

sha = lambda p: hashlib.sha256(p.read_bytes()).hexdigest()
audit = []
manifest = []
replaced = 0
for animal in animals:
    if not animal.get('image') and not animal.get('pendingPhoto'):
        continue
    review = reviews.get(animal['id'])
    if not review:
        raise ValueError('No visual review: ' + animal['name'])
    previous = animal.get('pendingPhoto') or {'image': animal['image'], 'photo': animal['photo']}
    target = SITE / review['oldPath']
    old_hash = previous.get('sha256') or previous_audit.get(animal['id'], {}).get('originalSha256') or sha(target)
    replacement = review.get('replacement')
    approved = review['verdict'] == 'pass' or bool(replacement)
    if replacement:
        source = SITE / replacement['path']
        if source.resolve() != target.resolve():
            shutil.copy2(source, target)
        photo = {key: replacement[key] for key in ['title', 'filePage', 'license', 'licenseUrl', 'artist', 'photoSource']}
        photo['artist'] = re.sub(r'^\(c\) (.*?), some rights reserved \(.*?\)$', r'\1', photo['artist'])
        if not photo['artist'] or not photo['filePage'] or not photo['license']:
            raise ValueError('Missing attribution: ' + animal['name'])
        replaced += 1
    else:
        photo = dict(previous['photo'])
    if approved:
        if (photo.get('licenseUrl') or '').startswith('http://creativecommons.org/'):
            photo['licenseUrl'] = photo['licenseUrl'].replace('http://', 'https://', 1)
        animal['image'] = review['oldPath']
        animal['photo'] = photo
        animal['photo'].update(fullBodyApproved=True, fullBodyReviewedOn='2026-11-04', fullBodySha256=sha(target))
        animal.pop('pendingPhoto', None)
        with Image.open(target) as image:
            width, height = image.size
        manifest.append({'id': animal['id'], 'name': animal['name'], 'scientificName': animal['scientificName'], 'path': animal['image'], 'bytes': target.stat().st_size, 'width': width, 'height': height, 'license': photo['license'], 'licenseUrl': photo.get('licenseUrl', ''), 'creator': photo['artist'], 'source': photo['filePage'], 'photoSource': photo.get('photoSource', 'Wikimedia Commons'), 'sha256': sha(target), 'fullBodyApproved': True})
    else:
        previous['sha256'] = old_hash
        animal['pendingPhoto'] = previous
        animal.pop('image', None)
        animal.pop('photo', None)
    audit.append({'id': animal['id'], 'name': animal['name'], 'scientificName': animal['scientificName'], 'path': review['oldPath'], 'sha256': sha(target), 'fullBody': approved, 'clear': approved, 'status': 'replaced' if replacement else 'approved-original' if approved else 'pending-replacement', 'reviewedOn': '2026-11-04', 'reason': review['reason'], 'source': photo['filePage'] if approved else previous['photo'].get('filePage', ''), 'originalSha256': old_hash})

library_path.write_text('window.ANIMAL_LIBRARY = ' + json.dumps(animals, ensure_ascii=False, indent=2) + ';\n')
(SITE / 'animal-photos/fullbody-audit.json').write_text(json.dumps(audit, ensure_ascii=False, indent=2) + '\n')
(SITE / 'animal-photos/approved-manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
active = len(manifest)
pending = len(audit) - active
# Keep crawlable counts consistent with the actual enabled, approved photo pool.
p = SITE / 'index.html'
s = p.read_text()
s = re.sub(r'\d+ photo-verified species', f'{active} photo-verified species', s)
s = re.sub(r'generate \d+ species with reviewed photos', f'generate {active} species with reviewed photos', s)
s = re.sub(r'There are \d+ photo-backed species', f'There are {active} photo-backed species', s)
s = s.replace('Photos are sourced from Wikimedia Commons.', 'Photos are sourced from Wikimedia Commons and iNaturalist.')
s = s.replace('with images sourced from Wikimedia Commons.', 'with images sourced from Wikimedia Commons and iNaturalist.')
s = s.replace('Animal photos are sourced from Wikimedia Commons.', 'Animal photos are sourced from Wikimedia Commons and iNaturalist.')
p.write_text(s)
about = SITE / 'about.html'
s = about.read_text()
s = re.sub(r'picks from \d+ species with reviewed photos', f'picks from {active} species with reviewed full-body photos', s)
s = re.sub(r'include \d+ species with reviewed photos', f'include {active} species with reviewed full-body photos', s)
s = re.sub(r'picks from \d+ species with reviewed full-body photos', f'picks from {active} species with reviewed full-body photos', s)
s = re.sub(r'include \d+ species with reviewed full-body photos', f'include {active} species with reviewed full-body photos', s)
s = s.replace('Wikimedia Commons</a> ·', 'Wikimedia Commons</a> and <a href="https://www.inaturalist.org/">iNaturalist</a> ·')
about.write_text(s)
rows = []
for animal in animals:
    if not animal.get('image'):
        continue
    photo = animal['photo']
    license_text = escape(photo['license'])
    license_html = f'<a href="{escape(photo["licenseUrl"])}" rel="noreferrer">{license_text}</a>' if (photo.get('licenseUrl') or '').startswith('https://') else license_text
    rows.append(f'<tr><td>{escape(animal["name"])} <i>({escape(animal["scientificName"])})</i></td><td>{escape(photo["artist"])}</td><td>{license_html}</td><td><a href="{escape(photo["filePage"])}" rel="noreferrer">{escape(photo.get("photoSource", "Source"))}</a></td></tr>')
credits = '''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Creators, licenses and source pages for full-body animal photographs used by Animal Generator."><link rel="canonical" href="https://animal-generator.net/animal-image-credits"><title>Animal Photo Credits — Animal Generator</title><style>body{margin:0;background:#faf7f1;color:#202a39;font:15px/1.6 system-ui,sans-serif}main{max-width:1000px;margin:60px auto;padding:0 24px}h1{font:500 44px/1.1 Georgia,serif}p{color:#667080;max-width:740px}a{color:#bc482f}.table-wrap{overflow-x:auto}table{width:100%;border-collapse:collapse;margin-top:28px;background:#fffefa}th,td{text-align:left;padding:12px;border-bottom:1px solid #e6e0d6;vertical-align:top}th{font-size:12px}td{font-size:12px;overflow-wrap:anywhere}@media(max-width:680px){main{margin:35px auto;padding:0 16px}h1{font-size:34px}th,td{padding:8px 5px}}</style></head><body><main><p><a href="/">← Back to Animal Generator</a></p><h1>Animal photo credits</h1>'''
credits += f'<p>The generator currently uses {active} photographs reviewed for a clear, complete animal. Sources include Wikimedia Commons and iNaturalist. Images are resized and converted to WebP without cropping the subject; each source license applies to its corresponding photograph.</p><p>Photos that fail the whole-body review stay out of the random pool until a suitable replacement is approved. <a href="/animal-data-sources">Species data sources</a>.</p><div class="table-wrap"><table><thead><tr><th>Animal</th><th>Creator</th><th>License</th><th>Source</th></tr></thead><tbody>' + ''.join(rows) + '</tbody></table></div></main></body></html>\n'
(SITE / 'animal-image-credits.html').write_text(credits)
progress = f'''# Animal photo quality review

Reviewed on 2026-11-04. The previous approved list did not meet the full-body requirement and has been replaced by a byte-bound visual audit.

- {len(audit)} original photos reviewed individually.
- {active} enabled photos: {active - replaced} retained originals and {replaced} approved replacements.
- {pending} species remain in the catalog with `pendingPhoto`, excluded from generation until a clear full-body replacement is approved.
- Photo geometry uses `object-fit: contain`, with padding; category labels sit outside generated photographs.
- `fullbody-audit.json` records the exact SHA-256, verdict, reason and date. A changed file invalidates its previous approval in the regression checks.
- All enabled photos also appear in `approved-manifest.json` and the public photo credit page.

Before enabling a photo: visually inspect the original at useful resolution; check species identity, complete main body outline, clarity, source and license; regenerate the manifest and run the photo approval and framing checks. A licensing record or a successful image load alone is not a visual approval.
'''
(SITE / 'animal-photos/PROGRESS.md').write_text(progress)
print(f'Enabled {active} full-body photos ({replaced} replaced); {pending} pending replacements. No push performed.')
