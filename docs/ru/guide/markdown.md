# Markdown

Прежде чем читать этот раздел, убедитесь, что вы хорошо знакомы с Markdown. Если нет, сначала изучите [руководство по Markdown](https://commonmark.org/help/).

## Расширения синтаксиса

Содержимое Markdown во VuePress анализируется с помощью [markdown-it](https://github.com/markdown-it/markdown-it), который поддерживает различные [расширения синтаксиса](https://github.com/markdown-it/markdown-it#syntax-extensions) через плагины markdown-it.

В этом разделе будут представлены встроенные расширения синтаксиса Markdown для VuePress.

Вы также можете настроить эти встроенные расширения, загрузить дополнительные плагины markdown-it или реализовать свои собственные расширения с помощью опции [markdown](../reference/config.md#markdown) и [extendsMarkdown](../reference/plugin-api.md#extendsmarkdown).

### Встроенные

Встроенные в markdown-it:

- [Таблицы](https://help.github.com/articles/organizing-information-with-tables/) (GFM)
- [Зачёркнутый текст](https://help.github.com/articles/basic-writing-and-formatting-syntax/#styling-text) (GFM)

### Ссылки заголовков

Вы могли заметить, что при наведении курсора мыши на заголовки каждого раздела отображается якорь `#`. Нажав якорь `#`, вы можете перейти непосредственно к разделу.

::: tip
Это расширение для создания ссылок на заголовки предоставляется [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor).

Ссылка на конфигурацию: [markdown.anchor](../reference/config.md#markdown-anchor)
:::

### Ссылки

При использовании [синтаксиса ссылок](https://spec.commonmark.org/0.29/#link-reference-definitions) Markdown VuePress реализует для вас некоторые преобразования.

В качестве примера возьмём наши исходные файлы документации:

```bash
└─ docs
   ├─ guide
   │  ├─ getting-started.md
   │  ├─ markdown.md    # <- Here we are
   │  └─ README.md
   ├─ reference
   │  └─ config.md
   └─ README.md
```

**Исходный код Markdown**

```md
<!-- относительный путь -->

[Главная](../README.md)  
[Конфигурация](../reference/config.md)  
[Начало работы](./getting-started.md)

<!-- абсолютный путь -->

[Руководство](/guide/README.md)  
[Конфигурация > markdown.ссылка](/reference/config.md#links)

<!-- URL -->

[GitHub](https://github.com)
```

**Будет преобразован в**

```vue
<template>
  <RouterLink to="/">Главная</RouterLink>
  <RouterLink to="/reference/config.html">Конфигурация</RouterLink>
  <RouterLink to="/guide/getting-started.html">Начало работы</RouterLink>
  <RouterLink to="/guide/">Руководство</RouterLink>
  <RouterLink to="/reference/config.html#links"
    >Конфигурация &gt; markdown.ссылка</RouterLink
  >
  <a href="https://github.com" target="_blank" rel="noopener noreferrer"
    >GitHub</a
  >
</template>
```

**И отобразится следующим образом**

[Главная](../README.md)  
[Конфигурация](../reference/config.md)  
[Начало работы](./getting-started.md)  
[Руководство](/guide/README.md)  
[Конфигурация > markdown.ссылка](/reference/config.md#links)  
[GitHub](https://github.com)

**Объяснение**

- Внутренние ссылки будут преобразованы в `<RouterLink>` для навигации по SPA.
- Внутренние ссылки на файлы `.md` будут преобразованы в [путь маршрута страницы](./page.md#routing), поддерживаются как абсолютные, так и относительные пути.
- Внешние ссылки получат атрибуты `target="_blank" rel="noopener noreferrer"`.

**Предложение**

Попробуйте использовать относительные пути вместо абсолютных для внутренних ссылок на файлы markdown.

- Относительные пути являются действительными ссылками на целевые файлы, и по ним можно правильно навигировать при просмотре исходных файлов в вашем редакторе или репозитории.
- Относительные пути согласованы для разных локализаций, поэтому вам не нужно менять путь локали при переводе контента.

::: tip
Это расширение ссылок поддерживается нашим встроенным плагином.

Ссылка на конфигурацию: [markdown.links](../reference/config.md#markdown-links)
:::

### Эмодзи :tada:

Вы можете добавить эмодзи в своём контенте в Markdown файлах, набрав `:EMOJICODE:`.

Полный список доступных эмодзи и кодов см. на [emoji-cheat-sheet](https://github.com/ikatyang/emoji-cheat-sheet).

**Ввод**

```md
VuePress 2 вышел :tada: !
```

**Вывод**

VuePress 2 вышел :tada: !

::: tip
Это расширение для эмодзи поддерживается с помощью [markdown-it-emoji](https://github.com/markdown-it/markdown-it-emoji).

Ссылка на конфигурацию: [markdown.emoji](../reference/config.md#markdown-emoji)
:::

### Оглавление

Если вы хотите поместить оглавление вашей текущей страницы в содержимое Markdown, вы можете использовать синтаксис `[[toc]]`.

**Ввод**

```md
[[toc]]
```

**Вывод**

[[toc]]

Заголовки в оглавлении будут ссылаться на соответствующие [ссылки](#header-anchors), поэтому оглавление не будет работать, если вы отключите привязку заголовков.

::: tip
Расширение для оглавление поддерживается плагином [@mdit-vue/plugin-toc](https://github.com/mdit-vue/mdit-vue/tree/main/packages/plugin-toc).

Ссылка на конфигурацию: [markdown.toc](../reference/config.md#markdown-toc)
:::

### Блоки кода

Расширения для отрисовки блоков кода обрабатываются во время синтаксического анализа Markdown на стороне сервера. Это означает, что блоки кода не будут обрабатываться на стороне клиента.

#### Подсветка строк

Вы можете выделить определенные строки в ваших блоках кода, добавив метку диапазонов строк в ваши огороженные блоки кода:

**Ввод**

````md
```ts{1,6-8}
import { defaultTheme, defineUserConfig } from 'vuepress'

export default defineUserConfig({
  title: 'Привет, VuePress',

  theme: defaultTheme({
    logo: 'https://vuejs.org/images/logo.png',
  }),
})
```
````

**Вывод**

```ts{1,6-8}
import { defaultTheme, defineUserConfig } from 'vuepress'

export default defineUserConfig({
  title: 'Привет, VuePress',

  theme: defaultTheme({
    logo: 'https://vuejs.org/images/logo.png',
  }),
})
```

Примеры маркировки диапазонов строк:

- Диапазоны строк: `{5-8}`
- Несколько одиночных строк: `{4,7,9}`
- Комбинированный: `{4,7-13,16,23-27,40}`

::: tip
Это расширение для выделения строк поддерживается нашим встроенным плагином, который форкнут и модифицирован из [markdown-it-highlight-lines](https://github.com/egoist/markdown-it-highlight-lines).

Ссылка на конфигурацию: [markdown.code.highlightLines](../reference/config.md#markdown-code-highlightlines)
:::

#### Номер строк

Вы, должно быть, заметили, что количество строк отображается слева от блоков кода. Это включено по умолчанию, и вы можете отключить его в конфигурации.

Вы можете добавить метку `:line-numbers` / `:no-line-numbers` в ваши изолированные блоки кода, чтобы переопределить значение, установленное в конфиге.

**Ввод**

````md
```ts
// номера строк включены по умолчанию
const line2 = 'Это строка 2'
const line3 = 'Это строка 3'
```

```ts:no-line-numbers
// номера строк отключены
const line2 = 'Это строка 2'
const line3 = 'Это строка 3'
```
````

**Вывод**

```ts
// номера строк включены по умолчанию
const line2 = 'Это строка 2'
const line3 = 'Это строка 3'
```

```ts:no-line-numbers
// номера строк отключены
const line2 = 'Это строка 2'
const line3 = 'Это строка 3'
```

::: tip
Это расширение для отображение номеров строк поддерживается нашим встроенным плагином.

Ссылка на конфигурацию: [markdown.code.lineNumbers](../reference/config.md#markdown-code-linenumbers)
:::

#### Обёртка v-pre

Поскольку [синтаксис шаблонов разрешен в Markdown](#template-syntax), он также будет работать в блоках кода.

Чтобы Vue не компилировал ваши блоки кода, VuePress по умолчанию добавит директиву [v-pre](https://vuejs.org/api/built-in-directives.html#v-pre) к вашим блокам кода, что можно отключить в конфиге.

Вы можете добавить метку `:v-pre` / `:no-v-pre` в ваши изолированные блоки кода, чтобы переопределить значение, установленное в файле конфигурации.

::: warning
Символы синтаксиса шаблона, например синтаксис «Mustache» (двойные фигурные скобки), могут анализироваться средством подсветки синтаксиса. Таким образом, как показано в следующем примере, `:no-v-pre` может не работать на некоторых языках.

Если вы все равно хотите, чтобы синтаксис Vue работал на этих языках, попробуйте отключить подсветку синтаксиса по умолчанию и реализовать собственную подсветку синтаксиса на стороне клиента.
:::

**Ввод**

````md
```md
<!-- Это будет отрисовано как есть -->

1 + 2 + 3 = {{ 1 + 2 + 3 }}
```

```md:no-v-pre
<!-- Это будет скомпилировано Vue -->
1 + 2 + 3 = {{ 1 + 2 + 3 }}
```

```js:no-v-pre
// Это не будет правильно скомпилировано из-за подсветки синтаксиса js
const onePlusTwoPlusThree = {{ 1 + 2 + 3 }}
```
````

**Вывод**

```md
<!-- Это будет отрисовано как есть -->

1 + 2 + 3 = {{ 1 + 2 + 3 }}
```

```md:no-v-pre
<!-- Это будет скомпилировано Vue -->
1 + 2 + 3 = {{ 1 + 2 + 3 }}
```

<!--
использование :no-v-pre в блоках кода JS может привести к проблемам с shiki, поэтому мы
на самом деле здесь не используем :no-v-pre и просто демонстрируем как пример неправильного
использования
-->

```js
// Это не будет правильно скомпилировано из-за подсветки синтаксиса js
const onePlusTwoPlusThree = {{ 1 + 2 + 3 }}
```

::: tip
Это расширение v-pre поддерживается нашим встроенным плагином.

Ссылка на конфигурацию: [markdown.code.vPre.block](../reference/config.md#markdown-code-vpre-block)
:::

### Импорт блоков кода

Вы можете импортировать блоки кода из файлов, используя следующий синтаксис:

```md
<!-- минимальный синтаксис -->

@[code](../foo.js)
```

Если вы хотите частично импортировать файл:

```md
<!-- частичный импорт с 1 по 10 линии -->

@[code{1-10}](../foo.js)
```

Язык кода выводится из расширения файла, при этом рекомендуется указывать его явно:

```md
<!-- укажите язык кода -->

@[code js](../foo.js)
```

Фактически, вторая часть внутри `[]` будет рассматриваться как метка ограждения кода, поэтому она поддерживает весь синтаксис, упомянутый выше в разделе [Блоки кода](#блоки-кода):

```md
<!-- выделение строк -->

@[code js{2,4-5}](../foo.js)
```

Вот сложный пример:

- импортировать строку 3 в строку 10 файла `'../foo.js'`
- укажите язык как `'js'`
- выделить строку 3 импортированного кода, т.е. строку 5 файла `'../foo.js'`
- отключить номера строк

```md
@[code{3-10} js{3}:no-line-numbers](../foo.js)
```

Обратите внимание, что алиасы путей недоступны в синтаксисе кода импорта. Вы можете использовать следующую конфигурацию для самостоятельной обработки алиасов путей:

```ts
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

export default {
  markdown: {
    importCode: {
      handleImportPath: (str) =>
        str.replace(/^@src/, path.resolve(__dirname, 'path/to/src')),
    },
  },
}
```

```md
<!-- будет разрезолвлен 'path/to/src/foo.js' -->

@[code](@src/foo.js)
```

::: tip
Это расширение кода импорта поддерживается нашим встроенным плагином.

Ссылка на конфигурацию: [markdown.importCode](../reference/config.md#markdown-importcode)
:::

## Использование Vue в Markdown

В этом разделе будут представлены некоторые основные принципы использования Vue в Markdown.

Ознакомьтесь с [Рецепты > Markdown и Vue SFC](../advanced/cookbook/markdown-and-vue-sfc.md) для получения более подробной информации.

### Синтаксис шаблонов

Как мы знаем:

- HTML разрешен в Markdown.
- Синтаксис шаблона Vue совместим с HTML.

Это означает, что [синтаксис шаблонов Vue](https://vuejs.org/guide/essentials/template-syntax.html) можно использовать в Markdown.

**Ввод**

```md
Один плюс один равно: {{ 1 + 1 }}

<span v-for="i in 3"> span: {{ i }} </span>
```

**Вывод**

Один плюс один равно: {{ 1 + 1 }}

<span v-for="i in 3"> span: {{ i }} </span>

### Компоненты

Вы можете использовать компоненты Vue непосредственно в Markdown.

**Ввод**

```md
Это встроенный в стандартную тему компонент `<Badge />` <Badge text="demo" />
```

**Вывод**

Это встроенный в стандартную тему компонент `<Badge />` <Badge text="demo" />

::: tip
Полный список встроенных компонентов см. в разделе [Встроенные компоненты](../reference/components.md).

Ознакомьтесь с [Стандартная тема > Встроенные компоненты](../reference/default-theme/components.md) для получения полного списка встроенных компонентов стандартной темы.
:::

## Предостережения

### Нестандартные теги HTML

Нестандартные теги HTML не будут распознаваться компилятором шаблонов Vue как собственные теги HTML. Вместо этого Vue попытается разрешить эти теги как компоненты Vue, и очевидно, что эти компоненты обычно не существуют. Например:

- Устаревшие теги HTML, такие как [\<center>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/center) и [\<font>](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/font).
- [Теги MathML](https://developer.mozilla.org/en-US/docs/Web/MathML), которые могут использоваться некоторыми плагинами LaTeX для markdown-it.

Если вы всё равно хотите использовать эти теги, попробуйте один из следующих обходных путей:

— Добавление директивы [v-pre](https://vuejs.org/api/built-in-directives.html#v-pre) для пропуска компиляции элемента и его дочерних элементов. Обратите внимание, что синтаксис шаблона также будет недопустимым.

- Использование [compilerOptions.isCustomElement](https://vuejs.org/api/application.html#app-config-compileroptions), чтобы компилятор шаблонов Vue не пытался разрешать их как компоненты.
  - Для `@bundler-webpack` установите [vue.compilerOptions](../reference/bundler/webpack.md#vue)
  - Для `@bundler-vite` установите [vuePluginOptions.template.compilerOptions](../reference/bundler/vite.md#vuepluginoptions)
