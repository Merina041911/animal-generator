# 哺乳类筛选资料核实

核实日期：2026-11-04。范围：现有目录中有审核照片的 **109 种哺乳类**。交付文件：`mammals-filter-data.json`。没有修改原动物目录、图片、页面或 Git 提交。

## 数据约定

- 每个记录保留原目录的稳定 `id` 与 `scientificName`，并提供栖息地、常见成年食性、成年体长分档、地区及实际查阅来源。
- 来源主体为密歇根大学 [Animal Diversity Web](https://animaldiversity.org/) 的逐物种账户。已实际读取全部 109 个账户的分布、栖息地、形态及食性段落，不把只有分类树、没有账户正文的页面当作充分资料。旧学名改用有正文的同物种账户，并在必要时补充当前资料。
- 栖息地是面向发现工具的宽泛标签，不是完整生态分类。森林包含林地、雨林与林丛；草地包含稀树草原及草原；沙漠包含半荒漠和干旱荒漠边缘；湿地包含沼泽和河岸湿地。淡水表示经常在淡水中活动的半水生或水生物种，不因偶尔饮水而标记。海洋与陆地森林中的“kelp forest”没有混用。
- 食性按常见成年野外食物分类。食虫动物归肉食；熊猫及以竹叶为主的小熊猫归植食；黑猩猩、倭黑猩猩、狐猴、杂食熊类等归杂食。偶然摄食并不自动把主要肉食或植食动物改为杂食。
- 体型按成年头身体长（海洋哺乳动物使用通常报告的全身长度）分为 small `<10cm`、medium `10–<100cm`、large `≥100cm`。不把陆生哺乳类的长尾、角、身高当作头身体长。资料范围跨越 100cm 时保留 medium 和 large；100cm 端点属于 large。这是产品的分类映射，不是动物学上的统一“大型/中型”定义。
- 地区以野生原生分布为主；中美洲与格陵兰计入北美洲。引入种群一般排除。家驴是家养目录项，明确使用家养分布并写入例外说明。
- 广布鲸豚使用 `oceans`，不机械把全球海洋转换为七个陆地洲；来源明确提及南极海域的虎鲸和座头鲸另保留 `antarctica`。沿岸范围明确的海象、海獭、儒艮、港海豹、白鲸、独角鲸和北极熊同时保留明确对应地区。地区标签是粗粒度范围，不是实时观测位置。

## 核实中发现并处理的问题

1. **目录学名**：座头鲸目录作 `Balaenoptera novaeangliae`，物种账户为 *Megaptera novaeangliae*。JSON 保留目录键以便连接，在 notes 中说明；主代理可单独判断是否修正目录显示学名。抹香鲸、雪豹、美洲水貂的 ADW 账户使用旧异名，已连接到有正文的账户。
2. **旧分类造成地区混入**：ADW 较老的赤鹿账户包括 elk/wapiti，已用 [NatureServe 的 Cervus canadensis 条目](https://explorer.natureserve.org/Taxon/ELEMENT_GLOBAL.2.1353292/Cervus_canadensis) 和 [British Deer Society 赤鹿资料](https://bds.org.uk/information-advice/about-deer/deer-species/red-deer/) 分开。赤鹿不带北美标签，elk 不带欧洲标签。
3. **金豺与非洲金狼**：部分 ADW 乃至简短专门组页面仍沿用包含非洲的旧范围，依据 [2015 年基因组研究](https://www.consevol.org/pdf/Koepfli_2015_CurBiol.pdf) 排除非洲金狼的范围。金豺保留欧洲、亚洲。
4. **欧洲野猫**：以 [IUCN Cat Specialist Group 的当前物种概念](https://www.catsg.org/living-species-europeanwildcat) 为准，不把旧 ADW 合并账户内非洲 *Felis lybica* 的分布搬入。
5. **阿尔卑斯羱羊与野山羊**：ADW 旧羱羊账户地理范围过宽；以 [IUCN Capra ibex](https://doi.org/10.2305/IUCN.UK.2020-2.RLTS.T42397A161916377.en) 限定欧洲。野山羊以 [IUCN Capra aegagrus](https://doi.org/10.2305/IUCN.UK.2020-2.RLTS.T3786A22145942.en) 限定野生亚洲范围，不套用家山羊的全球分布。野山羊体型还参考 [2022 年 Oumm Qatafa 动物分类研究的体型比较](https://doi.org/10.1002/jqs.3414)（总长约1.5m，排除短尾后仍远高于1m界限）；ADW 家山羊账户仅供相关生态背景，不把家养数据当作野生分布。
6. **长尾与体长**：云豹、豹、雪豹、豹猫、丛林猫及伊比利亚猞猁使用 Cat Specialist Group 逐种条目校正头身体长。ADW 豹猫结构化最大值有明显单位错误；JSON 使用 45–65cm，并保留说明。
7. **环尾狐猴单位错误**：ADW 结构化长度将 39–46cm 误写成 mm，采用 [Perth Zoo 的 39–46cm 体长资料](https://perthzoo.wa.gov.au/animal/ring-tailed-lemur)，归 medium，排除尾长。
8. **倭黑猩猩站立高度**：使用 [San Diego Zoo 的 70–80cm 全身体长资料](https://ielc.libguides.com/sdzg/factsheets/bonobo/characteristics)，不把站立高度当作头身体长，归 medium。
9. **阈值差异**：薮猫的资料有 59–92cm 与 59–100cm 两种上界，保留 CatSG 的 100cm 端点并注明。狞猫使用 [Mammalian Species 形态综述](https://academic.oup.com/mspecies/article/52/993/71/6016926) 的 61–106cm。欧洲獾使用 [Mammal Society 资料](https://mammal.org.uk/s/Badger-Fact-Sheet-v2.pdf) 报告的 75–100cm。来源范围差异没有伪装为精密测量。

## 覆盖与边界

- 109/109 个可生成哺乳类都有四维标签和实际查阅来源，无空数组。
- 数据保留了旧账户分类、单位与度量口径的已知例外；它不是“所有来源都最新且相互一致”的保证。
- Habitat 和 diet 是概括，存在季节、性别、年龄和地理差异；用户组合筛选时结果为已标记范围的交集。
- 目录仍有 81 种未审核照片动物，本数据没有把它们加进随机生成池。
- 最终复核对缺乏明确支持的补充标签作了收缩（例如豺的开放草原/山地、西部大猩猩的湿地、土豚的森林、红松鼠的城市），宁可保守收录来源明确的栖息地，也不把常识推测扩展成已核实标签。
- JSON 每个对象的 `sources` 给出可追溯链接，不保存或发布来源整段原文。资料标签和说明均为概括/产品映射。
