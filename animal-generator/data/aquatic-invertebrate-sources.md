# Aquatic and invertebrate filter data

Reviewed on 2026-11-04. Scope: the 72 photo-backed catalog entries in Amphibians (16), Fish (22), and Invertebrates (34). The other catalog entries were outside this data pass.

The machine-readable records are in `aquatic-invertebrate-filter-data.json`. Each record retains the existing catalog ID, the catalog scientific name, broad filter tags, individually cited source URLs, and qualifications where needed. There are 133 per-record source references; repeated shared references are counted more than once. These are editorial filter classifications derived from the cited natural-history descriptions, not source-native database fields or newly collected biological measurements.

## Source method

- Read the geographic-range, habitat, physical-description and food-habits sections of 41 full Animal Diversity Web accounts. ADW pages that returned only a classification page or an HTML “404” were not treated as ecological accounts, even when their HTTP status was 200.
- Read the FishBase species summaries for all 22 fish, including Distribution, Size/Weight/Age and Biology. FishBase supplements ADW and supplies the six fish for which ADW did not have a full ecological account. Region classification follows native ranges rather than the separate introduced populations.
- Cross-check missing or problematic records with research papers, AMNH Amphibian Species of the World, New Zealand DOC and the New Zealand Herpetological Society, University of Bordeaux, University of British Columbia, Michigan State University, University of California IPM, Penn State Extension, the Marine Biological Association's MarLIN/BIOTIC, ECDC, SANBI, British Dragonfly Society, Natural History Society of Northumbria, Froglife, Wildlife Trusts, Woodland Trust, Naturalis, NatureServe, French FAUNA/INPN and the Rocky Mountain Biological Laboratory.
- Selected specialist/community material supplements institutional accounts: the expert-authored Store norske leksikon account for *Petrobius brevistylis*; NatureSpot's recorded measurements; the Insektarium field account for *Mitopus morio* feeding; Naturaleza Para Todos's field account for *Haploembia solieri*; and the European Lepidoptera ecology account for *Iphiclides podalirius*. These should not be described as newly verified primary research. The JSON titles identify these source types. No Wikipedia article is used as a final JSON source.
- The author-shared ResearchGate text of Poyarkov et al. (2012) was read for *Onychodactylus fischeri*, including the species' actual natural-history account (pp. 36–37). The publisher's freely downloadable cover/abstract PDF alone does not contain that evidence and is not substituted for the full account.

## Classification rules

- Habitat can have more than one tag. Aquatic breeding/larval habitats are retained alongside terrestrial adult habitats for amphibians and aquatic insects. `ocean` covers marine water and the sea-shore/intertidal zone; for a terrestrial shore bristletail it does not mean a submerged adult. A UI label such as “Ocean & coast” expresses that distinction better than “Ocean” alone.
- Diet describes the usual adult feeding strategy. Insects, blood, fish, corals and zooplankton are animal food. Nectar, sap and algae are plant-derived food. Omnivory reflects substantial mixed plant/animal feeding rather than every incidental item. `detritivore` and `non-feeding` are retained where the original three-way diet split would be misleading.
- The four mayflies (*Baetis rhodani*, *B. fuscatus*, *Cloeon dipterum*, *Ephemera danica*) are `non-feeding` as adults. The larval algae/detritus diet is not shown as their adult diet. *Vampyroteuthis infernalis* is a detritivore based on MBARI's work on marine snow, superseding older speculative carnivory.
- Size bands use adult physical length: `small` <10 cm, `medium` 10 to <100 cm, `large` >=100 cm. Adult ranges that straddle a boundary may have more than one tag. Fish and tailed amphibians use conventional total length, not a tail-free mammalian measurement. Cephalopods use body/mantle rather than stretched feeding tentacles; coconut crabs use carapace length; the starfish uses arm-tip diameter; moon jellies use bell diameter; snails use shell/body dimensions. Notes preserve these exceptions.
- Wingspan and leg span are not substituted for insect/arachnid body length. The monarch and painted lady body sizes were cross-checked against the adult measurements in Aprelev et al. (2024), Table 1. For smaller butterflies whose accounts give only a wingspan under 10 cm, assignment to the small body band is a coarse morphological inference rather than a new exact body-length estimate.
- Region tags are broad, conservative native-range groupings. `oceans` is available for wide-ranging marine species. Introduced/captive populations are excluded. Region tags should not be presented as exact, exhaustive modern range maps.

## Corrections and limitations retained in records

- The older ADW German-cockroach account has an apparent centimetres/millimetres error. Michigan State University's 13–16 mm adult length was used instead.
- The older ADW sunfish diet label conflicts with its narrative. Animal-prey feeding in the narrative and FishBase was used instead of copying a herbivore label.
- The reedfish record follows FishBase's animal-prey description and approximately 37 cm documented standard-length maximum; FishBase explicitly identifies an older 90 cm report as likely erroneous.
- Historical Chinese giant salamander, electric eel, common octopus, moon-jelly, crown-of-thorns and burbot accounts can include taxonomic complexes. Records retain catalog names and broad tags, with explicit notes rather than inventing precise modern distributions for every split species.
- Fire salamanders use the conservative European range, excluding older accounts' North African/Middle Eastern populations now placed in other species. Scarce swallowtail excludes the North African/Iberian *Iphiclides feisthamelii* treatment.
- *Cloeon dipterum* origin in North America is disputed in the cited literature; the North American tag is omitted. *Labidura riparia* uses the recording scheme's explicit native central/southern European region; its many other coastal records are not silently assumed to establish native origin everywhere.
- *Chelifer cancroides* has cosmopolitan synanthropic records and an imperfectly reconstructed original range. The region tags are conservative documented European/North American core/native records, not an exhaustive origin claim.
- For some species, a documented large adult length crosses a size boundary while most adults are in the smaller band. Multiple tags mean the species has documented adults in both bands, not that every individual matches both sizes.

## Deliberately empty fields

| Catalog animal | Field | Reason |
| --- | --- | --- |
| Firebrat, *Thermobia domestica* | `regions: []` | The 2024 taxonomic revision discusses competing original-range hypotheses. Present cosmopolitan indoor records do not prove a native continent. |

All 72 records have at least one habitat, diet and size tag and at least one cited source. The Firebrat native region is the only deliberately empty filter field. Default “all regions” should retain this animal; choosing a specific native region should exclude it rather than treating unknown origin as a match.
