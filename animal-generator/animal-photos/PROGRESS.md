# Animal photo sourcing progress

Last updated: 2026-10-30 (Asia/Shanghai)

| Stage | Progress | Status |
| --- | ---: | --- |
| Animal names and classifications | 340 total species | Includes the original catalog and verified Commons additions |
| Wikimedia Commons named candidates | 185 verified candidate files | Commons file metadata checked for license and source |
| Photos visually reviewed and approved | 259 | Close-up or unclear images excluded from the random pool |
| Local optimized WebP images wired into the page | 259/340 | Only records with a local image enter the random pool |

Approved files are in `approved/`. Creator, license, and source details are in `approved-manifest.json`, with matching animal records in `../animal-library.js`. The optimized image set is about 32.0 MB total. Result cards identify Wikimedia Commons as the image source; the Image Credits page lists each creator, license, and source page. Images are stored locally as WebP to avoid depending on third-party image hosts at page load.

Image counts by category: Amphibians: 16, Birds: 51, Fish: 22, Invertebrates: 34, Mammals: 109, Reptiles: 27.

The reusable builder preserves entries marked `curated: manual photo review` when rebuilding the earlier reviewed batch. Remaining catalog entries without photos stay out of the generator until a photo is checked and approved.
