# Anchor — перескладання (2026-10-19)

Статус: **заблоковано** — Figma MCP підключений акаунтом без права редагування файлу (`Can't call ... in read-only mode`). Специфікація і скрипт готові; запуск — після видачі edit-доступу.

## Що не так в оригіналі (`Anchor`, node 67758:49763, сторінка `↳ Anchor`)
| # | Проблема | Правило |
|---|---|---|
| 1 | Одиночний COMPONENT без Section, без опису | SKILL §9, DoD |
| 2 | 4 айтеми захардкожені, немає слота — кількість не змінити без detach | DoD «Властивості» |
| 3 | Падінги прив'язані до чужої змінної `Mobile breakpoint` (remote) | tokens.md «Заборонені змінні» |
| 4 | Висота `Navigation/Item` перебита з 32 на 20 (override розміру) | reference-components |
| 5 | Колір лейблу перебито на `contextual/button/primary/text/default` замість `contextual/nav-menu/item/color/*` | tokens.md п.2 |
| 6 | Іконки з віддаленої бібліотеки (`menu / books`, `menu / slot_mashine`, `menu / leaderboard`, `icons / tournaments lottery / multiplier`) | icons.md |
| 7 | Немає брейкпоінтів: мобільна версія (скрол + фейдер) і десктоп не розрізняються | naming.md «Breakpoint» |
| 8 | gap 8 захардкожений | DoD «Токени» |

## Нова структура
```
SECTION "Anchor"
└─ COMPONENT_SET "Anchor"   (description заповнений)
   ├─ Breakpoint=3xs   HORIZONTAL · FIXED 360 × HUG · clip · padding L/R = layout/padding-horizontal/xs (16)
   │   ├─ SLOT "Items"  HORIZONTAL · gap = spacing/200 (8) · HUG
   │   │   └─ 4 × INSTANCE Navigation/Item (1-й State=Active, решта Default, висота 32 як у мейна)
   │   └─ INSTANCE Fader (Right) "Fader ➡️"  absolute, right, 48×32  ← bool "Fader ➡️"
   └─ Breakpoint=lg    HORIZONTAL · HUG × HUG · padding 0
       └─ SLOT "Items"  (те саме)
FRAME "Anchor — preview"  (обидва брейкпоінти інстансами на semantic/background/page)
```
Властивості: `Breakpoint` = `3xs | lg` · slot `Items` · bool `Fader ➡️`.

## Заміна іконок (Static — Icons)
| Було (remote) | Стало | key |
|---|---|---|
| menu / books | `document` | b79ce989137f0738563539dd460636ccd424900d |
| menu / slot_mashine | `777` | 22c8ef23241d853b4d9d9ff1de09678e398c9a95 |
| menu / leaderboard | `statistics` | 05a9e11fb5b77077ee4536174aeb73bec768dd47 |
| icons / tournaments lottery / multiplier | `rocket` (альтернатива: `flash`, `scale-up`) | 6277637e21d265afbc79544642685895a3e9ef99 |

Іконка 20×20 у слоті `Icon`, колір = `contextual/nav-menu/item/color/{state}`.

## Токени
| Що | Токен | MB / XON |
|---|---|---|
| бокові падінги 3xs | `layout/padding-horizontal/xs` | 16 / 16 |
| gap між айтемами | `spacing/200` | 8 / 8 |
| фон айтема | `contextual/nav-menu/item/fill/{default,hover,active}` | — |
| текст/іконка айтема | `contextual/nav-menu/item/color/{default,hover,active}` | — |
| радіус айтема | `border-radius/nav-menu/item` | full / 12 |
| фейдер | `contextual/fader/primary-props/{start,end}` | — |

## Залежності з боргом (поза скоупом, у беклог)
- `Navigation/Item`: немає TEXT-властивості для лейблу; дефолтна іконка — remote `a-alpha-dynamic`; колір іконки не прив'язаний до стану.
- `Fader`: властивість `Property 1=Left|Right` → `Side=Left|Right`.
- Оригінальний `Anchor` після приймання нової версії → `Deprecated/Anchor`, інстанси в лейаутах переключити.
