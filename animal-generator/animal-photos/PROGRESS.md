# Animal photo quality review

Reviewed on 2026-11-04. The previous approved list did not meet the full-body requirement and has been replaced by a byte-bound visual audit.

- 259 original photos reviewed individually.
- 231 enabled photos: 145 retained originals and 86 approved replacements.
- 28 species remain in the catalog with `pendingPhoto`, excluded from generation until a clear full-body replacement is approved.
- Photo geometry uses `object-fit: contain`, with padding; category labels sit outside generated photographs.
- `fullbody-audit.json` records the exact SHA-256, verdict, reason and date. A changed file invalidates its previous approval in the regression checks.
- All enabled photos also appear in `approved-manifest.json` and the public photo credit page.

Before enabling a photo: visually inspect the original at useful resolution; check species identity, complete main body outline, clarity, source and license; regenerate the manifest and run the photo approval and framing checks. A licensing record or a successful image load alone is not a visual approval.
