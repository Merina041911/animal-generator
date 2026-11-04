const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { filters } = require('../animal-generator/animal-filter-core.js');
const site = path.resolve(__dirname, '../animal-generator');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(site, 'animal-library.js'), 'utf8'), context);
const animals = context.window.ANIMAL_LIBRARY.filter((animal) => animal.image || animal.pendingPhoto);
const enabledCount = animals.filter((animal) => animal.image && animal.photo?.fullBodyApproved).length;
const filenames = ['mammals-filter-data.json', 'birds-reptiles-filter-data.json', 'aquatic-invertebrate-filter-data.json'];
const entries = filenames.flatMap((name) => JSON.parse(fs.readFileSync(path.join(site, 'data', name), 'utf8')));
const data = new Map();
const allowed = Object.fromEntries(filters.map(({ key, options }) => [key, new Set(options.map(([value]) => value))]));
for (const entry of entries) {
  if (data.has(entry.id)) throw new Error(`Duplicate id: ${entry.id}`);
  if (!animals.some((animal) => animal.id === entry.id)) throw new Error(`Unrecognized animal: ${entry.id}`);
  for (const key of ['habitats', 'diets', 'sizes', 'regions']) {
    if (!Array.isArray(entry[key]) || entry[key].some((value) => !allowed[key].has(value))) throw new Error(`Invalid ${key}: ${entry.scientificName}`);
    if (entry[key].length === 0 && !entry.notes) throw new Error(`Missing ${key} without explanation: ${entry.scientificName}`);
    if (new Set(entry[key]).size !== entry[key].length) throw new Error(`Duplicate ${key}: ${entry.scientificName}`);
  }
  if (!entry.sources?.length || entry.sources.some((source) => !source.title || !/^https:\/\//.test(source.url))) throw new Error(`Missing source: ${entry.scientificName}`);
  data.set(entry.id, entry);
}
const ordered = animals.map((animal) => {
  const entry = data.get(animal.id);
  if (!entry) throw new Error(`Missing metadata: ${animal.name}`);
  return { ...entry, scientificName: animal.scientificName };
});
fs.writeFileSync(path.join(site, 'animal-filter-data.js'), '// Generated from data/*-filter-data.json by scripts/build-animal-filter-data.cjs.\nwindow.ANIMAL_FILTER_DATA = ' + JSON.stringify(ordered, null, 2) + ';\n');
const escape = (value) => String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const labelFor = (key, value) => filters.find((filter) => filter.key === key).options.find(([option]) => option === value)[1];
const records = animals.map((animal) => {
  const entry = data.get(animal.id);
  const traits = ['habitats', 'diets', 'sizes', 'regions'].map((key) => `<div><dt>${escape(filters.find((filter) => filter.key === key).label)}</dt><dd>${entry[key].length ? entry[key].map((value) => escape(labelFor(key, value))).join(', ') : 'Uncertain — see species notes'}</dd></div>`).join('');
  const sources = entry.sources.map((source) => `<li><a href="${escape(source.url)}" rel="noopener noreferrer">${escape(source.title)}</a></li>`).join('');
  return `<article id="${escape(animal.id)}"><h2>${escape(animal.name)}</h2><p class="latin">${escape(animal.scientificName)}</p><dl>${traits}</dl>${entry.notes ? `<p class="note">${escape(entry.notes)}</p>` : ''}<ul>${sources}</ul><a class="back" href="#top">Back to top</a></article>`;
}).join('\n');
const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Animal Data Sources &amp; Filter Definitions | Animal Generator</title><meta name="description" content="Species-level references, native-range notes and definitions for the Animal Generator habitat, diet, size and region filters."><link rel="canonical" href="https://animal-generator.net/animal-data-sources"><link rel="icon" type="image/x-icon" sizes="16x16 32x32 48x48 64x64 128x128" href="/favicon.ico" /><link rel="icon" type="image/png" sizes="200x200" href="/assets/animal-generator-logo.png" /><style>
:root{color-scheme:light}*{box-sizing:border-box}body{margin:0;background:#faf7f1;color:#202a39;font:15px/1.7 system-ui,sans-serif}.shell{max-width:960px;margin:auto;padding:30px 24px 60px}a{color:inherit;text-underline-offset:3px}.nav{display:flex;justify-content:space-between;border-bottom:1px solid #e6e0d6;padding-bottom:22px;gap:16px}.nav a{font-size:13px}h1,h2{font-family:Georgia,serif;line-height:1.2;letter-spacing:-.035em}h1{font-size:42px;margin:44px 0 20px}h2{font-size:25px;margin:0}p{max-width:800px}.intro{color:#667080}.method{padding:20px 24px;border:1px solid #e6e0d6;border-radius:12px;background:#fffefa;margin:26px 0 36px}.method h2{font-size:22px}.method li{margin:8px 0}article{scroll-margin-top:22px;border-top:1px solid #e6e0d6;padding:28px 0}.latin{font:italic 14px Georgia,serif;color:#667080;margin:8px 0 18px}dl{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px 24px}dt{font-size:11px;font-weight:700;color:#667080}dd{margin:2px 0 0;font-size:13px}article ul{font-size:12px;padding-left:20px}.note{font-size:12px;line-height:1.7}.back{font-size:11px;color:#667080}@media(max-width:550px){h1{font-size:33px}dl{grid-template-columns:1fr}.method{padding:18px}}
</style></head><body><main class="shell" id="top"><nav class="nav" aria-label="Main navigation"><a href="/">← Animal Generator</a><a href="/animal-image-credits">Photo credits</a></nav><h1>Animal data, with a paper trail.</h1><p class="intro">References and classification notes for ${animals.length} researched species in the photo catalog; ${enabledCount} currently have an enabled full-body photograph. Research reviewed on November 4, 2026. These broad filters help you discover animals; they are not a complete ecological or taxonomic database.</p><section class="method"><h2>How the filters are defined</h2><ul><li><strong>Habitat:</strong> broad environments a species regularly uses. Multiple labels can apply. Urban &amp; farmland includes human-modified settings.</li><li><strong>Diet:</strong> common adult diet. Insect-eaters are carnivores; mixed plant and animal diets are omnivorous. Detritivores eat organic debris. Non-feeding adults are listed separately instead of inheriting their larval diet.</li><li><strong>Size:</strong> small under 10 cm; medium from 10 cm to under 1 m; large from 1 m. We use adult head–body length for land mammals, body length rather than wingspan for birds, and total length for reptiles and fish. Invertebrates use body length or the documented shell/bell diameter, with exceptions in species notes. Ranges that cross a threshold can appear in multiple bands.</li><li><strong>Region:</strong> native wild ranges, including migration; Central America and Greenland count as North America. Introduced populations are generally excluded. Domestic distributions and uncertain origins are identified in species notes. World oceans is a marine range label, not a continent.</li><li><strong>Evidence:</strong> source pages below support each species record. Tags summarize those accounts; they are editorial mappings rather than direct quotations. Historic taxonomy, source discrepancies and uncertainty are retained in the notes. Uncertain fields match only when that filter group is left unrestricted.</li></ul></section>${records}</main></body></html>\n`;
fs.writeFileSync(path.join(site, 'animal-data-sources.html'), html);
const missing = ordered.flatMap((entry) => ['habitats', 'diets', 'sizes', 'regions'].filter((key) => entry[key].length === 0).map((key) => `${entry.scientificName}: ${key}`));
console.log(`Built ${ordered.length} sourced records; ${missing.length} uncertain fields${missing.length ? '\n' + missing.join('\n') : ''}.`);
