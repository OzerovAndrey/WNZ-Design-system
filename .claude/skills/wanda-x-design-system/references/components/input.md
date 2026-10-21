# Input

Сторінка `↳ Input 💛` · Section `Input` (78201:1159, сіра `#808080`) · набори `Input` (78201:1158), `Input Side Left` (33138:79803), `Input Side Right ` (33138:79804) · статус: Learned (оновлено командою, не Ready for dev)

## Призначення і характер
Поле вводу: однорядкове (`Type=Input`) і багаторядкове (`Type=Text-area`). Замінило два старі набори `Input` (30v legacy і 12v) з аудиту 19.10 — тепер один набір.
- **Роль і місце:** форми каси, профілю, реєстрації. Біла плашка, радіус 12, висота 48 (Input) / 122 (Text-area).
- **Поведінка між станами:** плашка однакова в `Default | Hover | Active | Filled` *(спостереження: hover/active візуально не відрізняються від default, обведення немає — є лише в `Error`)*. Змінюється лише текст: placeholder `tertiary` → `heading` у `Active | Filled | Error`; у `Default` лейбл схований і стоїть усередині як плейсхолдер, з `Hover` лейбл видимий над значенням (floating label). `Disabled` — фон той самий, текст `disabled.primary`.
- **Error:** червоне обведення 1 px (`contextual.input.border-color.validation`) + рядок `Error text` під полем.
- **Inverted:** немає.
- **MB vs XON:** токени однакові, крім `contextual.input.border-color.active/hover` (у компоненті не використовуються).
- **Масштаб і гнучкість:** ширина FIXED 255 на корені (розтягується контейнером), Text-area — фіксована висота 122. Розмір лише `md` (токени `sm` є в Token Studio, варіанта немає).
- **Композиція:** зліва — слот `Input Side Left` (іконка, прапор, платіжна система, кнопка, код країни `+380`), справа — `Input Side Right` (chevron, валюта, кнопка, іконка+кнопка, текстова дія `Clear`). Всередині значення — інстанси `Tag` (за `Show tags`).

## Анатомія
```
Input (COMPONENT_SET)   State × Type
└─ Variant  VERTICAL · FIXED×HUG · gap input.additional-text-gap.top (4)
    ├─ Field          HORIZONTAL · FILL · fill contextual.input.fill.primary.* · radius border-radius.input.md · min-height input.height.md (лише Input)
    │   ├─ Main       VERTICAL · padding Y dimension.1 (Input) / dimension.2 (Text-area)
    │   │   ├─ Label  padding X input.padding-left/right.md → Label text (text/sm, contextual.input.text.label.*)   ← Show label
    │   │   └─ Row
    │   │       ├─ Left slot   INSTANCE Input Side Left / Type=Icon container        ← Show left slot (лише Input)
    │   │       └─ Value       HORIZONTAL wrap · gap dimension.1 · padding X input.padding-*.md
    │   │           ├─ Tag ×2  INSTANCE Tag / State=Default                          ← Show tags (лише Input)
    │   │           └─ Value   text/lg, contextual.input.text.placeholder.*          ← Value
    │   └─ Right slot INSTANCE Input Side Right / Type=Icon container                ← Show right slot (лише Input)
    ├─ Error  → Error text (text/sm, contextual.input.text.validation-text)           видимий лише в State=Error
    └─ Helper → Helper text (text/sm, contextual.input.text.helper-text.default)     ← Show helper text
```

## Властивості
| Властивість | Тип | Значення / default |
|---|---|---|
| `State` | Variant | Default \| Hover \| Active \| Filled \| Error \| Disabled |
| `Type` | Variant | Input \| Text-area |
| `Label` / `Value` / `Helper text` / `Error text` | Text | Label / Placeholder / Helper text / Error text |
| `Show label` / `Show left slot` / `Show right slot` | Boolean | true |
| `Show tags` / `Show helper text` | Boolean | false |
| `Input Side Left`: `Type` | Variant | Button \| Icon container \| Number \| Payment system \| Country; `Choose Icon Left` (swap), `Show country code` |
| `Input Side Right `: `Type` | Variant | Button \| Icon container \| Text-btn \| currency \| icon + button; `Choose Icon Right` (swap) |

