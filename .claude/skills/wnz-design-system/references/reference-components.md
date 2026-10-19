# Еталонні компоненти (Ready for dev)

Atoms: **Accordion · Badge · Button · Link · Divider · Dropdown · Label · Loader**.
Нижче — правила, витягнуті з їхньої реальної будови (дані з файлу станом на 2026-10-19).

## 1. Набори і варіанти

| Компонент | Набір | Варіантів | Властивості |
|---|---|---|---|
| Button | `Button` | 120 | `Variant` = Primary \| Secondary \| Tertiary \| Tertiary-Invert \| Static · `Size` = lg \| md \| sm · `State` = Default \| Hover \| Active \| Disabled · `Label` = True \| False · bool `⬅️ Icon`, `Icon ➡️` · swap `↳ 💠 Component` |
| Button | `Button/Link` | 3 | `State` = Default \| Inverted \| Hover · bool `Label`, `⬅️ Icon`, `Icon ➡️` |
| Badge | `Badge` | 9 | `Variant` = Warning \| Primary \| Outlined · `Size` = lg \| md \| sm |
| Accordion | `Accordion` | 12 | `State` = Closed \| Mixed \| Openned* · `Inverted` = False \| True · `Heading` = False \| True · slot `Layout` |
| Link | `Link` | 21 | `Variant` = Default \| Accent · `Size` = md \| sm · `State` = Default \| Invert \| Hover · `Strong` = False \| True |
| Divider | `Divider` | 2 | `Variant` = Primary \| Secondary · bool `Label` |
| Dropdown | `Dropdown` | 8 | `Position` = Top — Left … Right — Center · slots `Trigger`, `Body`, `↳ Slot` · bool `Show`, `Header [sticky]` |
| Dropdown | `Dropdown/Item` | 3 | `State` = Default \| Hover \| Selected · bool `Caption`, `⬅️ Icon`, `Icon ➡️`, `⬅️ Slot`, `Slot ➡️` |
| Label | `Label` | 24 | `Variant` = Primary … Sale \| Timer \| Transparent light · `Label`, `Counter` = True \| False · bool `Icon`, `Indicator` |
| Loader | `Spinner` | 1 (component) | — |

\* `Openned` — опечатка навіть в еталоні, виправити на `Opened` (див. беклог).

## 2. Анатомія Button (як еталон для всіх інтерактивних компонентів)

`Variant=Primary, Size=md, State=Default, Label=True`

```
COMPONENT  auto layout HORIZONTAL · HUG × FIXED · padding 0/20/0/20 · gap 8
├─ INSTANCE  "⬅️ Icon"   ← bool "⬅️ Icon", swap "↳ 💠 Component"
├─ TEXT      "Label"     ← text style text/button/md
└─ INSTANCE  "Icon ➡️"   ← bool "Icon ➡️", swap " ↳ 💠 Component"
```

Прив'язки:

| Властивість | Токен |
|---|---|
| height | `button/height/{size}` |
| padding left/right | `button/padding-horizontal/{size}` |
| radius (4 кути) | `border-radius/button/{size}` |
| icon width/height | `button/icon-size/{size}` |
| fill | paint style `contextual/button/{variant}/fill/{state}` (градієнт; стопи прив'язані до `core/brand-10/*`) |
| stroke | `contextual/button/{variant}/border-color/{state}` |
| text fill | `contextual/button/{variant}/text/{state}` |
| typography | text style `text/button/{size}` + змінні `font-size/main/*`, `main`, `line-height/text-*`, `text/stronger` |
| effect | effect style `shadow/button/{variant}/{state}` (колір/blur/offset — змінні) |

**Слабкі місця навіть в еталоні (не копіювати):**
- `gap 8` не прив'язаний, хоча токен `button/gap` існує і використовується в інших компонентах.
- Два swap-свойства розрізняються лише пробілом на початку (`↳ 💠 Component` / ` ↳ 💠 Component`) — краще `↳ 💠 Icon left` / `↳ 💠 Icon right`.
- `text/button/lg` і `text/button/md` — однакові (Inter Extra Bold 16). Або розвести, або злити.
- На сторінці Button лежать сторонні набори (`Button/Toggle`, `icons / placeholder`, `Header/Button`), загублений інстанс `social` і немає Section.

## 3. Загальні патерни еталонів

- **Section на компонент**: Badge, Accordion, Link, Divider, Dropdown, Label, Loader (`Spinner`) — кожен у Section з назвою компонента.
- **Під-компоненти** через `/`: `Dropdown/Item`, `Button/Link`.
- **Розмір** = окремий варіант `Size` (lg | md | sm), а всі розмірні величини — токени `{component}/{property}/{size}`.
- **Бінарні варіанти**, що змінюють структуру, — Variant з `True | False` (`Label`, `Inverted`, `Strong`, `Counter`). Якщо змінюється лише видимість шару — Boolean property.
- **Іконки**: bool `⬅️ Icon` / `Icon ➡️` + вкладений swap з префіксом `↳ 💠`.
- **Слоти**: Slot-властивості (`Trigger`, `Body`, `Layout`, `↳ Slot`) для контейнерів (Dropdown, Tooltip, Popover, Accordion).
- **Позиціонування поповерів**: `Position` = `Top — Left | Top — Center | Top — Right | Bottom — … | Left — Center | Right — Center` (em dash з пробілами).
- **Текст**: 0 текстів без стилю/змінних у всіх еталонах.
- **Шари**: 0 дефолтних назв (`Frame 123`) у всіх еталонах.
- **Маски** (`Mask` в Accordion, Dropdown) — допустимий hardcoded fill, бо це службовий шар.
- **Опису компонентів (description) немає ні в одного еталону** — новий стандарт DoD вимагає додати.
