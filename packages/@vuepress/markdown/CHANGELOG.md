# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-beta.36](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.35...v2.0.0-beta.36) (2022-03-01)


### Features

* **markdown:** add aria-hidden for line-numbers ([#731](https://github.com/vuepress/vuepress-next/issues/731)) ([6f5d132](https://github.com/vuepress/vuepress-next/commit/6f5d13289dd41dbb55d883ff8bff996e77b6daf9))





# [2.0.0-beta.35](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.34...v2.0.0-beta.35) (2022-01-22)

**Note:** Version bump only for package @vuepress/markdown





# [2.0.0-beta.33](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.32...v2.0.0-beta.33) (2022-01-12)


### Bug Fixes

* **markdown:** replace img src correctly when wrapped with other html tags (close [#597](https://github.com/vuepress/vuepress-next/issues/597)) ([f2f53ef](https://github.com/vuepress/vuepress-next/commit/f2f53efc21a1c16c342f32d15562b7153e48ce70))





# [2.0.0-beta.32](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.31...v2.0.0-beta.32) (2021-12-28)

**Note:** Version bump only for package @vuepress/markdown





# [2.0.0-beta.29](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.28...v2.0.0-beta.29) (2021-12-18)


### Features

* extract external link icon to plugin ([437b750](https://github.com/vuepress/vuepress-next/commit/437b75076667e653d3600c96f9f4a7c3c3e47e57))


### BREAKING CHANGES

* config `markdown.links.externalIcon` is removed, use plugin-external-link-icon instead
* frontmatter `externalIcon` is removed, use `externalLinkIcon` from plugin-external-link-icon
* component `OutboundLink` is removed, use `ExternalLinkIcon` from plugin-external-link-icon





# [2.0.0-beta.28](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.27...v2.0.0-beta.28) (2021-12-17)

**Note:** Version bump only for package @vuepress/markdown





# [2.0.0-beta.27](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.26...v2.0.0-beta.27) (2021-10-28)

**Note:** Version bump only for package @vuepress/markdown





# [2.0.0-beta.25](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.24...v2.0.0-beta.25) (2021-08-29)

**Note:** Version bump only for package @vuepress/markdown





# [2.0.0-beta.24](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.23...v2.0.0-beta.24) (2021-08-14)

**Note:** Version bump only for package @vuepress/markdown





# [2.0.0-beta.23](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.22...v2.0.0-beta.23) (2021-08-01)


### Bug Fixes

* **markdown:** encode file path when coverting links (close [#306](https://github.com/vuepress/vuepress-next/issues/306)) ([920c9ac](https://github.com/vuepress/vuepress-next/commit/920c9ac9864ad6877606e0839ae0f35695fe5e0c))


### Features

* **markdown:** support `code.lineNumbers` to be set to number (close [#231](https://github.com/vuepress/vuepress-next/issues/231)) ([#276](https://github.com/vuepress/vuepress-next/issues/276)) ([a7fbdec](https://github.com/vuepress/vuepress-next/commit/a7fbdec893e01937b392ba40ed9dc8888415f9ed))





# [2.0.0-beta.22](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.21...v2.0.0-beta.22) (2021-07-11)


### Bug Fixes

* **markdown:** resolve assets links in html img tags (close [#254](https://github.com/vuepress/vuepress-next/issues/254)) ([7cbb163](https://github.com/vuepress/vuepress-next/commit/7cbb163bf19cbe8e8d682ef9707c3f738486e089))





# [2.0.0-beta.21](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.20...v2.0.0-beta.21) (2021-07-03)


### Bug Fixes

* **markdown:** filter permalink symbol in toc (close [#251](https://github.com/vuepress/vuepress-next/issues/251)) ([5a35806](https://github.com/vuepress/vuepress-next/commit/5a3580656336349c29abb033a3d732646e111bfd))





# [2.0.0-beta.20](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.19...v2.0.0-beta.20) (2021-06-26)


### Features

* **markdown:** bump markdown-it-anchor to 8.0.4 ([41338f7](https://github.com/vuepress/vuepress-next/commit/41338f7d656bf9e692c3ff22e05e4b3c1a9cbd6f))


### BREAKING CHANGES

* **markdown:** `markdown.anchor` has changed, see changelog of markdown-it-anchor 8.0.0





# [2.0.0-beta.19](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.18...v2.0.0-beta.19) (2021-06-19)

**Note:** Version bump only for package @vuepress/markdown





# [2.0.0-beta.18](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.17...v2.0.0-beta.18) (2021-06-12)


### Features

* **markdown:** add extract-title plugin ([e0a1556](https://github.com/vuepress/vuepress-next/commit/e0a1556a1469cd71469f5c81e2d058a5e9b9d801))





# [2.0.0-beta.15](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.14...v2.0.0-beta.15) (2021-05-27)


### Bug Fixes

* **markdown:** decode assets link to ensure bundler can find the file ([#144](https://github.com/vuepress/vuepress-next/issues/144)) ([d3e5409](https://github.com/vuepress/vuepress-next/commit/d3e5409246a47edae93209c9ce5dd2614e14c936))





# [2.0.0-beta.13](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.12...v2.0.0-beta.13) (2021-05-06)


### Bug Fixes

* **markdown:** ensure ending newline in import code ([160df2d](https://github.com/vuepress/vuepress-next/commit/160df2de1567a3b6b3e889b86e6bd7b95a3cc77b))


### Features

* **markdown:** allow omitting start or end of import code lines range ([21bba5c](https://github.com/vuepress/vuepress-next/commit/21bba5c86bc8e8dec1c86f820e9de27cf15919b2))





# [2.0.0-beta.12](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.11...v2.0.0-beta.12) (2021-04-30)


### Features

* **core:** make filePath available in markdown env ([aa52549](https://github.com/vuepress/vuepress-next/commit/aa52549648b175626d3eafabe8629a78a8caf8e5))
* **markdown:** support import code blocks (close [#15](https://github.com/vuepress/vuepress-next/issues/15)) ([fe20ccc](https://github.com/vuepress/vuepress-next/commit/fe20cccf3d44565c7fcb890e8ebf2aa4659ab3e1))





# [2.0.0-beta.11](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.10...v2.0.0-beta.11) (2021-04-28)

**Note:** Version bump only for package @vuepress/markdown





# [2.0.0-beta.10](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.9...v2.0.0-beta.10) (2021-04-27)


### Features

* **markdown:** support externalIcon in config and frontmatter ([#122](https://github.com/vuepress/vuepress-next/issues/122)) ([d1389bc](https://github.com/vuepress/vuepress-next/commit/d1389bc6c0eee3ad2fe83d5636fd293d0710e0fb))





# [2.0.0-beta.9](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.8...v2.0.0-beta.9) (2021-04-21)


### Bug Fixes

* **markdown:** do not escape extracted headers (close [#117](https://github.com/vuepress/vuepress-next/issues/117)) ([81b1336](https://github.com/vuepress/vuepress-next/commit/81b133622a00e6474f0bfe4a58e35bfab9fe3e49))


### Features

* **core:** make frontmatter available in markdown env ([f977192](https://github.com/vuepress/vuepress-next/commit/f97719237db9d14c94716bf6b18fe52519a008cf))





# [2.0.0-beta.8](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.7...v2.0.0-beta.8) (2021-04-11)


### Features

* **markdown:** support internalTag option in links plugin ([1872ad9](https://github.com/vuepress/vuepress-next/commit/1872ad95d7c86247883c24f2ec86db07d7596923))





# [2.0.0-beta.7](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.6...v2.0.0-beta.7) (2021-04-09)

**Note:** Version bump only for package @vuepress/markdown





# [2.0.0-beta.5](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2021-03-26)


### Bug Fixes

* **markdown:** avoid wrapping highlighted code with multiple pre ([f0b3872](https://github.com/vuepress/vuepress-next/commit/f0b38722f1a06c736366a36d7c4888952d28c947))





# [2.0.0-beta.4](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2021-03-20)


### Code Refactoring

* **markdown:** remove default syntax highlighter ([4a1abe3](https://github.com/vuepress/vuepress-next/commit/4a1abe39335eaaf3ef1dca3e35a324b12981c0d2))


### BREAKING CHANGES

* **markdown:** prismjs is no longer the default syntax highlighter





# [2.0.0-beta.1](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.0...v2.0.0-beta.1) (2021-03-13)

**Note:** Version bump only for package @vuepress/markdown





# [2.0.0-beta.0](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.26...v2.0.0-beta.0) (2021-03-13)

**Note:** Version bump only for package @vuepress/markdown





# [2.0.0-alpha.25](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.24...v2.0.0-alpha.25) (2021-02-20)


### Bug Fixes

* **markdown:** do not treat autolink as a component (close [#60](https://github.com/vuepress/vuepress-next/issues/60)) ([9f6cffa](https://github.com/vuepress/vuepress-next/commit/9f6cffa1e0c39d0caf9f7ab34c5f06f36a87948b))





# [2.0.0-alpha.24](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.23...v2.0.0-alpha.24) (2021-02-13)

**Note:** Version bump only for package @vuepress/markdown





# [2.0.0-alpha.23](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.22...v2.0.0-alpha.23) (2021-02-10)


### Bug Fixes

* **markdown:** remove site base from internal links (close [#58](https://github.com/vuepress/vuepress-next/issues/58)) ([a8c7fdd](https://github.com/vuepress/vuepress-next/commit/a8c7fdd86a9c4f08c51673f3dba0451455a731d2))





# [2.0.0-alpha.22](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.21...v2.0.0-alpha.22) (2021-02-10)

**Note:** Version bump only for package @vuepress/markdown





# [2.0.0-alpha.20](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.19...v2.0.0-alpha.20) (2021-02-04)

**Note:** Version bump only for package @vuepress/markdown





# [2.0.0-alpha.19](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.18...v2.0.0-alpha.19) (2021-01-24)

**Note:** Version bump only for package @vuepress/markdown





# [2.0.0-alpha.18](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.17...v2.0.0-alpha.18) (2021-01-17)


### Bug Fixes

* **markdown:** load some languages by default to partially avoid prism issue ([48c085a](https://github.com/vuepress/vuepress-next/commit/48c085af6a8751211fe7180a82bb67ff5a7b191f))





# [2.0.0-alpha.16](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.15...v2.0.0-alpha.16) (2021-01-11)


### Bug Fixes

* **core:** support special characters in filename and permalink ([c3e68ef](https://github.com/vuepress/vuepress-next/commit/c3e68ef6a4aa3f6722d5bc4079bafe5d3b176e5e))
* **markdown:** fix assets relative path handling (close [#33](https://github.com/vuepress/vuepress-next/issues/33)) ([9a95431](https://github.com/vuepress/vuepress-next/commit/9a95431aa3994855f7194d3efe810b4fd2cf72d9))





# [2.0.0-alpha.15](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.14...v2.0.0-alpha.15) (2021-01-04)

**Note:** Version bump only for package @vuepress/markdown





# [2.0.0-alpha.13](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.12...v2.0.0-alpha.13) (2020-12-23)


### Bug Fixes

* **markdown:** only prepend prefix to explicit relative image path ([8d6a095](https://github.com/vuepress/vuepress-next/commit/8d6a095ace0ed724b4ac4eea0e44a28f120a48bc))





# [2.0.0-alpha.12](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.11...v2.0.0-alpha.12) (2020-12-19)


### Bug Fixes

* **markdown:** support v-on shorthand in html inline tags ([86a1299](https://github.com/vuepress/vuepress-next/commit/86a1299d16555fb453f36aa1db49ff9ce184e874))


### Features

* **markdown:** code-block-level config for line-numbers and v-pre ([9ac3e4a](https://github.com/vuepress/vuepress-next/commit/9ac3e4a12066f8b05e5d3a5211adf837a944c29d))





# [2.0.0-alpha.7](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.6...v2.0.0-alpha.7) (2020-12-09)

**Note:** Version bump only for package @vuepress/markdown





# [2.0.0-alpha.6](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.5...v2.0.0-alpha.6) (2020-12-09)

**Note:** Version bump only for package @vuepress/markdown





# [2.0.0-alpha.5](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.4...v2.0.0-alpha.5) (2020-12-03)


### Features

* **markdown:** support doc lang highlight ([dc91db6](https://github.com/vuepress/vuepress-next/commit/dc91db6327fd818f365abbec96cc5dde0b6ba243))





# [2.0.0-alpha.4](https://github.com/vuepress/vuepress-next/compare/v2.0.0-alpha.3...v2.0.0-alpha.4) (2020-12-02)

**Note:** Version bump only for package @vuepress/markdown





# 2.0.0-alpha.1 (2020-12-01)


### Bug Fixes

* **markdown:** do not add prefix to external images ([dc75f57](https://github.com/vuepress/vuepress-next/commit/dc75f57cfda3193d617c4feaf091748df8482504))
* **markdown:** escape text token ([f226d54](https://github.com/vuepress/vuepress-next/commit/f226d544a9a2045b3dd0f2ea0a7186c7fd2d4adc))


### Features

* **markdown:** add assetsPlugin to handle assets links ([79e50b5](https://github.com/vuepress/vuepress-next/commit/79e50b5bfa4e39ca4df76d1d580c424c70b09a42))
* **markdown:** add code plugin ([0e29d69](https://github.com/vuepress/vuepress-next/commit/0e29d6995f2f631b0dd73225f7ddd604de857416))
* **markdown:** allow disable built-in plugins ([a0746e5](https://github.com/vuepress/vuepress-next/commit/a0746e518aca472bc08e0ee738c72aa50a2142bf))
* **markdown:** enable line numbers by default ([44b1e47](https://github.com/vuepress/vuepress-next/commit/44b1e4707c217d6155ff72d6c1ec14c72d0e004a))
* **markdown:** migrate to markdown-it-toc-done-right ([5f9f092](https://github.com/vuepress/vuepress-next/commit/5f9f0928d4a99882084ebbfc6b806e86bd98dc43))
* **markdown:** support highlight-lines in code plugin ([932b737](https://github.com/vuepress/vuepress-next/commit/932b7375ac7e5aef9b05bdf330a754c4f82fc0f6))
