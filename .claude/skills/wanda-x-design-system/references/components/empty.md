# Empty

Сторінка `↳ Empty - Ден 💛` · Section `Empty` (78315:453285, `#808080`) · набір `Empty` (78315:449009) · статус: Learned

## Призначення і характер
Порожній стан блоку: картинка + заголовок + опис + кнопка дії («Choose your Welcome Bonus»). Замінює продуктові `zero block`, `Welcom-bonus empty`, `Bets history empty mob` з аудиту.
- **Роль і місце:** порожні списки бонусів, історії ставок, транзакцій.
- **Поведінка:** `Fill=True` — картка `contextual.empty.fill` з обведенням 1 px і падінгами; `Fill=False` — лише контент без плашки й падінгів.
- **Розміри:** `xs` — заголовок `heading/md`, падінги 16; `md` — `heading/xl`, падінги 24, ширина FILL.
- **Inverted:** немає (токен `contextual.empty.color-inverted` у Token Studio є, не використаний).
- **MB vs XON:** однакові, крім радіуса (`border-radius.card.general`: MB `global.lg`, XON `core.300`).
- **Композиція:** слот `↳ Img` (138×138, min-height `contextual.empty.height`), `Button` Primary lg.

## Анатомія
```
Empty (COMPONENT_SET)   Size × Fill
└─ Variant  VERTICAL · CENTER · gap contextual.empty.gap (12) · radius border-radius.card.general
    │       Fill=True: fill contextual.empty.fill · border contextual.empty.border / border.empty.default · padding contextual.empty.padding-{horizontal,vertical}.{xs|md}
    ├─ ↳ Img     SLOT · min-height contextual.empty.height (138)        ← Img, ↳ Img
    ├─ Frame 2147203444  VERTICAL · gap contextual.empty.text-gap (4)
    │   ├─ Call to action  heading/md (xs) | heading/xl (md) · contextual.empty.color   ← Title, ↳ ✏️ Text
    │   └─ Description     text/lg · contextual.empty.color                             ← Discription,  ↳ ✏️ Text
    └─ Button    INSTANCE Button / Primary, lg                                          ← Button
```

## Властивості
`Size` = xs | md · `Fill` = False | True · Text `Title`, `Discription` · Boolean `↳ ✏️ Text`, ` ↳ ✏️ Text`, `Button`, `Img` · Slot ` ↳ Img`.

## Токени (MB = XON, якщо не вказано)
| Токен | Значення |
|---|---|
| `contextual.empty.fill` | `{semantic.background.1}` |
| `contextual.empty.border` | `{semantic.border.default.default}` |
| `contextual.empty.color` / `-inverted` | `{semantic.text.default.heading}` / `{semantic.text.default-invert.heading}` |
| `contextual.empty.gap` / `text-gap` | `{spacing.300}` / `{spacing.100}` |
| `contextual.empty.padding-horizontal.xs/.md`, `padding-vertical.xs/.md` | `{spacing.400}` / `{spacing.600}` |
| `contextual.empty.height` | 138 |
| `border.empty.default` | 1 |
| `border-radius.card.general` | MB `{border-radius.global.lg}` · XON `{border-radius.core.300}` |

## Відхилення від правил
- **У `Size=md` тексти не прив'язані до `Title` / `Discription`** — зміна тексту в інстансі md не працює.
- Дві Boolean з майже однаковою назвою: `↳ ✏️ Text` і ` ↳ ✏️ Text` (різниця — пробіл); `Discription` — опечатка.
- Шар `Frame 2147203444` — дефолтне ім'я.
- Радіус — чужий `border-radius.card.general` (правило 6: `border-radius.empty`).
- Розміри `xs | md` (без `sm`) — перевірити шкалу.
- Немає `Inverted` (токен є).

## Відкриті питання
- Текст за замовчуванням продуктовий (Welcome Bonus) — нейтральний плейсхолдер?

## Мета знімка
`snapshots/empty.json` · вивчено 2026-10-21 · токени 2026-10-21 · 4 варіанти.
