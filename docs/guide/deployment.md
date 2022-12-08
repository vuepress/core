# Deployment

The following guides are based on some shared assumptions:

- You are placing your Markdown source files inside the `docs` directory of your project;
- You are using the default build output location (`.vuepress/dist`);
- You are using as [pnpm](https://pnpm.io) package manager, while npm and yarn are also supported;
- VuePress is installed as a local dependency in your project, and you have setup the following script in `package.json`:

```json
{
  "scripts": {
    "docs:build": "vuepress build docs"
  }
}
```

## GitHub Pages

1. Set the correct [base](../reference/config.md#base) config.

   If you are deploying to `https://<USERNAME>.github.io/`, you can omit this step as `base` defaults to `"/"`.

   If you are deploying to `https://<USERNAME>.github.io/<REPO>/`, for example your repository is at `https://github.com/<USERNAME>/<REPO>`, then set `base` to `"/<REPO>/"`.

2. Choose your preferred CI tools. Here we take [GitHub Actions](https://github.com/features/actions) as an example.

   Create `.github/workflows/docs.yml` to set up the workflow.

::: details Click to expand sample config
```yaml
name: docs

on:
  # trigger deployment on every push to main branch
  push:
    branches: [main]
  # trigger deployment manually
  workflow_dispatch:

jobs:
  docs:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3
        with:
          # fetch all commits to get last updated time or other git log info
          fetch-depth: 0

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          # choose pnpm version to use
          version: 7
          # install deps with pnpm
          run_install: true

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          # choose node.js version to use
          node-version: 18
          # cache deps for pnpm
          cache: pnpm

      # run build script
      - name: Build VuePress site
        run: pnpm docs:build

      # please check out the docs of the workflow for more details
      # @see https://github.com/crazy-max/ghaction-github-pages
      - name: Deploy to GitHub Pages
        uses: crazy-max/ghaction-github-pages@v2
        with:
          # deploy to gh-pages branch
          target_branch: gh-pages
          # deploy the default output dir of VuePress
          build_dir: docs/.vuepress/dist
        env:
          # @see https://docs.github.com/en/actions/reference/authentication-in-a-workflow#about-the-github_token-secret
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
:::

::: tip
Please refer to [GitHub Pages official guide](https://pages.github.com/) for more details.
:::

## GitLab Pages

1. Set the correct [base](../reference/config.md#base) config.

   If you are deploying to `https://<USERNAME>.gitlab.io/`, you can omit `base` as it defaults to `"/"`.

   If you are deploying to `https://<USERNAME>.gitlab.io/<REPO>/`, for example your repository is at `https://gitlab.com/<USERNAME>/<REPO>`, then set `base` to `"/<REPO>/"`.

2. Create `.gitlab-ci.yml` to set up [GitLab CI](https://about.gitlab.com/stages-devops-lifecycle/continuous-integration/) workflow.

::: details Click to expand sample config
```yaml
# choose a docker image to use
image: node:18-buster

pages:
  # trigger deployment on every push to main branch
  only:
    - main

  # cache node_modules
  cache:
    key:
      files:
        - pnpm-lock.yaml
    paths:
      - .pnpm-store

  # Install pnpm
  before_script:
    - curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm@7
    - pnpm config set store-dir .pnpm-store

  # install dependencies and run build script
  script:
    - pnpm i --frozen-lockfile
    - pnpm docs:build --dest public

  artifacts:
    paths:
      - public
```
:::

::: tip
Please refer to [GitLab Pages official guide](https://docs.gitlab.com/ce/user/project/pages/#getting-started) for more details.
:::

## Google Firebase

1. Make sure you have [firebase-tools](https://www.npmjs.com/package/firebase-tools) installed.

2. Create `firebase.json` and `.firebaserc` at the root of your project with the following content:

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
    "default": "<YOUR_FIREBASE_ID>"
  }
}
```

3. After running `pnpm docs:build`, deploy using the command `firebase deploy`.

::: tip
Please refer to [Firebase CLI official guide](https://firebase.google.com/docs/cli) for more details.
:::

## Heroku

1. Install [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli).

2. Create a Heroku account by [signing up](https://signup.heroku.com).

3. Run `heroku login` and fill in your Heroku credentials:

```bash
heroku login
```

4. Create a file called `static.json` in the root of your project with the below content:

`static.json`:

```json
{
  "root": "./docs/.vuepress/dist"
}
```

This is the configuration of your site; read more at [heroku-buildpack-static](https://github.com/heroku/heroku-buildpack-static).

## Layer0

See [Layer0 Documentation > Framework Guides > VuePress](https://docs.layer0.co/guides/vuepress).

## Netlify

1. On [Netlify](https://netlify.com), set up a new project from GitHub with the following settings:

   - **Build Command:** `pnpm docs:build`
   - **Publish directory:** `docs/.vuepress/dist`

2. Set [Environment variables](https://docs.netlify.com/configure-builds/environment-variables) to choose node version:

   - `NODE_VERSION`: 14

3. Hit the deploy button.

## Vercel

1. Go to [Vercel](https://vercel.com), set up a new project from GitHub with the following settings:

   - **FRAMEWORK PRESET:** `Other`
   - **BUILD COMMAND:** `pnpm docs:build`
   - **OUTPUT DIRECTORY:** `docs/.vuepress/dist`

2. Hit the deploy button.
