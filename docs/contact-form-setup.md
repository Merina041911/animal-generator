# Contact 表单接入与维护

更新：2026-11-07。

## 当前状态

Tally 表单已在用户账号中保存并发布，ID 为 `q5aEp7`。

- [公开表单](https://tally.so/r/q5aEp7)
- [表单管理](https://tally.so/forms/q5aEp7/submissions)
- [表单设置](https://tally.so/forms/q5aEp7/settings)
- [本地 Contact 预览](http://127.0.0.1:8766/contact)

`animal-generator/contact.html` 直接嵌入已发布的表单，同时提供独立打开链接。没有自建后端、Resend 密钥或空收件人的邮件草稿按钮；临时本地假表单及其脚本已移除。账号邮箱仅用于接收通知，没有作为公开联系地址写入网页。

Tally 表单的发布与网站代码部署相互独立。网站通过 GitHub 的 `main` 分支发布到 Vercel；每次部署后应核对生产 Contact 页，不能仅凭 Tally 表单可用判断网站更新成功。

## 已核实的设置

- 免费 Self email notifications：已开启，发往当前表单创建者的账号邮箱；保存后重新加载确认仍开启。
- Respondent email notifications：关闭，没有向访客自动发送确认邮件。
- Partial submissions：关闭。
- Save answers for later：关闭，不通过此功能暂存未提交的留言。
- Google reCAPTCHA：已加入表单并在实际测试中通过验证。
- 没有启用付费升级或新的第三方统计集成。

## 多个网站共用邮箱

用户提供的[分享回答](https://new.web.cafe/chat/share/solunywqvmyiweqhbvvv)讨论的是能实际接收反馈的联系页，而不仅是邮箱命名。对于当前静态站，采用 Tally 嵌入表单，不增加邮件发送后端。

- 后台用一个总邮箱管理各站反馈。
- 每站建立独立、带网站名的表单。本站标题是 `Animal Generator — Contact (animal-generator.net)`。
- 免费通知的默认主题包含表单名，可在总邮箱按网站名设置标签。自定义通知字段属于 Pro，当前不依赖它。
- 本站明确传入 `website=animal-generator.net` 和 `source_page=/contact`。使用直接设置 `src` 的 iframe，并加载官方脚本处理自动高度；没有使用会追加页面查询参数的 `data-tally-src` 加载方式。
- 对外可日后设置 `support@该站域名` 并转发到总邮箱，但必须先配置、验证。当前没有配置或公开该域名邮箱。
- 2026-11-06 核对到网站使用 Vercel DNS；Cloudflare 邮件路由要求 Cloudflare DNS。本轮没有修改域名、NS、MX、转发或邮件发送配置。

## 表单内容

- 两个可见必填字段：Your email、Message。
- 消息提示：Include the animal name or page URL if relevant.
- 隐藏字段：`website`、`source_page`。
- 提交前：Google reCAPTCHA。
- 按钮：Send message。
- 成功页：Thanks — your message has been received. We aim to reply by email within 2–3 business days; some questions may take longer.
- 奶油色背景、深色文字和珊瑚色按钮与本站保持一致。

## 端到端验证

2026-11-07 从本地 Contact 页实际提交了一条设置测试，标记为 `AG-contact-check-20261107`。

1. 邮箱和留言输入框可用，验证码通过。
2. 提交后页面显示 `Form submitted` 和约定的感谢文案。
3. Tally 后台出现 1 条 Completed、0 条 Partial；字段正确记录 `animal-generator.net` 与 `/contact`。
4. Gmail 收件箱出现来自 Tally Forms 的对应新反馈通知，主题包含本站表单名称。
5. 检查桌面与手机排版，修正 320 像素窄屏的嵌入内容裁切；使用官方脚本自动调整表单高度。

测试记录保留在用户表单后台，邮件保留在用户邮箱，没有代用户回复或删除它们。

## 后续维护

- 复制到其他网站时，新建该站专用表单，更新表单标题、表单 ID、`website` 参数和政策说明。
- 当前使用免费通知默认账号收件；更换账号邮箱前核对通知地址并测试收件。
- 网站部署后，从生产 Contact 页再测试加载与提交。当前端到端测试的外层页面是本地预览。
- 隐私政策已更新为实际的 Tally、通知邮件和 Google reCAPTCHA 处理方式。

## 官方依据

- [Tally 嵌入表单](https://tally.so/help/embed-your-form)
- [Tally 收件通知](https://tally.so/help/self-email-notifications)
- [Tally 隐藏字段](https://tally.so/help/hidden-fields)
- [Tally reCAPTCHA](https://tally.so/help/recaptcha)
- [Tally 隐私信息](https://tally.so/help/gdpr)
- [Cloudflare 路由邮件](https://developers.cloudflare.com/email-service/get-started/route-emails/)
