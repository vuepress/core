# Деплой

Следующие руководства основаны на некоторых общих предположениях:

- Вы помещаете свои исходные файлы Markdown в каталог `docs` вашего проекта;
- Вы используете расположение билд-папки по умолчанию (`.vuepress/dist`);
- Вы используете [yarn classic](https://classic.yarnpkg.com/en/) в качестве менеджера пакетов, npm также поддерживается;
- VuePress установлен как локальная зависимость в вашем проекте, и вы настроили следующий скрипт в `package.json`:

```json
{
  "scripts": {
    "docs:build": "vuepress build docs"
  }
}
```

## GitHub Pages

1. Установите правильный [базовый](../reference/config.md#base) конфиг.

   Если вы выполняете деплой на `https://<ИМЯ ПОЛЬЗОВАТЕЛЯ>.github.io/`, вы можете пропустить этот шаг, так как `base` по умолчанию имеет значение `"/"`.

   Если вы выполняете развертывание на `https://<ИМЯ ПОЛЬЗОВАТЕЛЯ>.github.io/<РЕПОЗИТОРИЙ>/`, например, ваш репозиторий находится в `https://github.com/<ИМЯ ПОЛЬЗОВАТЕЛЯ>/<РЕПОЗИТОРИЙ>`, установите `base` в `"/<РЕПОЗИТОРИЙ>/"`.

2. Выберите предпочтительные инструменты CI. Здесь мы возьмем [GitHub Actions](https://github.com/features/actions) в качестве примера.

   Создайте `.github/workflows/docs.yml`, чтобы настроить воркфлоу.

::: details Click to expand sample config

```yaml
name: docs

on:
  # запускать деплой при каждом пуше в ветку main
  push:
    branches: [main]
  # запускать деплой вручную
  workflow_dispatch:

jobs:
  docs:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v2
        with:
          # получить все коммиты
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v1
        with:
          # выбрать используемую версию node.js
          node-version: '14'

      # кэшировать node_modules
      - name: Cache dependencies
        uses: actions/cache@v2
        id: yarn-cache
        with:
          path: |
            **/node_modules
          key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
          restore-keys: |
            ${{ runner.os }}-yarn-

      # установить зависимости, если их нет в кэше
      - name: Install dependencies
        if: steps.yarn-cache.outputs.cache-hit != 'true'
        run: yarn --frozen-lockfile

      # запустить билд
      - name: Build VuePress site
        run: yarn docs:build

      # пожалуйста, ознакомьтесь с документацией воркфлоу для более подробной информации
      # @see https://github.com/crazy-max/ghaction-github-pages
      - name: Deploy to GitHub Pages
        uses: crazy-max/ghaction-github-pages@v2
        with:
          # деплой в ветку gh-pages
          target_branch: gh-pages
          # деплой дефолтной директории VuePress
          build_dir: docs/.vuepress/dist
        env:
          # @see https://docs.github.com/en/actions/reference/authentication-in-a-workflow#about-the-github_token-secret
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

:::

::: tip
Пожалуйста, обратитесь к [официальному руководству GitHub Pages](https://pages.github.com/) для получения более подробной информации.
:::

## GitLab Pages

1. Установите правильный [base](../reference/config.md#base) в конфиге.

   Если вы выполняете деплой на `https://<ИМЯ ПОЛЬЗОВАТЕЛЯ>.gitlab.io/`, вы можете опустить `base`, так как по умолчанию это `"/"`.

   Если вы выполняете развертывание на `https://<ИМЯ ПОЛЬЗОВАТЕЛЯ>.gitlab.io/<РЕПОЗИТОРИЙ>/`, например, ваш репозиторий находится по адресу `https://gitlab.com/<ИМЯ ПОЛЬЗОВАТЕЛЯ>/<РЕПОЗИТОРИЙ>`, установите `base` в `"/<РЕПОЗИТОРИЙ>/"`.

2. Создайте `.gitlab-ci.yml`, чтобы настроить воркфлоу [GitLab CI](https://about.gitlab.com/stages-devops-lifecycle/continuous-integration/).

::: details Нажмите, чтобы увидеть пример конфигурации

```yaml
# выберите образ docker для использования
image: node:14-buster

pages:
  # запускать деплой при каждом пуше в ветку main
  only:
    - main

  # кэшировать node_modules
  cache:
    paths:
      - node_modules/

  # установить зависимости и запустить билд скрипт
  script:
    - yarn --frozen-lockfile
    - yarn docs:build --dest public

  artifacts:
    paths:
      - public
```

:::

::: tip
Пожалуйста, обратитесь к [официальному руководству GitLab Pages](https://docs.gitlab.com/ce/user/project/pages/#getting-started) для получения более подробной информации.
:::

## Google Firebase

1. Убедитесь, что у вас установлены [firebase-tools](https://www.npmjs.com/package/firebase-tools).

2. Создайте `firebase.json` и `.firebaserc` в корне вашего проекта со следующим содержимым:

`firebase.json`:

```json
{
  "hosting": {
    "public": "./docs/.vuepress/dist",
    "ignore": []
  }
}
```

`.firebaserc`:

```json
{
  "projects": {
    "default": "<ВАШ_FIREBASE_ID>"
  }
}
```

3. После запуска `yarn docs:build` разверните с помощью команды `firebase deploy`.

::: tip
Дополнительные сведения см. в [официальном руководстве Firebase CLI](https://firebase.google.com/docs/cli).
:::

## Heroku

1. Установите [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).

2. [Создайте](https://signup.heroku.com) учетную запись Heroku.

3. Выполните в терминале `heroku login` и введите свои учетные данные Heroku:

```bash
heroku login
```

4. Создайте файл с именем `static.json` в корне вашего проекта со следующим содержимым:

`static.json`:

```json
{
  "root": "./docs/.vuepress/dist"
}
```

Это конфигурация вашего сайта; читайте больше на [heroku-buildpack-static](https://github.com/heroku/heroku-buildpack-static).

## Layer0

См. [Layer0 Documentation > Framework Guides > VuePress](https://docs.layer0.co/guides/vuepress).

## Netlify

1. На [Netlify](https://netlify.com) настройте новый проект из GitHub со следующими настройками:

   - **Build Command:** `yarn docs:build`
   - **Publish directory:** `docs/.vuepress/dist`

2. Установите [Переменные окружения](https://docs.netlify.com/configure-builds/environment-variables), чтобы выбрать версию Node.js:

   - `NODE_VERSION`: 14

3. Нажмите кнопку деплоя.

## Vercel

1. Перейдите на [Vercel](https://vercel.com), настройте новый проект с GitHub со следующими настройками:

   - **FRAMEWORK PRESET:** `Other`
   - **BUILD COMMAND:** `yarn docs:build`
   - **OUTPUT DIRECTORY:** `docs/.vuepress/dist`

2. Нажмите кнопку деплоя.
