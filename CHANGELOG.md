# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-beta.36](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.35...v2.0.0-beta.36) (2022-03-01)


### Bug Fixes

* avoid user content to be used as string params (close [#727](https://github.com/vuepress/vuepress-next/issues/727)) ([788afda](https://github.com/vuepress/vuepress-next/commit/788afdab56e4048f61505280113e4a073f418f4f))
* **bundler-webpack:** allow `configureWebpack` option to return void ([#662](https://github.com/vuepress/vuepress-next/issues/662)) ([4488cb3](https://github.com/vuepress/vuepress-next/commit/4488cb31d01cf9a198124631f5e3296d1d0f12ab))
* **theme-default:** fix title style when no content in custom container (close [#648](https://github.com/vuepress/vuepress-next/issues/648)) ([#657](https://github.com/vuepress/vuepress-next/issues/657)) ([73d297f](https://github.com/vuepress/vuepress-next/commit/73d297f321750de098c22c8c774dbe934475ddcb))
* use function to pass a single default slot in render function (close [#716](https://github.com/vuepress/vuepress-next/issues/716)) ([4550161](https://github.com/vuepress/vuepress-next/commit/455016192955fb6af74821baf52d3c2c1e4d42c9))


### Features

* **cli:** watch page dependencies on dev ([e6ed487](https://github.com/vuepress/vuepress-next/commit/e6ed487c6d7002fdde1034a961853218b0eb4418))
* **markdown:** add aria-hidden for line-numbers ([#731](https://github.com/vuepress/vuepress-next/issues/731)) ([6f5d132](https://github.com/vuepress/vuepress-next/commit/6f5d13289dd41dbb55d883ff8bff996e77b6daf9))





# [2.0.0-beta.35](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.34...v2.0.0-beta.35) (2022-01-22)


### Bug Fixes

* **cli:** watch user config correctly on win32 (close [#611](https://github.com/vuepress/vuepress-next/issues/611)) ([055b174](https://github.com/vuepress/vuepress-next/commit/055b174d5eb30aae76fe409b948da2be5a7fbe58))


### Features

* **client:** allow customizing global computed resolvers (close [#338](https://github.com/vuepress/vuepress-next/issues/338)) ([405fc8d](https://github.com/vuepress/vuepress-next/commit/405fc8d7aa579d04b43bf21f926176da761ea2e6))





# [2.0.0-beta.34](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.33...v2.0.0-beta.34) (2022-01-21)


### Bug Fixes

* **theme-default:** add missing color transitions ([0955c9f](https://github.com/vuepress/vuepress-next/commit/0955c9f48a4811d681f8b20620a1c5134dcb3c14))
* **theme-default:** highlight sidebar heading when used as a link (close [#628](https://github.com/vuepress/vuepress-next/issues/628)) ([1a5f4fb](https://github.com/vuepress/vuepress-next/commit/1a5f4fb7bf66671a2b0acbaf5bca47a00a48daaa))


### Code Refactoring

* remove debug plugin ([f8481eb](https://github.com/vuepress/vuepress-next/commit/f8481eb06b001c81e54cd6fab7d12f1ab75cdbc7))


### Features

* **client:** add vue-devtools support ([a19d945](https://github.com/vuepress/vuepress-next/commit/a19d945445a4b50455553c1221eaeefda6e73211))
* **plugin-docsearch:** bump docsearch version to support translations ([47a0ef1](https://github.com/vuepress/vuepress-next/commit/47a0ef149c7acdd8317f83c2a374b80dd39761ef))
* **plugin-external-link-icon:** add locales option ([#636](https://github.com/vuepress/vuepress-next/issues/636)) ([c7f0c43](https://github.com/vuepress/vuepress-next/commit/c7f0c43366405ef1a8e6b69aadfb35c9c9361452))
* **plugin-theme-data:** add devtools support ([dab437c](https://github.com/vuepress/vuepress-next/commit/dab437cc7f331fb8da619485a47d2529cb4ce91a))
* **theme-default:** improve sidebar a11y (close [#604](https://github.com/vuepress/vuepress-next/issues/604)) ([8033b82](https://github.com/vuepress/vuepress-next/commit/8033b826123e8d57f00cbd393a10b8a268239fe0))


### BREAKING CHANGES

* `@vuepress/plugin-debug` package has been removed





# [2.0.0-beta.33](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.32...v2.0.0-beta.33) (2022-01-12)


### Bug Fixes

* **core:** should process page hooks inside createPage ([e1cbab5](https://github.com/vuepress/vuepress-next/commit/e1cbab50bf79f8278fdc4d9a63c21762443a3183))
* **markdown:** replace img src correctly when wrapped with other html tags (close [#597](https://github.com/vuepress/vuepress-next/issues/597)) ([f2f53ef](https://github.com/vuepress/vuepress-next/commit/f2f53efc21a1c16c342f32d15562b7153e48ce70))
* **theme-default:** bump vueuse to avoid localstorage error (close [#589](https://github.com/vuepress/vuepress-next/issues/589)) ([#612](https://github.com/vuepress/vuepress-next/issues/612)) ([7558681](https://github.com/vuepress/vuepress-next/commit/755868194a05ae8d1d70fbd14c0230e8080f7db1))


### Features

* **core:** allow theme to set default HTML templates ([4fb7b55](https://github.com/vuepress/vuepress-next/commit/4fb7b55741bd9a89769c758e71bc341d44d84d3e))
* **plugin-shiki:** bump shiki to 0.10.0 ([9d42e56](https://github.com/vuepress/vuepress-next/commit/9d42e56c7ea4b74046ef1b41a39fc4862c39e6f3))
* **theme-default:** imporve dark mode experience (close [#387](https://github.com/vuepress/vuepress-next/issues/387)) ([c20a1ba](https://github.com/vuepress/vuepress-next/commit/c20a1baa97f4fbbc6a907fb8ca0f76a3cc0310c1))
* **theme-default:** make all non-global components replaceable ([f480bb2](https://github.com/vuepress/vuepress-next/commit/f480bb25943fe1a81e2ceda8f1b53afbb11b254c))





# [2.0.0-beta.32](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.31...v2.0.0-beta.32) (2021-12-28)


### Bug Fixes

* **theme-default:** avoid transition on fragment child (close [#592](https://github.com/vuepress/vuepress-next/issues/592)) ([10e5cc0](https://github.com/vuepress/vuepress-next/commit/10e5cc06b96f9dc2fc8ba2c8bdc83f7177e213bc))


### Code Refactoring

* **core:** normalize core app structure ([6952acf](https://github.com/vuepress/vuepress-next/commit/6952acfeee4575e53ce468c3d180dc9f623d6cd1))


### Features

* **shared:** improve types of site base ([66943fb](https://github.com/vuepress/vuepress-next/commit/66943fb185acbc90efbc3c1509a02c9c22963393))


### BREAKING CHANGES

* **core:** config `templateSSR` is renamed to `templateBuild`





# [2.0.0-beta.31](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.30...v2.0.0-beta.31) (2021-12-24)


### Bug Fixes

* **theme-default:** code line numbers unaligned in different display scale (close [#499](https://github.com/vuepress/vuepress-next/issues/499)) ([21accb5](https://github.com/vuepress/vuepress-next/commit/21accb5773224363a548915a6f3a7a23a5bcfa0d))
* **theme-default:** remove focus-visible outline (close [#359](https://github.com/vuepress/vuepress-next/issues/359)) ([cfbaa14](https://github.com/vuepress/vuepress-next/commit/cfbaa14270df0584594f56abc5a9ac0c8a6b945a))


### Features

* **theme-default:** support collapsible sidebar (close [#397](https://github.com/vuepress/vuepress-next/issues/397)) ([c7fd815](https://github.com/vuepress/vuepress-next/commit/c7fd81580a9061b22f1a60a735fdc9a527ef1bfd))





# [2.0.0-beta.30](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.29...v2.0.0-beta.30) (2021-12-23)


### Bug Fixes

* **plugin-back-to-top:** fix regression when upgrading ts-debounce (close [#579](https://github.com/vuepress/vuepress-next/issues/579)) ([7a6a45b](https://github.com/vuepress/vuepress-next/commit/7a6a45be5aec933c0bfd983a1e9d35ee1231761d))
* **theme-default:** arrows not displaying in page nav ([#573](https://github.com/vuepress/vuepress-next/issues/573)) ([2d5b084](https://github.com/vuepress/vuepress-next/commit/2d5b08400316a1734ddc6451f390ebcd9db3faa3))
* **theme-default:** do not always wrap logo and hero image with client-only ([6b4ee45](https://github.com/vuepress/vuepress-next/commit/6b4ee45fdba81705af02ed6a55d9c1314ddf360a))


### Features

* **bundler-webpack:** add devServerSetupMiddlewares option ([4a042a4](https://github.com/vuepress/vuepress-next/commit/4a042a4abc96fc208b6da658782ad3e99fd7af7b))


### BREAKING CHANGES

* **bundler-webpack:** `beforeDevServer` and `afterDevServer` options are removed, use `devServerSetupMiddlewares` instead





# [2.0.0-beta.29](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.28...v2.0.0-beta.29) (2021-12-18)


### Bug Fixes

* **core:** set default bundler option to vite ([3fd11f5](https://github.com/vuepress/vuepress-next/commit/3fd11f5321e5efbc2a6fdbf28a3b01834e9153b0))
* **core:** use theme after its plugins ([fc5bd91](https://github.com/vuepress/vuepress-next/commit/fc5bd91bb7dfb9f20bd9e916886a00518ae1989f))


### Features

* extract external link icon to plugin ([437b750](https://github.com/vuepress/vuepress-next/commit/437b75076667e653d3600c96f9f4a7c3c3e47e57))
* **theme-default:** export default locale options ([e3ac623](https://github.com/vuepress/vuepress-next/commit/e3ac6230faa75f1557d07753f04670ef29767442))


### BREAKING CHANGES

* config `markdown.links.externalIcon` is removed, use plugin-external-link-icon instead
* frontmatter `externalIcon` is removed, use `externalLinkIcon` from plugin-external-link-icon
* component `OutboundLink` is removed, use `ExternalLinkIcon` from plugin-external-link-icon





# [2.0.0-beta.28](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.27...v2.0.0-beta.28) (2021-12-17)


### Bug Fixes

* **bundler-vite:** flatten the plugins structure to avoid ordering issue (close [#535](https://github.com/vuepress/vuepress-next/issues/535)) ([b4011ac](https://github.com/vuepress/vuepress-next/commit/b4011ac9c4f02a0ff06636f6cbb6f68f63d26109))
* **theme-default:** fix kbd color in dark mode ([#503](https://github.com/vuepress/vuepress-next/issues/503)) ([31bea57](https://github.com/vuepress/vuepress-next/commit/31bea57f855f322c1119d86bd256a5c98a983c41))
* **theme-default:** use browser default locale in last updated date ([#462](https://github.com/vuepress/vuepress-next/issues/462)) ([3746e66](https://github.com/vuepress/vuepress-next/commit/3746e664d79dc1088e94bbb6f2eda2cf6df7cc1c))


### Features

* **core:** replace extendsPageData with extendsPage hook ([827a873](https://github.com/vuepress/vuepress-next/commit/827a873ca8f7230aeecac208f55934f824774760))
* **core:** support extendsMarkdownOptions hook ([a1fc69b](https://github.com/vuepress/vuepress-next/commit/a1fc69bdbc65f09eedacc4f860bba1ac7175c4af))
* **core:** support routeMeta in frontmatter ([93cdb53](https://github.com/vuepress/vuepress-next/commit/93cdb53a6134e43968b56a84f2e8bf012222436a))
* **theme-default:** make the arrows in page nav clickable ([#540](https://github.com/vuepress/vuepress-next/issues/540)) ([e7b31fd](https://github.com/vuepress/vuepress-next/commit/e7b31fdad9d6cc410b332458800aa1e00d538643))
* **theme-default:** support heroImageDark frontmatter (close [#526](https://github.com/vuepress/vuepress-next/issues/526)) ([#559](https://github.com/vuepress/vuepress-next/issues/559)) ([779ddaa](https://github.com/vuepress/vuepress-next/commit/779ddaa8cb46d293d3048d5ac2a425ead1322763))
* **vuepress-webpack:** add vuepress-webpack package ([a2d9c9a](https://github.com/vuepress/vuepress-next/commit/a2d9c9ae95a9e89795bf81cd767a52770ccfa523))
* **vuepress:** switch default bundler to vite ([e1004df](https://github.com/vuepress/vuepress-next/commit/e1004df6e892f68d31e15f252010d189a3762b52))


### BREAKING CHANGES

* **vuepress:** switch default bundler from webpack to vite
* **core:** now `app.markdown` is only available in and after `onInitialized` hook
* **core:** now `extendsPageOptions` hook does not allow a return value any more
* **core:** `extendsPageData` hook should be migrated to `extendsPage` hook





# [2.0.0-beta.27](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.26...v2.0.0-beta.27) (2021-10-28)


### Bug Fixes

* **shared:** treat ftp links as external (close [#456](https://github.com/vuepress/vuepress-next/issues/456)) ([9894b56](https://github.com/vuepress/vuepress-next/commit/9894b5691950545fc90976e7fcc9aee9190ca7f8))
* **theme-default:** avoid ssr-mismatch of dark mode logo (close [#453](https://github.com/vuepress/vuepress-next/issues/453)) ([aaf1152](https://github.com/vuepress/vuepress-next/commit/aaf1152495f6f28285f94f9a48c35b1002f522e9))
* **theme-default:** fix code overflow-wrap in Safari (close [#435](https://github.com/vuepress/vuepress-next/issues/435)) ([6e6fe4f](https://github.com/vuepress/vuepress-next/commit/6e6fe4fed7cc50f33db0ecd345dc21861f57dc60))
* **theme-default:** hero actions spacing on small devices (close [#381](https://github.com/vuepress/vuepress-next/issues/381)) ([#442](https://github.com/vuepress/vuepress-next/issues/442)) ([288927a](https://github.com/vuepress/vuepress-next/commit/288927a9186cd2d50b0523c8970271d259279d04))


### Features

* **bundler-vite:** compat with vite 2.6 ([bad82eb](https://github.com/vuepress/vuepress-next/commit/bad82eb89dd85a3b9786fc72fbb9ee299a3909fe))
* **shared:** add isLinkFtp util ([b8f35c9](https://github.com/vuepress/vuepress-next/commit/b8f35c970f32f723179d229a7e297d5cd6fb2efb))
* **theme-default:** support editLinkPattern frontmatter (close [#450](https://github.com/vuepress/vuepress-next/issues/450)) ([edecf2d](https://github.com/vuepress/vuepress-next/commit/edecf2d2b0735200b2b354afabc851ebf43e3225))





# [2.0.0-beta.26](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.25...v2.0.0-beta.26) (2021-09-11)


### Bug Fixes

* **client:** fix aria-hidden attribute of OutboundLink (close [#427](https://github.com/vuepress/vuepress-next/issues/427)) ([#432](https://github.com/vuepress/vuepress-next/issues/432)) ([0575ba9](https://github.com/vuepress/vuepress-next/commit/0575ba9326cbb41a97fa3956e0e28d60af7c9c13))
* **client:** fix wrong attrs selector when loading head tags (close [#426](https://github.com/vuepress/vuepress-next/issues/426)) ([5654685](https://github.com/vuepress/vuepress-next/commit/5654685c9674e705b099bc5e1b75ba491205ef83))
* **core:** use absolute path when creating pages (close [#421](https://github.com/vuepress/vuepress-next/issues/421)) ([0a2f7dc](https://github.com/vuepress/vuepress-next/commit/0a2f7dc0b17903723e1358cf4d66b20b709241db))


### Features

* **theme-default:** support navbar and sidebar slot for Layout.vue ([a42e431](https://github.com/vuepress/vuepress-next/commit/a42e431a898240c67471a198fbde33c8805c2850))


### BREAKING CHANGES

* **core:** now `PageOptions` does not accept relative file path





# [2.0.0-beta.25](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.24...v2.0.0-beta.25) (2021-08-29)


### Bug Fixes

* **plugin-git:** add HEAD into git shortlog arguments (close [#205](https://github.com/vuepress/vuepress-next/issues/205)) ([#398](https://github.com/vuepress/vuepress-next/issues/398)) ([9be4de1](https://github.com/vuepress/vuepress-next/commit/9be4de1c02fa0e2574fdac3872bf7afc3611e4ae))
* **theme-default:** improve the style for non-square logo ([#386](https://github.com/vuepress/vuepress-next/issues/386)) ([ff7c57f](https://github.com/vuepress/vuepress-next/commit/ff7c57f9b99736d67c01d232b6208fdc2f0d0321))


### Code Refactoring

* add prefix to client constants (close [#392](https://github.com/vuepress/vuepress-next/issues/392)) ([c6447c4](https://github.com/vuepress/vuepress-next/commit/c6447c4ba1a98cb5c5ea6991c1fcdd573668c9c1))


### Features

* **bundler-webpack:** bump webpack-dev-server to 4.0.0 ([6e3fc32](https://github.com/vuepress/vuepress-next/commit/6e3fc324b1bc79c6a743ebe68046dcb10255bc21))


### BREAKING CHANGES

* client constants should add `VUEPRESS` prefix now





# [2.0.0-beta.24](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.23...v2.0.0-beta.24) (2021-08-14)


### Bug Fixes

* **plugin-pwa:** compat with workbox-build 6.2.2 (close [#361](https://github.com/vuepress/vuepress-next/issues/361)) ([f28e4cb](https://github.com/vuepress/vuepress-next/commit/f28e4cbc6a1b760440b4bdd1598eded5b47dfec5))
* **theme-default:** avoid recursive ref update in code-group ([ca8404a](https://github.com/vuepress/vuepress-next/commit/ca8404a12b8ab83ac9904431fac189f61f7e5100))


### Code Refactoring

* **client:** move built-in meta tags to default html template (close [#358](https://github.com/vuepress/vuepress-next/issues/358)) ([e5c0fec](https://github.com/vuepress/vuepress-next/commit/e5c0feccb92b6aea4351110c20656dd66a6e0847))


### Features

* **theme-default:** add `logoDark` locale option (close [#283](https://github.com/vuepress/vuepress-next/issues/283)) ([991c07a](https://github.com/vuepress/vuepress-next/commit/991c07a26d745b5c13ab320b04d8ee79ac5a6ebc))
* **theme-default:** add css variables for transition ([#325](https://github.com/vuepress/vuepress-next/issues/325)) ([2b09004](https://github.com/vuepress/vuepress-next/commit/2b09004cfb65ca15e593c680d8e80f2a28ecd741))
* **theme-default:** improve a11y and animation of sidebar button ([#365](https://github.com/vuepress/vuepress-next/issues/365)) ([c99861e](https://github.com/vuepress/vuepress-next/commit/c99861e4c65dfcce8b29c9ce7943944e3d6ca3c1))
* **theme-default:** store dark mode state in local storage (close [#335](https://github.com/vuepress/vuepress-next/issues/335)) ([9582b3b](https://github.com/vuepress/vuepress-next/commit/9582b3b72c42b28f74484b55d88bc1fb2d8f56df))


### BREAKING CHANGES

* **client:** the previous built-in meta tags should be manually added to custom html template





# [2.0.0-beta.23](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.22...v2.0.0-beta.23) (2021-08-01)


### Bug Fixes

* **markdown:** encode file path when coverting links (close [#306](https://github.com/vuepress/vuepress-next/issues/306)) ([920c9ac](https://github.com/vuepress/vuepress-next/commit/920c9ac9864ad6877606e0839ae0f35695fe5e0c))
* **theme-default:** use constant color for inserted token (close [#296](https://github.com/vuepress/vuepress-next/issues/296)) ([4596028](https://github.com/vuepress/vuepress-next/commit/459602898cee7c3ecd5d3c05c83a7db97729a14f))


### Features

* **bundler-webpack:** bump webpack-dev-server to 4.0.0-rc.0 ([816da00](https://github.com/vuepress/vuepress-next/commit/816da009ea1597e170b754c54253c0797208db1b))
* **core:** store page data in page object (close [#319](https://github.com/vuepress/vuepress-next/issues/319)) ([c7d3710](https://github.com/vuepress/vuepress-next/commit/c7d3710f451e2d40ed09a1b2ae516adca0a7ab99))
* **core:** support paths without html extension (close [#292](https://github.com/vuepress/vuepress-next/issues/292)) ([#324](https://github.com/vuepress/vuepress-next/issues/324)) ([1d41365](https://github.com/vuepress/vuepress-next/commit/1d41365f56425384c0c8b919008c344b03ab9431))
* **markdown:** support `code.lineNumbers` to be set to number (close [#231](https://github.com/vuepress/vuepress-next/issues/231)) ([#276](https://github.com/vuepress/vuepress-next/issues/276)) ([a7fbdec](https://github.com/vuepress/vuepress-next/commit/a7fbdec893e01937b392ba40ed9dc8888415f9ed))
* **theme-default:** add `toggleDarkMode` locale option ([#275](https://github.com/vuepress/vuepress-next/issues/275)) ([a685a1b](https://github.com/vuepress/vuepress-next/commit/a685a1b9e47ef91da40c27194e927daa63343520))
* **theme-default:** add missing transitions ([066c6e4](https://github.com/vuepress/vuepress-next/commit/066c6e413986f4246b1812ae88c828254404e5c5))
* **theme-default:** enhance color transitions ([#287](https://github.com/vuepress/vuepress-next/issues/287)) ([9b96871](https://github.com/vuepress/vuepress-next/commit/9b968719bee5742cb6e3feb8d7dfbd00d13d0785))
* **theme-default:** enhance color transitions ([#321](https://github.com/vuepress/vuepress-next/issues/321)) ([aeaa3ba](https://github.com/vuepress/vuepress-next/commit/aeaa3ba8362af7e4013d419af1db246c657646ff))
* **theme-default:** set dark mode color-scheme ([#289](https://github.com/vuepress/vuepress-next/issues/289)) ([0b3abd3](https://github.com/vuepress/vuepress-next/commit/0b3abd37f1201176d057d8bdd870dcbc1ea25079))
* **theme-default:** support page slot for Layout.vue ([a8de0a9](https://github.com/vuepress/vuepress-next/commit/a8de0a990711a2732f2f85b086e733fbd8a74110))


### BREAKING CHANGES

* **core:** now `extendsPageData` hook is processed before `onInitialized` hook





# [2.0.0-beta.22](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.21...v2.0.0-beta.22) (2021-07-11)


### Bug Fixes

* **bundler-vite:** fallback html requests to index.html (close [#265](https://github.com/vuepress/vuepress-next/issues/265)) ([665cda3](https://github.com/vuepress/vuepress-next/commit/665cda3b84f53a62177083af8af6d034b7e1c147))
* **markdown:** resolve assets links in html img tags (close [#254](https://github.com/vuepress/vuepress-next/issues/254)) ([7cbb163](https://github.com/vuepress/vuepress-next/commit/7cbb163bf19cbe8e8d682ef9707c3f738486e089))
* **plugin-active-header-links:** update active header link selector ([#259](https://github.com/vuepress/vuepress-next/issues/259)) ([adaeed5](https://github.com/vuepress/vuepress-next/commit/adaeed5b71b2746b8d30e0eac7be55a736eefb11))
* **theme-default:** break long links on overflow (close [#266](https://github.com/vuepress/vuepress-next/issues/266)) ([#273](https://github.com/vuepress/vuepress-next/issues/273)) ([eb970c3](https://github.com/vuepress/vuepress-next/commit/eb970c3aa4c4d650cd964b0c1f60d423a7d55125))





# [2.0.0-beta.21](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.20...v2.0.0-beta.21) (2021-07-03)


### Bug Fixes

* **client:** avoid duplicate slash after base in withBase util (close [#246](https://github.com/vuepress/vuepress-next/issues/246)) ([af9ceff](https://github.com/vuepress/vuepress-next/commit/af9ceff912466ce538da756dd90d56f697f9ea2d))
* **markdown:** filter permalink symbol in toc (close [#251](https://github.com/vuepress/vuepress-next/issues/251)) ([5a35806](https://github.com/vuepress/vuepress-next/commit/5a3580656336349c29abb033a3d732646e111bfd))
* **theme-default:** fix nav glitch at exactly 719px screen width ([#238](https://github.com/vuepress/vuepress-next/issues/238)) ([3154fbb](https://github.com/vuepress/vuepress-next/commit/3154fbbc5c3b11e5f2a2310a0895538491fbec8f))
* **theme-default:** use default cursor on non-link sidebar items ([ca22d4f](https://github.com/vuepress/vuepress-next/commit/ca22d4fe7ade66571f34dc80343f4ec57483b44a))


### Features

* **bundler-vite:** avoid global constants being replaced by vite (close [#244](https://github.com/vuepress/vuepress-next/issues/244)) ([#245](https://github.com/vuepress/vuepress-next/issues/245)) ([0c86968](https://github.com/vuepress/vuepress-next/commit/0c869684c4e179347eebc38d916a0dfd2115b321))





# [2.0.0-beta.20](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.19...v2.0.0-beta.20) (2021-06-26)


### Bug Fixes

* **core:** invoke extendsPageOptions hook in createPage ([76292aa](https://github.com/vuepress/vuepress-next/commit/76292aac7000e2bf924c563ff7452624008102cd))


### Features

* **markdown:** bump markdown-it-anchor to 8.0.4 ([41338f7](https://github.com/vuepress/vuepress-next/commit/41338f7d656bf9e692c3ff22e05e4b3c1a9cbd6f))
* **plugin-pwa:** bump mitt to 3.0.0 ([8e2eb33](https://github.com/vuepress/vuepress-next/commit/8e2eb3358baa91c410adffb01f218404c4a4f393))
* **theme-default:** refine sidebar config ([ea7c4bb](https://github.com/vuepress/vuepress-next/commit/ea7c4bbac269f2f9ade4d58cb77dad27055d9bc0))


### BREAKING CHANGES

* **markdown:** `markdown.anchor` has changed, see changelog of markdown-it-anchor 8.0.0
* **theme-default:** `isGroup` field of sidebar config is removed
* **core:** extendsPageOptions now accept page options as the first argument





# [2.0.0-beta.19](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.18...v2.0.0-beta.19) (2021-06-19)


### Bug Fixes

* **bundler-vite:** resolve client entry url correctly (close [#190](https://github.com/vuepress/vuepress-next/issues/190)) ([36babba](https://github.com/vuepress/vuepress-next/commit/36babba394eccc070838c6d0861e91924d305e26))
* **bundler-webpack:** sync types of webpack-dev-server 4 (close [#208](https://github.com/vuepress/vuepress-next/issues/208)) ([207014b](https://github.com/vuepress/vuepress-next/commit/207014b087d29f43bd01604954e33277b6b19150))


### Features

* **bundler-webpack:** support vue-loader options ([5a51912](https://github.com/vuepress/vuepress-next/commit/5a51912d974ba4a83a9586b40cb7cb7982c6c81b))
* **theme-default:** support activeMatch in navbar config ([ab0c6d1](https://github.com/vuepress/vuepress-next/commit/ab0c6d1544e62b505547c45afe6347fdb735c011))
* **theme-default:** support disabling dark mode ([6517ce1](https://github.com/vuepress/vuepress-next/commit/6517ce1c66219fc45f0cb645f3db30e275e592bf))





# [2.0.0-beta.18](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.17...v2.0.0-beta.18) (2021-06-12)


### Bug Fixes

* **plugin-search:** disable default form action on Enter key ([#189](https://github.com/vuepress/vuepress-next/issues/189)) ([81b5b24](https://github.com/vuepress/vuepress-next/commit/81b5b24379c44ddcf83b38b086f6f2905453f58b))
* **plugin-toc:** exclude h1 header in toc ([5e96641](https://github.com/vuepress/vuepress-next/commit/5e96641b8d2dd947372222e0af2ea47729afbada))
* **theme-default:** exclude h1 header in sidebar ([280626d](https://github.com/vuepress/vuepress-next/commit/280626dd33f5006d6611f6e121eb5edfad8a258e))
* **theme-default:** show outline of toggle-dark-button ([bc94de0](https://github.com/vuepress/vuepress-next/commit/bc94de0cb3a9454ac0a3e72f3df07326568057d2))


### Code Refactoring

* **core:** drop support for plugin nesting ([f7da97f](https://github.com/vuepress/vuepress-next/commit/f7da97f7f0ff24984cc6a2d0926b5fdf3af274c5))
* **core:** resolve page title from markdown env ([09d08a4](https://github.com/vuepress/vuepress-next/commit/09d08a4b89af16fcb833774e902b4d5404181689))


### Features

* **cli:** watch dependencies of user config file ([b220524](https://github.com/vuepress/vuepress-next/commit/b220524f1534a1ada3b896854dba181e8ea36221))
* **markdown:** add extract-title plugin ([e0a1556](https://github.com/vuepress/vuepress-next/commit/e0a1556a1469cd71469f5c81e2d058a5e9b9d801))


### Performance Improvements

* **bundler-vite:** make server build lighter ([a6ddea5](https://github.com/vuepress/vuepress-next/commit/a6ddea5fd1a1979f5d3a7cc460e1602cb5254f08))


### BREAKING CHANGES

* **core:** a plugin cannot use other plugins anymore
* **core:** markdown emoji syntax is not supported in frontmatter title





# [2.0.0-beta.17](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.16...v2.0.0-beta.17) (2021-06-04)


### Bug Fixes

* **theme-default:** avoid long inline code breaking the layout ([#180](https://github.com/vuepress/vuepress-next/issues/180)) ([ada2e2a](https://github.com/vuepress/vuepress-next/commit/ada2e2a884749d9654c3550c4bb92611ea29906c))
* **theme-default:** fix error of sidebar resolving (close [#185](https://github.com/vuepress/vuepress-next/issues/185)) ([6a96af0](https://github.com/vuepress/vuepress-next/commit/6a96af0b480b04a3c2564739e87a0ae786756581))
* **theme-default:** respect root-level custom container config (close [#175](https://github.com/vuepress/vuepress-next/issues/175)) ([f2ad5f0](https://github.com/vuepress/vuepress-next/commit/f2ad5f0e988b075cfa37726d67feb8fa54f6176b))


### Features

* **core:** support multi-level theme inheritance ([5df8662](https://github.com/vuepress/vuepress-next/commit/5df86621cfcd7b138e473d40dc622e6ff8e0795f))
* **theme-default:** improve a11y of CodeGroup ([#163](https://github.com/vuepress/vuepress-next/issues/163)) ([2b76463](https://github.com/vuepress/vuepress-next/commit/2b7646399116114a967a5df64266c6879babb10f))


### BREAKING CHANGES

* **theme-default:** default title of danger container is changed to "DANGER"





# [2.0.0-beta.16](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.15...v2.0.0-beta.16) (2021-05-28)


### Bug Fixes

* **plugin-pwa-popup:** increase default z-index ([67242e8](https://github.com/vuepress/vuepress-next/commit/67242e896f52c09c1e42566a32ae10291d0fb648))
* **theme-default:** increase medium-zoom delay ([9c92443](https://github.com/vuepress/vuepress-next/commit/9c9244385f4fe6f65115cab6ba08f47dffc1580a))


### Features

* **bundler-vite:** configure postcss by default ([6197578](https://github.com/vuepress/vuepress-next/commit/61975781151ace783f3021bd6a3c55c4fa7b12bd))
* **plugin-back-to-top:** add z-index variable ([3d7d4a4](https://github.com/vuepress/vuepress-next/commit/3d7d4a4ba173dab4c3ad80abea5ac96cc1eb0bde))
* **plugin-medium-zoom:** add more css variables (close [#174](https://github.com/vuepress/vuepress-next/issues/174)) ([d717800](https://github.com/vuepress/vuepress-next/commit/d71780094839db02424b60f3a2877871e34eaf64))
* **plugin-nprogress:** add z-index variable ([151e087](https://github.com/vuepress/vuepress-next/commit/151e087c289a387d7ff77654059de9d71910263a))
* **plugin-pwa-popup:** add more css variables ([3ae6f72](https://github.com/vuepress/vuepress-next/commit/3ae6f72a1fb981ff132325637d5996c5c07b52f2))





# [2.0.0-beta.15](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.14...v2.0.0-beta.15) (2021-05-27)


### Bug Fixes

* **markdown:** decode assets link to ensure bundler can find the file ([#144](https://github.com/vuepress/vuepress-next/issues/144)) ([d3e5409](https://github.com/vuepress/vuepress-next/commit/d3e5409246a47edae93209c9ce5dd2614e14c936))
* **theme-default:** handle rotate events on iPad ([#150](https://github.com/vuepress/vuepress-next/issues/150)) ([bbdda60](https://github.com/vuepress/vuepress-next/commit/bbdda60bba0a56590535f3e762dec55767ec031c))
* **theme-default:** show header anchors when being focused ([#164](https://github.com/vuepress/vuepress-next/issues/164)) ([8de5f0f](https://github.com/vuepress/vuepress-next/commit/8de5f0fa2873f64be0622aced46e1512c7f4fac5))


### Features

* **bundler-webpack:** bump webpack-dev-server to 4.0.0-beta.3 ([2e86826](https://github.com/vuepress/vuepress-next/commit/2e8682680eba7736bcf3325014a927a87503ba0b))
* **cli:** allow setting default app config ([41f9dc6](https://github.com/vuepress/vuepress-next/commit/41f9dc612d65a7aae777a75ee00715f0b7bab7c6))
* **plugin-search:** add --search-bg-color variable ([6c778a8](https://github.com/vuepress/vuepress-next/commit/6c778a83b5d26529c830057aadc9c6fde8dc1805))
* **plugin-search:** improve a11y support ([#165](https://github.com/vuepress/vuepress-next/issues/165)) ([205aafe](https://github.com/vuepress/vuepress-next/commit/205aafe4e6600987e06730b926abe2be3e4d5d73))
* **theme-default:** support dark mode (close [#29](https://github.com/vuepress/vuepress-next/issues/29)) ([680e429](https://github.com/vuepress/vuepress-next/commit/680e4298a80ddb06b0381af48644124ffb0b0c4c))
* **theme-default:** support full link for github repo ([#152](https://github.com/vuepress/vuepress-next/issues/152)) ([8a5055b](https://github.com/vuepress/vuepress-next/commit/8a5055b57d2068e73b4a1c52601c94bdbbc1a7c5))
* **theme-default:** support Gitee repo ([5cad664](https://github.com/vuepress/vuepress-next/commit/5cad664bd7224a08e679dc06f61f17af6c790b97))


### BREAKING CHANGES

* **theme-default:** most sass variables are migrated to css variables





# [2.0.0-beta.14](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.13...v2.0.0-beta.14) (2021-05-12)


### Bug Fixes

* **bundler-vite:** compat with vite 2.3 changes (close [#134](https://github.com/vuepress/vuepress-next/issues/134)) ([1370984](https://github.com/vuepress/vuepress-next/commit/13709840080d17c6c239af53a212258d9157ffae))
* **core:** avoid mutating theme layouts array ([fe27a57](https://github.com/vuepress/vuepress-next/commit/fe27a57c57bd92623ef4c3df6ce4282b8eda6f71))


### Features

* **core:** allow alias and define hook to return a promise ([3b3d289](https://github.com/vuepress/vuepress-next/commit/3b3d2893c58115de65606ffc508fdc7a9cf96f79))





# [2.0.0-beta.13](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.12...v2.0.0-beta.13) (2021-05-06)


### Bug Fixes

* **bundler-vite:** make site base work in vite dev (close [#126](https://github.com/vuepress/vuepress-next/issues/126)) ([d257e01](https://github.com/vuepress/vuepress-next/commit/d257e01b69a8b4d0032b75be233b1c381289b529))
* **core:** path of page options should have the highest priority ([0fc6fd3](https://github.com/vuepress/vuepress-next/commit/0fc6fd38225816b6bfc59fb12de837634c7ffb5d))
* **markdown:** ensure ending newline in import code ([160df2d](https://github.com/vuepress/vuepress-next/commit/160df2de1567a3b6b3e889b86e6bd7b95a3cc77b))


### Features

* **markdown:** allow omitting start or end of import code lines range ([21bba5c](https://github.com/vuepress/vuepress-next/commit/21bba5c86bc8e8dec1c86f820e9de27cf15919b2))





# [2.0.0-beta.12](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.11...v2.0.0-beta.12) (2021-04-30)


### Bug Fixes

* **core:** avoid uri encoded filename ([4ff7f3b](https://github.com/vuepress/vuepress-next/commit/4ff7f3b287936cce0f9cfe5c8689c2efbb2b52aa))
* **theme-default:** align the font of line numbers with code blocks (close [#124](https://github.com/vuepress/vuepress-next/issues/124)) ([#125](https://github.com/vuepress/vuepress-next/issues/125)) ([a3ea87d](https://github.com/vuepress/vuepress-next/commit/a3ea87d507a644dc31bf9ffbb5703eb99342cc60))


### Features

* **core:** add deps to page object ([83c9aae](https://github.com/vuepress/vuepress-next/commit/83c9aaedcaf531d72d70ad514b9dd8ddf2e508d1))
* **core:** make filePath available in markdown env ([aa52549](https://github.com/vuepress/vuepress-next/commit/aa52549648b175626d3eafabe8629a78a8caf8e5))
* **markdown:** support import code blocks (close [#15](https://github.com/vuepress/vuepress-next/issues/15)) ([fe20ccc](https://github.com/vuepress/vuepress-next/commit/fe20cccf3d44565c7fcb890e8ebf2aa4659ab3e1))


### Performance Improvements

* **core:** reduce page data and component file size ([4c6eea5](https://github.com/vuepress/vuepress-next/commit/4c6eea5188e804cb3f6c7648d6528d43002618ae))
* **core:** reduce routes file size ([d926a17](https://github.com/vuepress/vuepress-next/commit/d926a170ee5f384845f5b166029fbc392f51dcde))


### BREAKING CHANGES

* **core:** `pagePath` prop of `<Content>` renamed to `pageKey`





# [2.0.0-beta.11](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.10...v2.0.0-beta.11) (2021-04-28)


### Bug Fixes

* **bundler-vite:** make the timestamp of client entry consistent ([4bbff4c](https://github.com/vuepress/vuepress-next/commit/4bbff4c22f67c456a0f4dcfe3ddf5724902a4d2a))


### Performance Improvements

* do not register hooks in dev mode for prod-only plugins ([d5af139](https://github.com/vuepress/vuepress-next/commit/d5af1398f059c075783c0c58456cef7b41bcaaf9))
* specify optimizeDeps for vite dev ([0d77331](https://github.com/vuepress/vuepress-next/commit/0d773312181380114cba16f61b633a5266dd1cf3))
* **core:** merge page routes to reduce requests in vite dev ([fa2a614](https://github.com/vuepress/vuepress-next/commit/fa2a61413c70afd426f74e57e6e5d2a4900c6568))





# [2.0.0-beta.10](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.9...v2.0.0-beta.10) (2021-04-27)


### Bug Fixes

* **bundler-vite:** avoid client code to be optimized or externalized ([f8a088d](https://github.com/vuepress/vuepress-next/commit/f8a088db5f428087a58dec4823627a9e3b447a75))
* **bundler-vite:** disable clearScreen in dev by default ([e7bfe49](https://github.com/vuepress/vuepress-next/commit/e7bfe49d10aa8d3c5121120435ed5076fbe80a27))
* **cli:** do not clean cache and temp on restart ([047a52c](https://github.com/vuepress/vuepress-next/commit/047a52c265db355de3aaa298c14150779e9182f4))
* **client:** implement ClientOnly correctly ([e27872d](https://github.com/vuepress/vuepress-next/commit/e27872d89f1e6894ebc734e2e26c800bea82e162))
* **client:** make hydration work properly (close [#123](https://github.com/vuepress/vuepress-next/issues/123)) ([34a5364](https://github.com/vuepress/vuepress-next/commit/34a5364ad6005e64a3e726296b9b8b73318fcbd4))
* **core:** allow extendsMarkdown to return a promise ([a4be2fd](https://github.com/vuepress/vuepress-next/commit/a4be2fda5952f64da2db6ba837b94bfb4e1315ce))


### Features

* **bundler-vite:** bump vite to 2.2.1 to support cacheDir ([d7f685b](https://github.com/vuepress/vuepress-next/commit/d7f685b5d729d9f8c9f858673355a37cb22fc90e))
* **client:** support custom layout ([c32866d](https://github.com/vuepress/vuepress-next/commit/c32866d769cb5a29fb811fd2f00e06d7b94e1508))
* **markdown:** support externalIcon in config and frontmatter ([#122](https://github.com/vuepress/vuepress-next/issues/122)) ([d1389bc](https://github.com/vuepress/vuepress-next/commit/d1389bc6c0eee3ad2fe83d5636fd293d0710e0fb))
* **plugin-search:** add search plugin (close [#35](https://github.com/vuepress/vuepress-next/issues/35)) ([70bb066](https://github.com/vuepress/vuepress-next/commit/70bb0668c53b984f17bdbf7b95ac8e3258034e73))
* **theme-default:** compat with docsearch and search plugin ([cb00182](https://github.com/vuepress/vuepress-next/commit/cb0018257c2c6b4b21e2add5f73e7213b537fb6f))
* **theme-default:** support pageClass frontmatter (close [#118](https://github.com/vuepress/vuepress-next/issues/118)) ([809d575](https://github.com/vuepress/vuepress-next/commit/809d5750c36662e894be566c0ff53c2f2a700da0))
* **theme-default:** support sidebarDepth ([b79ba90](https://github.com/vuepress/vuepress-next/commit/b79ba90f8e4cb93d76dac1f284131cf618aee784))





# [2.0.0-beta.9](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.8...v2.0.0-beta.9) (2021-04-21)


### Bug Fixes

* **core:** allow plugin itself as an item of plugin config array ([1fa8903](https://github.com/vuepress/vuepress-next/commit/1fa8903549d8f9eba3fc49e3117ee2018993b496))
* **core:** ensure trailing slash of page path (close [#114](https://github.com/vuepress/vuepress-next/issues/114)) ([cbcf166](https://github.com/vuepress/vuepress-next/commit/cbcf16624602e37c17935211ac4076c72db22507))
* **markdown:** do not escape extracted headers (close [#117](https://github.com/vuepress/vuepress-next/issues/117)) ([81b1336](https://github.com/vuepress/vuepress-next/commit/81b133622a00e6474f0bfe4a58e35bfab9fe3e49))
* **plugin-back-to-top:** fix back-to-top styles ([933643a](https://github.com/vuepress/vuepress-next/commit/933643aa9c24458eb914429b21f5ec22f6b23f9a))
* **theme-default:** remove font-smothing in code block ([41c281e](https://github.com/vuepress/vuepress-next/commit/41c281e016c77dc5f1d9d12e8917814e48af1424))


### Code Refactoring

* **core:** move evergreen option to bundler-webpack ([58c30c1](https://github.com/vuepress/vuepress-next/commit/58c30c1207f0f6e09e9d68096786ef189c67e9db))


### Features

* **client:** provide client types file ([89a32b5](https://github.com/vuepress/vuepress-next/commit/89a32b50767ef82556f5ae3300ec016e0acaf0e5))
* **core:** make frontmatter available in markdown env ([f977192](https://github.com/vuepress/vuepress-next/commit/f97719237db9d14c94716bf6b18fe52519a008cf))
* **plugin-palette:** add watchers for palette and style files ([0cf1b9b](https://github.com/vuepress/vuepress-next/commit/0cf1b9b346de2bc62789a940699298ee9e2873db))
* **plugin-register-components:** add register components plugin (close [#112](https://github.com/vuepress/vuepress-next/issues/112)) ([6af204d](https://github.com/vuepress/vuepress-next/commit/6af204df76b8f6969aef0fc061a64a796deb24ab))
* **theme-default:** add more palette variables for code styles ([db8e0f4](https://github.com/vuepress/vuepress-next/commit/db8e0f4870b051184a4d4b3c5b17497e302b0b11))


### BREAKING CHANGES

* **core:** `evergreen` option is moved to `bundlerConfig.evergreen` for bundler-webpack





# [2.0.0-beta.8](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.7...v2.0.0-beta.8) (2021-04-11)


### Bug Fixes

* **plugin-docsearch:** provide default value for locales (close [#107](https://github.com/vuepress/vuepress-next/issues/107)) ([491eb64](https://github.com/vuepress/vuepress-next/commit/491eb6416664775c366c0fb2a67388fe37098e2c))
* **plugin-pwa-popup:** provide default value for locales ([f7cbc15](https://github.com/vuepress/vuepress-next/commit/f7cbc15669c731e6598657c8048abe9cdfa4ee40))


### Code Refactoring

* normalize themes and plugins structure ([7781172](https://github.com/vuepress/vuepress-next/commit/77811722401bf1ed1fec44c64158ab0cd1ab3179))
* **core:** resolve theme when creating app ([fa683cb](https://github.com/vuepress/vuepress-next/commit/fa683cb76e8a3bcacc08d1dfd8bea6af79fee1d2))


### Features

* **markdown:** support internalTag option in links plugin ([1872ad9](https://github.com/vuepress/vuepress-next/commit/1872ad95d7c86247883c24f2ec86db07d7596923))
* **utils:** add logger.createError method ([0c198d7](https://github.com/vuepress/vuepress-next/commit/0c198d7f9e122828b37a2db670048cfc2ce20e81))


### BREAKING CHANGES

* client API that provided by plugins should be imported from `plugin-foo/lib/client`
* **core:** theme plugins could be overridden by user plugins now





# [2.0.0-beta.7](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.6...v2.0.0-beta.7) (2021-04-09)


### Bug Fixes

* **bundler-webpack:** always extract css file in build mode ([accc484](https://github.com/vuepress/vuepress-next/commit/accc484f95485a6013aad573f562565c16ac5ff8))
* **client:** install vue-router after clientAppEnhance (close [#100](https://github.com/vuepress/vuepress-next/issues/100)) ([2f5450f](https://github.com/vuepress/vuepress-next/commit/2f5450f0b8dcc4aa49b1c19a1adea6e84a1594c4))
* **client:** make page data hmr work as expected ([374ae43](https://github.com/vuepress/vuepress-next/commit/374ae43545c982ecc8762776035cc92359b874f5))
* **theme-default:** allow direct img children to be zoomable (close [#84](https://github.com/vuepress/vuepress-next/issues/84)) ([832bd6f](https://github.com/vuepress/vuepress-next/commit/832bd6fbbd9612e2209a28ed89a49bf9eb658838))


### Features

* **bundler-webpack:** bump webpack-dev-server to 4.0.0-beta.2 ([dd8c408](https://github.com/vuepress/vuepress-next/commit/dd8c40875cca382450d2758b2c7609bb69332d19))
* **core:** show warning when duplicate plugins are detected ([742f581](https://github.com/vuepress/vuepress-next/commit/742f5811032b3a2f0687edf3f966d25517734a8d))
* **plugin-toc:** add toc plugin ([0ea1720](https://github.com/vuepress/vuepress-next/commit/0ea1720ae3ed2007f0232123bfd7de77af6ae383))





# [2.0.0-beta.6](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.5...v2.0.0-beta.6) (2021-03-26)


### Reverts

* refactor(client): remove extra handling for router base ([6205279](https://github.com/vuepress/vuepress-next/commit/620527917e4d3ee7cfa4c1db7d3cadc36a30eaab))





# [2.0.0-beta.5](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2021-03-26)


### Bug Fixes

* **client:** ensure page component is loaded before route resolve ([598adf3](https://github.com/vuepress/vuepress-next/commit/598adf38b1f9edd3034bb011358a1a9d3bcb6b9e))
* **markdown:** avoid wrapping highlighted code with multiple pre ([f0b3872](https://github.com/vuepress/vuepress-next/commit/f0b38722f1a06c736366a36d7c4888952d28c947))
* **plugin-prismjs:** avoid loading languages multiple times ([4af5005](https://github.com/vuepress/vuepress-next/commit/4af50053c03408fc9e2e5426df89ae340de0e824))
* **theme-default:** add active class to sidebar group heading ([8dcb945](https://github.com/vuepress/vuepress-next/commit/8dcb9457c532de8076f94b3b165c1347e9bd9c86))
* **theme-default:** allow NavLink in sidebar children ([ea50010](https://github.com/vuepress/vuepress-next/commit/ea5001076b86a7dc8b807811796a8ed44fbcf7b9))
* **theme-default:** make navlink active in subpath (close [#70](https://github.com/vuepress/vuepress-next/issues/70)) ([4c865b1](https://github.com/vuepress/vuepress-next/commit/4c865b16430d0e72b0ac1103f9579a93f248bf9c))
* **theme-default:** make nested sidebar groups work ([4ada701](https://github.com/vuepress/vuepress-next/commit/4ada701062db400787c41008942354f6947bf80b))
* **theme-default:** make scrollBehavior work with transition (close [#77](https://github.com/vuepress/vuepress-next/issues/77)) ([4b8d0cf](https://github.com/vuepress/vuepress-next/commit/4b8d0cff2d7fa3d74d69d551976a3b12263e6124))


### Features

* **plugin-shiki:** add shiki plugin ([66bbcbd](https://github.com/vuepress/vuepress-next/commit/66bbcbde497cca525fc585b4046b11784e8d61bc))


### Performance Improvements

* improve HMR support ([38f0073](https://github.com/vuepress/vuepress-next/commit/38f007335864db4c9125ea5905ca91850fb7103b))





# [2.0.0-beta.4](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2021-03-20)


### Bug Fixes

* **bundler-vite:** disable auto resolving vite config file ([57967f7](https://github.com/vuepress/vuepress-next/commit/57967f7dec27c4148edf920decead327cc8746bf))


### Code Refactoring

* **markdown:** remove default syntax highlighter ([4a1abe3](https://github.com/vuepress/vuepress-next/commit/4a1abe39335eaaf3ef1dca3e35a324b12981c0d2))


### Features

* **plugin-prismjs:** add prismjs plugin ([638ad8a](https://github.com/vuepress/vuepress-next/commit/638ad8afdf9f3fe779e9eb1d02dca6c1caef0307))
* **theme-default:** use prismjs plugin ([f131de4](https://github.com/vuepress/vuepress-next/commit/f131de4783685dbabfde4e4966182d570224a246))


### BREAKING CHANGES

* **markdown:** prismjs is no longer the default syntax highlighter





# [2.0.0-beta.3](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2021-03-17)


### Bug Fixes

* **bundler-vite:** fix fs path on windows (close [#74](https://github.com/vuepress/vuepress-next/issues/74)) ([db3c3e8](https://github.com/vuepress/vuepress-next/commit/db3c3e8639d040aa8b408006d48b160a0b234e12))


### Features

* **cli:** show info of vite related packages ([73a66df](https://github.com/vuepress/vuepress-next/commit/73a66df2c19b4b292e5f7b48cb967490a0a5dd69))





# [2.0.0-beta.2](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2021-03-14)


### Bug Fixes

* **bundler-vite:** avoid optimizing client package ([5708934](https://github.com/vuepress/vuepress-next/commit/57089344f87bf381f8e6f2711eb6df9364c72432))
* **bundler-vite:** workaround for [vitejs/vite#2503](https://github.com/vitejs/vite/issues/2503) ([055b280](https://github.com/vuepress/vuepress-next/commit/055b280a8488c42614702533cc9eb8fb2852c71b))
* **plugin-nprogress:** always optimize nprogress with vite ([2aeb2bf](https://github.com/vuepress/vuepress-next/commit/2aeb2bf9b70b149bf2e56d2fd1b593e6628d72dd))





# [2.0.0-beta.1](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.0...v2.0.0-beta.1) (2021-03-13)

**Note:** Version bump only for package vuepress-next





# [2.0.0-beta.0](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.26...v2.0.0-beta.0) (2021-03-13)


### Bug Fixes

* **plugin-google-analytics:** fix types ([92aa486](https://github.com/vuepress/vuepress-next/commit/92aa48629d0355808a15942594e499d39bb3f1e7))


### Features

* **vuepress-vite:** add vuepress-vite package ([03a6583](https://github.com/vuepress/vuepress-next/commit/03a658364d8c5f0b2510e10cd2bf8ec8bcbf41cb))
* implement vite hmr ([525c18d](https://github.com/vuepress/vuepress-next/commit/525c18d5a64fbdbdeb5ce1348ec1e1ead3dbd8f9))
* **bundler-vite:** add vite support :zap: ([7d612c4](https://github.com/vuepress/vuepress-next/commit/7d612c45d83d42b246316f93cc3385a9968307af))
* **cli:** add defineUserConfig util ([c20f7b7](https://github.com/vuepress/vuepress-next/commit/c20f7b7be5d04cb247d699c31bf6f68071180df6))
* **client:** add defineClientAppEnhance and defineClientAppSetup utils ([1520517](https://github.com/vuepress/vuepress-next/commit/15205172c3b56fc8a879bba040f4ecc815d2c924))
* **theme-default:** use sass as css pre-processor ([7eb1fd8](https://github.com/vuepress/vuepress-next/commit/7eb1fd8b8901d3f2c2335ad550b7d601a9354826))


### BREAKING CHANGES

* **theme-default:** the palette system of default theme is migrated to sass





# [2.0.0-alpha.26](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.25...v2.0.0-alpha.26) (2021-02-24)


### Bug Fixes

* **cli:** add theme-data plugin and rename palette plugin ([97ce42b](https://github.com/vuepress/vuepress-next/commit/97ce42bddbfcef5e66476c2355e031e54d9176ea))


### Features

* **bundler-webpack:** enable options API by default ([e29b6e1](https://github.com/vuepress/vuepress-next/commit/e29b6e1bb1ba89b7d440e54dafe3a84ecf4273db))
* **plugin-palette:** add palette plugin ([556a23c](https://github.com/vuepress/vuepress-next/commit/556a23cc9076f972deb3d5c0905441b63b700682))


### BREAKING CHANGES

* **plugin-palette:** migrate `@vuepress/plugin-palette-stylus` to `@vuepress/plugin-palette`





# [2.0.0-alpha.25](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.24...v2.0.0-alpha.25) (2021-02-20)


### Bug Fixes

* **markdown:** do not treat autolink as a component (close [#60](https://github.com/vuepress/vuepress-next/issues/60)) ([9f6cffa](https://github.com/vuepress/vuepress-next/commit/9f6cffa1e0c39d0caf9f7ab34c5f06f36a87948b))


### Code Refactoring

* **core:** remove theme data from site data ([187aef3](https://github.com/vuepress/vuepress-next/commit/187aef36607efc62d7b2d5c773553f89685cf64c))


### Features

* **plugin-theme-data:** extract theme data injection to a plugin ([e971e39](https://github.com/vuepress/vuepress-next/commit/e971e3964cf11361ac267501768b0f8bc7dba909))


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


### Bug Fixes

* **markdown:** remove site base from internal links (close [#58](https://github.com/vuepress/vuepress-next/issues/58)) ([a8c7fdd](https://github.com/vuepress/vuepress-next/commit/a8c7fdd86a9c4f08c51673f3dba0451455a731d2))





# [2.0.0-alpha.22](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.21...v2.0.0-alpha.22) (2021-02-10)


### Bug Fixes

* **client:** only watch route path to update head ([3174f5a](https://github.com/vuepress/vuepress-next/commit/3174f5a676d95943df256b2be31227eb844d0144))
* **plugin-debug:** avoid enabling in production mode (close [#53](https://github.com/vuepress/vuepress-next/issues/53)) ([9612282](https://github.com/vuepress/vuepress-next/commit/961228234e3983f1f84f992a1317316d09f8cb98))





# [2.0.0-alpha.21](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.20...v2.0.0-alpha.21) (2021-02-05)


### Features

* **plugin-git:** collect page created time (close [#45](https://github.com/vuepress/vuepress-next/issues/45)) ([4045a8c](https://github.com/vuepress/vuepress-next/commit/4045a8c1ab591dbbb0303aa43c6d13bf248d995c))


* **plugin-google-analytics:** migrate to google analytics 4 (close [#36](https://github.com/vuepress/vuepress-next/issues/36)) ([d2393f7](https://github.com/vuepress/vuepress-next/commit/d2393f7970c346bfcef2e72658f9a4a89a93b396))


### BREAKING CHANGES

* migrate to google analytics 4 and drop v3 support





# [2.0.0-alpha.20](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.19...v2.0.0-alpha.20) (2021-02-04)


### Bug Fixes

* **plugin-medium-zoom:** always refresh medium-zoom with delay ([2495f5d](https://github.com/vuepress/vuepress-next/commit/2495f5d30fa75b50c203919abf2d8dab7dfda2d9))
* **theme-default:** fix max width of navbar links wrapper ([846e60c](https://github.com/vuepress/vuepress-next/commit/846e60ca9f0137f54a96df7589df4ea4cd99f18a))
* **theme-default:** remove extra rem in styles (close [#50](https://github.com/vuepress/vuepress-next/issues/50)) ([9b1b852](https://github.com/vuepress/vuepress-next/commit/9b1b852a9c11c28b43253f87b40362693ad2cb95))


### Features

* **core:** create siteData in vuepress app ([05b87dd](https://github.com/vuepress/vuepress-next/commit/05b87ddf32f32c94cc131e0074365aeba70f85f2))
* **core:** make language available in page data ([03bb09f](https://github.com/vuepress/vuepress-next/commit/03bb09fd51aeaff56d26820a1401b87ea8bdeb38))





# [2.0.0-alpha.19](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.18...v2.0.0-alpha.19) (2021-01-24)


### Bug Fixes

* **cli:** add esbuild external ([8d285ea](https://github.com/vuepress/vuepress-next/commit/8d285ea88946683d96d46a379d4215963338dff4))


### Features

* **core:** add onWatched hook ([9725a10](https://github.com/vuepress/vuepress-next/commit/9725a101599363094a85916317109b67d365dff4))
* **plugin-docsearch:** allow more fields in locales config ([ce1cf18](https://github.com/vuepress/vuepress-next/commit/ce1cf18248129f44651b33091329c4366320131b))





# [2.0.0-alpha.18](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.17...v2.0.0-alpha.18) (2021-01-17)


### Bug Fixes

* **client:** load existing head tags on mounted ([15722c5](https://github.com/vuepress/vuepress-next/commit/15722c5175e44a8d6363bfe5f138f2c2c8edeec3))
* **markdown:** load some languages by default to partially avoid prism issue ([48c085a](https://github.com/vuepress/vuepress-next/commit/48c085af6a8751211fe7180a82bb67ff5a7b191f))
* **theme-default:** fix homepage frontmatter type ([9cf2d28](https://github.com/vuepress/vuepress-next/commit/9cf2d288e115d335f6ff9f1a849a2ce82db799c9))
* **theme-default:** fix sidebar config override ([2c2c280](https://github.com/vuepress/vuepress-next/commit/2c2c2801be716dfb102345090888fd1e22a0ac92))
* **theme-default:** make sr-only tags unselectable ([0f6488e](https://github.com/vuepress/vuepress-next/commit/0f6488e3a00674c0670737c8831763db0a0ffa93))


### Features

* **client:** make usePageFrontmatter generic ([2c5e5c1](https://github.com/vuepress/vuepress-next/commit/2c5e5c1400469a3cb4da2856104514a9413bff8a))
* **shared:** optimize frontmatter type and support generics ([8a7025f](https://github.com/vuepress/vuepress-next/commit/8a7025ff39b4656f98f9a35e93848373ce72ddbe))
* **theme-default:** add code-group custom container ([d0a20aa](https://github.com/vuepress/vuepress-next/commit/d0a20aaacefc78708a4181c53704b28c60b520b4))
* **theme-default:** add page transition ([845cc2c](https://github.com/vuepress/vuepress-next/commit/845cc2cb64223b856261bfc7b384dec6557456c4))
* **theme-default:** allow html in homepage footer ([87e0821](https://github.com/vuepress/vuepress-next/commit/87e0821cee66c34141c1c3a62e8f5ecb6b21a957))
* **theme-default:** optimize scrollbar style of sidebar ([27abb26](https://github.com/vuepress/vuepress-next/commit/27abb26509fa737ea27c3036bbe834d544e60298))
* **theme-default:** support multiple action buttons in homepage (close [#23](https://github.com/vuepress/vuepress-next/issues/23)) ([bb44710](https://github.com/vuepress/vuepress-next/commit/bb44710624d2dbb65bd5f3da2eafabdec73ecadf))





# [2.0.0-alpha.17](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.16...v2.0.0-alpha.17) (2021-01-13)


### Bug Fixes

* **bundler-webpack:** add trailing slash to url ([cbe4c7f](https://github.com/vuepress/vuepress-next/commit/cbe4c7f3924c11b751dfefbb01f8fc0528516b3b))


### Features

* **cli:** add --clean-temp option ([752d725](https://github.com/vuepress/vuepress-next/commit/752d72563d88d5441a5570af3bc1b4c571e268c2))
* **theme-default:** allow dropdown subtitle as a link ([5fb6558](https://github.com/vuepress/vuepress-next/commit/5fb6558c926ddbb569f2b1901903cf9be4ad426e))





# [2.0.0-alpha.16](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.15...v2.0.0-alpha.16) (2021-01-11)


### Bug Fixes

* **core:** support special characters in filename and permalink ([c3e68ef](https://github.com/vuepress/vuepress-next/commit/c3e68ef6a4aa3f6722d5bc4079bafe5d3b176e5e))
* **markdown:** fix assets relative path handling (close [#33](https://github.com/vuepress/vuepress-next/issues/33)) ([9a95431](https://github.com/vuepress/vuepress-next/commit/9a95431aa3994855f7194d3efe810b4fd2cf72d9))


### Features

* **cli:** show info of vue packages ([2d19e84](https://github.com/vuepress/vuepress-next/commit/2d19e84c1ac24e1a127d330009617c42eb7a2bc3))





# [2.0.0-alpha.15](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.14...v2.0.0-alpha.15) (2021-01-04)


### Bug Fixes

* **core:** fix site locale data type ([7898500](https://github.com/vuepress/vuepress-next/commit/7898500f8b611662777ca3bdeb89c5b3bb658595))
* **theme-default:** click to close dropdown that opened by tab and click ([88d1ae2](https://github.com/vuepress/vuepress-next/commit/88d1ae2bf6a92113ece8efa7ed57352b34ad18c4))
* **theme-default:** fix font-size of dropdown group title ([563156c](https://github.com/vuepress/vuepress-next/commit/563156cb8458aeb71fadd882b08e03bee8ae5fba))


### Features

* **core:** provide app in all plugin hooks ([21cc3a6](https://github.com/vuepress/vuepress-next/commit/21cc3a608e54d38de8de8f453b5e88031b4cedb1))


### Reverts

* fix(theme-default): remove outline when focused on dropdown button ([66d3feb](https://github.com/vuepress/vuepress-next/commit/66d3feba01bf8a3ce751788a9a025dd69757efb4))





# [2.0.0-alpha.14](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.13...v2.0.0-alpha.14) (2021-01-03)


### Bug Fixes

* **bundler-webpack:** remove esbuild minimizer ([4b3c00b](https://github.com/vuepress/vuepress-next/commit/4b3c00becad376fed98bfaef700e565c19724a0b))
* **core:** fix page date resolving ([de6c5c8](https://github.com/vuepress/vuepress-next/commit/de6c5c8ca89347bea4ba2925e283a7b710a5b5d3))
* **plugin-docsearch:** fix docsearch style issue ([7550587](https://github.com/vuepress/vuepress-next/commit/7550587dbdf876b834dc14aa83847fabf1dba668))
* **theme-default:** assign default locale data ([d59f55d](https://github.com/vuepress/vuepress-next/commit/d59f55d355299a8edbdb43986cc7aaff5345ea1f))
* **theme-default:** fix overflow style of code block line-numbers ([dd77cf4](https://github.com/vuepress/vuepress-next/commit/dd77cf448a28423ee23930b3d76601d8a5a6da18))
* **theme-default:** remove outline when focused on dropdown button ([77842e3](https://github.com/vuepress/vuepress-next/commit/77842e396f1ebcc9e874af537a6520b818d028c2))
* **theme-default:** set font-size explicitly for h4 to h6 ([a6459c0](https://github.com/vuepress/vuepress-next/commit/a6459c0eca38fbc19545442581ea6f0e73908b30))
* **vuepress:** add a wrapper for cli bin (close [#21](https://github.com/vuepress/vuepress-next/issues/21)) ([2708ac3](https://github.com/vuepress/vuepress-next/commit/2708ac325c05a39cc5139e7e5f902e2fead5ca7a))





# [2.0.0-alpha.13](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.12...v2.0.0-alpha.13) (2020-12-23)


### Bug Fixes

* **markdown:** only prepend prefix to explicit relative image path ([8d6a095](https://github.com/vuepress/vuepress-next/commit/8d6a095ace0ed724b4ac4eea0e44a28f120a48bc))
* **plugin-git:** replace -P with --no-pager for better compatibility (close [#16](https://github.com/vuepress/vuepress-next/issues/16)) ([f394c78](https://github.com/vuepress/vuepress-next/commit/f394c78a06a3dae7cea91759db6010d04746f999))


### Features

* **cli:** respect conventional clientAppEnhance files (close [#20](https://github.com/vuepress/vuepress-next/issues/20)) ([0777376](https://github.com/vuepress/vuepress-next/commit/0777376bcb5cafec50f47877a6bf3926d6ff0076))





# [2.0.0-alpha.12](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.11...v2.0.0-alpha.12) (2020-12-19)


### Bug Fixes

* **markdown:** support v-on shorthand in html inline tags ([86a1299](https://github.com/vuepress/vuepress-next/commit/86a1299d16555fb453f36aa1db49ff9ce184e874))
* **theme-default:** fix navbar type to allow nested group ([9ef46ae](https://github.com/vuepress/vuepress-next/commit/9ef46ae3d41dc56c536d884665d28f71a7883a59))


### Features

* **markdown:** code-block-level config for line-numbers and v-pre ([9ac3e4a](https://github.com/vuepress/vuepress-next/commit/9ac3e4a12066f8b05e5d3a5211adf837a944c29d))





# [2.0.0-alpha.11](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.10...v2.0.0-alpha.11) (2020-12-17)


### Bug Fixes

* **bundler-webpack:** freeze webpack version ([95523a2](https://github.com/vuepress/vuepress-next/commit/95523a2f2b32f8dad773c74553bd22a0940cd27a))





# [2.0.0-alpha.10](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.9...v2.0.0-alpha.10) (2020-12-17)


### Bug Fixes

* **theme-default:** fix content headers styles ([7ead1f6](https://github.com/vuepress/vuepress-next/commit/7ead1f60db5135ed7d1a428cb23fecbbc11b223e))


### Features

* **cli:** add info command ([1f30993](https://github.com/vuepress/vuepress-next/commit/1f30993a920189c0de89e413d85feb957546e47f))





# [2.0.0-alpha.9](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.8...v2.0.0-alpha.9) (2020-12-16)


### Bug Fixes

* **bundler-webpack:** freeze version of prerelease packages ([50d5fa0](https://github.com/vuepress/vuepress-next/commit/50d5fa0b88cfdf1924a38cbc0d19d29ce2bdef89))
* **cli:** prepare pages entry if the page key is changed ([4c79839](https://github.com/vuepress/vuepress-next/commit/4c79839b730dd9cd9042c5929820d09ce102a88f))
* **plugin-git:** split arguments to get updated time ([70e8b5e](https://github.com/vuepress/vuepress-next/commit/70e8b5ec0e7a960ef9a2398200ff23ae67086ab9))





# [2.0.0-alpha.8](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.7...v2.0.0-alpha.8) (2020-12-11)


### Bug Fixes

* **bundler-webpack:** display localhost by default in console ([8bf0987](https://github.com/vuepress/vuepress-next/commit/8bf0987b71588b2959475da9d502b2e4f9cc6bbb))
* **cli:** remove shorthand of host option ([8340797](https://github.com/vuepress/vuepress-next/commit/8340797da03462c8078753a4535a9977c349ca04))


### Features

* **plugin-pwa:** migrate pwa plugin ([aa54fd6](https://github.com/vuepress/vuepress-next/commit/aa54fd65aa77b32b97de0a38359f1ad07f96f566))
* **plugin-pwa-popup:** extract pwa popup plugin ([c3e8fb2](https://github.com/vuepress/vuepress-next/commit/c3e8fb26c348b7cae47f7cc0c4a0fba998c308d3))





# [2.0.0-alpha.7](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.6...v2.0.0-alpha.7) (2020-12-09)


### Bug Fixes

* **bundler-webpack:** fix windows compatibility (close [#12](https://github.com/vuepress/vuepress-next/issues/12)) ([f35f768](https://github.com/vuepress/vuepress-next/commit/f35f76861785e69c26d3e8731d5a1afe7e2f01be))





# [2.0.0-alpha.6](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.5...v2.0.0-alpha.6) (2020-12-09)


### Features

* **bundler-webpack:** migrate to webpack 5 ([37dca96](https://github.com/vuepress/vuepress-next/commit/37dca9644622a61e50ba2cda420c08581a824a19))
* **client:** remove built-in debug component ([a5962bb](https://github.com/vuepress/vuepress-next/commit/a5962bb82483f56800b33b4e35c50dcb49fd48b1))
* **plugin-debug:** add debug plugin ([ddf0a92](https://github.com/vuepress/vuepress-next/commit/ddf0a925c849fd7dba894ee69f9840d63dee99f4))
* **shared:** add esm build ([f8463e7](https://github.com/vuepress/vuepress-next/commit/f8463e791c909493e343d98468663c9d31bcbb5f))
* **theme-default:** use debug plugin ([e12b1f3](https://github.com/vuepress/vuepress-next/commit/e12b1f3293b5e8faebd93b444b71b6ac11b1029d))





# [2.0.0-alpha.5](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.4...v2.0.0-alpha.5) (2020-12-03)


### Bug Fixes

* **plugin-google-analytics:** report site base ([31c8cad](https://github.com/vuepress/vuepress-next/commit/31c8cadfba7676e7ac5809d669a6262f421e7831))
* **theme-default:** fix code related styles ([83d8a6f](https://github.com/vuepress/vuepress-next/commit/83d8a6f50537ed1b4c5e5c0f4221841999eeaeab))
* **theme-default:** fix the condition of using router-link as nav-link ([8141f69](https://github.com/vuepress/vuepress-next/commit/8141f691495fc92ee19bd4d7bfd496c07112ac6a))


### Features

* **markdown:** support doc lang highlight ([dc91db6](https://github.com/vuepress/vuepress-next/commit/dc91db6327fd818f365abbec96cc5dde0b6ba243))





# [2.0.0-alpha.4](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.3...v2.0.0-alpha.4) (2020-12-02)


### Bug Fixes

* **bundler-webpack:** remove spinner when preparing data ([7f3b425](https://github.com/vuepress/vuepress-next/commit/7f3b4253a6d4d2f58b3487a407c609c417be1326))
* **cli:** keep message format consistent ([1de416d](https://github.com/vuepress/vuepress-next/commit/1de416d75fb115523d78e6e709712210cbf39db9))
* **core:** failed to resolve local theme ([4d836e2](https://github.com/vuepress/vuepress-next/commit/4d836e2bc3e7affe17f63df1c4ce40c464a7e6fb))
* **core:** warn if layout directory does not exist ([3d2d414](https://github.com/vuepress/vuepress-next/commit/3d2d4148024963521b9e1ebbc29aa19697ac3452))


### Features

* **cli:** allow default export in user config file ([b2f86c7](https://github.com/vuepress/vuepress-next/commit/b2f86c7b6c11de81c5aaf6e96973921dc0b9ad60))
* **cli:** allow loading ts files globally ([a9d94ac](https://github.com/vuepress/vuepress-next/commit/a9d94ac9243ec75c5de20a0a08546e3a032dd43e))
* **utils:** add hasExportDefault util ([575a9c5](https://github.com/vuepress/vuepress-next/commit/575a9c5d9eee44c0ce20b0712830e2eb2a303780))





# [2.0.0-alpha.3](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.2...v2.0.0-alpha.3) (2020-12-01)


### Bug Fixes

* **bundler-webpack:** check public dir before using copy-plugin ([2481802](https://github.com/vuepress/vuepress-next/commit/248180221e870a2e1cc2e4a67973c4e0918a3651))
* **core:** avoid runtime warning for empty template (close [#10](https://github.com/vuepress/vuepress-next/issues/10)) ([bcbf703](https://github.com/vuepress/vuepress-next/commit/bcbf703e6e449f7753697b7dfc503bd643bfd240))


### Features

* **cli:** use esbuild to load ts file ([41cfbc5](https://github.com/vuepress/vuepress-next/commit/41cfbc57872f00b1f8ff80ffc9b127942792fbc6))





# [2.0.0-alpha.2](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.1...v2.0.0-alpha.2) (2020-12-01)


### Bug Fixes

* **plugin-git:** check if git repo is valid ([3e9fc83](https://github.com/vuepress/vuepress-next/commit/3e9fc8301e3fc9a0be7a8c7ede25e10063a10c9f))


### Features

* **bundler-webpack:** use esbuild for compilation and minification ([4351f99](https://github.com/vuepress/vuepress-next/commit/4351f997ffee41d560a257abd28880aa98ee29a4))





# 2.0.0-alpha.1 (2020-12-01)
