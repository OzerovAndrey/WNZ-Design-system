# Table — інвентаризація та план універсального компонента

Статус: **інвентаризація (2026-10-23), збірку не розпочато** — чекає рішень Андрея (розділ «Питання»).

**2026-10-23 — оригінали зібрано на сторінці `↳ Table -`** (на запит Андрея) у 4 Section з підписами (назва · звідки · що це · node): `79045:532` 1. Лідерборди, `79045:546` 2. Транзакції та платежі, `79045:557` 3. Історія з розкриттям рядка, `79045:574` 4. Таблиці з колонками. Мейни перенесено (інстанси в макетах лишились прив'язаними); фрейми `Tables` з FAQ — копії. 6 наборів зі шрифтом **MrBet Black** конектор перенести не може (шрифт недоступний) — на їхньому місці червона пунктирна рамка, переносить Андрей: `Leaders`, `Hall-of-fame / Table` (лежить поверх рамки, поза Section), `Bets history content`, `Bets history content mob`, `Time limit history`, `content limit mob`. Не перенесено: `Leaders/Multipliers` (картки), `time limit history` 56×56 (ілюстрація), сироти `cell igame additional` / `thead cell igame additional` (мейн без сторінки).
Сторінка: `↳ Table -` (`78083:324361`).

## 1. Що лежить на сторінці `↳ Table -`
Лише продуктові набори (правило 11 — не ДС), жодного базового Table:

| Набір | Node | Варіанти | Що це |
|---|---|---|---|
| `Hall-of-fame / Table` | `48681:1133800` | `Type=Mobile(320-767) \| Desktop&Tablet(768-1920)` | хедер колонок + 9 рядків-карток (місце, гравець, статус-медаль, гра з thumb, сума), рядок поточного гравця підсвічений |
| `[M] Hall-of-fame / Player-number` | `48912:27815` | `Device × Type`, Boolean talisman | рядок лідерборду |
| `Hall-of-fame / Player-number-states` | `48912:28700` | `State=Default \| Current user` × `Device` | стани рядка |
| `transactions table item` | `48364:61133` | `state=hover \| default` | рядок-картка транзакції: шеврон, іконка, 2-рядковий текст, статус, сума + метод, kebab |
| `transactions table group` | `48539:44574` | `Property 1=Variant2` | розкрита група: ID, статус, сума, kebab + підрядок |
| `Welcome_bonus_row` | `33250:316385` | `Type=default \| bottom` | 2 колонки, розділювач між рядками |
| `Welcome_bonus_column` | `33250:316359` | — | заголовок + хедер колонок `Deposit / Bonus` + 3 рядки |

## 2. Таблиці поза сторінкою Table (не зібрані)
| Де | Набір / фрейм | Node | Тип |
|---|---|---|---|
| Tournaments + / Lottery + / Races + | `tourmanents / lottery leader table` | `68537:202555` | лідерборд на темній плашці, смугасті рядки, місце-медаль, поточний гравець — акцент |
| Tournaments + | `Table Header Lottery` (`Device=mobile\|desktop`) | `67722:62201` | хедер колонок `№ / Player / Sum` |
| Tournaments + | ` Tournaments / players, places` (`place=gold\|silver\|bronze`, `device`) | `67718:61873` | рядки топ-3 |
| Profile + | `Time limit history` / `table row` | `32979:1001414`, `32979:1001665` | 3 колонки без розділювачів, комірки 2-рядкові; empty state |
| Profile + | `Loyalty points history item` / `table item points exchange history` | `32979:1004457`, `32979:1004591` | рядок з розділювачем, шеврон, **розкривається** панеллю деталей |
| Profile + | `Betting history item`, `bet history mob item`, `Bets history content` | `32979:1004232`, `32979:1004742`, `34118:949048` | рядок з розкриттям (express), кнопка Cashout, статус Win/Loss |
| Cashbox (s2p) | `Payment history item` (8v), `transactions table group item mobile` | `48642:130910`, `48655:56422` | те саме, що `transactions table *` (дубль) |
| FAQ, Rules, Statistics + | фрейм `Tables`, `Accordion-content / Table-head` | `49705:48928`, `49622:53929` | класична сітка з хедером і розділювачами (4 колонки; та 2 колонки з медаллю) |
| Ingame + | `table row` (2v), `cell igame additional`, `thead cell igame additional` | `63335:462804`, `30827:106137`, `30827:106138` | рядок лідерборду в грі; комірки й хедер — сироти (головний компонент без сторінки) |
| Wheel of Fortune + | `spin history` | `61849:5540` | рядок історії на темній плашці |
| Achievements + | `Achivments table` | `68586:48661` | **не таблиця** (картка) — виключити |

## 3. Спільна анатомія (кандидат на універсальний компонент)
- **`Table`** — контейнер: необов'язковий `Table/Header` + SLOT `Rows` (preferred — `Table/Row`).
- **`Table/Header`** — рядок назв колонок (текст secondary, sm).
- **`Table/Row`** — горизонтальний рядок комірок. Варіанти, що реально зустрічаються:
  - `Style = Card | Divider | Plain` (картка з заливкою і радіусом та gap між рядками / лінія між рядками / без меж);
  - `State = Default | Hover | Current` (Current — рядок поточного гравця) + `Open` для рядків з деталями (панель під рядком — слот).
- **`Table/Cell`** — комірка; типи контенту: `Text`, `Text + Subtext` (2 рядки, мобільне згортання колонок), `Place` (номер / медаль), `Icon + Text`, `Thumb + Text`, `Status`, `Amount` (праворуч), `Action` (kebab / кнопка), `Chevron`.
- Мобільна версія = ті самі комірки в режимі `Text + Subtext`, без окремих Device-варіантів (`naming.md` → пристрій ≠ варіант).

## 4. Питання до Андрея (блокують збірку)
1. Сторінка Table містить не всі варіанти — переносимо на неї знайдені в п. 2 (у Section `Originals`) чи збираємо універсальний компонент одразу з усіх джерел?
2. Обсяг: які з типів п. 2 входять у Table, а які лишаються окремими (Betting history з Cashout, Transactions з групами — скоріше `List`/Accordion-патерн)?
3. Inverted: лідерборд турнірів і spin history стоять на темній плашці — робимо `Inverted` у `Table/Row` / `Table/Header`?
4. Розкриття рядка (`State=Open` + панель деталей) — частина `Table/Row` чи окремий компонент?
</content>
</invoke>

## 5. План збірки (рішення 2026-10-23)
Три різні таблиці за логікою, бо поводяться по-різному:
1. **Сітка** (`Table`) — хедер + рядки з текстовими комірками. Джерела: Time limit history, Welcome bonus, FAQ/Rules Tables.
2. **Лідерборд** — місце-медаль, поточний гравець, картки / смуги на темному. Джерела: Hall of fame, Tournaments/Lottery, Leaders, Ingame, spin history.
3. **Історія з розкриттям** — шеврон, іконка, статус, сума, дії, `State=Open`. Джерела: transactions/Payment history, Betting history, Loyalty/points.
`Table/Cell` — спільна комірка для всіх трьох.

## 6. Етап 1 — Сітка (зібрано 2026-10-23)
Section `Table` (`79056:3415`, сіра) праворуч від білих оригіналів, на рівні групи 4.

| Компонент | Node | Властивості | Анатомія |
|---|---|---|---|
| `Table` | `79056:291816` | SLOT `Head` (preferred `Table/Head/Cell`), SLOT `Rows` (preferred `Table/Row`), Boolean `Show head` | VERTICAL 676 FIXED; `Head`: HORIZONTAL, height `size/500` (40), gap `spacing/400`, 3 комірки FILL; `Rows`: VERTICAL gap 0, 3 рядки STRETCH |
| `Table/Row` | `79056:291751` | `Size = md \| sm` × `Divider = True \| False`; SLOT `Cells` (preferred `Table/Cell`) | HORIZONTAL 676; padding-v md `spacing/400` (16) / sm `spacing/200` (8), padding-h 0; Divider — нижнє обведення 1 px `semantic/divider/default/primary`; `Cells` gap `spacing/400`, 3 комірки FILL |
| `Table/Cell` | `79056:3444` | `Size = md \| sm` × `Align = Left \| Right`; Boolean `⬅️ Icon` (off), swap `↳ 💠 Icon` (plus, Static — Icons), Boolean `Subtext` (off) | HORIZONTAL FILL, gap `spacing/200`; `Icon` 24 (`size/300` на height, lock ratio, `semantic/icon/default/primary`) + `Content` (VERTICAL): `Label` md `text/md-strong` / sm `text/sm-strong`, `semantic/text/default/primary`; `Subtext` md `text/sm-strong` / sm `text/sm`, `semantic/text/default/secondary`. Align Right — текст праворуч, іконка після тексту |
| `Table/Head/Cell` | `79056:3449` | `Align = Left \| Right` | `Label` `text/sm-strong`, `semantic/text/default/secondary` |

- Перевірено превʼю (Time limit history з інстансу `Table`) у MB і XON — читається в обох.
- Відступи / розміри прив'язані до наявних змінних `Product` + plugin data `tokens`; **компонентні токени `table.*` — наступний етап** (Андрей дає JSON).
- Відхилення від оригіналів (рішення на перевірку): перша колонка Time limit (`$1456.77`, `text/lg-strong`, `semantic/text/brand/primary`) — змінюється в інстансі вручну; Rules head мав gap 48 між колонками — у новій сітці колонки FILL з gap 16; рядки без вертикальних падінгів неможливі (2-рядкові комірки) — padding-v токеном за `Size`.
- Inverted у сітці не потрібен (темного контексту в джерелах немає).

## 7. Етап 2 — Лідерборд (зібрано 2026-10-23)
Section `Leaderboard` (`79075:3513`, сіра) праворуч від білих оригіналів, на рівні групи 1.

| Компонент | Node | Властивості | Анатомія |
|---|---|---|---|
| `Leaderboard` | `79075:3926` | `Style = Card \| Striped`; SLOT `Head` (preferred `Table/Head/Cell`), SLOT `Rows` (preferred `Leaderboard/Row`), Boolean `Show head` | VERTICAL 676. **Card** (Hall of fame, Ingame): без плашки, gap `spacing/200` між Head і Rows та між рядками; Head height `size/500`. **Striped** (Tournaments, Lottery, Leaders): плашка `semantic/background/slate-1`, радіус 16, clip; Head height `size/600`, fill `semantic/background/slate-for-cards`, комірки Inverted; рядки gap 0, чергуються `Plain` / `Fill` |
| `Leaderboard/Row` | `79075:3526` | `Style = Card \| Fill \| Plain` × `State = Default \| Selected` × `Inverted = False \| True` (12v); SLOT `Cells` (preferred `Table/Cell`) | HORIZONTAL 676, padding-h `spacing/400`, padding-v `spacing/200`, gap `spacing/400`. Fill: Card — `semantic/fill/subtle` / Inverted `semantic/fill/subtle-invert`, радіус 8; Fill — `semantic/background/slate-for-cards`; Plain — без заливки; **Selected** (поточний гравець) — `semantic/fill/active` для всіх стилів. Дефолт: 3 комірки md (перша з іконкою-місцем, третя Align=Right) |

- **`Table/Cell` і `Table/Head/Cell` отримали `Inverted = False | True`** — текст `semantic/text/default-invert/*`, іконка `semantic/text/default-invert/primary` (групи icon-invert немає). Сітка лишається на `Inverted=False`.
- Місце: в іконку першої комірки swap-ом ставиться `Place` (медаль, **чужа бібліотека**, key `a1aa8a61…`) або номер `List/Bullet` (як у Hall of fame). Місце розміром 24 (height токен іконки); Tournaments desktop мав 32.
- Перевірено превʼю (обидва стилі, MB і XON).
- **Бракує токенів** (на етап токенів): радіус 8 (рядок Card) і 16 (плашка Striped) — у `border-radius.global.*` є лише 4/6/12/20; стоять значення без токена.
- Відхилення від оригіналів: Lottery рядок мав падінги 12/6 → 16/8; Hall of fame — колонки з gap 48 і thumb гри 48 → колонки FILL, гра через іконку/ручну заміну; поточний гравець у Lottery мав помаранчевий текст — тепер підсвічення заливкою `Selected`, текст змінюється вручну; Ingame активний рядок `#9f87cf` (hex) → `semantic/fill/active`; spin history (чужі змінні) → `Style=Card, Inverted=True`.
- Device-варіанти (`Mobile(320-767)` / `Desktop`) не робимо: мобільна версія — та сама таблиця вужча, 2-рядкові комірки через `Subtext`.
