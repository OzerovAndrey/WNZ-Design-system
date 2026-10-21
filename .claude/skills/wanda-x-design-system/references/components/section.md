# Section (компонент лейауту)

Сторінка `↳ Section 💛` · набір `Section` (78117:335001) — **без Figma-Section навколо** · статус: Learned

> Не плутати з Figma Section (контейнер на канвасі, `section-layout.md`). Це компонент блоку сторінки.

## Призначення і характер
Блок контенту на сторінці продукту: заголовок (`Heading`) + слот з картками + навігатор (`Navigator`), опційно фонове зображення.
- **Роль і місце:** секції головної / Gamehall («Popular», «New games» …).
- **Поведінка:** `device=desktop` — радіус 24, падінги 24/32/16/32, `Heading Size=lg`, gap у слоті 24; `mobile` — без радіуса, падінги 24/16, `Heading Size=xs`, gap 16.
- **Фон:** `semantic.background.1` + абсолютний слот `BG` (`Back Img`).
- **Inverted:** немає. **MB vs XON:** через semantic.

## Анатомія
```
Section (COMPONENT_SET)   device
└─ Variant  VERTICAL · FIXED 1136 / 360 · fill semantic.background.1
    ├─ BG         SLOT absolute                    ← Back Img
    ├─ Heading    INSTANCE Heading / Size=lg|xs, Type=Secondary
    ├─ Slot       SLOT HORIZONTAL · gap 24 | 16
    └─ Navigator  INSTANCE Navigator
```

## Токени
Лише `semantic.background.1` (fill, Token Studio) і Figma-змінна `layout/padding-horizontal/{lg|xs}` (32 / 16) **без токена Token Studio**. Радіус 24, gap 16/24, падінги верх/низ — hardcode.

## Відхилення від правил
- Hardcode: radius, gap, padding top/bottom; padding X — лише змінна (правило 4–5).
- Немає власних токенів `section.*` (правило 6).
- `device=mobile|desktop` — lowercase і не за шкалою breakpoint (у Header/Footer/Layout уже `3xs…3xl`).
- Компонент не в Figma Section (правило 12).

## Мета знімка
`snapshots/section.json` · вивчено 2026-10-21 · 2 варіанти.
