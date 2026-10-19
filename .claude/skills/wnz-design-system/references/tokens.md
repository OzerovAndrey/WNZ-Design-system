# Токени

## Структура

**Token Studio**: теми `MB`, `XON`; у кожного бренду сети `core` → `alias` → `component`.
**Figma**: 1 колекція `Product`, режими `MB` / `XON`, 849 змінних (2026-10-19).

| Шар у Figma | К-сть | Що це | Можна прив'язувати в компоненті? |
|---|---|---|---|
| `core/*` | 142 | примітиви (`brand-10`, `brand-30`, `brand-60`, `brand-preset`, `white`, `grey`, `content`, `vibrant`, `validation`, `additionals`) | ❌ ні (виняток: кольори всередині effect-тіней, градієнтні стопи — до рішення команди) |
| `semantic/*` | 96 | `background`, `fill`, `text`, `icon`, `border`, `link`, `divider`, `status` | ✅ так |
| `contextual/*` | 382 | компонентні токени, 50+ компонентів | ✅ так, лише **свого** компонента |
| розмірні (`button/*`, `input/*`, `status/*`, `dropdown-menu/*`, `popup/*`, `switcher/*`, `spacing/*`, `dimension/*`) | ~100 | висоти, падінги, гепи, розміри іконок | ✅ так |
| `border-radius/*` | 58 (36 груп) | радіуси по компонентах | ✅ так, лише свого компонента |
| типографіка (`font-size/*`, `line-height/*`, `main`, `accent`, `Light…Black`, `text/*`) | ~35 | шрифти, кеглі, ваги | ✅ через text style + змінні |
| ефекти (`blur/*`, `depth/*`) | 23 | параметри тіней | ✅ всередині effect style |

## Правила прив'язки

1. Колір у компоненті → `contextual/{component}/…` або `semantic/…`. **Ніколи hex.**
2. Компонент використовує **лише свої** contextual/radius токени. `Popover` не бере `contextual/tooltip`, `Switcher` не бере `border-radius/welcome-bonus`, `Footer` не бере `contextual/special-menu-item`.
3. Будь-яка розмірна величина, що змінюється з `Size`, — токен `{component}/{property}/{size}`.
4. Text: text style **+** змінні типографіки (як у Button). Текст без стилю = дефект.
5. Тіні — effect style `shadow/…`; без стилю = дефект.
6. Градієнти — paint style (змінні не підтримують градієнт), стопи прив'язані до змінних.
7. **Змінні з чужих бібліотек заборонені** (див. нижче).

## Відомі проблеми токен-системи

| # | Проблема | Дані | Що робити |
|---|---|---|---|
| T1 | Scopes не налаштовані | 838 з 849 змінних мають `ALL_SCOPES` | Виставити scopes: fill/stroke/text/gap/radius/width-height/effect |
| T2 | contextual → core напряму | 173 contextual-токени посилаються на `core`, 168 — на `semantic`, 20 — на інший contextual, 21 — сире значення | Рішення команди: дозволити `core` лише для білого/прозорих або завжди через semantic. Сирі значення в contextual — прибрати |
| T3 | semantic з продуктовими назвами | `semantic/background/1,2,3,5`, `slate-1…4`, `slate-for-cards`, `*/banner-cart` | Перейменувати за роллю (`surface/primary`…), продуктове — в contextual |
| T4 | Дубль-опечатка | `contextual/achievements` і `contextual/achivments` | Злити в `achievements` |
| T5 | Погані символи | `border-radius/filter&sort`, `border-radius/toast&cookies` | `filter-sort`, `toast-cookies` |
| T6 | Корінь без групи і з великої | `main`, `accent`, `Light`, `Regular`, `Medium`, `Semibold`, `Bold`, `Extrabold`, `Black` | `font-family/main`, `font-weight/light` … |
| T7 | Радіуси по фічах | 36 груп `border-radius/*`, включно з `welcome-bonus`, `wheel`, `lottery-tournament`, `gamehall`, `profile` | Зменшити до шкали `border-radius/core/*` + компонентні для компонентів ДС; фічеві — в продуктовий файл |
| T8 | Contextual для фіч | `contextual/wheel`, `hall-of-fame`, `strip`, `cashbox`, `ingame`, `homepage`, `shop`, `news`, `deals` … | Винести в продуктовий набір токенів |
| T9 | Дублювання стиль/змінна | 60 paint styles, частина дублює змінні (`contextual/button/primary/fill/*`) | Стилі лишити тільки для градієнтів |
| T10 | Text styles з брендовим шрифтом | `heading/*` = `MrBet Black` | Перевірити, що `fontFamily` у стилях прив'язаний до змінної `accent`, інакше XON не перемкне шрифт |
| T11 | Дубль text styles | `text/button/lg` = `text/button/md` (Inter Extra Bold 16) | Розвести або злити |
| T12 | Ефекти по компонентах | 33 effect styles (`shadow/button/*` ×16, `shadow/wheel/*`, `shadow/homepage/*`) | Шкала `shadow/drop/{xs..ml}` + компонентні лише для ДС |

## Заборонені (чужі) змінні, знайдені у файлі

Підтягуються з іншої бібліотеки — на сторінках Banner, Breadcrumbs, Switcher, Thumb, List item, Footer, Tabbar, Page:

`Colors/text`, `Colors/border`, `Radius/0`, `radius/button`, `radius/tooltip`, `radius/sm`, `spacing/xxs`, `spacing/m`, `grid/8|12|16|32`, `border/sm`, `min-width/button`, `text-wrap/padding-fix`, `carousel/pagination`, `blur/background`, `breadcrumbs/*`, `game/*`, `list item/*`, `button/sm`, `button/secondary`, `font/caption md`, `navigation bar/item`, `footer/radius*`.

Окремий випадок — **дублі з однаковою назвою**: `Mobile breakpoint`, `border-width/025`, `max-width/content` існують і локально, і в чужій бібліотеці; на Banner, Footer та ін. прив'язана саме чужа версія. Перепризначити на локальну.

Кожну замінити на відповідник з колекції `Product`; якщо відповідника немає — створити токен у Token Studio (у правильному сеті) і синхронізувати.
