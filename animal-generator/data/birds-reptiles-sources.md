# 鸟类与爬行类筛选数据核实记录

核实日期：2026-11-04。覆盖现有照片可用目录中的 51 种鸟类、27 种爬行类（共 78 条）。数据由稳定的动物 `id` 对应目录，每条记录都保留实际访问的资料 URL 和资料标题；未使用不能读取正文的 URL 充当事实核实证据。

## 分类口径

- 栖息地为宽泛的产品分类：森林含林缘及稀树环境；草地含开阔草原、荒原草甸及相似的开放农地；湿地与淡水可以同时符合；海岸/珊瑚礁/海上觅食归入海洋。岩栖物种若处于林地或山地环境，分别保留相应标签，不声称岩石本身是一种森林。
- 食性按成年野生动物的主要食物归为植食、肉食（包含食虫、鱼、无脊椎动物及食腐）、杂食。季节间显著吃植物及动物的鸟类归杂食；偶尔摄取少量植物或动物不必改变主要食性。绿海龟使用成年植食口径；幼体不同在 notes 中注明。
- 体型按成年长度：small < 10 cm，medium 为 10 cm 至不足 100 cm，large >= 100 cm。鸟类采用通常的体长（不含翼展，含正常尾羽）；爬行类使用正常总长，龟类使用背甲长。性别或资料给出的成年范围跨过阈值时，保留多个体型标签。极端纪录不代替常见成年值，特殊依据在 notes 说明。
- 地区以原生野生分布（含正常迁徙季节）为主，排除偶发迷鸟、引入和动物园分布。海洋远游物种使用 `oceans`。家鸡是家养动物，世界分布明确标注为家养分布，不伪装成野生原生分布。

## 实际使用的资料

1. [University of Michigan Animal Diversity Web](https://animaldiversity.org/)：逐一取得对应物种账户中的 Geographic Range、Habitat、Physical Description、Food Habits。无正文的 ADW 分类占位页没有被当成完整资料。具体账户 URL 保留在 JSON 的 sources 中。
2. [Naturalis Biodiversity Center 的 Birds of Europe](https://birds-europe.linnaeus.naturalis.nl/)：欧洲鸟类的明确体长、食性及栖息地。
3. [Cornell Lab of Ornithology](https://www.allaboutbirds.org/)：野火鸡、白鹡鸰等体长与分布；特别用于确认西仓鸮的现代分类范围。
4. [EURING/CMS European-African Bird Migration Atlas](https://migrationatlas.org/)：金黄鹂、白鹡鸰、欧洲知更鸟和树麻雀的正常迁徙/原生分布。
5. [International Crane Foundation](https://savingcranes.org/species/eurasian-crane/)：灰鹤的分布、身高和食性。
6. [New Zealand Birds Online](https://www.nzbirdsonline.org.nz/)（Te Papa、Department of Conservation 与 Birds New Zealand 合作）：金翅雀的原生/引入地区区别、骨顶鸡原生澳大拉西亚分布及自然定殖。
7. [Singapore National Parks Board](https://www.nparks.gov.sg/)：小鸊鷉的明确体长和跨洲分布、树麻雀原生与引入范围。
8. [The Wildlife Trusts](https://www.wildlifetrusts.org/)：英国/欧洲爬行类的物种描述、明确体长和生态。英国的 barred grass snake 页面为 **Natrix helvetica**，没有当成目录 **Natrix natrix** 的物种级证据。
9. [IUCN Italy](https://www.iucn.it/) 与 [The Reptile Database](https://reptile-database.reptarium.cz/)：物种有效学名与原生地区。
10. [Office de l’Environnement de la Corse](https://faunesauvagedecorse.oec.fr/)：第勒尼安壁蜥物种级体长、食虫、栖息地及科西嘉/撒丁岛范围。
11. 澳大利亚博物馆原始论文、NSW Threatened Species Scientific Committee、Wet Tropics Management Authority、Queensland Museum：黑岩石龙子和变色龙壁虎。
12. [Cologne Zoo](https://koelnerzoo.de/portfolio/zimttinamu/)、[American Ornithological Society](https://americanornithology.org/wp-content/uploads/2019/07/AOSChecklistGall-Charad.pdf)、Birds of Bolivia 项目及台湾教育机构参考资料：少见鸡形鸟/䳍类的栖息地、体长和范围。
13. [SAviTraits 作者公开数据](https://github.com/martaajarzyna/SAviTraits_database/blob/main/database-files-v1.0/SAviTraits_1-0_1.csv)：实际读取食性类别和季节比例，交叉核实缺 ADW 物种的食性。只保留归纳后的分类，不复制 Cornell 描述原文。
14. [ReptTraits 作者原始数据](https://doi.org/10.6084/m9.figshare.24572683)及[论文](https://www.nature.com/articles/s41597-024-03079-5)：实际读取 v1-2 的 Coleonyx fasciatus 行，Diet、Diet comments 及对应来源均为 NA；没有采用二次网站转述的 carnivore 值。
15. [Klauber (1945), The geckos of the genus Coleonyx](https://herp.mx/pubs/1945-Klauber-Coleonyx.pdf)：pp.182–184 的 Coleonyx fasciatus 成年标本测量。58.5 mm 头身加 53 mm 再生尾，共 111.5 mm；只能支持已有 medium 成年标本，不声称完整种群范围。

## 修正与边界

- 原目录 European pond turtle 的 `Emys orbicularitosa` 是拼写错误，核实为 **Emys orbicularis**。稳定 id 保持。父任务已更正目录学名；本记录保留原错误作为核实线索。
- `Zootoca vivipara` 的 ADW 把 50–77 mm 写为总长，疑混淆头身长；采用 Wildlife Trusts 明确的 **10–15 cm 总长**，归 medium。
- `Tyto alba` 按目录的 **Western Barn Owl** 及现代物种拆分，地区为欧洲、非洲、西亚；不沿用旧 ADW 中涵盖美洲与澳洲的广义仓鸮范围。
- Greater flamingo 不纳入旧 ADW 中未分清物种的南美记录；使用非洲、欧洲、亚洲范围。
- 王企鹅的亚南极岛屿不等于南极大陆繁殖；保留海洋及相关亚南极岛屿所在区域。
- 孔雀的长雄性尾屏使报道体长跨过 1 m；保留 medium、large，并注明量测包含尾屏。
- 对家鸡、长尾或性别差异较大的物种、老分类账户和只有单个成年标本量测的物种，JSON 的 notes 保留限制。产品筛选只是宽泛发现工具，不能替代完整物种生态数据库。

## 待核实项

截至本次写入，78 条都有来源，栖息地、体型、地区均非空。`Coleonyx fasciatus` 的物种级野外食性在正式 ReptTraits 原始数据中亦无值（NA），`diets` 保持空数组；不把同属物种的食谱移植给它。其余 77 种都有四组可用标签。
