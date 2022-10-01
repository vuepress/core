---
home: true
title: Главная
heroImage: /images/hero.png
actions:
  - text: Начало работы
    link: /guide/getting-started.html
    type: primary
  - text: Введение
    link: /guide/
    type: secondary
features:
  - title: Простота прежде всего
    details: Минимальная настройка со структрой ориентированной на использование markdown позволит вам сфокусироваться на написании текстов.
  - title: Основан на Vue
    details: Наслаждайтесь опытом разработки Vue, используйте компоненты Vue в markdown и разрабатывайте собственные темы с помощью Vue.
  - title: Производительность
    details: VuePress генерирует предварительно обработанный статический HTML для каждой страницы и запускается как SPA после загрузки страницы.
  - title: Темы
    details: Предоставление стандартной темы из коробки. Вы также можете выбрать тему сообщества или создать свою собственную.
  - title: Плагины
    details: Гибкий API для разработки плагинов, позволяющий предоставлять множество готовых функций для вашего сайта.
  - title: Сборщик
    details: Сборщик по умолчанию — Vite, также поддерживается Webpack. Выберите тот, который вам больше нравится!
footer: Лицензия MIT | Copyright © 2018-настоящее время Эван Ю
---

### Просто как 1, 2, 3

<CodeGroup>
  <CodeGroupItem title="YARN" active>

```bash
# установите в ваш проект

yarn add -D vuepress@next

# создайте markdown файл

echo '# Hello VuePress' > README.md

# начните писать

yarn vuepress dev

# запустите сборку статических файлов

yarn vuepress build

```

  </CodeGroupItem>

  <CodeGroupItem title="NPM">
  
```bash
# установите в ваш проект

npm install -D vuepress@next

# создайте markdown файл

echo '# Hello VuePress' > README.md

# начните писать

npx vuepress dev

# запустите сборку статических файлов

npx vuepress build

```
  </CodeGroupItem>
</CodeGroup>
```
