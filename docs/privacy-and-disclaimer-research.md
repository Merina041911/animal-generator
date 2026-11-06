# Privacy Policy 与 Disclaimer 编写依据

调研与核对日期：2026-11-06。适用站点：animal-generator.net。

## 同类网站参考

- [Pick an Animal — Privacy Policy](https://pickananimal.com/privacy.html)：先解释浏览器本地处理，再说明托管请求、当前是否追踪以及未来服务变化。借鉴其清晰结构；本站存在本地抽取历史和 Google Fonts，不能沿用“完全不向外发送任何信息”的概括。
- [RandomAnimalGen — Privacy Policy](https://randomanimalgen.com/privacy)：按实际功能说明账号、支付、AI 图片、统计和广告。本站没有这些服务，不套用它的服务清单。
- [Random Animal Generator — Disclaimer](https://random-animal-generators.netlify.app/disclaimer)：强调创作娱乐用途、准确性限制和使用前核实。本站另外补充筛选标签、抽取池、无重复机制、照片授权和纠错方式。

以上仅借鉴议题与组织方式，正文针对本站重新撰写。

## 本站实际实现

- 随机生成、筛选与动物目录在浏览器端运行；当前未发现统计、广告、追踪像素、账户或支付代码。生产首页脚本也与此一致。
- `animal-generator.js` 使用 `fieldnote-seen-animals` 保存已抽取物种的学名；无应用设置的到期时间，可以通过浏览器清理本站数据。
- 照片由本站托管，不是运行时从 Wikimedia / iNaturalist 嵌入；请求图片仍可能在托管日志中体现所显示的动物，不能声称生成活动绝对不可观察。
- 托管使用 Vercel：[Vercel Privacy Notice](https://vercel.com/legal/privacy-notice) 说明其处理网站终端用户的 IP、请求与设备等技术信息。没有凭空指定本站日志保留天数。
- 主页及主要页面加载 Google Fonts，存在浏览器到 Google 字体服务器的请求；政策链接到 [Google Privacy Policy](https://policies.google.com/privacy)。
- 联系表单当前仅通过 `mailto:` 打开邮件草稿，没有收件地址或服务端提交。用户正在选择多站共用的新邮箱；不得虚构邮箱或声称表单已经提交。
- 图片各自保留作者、来源和许可证，详见已有图片署名页。创作灵感与图片复制权限需要分别解释。

## 实现范围与后续维护

- 新增 `/privacy-policy` 与 `/disclaimer`，沿用站点英文、配色和字体，提供页内目录与移动端布局。
- 首页、About、Contact、来源页、图片署名页及旧 MVP 页脚均可进入政策页；同步修改两个生成脚本，避免重新生成来源/署名页时丢失链接。
- 两个政策页加入 sitemap，提供标题、描述、canonical 和分享元数据。
- 公开联系邮箱确定后，替换政策页关于无收件地址的说明，并让联系表单、政策邮件链接预填 `Animal Generator` 主题。
- 统计、广告、表单后端或其他服务上线前，应同步核对并更新政策。

## 同日按用户分享资料修订

后续用户提供了 Contact 页接收反馈的分享回答。联系页已改为 Tally 接入方向：只收邮箱和留言、记录网站来源、启用后使用验证码。旧的无收件人 `mailto:` 表单已删除，隐私政策已改为说明在线表单、邮件及防垃圾处理。当前仍缺账号保存、发布表单 ID 与真实收件地址，尚未启用；详见 [Contact 接入记录](contact-form-setup.md)。前文关于旧联系表单的条目仅为初始调研状态。

## 2026-11-07 接入完成

用户在浏览器完成账号登录和表单保存后，已发布 Tally 表单 `q5aEp7`，开启账号邮箱收件通知，并关闭未提交答案暂存。已通过本站本地 Contact 页真实提交并核对成功页、Tally 来源字段及 Gmail 收件。临时预览表单已移除，隐私政策联系条款按真实处理方式更新；上面的“缺少账号／表单 ID”状态已被本节取代。完成此项本地验证时，网站代码尚未部署到生产。详情见 [Contact 接入记录](contact-form-setup.md)。

## 2026-11-07 按隐私政策分享对话补齐

- 已阅读用户提供的[分享对话](https://new.web.cafe/chat/share/hzifzxqryaoekfmaigus)。采用其“按网站真实情况撰写、注明更新日期、页脚提供入口”的建议；对话还明确提到服务条款，因此新增 `/terms-of-service`，与现有 Privacy Policy、Disclaimer 形成完整入口。
- 服务条款说明免费使用、允许的创作用途、滥用限制、照片各自的许可证、反馈、服务可用性与不可排除的法定权利。没有虚构公司、司法管辖地、订阅、付款或退款业务，也不承诺审核通过。
- 隐私政策补充当前 Share 按钮会把动物名称与动物链接交给用户选择的分享渠道，或复制链接到剪贴板；不会附带完整抽取历史和筛选条件。明确通过 Contact 请求查询、更正或删除本站持有的留言。
- 重新打开公开 Tally 表单，核对邮箱、留言及 Google reCAPTCHA；没有发送新留言或更改表单设置。关于收件通知与未提交暂存的状态沿用本文件上节和 Contact 接入记录中的核验结果。
- 再次阅读 [Vercel Privacy Notice](https://vercel.com/legal/privacy-notice)、[Tally Privacy Notice](https://tally.so/help/privacy-policy)、[Tally GDPR 信息](https://tally.so/help/gdpr)及 [Tally reCAPTCHA 文档](https://tally.so/help/recaptcha)。政策正文保留相应第三方来源链接。
- 各公开页面页脚和两份页面生成脚本均补上服务条款链接，sitemap 同步加入该页。三个政策页使用现有 `legal.css`，兼容桌面目录和手机单列阅读。
- 页面实现及以下验证在本地完成；生产状态应以 GitHub 推送后的 Vercel 部署和线上页面检查为准。
- 验证：15 项现有测试全部通过；三个政策页的标题、日期、目录锚点、站内链接、页脚互链和 sitemap 检查通过，两份生成脚本通过语法检查。浏览器检查了 1440、375、320 像素宽度下的三页布局，无横向溢出；目录可跳转到照片权利说明，并已查看桌面和手机截图。
