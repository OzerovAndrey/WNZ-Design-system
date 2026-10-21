---
name: wnz-design-system
description: Правила, еталони та чекліст очистки для Figma-файлу "[WNZ] Design system" (fileKey 3MbdWPLOGBjBj92Y3EnPYN, бренди MB / XON, Token Studio core/alias/component). Use ANY TIME the user works on WNZ components, layouts or tokens — audit, cleanup, fixing a component, building a layout from WNZ components — or mentions "WNZ", "WNZ ДС", file key 3MbdWPLOGBjBj92Y3EnPYN, MB/XON themes. INDEX file — details live in references/*.md, load only what the task needs.
---

# [WNZ] Design system — index

Дизайн-система, отримана від іншого департаменту. Мета команди — **очистити її від неправильних рішень** і далі використовувати як робочу бібліотеку. Еталон якості — компоненти, позначені **Ready for dev**.

## Файл

| | |
|---|---|
| Figma | `https://www.figma.com/design/3MbdWPLOGBjBj92Y3EnPYN/-WNZ--Design-system` |
| fileKey | `3MbdWPLOGBjBj92Y3EnPYN` |
| Бренди / теми | **MB**, **XON** (Token Studio: у кожного бренду сети `core`, `alias`, `component`) |
| Змінні у Figma | 1 колекція `Product`, режими `MB` / `XON` |
| Розділи сторінок | `Tokens` · `Logotype` · `Breakpoints` · `Components` · `Atoms` · `Molecules` · `Organisms` · `[???]` · `All Cards` · продуктові лейаути (`Homepage +`, `Cashbox`, `Profile +` …) |

## Статус компонентів

**Еталон (Ready for dev, виправлено нашою командою):** Atoms → `Accordion`, `Badge`, `Button`, `Link`, `Divider`, `Dropdown`, `Label`, `Loader`.

Все інше — **не еталон**, поки не пройшло `references/definition-of-done.md`. Поточний стан кожної сторінки — у `references/audit-2026-10-19.md`.

> Статус Ready for dev через Plugin API **не читається** (`devStatus` → "not a supported API"). Якщо список еталонів змінився — оновіть його тут вручну.

## 16 золотих правил

1. **Точна копія — нічого не додумувати.** Переробляючи компонент, зберігаємо вигляд, розміри, кількість елементів і стани оригіналу; змінюємо лише збірку. Нові варіанти/брейкпоінти/слоти — тільки на запит команди (`references/rebuild-workflow.md`).
2. **Еталон перш за все.** Перед тим як правити компонент — відкрий найближчий еталон і повтори його анатомію, неймінг і прив'язки токенів (`references/reference-components.md`).
3. **Instance, не імітація.** У компонентах і лейаутах — тільки інстанси реальних компонентів. Не малювати кнопку/бейдж фреймом.
4. **Токени Token Studio — напряму на шар.** Не лише Figma-змінна: на кожну властивість ставиться токен Token Studio (plugin data `tokens`) + однойменна змінна, як в еталоні Button (`references/tokens.md`).
5. **Жодного hardcode.** Колір, радіус, висота, падінги, розмір іконки, типографіка — через змінні/стилі. Hex-значення в компоненті = дефект.
6. **Свої компонентні токени.** Компонент прив'язується до власних токенів `<component>.*`, `border-radius.<component>.*`, `contextual.<component>.*` у `mb/component` і `xon/component` (значення кольорів — **тільки alias `semantic.*`**, не `core.*`), а не напряму до semantic/core і не до токенів інших компонентів (`references/token-studio.md`).
7. **Жодних чужих бібліотек.** Змінні з чужих бібліотек (`Colors/text`, `Radius/0`, `spacing/xxs`, `grid/12`, `list item/*` …) заборонені — заміняти на токени колекції `Product`.
8. **Один компонент — одна сутність.** Дублікати (`Input` ×2, `Selection-controls` vs `Toggles`, 10 наборів `Status` …) зливаються в один набір з варіантами; legacy видаляється або маркується `Deprecated`.
9. **Неймінг за стандартом** (`references/naming.md`): Title Case англійською, без опечаток, без `Property 1`, без `Frame 123`.
10. **Auto layout всюди**, де є 2+ дочірніх елементи. Absolute — тільки для оверлеїв/бейджів/масок.
11. **Продуктові компоненти — не в ДС.** Hall of fame, Cashbox, Welcome bonus, Lootboxes тощо переїжджають у продуктовий файл або розділ Patterns.
12. **Кожен компонент — у власній Section** з назвою компонента, без сміття на канвасі (нотатки, загублені інстанси, вектори). Section **сіра `#BBBBBB`**, обведення чорне 10%, радіус 2 — як `Anchor`; оформлення — `references/section-layout.md`.
13. **Іконки — тільки зі Static — Icons.** Будь-яка іконка в ДС (векторна, detached, з іншої бібліотеки) замінюється на найближчий відповідник з бібліотеки `Static — Icons` (`references/icons.md`).
14. **Документація — тільки в скілі.** Поле `description` компонентів у Figma лишаємо порожнім, нотатки на канвас не ставимо. Призначення, анатомія, токени, рішення — у `references/components/<component>.md`.
15. **Inverted у кожного компонента.** Окрема властивість `Inverted = False | True` для всіх поєднань варіантів; міняється лише колір контенту, токени `contextual.<component>.<part>-invert.*`. Не `State=Invert`, не окремий набір (`references/naming.md` → Inverted).
16. **Не редагувати без дозволу.** Аудит = read-only. Зміни у файлі — тільки після погодження; виправлену копію ставити поруч з оригіналом.

## Коли що читати

| Задача | Файл |
|---|---|
| Як влаштований еталон (Button, Badge, Dropdown …) | `references/reference-components.md` |
| Назви компонентів, властивостей, варіантів, шарів | `references/naming.md` |
| Структура токенів, як прив'язувати, відомі проблеми | `references/tokens.md` |
| Чи можна ставити компоненту Ready for dev | `references/definition-of-done.md` |
| **Переробити компонент (покроково)** | `references/rebuild-workflow.md` |
| Token Studio: формат, «в рядок», semantic-only, вставка JSON, запис у storage, Inspect | `references/token-studio.md` |
| Повний експорт токенів (джерело правди) | `tokens/system/` у корені репо |
| Зробити аудит сторінки/компонента скриптом | `references/audit-script.md` |
| Що вже знайдено, беклог по сторінках | `references/audit-2026-10-19.md` |
| Збирати або чистити лейаут | `references/layouts.md` |
| Замінити / підібрати іконку | `references/icons.md` |
| Опис конкретного компонента (анатомія, токени, рішення) | `references/components/<component>.md` |
| Як оформлювати Section на сторінці компонента | `references/section-layout.md` |

## Технічні нотатки Figma MCP (перевірено на цьому файлі)

- **Доступ:** Figma-конектор працює від акаунта `evgeniy.bogdanov@ys.bet` (Wanda — visualvoyager/desops). Перед змінами — пробний запис; `read-only mode` = немає Can edit на файл.

- Сторінки вантажаться ліниво: `get_metadata` без nodeId показує лише першу сторінку; список усіх сторінок — через `use_figma` → `figma.root.children`.
- Одна сторінка = один `use_figma` виклик; кілька сторінок — паралельні виклики (або батч по 4–7 сторінок для read-only).
- `node.devStatus` недоступний у Plugin API — статус Ready for dev вручну.
- `componentPropertyDefinitions` кидає помилку на зламаних наборах ("Component set has existing errors") — завжди `try/catch`; сам факт помилки = дефект.
- Корінь INSTANCE повертає `boundVariables` свого мейн-компонента — при підрахунку токенів не плутати їх з прив'язками на локальних шарах.
- Єдине джерело іконок — бібліотека `Static — Icons` (fileKey `J3DHQyf6ARy401o7WywySC`). Усе інше (вектори, `BR / Default / …`, `icons / general / …`, `icon / status / …`, голі `close`/`cancel`) — під заміну, див. `references/icons.md`.
- Token Studio (storage у файлі, запис токенів, токени на шарах) — `references/token-studio.md`.

## Журнал
- 2026-10-21 — Chips і Tag перескладено за еталоном Anchor (State × Inverted, токени `contextual.<c>.base[-invert]`, сіра Section); Tag — один компонент з іконкою `close`, без окремої кнопки.
- 2026-10-21 — правила: Section сіра `#BBBBBB` (еталон — Section `Anchor`); `Inverted` обов'язковий для всіх компонентів (`naming.md`, DoD, `rebuild-workflow.md`).
- 2026-10-19 — Anchor: кольори з alias semantic, структура «в рядок», Inverted, іконка = текст, змінні перестворено після Export.
- 2026-10-19 — аудит файлу (`audit-2026-10-19.md`), створено скіл. Перший перескладений компонент — `Anchor` (`references/components/anchor.md`), на ньому відпрацьовано `rebuild-workflow.md`.
