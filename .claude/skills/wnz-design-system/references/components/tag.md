# Tag

Сторінка `↳ Chips & Tags` (46778:61630) · Section `Tag` (78564:71) · набір `Tag` (78564:70) · статус: зібрано заново 2026-10-21, чекає ревʼю (не Ready for dev). Оригінал — `Tag` (42238:3739), не змінювався.

## Призначення
Показує вже обране значення (застосований фільтр, значення multiselect) і дає його прибрати іконкою `close`. **Один компонент** — окремої кнопки закриття немає (рішення команди 2026-10-21).

## Анатомія
```
Tag (COMPONENT_SET 78564:70)   State = Default | Hover | Disabled · Inverted = False | True  (6 варіантів)
└─ State=…, Inverted=…   HORIZONTAL · HUG × tag/height (24) · padding L tag/padding-left · R tag/padding-right · gap tag/gap
   radius border-radius/tag · stroke 1 INSIDE contextual/tag/base[-invert]/border/<state>
   fill — лише Hover: contextual/tag/base[-invert]/fill
   ├─ ⬅️ Icon   placeholder · tag/icon-size (16) · колір …/color/<state>   ← bool ⬅️ Icon (off), swap ↳ 💠 Icon left
   ├─ Label     text style text/md-strong · колір …/color/<state>           ← ✏️ Label
   └─ Icon ➡️   close (Static — Icons) · tag/icon-size · колір …/color/<state>  ← bool Icon ➡️ (on), без swap — завжди close
```
Розмір збігається з оригіналом: 96×24.

## Властивості
`State`, `Inverted` (variant) · `⬅️ Icon`, `Icon ➡️` (boolean) · `↳ 💠 Icon left` (swap) · `✏️ Label` (text).

## Токени (`mb/component`, `xon/component`)
JSON: `tokens/tag.mb.component.json`, `tokens/tag.xon.component.json` (MB = XON).
Наявні й перевикористані: `tag.icon-size` = 16, `border-radius.tag` = `{border-radius.core.200}`.
⚠️ Корінь `tag` у сеті вже існує (`tag.icon-size`) — вставляти `height`, `padding-left`, `padding-right`, `gap` **всередину** наявного `"tag": {`, а не новим коренем (`token-studio.md`).

| Токен | Значення | Було в оригіналі |
|---|---|---|
| `tag.height` | 24 | фіксовано 24 |
| `tag.padding-left` | `{spacing.200}` 8 | hardcode 8 |
| `tag.padding-right` | `{spacing.100}` 4 | hardcode 4 |
| `tag.gap` | `{spacing.100}` 4 | hardcode 4 |
| `contextual.tag.base.fill` (лише Hover) | `{semantic.background.slate-4}` ⚠️ | `core.brand-30.a10` |
| `contextual.tag.base.border.{default,hover}` | `{semantic.text.static.accent}` ⚠️ | `core.brand-30.a80` |
| `contextual.tag.base.border.disabled` | `{semantic.border.default.default}` | те саме |
| `contextual.tag.base.color.{default,hover}` | `{semantic.text.default.heading}` | MB те саме · **XON `core.content.a0` (прозорий — текст не було видно)** |
| `contextual.tag.base.color.disabled` | `{semantic.text.disabled.static}` | MB те саме · XON `core.content.a0` |
| `contextual.tag.base-invert.fill` | `{semantic.background.slate-4}` ⚠️ | — |
| `contextual.tag.base-invert.border.*` | як у `base` | — |
| `contextual.tag.base-invert.color.{default,hover}` | `{semantic.text.default-invert.heading}` | — |
| `contextual.tag.base-invert.color.disabled` | `{semantic.text.default-invert.tertiary}` ⚠️ | — |

## Прив'язка
Токени Token Studio на шарах (plugin data `tokens`) + однойменні змінні колекції `Product` (створені 2026-10-21, scopes задані).

## Історія рішень
1. Точна копія оригіналу: 3 стани, розміри, падінги 8/4, gap 4.
2. Окрему кнопку `.Tag/Remove` (версія 2026-10-20) **скасовано** — закриття = іконка `close` усередині Tag.
3. Ліва іконка в оригіналі теж була `close` без swap → `placeholder` зі swap `↳ 💠 Icon left`.
4. Додано `Inverted=True`, токени `base-invert`.
5. Нові токени `contextual.tag.base.*` замість `contextual.tag.{fill,border,color}.*` (core-значення, XON-баг з прозорим текстом); старі лишаються для оригіналу.

## Відкриті питання
- **Hover-тон змінився:** оригінал — жовтуватий `brand-30.a10`, зараз блакитний `semantic.background.slate-4` (`brand-60.a15`). Semantic-токена для легкого акцентного тону немає — потрібен `semantic.fill.accent-subtle`?
- Обведення: оригінал `brand-30` 80%, зараз `semantic.text.static.accent` (100%) — токен текстової ролі.
- Disabled на темному фоні — `text.default-invert.tertiary` (немає `semantic.text.disabled-invert.*`).
- Hover на весь тег при тому, що клікабельна лише `close`, — залишено як в оригіналі; вирішити, чи потрібен.
- Після приймання: старий набір → `Deprecated/Tag`, токени `contextual.tag.{fill,border,color}.*` — прибрати.