## Матриця станів (Type=Input)
| | Default | Hover | Active | Filled | Error | Disabled |
|---|---|---|---|---|---|---|
| Field fill | primary.default | = | = | = | = + border validation | primary.disabled (= default) |
| Label | схований | label.default | label.default | label.default | label.default | label.disabled |
| Value | placeholder.default | placeholder.default | placeholder.filled | placeholder.filled | placeholder.filled | placeholder.disabled |

## Токени (`mb/component`, `xon/component`)
Експорт від 2026-10-21 (`tokens/system/`).

| Токен | Де | MB | XON |
|---|---|---|---|
| `input.height.md` | Field min-height | `{size.600}` | = |
| `input.padding-left.md` / `input.padding-right.md` | Label, Value, слоти | `{spacing.300}` | = |
| `input.additional-text-gap.top` | корінь gap | `{spacing.100}` | = |
| `input.additional-text-gap.inside-horisontal` | Error, Helper gap | `{spacing.100}` | = |
| `input.icon-size.sm` / `.md` | іконки слотів | `{size.300}` | = |
| `input.gap.default` / `input.gap.phone` | Select / код країни | `{spacing.150}` / 2 | = |
| `border-radius.input.md` | Field | `{border-radius.core.300}` | = |
| `border.input.default` | Field (Error) | 1 | = |
| `contextual.input.fill.primary.default` / `.disabled` | Field | `{semantic.background.slate-2}` / → default | = |
| `contextual.input.border-color.validation` | Field (Error) | `{semantic.status.error.border.primary}` | = |
| `contextual.input.text.label.default` / `.disabled` | Label text | `{semantic.text.default.tertiary}` / `{semantic.text.disabled.primary}` | = |
| `contextual.input.text.placeholder.default` / `.filled` / `.disabled` | Value | tertiary / heading / disabled.primary | = |
| `contextual.input.text.helper-text.default` | Helper | `{semantic.text.default.secondary}` | = |
| `contextual.input.text.validation-text` | Error text | `{semantic.status.error.text.primary}` | = |
| `contextual.input.text.action-right` | `Clear` | `{core.brand-60.500}` | = |
| `dimension.1` / `dimension.2` | Main padding Y, Value gap | 4 / 8 | = |

Не використовуються в компоненті: `contextual.input.border-color.default/hover/active/disabled`, `input.*.sm`, `contextual.input.icon.*`, `contextual.input.text.placeholder.invert.*`, `input.label-gap-bottom`.

## Вкладені компоненти
- `Tag / State=Default` (сторінка Chip & Tag) — теги у значенні.
- Іконки `plus`, `chevron-down`, `close`, `arrow-triangle-down-filled`, прапор `Great Britan — Circle`, `Maestro` — remote (Static — Icons / бібліотеки платіжних систем).
- `Button` (Primary sm, Secondary sm) — у слотах.

## Рішення (історія)
1. 2026-10-21 — (команда) два набори `Input` зведено в один `Input` 12v; сторінка Forms розділена на `↳ Input` і `↳ Controls`.

## Відхилення від правил
- `description` набору заповнений (362 симв.) — правило 14.
- Немає `Inverted` — правило 15.
- `Input Side Right ` — пробіл у кінці назви; значення `currency`, `icon + button` — lowercase; `Icon 16*16` — назва шару.
- Токен `input.additional-text-gap.inside-horisontal` — опечатка (`horizontal`).
- Right slot: `paddingRight` прив'язаний до `input.padding-left.md`.
- `dimension.1` / `dimension.2` — core-шкала напряму, не `input.*` (правило 6).
- `contextual.input.text.action-right`, `contextual.input.border-color.*` — значення з `core.*`, не `semantic.*`.
- `Input Side Left / Payment system` бере `contextual.payment-method.fill` — чужий токен.
- Section `#808080` замість `#BBBBBB` (див. питання в реєстрі — повторюється на всіх 💛 сторінках).

## Відкриті питання
- Hover / Active без обведення — так задумано? Токени `border-color.hover/active` є, але не прив'язані.
- Розмір `sm` (токени є) — потрібен варіант?
- Описи в `description` — переносимо в скіл і очищаємо, чи команда тепер пише описи у Figma?

## Мета знімка
| | |
|---|---|
| Знімок (дайджест) | `snapshots/input.json` |
| Вивчено | 2026-10-21 |
| Експорт токенів | 2026-10-21 (без свіжого архіву) |
| Варіантів | 12 + 5 + 5 |
