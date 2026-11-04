from pathlib import Path
from html import escape
import json
site = Path(__file__).resolve().parent.parent / 'animal-generator'
audit = json.loads((site / 'animal-photos/fullbody-audit.json').read_text())
ready = [x for x in audit if x['fullBody'] and x['clear']]
pending = [x for x in audit if not x['fullBody']]
cards = []
for x in ready:
    label = 'Replaced' if x['status'] == 'replaced' else 'Approved original'
    src = '../' + x['path']
    cards.append(f'<article><a href="{escape(src)}"><img src="{escape(src)}" alt="{escape(x["name"])}" loading="lazy"></a><div><h2>{escape(x["name"])}</h2><p><i>{escape(x["scientificName"])}</i></p><small>{label} · <a href="{escape(x["source"])}">Photo source</a></small></div></article>')
style = '*{box-sizing:border-box}body{margin:0;background:#faf7f1;color:#202a39;font:14px/1.6 system-ui,sans-serif}main{max-width:1300px;margin:32px auto;padding:0 24px}a{color:inherit;text-underline-offset:3px}h1{font:38px/1.1 Georgia,serif;margin:26px 0 16px}h2{font:22px/1.2 Georgia,serif;margin:0 0 6px}p{color:#667080;margin:0 0 14px}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px;margin:26px 0}article{background:#fffefa;border:1px solid #e6e0d6;border-radius:14px;padding:12px;overflow:hidden}article>a{display:block;background:#f0eee8;border-radius:9px;padding:12px}img{display:block;width:100%;height:240px;object-fit:contain}article>div{padding:17px 4px 8px}article p{font-size:12px;margin:0 0 9px}small{font-size:10px;color:#667080}li{margin:5px 0}@media(max-width:600px){main{padding:0 16px}.grid{grid-template-columns:1fr}}'
html = '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>Local photo quality review</title><style>' + style + '</style></head><body><main><a href="/">← Generator</a><h1>Full-body photo review</h1>'
html += f'<p>Local QA view: {len(ready)} enabled photos; {len(pending)} await a suitable replacement and cannot appear in random results. Click a photograph to inspect the complete local file.</p><div class="grid">' + ''.join(cards) + '</div><details><summary>Species awaiting replacement (' + str(len(pending)) + ')</summary><ul>' + ''.join('<li>' + escape(x['name']) + ' — ' + escape(x['reason']) + '</li>' for x in pending) + '</ul></details></main></body></html>'
(site / 'debug').mkdir(exist_ok=True)
(site / 'debug/photo-review.html').write_text(html)
print(f'QA gallery: {len(ready)} approved; {len(pending)} excluded')
