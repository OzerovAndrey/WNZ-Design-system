# <Component>

Сторінка `↳ <Page>` · Section `<Component>` (<sectionId>) · набір `<Set>` (<setId>) · статус: <див. component-registry.md>

## Призначення і характер
<1–3 речення: що це і де живе.>
- **Роль і місце:** …
- **Поведінка між станами:** що міняється / що лишається.
- **Inverted:** які частини міняють колір.
- **MB vs XON:** …
- **Масштаб і гнучкість:** розміри, HUG/FILL, переноси.
- **Межі:** чого компонент свідомо не вміє.

> Висновки Claude позначати *(спостереження)*. Рішення команди — без позначки.

## Анатомія
```
<Set> (COMPONENT_SET, id)   <осі варіантів>
└─ <Variant> (COMPONENT)  <layout · sizing · padding · gap · radius · fill>
    ├─ <layer>  <що, яким токеном>
    └─ …
```

## Властивості
| Властивість | Тип | Значення / default | Що робить |
|---|---|---|---|
| `State` | Variant | Default \| Hover \| … | … |
| `Inverted` | Variant | False \| True | колір контенту для темного/світлого фону |
| `⬅️ Icon` | Boolean | true | … |
| `↳ 💠 Icon` | Instance swap | `<icon>` | … |
| `✏️ Label` | Text | … | … |

## Матриця станів
| | Default | Hover | Active | Disabled |
|---|---|---|---|---|
| **Inverted=False** | <fill / color / stroke> | … | … | … |
| **Inverted=True** | … | … | … | … |

## Токени (`mb/component`, `xon/component`)
Експорт від <дата> (`tokens/system/`).

| Токен | Шар → властивість | MB | XON |
|---|---|---|---|
| `<component>.height` | root → height | … | … |
| `contextual.<component>.<part>.fill` | root → fill | `{semantic.…}` | `{semantic.…}` |

## Вкладені компоненти
- `<Instance>` — звідки (локальний / `Static — Icons`), які властивості виставлені.

## Рішення (історія; фінальний стан — у таблицях вище)
1. <дата> — <рішення команди або що змінилось за diff>.

## Відхилення від правил
Пункти `definition-of-done.md`, які не виконуються. Не правимо — питаємо.
- …

## Відкриті питання
- …

## Мета знімка
| | |
|---|---|
| Знімок | `snapshots/<component>.json` |
| Вивчено | <YYYY-MM-DD> |
| Експорт токенів | <YYYY-MM-DD> |
| Варіантів | N |
