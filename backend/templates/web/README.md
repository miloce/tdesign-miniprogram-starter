# Web 模板目录

这里放可复用的公开 Web 页面模板。后端会自动扫描本目录下的 `*.html` 文件，并读取文件顶部的标记。

## 页面模板标记

```html
<!-- YZD_TEMPLATE {"key":"heart-blessing","name":"爱心祝福","type":"page","priority":10} -->
```

- `key`: 模板唯一标识。
- `name`: 后台识别名称。
- `type`: `page` 表示正常预览/短链页面，`missing` 表示无效短链页面。
- `priority`: 数字越大越优先。

## 占位符

- `{{title}}`: 模板标题。
- `{{heading}}`: 预览效果 / 专属链接。
- `{{content}}`: 主文案。
- `{{intro}}`: 首屏按钮或信封文案。
- `{{festival}}`: 节日名称。
- `{{wish}}`: 祝福文案。
- `{{field.xxx}}`: 读取字段值，例如 `{{field.toName}}`。

需要输出 JSON 或脚本变量时使用三花括号：

```html
const messages = {{{messagesJson}}};
```

普通双花括号会自动 HTML 转义，三花括号不会转义，只用于后端已经生成好的安全 JSON。

## 字段类型

后台模板字段 JSON 支持：

```json
[
  {"key":"title","label":"标题","type":"text","required":true},
  {"key":"content","label":"内容","type":"textarea","maxlength":500},
  {"key":"cover","label":"封面图片","type":"image"},
  {"key":"music","label":"背景音乐","type":"music"},
  {"key":"opacity","label":"透明度","type":"slider","min":0,"max":100,"step":5,"default":80},
  {"key":"style","label":"样式","type":"select","options":["温柔","热烈"]},
  {"key":"date","label":"日期","type":"date"},
  {"key":"url","label":"链接","type":"url"}
]
```

兼容参考项目的类型名：`input -> text`、`input2 -> textarea`、`range -> slider`、`picker -> select`、`cover/background -> image`、`btn -> button`。
