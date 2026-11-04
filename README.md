# Animal Generator

A responsive random animal generator. Pick 1–10 animals from the photo-reviewed collection and filter by animal type, habitat, diet, adult size, and native region. New species are prioritized until the matching pool runs out; each batch contains unique species.

## Run locally

Run `python3 scripts/serve.py` and open [http://127.0.0.1:8765/](http://127.0.0.1:8765/). The local server supports the same extensionless page routes as Vercel. No dependencies or build step are needed to preview the site.

The generator loads the catalog from `animal-generator/animal-library.js`, filter metadata from `animal-generator/animal-filter-data.js`, and local WebP photos. It also works as a static site without a backend.

## Photo credits

Animal photos are served from local WebP files sourced from Wikimedia Commons. Creators, licenses, and source pages are listed in [`animal-image-credits.html`](animal-generator/animal-image-credits.html) and `animal-generator/animal-photos/approved-manifest.json`.

## Project files

- `animal-generator/index.html` — landing page and generator
- `animal-generator/about.html` — about page
- `animal-generator/animal-library.js` — categorized animal catalog
- `animal-generator/animal-photos/approved/` — reviewed, optimized photos used by the site
- `animal-generator/animal-image-credits.html` — photo attribution and licensing

## Filters and source data

- Selections within a group use OR; different groups use AND. Empty groups include all species, including records with an explicitly uncertain field.
- Size bands are product definitions based on documented adult length: under 10 cm, 10 cm to under 1 m, and 1 m or more. Measurement exceptions, native-range conventions and source discrepancies appear in the public `animal-data-sources.html` page.
- The three `animal-generator/data/*-filter-data.json` files are the editable research inputs. They cover 259 researched species, including those temporarily excluded while their photographs await full-body approval. The other 81 catalog entries do not yet have researched filter metadata. Research notes in the same directory preserve evidence and limitations.
- Two fields are deliberately uncertain: the diet of *Coleonyx fasciatus* and the native range of *Thermobia domestica*. These fields are not given guessed tags; species with an approved photo remain available when the corresponding filter is unrestricted.
- After changing research inputs, run `node scripts/build-animal-filter-data.cjs` to validate the records and regenerate `animal-filter-data.js` plus the public source page.

## Checks

Run `node --test animal-generator/tests/*.test.cjs` for filter combinations, actual species data, scoped no-repeat behavior, pool exhaustion and source coverage. Test the desktop toolbar and mobile filter sheet in a browser before publishing. Publishing to GitHub/Vercel is a separate approval step.

## Whole-body photo approval

A license check or an existing image file is not a visual approval. Inspect the original image for the correct species, a clear complete main-body outline, and no frame-cropped head, body, visible tail or limbs. Reject local-detail shots, illustrations, severe obstruction and unclear subjects. Natural folded wings or limbs behind the body are acceptable; a swimming animal with most of its body hidden is not.

The per-species decisions are in `animal-generator/animal-photos/review/*-fullbody-review.json`. To apply inspected replacements and exclude failed images, run `python3 scripts/apply-fullbody-reviews.py`, then rebuild filter data and run `python3 scripts/build-photo-review.py`. This requires Pillow. Excluded records retain `pendingPhoto`; they are not silently deleted from the catalog.

`animal-photos/fullbody-audit.json` binds every enabled image to a visual verdict and its SHA-256. The generator only enables `photo.fullBodyApproved === true`; the regression suite rejects missing, stale or changed-byte approvals. With the preview server running, `node scripts/check-photo-framing.cjs` uses ego-browser to check all enabled photos in the real multi-card grid and the single-card layout across desktop and mobile widths. Results are recorded in `animal-photos/review/framing-check.json`.

New iNaturalist photos are restricted to CC0, CC BY and CC BY-SA and checked against the exact species taxon. The platform's official [license module](https://github.com/inaturalist/inaturalist/blob/main/app/models/shared/license_module.rb) maps the API's `cc-by` and `cc-by-sa` codes to version 4.0, and CC0 to 1.0. Individual source pages and photographers are retained in the photo credits.

For a visual owner review, open the local-only QA gallery at `/debug/photo-review.html`. It is marked `noindex, nofollow` and is not linked from the public generator. It shows all currently approved photos without cropping and lists excluded species without displaying their rejected photos.
