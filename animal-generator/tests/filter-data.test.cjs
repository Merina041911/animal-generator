const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { filters, matchesFilters } = require('../animal-filter-core.js');
const site = path.resolve(__dirname, '..');
const context = { window: {} };
for (const filename of ['animal-library.js', 'animal-filter-data.js']) vm.runInNewContext(fs.readFileSync(path.join(site, filename), 'utf8'), context);
const library = context.window.ANIMAL_LIBRARY;
const data = context.window.ANIMAL_FILTER_DATA;
const lookup = new Map(data.map((entry) => [entry.id, entry]));
const animals = library.filter((animal) => animal.image || animal.pendingPhoto).map((animal) => ({ ...animal, filterData: lookup.get(animal.id) }));
const find = (name) => animals.find((animal) => animal.scientificName === name);

test('every researched species has one sourced metadata record', () => {
  assert.equal(animals.length, 259);
  assert.equal(data.length, animals.length);
  assert.equal(lookup.size, data.length);
  assert.equal(library.length, 340);
  for (const animal of animals) {
    assert.ok(animal.filterData, animal.name);
    assert.equal(animal.filterData.scientificName, animal.scientificName);
    assert.ok(animal.filterData.sources.length > 0, animal.name);
    for (const key of ['habitats', 'diets', 'sizes', 'regions']) {
      const values = animal.filterData[key];
      const allowed = new Set(filters.find((filter) => filter.key === key).options.map(([value]) => value));
      assert.ok(Array.isArray(values));
      assert.ok(values.every((value) => allowed.has(value)), `${animal.name}: ${key}`);
      assert.equal(values.length, new Set(values).size);
      if (values.length === 0) assert.ok(animal.filterData.notes, `${animal.name}: unexplained ${key}`);
    }
  }
});

test('actual species satisfy a five-dimensional filter and clear exclusions', () => {
  const selection = { category: ['Mammals'], habitats: ['grassland'], diets: ['carnivore'], sizes: ['large'], regions: ['africa'] };
  assert.equal(matchesFilters(find('Panthera leo'), selection), true);
  assert.equal(matchesFilters(find('Panthera tigris'), selection), false);
  assert.equal(matchesFilters(find('Chelonia mydas'), selection), false);
});

test('plant-based panda, non-feeding mayflies and detritivore squid keep distinct diets', () => {
  assert.equal(matchesFilters(find('Ailuropoda melanoleuca'), { diets: ['herbivore'] }), true);
  assert.equal(matchesFilters(find('Ephemera danica'), { diets: ['non-feeding'] }), true);
  assert.equal(matchesFilters(find('Vampyroteuthis infernalis'), { diets: ['detritivore'] }), true);
});

test('unknown facts remain included by default and are not converted into guessed tags', () => {
  const firebrat = find('Thermobia domestica');
  const gecko = find('Coleonyx fasciatus');
  assert.equal(firebrat.filterData.regions.length, 0);
  assert.equal(gecko.filterData.diets.length, 0);
  assert.equal(matchesFilters(firebrat, {}), true);
  assert.equal(matchesFilters(firebrat, { regions: ['europe'] }), false);
  assert.equal(matchesFilters(gecko, { diets: ['carnivore'] }), false);
});

test('corrected scientific names and every species source anchor are present', () => {
  assert.ok(find('Megaptera novaeangliae'));
  assert.ok(find('Emys orbicularis'));
  assert.equal(find('Balaenoptera novaeangliae'), undefined);
  const html = fs.readFileSync(path.join(site, 'animal-data-sources.html'), 'utf8');
  for (const animal of animals) assert.ok(html.includes(`id="${animal.id}"`), animal.name);
});
