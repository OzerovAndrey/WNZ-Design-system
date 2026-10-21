# Anchor

Сторінка `↳ Anchor` · Section `Anchor` (78314:307705) · статус: зібрано заново 2026-10-19, чекає ревʼю (не Ready for dev).

## Призначення
Рядок якірних посилань на секції сторінки: до 4 пунктів з іконкою і лейблом. Два варіанти, як в Accordion: плашка `contextual.anchor.item[-invert].fill` (значення однакове), змінюється колір контенту — `contextual.anchor.item.color` / `contextual.anchor.item-invert.color` (один токен на текст і іконку).

## Анатомія
```
Anchor (COMPONENT, 78314:307677)  HORIZONTAL · HUG × 20 · без падінгів (відступи задає контейнер, куди ставлять Anchor)
└─ SLOT "Items" (78442:85)  HORIZONTAL · HUG · gap anchor/gap      ← property `Items` (SLOT)
    └─ N × INSTANCE Anchor/Item   (за замовчуванням 4: document, 777, statistics, rocket)

Anchor/Item (COMPONENT_SET, 78336:307494)   Inverted = False | True
├─ Inverted=False (78314:307672) / Inverted=True (78336:307489)
│   HORIZONTAL · HUG × anchor/item/height (20) · padding L/R anchor/item/padding-horizontal · gap anchor/item/gap
│   radius border-radius/anchor/item · fill contextual/anchor/item[-invert]/fill
├─ Icon   16×16 = anchor/item/icon-size · колір contextual/anchor/item[-invert]/color
└─ Label  text style text/md-strong · колір contextual/anchor/item[-invert]/color
```

## Властивості
`Anchor`: `Items` (Slot) — пункти додаються/видаляються/переставляються прямо в слоті інстансу; кожен пункт — інстанс `Anchor/Item` зі своїми властивостями.
`Anchor/Item`: `Inverted` (False | True — обирається на кожному пункті), `↳ 💠 Icon` (swap), `✏️ Label` (text). Лейбл завжди видимий.

## Токени (`mb/component`, `xon/component`)
JSON: `tokens/anchor.mb.component.json`, `tokens/anchor.xon.component.json` (корінь репо).

| Токен | Значення (MB = XON, якщо не вказано інше) |
|---|---|
| `anchor.gap` | `{spacing.200}` 8 |
| `anchor.item.height` | 20 |
| `anchor.item.padding-horizontal` | `{spacing.200}` 8 (лівий і правий) |
| `anchor.item.gap` | `{spacing.150}` 6 |
| `anchor.item.icon-size` | **16** |
| `border-radius.anchor.item` | MB `{border-radius.core.full}` · XON `{border-radius.core.300}` |
| `contextual.anchor.item.fill` | `{semantic.fill.default}` |
| `contextual.anchor.item.color` | `{semantic.text.default.heading}` — текст + іконка |
| `contextual.anchor.item-invert.fill` | `{semantic.fill.default}` |
| `contextual.anchor.item-invert.color` | `{semantic.text.default-invert.heading}` — текст + іконка |

## Прив'язка
Токени Token Studio стоять на шарах напряму (plugin data `tokens`) + однойменні змінні колекції `Product`.

## Історія рішень (фінальний стан — у таблиці токенів)
1. Точна копія старого Anchor (67758:49763) за правилами ДС; власні токени `anchor.*`.
2. Лейбл темний замість білого — білий не читався на світлому фоні.
3. Іконка 20 → **16 px** — упиралась у краї пункту висотою 20.
4. Варіант `Inverted=True` (як в Accordion/Tabs). ~~Темна підкладка `slate-1`~~ — **скасовано**: як в еталоні, `Inverted` міняє лише колір контенту, плашка та сама `semantic.fill.default`.
5. Структура «в рядок»: `contextual.anchor.item.{fill,text,icon}` без рівня `.default`; іконка = колір тексту.
6. ~~Кольори з core під кожен бренд~~ — **скасовано**: кольори компонентів беруться **тільки з alias `semantic.*`**.
7. ~~XON `Inverted=False` на `semantic.text.static.primary`~~ — **скасовано**: як в еталонах (Accordion `color`, Tabs `content`), `Inverted=False` бере `semantic.text.default.*` — у MB темний, у XON білий (XON — темний продукт, компонент лежить на темному фоні).

8. Оптимізація: текст і іконка — один токен `color` (6 → 4 кольорові токени). Структура `item` / `item-invert` і окремі плашки `fill` **зберігаються** (рішення команди).

9. Пункти збираються в **слоті `Items`** (як `Navigation`), замість фіксованих `Item #1…#4` з Boolean; `Anchor` — один компонент, `Inverted` обирається на `Anchor/Item`.

10. Падінги айтема 8 / 12 → один `anchor.item.padding-horizontal` = 8.

11. Обгортка `Anchor` без горизонтальних падінгів; токен `anchor.padding-horizontal` видалено.

## Відкриті питання
- Іконка для multiplier — `rocket` (альтернативи `flash`, `scale-up`).
- Після приймання: старий Anchor → `Deprecated/Anchor`, інстанси в лейаутах переключити.
