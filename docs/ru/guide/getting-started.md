# Начало работы

::: warning
VuePress v2 в настоящее время находится на стадии бета-тестирования. Он готов к использованию для создания вашего сайта, но конфигурация и API недостаточно стабильны, что, вероятно, приведёт к критическим изменениям между релизами. Поэтому обязательно внимательно читайте [чейнджлог](https://github.com/vuepress/vuepress-next/blob/main/CHANGELOG.md) каждый раз, когда обновляете бета-версию.
:::

## Предустановка

- [Node.js v14.18.0+](https://nodejs.org/)
- [Yarn v1 classic](https://classic.yarnpkg.com/en/) (Опционально)

::: tip

- С [pnpm](https://pnpm.io/) вам может потребоваться установить `vue` и `@vuepress/client` в качестве peer-dependencies, то есть выполнить `pnpm add -D vue @vuepress/client@next` .
- С [yarn 2](https://yarnpkg.com/) вам нужно установить `nodeLinker: 'node-modules'` в вашем [`.yarnrc.yml`](https://yarnpkg.com/configuration/yarnrc#nodeLinker).
  :::

## Ручная установка

Этот раздел поможет вам создать базовый сайт документации на VuePress с нуля. Если у вас уже есть существующий проект и вы хотите сохранить документацию внутри проекта, начните с шага 3.

- **Шаг 1**: Создайте и перейдите в новую директорию

```bash
mkdir vuepress-starter
cd vuepress-starter
```

- **Шаг 2**: Инициализируйте ваш проект

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
git init
yarn init
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
git init
npm init
```

  </CodeGroupItem>
</CodeGroup>

- **Шаг 3**: Локально установите VuePress

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn add -D vuepress@next
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm install -D vuepress@next
```

  </CodeGroupItem>
</CodeGroup>

- **Шаг 4**: Добавьте необходимые [скрипты](https://classic.yarnpkg.com/en/docs/package-json#toc-scripts) в `package.json`

```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

- **Шаг 5**: Добавьте стандартные директории temp и cache в файл `.gitignore`

```bash
echo 'node_modules' >> .gitignore
echo '.temp' >> .gitignore
echo '.cache' >> .gitignore
```

- **Шаг 6**: Создайте ваш первый документ

```bash
mkdir docs
echo '# Привет VuePress' > docs/README.md
```

- **Шаг 7**: Запустите сайт с документацией на локальном сервере

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
yarn docs:dev
```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">

```bash
npm run docs:dev
```

  </CodeGroupItem>
</CodeGroup>

VuePress запустит сервер разработки с хот-релоадингом по адресу [http://localhost:8080](http://localhost:8080). Когда вы изменяете файлы Markdown, содержимое в браузере будет автоматически обновляться.

К настоящему времени у вас должен быть базовый, но функциональный сайт документации VuePress. Далее можете изучить основы [конфигурации](./configuration.md) во VuePress.
