# Конфигурация

## Файл конфигурации

Без какой-либо настройки сайт VuePress довольно минималистичен. Чтобы настроить ваш сайт, давайте сначала создадим директорию `.vuepress` внутри вашей директории документов. Здесь будут размещены все файлы, относящиеся к VuePress. Структура вашего проекта, вероятнее всего, будет выглядеть так:

```
├─ docs
│  ├─ .vuepress
│  │  └─ config.js
│  └─ README.md
├─ .gitignore
└─ package.json
```

Важным файлом для настройки сайта VuePress является `.vuepress/config.js`, также поддерживается файл конфигурации на TypeScript. Для этого вы можете использовать `.vuepress/config.ts`, чтобы получить подсказки по типам для конфигурации VuePress.

Чтобы быть более конкретным, у нас есть соглашение для путей к файлам конфигурации (в порядке приоритета):

- В текущем рабочей директории `cwd`:
  - `vuepress.config.ts`
  - `vuepress.config.js`
  - `vuepress.config.mjs`
- В исходной директории `sourceDir`:
  - `.vuepress/config.ts`
  - `.vuepress/config.js`
  - `.vuepress/config.mjs`

Вы также можете указать файл конфигурации с помощью опции `--config` [CLI](./cli.md):

```sh
vuepress dev docs --config my-config.js
```

Базовый файл конфигурации выглядит так:

```ts
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  lang: 'ru-RU',
  title: 'Привет, VuePress',
  description: 'Это мой первый сайт',
})
```

::: tip
Ознакомьтесь со [Справочником по конфигурации](../reference/config.md) для получения полного списка конфигурации VuePress.
:::

## Клиентский файл конфигурации

В большинстве случаев файла конфигурации достаточно для настройки вашего сайта на VuePress. Однако иногда пользователям может потребоваться добавить код на стороне клиента напрямую. Чтобы помочь в этом, VuePress также поддерживает файл конфигурации клиента:

```
├─ docs
│  ├─ .vuepress
│  │  ├─ client.js   <--- client config file
│  │  └─ config.js   <--- config file
│  └─ README.md
├─ .gitignore
└─ package.json
```

Точно так же у нас также есть соглашение для путей к файлам конфигурации клиента (в порядке приоритета):

- В текущем рабочей директории `cwd`:
  - `vuepress.client.ts`
  - `vuepress.client.js`
  - `vuepress.client.mjs`
- В исходной директории `sourceDir`:
  - `.vuepress/client.ts`
  - `.vuepress/client.js`
  - `.vuepress/client.mjs`

Базовый файл конфигурации клиента выглядит следующим образом:

```ts
import { defineClientConfig } from '@vuepress/client'

export default defineClientConfig({
  enhance({ app, router, siteData }) {},
  setup() {},
  rootComponents: [],
})
```

::: tip
В отличие от файла конфигурации, файл конфигурации клиента нельзя указать с помощью параметров CLI.

Чтобы узнать больше о файле конфигурации клиента, см. [Дополнительно > Рецепты > Использование конфигурации клиента](../advanced/cookbook/usage-of-client-config.md)
:::
