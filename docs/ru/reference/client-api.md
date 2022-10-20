# API клиента

<NpmBadge package="@vuepress/client" />

Клиентский API предоставляется пакетом [@vuepress/client](https://www.npmjs.com/package/@vuepress/client), который используется для разработки клиентских файлов.

## Composition API

### usePageData

- Подробности:

  Возвращает объект Ref с данными текущей страницы.

- См. также:
  - [Node API > Свойства страницы > data](./node-api.md#data)
  - [API плагинов > extendsPage](./plugin-api.md#extendspage)

### usePageFrontmatter

- Подробности:

  Возвращает объект Ref с frontmatter данными текущей страницы.

  Значением является свойство frontmatter из данных страницы.

### usePageHead

- Подробности:

  Возвращает объект Ref текущей конфигурации заголовка страницы.

  Значение получается путем слияния и дедупликации [head](./frontmatter.md#head) frontmatter и конфигурации [head](./config.md#head).

### usePageHeadTitle

- Подробности:

  Возвращает объект Ref заголовка текущей страницы.

  Значение получается путём объединения заголовка страницы и заголовка сайта.

### usePageLang

- Подробности:

  Возвращает объект Ref с языком текущей страницы.

  Значением является свойство `lang` данных страницы.

### useRouteLocale

- Подробности:

  Возвращает объект Ref ссылки пути локали текущего роута.

  Значение является одним из ключей конфигурации [locales](./config.md#locales).

### useSiteData

- Подробности:

  Возвращает объект Ref с данными сайта.

### useSiteLocaleData

- Подробности:

  Возвращает Ref объект на данные сайта для текущей локали.

  Свойства текущей локали были объединены со свойствами корневого уровня.

## Вспомогательные функции

### defineClientConfig

- Подробности:

  Вспомогательная функция для создания [clientConfigFile](./plugin-api.md#clientconfigfile).

- См. также:
  - [Дополнительно > Рецепты > Использование клиентской конфигурации](../advanced/cookbook/usage-of-client-config.md)

### withBase

- Подробности:

  URL-префикс сайта из [base](./config.md#base).

- См. также:
  - [Руководство > Ассеты > Базовый хелпер](../guide/assets.md#базовый-хелпер)

## Константы

Есть некоторые константы, доступные в клиентском коде.

Чтобы использовать типы этих констант в коде на стороне клиента, добавьте `@vuepress/client/types` в ваш `tsconfig.json`:

```json
{
  "compilerOptions": {
    "types": ["@vuepress/client/types"]
  }
}
```

### `__VUEPRESS_VERSION__`

- Тип: `string`

- Подробности:

  Версия основного пакета VuePress.

### `__VUEPRESS_DEV__`

- Тип: `boolean`

- Подробности:

  Флаг среды, указывающий, работает ли он в данный момент в режиме `dev`.

### `__VUEPRESS_SSR__`

- Тип: `boolean`

- Подробности:

  Флаг среды, указывающий, работает ли он в настоящее время в режиме server-side-rendering (SSR).

## Дополнительно

### resolvers <Badge text="experimental" />

- Тип: `Record<string, Function>`

- Подробности:

  Реактивный объект, методы которого определяют, как разрешить глобальные вычисления.

- Пример:

Настройка формата `<title>` в файле конфигурации клиента:

```ts
import { defineClientConfig, resolvers } from '@vuepress/client'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    resolvers.resolvePageHeadTitle = (page, siteLocale) =>
      `${siteLocale.title} > ${page.title}`
  },
})
```

::: danger
`resolvers` повлияют на базовую функциональность VuePress. Прежде чем изменять его, убедитесь, что вы полностью поняли его назначение.
:::
