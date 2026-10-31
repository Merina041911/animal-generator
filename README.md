# Animal Generator

A responsive random animal generator. Pick 1–10 animals from the photo-reviewed collection, with no repeats until the pool runs out.

## Run locally

Open `animal-generator/index.html` in a browser, or serve this directory with any static web server. The page loads the animal catalog from `animal-generator/animal-library.js` and photos from `animal-generator/animal-photos/approved/`.

## Photo credits

Animal photos are served from local WebP files sourced from Wikimedia Commons. Creators, licenses, and source pages are listed in [`animal-image-credits.html`](animal-generator/animal-image-credits.html) and `animal-generator/animal-photos/approved-manifest.json`.

## Project files

- `animal-generator/index.html` — landing page and generator
- `animal-generator/about.html` — about page
- `animal-generator/animal-library.js` — categorized animal catalog
- `animal-generator/animal-photos/approved/` — reviewed, optimized photos used by the site
- `animal-generator/animal-image-credits.html` — photo attribution and licensing
