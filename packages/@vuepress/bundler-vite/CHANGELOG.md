# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-beta.35](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.34...v2.0.0-beta.35) (2022-01-22)

**Note:** Version bump only for package @vuepress/bundler-vite





# [2.0.0-beta.34](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.33...v2.0.0-beta.34) (2022-01-21)


### Code Refactoring

* remove debug plugin ([f8481eb](https://github.com/vuepress/vuepress-next/commit/f8481eb06b001c81e54cd6fab7d12f1ab75cdbc7))


### BREAKING CHANGES

* `@vuepress/plugin-debug` package has been removed





# [2.0.0-beta.33](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.32...v2.0.0-beta.33) (2022-01-12)

**Note:** Version bump only for package @vuepress/bundler-vite





# [2.0.0-beta.32](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.31...v2.0.0-beta.32) (2021-12-28)


### Code Refactoring

* **core:** normalize core app structure ([6952acf](https://github.com/vuepress/vuepress-next/commit/6952acfeee4575e53ce468c3d180dc9f623d6cd1))


### BREAKING CHANGES

* **core:** config `templateSSR` is renamed to `templateBuild`





# [2.0.0-beta.31](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.30...v2.0.0-beta.31) (2021-12-24)

**Note:** Version bump only for package @vuepress/bundler-vite





# [2.0.0-beta.30](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.29...v2.0.0-beta.30) (2021-12-23)

**Note:** Version bump only for package @vuepress/bundler-vite





# [2.0.0-beta.29](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.28...v2.0.0-beta.29) (2021-12-18)

**Note:** Version bump only for package @vuepress/bundler-vite





# [2.0.0-beta.28](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.27...v2.0.0-beta.28) (2021-12-17)


### Bug Fixes

* **bundler-vite:** flatten the plugins structure to avoid ordering issue (close [#535](https://github.com/vuepress/vuepress-next/issues/535)) ([b4011ac](https://github.com/vuepress/vuepress-next/commit/b4011ac9c4f02a0ff06636f6cbb6f68f63d26109))





# [2.0.0-beta.27](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.26...v2.0.0-beta.27) (2021-10-28)


### Features

* **bundler-vite:** compat with vite 2.6 ([bad82eb](https://github.com/vuepress/vuepress-next/commit/bad82eb89dd85a3b9786fc72fbb9ee299a3909fe))





# [2.0.0-beta.26](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.25...v2.0.0-beta.26) (2021-09-11)

**Note:** Version bump only for package @vuepress/bundler-vite





# [2.0.0-beta.25](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.24...v2.0.0-beta.25) (2021-08-29)


### Code Refactoring

* add prefix to client constants (close [#392](https://github.com/vuepress/vuepress-next/issues/392)) ([c6447c4](https://github.com/vuepress/vuepress-next/commit/c6447c4ba1a98cb5c5ea6991c1fcdd573668c9c1))


### BREAKING CHANGES

* client constants should add `VUEPRESS` prefix now





# [2.0.0-beta.24](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.23...v2.0.0-beta.24) (2021-08-14)


### Code Refactoring

* **client:** move built-in meta tags to default html template (close [#358](https://github.com/vuepress/vuepress-next/issues/358)) ([e5c0fec](https://github.com/vuepress/vuepress-next/commit/e5c0feccb92b6aea4351110c20656dd66a6e0847))


### BREAKING CHANGES

* **client:** the previous built-in meta tags should be manually added to custom html template





# [2.0.0-beta.23](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.22...v2.0.0-beta.23) (2021-08-01)

**Note:** Version bump only for package @vuepress/bundler-vite





# [2.0.0-beta.22](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.21...v2.0.0-beta.22) (2021-07-11)


### Bug Fixes

* **bundler-vite:** fallback html requests to index.html (close [#265](https://github.com/vuepress/vuepress-next/issues/265)) ([665cda3](https://github.com/vuepress/vuepress-next/commit/665cda3b84f53a62177083af8af6d034b7e1c147))





# [2.0.0-beta.21](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.20...v2.0.0-beta.21) (2021-07-03)


### Features

* **bundler-vite:** avoid global constants being replaced by vite (close [#244](https://github.com/vuepress/vuepress-next/issues/244)) ([#245](https://github.com/vuepress/vuepress-next/issues/245)) ([0c86968](https://github.com/vuepress/vuepress-next/commit/0c869684c4e179347eebc38d916a0dfd2115b321))





# [2.0.0-beta.20](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.19...v2.0.0-beta.20) (2021-06-26)

**Note:** Version bump only for package @vuepress/bundler-vite





# [2.0.0-beta.19](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.18...v2.0.0-beta.19) (2021-06-19)


### Bug Fixes

* **bundler-vite:** resolve client entry url correctly (close [#190](https://github.com/vuepress/vuepress-next/issues/190)) ([36babba](https://github.com/vuepress/vuepress-next/commit/36babba394eccc070838c6d0861e91924d305e26))





# [2.0.0-beta.18](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.17...v2.0.0-beta.18) (2021-06-12)


### Performance Improvements

* **bundler-vite:** make server build lighter ([a6ddea5](https://github.com/vuepress/vuepress-next/commit/a6ddea5fd1a1979f5d3a7cc460e1602cb5254f08))





# [2.0.0-beta.17](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.16...v2.0.0-beta.17) (2021-06-04)

**Note:** Version bump only for package @vuepress/bundler-vite





# [2.0.0-beta.16](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.15...v2.0.0-beta.16) (2021-05-28)


### Features

* **bundler-vite:** configure postcss by default ([6197578](https://github.com/vuepress/vuepress-next/commit/61975781151ace783f3021bd6a3c55c4fa7b12bd))





# [2.0.0-beta.15](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.14...v2.0.0-beta.15) (2021-05-27)

**Note:** Version bump only for package @vuepress/bundler-vite





# [2.0.0-beta.14](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.13...v2.0.0-beta.14) (2021-05-12)


### Bug Fixes

* **bundler-vite:** compat with vite 2.3 changes (close [#134](https://github.com/vuepress/vuepress-next/issues/134)) ([1370984](https://github.com/vuepress/vuepress-next/commit/13709840080d17c6c239af53a212258d9157ffae))


### Features

* **core:** allow alias and define hook to return a promise ([3b3d289](https://github.com/vuepress/vuepress-next/commit/3b3d2893c58115de65606ffc508fdc7a9cf96f79))





# [2.0.0-beta.13](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.12...v2.0.0-beta.13) (2021-05-06)


### Bug Fixes

* **bundler-vite:** make site base work in vite dev (close [#126](https://github.com/vuepress/vuepress-next/issues/126)) ([d257e01](https://github.com/vuepress/vuepress-next/commit/d257e01b69a8b4d0032b75be233b1c381289b529))





# [2.0.0-beta.12](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.11...v2.0.0-beta.12) (2021-04-30)

**Note:** Version bump only for package @vuepress/bundler-vite





# [2.0.0-beta.11](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.10...v2.0.0-beta.11) (2021-04-28)


### Bug Fixes

* **bundler-vite:** make the timestamp of client entry consistent ([4bbff4c](https://github.com/vuepress/vuepress-next/commit/4bbff4c22f67c456a0f4dcfe3ddf5724902a4d2a))





# [2.0.0-beta.10](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.9...v2.0.0-beta.10) (2021-04-27)


### Bug Fixes

* **bundler-vite:** avoid client code to be optimized or externalized ([f8a088d](https://github.com/vuepress/vuepress-next/commit/f8a088db5f428087a58dec4823627a9e3b447a75))
* **bundler-vite:** disable clearScreen in dev by default ([e7bfe49](https://github.com/vuepress/vuepress-next/commit/e7bfe49d10aa8d3c5121120435ed5076fbe80a27))
* **client:** make hydration work properly (close [#123](https://github.com/vuepress/vuepress-next/issues/123)) ([34a5364](https://github.com/vuepress/vuepress-next/commit/34a5364ad6005e64a3e726296b9b8b73318fcbd4))


### Features

* **bundler-vite:** bump vite to 2.2.1 to support cacheDir ([d7f685b](https://github.com/vuepress/vuepress-next/commit/d7f685b5d729d9f8c9f858673355a37cb22fc90e))





# [2.0.0-beta.9](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.8...v2.0.0-beta.9) (2021-04-21)

**Note:** Version bump only for package @vuepress/bundler-vite





# [2.0.0-beta.8](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.7...v2.0.0-beta.8) (2021-04-11)

**Note:** Version bump only for package @vuepress/bundler-vite





# [2.0.0-beta.7](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.6...v2.0.0-beta.7) (2021-04-09)

**Note:** Version bump only for package @vuepress/bundler-vite





# [2.0.0-beta.6](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.5...v2.0.0-beta.6) (2021-03-26)

**Note:** Version bump only for package @vuepress/bundler-vite





# [2.0.0-beta.5](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2021-03-26)

**Note:** Version bump only for package @vuepress/bundler-vite





# [2.0.0-beta.4](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2021-03-20)


### Bug Fixes

* **bundler-vite:** disable auto resolving vite config file ([57967f7](https://github.com/vuepress/vuepress-next/commit/57967f7dec27c4148edf920decead327cc8746bf))





# [2.0.0-beta.3](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2021-03-17)


### Bug Fixes

* **bundler-vite:** fix fs path on windows (close [#74](https://github.com/vuepress/vuepress-next/issues/74)) ([db3c3e8](https://github.com/vuepress/vuepress-next/commit/db3c3e8639d040aa8b408006d48b160a0b234e12))





# [2.0.0-beta.2](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2021-03-14)


### Bug Fixes

* **bundler-vite:** avoid optimizing client package ([5708934](https://github.com/vuepress/vuepress-next/commit/57089344f87bf381f8e6f2711eb6df9364c72432))
* **bundler-vite:** workaround for vitejs/vite[#2503](https://github.com/vuepress/vuepress-next/issues/2503) ([055b280](https://github.com/vuepress/vuepress-next/commit/055b280a8488c42614702533cc9eb8fb2852c71b))





# [2.0.0-beta.1](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.0...v2.0.0-beta.1) (2021-03-13)

**Note:** Version bump only for package @vuepress/bundler-vite





# [2.0.0-beta.0](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.26...v2.0.0-beta.0) (2021-03-13)


### Features

* **bundler-vite:** add vite support :zap: ([7d612c4](https://github.com/vuepress/vuepress-next/commit/7d612c45d83d42b246316f93cc3385a9968307af))
