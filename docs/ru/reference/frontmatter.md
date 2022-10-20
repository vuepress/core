# Frontmatter

<NpmBadge package="@vuepress/client" />
<NpmBadge package="@vuepress/markdown" />

## date

- Тип: `string`

- Подробности:

  Дата создания страницы.

  Вы должны указать дату в формате `yyyy-MM-dd` или использовать [таймстамп тип YAML](https://yaml.org/type/timestamp.html).

- См. также:
  - [Node API > Свойства страницы > date](./node-api.md#date)

## description

- Тип: `string`

- Подробности:

  Описание для страницы.

  Это переопределит параметр `description` в конфигурации вашего сайта.

- См. также:
  - [Руководство > description](./config.md#description)

## head

- Тип: `HeadConfig[]`

- Подробности:

  Дополнительные теги в теге `<head>` для страницы.

- Пример:

```md
---
head:
  - - meta
    - name: foo
      content: yaml array syntax
  - [meta, { name: bar, content: square brackets syntax }]
---
```

Будет отрендерено как:

```html
<head>
  <meta name="foo" content="yaml array syntax" />
  <meta name="bar" content="square brackets syntax" />
</head>
```

- См. также:
  - [Конфигурация > head](./config.md#head)

## lang

- Тип: `string`

- Подробности:

  Язык страницы.

  Это переопределит параметр `lang` в конфигурации вашего сайта.

- См. также:
  - [Конфигурация > lang](./config.md#lang)
  - [Node API > Свойства страницы > lang](./node-api.md#lang)

## layout

- Тип: `string`

- Подробности:

  Макет для страницы.

  Макеты предоставляются по темам. Если вы не укажете эту часть во frontmatter, будет использоваться макет по умолчанию. Вы должны обратиться к документации темы, чтобы узнать, какие макеты она предоставляет.

  Если макеты темы не соответствуют вашим потребностям, вы можете использовать настраиваемый компонент макета.

- Пример:

Зарегистрируйте компонент макета в файле `.vuepress/client.ts`:

```ts
import { defineClientConfig } from '@vuepress/client'
import CustomLayout from './CustomLayout.vue'

export default defineClientConfig({
  layouts: {
    CustomLayout,
  },
})
```

Установите пользовательский макет во frontmatter:

```md
---
layout: CustomLayout
---
```

## permalink

- Тип: `string`

- Подробности:

  Постоянная ссылка для страницы.

  Это переопределит стандартный путь роутера, который определяется исходя из путя к файлу страницы.

- См. также:
  - [Frontmatter > permalinkPattern](#permalinkpattern)
  - [Руководство > Страница > Роутинг](../guide/page.md#роутинг)
  - [Node API > Свойства страницы > permalink](./node-api.md#permalink)

## permalinkPattern

- Тип: `string | null`

- Подробности:

  Шаблон для создания постоянной ссылки для страницы.

  Это переопределит параметр `permalinkPattern` в конфигурации вашего сайта.

  Это не вступит в силу, если установлена во frontmatter установлено свойство `permalink`.

- Использование:

  | Паттер   | Описание                      |
  | -------- | ----------------------------- |
  | `:year`  | Год даты создания             |
  | `:month` | Месяц даты создания           |
  | `:day`   | День даты создания            |
  | `:slug`  | Фрагмент имени файла страницы |
  | `:raw`   | Необработанный путь роутера   |

  Шаблоны `:year`, `:month` и `:day` разрешаются в соответствии со следующим приоритетом:

  - Поле `date` во frontmatter.
  - Имя файла, которое соответствует шаблону даты `yyyy-MM-dd-foobar.md` или `yyyy-MM-foobar.md`.
  - Имя директории, соответствующее шаблону даты `yyyy/MM/dd/foobar.md` или `yyyy/MM/foobar.md`.
  - Возврат к `0000-00-00`.

- Пример 1:

  Имя файла страницы — `foo-bar.md`.

  Frontmatter страницы:

```md
---
date: 2021-01-03
permalinkPattern: :year/:month/:day/:slug.html
---
```

В таком случае постоянная ссылка страницы будет `2021/01/03/foo-bar.html`.

- Пример 2:

  Имя файла страницы `2021-01-03-bar-baz.md`.

  Frontmatter страницы:

```md
---
permalinkPattern: :year/:month/:day/:slug.html
---
```

Тогда постоянная ссылка страницы будет `2021/01/03/bar-baz.html`.

- См. также:
  - [Конфигурация > permalinkPattern](./config.md#permalinkpattern)
  - [Frontmatter > date](#date)
  - [Frontmatter > permalink](#permalink)
  - [Node API > Свойства страницы > permalink](./node-api.md#permalink)

## routeMeta

- Тип: `Record<string, unknown>`

- Подробности:

  Пользовательские данные, которые будут прикреплены к роуту страницы.

- См. также:
  - [Node API > Page Properties > routeMeta](./node-api.md#routeMeta)

## title

- Тип: `string`

- Подробности:

  Заголовок для страницы.

  Если вы не укажете `title` во frontmatter, в качестве заголовка будет использоваться содержимое заголовка первого уровня (т. е. `# title`).

- См. также:
  - [Node API > Свойства страницы > title](./node-api.md#title)
