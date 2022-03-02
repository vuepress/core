# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-beta.36](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.35...v2.0.0-beta.36) (2022-03-01)

**Note:** Version bump only for package @vuepress/core





# [2.0.0-beta.35](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.34...v2.0.0-beta.35) (2022-01-22)

**Note:** Version bump only for package @vuepress/core





# [2.0.0-beta.34](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.33...v2.0.0-beta.34) (2022-01-21)

**Note:** Version bump only for package @vuepress/core





# [2.0.0-beta.33](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.32...v2.0.0-beta.33) (2022-01-12)


### Bug Fixes

* **core:** should process page hooks inside createPage ([e1cbab5](https://github.com/vuepress/vuepress-next/commit/e1cbab50bf79f8278fdc4d9a63c21762443a3183))


### Features

* **core:** allow theme to set default HTML templates ([4fb7b55](https://github.com/vuepress/vuepress-next/commit/4fb7b55741bd9a89769c758e71bc341d44d84d3e))





# [2.0.0-beta.32](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.31...v2.0.0-beta.32) (2021-12-28)


### Code Refactoring

* **core:** normalize core app structure ([6952acf](https://github.com/vuepress/vuepress-next/commit/6952acfeee4575e53ce468c3d180dc9f623d6cd1))


### BREAKING CHANGES

* **core:** config `templateSSR` is renamed to `templateBuild`





# [2.0.0-beta.29](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.28...v2.0.0-beta.29) (2021-12-18)


### Bug Fixes

* **core:** set default bundler option to vite ([3fd11f5](https://github.com/vuepress/vuepress-next/commit/3fd11f5321e5efbc2a6fdbf28a3b01834e9153b0))
* **core:** use theme after its plugins ([fc5bd91](https://github.com/vuepress/vuepress-next/commit/fc5bd91bb7dfb9f20bd9e916886a00518ae1989f))





# [2.0.0-beta.28](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.27...v2.0.0-beta.28) (2021-12-17)


### Features

* **core:** replace extendsPageData with extendsPage hook ([827a873](https://github.com/vuepress/vuepress-next/commit/827a873ca8f7230aeecac208f55934f824774760))
* **core:** support extendsMarkdownOptions hook ([a1fc69b](https://github.com/vuepress/vuepress-next/commit/a1fc69bdbc65f09eedacc4f860bba1ac7175c4af))
* **core:** support routeMeta in frontmatter ([93cdb53](https://github.com/vuepress/vuepress-next/commit/93cdb53a6134e43968b56a84f2e8bf012222436a))


### BREAKING CHANGES

* **core:** now `app.markdown` is only available in and after `onInitialized` hook
* **core:** now `extendsPageOptions` hook does not allow a return value any more
* **core:** `extendsPageData` hook should be migrated to `extendsPage` hook





# [2.0.0-beta.27](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.26...v2.0.0-beta.27) (2021-10-28)

**Note:** Version bump only for package @vuepress/core





# [2.0.0-beta.26](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.25...v2.0.0-beta.26) (2021-09-11)


### Bug Fixes

* **core:** use absolute path when creating pages (close [#421](https://github.com/vuepress/vuepress-next/issues/421)) ([0a2f7dc](https://github.com/vuepress/vuepress-next/commit/0a2f7dc0b17903723e1358cf4d66b20b709241db))


### BREAKING CHANGES

* **core:** now `PageOptions` does not accept relative file path





# [2.0.0-beta.25](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.24...v2.0.0-beta.25) (2021-08-29)

**Note:** Version bump only for package @vuepress/core





# [2.0.0-beta.24](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.23...v2.0.0-beta.24) (2021-08-14)

**Note:** Version bump only for package @vuepress/core





# [2.0.0-beta.23](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.22...v2.0.0-beta.23) (2021-08-01)


### Features

* **core:** store page data in page object (close [#319](https://github.com/vuepress/vuepress-next/issues/319)) ([c7d3710](https://github.com/vuepress/vuepress-next/commit/c7d3710f451e2d40ed09a1b2ae516adca0a7ab99))
* **core:** support paths without html extension (close [#292](https://github.com/vuepress/vuepress-next/issues/292)) ([#324](https://github.com/vuepress/vuepress-next/issues/324)) ([1d41365](https://github.com/vuepress/vuepress-next/commit/1d41365f56425384c0c8b919008c344b03ab9431))


### BREAKING CHANGES

* **core:** now `extendsPageData` hook is processed before `onInitialized` hook





# [2.0.0-beta.22](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.21...v2.0.0-beta.22) (2021-07-11)

**Note:** Version bump only for package @vuepress/core





# [2.0.0-beta.21](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.20...v2.0.0-beta.21) (2021-07-03)

**Note:** Version bump only for package @vuepress/core





# [2.0.0-beta.20](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.19...v2.0.0-beta.20) (2021-06-26)


### Bug Fixes

* **core:** invoke extendsPageOptions hook in createPage ([76292aa](https://github.com/vuepress/vuepress-next/commit/76292aac7000e2bf924c563ff7452624008102cd))


### BREAKING CHANGES

* **core:** extendsPageOptions now accept page options as the first argument





# [2.0.0-beta.19](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.18...v2.0.0-beta.19) (2021-06-19)

**Note:** Version bump only for package @vuepress/core





# [2.0.0-beta.18](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.17...v2.0.0-beta.18) (2021-06-12)


### Code Refactoring

* **core:** drop support for plugin nesting ([f7da97f](https://github.com/vuepress/vuepress-next/commit/f7da97f7f0ff24984cc6a2d0926b5fdf3af274c5))
* **core:** resolve page title from markdown env ([09d08a4](https://github.com/vuepress/vuepress-next/commit/09d08a4b89af16fcb833774e902b4d5404181689))


### BREAKING CHANGES

* **core:** a plugin cannot use other plugins anymore
* **core:** markdown emoji syntax is not supported in frontmatter title





# [2.0.0-beta.17](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.16...v2.0.0-beta.17) (2021-06-04)


### Features

* **core:** support multi-level theme inheritance ([5df8662](https://github.com/vuepress/vuepress-next/commit/5df86621cfcd7b138e473d40dc622e6ff8e0795f))


### BREAKING CHANGES

* **core:** `app.themeApi` is removed





# [2.0.0-beta.15](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.14...v2.0.0-beta.15) (2021-05-27)

**Note:** Version bump only for package @vuepress/core





# [2.0.0-beta.14](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.13...v2.0.0-beta.14) (2021-05-12)


### Bug Fixes

* **core:** avoid mutating theme layouts array ([fe27a57](https://github.com/vuepress/vuepress-next/commit/fe27a57c57bd92623ef4c3df6ce4282b8eda6f71))


### Features

* **core:** allow alias and define hook to return a promise ([3b3d289](https://github.com/vuepress/vuepress-next/commit/3b3d2893c58115de65606ffc508fdc7a9cf96f79))





# [2.0.0-beta.13](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.12...v2.0.0-beta.13) (2021-05-06)


### Bug Fixes

* **core:** path of page options should have the highest priority ([0fc6fd3](https://github.com/vuepress/vuepress-next/commit/0fc6fd38225816b6bfc59fb12de837634c7ffb5d))





# [2.0.0-beta.12](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.11...v2.0.0-beta.12) (2021-04-30)


### Bug Fixes

* **core:** avoid uri encoded filename ([4ff7f3b](https://github.com/vuepress/vuepress-next/commit/4ff7f3b287936cce0f9cfe5c8689c2efbb2b52aa))


### Features

* **core:** add deps to page object ([83c9aae](https://github.com/vuepress/vuepress-next/commit/83c9aaedcaf531d72d70ad514b9dd8ddf2e508d1))
* **core:** make filePath available in markdown env ([aa52549](https://github.com/vuepress/vuepress-next/commit/aa52549648b175626d3eafabe8629a78a8caf8e5))


### Performance Improvements

* **core:** reduce page data and component file size ([4c6eea5](https://github.com/vuepress/vuepress-next/commit/4c6eea5188e804cb3f6c7648d6528d43002618ae))
* **core:** reduce routes file size ([d926a17](https://github.com/vuepress/vuepress-next/commit/d926a170ee5f384845f5b166029fbc392f51dcde))


### BREAKING CHANGES

* **core:** `pagePath` prop of `<Content>` renamed to `pageKey`





# [2.0.0-beta.11](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.10...v2.0.0-beta.11) (2021-04-28)


### Performance Improvements

* **core:** merge page routes to reduce requests in vite dev ([fa2a614](https://github.com/vuepress/vuepress-next/commit/fa2a61413c70afd426f74e57e6e5d2a4900c6568))





# [2.0.0-beta.10](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.9...v2.0.0-beta.10) (2021-04-27)


### Bug Fixes

* **core:** allow extendsMarkdown to return a promise ([a4be2fd](https://github.com/vuepress/vuepress-next/commit/a4be2fda5952f64da2db6ba837b94bfb4e1315ce))





# [2.0.0-beta.9](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.8...v2.0.0-beta.9) (2021-04-21)


### Bug Fixes

* **core:** allow plugin itself as an item of plugin config array ([1fa8903](https://github.com/vuepress/vuepress-next/commit/1fa8903549d8f9eba3fc49e3117ee2018993b496))
* **core:** ensure trailing slash of page path (close [#114](https://github.com/vuepress/vuepress-next/issues/114)) ([cbcf166](https://github.com/vuepress/vuepress-next/commit/cbcf16624602e37c17935211ac4076c72db22507))


### Code Refactoring

* **core:** move evergreen option to bundler-webpack ([58c30c1](https://github.com/vuepress/vuepress-next/commit/58c30c1207f0f6e09e9d68096786ef189c67e9db))


### Features

* **core:** make frontmatter available in markdown env ([f977192](https://github.com/vuepress/vuepress-next/commit/f97719237db9d14c94716bf6b18fe52519a008cf))


### BREAKING CHANGES

* **core:** `evergreen` option is moved to `bundlerConfig.evergreen` for bundler-webpack





# [2.0.0-beta.8](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.7...v2.0.0-beta.8) (2021-04-11)


### Code Refactoring

* **core:** resolve theme when creating app ([fa683cb](https://github.com/vuepress/vuepress-next/commit/fa683cb76e8a3bcacc08d1dfd8bea6af79fee1d2))


### Features

* **utils:** add logger.createError method ([0c198d7](https://github.com/vuepress/vuepress-next/commit/0c198d7f9e122828b37a2db670048cfc2ce20e81))


### BREAKING CHANGES

* **core:** theme plugins could be overridden by user plugins now





# [2.0.0-beta.7](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.6...v2.0.0-beta.7) (2021-04-09)


### Features

* **core:** show warning when duplicate plugins are detected ([742f581](https://github.com/vuepress/vuepress-next/commit/742f5811032b3a2f0687edf3f966d25517734a8d))





# [2.0.0-beta.6](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.5...v2.0.0-beta.6) (2021-03-26)

**Note:** Version bump only for package @vuepress/core





# [2.0.0-beta.5](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2021-03-26)


### Performance Improvements

* improve HMR support ([38f0073](https://github.com/vuepress/vuepress-next/commit/38f007335864db4c9125ea5905ca91850fb7103b))





# [2.0.0-beta.4](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2021-03-20)

**Note:** Version bump only for package @vuepress/core





# [2.0.0-beta.1](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.0...v2.0.0-beta.1) (2021-03-13)

**Note:** Version bump only for package @vuepress/core





# [2.0.0-beta.0](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.26...v2.0.0-beta.0) (2021-03-13)


### Features

* implement vite hmr ([525c18d](https://github.com/vuepress/vuepress-next/commit/525c18d5a64fbdbdeb5ce1348ec1e1ead3dbd8f9))





# [2.0.0-alpha.25](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.24...v2.0.0-alpha.25) (2021-02-20)


### Code Refactoring

* **core:** remove theme data from site data ([187aef3](https://github.com/vuepress/vuepress-next/commit/187aef36607efc62d7b2d5c773553f89685cf64c))


### BREAKING CHANGES

* **core:** `themeConfig` is not available in site data any more





# [2.0.0-alpha.24](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.23...v2.0.0-alpha.24) (2021-02-13)


### Code Refactoring

* **core:** change page default date to 0000-00-00 ([1ce602e](https://github.com/vuepress/vuepress-next/commit/1ce602ef811f29f083a8d10695a7b212ed82cae5))
* **core:** remove permalink and pattern from page options ([9534989](https://github.com/vuepress/vuepress-next/commit/9534989a82e620b1c09b4a09d4cfee1e99d145fc))


### Features

* **core:** add extendsPageOptions hook ([19b7e83](https://github.com/vuepress/vuepress-next/commit/19b7e83cb25ec523857d34c415782d595a05d0ff))
* **core:** add watchers parameter to onWatched hook ([0bcd594](https://github.com/vuepress/vuepress-next/commit/0bcd594d1645fe9994d1456e86803e5619057bfb))


### BREAKING CHANGES

* **core:** remove permalink and pattern from page options
* **core:** change page default date from 1970-01-01 to 0000-00-00





# [2.0.0-alpha.23](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.22...v2.0.0-alpha.23) (2021-02-10)

**Note:** Version bump only for package @vuepress/core





# [2.0.0-alpha.22](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.21...v2.0.0-alpha.22) (2021-02-10)

**Note:** Version bump only for package @vuepress/core





# [2.0.0-alpha.20](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.19...v2.0.0-alpha.20) (2021-02-04)


### Features

* **core:** create siteData in vuepress app ([05b87dd](https://github.com/vuepress/vuepress-next/commit/05b87ddf32f32c94cc131e0074365aeba70f85f2))
* **core:** make language available in page data ([03bb09f](https://github.com/vuepress/vuepress-next/commit/03bb09fd51aeaff56d26820a1401b87ea8bdeb38))





# [2.0.0-alpha.19](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.18...v2.0.0-alpha.19) (2021-01-24)


### Features

* **core:** add onWatched hook ([9725a10](https://github.com/vuepress/vuepress-next/commit/9725a101599363094a85916317109b67d365dff4))





# [2.0.0-alpha.18](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.17...v2.0.0-alpha.18) (2021-01-17)

**Note:** Version bump only for package @vuepress/core





# [2.0.0-alpha.17](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.16...v2.0.0-alpha.17) (2021-01-13)

**Note:** Version bump only for package @vuepress/core





# [2.0.0-alpha.16](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.15...v2.0.0-alpha.16) (2021-01-11)


### Bug Fixes

* **core:** support special characters in filename and permalink ([c3e68ef](https://github.com/vuepress/vuepress-next/commit/c3e68ef6a4aa3f6722d5bc4079bafe5d3b176e5e))





# [2.0.0-alpha.15](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.14...v2.0.0-alpha.15) (2021-01-04)


### Features

* **core:** provide app in all plugin hooks ([21cc3a6](https://github.com/vuepress/vuepress-next/commit/21cc3a608e54d38de8de8f453b5e88031b4cedb1))





# [2.0.0-alpha.14](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.13...v2.0.0-alpha.14) (2021-01-03)


### Bug Fixes

* **core:** fix page date resolving ([de6c5c8](https://github.com/vuepress/vuepress-next/commit/de6c5c8ca89347bea4ba2925e283a7b710a5b5d3))





# [2.0.0-alpha.13](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.12...v2.0.0-alpha.13) (2020-12-23)

**Note:** Version bump only for package @vuepress/core





# [2.0.0-alpha.12](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.11...v2.0.0-alpha.12) (2020-12-19)

**Note:** Version bump only for package @vuepress/core





# [2.0.0-alpha.8](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.7...v2.0.0-alpha.8) (2020-12-11)

**Note:** Version bump only for package @vuepress/core





# [2.0.0-alpha.7](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.6...v2.0.0-alpha.7) (2020-12-09)

**Note:** Version bump only for package @vuepress/core





# [2.0.0-alpha.6](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.5...v2.0.0-alpha.6) (2020-12-09)

**Note:** Version bump only for package @vuepress/core





# [2.0.0-alpha.5](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.4...v2.0.0-alpha.5) (2020-12-03)

**Note:** Version bump only for package @vuepress/core





# [2.0.0-alpha.4](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.3...v2.0.0-alpha.4) (2020-12-02)


### Bug Fixes

* **core:** failed to resolve local theme ([4d836e2](https://github.com/vuepress/vuepress-next/commit/4d836e2bc3e7affe17f63df1c4ce40c464a7e6fb))
* **core:** warn if layout directory does not exist ([3d2d414](https://github.com/vuepress/vuepress-next/commit/3d2d4148024963521b9e1ebbc29aa19697ac3452))





# [2.0.0-alpha.3](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.2...v2.0.0-alpha.3) (2020-12-01)


### Bug Fixes

* **core:** avoid runtime warning for empty template (close [#10](https://github.com/vuepress/vuepress-next/issues/10)) ([bcbf703](https://github.com/vuepress/vuepress-next/commit/bcbf703e6e449f7753697b7dfc503bd643bfd240))





# 2.0.0-alpha.1 (2020-12-01)


### Bug Fixes

* **core:** default value of base and lang ([5a5df27](https://github.com/vuepress/vuepress-next/commit/5a5df274de4691315e567e932a6cffe4a04d88c1))
* **core:** infer page locale path correctly ([8f2b10b](https://github.com/vuepress/vuepress-next/commit/8f2b10bc8c9fa58ee4181bbfc50ade3e45e382ff))
* **core:** resolve page date ([bd627d7](https://github.com/vuepress/vuepress-next/commit/bd627d79482e77c573654db699ff58f93e8d8dd5))
* **core:** resolve page excerpt with correct markdown env ([e0f4066](https://github.com/vuepress/vuepress-next/commit/e0f406625baf085ced29ea88328069fb0a1d0cf4))
* **core:** resolve page title from markdown content as fallback ([b216012](https://github.com/vuepress/vuepress-next/commit/b2160129b175013518b9fb7d82d034694509ae86))
* **core:** resolve plugin and theme by name ([3031324](https://github.com/vuepress/vuepress-next/commit/30313247958f9e1d4a7214a18ce6e17bc582bc3e))
* **core:** respect page options ([d8dbbb7](https://github.com/vuepress/vuepress-next/commit/d8dbbb777161130634fe5cadf0be571ed830a7ab))


### Features

* **core:** add 404 page if not exist ([0297a9e](https://github.com/vuepress/vuepress-next/commit/0297a9ed96acb0b792dac44f72f4d549a5930841))
* **core:** add clientAppRootComponentFiles hook ([7f640c8](https://github.com/vuepress/vuepress-next/commit/7f640c879f53b5dff67a2c6d374360f3e19aa679))
* **core:** add extendsPageData hook ([5a10994](https://github.com/vuepress/vuepress-next/commit/5a109943ed1beb3ddfd07c018e0cba33cb46fdb2))
* **core:** add pagePatterns option ([9a8855d](https://github.com/vuepress/vuepress-next/commit/9a8855d86683e95e2dae33493d0321fa14bfee9d))
* **core:** add public directory config ([1b52ffe](https://github.com/vuepress/vuepress-next/commit/1b52ffe89a7f87d3c6822d07b6b75f2675b8745f))
* **core:** add theme layouts option ([bf96cc3](https://github.com/vuepress/vuepress-next/commit/bf96cc3a2ab9133d3606231e3f9d0c46b2a2103c))
* **core:** allow disable prefetch and preload links ([2991b6a](https://github.com/vuepress/vuepress-next/commit/2991b6a7025eefac21846eb520aa5ca2ea2dc594))
* **core:** allow plugins and themes use export default ([874979d](https://github.com/vuepress/vuepress-next/commit/874979d6d86e308469488c8405e6f7bbc80d1391))
* **core:** enable evergreen option by default ([fa67dbb](https://github.com/vuepress/vuepress-next/commit/fa67dbb9474c27ff10e4061ac15171bc4936d274))
* **core:** export LocaleConfig type from shared ([04de925](https://github.com/vuepress/vuepress-next/commit/04de925326ad1101702e57fd9903de808a72bb97))
* **core:** inject page title into route meta ([0d9e7e3](https://github.com/vuepress/vuepress-next/commit/0d9e7e3b3a0a78504fc586887cf1a777ae434846))
* **core:** remove plugins from app options ([fe411e7](https://github.com/vuepress/vuepress-next/commit/fe411e7ef8a5802876f55246a9937825e802f538))
* **core:** remove webpack related hooks ([9613f69](https://github.com/vuepress/vuepress-next/commit/9613f69ace1413b3776a6012319cf7c6fe1d3469))
