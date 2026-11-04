const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const vm = require('node:vm');
const site = path.resolve(__dirname, '..');
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(site, 'animal-library.js'), 'utf8'), context);
const animals = context.window.ANIMAL_LIBRARY.filter((animal) => animal.image);
const sha256 = (file) => crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');

test('the golden eagle feet-only photograph never enters the generator again', () => {
  const eagle = animals.find((animal) => animal.scientificName === 'Aquila chrysaetos');
  assert.notEqual(sha256(path.join(site, eagle.image)), 'c1841d432d5ad20c85ea7c8be74d27aa5b414c4d2362c557ae61dbacaba7b841', 'Golden eagle photograph contains only feet, not a whole animal');
});

test('every enabled photograph has a full-body visual approval matching its actual bytes', () => {
  const filename = path.join(site, 'animal-photos/fullbody-audit.json');
  assert.ok(fs.existsSync(filename), 'A completed image-by-image full-body audit is required');
  const approvals = new Map(JSON.parse(fs.readFileSync(filename, 'utf8')).map((entry) => [entry.id, entry]));
  for (const animal of animals) {
    const review = approvals.get(animal.id);
    assert.equal(animal.photo?.fullBodyApproved, true, `Missing explicit photo approval: ${animal.name}`);
    assert.equal(animal.photo.fullBodySha256, sha256(path.join(site, animal.image)), `Photo approval bytes changed: ${animal.name}`);
    assert.ok(review, `No review: ${animal.name}`);
    assert.equal(review.fullBody, true, `Whole-body review failed: ${animal.name}`);
    assert.equal(review.clear, true, `Clarity review failed: ${animal.name}`);
    assert.equal(review.path, animal.image, `Review references an older image: ${animal.name}`);
    assert.equal(review.sha256, sha256(path.join(site, animal.image)), `Image changed after review: ${animal.name}`);
  }
});
