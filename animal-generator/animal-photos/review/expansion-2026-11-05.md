# 动物扩充与图片审核记录（2026-11-05）

本批为 9 种此前停用的动物补齐合格照片，可生成数量从 231 增至 240。总目录仍为 340 种，259 种具有筛选研究资料，19 种继续等待合格替换图，另外 81 种尚未完成筛选研究。原有 231 条已启用记录保持不变。

## 审核方法

使用 iNaturalist 的物种分类 ID 查询研究级观察，再逐张查看候选照片，并放大复核入选图。仅采用 CC0、CC BY 或 CC BY-SA 照片，保留作者、来源页和许可证。要求主体清晰、主要身体轮廓完整，头身、可见尾部或肢体不得被原图边缘裁切；严重遮挡、局部特写、主体过小或画质不足不通过。水鸟足部自然位于水下、蛇自然盘绕等情况在逐项理由中明确说明。

图片仅按比例缩小并转换为 WebP，不裁切、不放大。源文件与输出文件的 SHA-256、物种分类 ID、照片 ID 和逐项通过理由见同名 JSON。

## 新增动物

| 动物 | 学名 | 来源与许可证 | 通过理由 |
| --- | --- | --- | --- |
| Tyrrhenian Wall Lizard | *Podarcis tiliguerta* | [来源](https://www.inaturalist.org/observations/306272888) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) | 壁蜥完整头部、躯干、可见四肢及弯曲尾端均位于原图内，主体清晰，无明显遮挡。 |
| German Cockroach | *Blattella germanica* | [来源](https://www.inaturalist.org/observations/259235450) · [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/) | 德国小蠊头胸腹、完整翅面、触角及可见步足均在画面内，主要身体清晰完整，无严重遮挡。 |
| Greylag goose | *Anser anser* | [来源](https://www.inaturalist.org/observations/281640151) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) | 灰雁正面站立，完整头喙、躯干轮廓、自然收拢双翼与双足均可辨，主体清晰且原图无裁切。 |
| Northern pintail | *Anas acuta* | [来源](https://www.inaturalist.org/observations/200474404) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) | 针尾鸭侧面浮水，头喙、完整躯干外轮廓、收拢翅膀与长尾端均清晰且位于画面内；足部自然在水下，主要身体并未被水面掩盖。 |
| Little grebe | *Tachybaptus ruficollis* | [来源](https://www.inaturalist.org/observations/65912619) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) | 小䴙䴘侧身浮水，头喙、颈部、躯干与尾端轮廓完整，前景没有遮住主要身体；足部自然位于水下。 |
| Emperor dragonfly | *Anax imperator* | [来源](https://www.inaturalist.org/observations/185957500) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) | 帝王蜻蜓头部、胸腹部末端、四片完整翅膀和可见抓握足部均清晰，原图四周留有余量，无裁切。 |
| Indian peafowl | *Pavo cristatus* | [来源](https://www.inaturalist.org/observations/359657550) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) | 蓝孔雀站立全身，冠羽、头颈、躯干、双腿足部与完整长尾羽末端均在原图内，背景枝条不遮住主要身体。 |
| Grass snake | *Natrix natrix* | [来源](https://www.inaturalist.org/observations/407589779) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) | 草蛇自然盘绕，头部和完整躯干外轮廓清晰，尾部自然沿身体收拢，无原图裁切或严重前景遮挡。 |
| Noble crayfish | *Astacus astacus* | [来源](https://www.inaturalist.org/observations/120492318) · [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) | 欧洲螯虾背面完整全身，头胸甲、两只螯、触角、可见步足、腹部与完整尾扇均在画面内，主体清晰。 |

## 验证

- 15 项自动测试通过，涵盖筛选、不重复抽取、研究数据完整性和图片字节校验。
- 原有 231 条已启用记录逐项比较保持不变。
- 首页、关于页、署名页、来源页、审核清单和 QA 图库已同步生成。
- 1280、768、390、320 像素宽度下，每种宽度检查全部 240 张图片与 2 个单卡用例，共 968 次加载和布局检查，无失败。
