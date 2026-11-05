# Data and photo maintenance

[Back to the project overview](../README.md)

Run the commands below from the repository root. This guide covers the research inputs, generated files, and visual approval process used to maintain the collection.

## Filters and source data

- Selections within a group use OR; different groups use AND. Empty groups include all species, including records with an explicitly uncertain field.
- Size bands are product definitions based on documented adult length: under 10 cm, 10 cm to under 1 m, and 1 m or more. Measurement exceptions, native-range conventions and source discrepancies appear in the public `animal-data-sources.html` page.
- The three `animal-generator/data/*-filter-data.json` files are the editable research inputs. They cover 259 researched species, including those temporarily excluded while their photographs await full-body approval. The other 81 catalog entries do not yet have researched filter metadata. Research notes in the same directory preserve evidence and limitations.
- Two fields are deliberately uncertain: the diet of *Coleonyx fasciatus* and the native range of *Thermobia domestica*. These fields are not given guessed tags; species with an approved photo remain available when the corresponding filter is unrestricted.
- After changing research inputs, run `node scripts/build-animal-filter-data.cjs` to validate the records and regenerate `animal-filter-data.js` plus the public source page.

## Whole-body photo approval

A license check or an existing image file is not a visual approval. Inspect the original image for the correct species, a clear complete main-body outline, and no frame-cropped head, body, visible tail or limbs. Reject local-detail shots, illustrations, severe obstruction and unclear subjects. Natural folded wings or limbs behind the body are acceptable; a swimming animal with most of its body hidden is not.

The per-species decisions are in `animal-generator/animal-photos/review/*-fullbody-review.json`. To apply inspected replacements and exclude failed images, run `python3 scripts/apply-fullbody-reviews.py`, then rebuild filter data and run `python3 scripts/build-photo-review.py`. This requires Pillow. Excluded records retain `pendingPhoto`; they are not silently deleted from the catalog.

`animal-generator/animal-photos/fullbody-audit.json` binds every enabled image to a visual verdict and its SHA-256. The generator only enables `photo.fullBodyApproved === true`; the regression suite rejects missing, stale or changed-byte approvals. With the preview server running, `node scripts/check-photo-framing.cjs` uses ego-browser to check all enabled photos in the real multi-card grid and the single-card layout across desktop and mobile widths. Results are recorded in `animal-generator/animal-photos/review/framing-check.json`.

New iNaturalist photos are restricted to CC0, CC BY and CC BY-SA and checked against the exact species taxon. The platform's official [license module](https://github.com/inaturalist/inaturalist/blob/main/app/models/shared/license_module.rb) maps the API's `cc-by` and `cc-by-sa` codes to version 4.0, and CC0 to 1.0. Individual source pages and photographers are retained in the photo credits.

For a visual owner review, open the local-only QA gallery at `/debug/photo-review.html`. It is marked `noindex, nofollow` and is not linked from the public generator. It shows all currently approved photos without cropping and lists excluded species without displaying their rejected photos.

## Validation before publishing

```bash
node --test animal-generator/tests/*.test.cjs
```

The suite covers filter combinations, actual species data, scoped no-repeat behavior, pool exhaustion, source coverage, and photo approval integrity. Test the desktop toolbar and mobile filter sheet in a browser as well; automated checks do not replace visual review.
