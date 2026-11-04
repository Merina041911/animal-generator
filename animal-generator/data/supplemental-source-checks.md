# Supplemental source checks for bird and reptile filters

Checked 2026-11-04. This note records targeted follow-up research requested by the bird/reptile data owner. It does not modify that owner's JSON. Values below are paraphrased facts; source prose is not reproduced.

## Confirmed length evidence

| Catalog species | Length evidence and product implication | Actual source checked | Qualification |
| --- | --- | --- | --- |
| *Passer montanus* | Body length 14 cm; medium. Wingspan is separately reported, so it is not being substituted for length. | [MME / BirdLife Hungary species database](https://mme.hu/en/magyarorszagmadarai/madaradatbazis-pasmon); [American University of Armenia, Acopian Center field guide](https://www.acopiancenter.am/boa.asp?id=347) | MME is the national BirdLife partner. The Acopian text was available in search extraction; a later direct open returned HTTP 403. |
| *Tachybaptus ruficollis* | Length 25–29 cm; medium. Wingspan is a separate measurement. | [Kent Wildlife Trust, Little grebe](https://kentwildlifetrust.org.uk/wildlife-explorer/birds/grebes-and-divers/little-grebe) | Institutional wildlife account, directly opened. The page also supports freshwater/wetland habitat and animal-food feeding. |
| *Parus major* | Body length 14 cm; medium. | [MME / BirdLife Hungary, Great Tit](https://www.mme.hu/en/magyarorszagmadarai/madaradatbazis-parmaj) | Directly opened and checked the body-length row, rather than using wing measurements or an uncited common-knowledge value. |
| *Natrix natrix* | Typical male lengths 60–70 cm and female lengths 80–100 cm; unusually large individuals reach 2 m. Medium and large categories are supported by reported adult sizes. | [Donau-Auen National Park, Grass Snake](https://www.donauauen.at/en/facts/nature-science/fauna-engl/grass-snake); [Natural History Museum of Crete](https://helecos9.nhmc.uoc.gr/en/museum/photo-archive/selection/images/nhmc.image.32442) | Donau-Auen explicitly identifies *Natrix natrix natrix*, not the separately recognized British *Natrix helvetica*. The museum corroborates the usual sub-1 m and exceptional 2 m values. |
| *Amblyrhynchus cristatus* | Average size 0.7 m and maximum 1.5 m; medium and large under a reptile total-length convention. | [Galapagos Conservation Trust, Marine iguana](https://galapagosconservation.org.uk/species/marine-iguana/); [GCT research project, Iguanas from Above](https://galapagosconservation.org.uk/our-work/projects/iguanas-from-above/) | The organization participates in marine-iguana research. The source's general “size” field does not explicitly define SVL versus total length; it must not be represented as a 1.5 m head-body/SVL measurement. |
| *Ortalis cinereiceps* | Length 46–58 cm; medium. | [Taiwan Ministry of Education / National Academy for Educational Research encyclopedia](https://pedia.cloud.edu.tw/Entry/Detail?title=%E5%B0%8F%E7%81%B0%E9%A0%AD%E7%A8%9A%E5%86%A0%E9%9B%89) | This is a checked institutional reference compilation, not a modern field measurement study. Its 2007 entry is adequate for the broad length bin; it is not used to establish the present complete geographic range. |

### Original field-guide corroboration for *Ortalis cinereiceps*

Bertha Bement Sturgis, *Field Book of Birds of the Panama Canal Zone* (1928), reports approximately 560 mm for the species and separately gives tail length. This agrees with the institutional 46–58 cm interval. The original text was found in a scanned copy; bibliographic identity was independently checked against the National Agricultural Library record served through FAO AGRIS.

- [Original scanned field guide, Panama National Library](https://bdigital.binal.ac.pa/bdp/birds%20of%20Panama.pdf)
- [NAL bibliographic record through FAO AGRIS](https://agris.fao.org/search/en/providers/122535/records/65ddf0d10f3e94b9e5c7c03c)
- [Additional scan with species text exposed in search extraction](https://file.iflora.cn/fastdfs/group2/M00/65/0A/wKhno12H_hKAVbMZAYyrwLjNfPk380.pdf)

## *Coleonyx fasciatus*: adult size directly measured

Laurence M. Klauber (1945), *The Geckos of the Genus Coleonyx with Descriptions of New Subspecies*, Transactions of the San Diego Society of Natural History 10(11):133–216, treats *C. fasciatus* on printed pages 182–184. The specimen examined is explicitly an adult male, EHT-HMS 10,537. Printed page 183 gives snout–vent length **58.5 mm** and a **53 mm regenerated tail**. Their sum is **111.5 mm / 11.15 cm**, directly placing that adult individual above the 10 cm total-length threshold.

- [Original scientific paper PDF](https://herp.mx/pubs/1945-Klauber-Coleonyx.pdf), printed pages 182–184 (PDF pages 50–52).
- [BHL metadata for Taylor's earlier species account, 1935](https://www.biodiversitylibrary.org/part/39306).

This is a single preserved adult with a regenerated tail. It supports a medium total-length category, but does **not** establish a population-wide typical total-length interval or normal intact-tail maximum. The 1945 paper's beetle/grasshopper/sowbug food statements occur under other *Coleonyx* taxa; they were deliberately not transferred to *fasciatus*.

## Diet follow-up status

The authors' released ReptTraits dataset and its individual-trait-source worksheet were checked directly, rather than substituting generic genus husbandry guidance. The dataset article describes both trait records and their individual citations:

- [Oskyrko et al. (2024), ReptTraits, Scientific Data](https://pmc.ncbi.nlm.nih.gov/articles/PMC10899194/)
- [Authors' Figshare release](https://doi.org/10.6084/m9.figshare.24572683)

### Actual dataset result: diet remains unverified

The Figshare API returned release DOI `10.6084/m9.figshare.24572683.v4`. The downloaded file was **ReptTraits dataset v1-2.xlsx**, file ID `45408133`, 18,545,434 bytes. The row for *Coleonyx fasciatus* is Excel row **2859** in both the `Data` and `Sources of individual trait val` worksheets.

- `Data!S2859` (Diet) = **NA**.
- `Data!T2859` (Diet comments) = **NA**.
- Corresponding source cells `S2859` and `T2859` = **NA**.
- Maximum total length `AC2859` = **NA**; maximum SVL `AD2859` = **76 mm** and maximum female SVL `AE2859` = **56 mm**.

Thus this published dataset does **not** verify the species' diet or a typical total-length interval. A secondary animal website's carnivore claim was not adopted as a substitute for this missing published datum. Diet should remain explicitly unknown pending a species-level field account; the 1945 adult specimen can still support the broad medium total-length bin with the stated caveat.

- [Author dataset metadata, official Figshare API](https://api.figshare.com/v2/articles/24572683)
- [Actual v1-2 data file](https://ndownloader.figshare.com/files/45408133)

No files from the full source dataset were added to the website repository. Only the relevant findings and provenance are recorded here.
