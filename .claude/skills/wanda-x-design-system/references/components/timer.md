# Timer

Сторінка `↳ Timer 💛` · набір `Timer` (77857:445144) — **без Section** · статус: Learned

## Призначення і характер
Зворотний відлік до кінця акції/турніру (`Type=Timer`: «Ends in: 12d : 12h : 35m : 12s») або діапазон дат (`Type=Date`: «14.01.25 – …»).
- **Роль і місце:** картки турнірів, лотерей, бонусів, банери.
- **Поведінка:** `Fill=true` — капсула `contextual.timer.fill` з падінгами 8/5; `Fill=false` — лише текст. `Accent=true` — числа й одиниці в `semantic.text.brand.secondary` (жовтий), лейбл лишається `secondary`. `Invert=true` — текст `default-invert.*` для темного фону; плашка не змінюється.
- **MB vs XON:** однакові токени; accent MB `#FFBE19`-ряд, XON — свій brand.
- **Масштаб:** один розмір, `text/md` (числа `text/md-stronger`). HUG.
- **Композиція:** окремі блоки `Day / Hour / Minute / Second` вмикаються Boolean-ами, розділювачі `:` — `Splitter`, `Splitter2`, `Splitter3`.

## Анатомія
```
Timer (COMPONENT_SET)   Type × Invert × Fill × Accent
└─ Variant  HORIZONTAL · HUG · gap contextual.timer.gap (6)
    │       Fill=true: fill contextual.timer.fill · radius border-radius.timer.general · padding contextual.timer.padding-{horizontal,vertical}
    ├─ Ends in:   text/md · semantic.text.default[-invert].secondary        ← ✏️ Label, ↳ ✏️ Text
    └─ base  HORIZONTAL · gap 2
        Type=Timer: Frame 31 / Frame 34 / Frame 32 / Frame 33 (12 + d/h/m/s) з `:` між ними
        Type=Date:  Date Range Container ×2 (Start/End Date) + To Label + `:` + Frame 33
```

## Властивості
| Властивість | Тип | Значення |
|---|---|---|
| `Type` | Variant | Timer \| Date |
| `Invert` | Variant | false \| true |
| `Fill` | Variant | false \| true |
| `Accent` | Variant | false \| true |
| `Label` | Text | Ends in: |
| ` ↳ ✏️ Text` | Boolean | показ лейбла |
| `Day`, `Hour`, `Minute`, `Second` | Boolean | блоки одиниць |
| `Splitter`, `Splitter2`, `Splitter3` | Boolean | розділювачі `:` |

## Токени (MB = XON)
| Токен | Значення |
|---|---|
| `contextual.timer.fill` | `{semantic.fill.default}` |
| `contextual.timer.gap` | 6 |
| `contextual.timer.padding-horizontal` / `-vertical` | 8 / 5 |
| `border-radius.timer.general` | `{border-radius.core.full}` |
| Тексти | `semantic.text.default.{secondary,heading}`, `default-invert.*`, `brand.secondary` — напряму, без `contextual.timer.*` |

## Рішення (історія)
1. 2026-10-21 — (команда) Timer зведено в один набір 16v (Type × Invert × Fill × Accent).

## Відхилення від правил
- Імена шарів блоків різні між варіантами: у `Fill=true, Invert=false, Accent=false` Day — це `Frame 31`, в інших 7 варіантах `Type=Timer` Day — `Frame 34` (порядок на екрані правильний «d : h : m : s»). Через це перемикання варіантів може скидати оверрайди тексту в інстансах.
- `Type=Timer, Fill=true, Accent=true` — лейбл не прив'язаний до властивості `Label` (текст не міняється з інстансу).
- 40 дефолтних імен (`Frame 31…34`), шари `12`, `35`, `14.01.25` — правило 9.
- `Invert` замість `Inverted`; значення `false | true` lowercase — правило 15 / naming.
- 3 Boolean `Splitter/2/3` замість логіки «розділювач між видимими блоками».
- Кольори тексту — `semantic.*` напряму, немає `contextual.timer.text.*` (правило 6).
- Немає Section — правило 12.

## Відкриті питання
- Перейменувати блоки за змістом (`Day`, `Hour`, `Minute`, `Second`) однаково в усіх варіантах?
- `Type=Date` — використовується в продукті? Обидва типи в одному наборі чи розділити?

## Мета знімка
| | |
|---|---|
| Знімок (дайджест) | `snapshots/timer.json` |
| Вивчено | 2026-10-21 |
| Експорт токенів | 2026-10-21 |
| Варіантів | 16 |
