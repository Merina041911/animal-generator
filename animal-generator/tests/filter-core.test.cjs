const test = require('node:test');
const assert = require('node:assert/strict');
const { filters, matchesFilters, pickAnimals } = require('../animal-filter-core.js');
const animal = (name, category, traits = {}) => ({ id: name, scientificName: name, category, filterData: traits });
const lion = animal('lion', 'Mammals', { habitats: ['grassland', 'forest'], diets: ['carnivore'], sizes: ['large'], regions: ['africa'] });
const eagle = animal('eagle', 'Birds', { habitats: ['forest'], diets: ['carnivore'], sizes: ['medium', 'large'], regions: ['north-america'] });
const frog = animal('frog', 'Amphibians', { habitats: ['freshwater', 'wetland'], diets: ['carnivore'], sizes: ['small'], regions: ['europe'] });

test('all five filters combine OR within a group and AND across groups', () => {
  const selection = { category: ['Mammals', 'Birds'], habitats: ['grassland', 'forest'], diets: ['carnivore'], sizes: ['large'], regions: ['africa'] };
  assert.equal(matchesFilters(lion, selection), true);
  assert.equal(matchesFilters(eagle, selection), false);
  assert.equal(matchesFilters(frog, selection), false);
  assert.equal(matchesFilters(eagle, { ...selection, regions: [] }), true);
});

test('unrestricted fields include uncertain records without inventing a region', () => {
  const unknown = animal('uncertain-origin', 'Invertebrates', { regions: [] });
  assert.equal(matchesFilters(unknown, {}), true);
  assert.equal(matchesFilters(unknown, { regions: ['europe'] }), false);
  assert.equal(matchesFilters(unknown, { diets: ['omnivore'] }), false);
});

test('new dietary groups are selectable independently', () => {
  assert.ok(filters.find((filter) => filter.key === 'diets').options.some(([value]) => value === 'non-feeding'));
  assert.ok(filters.find((filter) => filter.key === 'diets').options.some(([value]) => value === 'detritivore'));
});

test('generations use unseen matches first and do not mutate inputs', () => {
  const pool = [lion, eagle, frog];
  const history = new Set(['lion', 'unrelated animal']);
  const result = pickAnimals(pool, 2, history, () => 0.5);
  assert.equal(result.selected.length, 2);
  assert.ok(result.selected.every((entry) => entry.scientificName !== 'lion'));
  assert.equal(result.startedNewRound, false);
  assert.deepEqual([...history], ['lion', 'unrelated animal']);
  assert.equal(pool[0], lion);
});

test('exhausting a filtered pool fills a batch without duplicates and preserves other history', () => {
  const result = pickAnimals([lion, eagle, frog], 3, ['lion', 'eagle', 'unrelated animal'], () => 0);
  assert.equal(result.selected[0], frog);
  assert.equal(new Set(result.selected.map((entry) => entry.id)).size, 3);
  assert.equal(result.startedNewRound, true);
  assert.ok(result.seen.has('unrelated animal'));
});

test('a fully exhausted narrow filter resets only its own pool', () => {
  const result = pickAnimals([lion], 10, ['lion', 'eagle'], () => 0);
  assert.deepEqual(result.selected, [lion]);
  assert.equal(result.startedNewRound, true);
  assert.ok(result.seen.has('eagle'));
});

test('empty pools return an empty result', () => {
  const result = pickAnimals([], 10, ['lion']);
  assert.deepEqual(result.selected, []);
  assert.deepEqual([...result.seen], ['lion']);
});

test('batch size is bounded by the unique pool for every supported requested quantity', () => {
  for (let size = 1; size <= 12; size += 1) {
    const pool = Array.from({ length: size }, (_, i) => animal(`species-${i}`, 'Birds'));
    for (let requested = 1; requested <= 10; requested += 1) {
      const result = pickAnimals(pool, requested, pool.slice(0, size - 1).map((entry) => entry.scientificName), () => 0.25);
      assert.equal(result.selected.length, Math.min(size, requested));
      assert.equal(new Set(result.selected.map((entry) => entry.id)).size, result.selected.length);
    }
  }
});
