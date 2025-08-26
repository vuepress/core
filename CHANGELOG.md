# [2.0.0-rc.25](https://github.com/vuepress/core/compare/v2.0.0-rc.24...v2.0.0-rc.25) (2025-08-26)


### Code Refactoring

* **utils:** migrate from globby to tinyglobby ([#1660](https://github.com/vuepress/core/issues/1660)) ([5eea315](https://github.com/vuepress/core/commit/5eea31546e5442f2de0a3eb3872a9208f505106e))


### Features

* **cli:** upgrade chokidar to v4 (close [#1605](https://github.com/vuepress/core/issues/1605)) ([#1661](https://github.com/vuepress/core/issues/1661)) ([c2e1521](https://github.com/vuepress/core/commit/c2e15217f86a6c84f5774f4a4420c658d4961b21))


### BREAKING CHANGES

* **utils:** the `globby` export has been removed, please use `tinyglobby` instead



# [2.0.0-rc.24](https://github.com/vuepress/core/compare/v2.0.0-rc.23...v2.0.0-rc.24) (2025-06-30)


### Build System

* drop node 18 ([#1655](https://github.com/vuepress/core/issues/1655)) ([afad5d0](https://github.com/vuepress/core/commit/afad5d0cf5bd8e2b978e8d4d6d53a718578aacaa))


### Features

* **bundler-vite:** upgrade vite to v7 ([#1656](https://github.com/vuepress/core/issues/1656)) ([d4e58c3](https://github.com/vuepress/core/commit/d4e58c3c28da42b7990e22d6dad540d2484e550c))


### BREAKING CHANGES

* drop node 18
* **utils**: `TEMPLATE_RENDERER_OUTLETS` has been replaced with `TemplateRendererOutlet`



# [2.0.0-rc.23](https://github.com/vuepress/core/compare/v2.0.0-rc.22...v2.0.0-rc.23) (2025-05-08)


### Bug Fixes

* make alias can be overridden properly ([#1648](https://github.com/vuepress/core/issues/1648)) ([13c8c59](https://github.com/vuepress/core/commit/13c8c59818e8cfbb25692ed1eaee04eef90fad1a))



# [2.0.0-rc.22](https://github.com/vuepress/core/compare/v2.0.0-rc.21...v2.0.0-rc.22) (2025-04-28)


### Bug Fixes

* **markdown:** avoid leading number in link hash ([#1644](https://github.com/vuepress/core/issues/1644)) ([db4982e](https://github.com/vuepress/core/commit/db4982e93e856cc19eae95390f0754c71de0f12a))


### Features

* **bundler-vite:** upgrade vite to 6.3 ([a78ee55](https://github.com/vuepress/core/commit/a78ee55b4dabbaad7cd3ec9e2a0c7bf1eaa15c87))
* **bundler-webpack:** update target of esbuild-loader ([#1643](https://github.com/vuepress/core/issues/1643)) ([a09e92d](https://github.com/vuepress/core/commit/a09e92d7ca1c7b07cb3ead2d7ad17337c9fcb18c))
* **client:** provide client data aliases and utils ([#1645](https://github.com/vuepress/core/issues/1645)) ([7a43fae](https://github.com/vuepress/core/commit/7a43fae631baa631929a3f98055d465d86f7469f))



# [2.0.0-rc.21](https://github.com/vuepress/core/compare/v2.0.0-rc.20...v2.0.0-rc.21) (2025-04-12)


### Bug Fixes

* **bundler-webpack:** allow UPPERCASE file extension ([#1642](https://github.com/vuepress/core/issues/1642)) ([f674742](https://github.com/vuepress/core/commit/f6747421cb36cc668f54101332a9a03b49f7c6b2))


### Code Refactoring

* **core:** remove headers field from page data ([#1613](https://github.com/vuepress/core/issues/1613)) ([0a9d26d](https://github.com/vuepress/core/commit/0a9d26d0db042253f1bb67287afe911f89182737))


### BREAKING CHANGES

* **core:** the `headers` field has been removed from page data, but it's still available on page object



# [2.0.0-rc.20](https://github.com/vuepress/core/compare/v2.0.0-rc.19...v2.0.0-rc.20) (2025-02-23)


### Features

* **client:** add onContentUpdated composition API ([#1620](https://github.com/vuepress/core/issues/1620)) ([cd7252f](https://github.com/vuepress/core/commit/cd7252f11bc7df1ddf7ebad769590a44d9ccb15d))
* **client:** improve client data types ([#1626](https://github.com/vuepress/core/issues/1626)) ([8bd5438](https://github.com/vuepress/core/commit/8bd5438a46cf4966c28bc687f8b5dad000d993c3))
* **client:** improve devtools and export constants (close [#1625](https://github.com/vuepress/core/issues/1625)) ([4a105cb](https://github.com/vuepress/core/commit/4a105cb0a4fe1cb5c0d4ab8022e0161de85c8531))



# [2.0.0-rc.19](https://github.com/vuepress/core/compare/v2.0.0-rc.18...v2.0.0-rc.19) (2024-12-11)


### Features

* **bundler-vite:** upgrade vite to v6 ([faddbe6](https://github.com/vuepress/core/commit/faddbe64e4c71a115bf300b4fc831118dbf3eca7))



# [2.0.0-rc.18](https://github.com/vuepress/core/compare/v2.0.0-rc.17...v2.0.0-rc.18) (2024-10-10)


### Bug Fixes

* **core:** fix app env flag regression (close [#1612](https://github.com/vuepress/core/issues/1612)) ([e693cdc](https://github.com/vuepress/core/commit/e693cdc6892aa977dc92c37c4869ad86fa5a8d69))


### Features

* **core:** improve user config file loading ([#1615](https://github.com/vuepress/core/issues/1615)) ([01f6ab3](https://github.com/vuepress/core/commit/01f6ab3c24d34c85b090656b1352b38913084809))
* **markdown:** add isExternal option for linksPlugin (close [#1611](https://github.com/vuepress/core/issues/1611)) ([41214eb](https://github.com/vuepress/core/commit/41214eb4060e6b5537cd1ee25e2803bf1f66a7e6))
* **utils:** sync latest sanitizeFileName logic from rollup ([#1614](https://github.com/vuepress/core/issues/1614)) ([aaf3bba](https://github.com/vuepress/core/commit/aaf3bba36134fe31518f559f08fbe9dfd8f98c4a))



# [2.0.0-rc.17](https://github.com/vuepress/core/compare/v2.0.0-rc.16...v2.0.0-rc.17) (2024-09-30)


### Bug Fixes

* **shared:** revert unexpected type changes (close [#1610](https://github.com/vuepress/core/issues/1610)) ([d21a934](https://github.com/vuepress/core/commit/d21a934b2c2ad28626f4e59820c53e08ed50f18f))


### Features

* **client:** upgrade vue devtools-api to v7 ([7940a3d](https://github.com/vuepress/core/commit/7940a3d79f9281a5ff100ed859d966e15c82c556))



# [2.0.0-rc.16](https://github.com/vuepress/core/compare/v2.0.0-rc.15...v2.0.0-rc.16) (2024-09-29)


### Bug Fixes

* **core:** handle templateBuildRenderer option correctly ([427e3cc](https://github.com/vuepress/core/commit/427e3cc976770ec801605f561ebab3e1629f43be))
* **core:** make `content` have higher priority than `filePath` in page options ([12dbc67](https://github.com/vuepress/core/commit/12dbc67775c3e0f573793d9d2b01929e58322879))
* **vuepress:** update required node version ([98a1830](https://github.com/vuepress/core/commit/98a18308260a8476b6b94eb905aeef6f5bedef75))


### Features

* **bundlerutils:** add bundlerutils package ([5488138](https://github.com/vuepress/core/commit/548813890385c6d8f54e00eb952452aed2439867))
* upgrade to vue 3.5 ([d43bf23](https://github.com/vuepress/core/commit/d43bf234fc8f2ba3ffd44811c5d38571e142bc99))



# [2.0.0-rc.15](https://github.com/vuepress/core/compare/v2.0.0-rc.14...v2.0.0-rc.15) (2024-08-15)


### Features

* **bundler-vite:** add client type export (close [#1579](https://github.com/vuepress/core/issues/1579)) ([#1580](https://github.com/vuepress/core/issues/1580)) ([e3ed143](https://github.com/vuepress/core/commit/e3ed143979b63aecab7772bd5cf3f67735d8c03c))
* **bundler-vite:** upgrade vite to v5.4 (close [#1598](https://github.com/vuepress/core/issues/1598)) ([97af89c](https://github.com/vuepress/core/commit/97af89caf5e3bcab21dd7b3fcaa38bbb1e9fe4bb))
* **bundler-webpack:** add api field in sass-loader option type ([#1588](https://github.com/vuepress/core/issues/1588)) ([f3251b7](https://github.com/vuepress/core/commit/f3251b7a73e234cb585edfb969b1b1981d872cd6))
* **bundler-webpack:** normalize loader options type ([679cf8f](https://github.com/vuepress/core/commit/679cf8fe5f061f34b059e087bc8694f1b94d452a))



# [2.0.0-rc.14](https://github.com/vuepress/core/compare/v2.0.0-rc.13...v2.0.0-rc.14) (2024-06-19)


### Features

* **bundler-vite:** upgrade vite to v5.3 ([68d3dbc](https://github.com/vuepress/core/commit/68d3dbc4aab849acc2148d2343d1d7ed7f5bdb59))
* **markdown:** support single line code import syntax (close [#1355](https://github.com/vuepress/core/issues/1355)) ([34e291e](https://github.com/vuepress/core/commit/34e291e4afca7eac3f302e41e1e483e3f1c09201))



# [2.0.0-rc.13](https://github.com/vuepress/core/compare/v2.0.0-rc.12...v2.0.0-rc.13) (2024-05-31)


### Bug Fixes

* **bundler-vite:** exclude vite 5.2.12 from version range (close [#1573](https://github.com/vuepress/core/issues/1573)) ([1b77850](https://github.com/vuepress/core/commit/1b77850a145c7a9deba6643e2b8967430e2e7638))



# [2.0.0-rc.12](https://github.com/vuepress/core/compare/v2.0.0-rc.11...v2.0.0-rc.12) (2024-05-27)


### Bug Fixes

* **client:** support non-ascii locale path ([01ee546](https://github.com/vuepress/core/commit/01ee546167c5b2b781efca4c49d197593c79193e))
* **core:** fix page redirects comparison ([#1563](https://github.com/vuepress/core/issues/1563)) ([90a11d9](https://github.com/vuepress/core/commit/90a11d9fb9b2701145ca1717c7d67da7b1e3e0ed))
* fix route resolving error with hash and queries (close [#1561](https://github.com/vuepress/core/issues/1561)) ([#1562](https://github.com/vuepress/core/issues/1562)) ([4df59d4](https://github.com/vuepress/core/commit/4df59d4a6c8ae590cf976727f6b872436320df73))


### Code Refactoring

* **markdown:** remove codePlugin and add vPrePlugin (close [#1550](https://github.com/vuepress/core/issues/1550)) ([#1556](https://github.com/vuepress/core/issues/1556)) ([385577c](https://github.com/vuepress/core/commit/385577ce62da060eee787845398a9c23cfbb32c7))


### Features

* **bundler-webpack:** enable css-modules for .module.css files (close [#1557](https://github.com/vuepress/core/issues/1557)) ([#1560](https://github.com/vuepress/core/issues/1560)) ([10378e1](https://github.com/vuepress/core/commit/10378e10f090f834daf25ca32fb6142b7b1c0da2))
* **bundler-webpack:** replace postcss-csso with lightningcss (close [#1349](https://github.com/vuepress/core/issues/1349)) ([c854b19](https://github.com/vuepress/core/commit/c854b19c1c71251326cf44208ee8400fce0f33b4))
* **bundler-webpack:** replace webpack-chain with webpack-5-chain (close [#1503](https://github.com/vuepress/core/issues/1503)) ([#1566](https://github.com/vuepress/core/issues/1566)) ([21ae915](https://github.com/vuepress/core/commit/21ae9154b4a7fc379fc5f7d67043c15ebc81bcf1))
* **core:** allow non-default-export client config file ([#1564](https://github.com/vuepress/core/issues/1564)) ([d3b3cc4](https://github.com/vuepress/core/commit/d3b3cc415bb24b2434d4c509b34b6c7cc3326d60))


### BREAKING CHANGES

* **markdown:** `markdown.code` option is remove. Please use `@vuepress/plugin-shiki` and `@vuepress/plugin-prismjs` instead.
* **bundler-webpack:** For webpack bundler, css-modules will be enabled for `*.module.[ext]` files. The previous `*.[ext]?module` usage is no longer supported.



# [2.0.0-rc.11](https://github.com/vuepress/core/compare/v2.0.0-rc.10...v2.0.0-rc.11) (2024-05-16)


### Features

* **client:** improve AutoLinkProps ([#1554](https://github.com/vuepress/core/issues/1554)) ([0777d09](https://github.com/vuepress/core/commit/0777d098e420ebc44ed9bb983009ee5d6367bb1d))
* **client:** support slot props in AutoLink ([630e29a](https://github.com/vuepress/core/commit/630e29a0a64973cf41369b854c0663ea36b12608))



# [2.0.0-rc.10](https://github.com/vuepress/core/compare/v2.0.0-rc.9...v2.0.0-rc.10) (2024-05-16)


### Bug Fixes

* **bundler-vite:** disable server.fs.cachedChecks by default (close [#1526](https://github.com/vuepress/core/issues/1526)) ([bab6ae9](https://github.com/vuepress/core/commit/bab6ae90beb34194557eea1c979aacb0ea72ca91))
* **client:** fix siteLocaleData type ([#1529](https://github.com/vuepress/core/issues/1529)) ([1825636](https://github.com/vuepress/core/commit/1825636bee63554945afe52138e2efa805de0ec2))
* **client:** keep full path during route navigation (close [#1514](https://github.com/vuepress/core/issues/1514)) ([#1527](https://github.com/vuepress/core/issues/1527)) ([e6455e0](https://github.com/vuepress/core/commit/e6455e0d4af71f006f639d39b89d96cc52013eeb))
* **core:** transform file path to chunk name (close [#1531](https://github.com/vuepress/core/issues/1531)) ([d584ee3](https://github.com/vuepress/core/commit/d584ee3df9f72f84737f135b4957a3940c621bd2))
* **markdown:** fix query parsing and absolute link fallback in linksPlugin (close [#1536](https://github.com/vuepress/core/issues/1536)) ([#1537](https://github.com/vuepress/core/issues/1537)) ([5082b3d](https://github.com/vuepress/core/commit/5082b3df08d06f81560d656144b2b0f3aeb3366a))
* **shared:** check external link correctly ([#1543](https://github.com/vuepress/core/issues/1543)) ([34e240c](https://github.com/vuepress/core/commit/34e240c7b66357563b4ccd17a11709a661ffbb03))
* **shared:** check link with protocol correctly ([#1542](https://github.com/vuepress/core/issues/1542)) ([8b1ab67](https://github.com/vuepress/core/commit/8b1ab674136cd4d4672b0c26cc9be008236a9efa))


### Features

* **client:** add AutoLink component ([#1546](https://github.com/vuepress/core/issues/1546)) ([8eb722f](https://github.com/vuepress/core/commit/8eb722febacf8e4271fa6ad5410298f001c73509))
* **client:** export ResolvedRoute type ([#1525](https://github.com/vuepress/core/issues/1525)) ([950f158](https://github.com/vuepress/core/commit/950f15824397ecce839ab1b6fe50543bc7a91634))
* **client:** support relative link in RouteLink ([#1545](https://github.com/vuepress/core/issues/1545)) ([7c8f271](https://github.com/vuepress/core/commit/7c8f2712489db9880d77bb783618d2226926b11d))
* **core:** allow null permalink in frontmatter to disable permalink ([#1547](https://github.com/vuepress/core/issues/1547)) ([becebb2](https://github.com/vuepress/core/commit/becebb23fa3c811879ca6ae68f7c532c3b7ee267))
* enable hydration mismatch details in debug mode ([#1530](https://github.com/vuepress/core/issues/1530)) ([b752f9c](https://github.com/vuepress/core/commit/b752f9c79a693dedeb0c352fd94979f480bad2e7))
* **markdown:** upgrade markdown-it type to v14 ([0a5d4eb](https://github.com/vuepress/core/commit/0a5d4eb2fd95da71687725a1b8b37d7f1572439d))
* **shared:** support relative links in normalizeRoutePath ([#1544](https://github.com/vuepress/core/issues/1544)) ([c443a95](https://github.com/vuepress/core/commit/c443a95a7002e37e852caf566d0bb283c76e45ce))


### Performance Improvements

* **shared:** use non-capture group for resolveRoutePathFromUrl ([#1539](https://github.com/vuepress/core/issues/1539)) ([2bbb2b2](https://github.com/vuepress/core/commit/2bbb2b2b64a3429315044a419192ddfa6bd0f594))



# [2.0.0-rc.9](https://github.com/vuepress/core/compare/v2.0.0-rc.8...v2.0.0-rc.9) (2024-03-22)


### Bug Fixes

* **client:** fix RouteLink path resolve ([#1512](https://github.com/vuepress/core/issues/1512)) ([010c8bf](https://github.com/vuepress/core/commit/010c8bf9e9ee805f4f1432cdbecd39cb04088421))
* fix permalink redirecting (close [#1516](https://github.com/vuepress/core/issues/1516)) ([#1517](https://github.com/vuepress/core/issues/1517)) ([ab41ba1](https://github.com/vuepress/core/commit/ab41ba1acb96f14c4dfaa0cadfae34413e4a0544))



# [2.0.0-rc.8](https://github.com/vuepress/core/compare/v2.0.0-rc.7...v2.0.0-rc.8) (2024-02-19)


### Bug Fixes

* **bundler-webpack:** inject all vue feature flags explicitly ([c645d1a](https://github.com/vuepress/core/commit/c645d1a9a56a8df77f3117d22699a31c2ce908f1))
* **client:** make layouts client config optional (close [#1494](https://github.com/vuepress/core/issues/1494)) ([27a88ec](https://github.com/vuepress/core/commit/27a88ecf832b2dd3068b77005901b89fb7f48261))
* **client:** remove usage of vueuse (close [#1500](https://github.com/vuepress/core/issues/1500)) ([b352c09](https://github.com/vuepress/core/commit/b352c090794f2675a43e8a886e14d2f315f8e095))


### Features

* **bundler-vite:** bump vite to 5.1 ([b2e322a](https://github.com/vuepress/core/commit/b2e322a323c4f9f74e43967522b6c05854b3f89b))
* **bundler-webpack:** bump webpack-dev-server to v5 ([a250c76](https://github.com/vuepress/core/commit/a250c767190b3883cfa085f43b01838fddbdea9e))
* **client:** throw error when layout does not exist ([158b12c](https://github.com/vuepress/core/commit/158b12c34f007735f0a3986da8215a3410740c30))


### Reverts

* refactor(client): handle page data hmr by checking pageChunk ref ([bb96427](https://github.com/vuepress/core/commit/bb96427c2505f3d65d36539242a3ec15f55bf4be))



# [2.0.0-rc.7](https://github.com/vuepress/core/compare/v2.0.0-rc.6...v2.0.0-rc.7) (2024-02-06)


### Features

* **client:** add useClientData composable ([37f646b](https://github.com/vuepress/core/commit/37f646bf700c38614914450244b77cb82eb8d50f))



# [2.0.0-rc.6](https://github.com/vuepress/core/compare/v2.0.0-rc.5...v2.0.0-rc.6) (2024-02-05)


### Bug Fixes

* **shared:** handle query and hash in normalizeRoutePath ([c1dbc2c](https://github.com/vuepress/core/commit/c1dbc2cac123ca12aae3dd754987f4a8128dcaf2))


### Features

* **client:** export useRoute and useRouter ([eb13cb0](https://github.com/vuepress/core/commit/eb13cb0942fa22aab90c658460fe9edb6256dae9))



# [2.0.0-rc.5](https://github.com/vuepress/core/compare/v2.0.0-rc.4...v2.0.0-rc.5) (2024-02-05)


### Bug Fixes

* **markdown:** keep base if link tag is not updated ([073e21d](https://github.com/vuepress/core/commit/073e21dae533136ba24245c9a9e765939560c059))
* **shared:** improve normalizeRoutePath edge cases handling ([f2247bb](https://github.com/vuepress/core/commit/f2247bbce8c8b6059d42334fac77b6e3d620c412))


### Features

* **client:** add RouteLink component ([d4dbcc6](https://github.com/vuepress/core/commit/d4dbcc65721b3c4f12eb17faffb9d50a328beb5a))



# [2.0.0-rc.4](https://github.com/vuepress/core/compare/v2.0.0-rc.3...v2.0.0-rc.4) (2024-02-03)


### Bug Fixes

* **client:** fix routes types ([a290295](https://github.com/vuepress/core/commit/a29029563ec9902e79a9a8a3f6d24bbd7b119155))



# [2.0.0-rc.3](https://github.com/vuepress/core/compare/v2.0.0-rc.2...v2.0.0-rc.3) (2024-02-03)


### Features

* **cli:** add link for troubleshooting docs ([5281a42](https://github.com/vuepress/core/commit/5281a42f8c4350ab20a731a6ccace4b6274502f4))


### Performance Improvements

* implement custom routes ([#1447](https://github.com/vuepress/core/issues/1447)) ([8ca0cc6](https://github.com/vuepress/core/commit/8ca0cc68455046a4dc6abafaf54b0db6aa4dd295))


### BREAKING CHANGES

* vue-router's route records have been replaced by custom route records to get better performance. It should not break common usage, but could be a potential breaking change for some themes. vue-router is suitable for SPAs, but not for static sites. It has a negative impact on the performance of vuepress sites, especially large-scale ones. In the long run we'll replace vue-router with a light-weighted custom router totally.



# [2.0.0-rc.2](https://github.com/vuepress/core/compare/v2.0.0-rc.1...v2.0.0-rc.2) (2024-01-26)


### Bug Fixes

* **bundler-vite:** add vuepress to client packages list ([#1473](https://github.com/vuepress/core/issues/1473)) ([5771dbb](https://github.com/vuepress/core/commit/5771dbbba5415d7da6c0344034f573a2b70fe66d))



# [2.0.0-rc.1](https://github.com/vuepress/core/compare/v2.0.0-rc.0...v2.0.0-rc.1) (2024-01-24)


### Bug Fixes

* **bundler-vite:** serve assets with absolute path in dev server correctly (close [#1442](https://github.com/vuepress/core/issues/1442)) ([d0b4062](https://github.com/vuepress/core/commit/d0b4062d1975403f85504958bd9e87d9f35fb88e))
* **client:** avoid updating existing head tags (close [#1268](https://github.com/vuepress/core/issues/1268)) ([#1314](https://github.com/vuepress/core/issues/1314)) ([bfbab28](https://github.com/vuepress/core/commit/bfbab2803ec090f80a287484a037b1f6e4a9827b))
* **client:** merge locales head correctly ([2fe35bb](https://github.com/vuepress/core/commit/2fe35bb3a358b59d2b14b4bcae7eb644768e80ba))
* **markdown:** use non-greedy matching when parsing attributes ([#1469](https://github.com/vuepress/core/issues/1469)) ([91d8e3d](https://github.com/vuepress/core/commit/91d8e3d91962a8c06b648bdadbe239be113d5d42))


### Features

* bump to vue 3.4 ([7f192ea](https://github.com/vuepress/core/commit/7f192ead367c59f811210a22c98bd4a6138d749c))
* **cli:** update config file build target to node18 ([66d20fc](https://github.com/vuepress/core/commit/66d20fc91d95587212c81f8773a4a78a38a95dc3))
* **cli:** update info command to include more binaries and remove ecosystem packages ([84b5c80](https://github.com/vuepress/core/commit/84b5c80989d59f14aecb6efd3cc5df4ed427a77d))
* **markdown:** add absolutePathPrependBase option for assets plugin ([634af03](https://github.com/vuepress/core/commit/634af031331605d1d28cb7e92734c68842d009e0))
* **markdown:** add title support for code blocks (close [#1277](https://github.com/vuepress/core/issues/1277)) ([#1456](https://github.com/vuepress/core/issues/1456)) ([706a427](https://github.com/vuepress/core/commit/706a42783bf54ccf5a9c1f5db2c615119436969c))
* **markdown:** bump to markdown-it 14 ([5abdcdf](https://github.com/vuepress/core/commit/5abdcdfea433f7986e93cd6e766ce1cc445e9dff))
* **markdown:** update default anchor permalink function (close [#1363](https://github.com/vuepress/core/issues/1363)) ([#1452](https://github.com/vuepress/core/issues/1452)) ([f7d6dde](https://github.com/vuepress/core/commit/f7d6dde7dc0ec461abb2529f72f2446eb6b87c5d))
* **vuepress:** add client-types export ([#1460](https://github.com/vuepress/core/issues/1460)) ([57bb91b](https://github.com/vuepress/core/commit/57bb91b642e71c4fe33d45d9a06b2c9fe0f7b052))
* **vuepress:** add more exports and bin shorthands (close [#1446](https://github.com/vuepress/core/issues/1446)) ([#1449](https://github.com/vuepress/core/issues/1449)) ([3a32e0a](https://github.com/vuepress/core/commit/3a32e0a3278514ee051ef34d9faa2dd9009b1677))


### BREAKING CHANGES

* **vuepress:** `vuepress-vite` and `vuepress-webpack` packages have been removed, and the corresponding commands have been moved to `vuepress` package. With `vuepress` command, you need to install bundler package and set bundler in config file manually. With `vuepress-vite` and `vuepress-webpack` command, you still need to install bundler package, but you can omit bundler option in config file.
* **markdown:** the default permalink function of markdown-it-anchor has been changed from `ariaHidden` to `headerLink` for better accessibility, which would be a potential breaking change for theme authors
* **markdown:** bump to markdown-it 14



# [2.0.0-rc.0](https://github.com/vuepress/core/compare/v2.0.0-beta.68...v2.0.0-rc.0) (2023-11-16)


### Bug Fixes

* support links with custom protocol (close [#1404](https://github.com/vuepress/core/issues/1404)) ([#1421](https://github.com/vuepress/core/issues/1421)) ([518fd7d](https://github.com/vuepress/core/commit/518fd7d5db3220b92893a94438d9f9422093e403))


### Features

* upgrade to vite 5 and esbuild 0.19 ([e1e9ec3](https://github.com/vuepress/core/commit/e1e9ec3fc615f8e11bb2400a0aeb4179413125f9))



# [2.0.0-beta.68](https://github.com/vuepress/core/compare/v2.0.0-beta.67...v2.0.0-beta.68) (2023-11-10)


### Build System

* drop support for node 16 ([10b0aa9](https://github.com/vuepress/core/commit/10b0aa9b186710de1d15495e968b63ccdbbd778b))


### Features

* **core:** support templateBuildRenderer in app options and theme api (close [#1120](https://github.com/vuepress/core/issues/1120)) ([0b0108d](https://github.com/vuepress/core/commit/0b0108d5ad14dddf77723edddeca4e5ae4f4c7fa))
* **theme-default:** sync code group status (close [#541](https://github.com/vuepress/core/issues/541)) ([7078dd5](https://github.com/vuepress/core/commit/7078dd532e699d3e3cfc1eefd4d4b317471a388e))
* **utils:** add templateRenderer utils ([fe8ea2a](https://github.com/vuepress/core/commit/fe8ea2ac4d5ba2163896112ebe4e8fd6ef16878d))


### BREAKING CHANGES

* **utils:** the outlets of templateBuild has been updated, see `TEMPLATE_RENDERER_OUTLETS` in `@vuepress/utils` package
* drop support for node 16



# [2.0.0-beta.67](https://github.com/vuepress/core/compare/v2.0.0-beta.66...v2.0.0-beta.67) (2023-08-28)


### Bug Fixes

* **client:** avoid mismatching between route path and page data (close [#1249](https://github.com/vuepress/core/issues/1249)) ([#1381](https://github.com/vuepress/core/issues/1381)) ([acbdc7f](https://github.com/vuepress/core/commit/acbdc7f5c03030fb7fdc32beef898a879fbf8e48))
* **markdown:** handle data uri correctly (close [#1393](https://github.com/vuepress/core/issues/1393)) ([#1403](https://github.com/vuepress/core/issues/1403)) ([bd8aa0a](https://github.com/vuepress/core/commit/bd8aa0a18956b538f1476e902809d6ed9c6831a0))



# [2.0.0-beta.66](https://github.com/vuepress/core/compare/v2.0.0-beta.65...v2.0.0-beta.66) (2023-07-11)


### Reverts

* fix(client): avoid mismatching between route path and page data (close [#1249](https://github.com/vuepress/core/issues/1249)) ([#1361](https://github.com/vuepress/core/issues/1361)) ([73e55f0](https://github.com/vuepress/core/commit/73e55f0d795eb42600602d5024d27a2ecd6b66f4))



# [2.0.0-beta.65](https://github.com/vuepress/core/compare/v2.0.0-beta.64...v2.0.0-beta.65) (2023-07-11)


### Bug Fixes

* **client:** avoid mismatching between route path and page data (close [#1249](https://github.com/vuepress/core/issues/1249)) ([#1361](https://github.com/vuepress/core/issues/1361)) ([9b0ad9e](https://github.com/vuepress/core/commit/9b0ad9e7935f5b8b5b23c2d2cacff5f71514068a))
* **client:** fallback page lang to site lang (close [#1365](https://github.com/vuepress/core/issues/1365)) ([#1380](https://github.com/vuepress/core/issues/1380)) ([debd65d](https://github.com/vuepress/core/commit/debd65d68d895e32641f6c171fd4ca0516d621cc))


### Features

* **plugin-git:** remove duplicate no-reply contributors ([#1364](https://github.com/vuepress/core/issues/1364)) ([3ff1b06](https://github.com/vuepress/core/commit/3ff1b0638b14d1b636fdc531283aeee4b10b7122))



# [2.0.0-beta.64](https://github.com/vuepress/core/compare/v2.0.0-beta.63...v2.0.0-beta.64) (2023-07-03)


### Bug Fixes

* **plugin-active-header-links:** remove force replace when updating hash ([#1360](https://github.com/vuepress/core/issues/1360)) ([fa6b9ea](https://github.com/vuepress/core/commit/fa6b9eab1ace5b06a02d95bb63d16df7b59adeea))


### Performance Improvements

* **client:** use eager computed for routeLocale ([9d85d4f](https://github.com/vuepress/core/commit/9d85d4f5b4fe0bc4bca392b466e168240d156dd3))
* **client:** use eager computed for routePath to avoid extra route locale resolving ([aacff56](https://github.com/vuepress/core/commit/aacff56bc60559763c246eab8a6697f9e4418ad3))
* **core:** reduce pageRoutes size ([#1274](https://github.com/vuepress/core/issues/1274)) ([08cf419](https://github.com/vuepress/core/commit/08cf419119fae22abd1d8c4178a7ecddb7564e78))



# [2.0.0-beta.63](https://github.com/vuepress/core/compare/v2.0.0-beta.62...v2.0.0-beta.63) (2023-06-08)


### Bug Fixes

* **plugin-medium-zoom:** avoid inject error in ssr mode (close [#1338](https://github.com/vuepress/core/issues/1338)) ([#1339](https://github.com/vuepress/core/issues/1339)) ([5a56c9b](https://github.com/vuepress/core/commit/5a56c9b984d5000a1accf051ff2e76cd9b665aaf))
* **theme-default:** fix languages locale config (close [#1345](https://github.com/vuepress/core/issues/1345)) ([2edad72](https://github.com/vuepress/core/commit/2edad726e64fc0f3778fa0d56881ddd859e36a55))



# [2.0.0-beta.62](https://github.com/vuepress/core/compare/v2.0.0-beta.61...v2.0.0-beta.62) (2023-05-11)


### Bug Fixes

* **core:** ensure page.title isString (close [#1306](https://github.com/vuepress/core/issues/1306)) ([#1308](https://github.com/vuepress/core/issues/1308)) ([644b406](https://github.com/vuepress/core/commit/644b406e3516a44edd063a13f7fbfb27952ada85))
* **plugin-docsearch:** allow using slash key to init docsearch ([#1323](https://github.com/vuepress/core/issues/1323)) ([3382bb1](https://github.com/vuepress/core/commit/3382bb1763eec68f3f0380a9ec887f0b0a3b0e95))
* **plugin-theme-data:** remove locales field in themeLocaleData (close [#1287](https://github.com/vuepress/core/issues/1287)) ([#1313](https://github.com/vuepress/core/issues/1313)) ([d91996f](https://github.com/vuepress/core/commit/d91996fd0864abd5029e4c4cff319db48be06b47))


### Build System

* bump dependencies, drop node 14 ([#1311](https://github.com/vuepress/core/issues/1311)) ([a8c30ee](https://github.com/vuepress/core/commit/a8c30ee8f6a91efd8860575754766d4c186460c2))


### Features

* bump vue to 3.3 ([#1327](https://github.com/vuepress/core/issues/1327)) ([bebadea](https://github.com/vuepress/core/commit/bebadeaf8c25104c2f9e9cf53685766c3844db1a))
* **bundler-vite:** bump vite to 4.3 and temporarily remove manualChunks ([#1328](https://github.com/vuepress/core/issues/1328)) ([031563e](https://github.com/vuepress/core/commit/031563e5aa2e0eb99e3ba3702f0a1c6978bbbfc3))
* **markdown:** support relative image links without `./` ([#1103](https://github.com/vuepress/core/issues/1103)) ([b7d71be](https://github.com/vuepress/core/commit/b7d71be8760a025694a9a522b0e354217c1c4111))
* **theme-default:** improve css variable acquisition ([#1322](https://github.com/vuepress/core/issues/1322)) ([eb0d0ea](https://github.com/vuepress/core/commit/eb0d0eaa4a57843838c6e564a8ced164b34d7677))


### Performance Improvements

* **shared:** reduce regexp match usage ([#1315](https://github.com/vuepress/core/issues/1315)) ([23bdec6](https://github.com/vuepress/core/commit/23bdec6969b9666b800e0ebeb9e9b3a6ed05ef98))


### BREAKING CHANGES

* **markdown:** for markdown image syntax `![alt](path)`, paths without `./` or `/` or protocol will be treated as relative links
* drop support for node 14



# [2.0.0-beta.61](https://github.com/vuepress/core/compare/v2.0.0-beta.60...v2.0.0-beta.61) (2023-02-27)


### Bug Fixes

* **client:** avoid updating routeLocale on route hash change ([#1253](https://github.com/vuepress/core/issues/1253)) ([5eb9489](https://github.com/vuepress/core/commit/5eb948922761e9cc96674a7d43a075ecf59ef5ea))
* **markdown:** render token attrs in code block ([#1220](https://github.com/vuepress/core/issues/1220)) ([b4e313b](https://github.com/vuepress/core/commit/b4e313bb757696eb4baa347940dbeb5dac1938f2))
* **theme-default:** fix site name text overflow style ([#1260](https://github.com/vuepress/core/issues/1260)) ([95363a5](https://github.com/vuepress/core/commit/95363a50d8977f9beabb94aa7ec4ab9602605ed9))


### Features

* **core:** attach markdownEnv to page object ([#1228](https://github.com/vuepress/core/issues/1228)) ([8a63e19](https://github.com/vuepress/core/commit/8a63e19c52a5db1c3a173239b3c339cd9693e93b))
* **markdown:** add error log for importCode plugin ([#1273](https://github.com/vuepress/core/issues/1273)) ([b722a62](https://github.com/vuepress/core/commit/b722a623842f0ecde650027468d967bec79aa2c6))
* **plugin-docsearch:** load docsearch asynchronously (close [#1247](https://github.com/vuepress/core/issues/1247)) ([#1254](https://github.com/vuepress/core/issues/1254)) ([f5d5b11](https://github.com/vuepress/core/commit/f5d5b11f787abb87225284fb059e3d89e3bcf768))
* **plugin-docsearch:** support indexBase option (close [#1223](https://github.com/vuepress/core/issues/1223)) ([#1224](https://github.com/vuepress/core/issues/1224)) ([23a4c68](https://github.com/vuepress/core/commit/23a4c681cfd50607f396cb3894ede3cc60698d1b))



# [2.0.0-beta.60](https://github.com/vuepress/core/compare/v2.0.0-beta.59...v2.0.0-beta.60) (2022-12-28)


### Bug Fixes

* **markdown:** avoid extracting headers in nested blocks by bumping mdit-vue (close [#1201](https://github.com/vuepress/core/issues/1201)) ([ecd3716](https://github.com/vuepress/core/commit/ecd3716e0fca2e4c4457d514f245ca06e6e9086e))
* **theme-default:** fix word breaking (close [#1209](https://github.com/vuepress/core/issues/1209)) ([#1210](https://github.com/vuepress/core/issues/1210)) ([1e7761f](https://github.com/vuepress/core/commit/1e7761f269556816e7f8202481234a8d6a471dc2))
* **theme-default:** preserve url params when switching language ([#1211](https://github.com/vuepress/core/issues/1211)) ([941b2fe](https://github.com/vuepress/core/commit/941b2fe8a5c45e1065b9a1f0b0541e571b43f26d))


### Features

* **client:** improve default head title resolver ([c688270](https://github.com/vuepress/core/commit/c68827024584bb46aeb119087f91c8cb6053de27))
* **plugin-docsearch:** add injectStyles option (close [#948](https://github.com/vuepress/core/issues/948)) ([#1208](https://github.com/vuepress/core/issues/1208)) ([34fb6c2](https://github.com/vuepress/core/commit/34fb6c24e7250f20d1092a70141af528ae2f6b91))



# [2.0.0-beta.59](https://github.com/vuepress/core/compare/v2.0.0-beta.58...v2.0.0-beta.59) (2022-12-14)


### Bug Fixes

* **bundler-webpack:** fix order of extensionAlias (close [#1082](https://github.com/vuepress/core/issues/1082)) ([28eeb9b](https://github.com/vuepress/core/commit/28eeb9ba04704c45ae993a0c5f994da1e87d26df))



# [2.0.0-beta.58](https://github.com/vuepress/core/compare/v2.0.0-beta.57...v2.0.0-beta.58) (2022-12-10)


### Bug Fixes

* **bundler-webpack:** avoid duplicated style preload ([e484a55](https://github.com/vuepress/core/commit/e484a55ca3c0b80babab47c227d7321a6bc6ddd7))
* **bundler-webpack:** fix module identifier matching ([9d8d645](https://github.com/vuepress/core/commit/9d8d64573ec37df446f8ca99bb9270c5328a7024))
* **bundler-webpack:** partially fix ssr dependencies issue ([83e7b6c](https://github.com/vuepress/core/commit/83e7b6cb77f6ae6766d7546131d2ae602d74e1f2))



# [2.0.0-beta.57](https://github.com/vuepress/core/compare/v2.0.0-beta.56...v2.0.0-beta.57) (2022-12-09)


### Bug Fixes

* **theme-default:** fix code block misalignment (close [#901](https://github.com/vuepress/core/issues/901)) ([#1185](https://github.com/vuepress/core/issues/1185)) ([7d156d7](https://github.com/vuepress/core/commit/7d156d781f86e29e7c261eb467c5c48589055f6f))


### Build System

* bump to vite 4 and rollup 3 ([5fac2e6](https://github.com/vuepress/core/commit/5fac2e644202a1d3df8204601bb0a32a5df55d15))


### Code Refactoring

* remove page excerpt ([a27bc24](https://github.com/vuepress/core/commit/a27bc246602214970a12b0222d8bdbc49339cf03))


### Features

* **client:** add __VUEPRESS_BASE__ constant ([fe047fe](https://github.com/vuepress/core/commit/fe047fe44fe0c46e7051106bde50829d39482ba0))


### BREAKING CHANGES

* bump to vite 4 and rollup 3
* `excerpt` has been removed from page object and page data



# [2.0.0-beta.56](https://github.com/vuepress/core/compare/v2.0.0-beta.55...v2.0.0-beta.56) (2022-12-09)


### Reverts

* perf: render pages in parallel ([#1094](https://github.com/vuepress/core/issues/1094)) ([#1186](https://github.com/vuepress/core/issues/1186)) ([1e698f5](https://github.com/vuepress/core/commit/1e698f5f6a04c80d7c3c6b56c7af3a7077256233))



# [2.0.0-beta.55](https://github.com/vuepress/core/compare/v2.0.0-beta.54...v2.0.0-beta.55) (2022-12-09)


### Bug Fixes

* **bundler-vite:** fix regression of vite options merging (close [#1184](https://github.com/vuepress/core/issues/1184)) ([998eb94](https://github.com/vuepress/core/commit/998eb94c58f11ba1728179310d61f337c3367695))


### Performance Improvements

* render pages in parallel ([#1094](https://github.com/vuepress/core/issues/1094)) ([78f737c](https://github.com/vuepress/core/commit/78f737c537a5de076f88f604a7413e39ac8e42f9))



# [2.0.0-beta.54](https://github.com/vuepress/core/compare/v2.0.0-beta.53...v2.0.0-beta.54) (2022-12-08)


### Bug Fixes

* **bundler-vite:** make user config have the highest priority ([#1092](https://github.com/vuepress/core/issues/1092)) ([91cc59e](https://github.com/vuepress/core/commit/91cc59e437a44d8743edbe8423c3c3be416a5c4a))
* **client:** allow double quotes in head tag (close [#1174](https://github.com/vuepress/core/issues/1174)) ([#1176](https://github.com/vuepress/core/issues/1176)) ([69956c0](https://github.com/vuepress/core/commit/69956c0952e35561ddd385a41f9337142baf3fba))
* **client:** async load client configs to avoid circular deps (close [#1154](https://github.com/vuepress/core/issues/1154)) ([b0a7a0e](https://github.com/vuepress/core/commit/b0a7a0e686b98dd8201dfed8effd6f7616e7d498))
* **markdown:** support single quotes in img tag (close [#937](https://github.com/vuepress/core/issues/937)) ([#1104](https://github.com/vuepress/core/issues/1104)) ([7dae33a](https://github.com/vuepress/core/commit/7dae33ab2edb95343f6e11b60116cfc32f79a68b))


### Features

* **bundler-vite:** improve chunk splitting ([#1170](https://github.com/vuepress/core/issues/1170)) ([b4e9ca6](https://github.com/vuepress/core/commit/b4e9ca6f97247c568901486116e8924e39c9cb58))
* improve page path and vite chunk name ([#1100](https://github.com/vuepress/core/issues/1100)) ([d93b682](https://github.com/vuepress/core/commit/d93b682172f2f26f5eab39d965771621a03e2384))
* improve print style ([#1181](https://github.com/vuepress/core/issues/1181)) ([0800a07](https://github.com/vuepress/core/commit/0800a07224e8d2fb3975ad7eda7de674c0686a11))
* **theme-default:** collapsible nested item in sidebar (close [#883](https://github.com/vuepress/core/issues/883)) ([#1158](https://github.com/vuepress/core/issues/1158)) ([48ab95c](https://github.com/vuepress/core/commit/48ab95c775dc6b21a54451bfe654e2f58fd4d05c))
* **theme-default:** improve style of custom container ([#1131](https://github.com/vuepress/core/issues/1131)) ([4941f95](https://github.com/vuepress/core/commit/4941f95da5be5a0060a916a21a62de37dd7c87b9))
* **utils:** replace chalk with picocolors ([#1145](https://github.com/vuepress/core/issues/1145)) ([ee0ea8c](https://github.com/vuepress/core/commit/ee0ea8c6adcbb91a79c89d940aa8953a24fc84f0))


### BREAKING CHANGES

* **utils:** `@vuepress/utils` no longer exports `chalk`, use `colors` instead



# [2.0.0-beta.53](https://github.com/vuepress/core/compare/v2.0.0-beta.52...v2.0.0-beta.53) (2022-10-24)


### Features

* **cli:** print help messages if no matching command ([bcc2208](https://github.com/vuepress/core/commit/bcc22089c4302e1c3ec40d99ca27035b58494921))


### Reverts

* feat(bundler-vite): improve chunk splitting ([#1101](https://github.com/vuepress/core/issues/1101)) (close [#1140](https://github.com/vuepress/core/issues/1140)) ([01975a1](https://github.com/vuepress/core/commit/01975a164df49d395351d3481ac85bda80adadac))



# [2.0.0-beta.52](https://github.com/vuepress/core/compare/v2.0.0-beta.51...v2.0.0-beta.52) (2022-10-21)


### Bug Fixes

* **bundler-vite:** exclude user-config plugin from optimizeDeps ([#1135](https://github.com/vuepress/core/issues/1135)) ([4285cf8](https://github.com/vuepress/core/commit/4285cf83d4afb7deef863651fdc5be9a58ded68b))
* **bundler-vite:** test page component files correctly (close [#1056](https://github.com/vuepress/core/issues/1056)) ([bcf6033](https://github.com/vuepress/core/commit/bcf6033ce2acf2b98dede4a4e580fe4f39222517))
* **cli:** import envinfo correctly (close [#1059](https://github.com/vuepress/core/issues/1059)) ([4476404](https://github.com/vuepress/core/commit/44764049b74aac87276e6e902f022abd2ec19a4b))
* **plugin-search:** avoid triggering hotkey while typing ([#1125](https://github.com/vuepress/core/issues/1125)) ([7b2e3fa](https://github.com/vuepress/core/commit/7b2e3fabfc9eed65918f9cf3108b86c7de164412))
* **plugin-search:** fix mutiple search icon on iPad (close [#1004](https://github.com/vuepress/core/issues/1004)) ([#1106](https://github.com/vuepress/core/issues/1106)) ([b5df79d](https://github.com/vuepress/core/commit/b5df79d508ffff071371cd6804da698a4e6117a4))
* **plugin-search:** unify breakpoint with default theme ([#1091](https://github.com/vuepress/core/issues/1091)) ([a1773d9](https://github.com/vuepress/core/commit/a1773d96271c35e7a9b5a63d76c495ffc7e91711))
* **theme-default:** improve responsive layout ([#1102](https://github.com/vuepress/core/issues/1102)) ([c63bd4a](https://github.com/vuepress/core/commit/c63bd4a75fb61860e969e4bc229c2754b9aac0b6))


### Features

* add type attribute for prefetch link tags ([#1095](https://github.com/vuepress/core/issues/1095)) ([cd3b569](https://github.com/vuepress/core/commit/cd3b56985f63cd5a7e7934dffec5237b495682b9))
* **bundler-vite:** auto load postcss plugins from postcss config files ([#1088](https://github.com/vuepress/core/issues/1088)) ([0f49c47](https://github.com/vuepress/core/commit/0f49c4798cf3f8b65fbf54a441bfaf68bbade684))
* **bundler-vite:** improve chunk splitting ([#1101](https://github.com/vuepress/core/issues/1101)) ([00b8366](https://github.com/vuepress/core/commit/00b83665182286185593cb03928d5c5b1e5867c5))
* **bundler-vite:** set esbuild output charset to utf-8 (close [#1129](https://github.com/vuepress/core/issues/1129)) ([#1133](https://github.com/vuepress/core/issues/1133)) ([10dd348](https://github.com/vuepress/core/commit/10dd3484de44d7ecf3855cd94c9d632728ef5d6a))
* **client:**  improve default page head title resolver ([#1078](https://github.com/vuepress/core/issues/1078)) ([2d6343e](https://github.com/vuepress/core/commit/2d6343e48cf983883cc2f3f0549e28b59469f28b))
* **markdown:** set extension of code fences in data-ext attribute ([#1132](https://github.com/vuepress/core/issues/1132)) ([f1947f4](https://github.com/vuepress/core/commit/f1947f4ab8353264291769fb3f2b660d9cab2e84))
* **plugin-google-analytics:** add debug option ([#1001](https://github.com/vuepress/core/issues/1001)) ([0f46ac7](https://github.com/vuepress/core/commit/0f46ac7ca6466f0ead43e06b476d8f756daf2c0e))
* **plugin-shiki:** bump shiki to 0.11 ([#1111](https://github.com/vuepress/core/issues/1111)) ([06e3f55](https://github.com/vuepress/core/commit/06e3f55e171e7cea310cee2f840f5b0f6876c2c7))
* **theme-default:** add heroHeight frontmatter for home page ([81398d5](https://github.com/vuepress/core/commit/81398d5e967af92b61aa67329ca374512142bc36))


### Performance Improvements

* avoid bundling hmr code to production ([#1134](https://github.com/vuepress/core/issues/1134)) ([ed8e9e6](https://github.com/vuepress/core/commit/ed8e9e68cc28bfb35a0ec940784f989516143c03))


### BREAKING CHANGES

* **markdown:** the `ext-xxx` class name of code fences has been removed



# [2.0.0-beta.51](https://github.com/vuepress/core/compare/v2.0.0-beta.50...v2.0.0-beta.51) (2022-08-28)


### Bug Fixes

* **bundler-vite:** do not change output entry of client bundle (close [#1043](https://github.com/vuepress/core/issues/1043)) ([b3565cb](https://github.com/vuepress/core/commit/b3565cba73d0e87540b563d86792bbd2bd219de0))
* **bundler-webpack:** add extensionAlias config ([697e7ae](https://github.com/vuepress/core/commit/697e7aef4b27e4b4743895c84860d09681ad0e29))
* **core:** resolve app version correctly ([2a93513](https://github.com/vuepress/core/commit/2a935136fca8980cf89146e6d6f1b0a42a50b700))


### Features

* **client:** make args of defineClientConfig optional ([e418e02](https://github.com/vuepress/core/commit/e418e02b8c6bb179fd2aae2ce1abb9341038e2d0))
* support layouts option in client config ([#1053](https://github.com/vuepress/core/issues/1053)) ([a67a0bf](https://github.com/vuepress/core/commit/a67a0bfd806bda548532836ebf8ec1704b7bcb8a))


### Performance Improvements

* reduce memory usage during rendering ([ea0a2b2](https://github.com/vuepress/core/commit/ea0a2b213a107c7972da63dededc163c716185d6))


### BREAKING CHANGES

* theme API `layouts` has been removed, layouts should be set in client config instead of theme entry
* `404` layout should be renamed to `NotFound` layout
* node API `app.layouts` has been removed



# [2.0.0-beta.50](https://github.com/vuepress/core/compare/v2.0.0-beta.49...v2.0.0-beta.50) (2022-08-23)


### Bug Fixes

* **cli:** handle config file __dirname correctly ([8171f4d](https://github.com/vuepress/core/commit/8171f4d58406d95bfe3d415107f6e0b88521e082))
* **plugin-active-header-links:** keep query when updating hash (close [#991](https://github.com/vuepress/core/issues/991)) ([0fdb021](https://github.com/vuepress/core/commit/0fdb021c678d22f435fe8e94375c92f0bee8b125))
* **plugin-docsearch:** handle navigation url correctly (close [#1024](https://github.com/vuepress/core/issues/1024)) ([b6ded16](https://github.com/vuepress/core/commit/b6ded16f607f5db5a27967260e7e6b7b69a26c2b))
* **theme-default:** fix initial open state of sidebar item ([392297f](https://github.com/vuepress/core/commit/392297fa856fd5869de40e4999c5bc4d126a3941))
* workaround for vite hash issue (close [#1008](https://github.com/vuepress/core/issues/1008)) ([f8cdc9e](https://github.com/vuepress/core/commit/f8cdc9e7adad9ec64986761084ea0656064867a4))


### Code Refactoring

* **markdown:** bump sfc plugin to v0.9 ([b0fc856](https://github.com/vuepress/core/commit/b0fc8566db65cbb8443d9520daaed573a1387f22))


### Features

* **client:** add devtools custom inspector ([5568abe](https://github.com/vuepress/core/commit/5568abe9d4fde1e0830810ebb449670d85e18dbb))
* **core:** pass isServer flag to alias and define hooks ([7862813](https://github.com/vuepress/core/commit/7862813cce58160bf6511d50b44c5071602aa404))
* migrate to pure ESM ([#1030](https://github.com/vuepress/core/issues/1030)) ([d283ffe](https://github.com/vuepress/core/commit/d283ffe3ef0668bfea54e6d973066695f46f13c0))


### BREAKING CHANGES

* VuePress is now published as pure ESM packages
* CommonJS config file is not supported anymore
* **markdown:** type of node-api `page.sfcBlocks` has been changed



# [2.0.0-beta.49](https://github.com/vuepress/core/compare/v2.0.0-beta.48...v2.0.0-beta.49) (2022-07-11)


### Bug Fixes

* **bundler-vite:** handle process.env replacement in dev ([20f8a3f](https://github.com/vuepress/core/commit/20f8a3f8d4079cb056188f57162c74b4bc0ced65))
* **cli:** check dest path correctly (close [#954](https://github.com/vuepress/core/issues/954)) ([6a18c91](https://github.com/vuepress/core/commit/6a18c91af5bcd756fce7085b6e5dc106a05c4f7a))
* **theme-default:** fallback select language aria-label correctly ([d450478](https://github.com/vuepress/core/commit/d4504788a2223839950d8e0488bdf7b05e20626a))
* **theme-default:** fix 404 page style regression (close [#963](https://github.com/vuepress/core/issues/963)) ([6a26f0b](https://github.com/vuepress/core/commit/6a26f0b23c9a3be35ec571590b7d15bb4c965607))
* **theme-default:** fix minor issues of collapsible sidebar (close [#967](https://github.com/vuepress/core/issues/967)) ([022e611](https://github.com/vuepress/core/commit/022e61108f2f80b1817a0e9a58c735916d8cc106))
* **theme-default:** make headings anchor non-selectable ([#973](https://github.com/vuepress/core/issues/973)) ([5020fc1](https://github.com/vuepress/core/commit/5020fc1d9cb5fbc1adbc9e2581bdf0766adfd1c6))


### Code Refactoring

* **markdown:** externalize custom component plugin ([a1909c0](https://github.com/vuepress/core/commit/a1909c01a2e9db49b989f7bd64f37d3d9e9d5483))
* **markdown:** externalize headers and title plugin ([8441569](https://github.com/vuepress/core/commit/84415691662b7452f09ed04d2b80d92e4c9a2e8e))
* **markdown:** externalize sfc plugin ([a23aaa1](https://github.com/vuepress/core/commit/a23aaa142d5fc8979adb14e468b7aadc2c062b84))


### Features

* **markdown:** support frontmatter options ([6056e37](https://github.com/vuepress/core/commit/6056e37342d2851b8320cd9f7e6bd5f04649194f))
* **theme-default:** try to keep current hash across languages ([a13c1e7](https://github.com/vuepress/core/commit/a13c1e792126a89d6a45afc85a49486d1bc069f9))
* **utils:** add isChildPath util ([698e599](https://github.com/vuepress/core/commit/698e5998956f149a00b1dd12706285d264b896ab))


### BREAKING CHANGES

* **markdown:** `markdown.extractHeaders` has been renamed to `markdown.headers`
* **markdown:** `markdown.extractTitle` has been renamed to `markdown.title`
* **markdown:** `markdown.hoistTags` has been renamed to `markdown.sfc`
* **markdown:** node-api `page.hoistedTags` has been renamed to `page.sfcBlocks`
* **markdown:** `markdown.customComponent` has been renamed to `markdown.component`



# [2.0.0-beta.48](https://github.com/vuepress/core/compare/v2.0.0-beta.47...v2.0.0-beta.48) (2022-06-11)


### Bug Fixes

* **plugin-docsearch:** keep base in result items (close [#933](https://github.com/vuepress/core/issues/933)) ([35ebc91](https://github.com/vuepress/core/commit/35ebc91bbcaf8ef6772baf037eb8c99083ab50dc))
* **shared:** check markdown links correctly ([252f4ac](https://github.com/vuepress/core/commit/252f4acb2f7b69b8c920aafac362d44027f9ae49))


### Performance Improvements

* replace object literals with json when generating client codes ([6db42f0](https://github.com/vuepress/core/commit/6db42f0cb2030285e0e208a83bb6e9e82f82caf8))



# [2.0.0-beta.47](https://github.com/vuepress/core/compare/v2.0.0-beta.46...v2.0.0-beta.47) (2022-06-10)


### Bug Fixes

* **plugin-active-header-links:** remove hash at page top (close [#913](https://github.com/vuepress/core/issues/913)) ([#920](https://github.com/vuepress/core/issues/920)) ([268fa6d](https://github.com/vuepress/core/commit/268fa6d0848829c97433bd8bbe57c21bb26c8423))
* **plugin-docsearch:** fix search modal on mobile ([52fda1e](https://github.com/vuepress/core/commit/52fda1e2de5c02f5b51e3cfe7bddb50127b0a5f5))
* **plugin-docsearch:** use min-width to avoid layout shift after initialization ([b208be5](https://github.com/vuepress/core/commit/b208be5a86bb6cf11071798eccd1326d4d8f4a89))
* **theme-default:** fix header anchor offset regression ([e4b4ded](https://github.com/vuepress/core/commit/e4b4dedea8652b305d9092a7d236479ffcef6741))


### Features

* **bundler-vite:** enable vue prod devtools in debug mode ([39fe57b](https://github.com/vuepress/core/commit/39fe57bb3a2d2536eb5fd2282047ff342f603ae4))
* **bundler-webpack:** enable vue prod devtools in debug mode ([4acc725](https://github.com/vuepress/core/commit/4acc725de7bd479dcba78e531a196fa6cbebb878))
* **core:** support permalinkPattern in app options (close [#778](https://github.com/vuepress/core/issues/778)) ([#834](https://github.com/vuepress/core/issues/834)) ([07fbe43](https://github.com/vuepress/core/commit/07fbe43ac3ba62411d85813351893ea83dff2cd5))
* **markdown:** support markdown.slugify option ([0143ba6](https://github.com/vuepress/core/commit/0143ba62eb2c4694ab77cee75bc036a7b2481c61))
* **plugin-pwa:** improve types definition ([e7590f4](https://github.com/vuepress/core/commit/e7590f49d38677f2d6065d13984fb9a928821aac))
* **plugin-search:** improve search input hotkeys (close [#746](https://github.com/vuepress/core/issues/746)) ([#831](https://github.com/vuepress/core/issues/831)) ([c98d70a](https://github.com/vuepress/core/commit/c98d70aad899e71f9f436a2b5366d137b7d2302b))
* **theme-default:** support `colorMode` and `colorModeSwitch` options (close [#796](https://github.com/vuepress/core/issues/796)) ([d89cf86](https://github.com/vuepress/core/commit/d89cf864af39981df78a8173d0bdfffb0dc74155))


### Performance Improvements

* **bundler-vite:** only apply workaround plugin for serve ([05b88e6](https://github.com/vuepress/core/commit/05b88e6da688956656ff05d5d03f506a6e9dc36d))


### BREAKING CHANGES

* **theme-default:** `darkMode` has been replaced with `colorMode` and `colorModeSwitch`
* **theme-default:** `toggleDarkMode` has been renamed to `toggleColorMode`



# [2.0.0-beta.46](https://github.com/vuepress/core/compare/v2.0.0-beta.45...v2.0.0-beta.46) (2022-05-26)


### Bug Fixes

* **core:** wrap page content to avoid issues of fragment (close [#688](https://github.com/vuepress/core/issues/688)) ([fb76656](https://github.com/vuepress/core/commit/fb766569ec3d2622ef32fbeef2438117234a253d))
* **markdown:** resolve srcset attr of html img tags (close [#809](https://github.com/vuepress/core/issues/809)) ([#818](https://github.com/vuepress/core/issues/818)) ([ea53747](https://github.com/vuepress/core/commit/ea537470b49024efa937242e0a34b2398bbc2970))
* **plugin-pwa-popup:** fix component setup regression (close [#903](https://github.com/vuepress/core/issues/903)) ([3daecdd](https://github.com/vuepress/core/commit/3daecdd2a3fa48c734040b88b3491ca11442c260))
* **plugin-pwa:** make the options optional ([e781f0a](https://github.com/vuepress/core/commit/e781f0a1505f43ef69cea4164b8703e007e90785))
* **theme-default:** access dom after mounted ([#895](https://github.com/vuepress/core/issues/895)) ([68be74d](https://github.com/vuepress/core/commit/68be74da0cd4156b08e66278c7ebe4c2a8eca82b))
* **theme-default:** use lighter bg color for inline code ([0c9b5ce](https://github.com/vuepress/core/commit/0c9b5ce1b61acc097bd7a7d7a5c809d019fe7f35))


### Features

* **bundler-vite:** use development mode when debugging ([77dc5fc](https://github.com/vuepress/core/commit/77dc5fc45f3e18281915dc6a2789c61f86799563))
* **bundler-webpack:** use development mode when debugging (close [#734](https://github.com/vuepress/core/issues/734)) ([977114e](https://github.com/vuepress/core/commit/977114e219c765d824772b9feeb029b8754d1e8e))
* **plugin-external-link-icon:** add frontmatter type ([964c308](https://github.com/vuepress/core/commit/964c30851f2458f0704526f2633ed0e7e78b0888))
* **plugin-git:** support gitInclude frontmatter (close [#449](https://github.com/vuepress/core/issues/449)) ([#460](https://github.com/vuepress/core/issues/460)) ([4f5a9af](https://github.com/vuepress/core/commit/4f5a9afa8374f0e30601892db8cd9c7433fea6d3))
* **theme-default:** add page-content-top and page-content-bottom slots (close [#857](https://github.com/vuepress/core/issues/857)) ([51f30a2](https://github.com/vuepress/core/commit/51f30a2163f9e1c963ff88da9fc0856e91e57096))



# [2.0.0-beta.45](https://github.com/vuepress/core/compare/v2.0.0-beta.44...v2.0.0-beta.45) (2022-05-14)



# [2.0.0-beta.44](https://github.com/vuepress/core/compare/v2.0.0-beta.43...v2.0.0-beta.44) (2022-05-14)


### Bug Fixes

* **theme-default:** allow non-url-encoded filename in theme config (close [#884](https://github.com/vuepress/core/issues/884)) ([dd1d240](https://github.com/vuepress/core/commit/dd1d2408ba67519f6bfaa1dd55772d80d894f5ac))


### Features

* **cli:** add check for base and dest config ([c060a6c](https://github.com/vuepress/core/commit/c060a6c9d7d49fc099a9f14fdae6861ddea109c2))
* **cli:** allow .cjs config file ([e1152d1](https://github.com/vuepress/core/commit/e1152d1212296622c6a1349ed9e1de8c292561c2))
* **core:** merge all client files hooks into clientConfigFile ([#888](https://github.com/vuepress/core/issues/888)) ([ad8b5a8](https://github.com/vuepress/core/commit/ad8b5a804295f806274d9fe776f68d5610b92545))
* **markdown:** improve line-number DOM structure ([#819](https://github.com/vuepress/core/issues/819)) ([d938852](https://github.com/vuepress/core/commit/d938852328672b09d61a2488e72079ff625fe3a4))
* **markdown:** prepend base to absolute links to markdown files (close [#653](https://github.com/vuepress/core/issues/653)) ([e4155a0](https://github.com/vuepress/core/commit/e4155a0dc688671d5ffa493d4646e3bc8c09b273))
* **theme-default:** normalize html and body font-size ([#817](https://github.com/vuepress/core/issues/817)) ([fd26901](https://github.com/vuepress/core/commit/fd26901fbc238a1a2d6c3d80191851e965f4d7a7))


### BREAKING CHANGES

* **markdown:** now absolute links to markdown files will be treated as internal links, and do not need to prepend `base` manually
* **core:** `clientAppEnhanceFiles`, `clientAppRootComponentFiles` and `clientAppSetupFiles` hooks are removed, use `clientConfigFile` hook instead
* **core:** conventional file `.vuepress/clientAppEnhance.{js,ts}` has been renamed to `.vuepress/client.{js,ts}`, and the usage has been changed too



# [2.0.0-beta.43](https://github.com/vuepress/core/compare/v2.0.0-beta.42...v2.0.0-beta.43) (2022-05-02)


### Bug Fixes

* avoid processing extendsBundlerOptions hook twice in build (close [#863](https://github.com/vuepress/core/issues/863)) ([8d69ffb](https://github.com/vuepress/core/commit/8d69ffb532fe990352c1696c20837cd88187a6f3))
* **bundler-vite:** only set client packages in noExternal (close [#866](https://github.com/vuepress/core/issues/866)) ([ff62e2a](https://github.com/vuepress/core/commit/ff62e2ad5954cff2950b4c65981d90b6c8a40c26))
* **cli:** avoid bin name conflicts (close [#869](https://github.com/vuepress/core/issues/869)) ([6d7db43](https://github.com/vuepress/core/commit/6d7db43fcf4e516ec8db30d7db0bca0f2e7ca371))


### Features

* **markdown:** support vPre for inline code (close [#683](https://github.com/vuepress/core/issues/683)) ([ef2a014](https://github.com/vuepress/core/commit/ef2a014de2ddff8e4dd4318746d90923deb0da4c))


### BREAKING CHANGES

* **markdown:** type of `code.vPre` option changed from `boolean` to
`Record<'block' | 'inline', boolean>`



# [2.0.0-beta.42](https://github.com/vuepress/core/compare/v2.0.0-beta.41...v2.0.0-beta.42) (2022-05-01)


### Build System

* drop support for node 12 ([#852](https://github.com/vuepress/core/issues/852)) ([fc1c51b](https://github.com/vuepress/core/commit/fc1c51b3a13aa3ddf1b9824e5e98dac350a39449))


### Features

* **core:** support extendsBundlerOptions hook ([9c56052](https://github.com/vuepress/core/commit/9c56052c072623e7a19224eedb88784330c9f310))


### BREAKING CHANGES

* drop support for node 12



# [2.0.0-beta.41](https://github.com/vuepress/core/compare/v2.0.0-beta.40...v2.0.0-beta.41) (2022-04-25)


### Bug Fixes

* **bundler-vite:** add client package to peerDependencies ([a82fc60](https://github.com/vuepress/core/commit/a82fc60b5c3dcbe90c5b409be79dd342d4e13aeb))
* **plugin-nprogress:** fork nprogress to local ([45770b1](https://github.com/vuepress/core/commit/45770b1b82f27e9c37e0689f99aa098cc7a73fee))



# [2.0.0-beta.40](https://github.com/vuepress/core/compare/v2.0.0-beta.39...v2.0.0-beta.40) (2022-04-25)


### Bug Fixes

* allow building multiple times in the same dest dir (close [#772](https://github.com/vuepress/core/issues/772)) ([30bb4a8](https://github.com/vuepress/core/commit/30bb4a8aa9d06fd52ffce5611dd7b255387c0c71))
* **bundler-vite:** disable scss charset by default ([f3f8772](https://github.com/vuepress/core/commit/f3f877209a5800f7ceafdda9d73047fe8a19a785))
* **bundler-vite:** fix build failure when there are no css files (close [#697](https://github.com/vuepress/core/issues/697)) ([#829](https://github.com/vuepress/core/issues/829)) ([f6101a5](https://github.com/vuepress/core/commit/f6101a591b79469c18e6bb1cf368aa9d36120a5e))
* **bundler-vite:** remove redundant use of postcss-csso (close [#759](https://github.com/vuepress/core/issues/759)) ([00c27c3](https://github.com/vuepress/core/commit/00c27c32fb290d757725181d4cd57e9c9df85835))
* **client:** support hot-reload of frontmatter head ([effa95f](https://github.com/vuepress/core/commit/effa95f821957dc293205ce9e13c46cddc0d1ea5))
* **plugin-active-header-links:** do not append hash at page top (close [#693](https://github.com/vuepress/core/issues/693)) ([#722](https://github.com/vuepress/core/issues/722)) ([f71cb50](https://github.com/vuepress/core/commit/f71cb5020da1d84cac54e5f02812f36c02dd85f4))
* **plugin-palette:** fix sass import when path contains spaces (close [#481](https://github.com/vuepress/core/issues/481)) ([#814](https://github.com/vuepress/core/issues/814)) ([bbea812](https://github.com/vuepress/core/commit/bbea812698cbe8f19e39671e9bf7bd6b49deede4))


### Code Refactoring

* drop support for using bundler, theme and plugins by name ([#843](https://github.com/vuepress/core/issues/843)) ([b85b1c3](https://github.com/vuepress/core/commit/b85b1c3b39e80a8de92a7469381061f75ef33623))


### Features

* **cli:** enable sourcemap for ts files (close [#457](https://github.com/vuepress/core/issues/457)) ([bf8c4bc](https://github.com/vuepress/core/commit/bf8c4bc440ffdb6ea0d880309eb1dbb1f9372a39))
* **core:** enable prefetch by default ([9d40851](https://github.com/vuepress/core/commit/9d408519c69234d793359ef27977941fd80dfae1))
* **markdown:** bump markdown-it to v13 ([09a3637](https://github.com/vuepress/core/commit/09a3637c0dc81d2afe61db9da13229cd4409e0f1))
* **markdown:** improve code fence language detection (close [#752](https://github.com/vuepress/core/issues/752)) ([#815](https://github.com/vuepress/core/issues/815)) ([1c4d237](https://github.com/vuepress/core/commit/1c4d23764d51134a5807a14f881ce24e6ce2378a))
* **plugin-docsearch:** remove preact dependency ([bb4a2ca](https://github.com/vuepress/core/commit/bb4a2cabe4ab6ed29c5a698454f6a8be5729c69a))


### BREAKING CHANGES

* config `bundler` should import the bundler directly, and `bundlerConfig` has been removed
* config `theme` should import the theme directly, and `themeConfig` has been removed
* config `plugins` should import the plugins directly
* theme API `plugins` should import the plugins directly
* theme API `extends` should import the parent theme directly
* plugin function and theme function should no longer accept user options as the first param, please check out the guide for how to write a plugin and a theme
* **core:** default value of `shouldPrefetch` option has been changed from `false` to `true`



# [2.0.0-beta.39](https://github.com/vuepress/core/compare/v2.0.0-beta.38...v2.0.0-beta.39) (2022-04-10)


### Bug Fixes

* **bundler-vite:** clear file hash in workaround plugin (close [#800](https://github.com/vuepress/core/issues/800)) ([3569cd9](https://github.com/vuepress/core/commit/3569cd98f217a0e2e3a74bc5e71490efa7d697d1))



# [2.0.0-beta.38](https://github.com/vuepress/core/compare/v2.0.0-beta.37...v2.0.0-beta.38) (2022-04-05)


### Features

* **bundler-vite:** bump to vite 2.9 (close [#781](https://github.com/vuepress/core/issues/781)) ([7b3e88e](https://github.com/vuepress/core/commit/7b3e88e1877e047f97851e3c6ea9ca57fb9a00bc))
* **core:** support frontmatter type param in Page type (close [#638](https://github.com/vuepress/core/issues/638)) ([6a4733f](https://github.com/vuepress/core/commit/6a4733f2fe3acfe72f0d7611d6f604fade44d5dc))


### BREAKING CHANGES

* **core:** the generics type params of Page type has been changed



# [2.0.0-beta.37](https://github.com/vuepress/core/compare/v2.0.0-beta.36...v2.0.0-beta.37) (2022-03-31)


### Bug Fixes

* **theme-default:** fallback external-link-icon when the plugin is disabled (close [#766](https://github.com/vuepress/core/issues/766)) ([#769](https://github.com/vuepress/core/issues/769)) ([3628fbf](https://github.com/vuepress/core/commit/3628fbfa96ffd7a9ea218808d8e412e3d8ae7fbd))


### Features

* **plugin-docsearch:** add debounce on search (close [#216](https://github.com/vuepress/core/issues/216)) ([#771](https://github.com/vuepress/core/issues/771)) ([c82f735](https://github.com/vuepress/core/commit/c82f735a54e4b837c77ec4e9e5ef87fd0ba8ddb8))
* **plugin-docsearch:** bump docsearch to 3.0.0 (close [#718](https://github.com/vuepress/core/issues/718)) ([#721](https://github.com/vuepress/core/issues/721)) ([85819c3](https://github.com/vuepress/core/commit/85819c3011005727322804896fedc47c447fe5dd))
* **theme-default:** enhance header dropdown experience ([#736](https://github.com/vuepress/core/issues/736)) ([ad530e7](https://github.com/vuepress/core/commit/ad530e78f95ef71077ad0c2d1b1c7c0054a54ef3))
* **theme-default:** scroll active sidebar item into view ([#698](https://github.com/vuepress/core/issues/698)) ([08b9e9a](https://github.com/vuepress/core/commit/08b9e9a74d07de976da4da14c83279faf759579d))


### Reverts

* feat(theme-default): enhance header dropdown experience ([#736](https://github.com/vuepress/core/issues/736)) ([#786](https://github.com/vuepress/core/issues/786)) ([856be61](https://github.com/vuepress/core/commit/856be61f2f2ae5d16fe46e36ef57fcf31ffe00e4))



# [2.0.0-beta.36](https://github.com/vuepress/core/compare/v2.0.0-beta.35...v2.0.0-beta.36) (2022-03-01)


### Bug Fixes

* avoid user content to be used as string params (close [#727](https://github.com/vuepress/core/issues/727)) ([788afda](https://github.com/vuepress/core/commit/788afdab56e4048f61505280113e4a073f418f4f))
* **bundler-webpack:** allow `configureWebpack` option to return void ([#662](https://github.com/vuepress/core/issues/662)) ([4488cb3](https://github.com/vuepress/core/commit/4488cb31d01cf9a198124631f5e3296d1d0f12ab))
* **theme-default:** fix title style when no content in custom container (close [#648](https://github.com/vuepress/core/issues/648)) ([#657](https://github.com/vuepress/core/issues/657)) ([73d297f](https://github.com/vuepress/core/commit/73d297f321750de098c22c8c774dbe934475ddcb))
* use function to pass a single default slot in render function (close [#716](https://github.com/vuepress/core/issues/716)) ([4550161](https://github.com/vuepress/core/commit/455016192955fb6af74821baf52d3c2c1e4d42c9))


### Features

* **cli:** watch page dependencies on dev ([e6ed487](https://github.com/vuepress/core/commit/e6ed487c6d7002fdde1034a961853218b0eb4418))
* **markdown:** add aria-hidden for line-numbers ([#731](https://github.com/vuepress/core/issues/731)) ([6f5d132](https://github.com/vuepress/core/commit/6f5d13289dd41dbb55d883ff8bff996e77b6daf9))



# [2.0.0-beta.35](https://github.com/vuepress/core/compare/v2.0.0-beta.34...v2.0.0-beta.35) (2022-01-22)


### Bug Fixes

* **cli:** watch user config correctly on win32 (close [#611](https://github.com/vuepress/core/issues/611)) ([055b174](https://github.com/vuepress/core/commit/055b174d5eb30aae76fe409b948da2be5a7fbe58))


### Features

* **client:** allow customizing global computed resolvers (close [#338](https://github.com/vuepress/core/issues/338)) ([405fc8d](https://github.com/vuepress/core/commit/405fc8d7aa579d04b43bf21f926176da761ea2e6))



# [2.0.0-beta.34](https://github.com/vuepress/core/compare/v2.0.0-beta.33...v2.0.0-beta.34) (2022-01-21)


### Bug Fixes

* **theme-default:** add missing color transitions ([0955c9f](https://github.com/vuepress/core/commit/0955c9f48a4811d681f8b20620a1c5134dcb3c14))
* **theme-default:** highlight sidebar heading when used as a link (close [#628](https://github.com/vuepress/core/issues/628)) ([1a5f4fb](https://github.com/vuepress/core/commit/1a5f4fb7bf66671a2b0acbaf5bca47a00a48daaa))


### Code Refactoring

* remove debug plugin ([f8481eb](https://github.com/vuepress/core/commit/f8481eb06b001c81e54cd6fab7d12f1ab75cdbc7))


### Features

* **client:** add vue-devtools support ([a19d945](https://github.com/vuepress/core/commit/a19d945445a4b50455553c1221eaeefda6e73211))
* **plugin-docsearch:** bump docsearch version to support translations ([47a0ef1](https://github.com/vuepress/core/commit/47a0ef149c7acdd8317f83c2a374b80dd39761ef))
* **plugin-external-link-icon:** add locales option ([#636](https://github.com/vuepress/core/issues/636)) ([c7f0c43](https://github.com/vuepress/core/commit/c7f0c43366405ef1a8e6b69aadfb35c9c9361452))
* **plugin-theme-data:** add devtools support ([dab437c](https://github.com/vuepress/core/commit/dab437cc7f331fb8da619485a47d2529cb4ce91a))
* **theme-default:** improve sidebar a11y (close [#604](https://github.com/vuepress/core/issues/604)) ([8033b82](https://github.com/vuepress/core/commit/8033b826123e8d57f00cbd393a10b8a268239fe0))


### BREAKING CHANGES

* `@vuepress/plugin-debug` package has been removed



# [2.0.0-beta.33](https://github.com/vuepress/core/compare/v2.0.0-beta.32...v2.0.0-beta.33) (2022-01-12)


### Bug Fixes

* **core:** should process page hooks inside createPage ([e1cbab5](https://github.com/vuepress/core/commit/e1cbab50bf79f8278fdc4d9a63c21762443a3183))
* **markdown:** replace img src correctly when wrapped with other html tags (close [#597](https://github.com/vuepress/core/issues/597)) ([f2f53ef](https://github.com/vuepress/core/commit/f2f53efc21a1c16c342f32d15562b7153e48ce70))
* **theme-default:** bump vueuse to avoid localstorage error (close [#589](https://github.com/vuepress/core/issues/589)) ([#612](https://github.com/vuepress/core/issues/612)) ([7558681](https://github.com/vuepress/core/commit/755868194a05ae8d1d70fbd14c0230e8080f7db1))


### Features

* **core:** allow theme to set default HTML templates ([4fb7b55](https://github.com/vuepress/core/commit/4fb7b55741bd9a89769c758e71bc341d44d84d3e))
* **plugin-shiki:** bump shiki to 0.10.0 ([9d42e56](https://github.com/vuepress/core/commit/9d42e56c7ea4b74046ef1b41a39fc4862c39e6f3))
* **theme-default:** imporve dark mode experience (close [#387](https://github.com/vuepress/core/issues/387)) ([c20a1ba](https://github.com/vuepress/core/commit/c20a1baa97f4fbbc6a907fb8ca0f76a3cc0310c1))
* **theme-default:** make all non-global components replaceable ([f480bb2](https://github.com/vuepress/core/commit/f480bb25943fe1a81e2ceda8f1b53afbb11b254c))



# [2.0.0-beta.32](https://github.com/vuepress/core/compare/v2.0.0-beta.31...v2.0.0-beta.32) (2021-12-28)


### Bug Fixes

* **theme-default:** avoid transition on fragment child (close [#592](https://github.com/vuepress/core/issues/592)) ([10e5cc0](https://github.com/vuepress/core/commit/10e5cc06b96f9dc2fc8ba2c8bdc83f7177e213bc))


### Code Refactoring

* **core:** normalize core app structure ([6952acf](https://github.com/vuepress/core/commit/6952acfeee4575e53ce468c3d180dc9f623d6cd1))


### Features

* **shared:** improve types of site base ([66943fb](https://github.com/vuepress/core/commit/66943fb185acbc90efbc3c1509a02c9c22963393))


### BREAKING CHANGES

* **core:** config `templateSSR` is renamed to `templateBuild`



# [2.0.0-beta.31](https://github.com/vuepress/core/compare/v2.0.0-beta.30...v2.0.0-beta.31) (2021-12-24)


### Bug Fixes

* **theme-default:** code line numbers unaligned in different display scale (close [#499](https://github.com/vuepress/core/issues/499)) ([21accb5](https://github.com/vuepress/core/commit/21accb5773224363a548915a6f3a7a23a5bcfa0d))
* **theme-default:** remove focus-visible outline (close [#359](https://github.com/vuepress/core/issues/359)) ([cfbaa14](https://github.com/vuepress/core/commit/cfbaa14270df0584594f56abc5a9ac0c8a6b945a))


### Features

* **theme-default:** support collapsible sidebar (close [#397](https://github.com/vuepress/core/issues/397)) ([c7fd815](https://github.com/vuepress/core/commit/c7fd81580a9061b22f1a60a735fdc9a527ef1bfd))



# [2.0.0-beta.30](https://github.com/vuepress/core/compare/v2.0.0-beta.29...v2.0.0-beta.30) (2021-12-23)


### Bug Fixes

* **plugin-back-to-top:** fix regression when upgrading ts-debounce (close [#579](https://github.com/vuepress/core/issues/579)) ([7a6a45b](https://github.com/vuepress/core/commit/7a6a45be5aec933c0bfd983a1e9d35ee1231761d))
* **theme-default:** arrows not displaying in page nav ([#573](https://github.com/vuepress/core/issues/573)) ([2d5b084](https://github.com/vuepress/core/commit/2d5b08400316a1734ddc6451f390ebcd9db3faa3))
* **theme-default:** do not always wrap logo and hero image with client-only ([6b4ee45](https://github.com/vuepress/core/commit/6b4ee45fdba81705af02ed6a55d9c1314ddf360a))


### Features

* **bundler-webpack:** add devServerSetupMiddlewares option ([4a042a4](https://github.com/vuepress/core/commit/4a042a4abc96fc208b6da658782ad3e99fd7af7b))


### BREAKING CHANGES

* **bundler-webpack:** `beforeDevServer` and `afterDevServer` options are removed, use `devServerSetupMiddlewares` instead



# [2.0.0-beta.29](https://github.com/vuepress/core/compare/v2.0.0-beta.28...v2.0.0-beta.29) (2021-12-18)


### Bug Fixes

* **core:** set default bundler option to vite ([3fd11f5](https://github.com/vuepress/core/commit/3fd11f5321e5efbc2a6fdbf28a3b01834e9153b0))
* **core:** use theme after its plugins ([fc5bd91](https://github.com/vuepress/core/commit/fc5bd91bb7dfb9f20bd9e916886a00518ae1989f))


### Features

* extract external link icon to plugin ([437b750](https://github.com/vuepress/core/commit/437b75076667e653d3600c96f9f4a7c3c3e47e57))
* **theme-default:** export default locale options ([e3ac623](https://github.com/vuepress/core/commit/e3ac6230faa75f1557d07753f04670ef29767442))


### BREAKING CHANGES

* config `markdown.links.externalIcon` is removed, use plugin-external-link-icon instead
* frontmatter `externalIcon` is removed, use `externalLinkIcon` from plugin-external-link-icon
* component `OutboundLink` is removed, use `ExternalLinkIcon` from plugin-external-link-icon



# [2.0.0-beta.28](https://github.com/vuepress/core/compare/v2.0.0-beta.27...v2.0.0-beta.28) (2021-12-17)


### Bug Fixes

* **bundler-vite:** flatten the plugins structure to avoid ordering issue (close [#535](https://github.com/vuepress/core/issues/535)) ([b4011ac](https://github.com/vuepress/core/commit/b4011ac9c4f02a0ff06636f6cbb6f68f63d26109))
* **theme-default:** fix kbd color in dark mode ([#503](https://github.com/vuepress/core/issues/503)) ([31bea57](https://github.com/vuepress/core/commit/31bea57f855f322c1119d86bd256a5c98a983c41))
* **theme-default:** use browser default locale in last updated date ([#462](https://github.com/vuepress/core/issues/462)) ([3746e66](https://github.com/vuepress/core/commit/3746e664d79dc1088e94bbb6f2eda2cf6df7cc1c))


### Features

* **core:** replace extendsPageData with extendsPage hook ([827a873](https://github.com/vuepress/core/commit/827a873ca8f7230aeecac208f55934f824774760))
* **core:** support extendsMarkdownOptions hook ([a1fc69b](https://github.com/vuepress/core/commit/a1fc69bdbc65f09eedacc4f860bba1ac7175c4af))
* **core:** support routeMeta in frontmatter ([93cdb53](https://github.com/vuepress/core/commit/93cdb53a6134e43968b56a84f2e8bf012222436a))
* **theme-default:** make the arrows in page nav clickable ([#540](https://github.com/vuepress/core/issues/540)) ([e7b31fd](https://github.com/vuepress/core/commit/e7b31fdad9d6cc410b332458800aa1e00d538643))
* **theme-default:** support heroImageDark frontmatter (close [#526](https://github.com/vuepress/core/issues/526)) ([#559](https://github.com/vuepress/core/issues/559)) ([779ddaa](https://github.com/vuepress/core/commit/779ddaa8cb46d293d3048d5ac2a425ead1322763))
* **vuepress-webpack:** add vuepress-webpack package ([a2d9c9a](https://github.com/vuepress/core/commit/a2d9c9ae95a9e89795bf81cd767a52770ccfa523))
* **vuepress:** switch default bundler to vite ([e1004df](https://github.com/vuepress/core/commit/e1004df6e892f68d31e15f252010d189a3762b52))


### BREAKING CHANGES

* **vuepress:** switch default bundler from webpack to vite
* **core:** now `app.markdown` is only available in and after `onInitialized` hook
* **core:** now `extendsPageOptions` hook does not allow a return value any more
* **core:** `extendsPageData` hook should be migrated to `extendsPage` hook



# [2.0.0-beta.27](https://github.com/vuepress/core/compare/v2.0.0-beta.26...v2.0.0-beta.27) (2021-10-28)


### Bug Fixes

* **shared:** treat ftp links as external (close [#456](https://github.com/vuepress/core/issues/456)) ([9894b56](https://github.com/vuepress/core/commit/9894b5691950545fc90976e7fcc9aee9190ca7f8))
* **theme-default:** avoid ssr-mismatch of dark mode logo (close [#453](https://github.com/vuepress/core/issues/453)) ([aaf1152](https://github.com/vuepress/core/commit/aaf1152495f6f28285f94f9a48c35b1002f522e9))
* **theme-default:** fix code overflow-wrap in Safari (close [#435](https://github.com/vuepress/core/issues/435)) ([6e6fe4f](https://github.com/vuepress/core/commit/6e6fe4fed7cc50f33db0ecd345dc21861f57dc60))
* **theme-default:** hero actions spacing on small devices (close [#381](https://github.com/vuepress/core/issues/381)) ([#442](https://github.com/vuepress/core/issues/442)) ([288927a](https://github.com/vuepress/core/commit/288927a9186cd2d50b0523c8970271d259279d04))


### Features

* **bundler-vite:** compat with vite 2.6 ([bad82eb](https://github.com/vuepress/core/commit/bad82eb89dd85a3b9786fc72fbb9ee299a3909fe))
* **shared:** add isLinkFtp util ([b8f35c9](https://github.com/vuepress/core/commit/b8f35c970f32f723179d229a7e297d5cd6fb2efb))
* **theme-default:** support editLinkPattern frontmatter (close [#450](https://github.com/vuepress/core/issues/450)) ([edecf2d](https://github.com/vuepress/core/commit/edecf2d2b0735200b2b354afabc851ebf43e3225))



# [2.0.0-beta.26](https://github.com/vuepress/core/compare/v2.0.0-beta.25...v2.0.0-beta.26) (2021-09-11)


### Bug Fixes

* **client:** fix aria-hidden attribute of OutboundLink (close [#427](https://github.com/vuepress/core/issues/427)) ([#432](https://github.com/vuepress/core/issues/432)) ([0575ba9](https://github.com/vuepress/core/commit/0575ba9326cbb41a97fa3956e0e28d60af7c9c13))
* **client:** fix wrong attrs selector when loading head tags (close [#426](https://github.com/vuepress/core/issues/426)) ([5654685](https://github.com/vuepress/core/commit/5654685c9674e705b099bc5e1b75ba491205ef83))
* **core:** use absolute path when creating pages (close [#421](https://github.com/vuepress/core/issues/421)) ([0a2f7dc](https://github.com/vuepress/core/commit/0a2f7dc0b17903723e1358cf4d66b20b709241db))


### Features

* **theme-default:** support navbar and sidebar slot for Layout.vue ([a42e431](https://github.com/vuepress/core/commit/a42e431a898240c67471a198fbde33c8805c2850))


### BREAKING CHANGES

* **core:** now `PageOptions` does not accept relative file path



# [2.0.0-beta.25](https://github.com/vuepress/core/compare/v2.0.0-beta.24...v2.0.0-beta.25) (2021-08-29)


### Bug Fixes

* **plugin-git:** add HEAD into git shortlog arguments (close [#205](https://github.com/vuepress/core/issues/205)) ([#398](https://github.com/vuepress/core/issues/398)) ([9be4de1](https://github.com/vuepress/core/commit/9be4de1c02fa0e2574fdac3872bf7afc3611e4ae))
* **theme-default:** improve the style for non-square logo ([#386](https://github.com/vuepress/core/issues/386)) ([ff7c57f](https://github.com/vuepress/core/commit/ff7c57f9b99736d67c01d232b6208fdc2f0d0321))


### Code Refactoring

* add prefix to client constants (close [#392](https://github.com/vuepress/core/issues/392)) ([c6447c4](https://github.com/vuepress/core/commit/c6447c4ba1a98cb5c5ea6991c1fcdd573668c9c1))


### Features

* **bundler-webpack:** bump webpack-dev-server to 4.0.0 ([6e3fc32](https://github.com/vuepress/core/commit/6e3fc324b1bc79c6a743ebe68046dcb10255bc21))


### BREAKING CHANGES

* client constants should add `VUEPRESS` prefix now



# [2.0.0-beta.24](https://github.com/vuepress/core/compare/v2.0.0-beta.23...v2.0.0-beta.24) (2021-08-14)


### Bug Fixes

* **plugin-pwa:** compat with workbox-build 6.2.2 (close [#361](https://github.com/vuepress/core/issues/361)) ([f28e4cb](https://github.com/vuepress/core/commit/f28e4cbc6a1b760440b4bdd1598eded5b47dfec5))
* **theme-default:** avoid recursive ref update in code-group ([ca8404a](https://github.com/vuepress/core/commit/ca8404a12b8ab83ac9904431fac189f61f7e5100))


### Code Refactoring

* **client:** move built-in meta tags to default html template (close [#358](https://github.com/vuepress/core/issues/358)) ([e5c0fec](https://github.com/vuepress/core/commit/e5c0feccb92b6aea4351110c20656dd66a6e0847))


### Features

* **theme-default:** add `logoDark` locale option (close [#283](https://github.com/vuepress/core/issues/283)) ([991c07a](https://github.com/vuepress/core/commit/991c07a26d745b5c13ab320b04d8ee79ac5a6ebc))
* **theme-default:** add css variables for transition ([#325](https://github.com/vuepress/core/issues/325)) ([2b09004](https://github.com/vuepress/core/commit/2b09004cfb65ca15e593c680d8e80f2a28ecd741))
* **theme-default:** improve a11y and animation of sidebar button ([#365](https://github.com/vuepress/core/issues/365)) ([c99861e](https://github.com/vuepress/core/commit/c99861e4c65dfcce8b29c9ce7943944e3d6ca3c1))
* **theme-default:** store dark mode state in local storage (close [#335](https://github.com/vuepress/core/issues/335)) ([9582b3b](https://github.com/vuepress/core/commit/9582b3b72c42b28f74484b55d88bc1fb2d8f56df))


### BREAKING CHANGES

* **client:** the previous built-in meta tags should be manually added to custom html template



# [2.0.0-beta.23](https://github.com/vuepress/core/compare/v2.0.0-beta.22...v2.0.0-beta.23) (2021-08-01)


### Bug Fixes

* **markdown:** encode file path when coverting links (close [#306](https://github.com/vuepress/core/issues/306)) ([920c9ac](https://github.com/vuepress/core/commit/920c9ac9864ad6877606e0839ae0f35695fe5e0c))
* **theme-default:** use constant color for inserted token (close [#296](https://github.com/vuepress/core/issues/296)) ([4596028](https://github.com/vuepress/core/commit/459602898cee7c3ecd5d3c05c83a7db97729a14f))


### Features

* **bundler-webpack:** bump webpack-dev-server to 4.0.0-rc.0 ([816da00](https://github.com/vuepress/core/commit/816da009ea1597e170b754c54253c0797208db1b))
* **core:** store page data in page object (close [#319](https://github.com/vuepress/core/issues/319)) ([c7d3710](https://github.com/vuepress/core/commit/c7d3710f451e2d40ed09a1b2ae516adca0a7ab99))
* **core:** support paths without html extension (close [#292](https://github.com/vuepress/core/issues/292)) ([#324](https://github.com/vuepress/core/issues/324)) ([1d41365](https://github.com/vuepress/core/commit/1d41365f56425384c0c8b919008c344b03ab9431))
* **markdown:** support `code.lineNumbers` to be set to number (close [#231](https://github.com/vuepress/core/issues/231)) ([#276](https://github.com/vuepress/core/issues/276)) ([a7fbdec](https://github.com/vuepress/core/commit/a7fbdec893e01937b392ba40ed9dc8888415f9ed))
* **theme-default:** add `toggleDarkMode` locale option ([#275](https://github.com/vuepress/core/issues/275)) ([a685a1b](https://github.com/vuepress/core/commit/a685a1b9e47ef91da40c27194e927daa63343520))
* **theme-default:** add missing transitions ([066c6e4](https://github.com/vuepress/core/commit/066c6e413986f4246b1812ae88c828254404e5c5))
* **theme-default:** enhance color transitions ([#287](https://github.com/vuepress/core/issues/287)) ([9b96871](https://github.com/vuepress/core/commit/9b968719bee5742cb6e3feb8d7dfbd00d13d0785))
* **theme-default:** enhance color transitions ([#321](https://github.com/vuepress/core/issues/321)) ([aeaa3ba](https://github.com/vuepress/core/commit/aeaa3ba8362af7e4013d419af1db246c657646ff))
* **theme-default:** set dark mode color-scheme ([#289](https://github.com/vuepress/core/issues/289)) ([0b3abd3](https://github.com/vuepress/core/commit/0b3abd37f1201176d057d8bdd870dcbc1ea25079))
* **theme-default:** support page slot for Layout.vue ([a8de0a9](https://github.com/vuepress/core/commit/a8de0a990711a2732f2f85b086e733fbd8a74110))


### BREAKING CHANGES

* **core:** now `extendsPageData` hook is processed before `onInitialized` hook



# [2.0.0-beta.22](https://github.com/vuepress/core/compare/v2.0.0-beta.21...v2.0.0-beta.22) (2021-07-11)


### Bug Fixes

* **bundler-vite:** fallback html requests to index.html (close [#265](https://github.com/vuepress/core/issues/265)) ([665cda3](https://github.com/vuepress/core/commit/665cda3b84f53a62177083af8af6d034b7e1c147))
* **markdown:** resolve assets links in html img tags (close [#254](https://github.com/vuepress/core/issues/254)) ([7cbb163](https://github.com/vuepress/core/commit/7cbb163bf19cbe8e8d682ef9707c3f738486e089))
* **plugin-active-header-links:** update active header link selector ([#259](https://github.com/vuepress/core/issues/259)) ([adaeed5](https://github.com/vuepress/core/commit/adaeed5b71b2746b8d30e0eac7be55a736eefb11))
* **theme-default:** break long links on overflow (close [#266](https://github.com/vuepress/core/issues/266)) ([#273](https://github.com/vuepress/core/issues/273)) ([eb970c3](https://github.com/vuepress/core/commit/eb970c3aa4c4d650cd964b0c1f60d423a7d55125))



# [2.0.0-beta.21](https://github.com/vuepress/core/compare/v2.0.0-beta.20...v2.0.0-beta.21) (2021-07-03)


### Bug Fixes

* **client:** avoid duplicate slash after base in withBase util (close [#246](https://github.com/vuepress/core/issues/246)) ([af9ceff](https://github.com/vuepress/core/commit/af9ceff912466ce538da756dd90d56f697f9ea2d))
* **markdown:** filter permalink symbol in toc (close [#251](https://github.com/vuepress/core/issues/251)) ([5a35806](https://github.com/vuepress/core/commit/5a3580656336349c29abb033a3d732646e111bfd))
* **theme-default:** fix nav glitch at exactly 719px screen width ([#238](https://github.com/vuepress/core/issues/238)) ([3154fbb](https://github.com/vuepress/core/commit/3154fbbc5c3b11e5f2a2310a0895538491fbec8f))
* **theme-default:** use default cursor on non-link sidebar items ([ca22d4f](https://github.com/vuepress/core/commit/ca22d4fe7ade66571f34dc80343f4ec57483b44a))


### Features

* **bundler-vite:** avoid global constants being replaced by vite (close [#244](https://github.com/vuepress/core/issues/244)) ([#245](https://github.com/vuepress/core/issues/245)) ([0c86968](https://github.com/vuepress/core/commit/0c869684c4e179347eebc38d916a0dfd2115b321))



# [2.0.0-beta.20](https://github.com/vuepress/core/compare/v2.0.0-beta.19...v2.0.0-beta.20) (2021-06-26)


### Bug Fixes

* **core:** invoke extendsPageOptions hook in createPage ([76292aa](https://github.com/vuepress/core/commit/76292aac7000e2bf924c563ff7452624008102cd))


### Features

* **markdown:** bump markdown-it-anchor to 8.0.4 ([41338f7](https://github.com/vuepress/core/commit/41338f7d656bf9e692c3ff22e05e4b3c1a9cbd6f))
* **plugin-pwa:** bump mitt to 3.0.0 ([8e2eb33](https://github.com/vuepress/core/commit/8e2eb3358baa91c410adffb01f218404c4a4f393))
* **theme-default:** refine sidebar config ([ea7c4bb](https://github.com/vuepress/core/commit/ea7c4bbac269f2f9ade4d58cb77dad27055d9bc0))


### BREAKING CHANGES

* **markdown:** `markdown.anchor` has changed, see changelog of markdown-it-anchor 8.0.0
* **theme-default:** `isGroup` field of sidebar config is removed
* **core:** extendsPageOptions now accept page options as the first argument



# [2.0.0-beta.19](https://github.com/vuepress/core/compare/v2.0.0-beta.18...v2.0.0-beta.19) (2021-06-19)


### Bug Fixes

* **bundler-vite:** resolve client entry url correctly (close [#190](https://github.com/vuepress/core/issues/190)) ([36babba](https://github.com/vuepress/core/commit/36babba394eccc070838c6d0861e91924d305e26))
* **bundler-webpack:** sync types of webpack-dev-server 4 (close [#208](https://github.com/vuepress/core/issues/208)) ([207014b](https://github.com/vuepress/core/commit/207014b087d29f43bd01604954e33277b6b19150))


### Features

* **bundler-webpack:** support vue-loader options ([5a51912](https://github.com/vuepress/core/commit/5a51912d974ba4a83a9586b40cb7cb7982c6c81b))
* **theme-default:** support activeMatch in navbar config ([ab0c6d1](https://github.com/vuepress/core/commit/ab0c6d1544e62b505547c45afe6347fdb735c011))
* **theme-default:** support disabling dark mode ([6517ce1](https://github.com/vuepress/core/commit/6517ce1c66219fc45f0cb645f3db30e275e592bf))



# [2.0.0-beta.18](https://github.com/vuepress/core/compare/v2.0.0-beta.17...v2.0.0-beta.18) (2021-06-12)


### Bug Fixes

* **plugin-search:** disable default form action on Enter key ([#189](https://github.com/vuepress/core/issues/189)) ([81b5b24](https://github.com/vuepress/core/commit/81b5b24379c44ddcf83b38b086f6f2905453f58b))
* **plugin-toc:** exclude h1 header in toc ([5e96641](https://github.com/vuepress/core/commit/5e96641b8d2dd947372222e0af2ea47729afbada))
* **theme-default:** exclude h1 header in sidebar ([280626d](https://github.com/vuepress/core/commit/280626dd33f5006d6611f6e121eb5edfad8a258e))
* **theme-default:** show outline of toggle-dark-button ([bc94de0](https://github.com/vuepress/core/commit/bc94de0cb3a9454ac0a3e72f3df07326568057d2))


### Code Refactoring

* **core:** drop support for plugin nesting ([f7da97f](https://github.com/vuepress/core/commit/f7da97f7f0ff24984cc6a2d0926b5fdf3af274c5))
* **core:** resolve page title from markdown env ([09d08a4](https://github.com/vuepress/core/commit/09d08a4b89af16fcb833774e902b4d5404181689))


### Features

* **cli:** watch dependencies of user config file ([b220524](https://github.com/vuepress/core/commit/b220524f1534a1ada3b896854dba181e8ea36221))
* **markdown:** add extract-title plugin ([e0a1556](https://github.com/vuepress/core/commit/e0a1556a1469cd71469f5c81e2d058a5e9b9d801))


### Performance Improvements

* **bundler-vite:** make server build lighter ([a6ddea5](https://github.com/vuepress/core/commit/a6ddea5fd1a1979f5d3a7cc460e1602cb5254f08))


### BREAKING CHANGES

* **core:** a plugin cannot use other plugins anymore
* **core:** markdown emoji syntax is not supported in frontmatter title



# [2.0.0-beta.17](https://github.com/vuepress/core/compare/v2.0.0-beta.16...v2.0.0-beta.17) (2021-06-04)


### Bug Fixes

* **theme-default:** avoid long inline code breaking the layout ([#180](https://github.com/vuepress/core/issues/180)) ([ada2e2a](https://github.com/vuepress/core/commit/ada2e2a884749d9654c3550c4bb92611ea29906c))
* **theme-default:** fix error of sidebar resolving (close [#185](https://github.com/vuepress/core/issues/185)) ([6a96af0](https://github.com/vuepress/core/commit/6a96af0b480b04a3c2564739e87a0ae786756581))
* **theme-default:** respect root-level custom container config (close [#175](https://github.com/vuepress/core/issues/175)) ([f2ad5f0](https://github.com/vuepress/core/commit/f2ad5f0e988b075cfa37726d67feb8fa54f6176b))


### Features

* **core:** support multi-level theme inheritance ([5df8662](https://github.com/vuepress/core/commit/5df86621cfcd7b138e473d40dc622e6ff8e0795f))
* **theme-default:** improve a11y of CodeGroup ([#163](https://github.com/vuepress/core/issues/163)) ([2b76463](https://github.com/vuepress/core/commit/2b7646399116114a967a5df64266c6879babb10f))


### BREAKING CHANGES

* **core:** `app.themeApi` is removed
* **theme-default:** default title of danger container is changed to "DANGER"



# [2.0.0-beta.16](https://github.com/vuepress/core/compare/v2.0.0-beta.15...v2.0.0-beta.16) (2021-05-28)


### Bug Fixes

* **plugin-pwa-popup:** increase default z-index ([67242e8](https://github.com/vuepress/core/commit/67242e896f52c09c1e42566a32ae10291d0fb648))
* **theme-default:** increase medium-zoom delay ([9c92443](https://github.com/vuepress/core/commit/9c9244385f4fe6f65115cab6ba08f47dffc1580a))


### Features

* **bundler-vite:** configure postcss by default ([6197578](https://github.com/vuepress/core/commit/61975781151ace783f3021bd6a3c55c4fa7b12bd))
* **plugin-back-to-top:** add z-index variable ([3d7d4a4](https://github.com/vuepress/core/commit/3d7d4a4ba173dab4c3ad80abea5ac96cc1eb0bde))
* **plugin-medium-zoom:** add more css variables (close [#174](https://github.com/vuepress/core/issues/174)) ([d717800](https://github.com/vuepress/core/commit/d71780094839db02424b60f3a2877871e34eaf64))
* **plugin-nprogress:** add z-index variable ([151e087](https://github.com/vuepress/core/commit/151e087c289a387d7ff77654059de9d71910263a))
* **plugin-pwa-popup:** add more css variables ([3ae6f72](https://github.com/vuepress/core/commit/3ae6f72a1fb981ff132325637d5996c5c07b52f2))



# [2.0.0-beta.15](https://github.com/vuepress/core/compare/v2.0.0-beta.14...v2.0.0-beta.15) (2021-05-27)


### Bug Fixes

* **markdown:** decode assets link to ensure bundler can find the file ([#144](https://github.com/vuepress/core/issues/144)) ([d3e5409](https://github.com/vuepress/core/commit/d3e5409246a47edae93209c9ce5dd2614e14c936))
* **theme-default:** handle rotate events on iPad ([#150](https://github.com/vuepress/core/issues/150)) ([bbdda60](https://github.com/vuepress/core/commit/bbdda60bba0a56590535f3e762dec55767ec031c))
* **theme-default:** show header anchors when being focused ([#164](https://github.com/vuepress/core/issues/164)) ([8de5f0f](https://github.com/vuepress/core/commit/8de5f0fa2873f64be0622aced46e1512c7f4fac5))


### Features

* **bundler-webpack:** bump webpack-dev-server to 4.0.0-beta.3 ([2e86826](https://github.com/vuepress/core/commit/2e8682680eba7736bcf3325014a927a87503ba0b))
* **cli:** allow setting default app config ([41f9dc6](https://github.com/vuepress/core/commit/41f9dc612d65a7aae777a75ee00715f0b7bab7c6))
* **plugin-search:** add --search-bg-color variable ([6c778a8](https://github.com/vuepress/core/commit/6c778a83b5d26529c830057aadc9c6fde8dc1805))
* **plugin-search:** improve a11y support ([#165](https://github.com/vuepress/core/issues/165)) ([205aafe](https://github.com/vuepress/core/commit/205aafe4e6600987e06730b926abe2be3e4d5d73))
* **theme-default:** support dark mode (close [#29](https://github.com/vuepress/core/issues/29)) ([680e429](https://github.com/vuepress/core/commit/680e4298a80ddb06b0381af48644124ffb0b0c4c))
* **theme-default:** support full link for github repo ([#152](https://github.com/vuepress/core/issues/152)) ([8a5055b](https://github.com/vuepress/core/commit/8a5055b57d2068e73b4a1c52601c94bdbbc1a7c5))
* **theme-default:** support Gitee repo ([5cad664](https://github.com/vuepress/core/commit/5cad664bd7224a08e679dc06f61f17af6c790b97))


### BREAKING CHANGES

* **theme-default:** most sass variables are migrated to css variables



# [2.0.0-beta.14](https://github.com/vuepress/core/compare/v2.0.0-beta.13...v2.0.0-beta.14) (2021-05-12)


### Bug Fixes

* **bundler-vite:** compat with vite 2.3 changes (close [#134](https://github.com/vuepress/core/issues/134)) ([1370984](https://github.com/vuepress/core/commit/13709840080d17c6c239af53a212258d9157ffae))
* **core:** avoid mutating theme layouts array ([fe27a57](https://github.com/vuepress/core/commit/fe27a57c57bd92623ef4c3df6ce4282b8eda6f71))


### Features

* **core:** allow alias and define hook to return a promise ([3b3d289](https://github.com/vuepress/core/commit/3b3d2893c58115de65606ffc508fdc7a9cf96f79))



# [2.0.0-beta.13](https://github.com/vuepress/core/compare/v2.0.0-beta.12...v2.0.0-beta.13) (2021-05-06)


### Bug Fixes

* **bundler-vite:** make site base work in vite dev (close [#126](https://github.com/vuepress/core/issues/126)) ([d257e01](https://github.com/vuepress/core/commit/d257e01b69a8b4d0032b75be233b1c381289b529))
* **core:** path of page options should have the highest priority ([0fc6fd3](https://github.com/vuepress/core/commit/0fc6fd38225816b6bfc59fb12de837634c7ffb5d))
* **markdown:** ensure ending newline in import code ([160df2d](https://github.com/vuepress/core/commit/160df2de1567a3b6b3e889b86e6bd7b95a3cc77b))


### Features

* **markdown:** allow omitting start or end of import code lines range ([21bba5c](https://github.com/vuepress/core/commit/21bba5c86bc8e8dec1c86f820e9de27cf15919b2))



# [2.0.0-beta.12](https://github.com/vuepress/core/compare/v2.0.0-beta.11...v2.0.0-beta.12) (2021-04-30)


### Bug Fixes

* **core:** avoid uri encoded filename ([4ff7f3b](https://github.com/vuepress/core/commit/4ff7f3b287936cce0f9cfe5c8689c2efbb2b52aa))
* **theme-default:** align the font of line numbers with code blocks (close [#124](https://github.com/vuepress/core/issues/124)) ([#125](https://github.com/vuepress/core/issues/125)) ([a3ea87d](https://github.com/vuepress/core/commit/a3ea87d507a644dc31bf9ffbb5703eb99342cc60))


### Features

* **core:** add deps to page object ([83c9aae](https://github.com/vuepress/core/commit/83c9aaedcaf531d72d70ad514b9dd8ddf2e508d1))
* **core:** make filePath available in markdown env ([aa52549](https://github.com/vuepress/core/commit/aa52549648b175626d3eafabe8629a78a8caf8e5))
* **markdown:** support import code blocks (close [#15](https://github.com/vuepress/core/issues/15)) ([fe20ccc](https://github.com/vuepress/core/commit/fe20cccf3d44565c7fcb890e8ebf2aa4659ab3e1))


### Performance Improvements

* **core:** reduce page data and component file size ([4c6eea5](https://github.com/vuepress/core/commit/4c6eea5188e804cb3f6c7648d6528d43002618ae))
* **core:** reduce routes file size ([d926a17](https://github.com/vuepress/core/commit/d926a170ee5f384845f5b166029fbc392f51dcde))


### BREAKING CHANGES

* **core:** `pagePath` prop of `<Content>` renamed to `pageKey`



# [2.0.0-beta.11](https://github.com/vuepress/core/compare/v2.0.0-beta.10...v2.0.0-beta.11) (2021-04-28)


### Bug Fixes

* **bundler-vite:** make the timestamp of client entry consistent ([4bbff4c](https://github.com/vuepress/core/commit/4bbff4c22f67c456a0f4dcfe3ddf5724902a4d2a))


### Performance Improvements

* **core:** merge page routes to reduce requests in vite dev ([fa2a614](https://github.com/vuepress/core/commit/fa2a61413c70afd426f74e57e6e5d2a4900c6568))
* do not register hooks in dev mode for prod-only plugins ([d5af139](https://github.com/vuepress/core/commit/d5af1398f059c075783c0c58456cef7b41bcaaf9))
* specify optimizeDeps for vite dev ([0d77331](https://github.com/vuepress/core/commit/0d773312181380114cba16f61b633a5266dd1cf3))



# [2.0.0-beta.10](https://github.com/vuepress/core/compare/v2.0.0-beta.9...v2.0.0-beta.10) (2021-04-27)


### Bug Fixes

* **bundler-vite:** avoid client code to be optimized or externalized ([f8a088d](https://github.com/vuepress/core/commit/f8a088db5f428087a58dec4823627a9e3b447a75))
* **bundler-vite:** disable clearScreen in dev by default ([e7bfe49](https://github.com/vuepress/core/commit/e7bfe49d10aa8d3c5121120435ed5076fbe80a27))
* **cli:** do not clean cache and temp on restart ([047a52c](https://github.com/vuepress/core/commit/047a52c265db355de3aaa298c14150779e9182f4))
* **client:** implement ClientOnly correctly ([e27872d](https://github.com/vuepress/core/commit/e27872d89f1e6894ebc734e2e26c800bea82e162))
* **client:** make hydration work properly (close [#123](https://github.com/vuepress/core/issues/123)) ([34a5364](https://github.com/vuepress/core/commit/34a5364ad6005e64a3e726296b9b8b73318fcbd4))
* **core:** allow extendsMarkdown to return a promise ([a4be2fd](https://github.com/vuepress/core/commit/a4be2fda5952f64da2db6ba837b94bfb4e1315ce))


### Features

* **bundler-vite:** bump vite to 2.2.1 to support cacheDir ([d7f685b](https://github.com/vuepress/core/commit/d7f685b5d729d9f8c9f858673355a37cb22fc90e))
* **client:** support custom layout ([c32866d](https://github.com/vuepress/core/commit/c32866d769cb5a29fb811fd2f00e06d7b94e1508))
* **markdown:** support externalIcon in config and frontmatter ([#122](https://github.com/vuepress/core/issues/122)) ([d1389bc](https://github.com/vuepress/core/commit/d1389bc6c0eee3ad2fe83d5636fd293d0710e0fb))
* **plugin-search:** add search plugin (close [#35](https://github.com/vuepress/core/issues/35)) ([70bb066](https://github.com/vuepress/core/commit/70bb0668c53b984f17bdbf7b95ac8e3258034e73))
* **theme-default:** compat with docsearch and search plugin ([cb00182](https://github.com/vuepress/core/commit/cb0018257c2c6b4b21e2add5f73e7213b537fb6f))
* **theme-default:** support pageClass frontmatter (close [#118](https://github.com/vuepress/core/issues/118)) ([809d575](https://github.com/vuepress/core/commit/809d5750c36662e894be566c0ff53c2f2a700da0))
* **theme-default:** support sidebarDepth ([b79ba90](https://github.com/vuepress/core/commit/b79ba90f8e4cb93d76dac1f284131cf618aee784))



# [2.0.0-beta.9](https://github.com/vuepress/core/compare/v2.0.0-beta.8...v2.0.0-beta.9) (2021-04-21)


### Bug Fixes

* **core:** allow plugin itself as an item of plugin config array ([1fa8903](https://github.com/vuepress/core/commit/1fa8903549d8f9eba3fc49e3117ee2018993b496))
* **core:** ensure trailing slash of page path (close [#114](https://github.com/vuepress/core/issues/114)) ([cbcf166](https://github.com/vuepress/core/commit/cbcf16624602e37c17935211ac4076c72db22507))
* **markdown:** do not escape extracted headers (close [#117](https://github.com/vuepress/core/issues/117)) ([81b1336](https://github.com/vuepress/core/commit/81b133622a00e6474f0bfe4a58e35bfab9fe3e49))
* **plugin-back-to-top:** fix back-to-top styles ([933643a](https://github.com/vuepress/core/commit/933643aa9c24458eb914429b21f5ec22f6b23f9a))
* **theme-default:** remove font-smothing in code block ([41c281e](https://github.com/vuepress/core/commit/41c281e016c77dc5f1d9d12e8917814e48af1424))


### Code Refactoring

* **core:** move evergreen option to bundler-webpack ([58c30c1](https://github.com/vuepress/core/commit/58c30c1207f0f6e09e9d68096786ef189c67e9db))


### Features

* **client:** provide client types file ([89a32b5](https://github.com/vuepress/core/commit/89a32b50767ef82556f5ae3300ec016e0acaf0e5))
* **core:** make frontmatter available in markdown env ([f977192](https://github.com/vuepress/core/commit/f97719237db9d14c94716bf6b18fe52519a008cf))
* **plugin-palette:** add watchers for palette and style files ([0cf1b9b](https://github.com/vuepress/core/commit/0cf1b9b346de2bc62789a940699298ee9e2873db))
* **plugin-register-components:** add register components plugin (close [#112](https://github.com/vuepress/core/issues/112)) ([6af204d](https://github.com/vuepress/core/commit/6af204df76b8f6969aef0fc061a64a796deb24ab))
* **theme-default:** add more palette variables for code styles ([db8e0f4](https://github.com/vuepress/core/commit/db8e0f4870b051184a4d4b3c5b17497e302b0b11))


### BREAKING CHANGES

* **core:** `evergreen` option is moved to `bundlerConfig.evergreen` for bundler-webpack



# [2.0.0-beta.8](https://github.com/vuepress/core/compare/v2.0.0-beta.7...v2.0.0-beta.8) (2021-04-11)


### Bug Fixes

* **plugin-docsearch:** provide default value for locales (close [#107](https://github.com/vuepress/core/issues/107)) ([491eb64](https://github.com/vuepress/core/commit/491eb6416664775c366c0fb2a67388fe37098e2c))
* **plugin-pwa-popup:** provide default value for locales ([f7cbc15](https://github.com/vuepress/core/commit/f7cbc15669c731e6598657c8048abe9cdfa4ee40))


### Code Refactoring

* **core:** resolve theme when creating app ([fa683cb](https://github.com/vuepress/core/commit/fa683cb76e8a3bcacc08d1dfd8bea6af79fee1d2))
* normalize themes and plugins structure ([7781172](https://github.com/vuepress/core/commit/77811722401bf1ed1fec44c64158ab0cd1ab3179))


### Features

* **markdown:** support internalTag option in links plugin ([1872ad9](https://github.com/vuepress/core/commit/1872ad95d7c86247883c24f2ec86db07d7596923))
* **utils:** add logger.createError method ([0c198d7](https://github.com/vuepress/core/commit/0c198d7f9e122828b37a2db670048cfc2ce20e81))


### BREAKING CHANGES

* client API that provided by plugins should be imported from `plugin-foo/lib/client`
* **core:** theme plugins could be overridden by user plugins now



# [2.0.0-beta.7](https://github.com/vuepress/core/compare/v2.0.0-beta.6...v2.0.0-beta.7) (2021-04-09)


### Bug Fixes

* **bundler-webpack:** always extract css file in build mode ([accc484](https://github.com/vuepress/core/commit/accc484f95485a6013aad573f562565c16ac5ff8))
* **client:** install vue-router after clientAppEnhance (close [#100](https://github.com/vuepress/core/issues/100)) ([2f5450f](https://github.com/vuepress/core/commit/2f5450f0b8dcc4aa49b1c19a1adea6e84a1594c4))
* **client:** make page data hmr work as expected ([374ae43](https://github.com/vuepress/core/commit/374ae43545c982ecc8762776035cc92359b874f5))
* **theme-default:** allow direct img children to be zoomable (close [#84](https://github.com/vuepress/core/issues/84)) ([832bd6f](https://github.com/vuepress/core/commit/832bd6fbbd9612e2209a28ed89a49bf9eb658838))


### Features

* **bundler-webpack:** bump webpack-dev-server to 4.0.0-beta.2 ([dd8c408](https://github.com/vuepress/core/commit/dd8c40875cca382450d2758b2c7609bb69332d19))
* **core:** show warning when duplicate plugins are detected ([742f581](https://github.com/vuepress/core/commit/742f5811032b3a2f0687edf3f966d25517734a8d))
* **plugin-toc:** add toc plugin ([0ea1720](https://github.com/vuepress/core/commit/0ea1720ae3ed2007f0232123bfd7de77af6ae383))



# [2.0.0-beta.6](https://github.com/vuepress/core/compare/v2.0.0-beta.5...v2.0.0-beta.6) (2021-03-26)


### Reverts

* refactor(client): remove extra handling for router base ([6205279](https://github.com/vuepress/core/commit/620527917e4d3ee7cfa4c1db7d3cadc36a30eaab))



# [2.0.0-beta.5](https://github.com/vuepress/core/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2021-03-26)


### Bug Fixes

* **client:** ensure page component is loaded before route resolve ([598adf3](https://github.com/vuepress/core/commit/598adf38b1f9edd3034bb011358a1a9d3bcb6b9e))
* **markdown:** avoid wrapping highlighted code with multiple pre ([f0b3872](https://github.com/vuepress/core/commit/f0b38722f1a06c736366a36d7c4888952d28c947))
* **plugin-prismjs:** avoid loading languages multiple times ([4af5005](https://github.com/vuepress/core/commit/4af50053c03408fc9e2e5426df89ae340de0e824))
* **theme-default:** add active class to sidebar group heading ([8dcb945](https://github.com/vuepress/core/commit/8dcb9457c532de8076f94b3b165c1347e9bd9c86))
* **theme-default:** allow NavLink in sidebar children ([ea50010](https://github.com/vuepress/core/commit/ea5001076b86a7dc8b807811796a8ed44fbcf7b9))
* **theme-default:** make navlink active in subpath (close [#70](https://github.com/vuepress/core/issues/70)) ([4c865b1](https://github.com/vuepress/core/commit/4c865b16430d0e72b0ac1103f9579a93f248bf9c))
* **theme-default:** make nested sidebar groups work ([4ada701](https://github.com/vuepress/core/commit/4ada701062db400787c41008942354f6947bf80b))
* **theme-default:** make scrollBehavior work with transition (close [#77](https://github.com/vuepress/core/issues/77)) ([4b8d0cf](https://github.com/vuepress/core/commit/4b8d0cff2d7fa3d74d69d551976a3b12263e6124))


### Features

* **plugin-shiki:** add shiki plugin ([66bbcbd](https://github.com/vuepress/core/commit/66bbcbde497cca525fc585b4046b11784e8d61bc))


### Performance Improvements

* improve HMR support ([38f0073](https://github.com/vuepress/core/commit/38f007335864db4c9125ea5905ca91850fb7103b))



# [2.0.0-beta.4](https://github.com/vuepress/core/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2021-03-20)


### Bug Fixes

* **bundler-vite:** disable auto resolving vite config file ([57967f7](https://github.com/vuepress/core/commit/57967f7dec27c4148edf920decead327cc8746bf))


### Code Refactoring

* **markdown:** remove default syntax highlighter ([4a1abe3](https://github.com/vuepress/core/commit/4a1abe39335eaaf3ef1dca3e35a324b12981c0d2))


### Features

* **plugin-prismjs:** add prismjs plugin ([638ad8a](https://github.com/vuepress/core/commit/638ad8afdf9f3fe779e9eb1d02dca6c1caef0307))
* **theme-default:** use prismjs plugin ([f131de4](https://github.com/vuepress/core/commit/f131de4783685dbabfde4e4966182d570224a246))


### BREAKING CHANGES

* **markdown:** prismjs is no longer the default syntax highlighter



# [2.0.0-beta.3](https://github.com/vuepress/core/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2021-03-17)


### Bug Fixes

* **bundler-vite:** fix fs path on windows (close [#74](https://github.com/vuepress/core/issues/74)) ([db3c3e8](https://github.com/vuepress/core/commit/db3c3e8639d040aa8b408006d48b160a0b234e12))


### Features

* **cli:** show info of vite related packages ([73a66df](https://github.com/vuepress/core/commit/73a66df2c19b4b292e5f7b48cb967490a0a5dd69))



# [2.0.0-beta.2](https://github.com/vuepress/core/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2021-03-14)


### Bug Fixes

* **bundler-vite:** avoid optimizing client package ([5708934](https://github.com/vuepress/core/commit/57089344f87bf381f8e6f2711eb6df9364c72432))
* **bundler-vite:** workaround for vitejs/vite[#2503](https://github.com/vuepress/core/issues/2503) ([055b280](https://github.com/vuepress/core/commit/055b280a8488c42614702533cc9eb8fb2852c71b))
* **plugin-nprogress:** always optimize nprogress with vite ([2aeb2bf](https://github.com/vuepress/core/commit/2aeb2bf9b70b149bf2e56d2fd1b593e6628d72dd))



# [2.0.0-beta.1](https://github.com/vuepress/core/compare/v2.0.0-beta.0...v2.0.0-beta.1) (2021-03-13)



# [2.0.0-beta.0](https://github.com/vuepress/core/compare/v2.0.0-alpha.26...v2.0.0-beta.0) (2021-03-13)


### Bug Fixes

* **plugin-google-analytics:** fix types ([92aa486](https://github.com/vuepress/core/commit/92aa48629d0355808a15942594e499d39bb3f1e7))


### Features

* **bundler-vite:** add vite support :zap: ([7d612c4](https://github.com/vuepress/core/commit/7d612c45d83d42b246316f93cc3385a9968307af))
* **cli:** add defineUserConfig util ([c20f7b7](https://github.com/vuepress/core/commit/c20f7b7be5d04cb247d699c31bf6f68071180df6))
* **client:** add defineClientAppEnhance and defineClientAppSetup utils ([1520517](https://github.com/vuepress/core/commit/15205172c3b56fc8a879bba040f4ecc815d2c924))
* implement vite hmr ([525c18d](https://github.com/vuepress/core/commit/525c18d5a64fbdbdeb5ce1348ec1e1ead3dbd8f9))
* **theme-default:** use sass as css pre-processor ([7eb1fd8](https://github.com/vuepress/core/commit/7eb1fd8b8901d3f2c2335ad550b7d601a9354826))
* **vuepress-vite:** add vuepress-vite package ([03a6583](https://github.com/vuepress/core/commit/03a658364d8c5f0b2510e10cd2bf8ec8bcbf41cb))


### BREAKING CHANGES

* **theme-default:** the palette system of default theme is migrated to sass



# [2.0.0-alpha.26](https://github.com/vuepress/core/compare/v2.0.0-alpha.25...v2.0.0-alpha.26) (2021-02-24)


### Bug Fixes

* **cli:** add theme-data plugin and rename palette plugin ([97ce42b](https://github.com/vuepress/core/commit/97ce42bddbfcef5e66476c2355e031e54d9176ea))


### Features

* **bundler-webpack:** enable options API by default ([e29b6e1](https://github.com/vuepress/core/commit/e29b6e1bb1ba89b7d440e54dafe3a84ecf4273db))
* **plugin-palette:** add palette plugin ([556a23c](https://github.com/vuepress/core/commit/556a23cc9076f972deb3d5c0905441b63b700682))


### BREAKING CHANGES

* **plugin-palette:** migrate `@vuepress/plugin-palette-stylus` to `@vuepress/plugin-palette`



# [2.0.0-alpha.25](https://github.com/vuepress/core/compare/v2.0.0-alpha.24...v2.0.0-alpha.25) (2021-02-20)


### Bug Fixes

* **markdown:** do not treat autolink as a component (close [#60](https://github.com/vuepress/core/issues/60)) ([9f6cffa](https://github.com/vuepress/core/commit/9f6cffa1e0c39d0caf9f7ab34c5f06f36a87948b))


### Code Refactoring

* **core:** remove theme data from site data ([187aef3](https://github.com/vuepress/core/commit/187aef36607efc62d7b2d5c773553f89685cf64c))


### Features

* **plugin-theme-data:** extract theme data injection to a plugin ([e971e39](https://github.com/vuepress/core/commit/e971e3964cf11361ac267501768b0f8bc7dba909))


### BREAKING CHANGES

* **core:** `themeConfig` is not available in site data any more



# [2.0.0-alpha.24](https://github.com/vuepress/core/compare/v2.0.0-alpha.23...v2.0.0-alpha.24) (2021-02-13)


### Code Refactoring

* **core:** change page default date to 0000-00-00 ([1ce602e](https://github.com/vuepress/core/commit/1ce602ef811f29f083a8d10695a7b212ed82cae5))
* **core:** remove permalink and pattern from page options ([9534989](https://github.com/vuepress/core/commit/9534989a82e620b1c09b4a09d4cfee1e99d145fc))


### Features

* **core:** add extendsPageOptions hook ([19b7e83](https://github.com/vuepress/core/commit/19b7e83cb25ec523857d34c415782d595a05d0ff))
* **core:** add watchers parameter to onWatched hook ([0bcd594](https://github.com/vuepress/core/commit/0bcd594d1645fe9994d1456e86803e5619057bfb))


### BREAKING CHANGES

* **core:** remove permalink and pattern from page options
* **core:** change page default date from 1970-01-01 to 0000-00-00



# [2.0.0-alpha.23](https://github.com/vuepress/core/compare/v2.0.0-alpha.22...v2.0.0-alpha.23) (2021-02-10)


### Bug Fixes

* **markdown:** remove site base from internal links (close [#58](https://github.com/vuepress/core/issues/58)) ([a8c7fdd](https://github.com/vuepress/core/commit/a8c7fdd86a9c4f08c51673f3dba0451455a731d2))



# [2.0.0-alpha.22](https://github.com/vuepress/core/compare/v2.0.0-alpha.21...v2.0.0-alpha.22) (2021-02-10)


### Bug Fixes

* **client:** only watch route path to update head ([3174f5a](https://github.com/vuepress/core/commit/3174f5a676d95943df256b2be31227eb844d0144))
* **plugin-debug:** avoid enabling in production mode (close [#53](https://github.com/vuepress/core/issues/53)) ([9612282](https://github.com/vuepress/core/commit/961228234e3983f1f84f992a1317316d09f8cb98))



# [2.0.0-alpha.21](https://github.com/vuepress/core/compare/v2.0.0-alpha.20...v2.0.0-alpha.21) (2021-02-05)


* feat(plugin-google-analytics)!: migrate to google analytics 4 (close #36) ([d2393f7](https://github.com/vuepress/core/commit/d2393f7970c346bfcef2e72658f9a4a89a93b396)), closes [#36](https://github.com/vuepress/core/issues/36)


### Features

* **plugin-git:** collect page created time (close [#45](https://github.com/vuepress/core/issues/45)) ([4045a8c](https://github.com/vuepress/core/commit/4045a8c1ab591dbbb0303aa43c6d13bf248d995c))


### BREAKING CHANGES

* migrate to google analytics 4 and drop v3 support



# [2.0.0-alpha.20](https://github.com/vuepress/core/compare/v2.0.0-alpha.19...v2.0.0-alpha.20) (2021-02-04)


### Bug Fixes

* **plugin-medium-zoom:** always refresh medium-zoom with delay ([2495f5d](https://github.com/vuepress/core/commit/2495f5d30fa75b50c203919abf2d8dab7dfda2d9))
* **theme-default:** fix max width of navbar links wrapper ([846e60c](https://github.com/vuepress/core/commit/846e60ca9f0137f54a96df7589df4ea4cd99f18a))
* **theme-default:** remove extra rem in styles (close [#50](https://github.com/vuepress/core/issues/50)) ([9b1b852](https://github.com/vuepress/core/commit/9b1b852a9c11c28b43253f87b40362693ad2cb95))


### Features

* **core:** create siteData in vuepress app ([05b87dd](https://github.com/vuepress/core/commit/05b87ddf32f32c94cc131e0074365aeba70f85f2))
* **core:** make language available in page data ([03bb09f](https://github.com/vuepress/core/commit/03bb09fd51aeaff56d26820a1401b87ea8bdeb38))



# [2.0.0-alpha.19](https://github.com/vuepress/core/compare/v2.0.0-alpha.18...v2.0.0-alpha.19) (2021-01-24)


### Bug Fixes

* **cli:** add esbuild external ([8d285ea](https://github.com/vuepress/core/commit/8d285ea88946683d96d46a379d4215963338dff4))


### Features

* **core:** add onWatched hook ([9725a10](https://github.com/vuepress/core/commit/9725a101599363094a85916317109b67d365dff4))
* **plugin-docsearch:** allow more fields in locales config ([ce1cf18](https://github.com/vuepress/core/commit/ce1cf18248129f44651b33091329c4366320131b))



# [2.0.0-alpha.18](https://github.com/vuepress/core/compare/v2.0.0-alpha.17...v2.0.0-alpha.18) (2021-01-17)


### Bug Fixes

* **client:** load existing head tags on mounted ([15722c5](https://github.com/vuepress/core/commit/15722c5175e44a8d6363bfe5f138f2c2c8edeec3))
* **markdown:** load some languages by default to partially avoid prism issue ([48c085a](https://github.com/vuepress/core/commit/48c085af6a8751211fe7180a82bb67ff5a7b191f))
* **theme-default:** fix homepage frontmatter type ([9cf2d28](https://github.com/vuepress/core/commit/9cf2d288e115d335f6ff9f1a849a2ce82db799c9))
* **theme-default:** fix sidebar config override ([2c2c280](https://github.com/vuepress/core/commit/2c2c2801be716dfb102345090888fd1e22a0ac92))
* **theme-default:** make sr-only tags unselectable ([0f6488e](https://github.com/vuepress/core/commit/0f6488e3a00674c0670737c8831763db0a0ffa93))


### Features

* **client:** make usePageFrontmatter generic ([2c5e5c1](https://github.com/vuepress/core/commit/2c5e5c1400469a3cb4da2856104514a9413bff8a))
* **shared:** optimize frontmatter type and support generics ([8a7025f](https://github.com/vuepress/core/commit/8a7025ff39b4656f98f9a35e93848373ce72ddbe))
* **theme-default:** add code-group custom container ([d0a20aa](https://github.com/vuepress/core/commit/d0a20aaacefc78708a4181c53704b28c60b520b4))
* **theme-default:** add page transition ([845cc2c](https://github.com/vuepress/core/commit/845cc2cb64223b856261bfc7b384dec6557456c4))
* **theme-default:** allow html in homepage footer ([87e0821](https://github.com/vuepress/core/commit/87e0821cee66c34141c1c3a62e8f5ecb6b21a957))
* **theme-default:** optimize scrollbar style of sidebar ([27abb26](https://github.com/vuepress/core/commit/27abb26509fa737ea27c3036bbe834d544e60298))
* **theme-default:** support multiple action buttons in homepage (close [#23](https://github.com/vuepress/core/issues/23)) ([bb44710](https://github.com/vuepress/core/commit/bb44710624d2dbb65bd5f3da2eafabdec73ecadf))



# [2.0.0-alpha.17](https://github.com/vuepress/core/compare/v2.0.0-alpha.16...v2.0.0-alpha.17) (2021-01-13)


### Bug Fixes

* **bundler-webpack:** add trailing slash to url ([cbe4c7f](https://github.com/vuepress/core/commit/cbe4c7f3924c11b751dfefbb01f8fc0528516b3b))


### Features

* **cli:** add --clean-temp option ([752d725](https://github.com/vuepress/core/commit/752d72563d88d5441a5570af3bc1b4c571e268c2))
* **theme-default:** allow dropdown subtitle as a link ([5fb6558](https://github.com/vuepress/core/commit/5fb6558c926ddbb569f2b1901903cf9be4ad426e))



# [2.0.0-alpha.16](https://github.com/vuepress/core/compare/v2.0.0-alpha.15...v2.0.0-alpha.16) (2021-01-11)


### Bug Fixes

* **core:** support special characters in filename and permalink ([c3e68ef](https://github.com/vuepress/core/commit/c3e68ef6a4aa3f6722d5bc4079bafe5d3b176e5e))
* **markdown:** fix assets relative path handling (close [#33](https://github.com/vuepress/core/issues/33)) ([9a95431](https://github.com/vuepress/core/commit/9a95431aa3994855f7194d3efe810b4fd2cf72d9))


### Features

* **cli:** show info of vue packages ([2d19e84](https://github.com/vuepress/core/commit/2d19e84c1ac24e1a127d330009617c42eb7a2bc3))



# [2.0.0-alpha.15](https://github.com/vuepress/core/compare/v2.0.0-alpha.14...v2.0.0-alpha.15) (2021-01-04)


### Bug Fixes

* **core:** fix site locale data type ([7898500](https://github.com/vuepress/core/commit/7898500f8b611662777ca3bdeb89c5b3bb658595))
* **theme-default:** click to close dropdown that opened by tab and click ([88d1ae2](https://github.com/vuepress/core/commit/88d1ae2bf6a92113ece8efa7ed57352b34ad18c4))
* **theme-default:** fix font-size of dropdown group title ([563156c](https://github.com/vuepress/core/commit/563156cb8458aeb71fadd882b08e03bee8ae5fba))


### Features

* **core:** provide app in all plugin hooks ([21cc3a6](https://github.com/vuepress/core/commit/21cc3a608e54d38de8de8f453b5e88031b4cedb1))


### Reverts

* fix(theme-default): remove outline when focused on dropdown button ([66d3feb](https://github.com/vuepress/core/commit/66d3feba01bf8a3ce751788a9a025dd69757efb4))



# [2.0.0-alpha.14](https://github.com/vuepress/core/compare/v2.0.0-alpha.13...v2.0.0-alpha.14) (2021-01-03)


### Bug Fixes

* **bundler-webpack:** remove esbuild minimizer ([4b3c00b](https://github.com/vuepress/core/commit/4b3c00becad376fed98bfaef700e565c19724a0b))
* **core:** fix page date resolving ([de6c5c8](https://github.com/vuepress/core/commit/de6c5c8ca89347bea4ba2925e283a7b710a5b5d3))
* **plugin-docsearch:** fix docsearch style issue ([7550587](https://github.com/vuepress/core/commit/7550587dbdf876b834dc14aa83847fabf1dba668))
* **theme-default:** assign default locale data ([d59f55d](https://github.com/vuepress/core/commit/d59f55d355299a8edbdb43986cc7aaff5345ea1f))
* **theme-default:** fix overflow style of code block line-numbers ([dd77cf4](https://github.com/vuepress/core/commit/dd77cf448a28423ee23930b3d76601d8a5a6da18))
* **theme-default:** remove outline when focused on dropdown button ([77842e3](https://github.com/vuepress/core/commit/77842e396f1ebcc9e874af537a6520b818d028c2))
* **theme-default:** set font-size explicitly for h4 to h6 ([a6459c0](https://github.com/vuepress/core/commit/a6459c0eca38fbc19545442581ea6f0e73908b30))
* **vuepress:** add a wrapper for cli bin (close [#21](https://github.com/vuepress/core/issues/21)) ([2708ac3](https://github.com/vuepress/core/commit/2708ac325c05a39cc5139e7e5f902e2fead5ca7a))



# [2.0.0-alpha.13](https://github.com/vuepress/core/compare/v2.0.0-alpha.12...v2.0.0-alpha.13) (2020-12-23)


### Bug Fixes

* **markdown:** only prepend prefix to explicit relative image path ([8d6a095](https://github.com/vuepress/core/commit/8d6a095ace0ed724b4ac4eea0e44a28f120a48bc))
* **plugin-git:** replace -P with --no-pager for better compatibility (close [#16](https://github.com/vuepress/core/issues/16)) ([f394c78](https://github.com/vuepress/core/commit/f394c78a06a3dae7cea91759db6010d04746f999))


### Features

* **cli:** respect conventional clientAppEnhance files (close [#20](https://github.com/vuepress/core/issues/20)) ([0777376](https://github.com/vuepress/core/commit/0777376bcb5cafec50f47877a6bf3926d6ff0076))



# [2.0.0-alpha.12](https://github.com/vuepress/core/compare/v2.0.0-alpha.11...v2.0.0-alpha.12) (2020-12-19)


### Bug Fixes

* **markdown:** support v-on shorthand in html inline tags ([86a1299](https://github.com/vuepress/core/commit/86a1299d16555fb453f36aa1db49ff9ce184e874))
* **theme-default:** fix navbar type to allow nested group ([9ef46ae](https://github.com/vuepress/core/commit/9ef46ae3d41dc56c536d884665d28f71a7883a59))


### Features

* **markdown:** code-block-level config for line-numbers and v-pre ([9ac3e4a](https://github.com/vuepress/core/commit/9ac3e4a12066f8b05e5d3a5211adf837a944c29d))



# [2.0.0-alpha.11](https://github.com/vuepress/core/compare/v2.0.0-alpha.10...v2.0.0-alpha.11) (2020-12-17)


### Bug Fixes

* **bundler-webpack:** freeze webpack version ([95523a2](https://github.com/vuepress/core/commit/95523a2f2b32f8dad773c74553bd22a0940cd27a))



# [2.0.0-alpha.10](https://github.com/vuepress/core/compare/v2.0.0-alpha.9...v2.0.0-alpha.10) (2020-12-17)


### Bug Fixes

* **theme-default:** fix content headers styles ([7ead1f6](https://github.com/vuepress/core/commit/7ead1f60db5135ed7d1a428cb23fecbbc11b223e))


### Features

* **cli:** add info command ([1f30993](https://github.com/vuepress/core/commit/1f30993a920189c0de89e413d85feb957546e47f))



# [2.0.0-alpha.9](https://github.com/vuepress/core/compare/v2.0.0-alpha.8...v2.0.0-alpha.9) (2020-12-16)


### Bug Fixes

* **bundler-webpack:** freeze version of prerelease packages ([50d5fa0](https://github.com/vuepress/core/commit/50d5fa0b88cfdf1924a38cbc0d19d29ce2bdef89))
* **cli:** prepare pages entry if the page key is changed ([4c79839](https://github.com/vuepress/core/commit/4c79839b730dd9cd9042c5929820d09ce102a88f))
* **plugin-git:** split arguments to get updated time ([70e8b5e](https://github.com/vuepress/core/commit/70e8b5ec0e7a960ef9a2398200ff23ae67086ab9))



# [2.0.0-alpha.8](https://github.com/vuepress/core/compare/v2.0.0-alpha.7...v2.0.0-alpha.8) (2020-12-11)


### Bug Fixes

* **bundler-webpack:** display localhost by default in console ([8bf0987](https://github.com/vuepress/core/commit/8bf0987b71588b2959475da9d502b2e4f9cc6bbb))
* **cli:** remove shorthand of host option ([8340797](https://github.com/vuepress/core/commit/8340797da03462c8078753a4535a9977c349ca04))


### Features

* **plugin-pwa-popup:** extract pwa popup plugin ([c3e8fb2](https://github.com/vuepress/core/commit/c3e8fb26c348b7cae47f7cc0c4a0fba998c308d3))
* **plugin-pwa:** migrate pwa plugin ([aa54fd6](https://github.com/vuepress/core/commit/aa54fd65aa77b32b97de0a38359f1ad07f96f566))



# [2.0.0-alpha.7](https://github.com/vuepress/core/compare/v2.0.0-alpha.6...v2.0.0-alpha.7) (2020-12-09)


### Bug Fixes

* **bundler-webpack:** fix windows compatibility (close [#12](https://github.com/vuepress/core/issues/12)) ([f35f768](https://github.com/vuepress/core/commit/f35f76861785e69c26d3e8731d5a1afe7e2f01be))



# [2.0.0-alpha.6](https://github.com/vuepress/core/compare/v2.0.0-alpha.5...v2.0.0-alpha.6) (2020-12-09)


### Features

* **bundler-webpack:** migrate to webpack 5 ([37dca96](https://github.com/vuepress/core/commit/37dca9644622a61e50ba2cda420c08581a824a19))
* **client:** remove built-in debug component ([a5962bb](https://github.com/vuepress/core/commit/a5962bb82483f56800b33b4e35c50dcb49fd48b1))
* **plugin-debug:** add debug plugin ([ddf0a92](https://github.com/vuepress/core/commit/ddf0a925c849fd7dba894ee69f9840d63dee99f4))
* **shared:** add esm build ([f8463e7](https://github.com/vuepress/core/commit/f8463e791c909493e343d98468663c9d31bcbb5f))
* **theme-default:** use debug plugin ([e12b1f3](https://github.com/vuepress/core/commit/e12b1f3293b5e8faebd93b444b71b6ac11b1029d))



# [2.0.0-alpha.5](https://github.com/vuepress/core/compare/v2.0.0-alpha.4...v2.0.0-alpha.5) (2020-12-03)


### Bug Fixes

* **plugin-google-analytics:** report site base ([31c8cad](https://github.com/vuepress/core/commit/31c8cadfba7676e7ac5809d669a6262f421e7831))
* **theme-default:** fix code related styles ([83d8a6f](https://github.com/vuepress/core/commit/83d8a6f50537ed1b4c5e5c0f4221841999eeaeab))
* **theme-default:** fix the condition of using router-link as nav-link ([8141f69](https://github.com/vuepress/core/commit/8141f691495fc92ee19bd4d7bfd496c07112ac6a))


### Features

* **markdown:** support doc lang highlight ([dc91db6](https://github.com/vuepress/core/commit/dc91db6327fd818f365abbec96cc5dde0b6ba243))



# [2.0.0-alpha.4](https://github.com/vuepress/core/compare/v2.0.0-alpha.3...v2.0.0-alpha.4) (2020-12-02)


### Bug Fixes

* **bundler-webpack:** remove spinner when preparing data ([7f3b425](https://github.com/vuepress/core/commit/7f3b4253a6d4d2f58b3487a407c609c417be1326))
* **cli:** keep message format consistent ([1de416d](https://github.com/vuepress/core/commit/1de416d75fb115523d78e6e709712210cbf39db9))
* **core:** failed to resolve local theme ([4d836e2](https://github.com/vuepress/core/commit/4d836e2bc3e7affe17f63df1c4ce40c464a7e6fb))
* **core:** warn if layout directory does not exist ([3d2d414](https://github.com/vuepress/core/commit/3d2d4148024963521b9e1ebbc29aa19697ac3452))


### Features

* **cli:** allow default export in user config file ([b2f86c7](https://github.com/vuepress/core/commit/b2f86c7b6c11de81c5aaf6e96973921dc0b9ad60))
* **cli:** allow loading ts files globally ([a9d94ac](https://github.com/vuepress/core/commit/a9d94ac9243ec75c5de20a0a08546e3a032dd43e))
* **utils:** add hasExportDefault util ([575a9c5](https://github.com/vuepress/core/commit/575a9c5d9eee44c0ce20b0712830e2eb2a303780))



# [2.0.0-alpha.3](https://github.com/vuepress/core/compare/v2.0.0-alpha.2...v2.0.0-alpha.3) (2020-12-01)


### Bug Fixes

* **bundler-webpack:** check public dir before using copy-plugin ([2481802](https://github.com/vuepress/core/commit/248180221e870a2e1cc2e4a67973c4e0918a3651))
* **core:** avoid runtime warning for empty template (close [#10](https://github.com/vuepress/core/issues/10)) ([bcbf703](https://github.com/vuepress/core/commit/bcbf703e6e449f7753697b7dfc503bd643bfd240))


### Features

* **cli:** use esbuild to load ts file ([41cfbc5](https://github.com/vuepress/core/commit/41cfbc57872f00b1f8ff80ffc9b127942792fbc6))



# [2.0.0-alpha.2](https://github.com/vuepress/core/compare/v2.0.0-alpha.1...v2.0.0-alpha.2) (2020-12-01)


### Bug Fixes

* **plugin-git:** check if git repo is valid ([3e9fc83](https://github.com/vuepress/core/commit/3e9fc8301e3fc9a0be7a8c7ede25e10063a10c9f))


### Features

* **bundler-webpack:** use esbuild for compilation and minification ([4351f99](https://github.com/vuepress/core/commit/4351f997ffee41d560a257abd28880aa98ee29a4))



# [2.0.0-alpha.1](https://github.com/vuepress/core/compare/8f2b10bc8c9fa58ee4181bbfc50ade3e45e382ff...v2.0.0-alpha.1) (2020-12-01)


### Bug Fixes

* **bundler-webpack:** add assets hash to avoid name conflicts ([550584a](https://github.com/vuepress/core/commit/550584a8ebbdc90662550f65c5e644cabde9ca41))
* **bundler-webpack:** allow stylus to import css by default ([6664b65](https://github.com/vuepress/core/commit/6664b65783c0f215b113ce72102630c709a0a7ac))
* **bundler-webpack:** always watch .vuepress dir ([c2c2fed](https://github.com/vuepress/core/commit/c2c2fed1745e0ddd46d6d71b9f06036678aaf1b1))
* **bundler-webpack:** do not enable devtool in prod mode ([b1d821a](https://github.com/vuepress/core/commit/b1d821a78e90f1e377b9158431ff01f375319abc))
* **bundler-webpack:** remove server dest temp directory ([91ed5bb](https://github.com/vuepress/core/commit/91ed5bbfed6d0488d5b2709cbc6956c2f99c7455))
* **bundler-webpack:** use loader options type ([f5f2b79](https://github.com/vuepress/core/commit/f5f2b79f766d078379c762161aaf5e4b2947c1d3))
* **cli:** close file watchers before restart ([2b10108](https://github.com/vuepress/core/commit/2b101086fdced1510478f9a7d122e2c1409f0a79))
* **cli:** delete cache before load config.ts ([6739f93](https://github.com/vuepress/core/commit/6739f9385ebdd2ba7f5bd474b60f93380c280711))
* **cli:** disable noInfo option ([e01cb12](https://github.com/vuepress/core/commit/e01cb12c195a198b57ec149070110706ba913cd4))
* **client:** do not prepend base to http url ([9e4e623](https://github.com/vuepress/core/commit/9e4e6233ce988bf3b6ebbbb1bc60f83a26f6709c))
* **client:** wrap ssr-app with a parent div ([c65b6c4](https://github.com/vuepress/core/commit/c65b6c47f084466dde9daf17d1c1d00b88f6682d))
* **cli:** exit process on error ([f345cd6](https://github.com/vuepress/core/commit/f345cd63060d25f61b09b120aa19e0984f2572dc))
* **cli:** ignore initial watch and avoid extra watchers ([3afe1f9](https://github.com/vuepress/core/commit/3afe1f923775d0686c6e7b8c85655ef4cf7ea98a))
* **cli:** remove extra app init and prepare ([6681b0b](https://github.com/vuepress/core/commit/6681b0b41f7b342add635672989250f98cccf73d))
* **core:** default value of base and lang ([5a5df27](https://github.com/vuepress/core/commit/5a5df274de4691315e567e932a6cffe4a04d88c1))
* **core:** infer page locale path correctly ([8f2b10b](https://github.com/vuepress/core/commit/8f2b10bc8c9fa58ee4181bbfc50ade3e45e382ff))
* **core:** resolve page date ([bd627d7](https://github.com/vuepress/core/commit/bd627d79482e77c573654db699ff58f93e8d8dd5))
* **core:** resolve page excerpt with correct markdown env ([e0f4066](https://github.com/vuepress/core/commit/e0f406625baf085ced29ea88328069fb0a1d0cf4))
* **core:** resolve page title from markdown content as fallback ([b216012](https://github.com/vuepress/core/commit/b2160129b175013518b9fb7d82d034694509ae86))
* **core:** resolve plugin and theme by name ([3031324](https://github.com/vuepress/core/commit/30313247958f9e1d4a7214a18ce6e17bc582bc3e))
* **core:** respect page options ([d8dbbb7](https://github.com/vuepress/core/commit/d8dbbb777161130634fe5cadf0be571ed830a7ab))
* **markdown:** do not add prefix to external images ([dc75f57](https://github.com/vuepress/core/commit/dc75f57cfda3193d617c4feaf091748df8482504))
* **markdown:** escape text token ([f226d54](https://github.com/vuepress/core/commit/f226d544a9a2045b3dd0f2ea0a7186c7fd2d4adc))
* **plugin-medium-zoom:** disable in SSR ([76cf97f](https://github.com/vuepress/core/commit/76cf97f634f4aa154d46aed866b9a80991fbc30d))
* **plugin-nprogress:** add initial loaded page ([abd26c2](https://github.com/vuepress/core/commit/abd26c2e97d94a3b2e41ca0c85733c4b1f618808))
* **shared:** missing type inference for resolveLocaleConfigItem ([3e230fd](https://github.com/vuepress/core/commit/3e230fd72020ba2e2e9d9c0fef90f035410c184f))
* **shared:** remove title from ssr context ([6eddf75](https://github.com/vuepress/core/commit/6eddf75ea14cac471d93fcfbee2df03c1089ac58))
* **theme-default:** code-group nav padding ([1d46ce0](https://github.com/vuepress/core/commit/1d46ce0b8117bcf55561f2537ec2982d5ca020e5))
* **theme-default:** code-group style in mobile ([7e31bfd](https://github.com/vuepress/core/commit/7e31bfd6851e5d631da8c09df1127e81eef0e6b8))
* **theme-default:** do not use frontmatter title and desc as hero messages ([a3dde66](https://github.com/vuepress/core/commit/a3dde66fd1474f99578115cc17a7605955c8b4b6))
* **theme-default:** do not use injections inside computed ([04c7de5](https://github.com/vuepress/core/commit/04c7de5ad312835a8306ec65aead882ea0c5aa6a))
* **theme-default:** fallback home title and content to siteLocale ([ce34b4a](https://github.com/vuepress/core/commit/ce34b4a4c7818d330712f82ac073ba90ce9774fc))
* **theme-default:** fix type imports and usages ([f953295](https://github.com/vuepress/core/commit/f95329512e5fee95839613f66e5011fedfcb548e))
* **theme-default:** hide contributors if array is empty ([9e88016](https://github.com/vuepress/core/commit/9e880165dd408883013af5f9f42cff78ee0574ed))
* **theme-default:** remove default home config ([21ebb4c](https://github.com/vuepress/core/commit/21ebb4cc293db6d38e146a87dfb532380cfa68c0))
* **theme-default:** remove DropdownTransition temporarily ([efd6ded](https://github.com/vuepress/core/commit/efd6dede9c6a785eb905015104b0f7b011f76456))
* **theme-default:** resolve redirect with hash, query and params ([e7b7a91](https://github.com/vuepress/core/commit/e7b7a9100282ceeef78a62bde15e31504a36f3dd))
* **theme-default:** typo in template ([9a72112](https://github.com/vuepress/core/commit/9a72112b8500f1d387cb7abb70630518e34815c9))
* **theme-default:** unregister the built-in OutboundLink component to avoid warning ([9c781cc](https://github.com/vuepress/core/commit/9c781cc5478eab28689a3a05024b7dbf3fa23722))
* **theme-default:** wrap Content with div ([e578594](https://github.com/vuepress/core/commit/e5785948d09f2711d797aaf91b0bd9ff6a70f95d))
* **theme-default:** wrong default vertical-align of Badge ([0c5d2ef](https://github.com/vuepress/core/commit/0c5d2efb97fc7b9bc66a8d7707954f3d63746ecb))


### Features

* **bundler-webpack:** add __SSR__ constant ([6fe1ad6](https://github.com/vuepress/core/commit/6fe1ad6e02d7cb0a45b484edf652071ba245851a))
* **bundler-webpack:** add [@source](https://github.com/source) alias ([9d8cc38](https://github.com/vuepress/core/commit/9d8cc3871c53c83ae5e1074c4be49c3c506df77f))
* **bundler-webpack:** add style pre-processors config ([7502682](https://github.com/vuepress/core/commit/7502682ed6943300a0f8b7ac8a0ee897767264c7))
* **bundler-webpack:** allow disable prefetch and preload links ([2e5eb77](https://github.com/vuepress/core/commit/2e5eb77f744daf81d080588ca8059bea086b1b75))
* **bundler-webpack:** copy files from public dir to dest dir ([10848fe](https://github.com/vuepress/core/commit/10848fe55fdf985d51cde30c684f1f364cafd5b8))
* **bundler-webpack:** disable __VUE_OPTIONS_API__ by default ([ce5945b](https://github.com/vuepress/core/commit/ce5945b7f3fac7ded56f75adffdb5da4e13f5d69))
* **bundler-webpack:** extract all css files together ([ce0783b](https://github.com/vuepress/core/commit/ce0783b7b896b5cc593c31d335627d88737094a1))
* **bundler-webpack:** migrate to postcss 8 ([5694346](https://github.com/vuepress/core/commit/56943460fed831cc58ab7f643d8d76c906b0e1c7))
* **bundler-webpack:** migrate webpack related hooks ([f5eb159](https://github.com/vuepress/core/commit/f5eb159294afbf7b5c799ba8ad7c5c8836299c1c))
* **bundler-webpack:** render locale data ([2ae31c1](https://github.com/vuepress/core/commit/2ae31c1f31204fc8e4dbd88d8b4c6b90bfe492cc))
* **bundler-webpack:** sync client changes and optimize ssr ([9b4a2cd](https://github.com/vuepress/core/commit/9b4a2cd3bc5af63085ee4850215948268f5b8f92))
* **bundler-webpack:** use webpack plugin to optimize dev logs ([70c1d64](https://github.com/vuepress/core/commit/70c1d649bd723ea6523e34cfe512bfa2e5121a7b))
* **cli:** add --cache and --clean-cache options ([7ebd75b](https://github.com/vuepress/core/commit/7ebd75b35e02621b117a4362f71b754c2b4f2f74))
* **cli:** base cli functions ([9b7e005](https://github.com/vuepress/core/commit/9b7e005f6e6bf810d449e2acc9891617ac58422d))
* **client:** add built-in styles for Debug component ([1b3b028](https://github.com/vuepress/core/commit/1b3b028e0cd078eb6f074c36696255df1cf49267))
* **client:** add ClientOnly component ([e2cad36](https://github.com/vuepress/core/commit/e2cad36c5f859240e5fac62c38fbaa14b39defab))
* **client:** add global computed and updateHead ([df83b88](https://github.com/vuepress/core/commit/df83b887a69db9290a22d0731056f4ac2b6f0014))
* **client:** add global data utils ([46b9fc5](https://github.com/vuepress/core/commit/46b9fc579f51c1f037f4850f8699074805799884))
* **client:** add OutboundLink component ([4107add](https://github.com/vuepress/core/commit/4107add516e7acd0cbdc4a526bf4772c54fb6108))
* **client:** add siteLocale in debug component ([e1d663b](https://github.com/vuepress/core/commit/e1d663b4ece27012c72383f5eecb90c5fb2195ef))
* **client:** add themeData injections ([04cafe2](https://github.com/vuepress/core/commit/04cafe23ec835d9efc9a2b1ab8be8b7d8f0a22b4))
* **client:** add withBase util ([f234c5d](https://github.com/vuepress/core/commit/f234c5d74f148b55b265d13dc2c868d8531d192a))
* **client:** augment route meta type ([6f4e1f5](https://github.com/vuepress/core/commit/6f4e1f5995351a0dd6ebf257e1889d26e77d26e4))
* **client:** make siteData injections generic ([86b9416](https://github.com/vuepress/core/commit/86b941646b7554b404a621a3616a7a81958c12c3))
* **client:** provide site locale data ([00455bd](https://github.com/vuepress/core/commit/00455bdf21736254c8a3a488cdf8245e80742398))
* **client:** set scrollBehavior for vue-router ([f7a12ce](https://github.com/vuepress/core/commit/f7a12ceaa1e20ba2e87fa34c692a754fcc3f34f4))
* **client:** support clientAppRootComponentFiles ([188c1a0](https://github.com/vuepress/core/commit/188c1a04fed8ed6614b45a6a0c1cb3d07a4ca112))
* **client:** take 404 as the fallback layout ([bb34903](https://github.com/vuepress/core/commit/bb349038da090d0e5fd9069ff5cfa3372c95dc0b))
* **cli:** use user config as a plugin ([1fa191f](https://github.com/vuepress/core/commit/1fa191f07e5bd55ee25856b75df08d6c767e8f23))
* **cli:** watch pages and config in dev command ([96d89d9](https://github.com/vuepress/core/commit/96d89d9f2d39ee63e154c70cd552553f09221b99))
* **core:** add 404 page if not exist ([0297a9e](https://github.com/vuepress/core/commit/0297a9ed96acb0b792dac44f72f4d549a5930841))
* **core:** add clientAppRootComponentFiles hook ([7f640c8](https://github.com/vuepress/core/commit/7f640c879f53b5dff67a2c6d374360f3e19aa679))
* **core:** add extendsPageData hook ([5a10994](https://github.com/vuepress/core/commit/5a109943ed1beb3ddfd07c018e0cba33cb46fdb2))
* **core:** add pagePatterns option ([9a8855d](https://github.com/vuepress/core/commit/9a8855d86683e95e2dae33493d0321fa14bfee9d))
* **core:** add public directory config ([1b52ffe](https://github.com/vuepress/core/commit/1b52ffe89a7f87d3c6822d07b6b75f2675b8745f))
* **core:** add theme layouts option ([bf96cc3](https://github.com/vuepress/core/commit/bf96cc3a2ab9133d3606231e3f9d0c46b2a2103c))
* **core:** allow disable prefetch and preload links ([2991b6a](https://github.com/vuepress/core/commit/2991b6a7025eefac21846eb520aa5ca2ea2dc594))
* **core:** allow plugins and themes use export default ([874979d](https://github.com/vuepress/core/commit/874979d6d86e308469488c8405e6f7bbc80d1391))
* **core:** enable evergreen option by default ([fa67dbb](https://github.com/vuepress/core/commit/fa67dbb9474c27ff10e4061ac15171bc4936d274))
* **core:** export LocaleConfig type from shared ([04de925](https://github.com/vuepress/core/commit/04de925326ad1101702e57fd9903de808a72bb97))
* **core:** inject page title into route meta ([0d9e7e3](https://github.com/vuepress/core/commit/0d9e7e3b3a0a78504fc586887cf1a777ae434846))
* **core:** remove plugins from app options ([fe411e7](https://github.com/vuepress/core/commit/fe411e7ef8a5802876f55246a9937825e802f538))
* **core:** remove webpack related hooks ([9613f69](https://github.com/vuepress/core/commit/9613f69ace1413b3776a6012319cf7c6fe1d3469))
* **markdown:** add assetsPlugin to handle assets links ([79e50b5](https://github.com/vuepress/core/commit/79e50b5bfa4e39ca4df76d1d580c424c70b09a42))
* **markdown:** add code plugin ([0e29d69](https://github.com/vuepress/core/commit/0e29d6995f2f631b0dd73225f7ddd604de857416))
* **markdown:** allow disable built-in plugins ([a0746e5](https://github.com/vuepress/core/commit/a0746e518aca472bc08e0ee738c72aa50a2142bf))
* **markdown:** enable line numbers by default ([44b1e47](https://github.com/vuepress/core/commit/44b1e4707c217d6155ff72d6c1ec14c72d0e004a))
* **markdown:** migrate to markdown-it-toc-done-right ([5f9f092](https://github.com/vuepress/core/commit/5f9f0928d4a99882084ebbfc6b806e86bd98dc43))
* **markdown:** support highlight-lines in code plugin ([932b737](https://github.com/vuepress/core/commit/932b7375ac7e5aef9b05bdf330a754c4f82fc0f6))
* **plugin-active-header-links:** make offset configurable ([638386d](https://github.com/vuepress/core/commit/638386d007452ede214fb6d21d24945502571145))
* **plugin-active-header-links:** migrate active-header-links plugin ([6271af8](https://github.com/vuepress/core/commit/6271af8e5e867fa92c06de583a3a5d52094ba337))
* **plugin-back-to-top:** migrate plugin-back-to-top ([9b1bbc0](https://github.com/vuepress/core/commit/9b1bbc0dfbabbd662884dbc0510dec6de918bddc))
* **plugin-container:** migrate container plugin ([09459e9](https://github.com/vuepress/core/commit/09459e95aa884c947812c3fa8a51998f4bb4ec09))
* **plugin-docsearch:** add docsearch plugin ([ae5e45a](https://github.com/vuepress/core/commit/ae5e45a157ecfed83401df64ca30ecffc5045341))
* **plugin-git:** add plugin-git package ([4c847c8](https://github.com/vuepress/core/commit/4c847c8921d0ac321a746272713f5ad187e55267))
* **plugin-google-analytics:** migrate google-analytics plugin ([7f95a8d](https://github.com/vuepress/core/commit/7f95a8ddb0514967446c61c26971f17136d3d811))
* **plugin-medium-zoom:** migrate medium-zoom plugin ([04dc0b8](https://github.com/vuepress/core/commit/04dc0b87378cecf9ba4f5c94087f91acb7b0332c))
* **plugin-nprogress:** add @vuepress/plugin-nprogress ([8792089](https://github.com/vuepress/core/commit/8792089ce6a609fb64984df334a42772ada20224))
* **plugin-palette-stylus:** add palette-stylus plugin ([91f2c98](https://github.com/vuepress/core/commit/91f2c9827354fc39904ac760fb60bcade91a8e3d))
* **shared:** add children field in page header ([6f29d05](https://github.com/vuepress/core/commit/6f29d05e6103d172ffe9263ff964c45afd82a4c1))
* **shared:** add head utils ([f020af0](https://github.com/vuepress/core/commit/f020af0d6abcb5505692e9ecd3ae16d8b846008f))
* **shared:** add htmlUnescape and htmlEscape utils ([5e55f95](https://github.com/vuepress/core/commit/5e55f95bcfd0b039ca1f4398f8d064af9fe4223a))
* **shared:** add isLinkAbsolute and isLinkHttp utils ([bbe8e99](https://github.com/vuepress/core/commit/bbe8e995d2f93ff9d8919d699be81d429e0d6abd))
* **shared:** add link utils ([59e8fd5](https://github.com/vuepress/core/commit/59e8fd521a92dc5ed4e1ea5d313dac40b46e7a90))
* **shared:** add resolveRoutePathFromUrl util ([460f39b](https://github.com/vuepress/core/commit/460f39ba26cda4601b02fc8c0437a88a36d6dd59))
* **shared:** add utils to resolve locale data ([4d5ccd5](https://github.com/vuepress/core/commit/4d5ccd56cac166bd76260b3ba3aedac562deead2))
* **shared:** expose isPlainObject util ([1558de3](https://github.com/vuepress/core/commit/1558de3248f12f2a2508bfb5ebbe53ca26c466cb))
* **shared:** extract locale path util ([54b747c](https://github.com/vuepress/core/commit/54b747c96e6c81f1af289317e7b80c5daff6f517))
* **shared:** make PageData type extendable ([aacbecc](https://github.com/vuepress/core/commit/aacbeccb26ff7d58776678faffdc8fdabcaf36c3))
* **shared:** migrate isPlainObject with generics support ([fb1f7c3](https://github.com/vuepress/core/commit/fb1f7c301514759a63443b19b5d62362d098fde7))
* **shared:** optimize type definitions and remove resolveSiteLocaleData ([e1d58f6](https://github.com/vuepress/core/commit/e1d58f6f3e40458e03e660e15ffc10e7e3acc7f5))
* **theme-default:** 404 page with locales support ([08f6f9b](https://github.com/vuepress/core/commit/08f6f9b7b0f248cd527cf1251033d8b4172961bd))
* **theme-default:** add Page component ([d2eb868](https://github.com/vuepress/core/commit/d2eb868ac92bcc895266facc70a145a7c7f65b3d))
* **theme-default:** allow string type navbar and sidebar item ([82d7fa2](https://github.com/vuepress/core/commit/82d7fa2e96174f7dce2a5e23c8d5d34889493ac4))
* **theme-default:** default theme skeleton ([fb1d413](https://github.com/vuepress/core/commit/fb1d413199835e6b6127d4e725a0ce84daa2737a))
* **theme-default:** display json extension in code blocks ([d8795d4](https://github.com/vuepress/core/commit/d8795d4b4dc2c5c7a8504e6b694714523bdca0a5))
* **theme-default:** migrate Badge component ([b77bb29](https://github.com/vuepress/core/commit/b77bb29e5832a56cc6860567b3d7381a1def6ec0))
* **theme-default:** migrate CodeGroup component ([107afd8](https://github.com/vuepress/core/commit/107afd898a91f1b819297e1649f4e90c87064fc8))
* **theme-default:** migrate NavLink component ([8bb1e17](https://github.com/vuepress/core/commit/8bb1e17d4a52a1b164f2cbd990773010566f25c3))
* **theme-default:** migrate OutboundLink component ([c7ddba4](https://github.com/vuepress/core/commit/c7ddba4ecb781136a931bf5c4aa5f27acc8837ae))
* **theme-default:** migrate styles ([4bb6e10](https://github.com/vuepress/core/commit/4bb6e10da8b71849edf45bd11c282777e840b618))
* **theme-default:** navbar and sidebar ([7f22ac0](https://github.com/vuepress/core/commit/7f22ac032c17be8dafe1226d31da4019c17237d5))
* **theme-default:** optimize sidebar items config ([f70cdf0](https://github.com/vuepress/core/commit/f70cdf06741bd283722fb51170e407492e9b1a6c))
* **theme-default:** support locale config for custom blocks ([404e02d](https://github.com/vuepress/core/commit/404e02dadda526b88dfca0f36df8fbf18d3d5e28))
* **theme-default:** use active-header-links plugin ([f7990a2](https://github.com/vuepress/core/commit/f7990a2e752af6989cebb58818e3f6c86951255e))
* **theme-default:** use container plugin and refactor types ([55e0940](https://github.com/vuepress/core/commit/55e0940a6606fa64742faaf14722ebfaafb39321))
* **theme-default:** use Debug component in Layout ([fe4334f](https://github.com/vuepress/core/commit/fe4334f863d4d48e1a37ef96d684a168a9eff996))
* **theme-default:** use docsearch plugin ([c601312](https://github.com/vuepress/core/commit/c601312385c42bc5ce85a96ab116395b99f504f3))
* **theme-default:** use medium-zoom plugin ([6288f8c](https://github.com/vuepress/core/commit/6288f8c596b32352fde4898cf03c0f1c684f1e1f))
* **theme-default:** use nprogress plugin ([e662753](https://github.com/vuepress/core/commit/e66275390857b92577bccef90e250a23596127cd))
* **theme-default:** use palette-stylus plugin ([ccaee0f](https://github.com/vuepress/core/commit/ccaee0f87072b0d7dcf3e5589aa946d32e5688ab))
* **theme-default:** use plugin-back-to-top ([774f95b](https://github.com/vuepress/core/commit/774f95bd1f544103b4602a7ee7faad56d1719d21))
* **theme-default:** use plugin-git and add themePlugins option ([f44570b](https://github.com/vuepress/core/commit/f44570b8392636622bda7f2d5abd697a8050dc26))
* **utils:** add logger and debug utils ([203d58d](https://github.com/vuepress/core/commit/203d58d8d97c6a3158d4a783188ce2b64e54f19c))
* **utils:** add ora util ([f67b4d3](https://github.com/vuepress/core/commit/f67b4d3f62fee077f947362c975c08c81470b0b0))
* **utils:** add withSpinner util ([82c6bb5](https://github.com/vuepress/core/commit/82c6bb5d3e3a76088ee286fc10dabd9da4d59b22))
* **utils:** disable withSpinner if DEBUG env is set ([af19507](https://github.com/vuepress/core/commit/af1950784fb17c258a4c07dbaf7439cf0ec2c762))
* **vuepress:** re-export sub packages ([6b5d999](https://github.com/vuepress/core/commit/6b5d999fca1c227f33f4463d6c40403277fceb13))


### Performance Improvements

* **bundler-webpack:** split vendor chunk and enable runtime chunk ([0d1fbfd](https://github.com/vuepress/core/commit/0d1fbfd7b3f6c36d027edd5fbafb1aed02210a4d))
* **bundler-webpack:** use postcss-csso to minify styles ([2cb23cc](https://github.com/vuepress/core/commit/2cb23cc1dc6b26245d07e87d2c72628881f4ba93))



# [2.0.0-beta.62](https://github.com/vuepress/core/compare/v2.0.0-beta.61...v2.0.0-beta.62) (2023-05-11)


### Bug Fixes

* **core:** ensure page.title isString (close [#1306](https://github.com/vuepress/core/issues/1306)) ([#1308](https://github.com/vuepress/core/issues/1308)) ([644b406](https://github.com/vuepress/core/commit/644b406e3516a44edd063a13f7fbfb27952ada85))
* **plugin-docsearch:** allow using slash key to init docsearch ([#1323](https://github.com/vuepress/core/issues/1323)) ([3382bb1](https://github.com/vuepress/core/commit/3382bb1763eec68f3f0380a9ec887f0b0a3b0e95))
* **plugin-theme-data:** remove locales field in themeLocaleData (close [#1287](https://github.com/vuepress/core/issues/1287)) ([#1313](https://github.com/vuepress/core/issues/1313)) ([d91996f](https://github.com/vuepress/core/commit/d91996fd0864abd5029e4c4cff319db48be06b47))


### Build System

* bump dependencies, drop node 14 ([#1311](https://github.com/vuepress/core/issues/1311)) ([a8c30ee](https://github.com/vuepress/core/commit/a8c30ee8f6a91efd8860575754766d4c186460c2))


### Features

* bump vue to 3.3 ([#1327](https://github.com/vuepress/core/issues/1327)) ([bebadea](https://github.com/vuepress/core/commit/bebadeaf8c25104c2f9e9cf53685766c3844db1a))
* **bundler-vite:** bump vite to 4.3 and temporarily remove manualChunks ([#1328](https://github.com/vuepress/core/issues/1328)) ([031563e](https://github.com/vuepress/core/commit/031563e5aa2e0eb99e3ba3702f0a1c6978bbbfc3))
* **markdown:** support relative image links without `./` ([#1103](https://github.com/vuepress/core/issues/1103)) ([b7d71be](https://github.com/vuepress/core/commit/b7d71be8760a025694a9a522b0e354217c1c4111))
* **theme-default:** improve css variable acquisition ([#1322](https://github.com/vuepress/core/issues/1322)) ([eb0d0ea](https://github.com/vuepress/core/commit/eb0d0eaa4a57843838c6e564a8ced164b34d7677))


### Performance Improvements

* **shared:** reduce regexp match usage ([#1315](https://github.com/vuepress/core/issues/1315)) ([23bdec6](https://github.com/vuepress/core/commit/23bdec6969b9666b800e0ebeb9e9b3a6ed05ef98))


### BREAKING CHANGES

* **markdown:** for markdown image syntax `![alt](path)`, paths without `./` or `/` or protocol will be treated as relative links
* drop support for node 14



# [2.0.0-beta.61](https://github.com/vuepress/core/compare/v2.0.0-beta.60...v2.0.0-beta.61) (2023-02-27)


### Bug Fixes

* **client:** avoid updating routeLocale on route hash change ([#1253](https://github.com/vuepress/core/issues/1253)) ([5eb9489](https://github.com/vuepress/core/commit/5eb948922761e9cc96674a7d43a075ecf59ef5ea))
* **markdown:** render token attrs in code block ([#1220](https://github.com/vuepress/core/issues/1220)) ([b4e313b](https://github.com/vuepress/core/commit/b4e313bb757696eb4baa347940dbeb5dac1938f2))
* **theme-default:** fix site name text overflow style ([#1260](https://github.com/vuepress/core/issues/1260)) ([95363a5](https://github.com/vuepress/core/commit/95363a50d8977f9beabb94aa7ec4ab9602605ed9))


### Features

* **core:** attach markdownEnv to page object ([#1228](https://github.com/vuepress/core/issues/1228)) ([8a63e19](https://github.com/vuepress/core/commit/8a63e19c52a5db1c3a173239b3c339cd9693e93b))
* **markdown:** add error log for importCode plugin ([#1273](https://github.com/vuepress/core/issues/1273)) ([b722a62](https://github.com/vuepress/core/commit/b722a623842f0ecde650027468d967bec79aa2c6))
* **plugin-docsearch:** load docsearch asynchronously (close [#1247](https://github.com/vuepress/core/issues/1247)) ([#1254](https://github.com/vuepress/core/issues/1254)) ([f5d5b11](https://github.com/vuepress/core/commit/f5d5b11f787abb87225284fb059e3d89e3bcf768))
* **plugin-docsearch:** support indexBase option (close [#1223](https://github.com/vuepress/core/issues/1223)) ([#1224](https://github.com/vuepress/core/issues/1224)) ([23a4c68](https://github.com/vuepress/core/commit/23a4c681cfd50607f396cb3894ede3cc60698d1b))



# [2.0.0-beta.60](https://github.com/vuepress/core/compare/v2.0.0-beta.59...v2.0.0-beta.60) (2022-12-28)


### Bug Fixes

* **markdown:** avoid extracting headers in nested blocks by bumping mdit-vue (close [#1201](https://github.com/vuepress/core/issues/1201)) ([ecd3716](https://github.com/vuepress/core/commit/ecd3716e0fca2e4c4457d514f245ca06e6e9086e))
* **theme-default:** fix word breaking (close [#1209](https://github.com/vuepress/core/issues/1209)) ([#1210](https://github.com/vuepress/core/issues/1210)) ([1e7761f](https://github.com/vuepress/core/commit/1e7761f269556816e7f8202481234a8d6a471dc2))
* **theme-default:** preserve url params when switching language ([#1211](https://github.com/vuepress/core/issues/1211)) ([941b2fe](https://github.com/vuepress/core/commit/941b2fe8a5c45e1065b9a1f0b0541e571b43f26d))


### Features

* **client:** improve default head title resolver ([c688270](https://github.com/vuepress/core/commit/c68827024584bb46aeb119087f91c8cb6053de27))
* **plugin-docsearch:** add injectStyles option (close [#948](https://github.com/vuepress/core/issues/948)) ([#1208](https://github.com/vuepress/core/issues/1208)) ([34fb6c2](https://github.com/vuepress/core/commit/34fb6c24e7250f20d1092a70141af528ae2f6b91))



# [2.0.0-beta.59](https://github.com/vuepress/core/compare/v2.0.0-beta.58...v2.0.0-beta.59) (2022-12-14)


### Bug Fixes

* **bundler-webpack:** fix order of extensionAlias (close [#1082](https://github.com/vuepress/core/issues/1082)) ([28eeb9b](https://github.com/vuepress/core/commit/28eeb9ba04704c45ae993a0c5f994da1e87d26df))



# [2.0.0-beta.58](https://github.com/vuepress/core/compare/v2.0.0-beta.57...v2.0.0-beta.58) (2022-12-10)


### Bug Fixes

* **bundler-webpack:** avoid duplicated style preload ([e484a55](https://github.com/vuepress/core/commit/e484a55ca3c0b80babab47c227d7321a6bc6ddd7))
* **bundler-webpack:** fix module identifier matching ([9d8d645](https://github.com/vuepress/core/commit/9d8d64573ec37df446f8ca99bb9270c5328a7024))
* **bundler-webpack:** partially fix ssr dependencies issue ([83e7b6c](https://github.com/vuepress/core/commit/83e7b6cb77f6ae6766d7546131d2ae602d74e1f2))



# [2.0.0-beta.57](https://github.com/vuepress/core/compare/v2.0.0-beta.56...v2.0.0-beta.57) (2022-12-09)


### Bug Fixes

* **theme-default:** fix code block misalignment (close [#901](https://github.com/vuepress/core/issues/901)) ([#1185](https://github.com/vuepress/core/issues/1185)) ([7d156d7](https://github.com/vuepress/core/commit/7d156d781f86e29e7c261eb467c5c48589055f6f))


### Build System

* bump to vite 4 and rollup 3 ([5fac2e6](https://github.com/vuepress/core/commit/5fac2e644202a1d3df8204601bb0a32a5df55d15))


### Code Refactoring

* remove page excerpt ([a27bc24](https://github.com/vuepress/core/commit/a27bc246602214970a12b0222d8bdbc49339cf03))


### Features

* **client:** add `__VUEPRESS_BASE__` constant ([fe047fe](https://github.com/vuepress/core/commit/fe047fe44fe0c46e7051106bde50829d39482ba0))


### BREAKING CHANGES

* bump to vite 4 and rollup 3
* `excerpt` has been removed from page object and page data



# [2.0.0-beta.56](https://github.com/vuepress/core/compare/v2.0.0-beta.55...v2.0.0-beta.56) (2022-12-09)


### Reverts

* perf: render pages in parallel ([#1094](https://github.com/vuepress/core/issues/1094)) ([#1186](https://github.com/vuepress/core/issues/1186)) ([1e698f5](https://github.com/vuepress/core/commit/1e698f5f6a04c80d7c3c6b56c7af3a7077256233))



# [2.0.0-beta.55](https://github.com/vuepress/core/compare/v2.0.0-beta.54...v2.0.0-beta.55) (2022-12-09)


### Bug Fixes

* **bundler-vite:** fix regression of vite options merging (close [#1184](https://github.com/vuepress/core/issues/1184)) ([998eb94](https://github.com/vuepress/core/commit/998eb94c58f11ba1728179310d61f337c3367695))


### Performance Improvements

* render pages in parallel ([#1094](https://github.com/vuepress/core/issues/1094)) ([78f737c](https://github.com/vuepress/core/commit/78f737c537a5de076f88f604a7413e39ac8e42f9))



# [2.0.0-beta.54](https://github.com/vuepress/core/compare/v2.0.0-beta.53...v2.0.0-beta.54) (2022-12-08)


### Bug Fixes

* **bundler-vite:** make user config have the highest priority ([#1092](https://github.com/vuepress/core/issues/1092)) ([91cc59e](https://github.com/vuepress/core/commit/91cc59e437a44d8743edbe8423c3c3be416a5c4a))
* **client:** allow double quotes in head tag (close [#1174](https://github.com/vuepress/core/issues/1174)) ([#1176](https://github.com/vuepress/core/issues/1176)) ([69956c0](https://github.com/vuepress/core/commit/69956c0952e35561ddd385a41f9337142baf3fba))
* **client:** async load client configs to avoid circular deps (close [#1154](https://github.com/vuepress/core/issues/1154)) ([b0a7a0e](https://github.com/vuepress/core/commit/b0a7a0e686b98dd8201dfed8effd6f7616e7d498))
* **markdown:** support single quotes in img tag (close [#937](https://github.com/vuepress/core/issues/937)) ([#1104](https://github.com/vuepress/core/issues/1104)) ([7dae33a](https://github.com/vuepress/core/commit/7dae33ab2edb95343f6e11b60116cfc32f79a68b))


### Features

* **bundler-vite:** improve chunk splitting ([#1170](https://github.com/vuepress/core/issues/1170)) ([b4e9ca6](https://github.com/vuepress/core/commit/b4e9ca6f97247c568901486116e8924e39c9cb58))
* improve page path and vite chunk name ([#1100](https://github.com/vuepress/core/issues/1100)) ([d93b682](https://github.com/vuepress/core/commit/d93b682172f2f26f5eab39d965771621a03e2384))
* improve print style ([#1181](https://github.com/vuepress/core/issues/1181)) ([0800a07](https://github.com/vuepress/core/commit/0800a07224e8d2fb3975ad7eda7de674c0686a11))
* **theme-default:** collapsible nested item in sidebar (close [#883](https://github.com/vuepress/core/issues/883)) ([#1158](https://github.com/vuepress/core/issues/1158)) ([48ab95c](https://github.com/vuepress/core/commit/48ab95c775dc6b21a54451bfe654e2f58fd4d05c))
* **theme-default:** improve style of custom container ([#1131](https://github.com/vuepress/core/issues/1131)) ([4941f95](https://github.com/vuepress/core/commit/4941f95da5be5a0060a916a21a62de37dd7c87b9))
* **utils:** replace chalk with picocolors ([#1145](https://github.com/vuepress/core/issues/1145)) ([ee0ea8c](https://github.com/vuepress/core/commit/ee0ea8c6adcbb91a79c89d940aa8953a24fc84f0))


### BREAKING CHANGES

* **utils:** `@vuepress/utils` no longer exports `chalk`, use `colors` instead



# [2.0.0-beta.53](https://github.com/vuepress/core/compare/v2.0.0-beta.52...v2.0.0-beta.53) (2022-10-24)


### Features

* **cli:** print help messages if no matching command ([bcc2208](https://github.com/vuepress/core/commit/bcc22089c4302e1c3ec40d99ca27035b58494921))


### Reverts

* feat(bundler-vite): improve chunk splitting ([#1101](https://github.com/vuepress/core/issues/1101)) (close [#1140](https://github.com/vuepress/core/issues/1140)) ([01975a1](https://github.com/vuepress/core/commit/01975a164df49d395351d3481ac85bda80adadac))



# [2.0.0-beta.52](https://github.com/vuepress/core/compare/v2.0.0-beta.51...v2.0.0-beta.52) (2022-10-21)


### Bug Fixes

* **bundler-vite:** exclude user-config plugin from optimizeDeps ([#1135](https://github.com/vuepress/core/issues/1135)) ([4285cf8](https://github.com/vuepress/core/commit/4285cf83d4afb7deef863651fdc5be9a58ded68b))
* **bundler-vite:** test page component files correctly (close [#1056](https://github.com/vuepress/core/issues/1056)) ([bcf6033](https://github.com/vuepress/core/commit/bcf6033ce2acf2b98dede4a4e580fe4f39222517))
* **cli:** import envinfo correctly (close [#1059](https://github.com/vuepress/core/issues/1059)) ([4476404](https://github.com/vuepress/core/commit/44764049b74aac87276e6e902f022abd2ec19a4b))
* **plugin-search:** avoid triggering hotkey while typing ([#1125](https://github.com/vuepress/core/issues/1125)) ([7b2e3fa](https://github.com/vuepress/core/commit/7b2e3fabfc9eed65918f9cf3108b86c7de164412))
* **plugin-search:** fix mutiple search icon on iPad (close [#1004](https://github.com/vuepress/core/issues/1004)) ([#1106](https://github.com/vuepress/core/issues/1106)) ([b5df79d](https://github.com/vuepress/core/commit/b5df79d508ffff071371cd6804da698a4e6117a4))
* **plugin-search:** unify breakpoint with default theme ([#1091](https://github.com/vuepress/core/issues/1091)) ([a1773d9](https://github.com/vuepress/core/commit/a1773d96271c35e7a9b5a63d76c495ffc7e91711))
* **theme-default:** improve responsive layout ([#1102](https://github.com/vuepress/core/issues/1102)) ([c63bd4a](https://github.com/vuepress/core/commit/c63bd4a75fb61860e969e4bc229c2754b9aac0b6))


### Features

* add type attribute for prefetch link tags ([#1095](https://github.com/vuepress/core/issues/1095)) ([cd3b569](https://github.com/vuepress/core/commit/cd3b56985f63cd5a7e7934dffec5237b495682b9))
* **bundler-vite:** auto load postcss plugins from postcss config files ([#1088](https://github.com/vuepress/core/issues/1088)) ([0f49c47](https://github.com/vuepress/core/commit/0f49c4798cf3f8b65fbf54a441bfaf68bbade684))
* **bundler-vite:** improve chunk splitting ([#1101](https://github.com/vuepress/core/issues/1101)) ([00b8366](https://github.com/vuepress/core/commit/00b83665182286185593cb03928d5c5b1e5867c5))
* **bundler-vite:** set esbuild output charset to utf-8 (close [#1129](https://github.com/vuepress/core/issues/1129)) ([#1133](https://github.com/vuepress/core/issues/1133)) ([10dd348](https://github.com/vuepress/core/commit/10dd3484de44d7ecf3855cd94c9d632728ef5d6a))
* **client:**  improve default page head title resolver ([#1078](https://github.com/vuepress/core/issues/1078)) ([2d6343e](https://github.com/vuepress/core/commit/2d6343e48cf983883cc2f3f0549e28b59469f28b))
* **markdown:** set extension of code fences in data-ext attribute ([#1132](https://github.com/vuepress/core/issues/1132)) ([f1947f4](https://github.com/vuepress/core/commit/f1947f4ab8353264291769fb3f2b660d9cab2e84))
* **plugin-google-analytics:** add debug option ([#1001](https://github.com/vuepress/core/issues/1001)) ([0f46ac7](https://github.com/vuepress/core/commit/0f46ac7ca6466f0ead43e06b476d8f756daf2c0e))
* **plugin-shiki:** bump shiki to 0.11 ([#1111](https://github.com/vuepress/core/issues/1111)) ([06e3f55](https://github.com/vuepress/core/commit/06e3f55e171e7cea310cee2f840f5b0f6876c2c7))
* **theme-default:** add heroHeight frontmatter for home page ([81398d5](https://github.com/vuepress/core/commit/81398d5e967af92b61aa67329ca374512142bc36))


### Performance Improvements

* avoid bundling hmr code to production ([#1134](https://github.com/vuepress/core/issues/1134)) ([ed8e9e6](https://github.com/vuepress/core/commit/ed8e9e68cc28bfb35a0ec940784f989516143c03))


### BREAKING CHANGES

* **markdown:** the `ext-xxx` class name of code fences has been removed



# [2.0.0-beta.51](https://github.com/vuepress/core/compare/v2.0.0-beta.50...v2.0.0-beta.51) (2022-08-28)


### Bug Fixes

* **bundler-vite:** do not change output entry of client bundle (close [#1043](https://github.com/vuepress/core/issues/1043)) ([b3565cb](https://github.com/vuepress/core/commit/b3565cba73d0e87540b563d86792bbd2bd219de0))
* **bundler-webpack:** add extensionAlias config ([697e7ae](https://github.com/vuepress/core/commit/697e7aef4b27e4b4743895c84860d09681ad0e29))
* **core:** resolve app version correctly ([2a93513](https://github.com/vuepress/core/commit/2a935136fca8980cf89146e6d6f1b0a42a50b700))


### Features

* **client:** make args of defineClientConfig optional ([e418e02](https://github.com/vuepress/core/commit/e418e02b8c6bb179fd2aae2ce1abb9341038e2d0))
* support layouts option in client config ([#1053](https://github.com/vuepress/core/issues/1053)) ([a67a0bf](https://github.com/vuepress/core/commit/a67a0bfd806bda548532836ebf8ec1704b7bcb8a))


### Performance Improvements

* reduce memory usage during rendering ([ea0a2b2](https://github.com/vuepress/core/commit/ea0a2b213a107c7972da63dededc163c716185d6))


### BREAKING CHANGES

* theme API `layouts` has been removed, layouts should be set in client config instead of theme entry
* `404` layout should be renamed to `NotFound` layout
* node API `app.layouts` has been removed



# [2.0.0-beta.50](https://github.com/vuepress/core/compare/v2.0.0-beta.49...v2.0.0-beta.50) (2022-08-23)


### Bug Fixes

* **cli:** handle config file __dirname correctly ([8171f4d](https://github.com/vuepress/core/commit/8171f4d58406d95bfe3d415107f6e0b88521e082))
* **plugin-active-header-links:** keep query when updating hash (close [#991](https://github.com/vuepress/core/issues/991)) ([0fdb021](https://github.com/vuepress/core/commit/0fdb021c678d22f435fe8e94375c92f0bee8b125))
* **plugin-docsearch:** handle navigation url correctly (close [#1024](https://github.com/vuepress/core/issues/1024)) ([b6ded16](https://github.com/vuepress/core/commit/b6ded16f607f5db5a27967260e7e6b7b69a26c2b))
* **theme-default:** fix initial open state of sidebar item ([392297f](https://github.com/vuepress/core/commit/392297fa856fd5869de40e4999c5bc4d126a3941))
* workaround for vite hash issue (close [#1008](https://github.com/vuepress/core/issues/1008)) ([f8cdc9e](https://github.com/vuepress/core/commit/f8cdc9e7adad9ec64986761084ea0656064867a4))


### Code Refactoring

* **markdown:** bump sfc plugin to v0.9 ([b0fc856](https://github.com/vuepress/core/commit/b0fc8566db65cbb8443d9520daaed573a1387f22))


### Features

* **client:** add devtools custom inspector ([5568abe](https://github.com/vuepress/core/commit/5568abe9d4fde1e0830810ebb449670d85e18dbb))
* **core:** pass isServer flag to alias and define hooks ([7862813](https://github.com/vuepress/core/commit/7862813cce58160bf6511d50b44c5071602aa404))
* migrate to pure ESM ([#1030](https://github.com/vuepress/core/issues/1030)) ([d283ffe](https://github.com/vuepress/core/commit/d283ffe3ef0668bfea54e6d973066695f46f13c0))


### BREAKING CHANGES

* VuePress is now published as pure ESM packages
* CommonJS config file is not supported anymore
* **markdown:** type of node-api `page.sfcBlocks` has been changed



# [2.0.0-beta.49](https://github.com/vuepress/core/compare/v2.0.0-beta.48...v2.0.0-beta.49) (2022-07-11)


### Bug Fixes

* **bundler-vite:** handle process.env replacement in dev ([20f8a3f](https://github.com/vuepress/core/commit/20f8a3f8d4079cb056188f57162c74b4bc0ced65))
* **cli:** check dest path correctly (close [#954](https://github.com/vuepress/core/issues/954)) ([6a18c91](https://github.com/vuepress/core/commit/6a18c91af5bcd756fce7085b6e5dc106a05c4f7a))
* **theme-default:** fallback select language aria-label correctly ([d450478](https://github.com/vuepress/core/commit/d4504788a2223839950d8e0488bdf7b05e20626a))
* **theme-default:** fix 404 page style regression (close [#963](https://github.com/vuepress/core/issues/963)) ([6a26f0b](https://github.com/vuepress/core/commit/6a26f0b23c9a3be35ec571590b7d15bb4c965607))
* **theme-default:** fix minor issues of collapsible sidebar (close [#967](https://github.com/vuepress/core/issues/967)) ([022e611](https://github.com/vuepress/core/commit/022e61108f2f80b1817a0e9a58c735916d8cc106))
* **theme-default:** make headings anchor non-selectable ([#973](https://github.com/vuepress/core/issues/973)) ([5020fc1](https://github.com/vuepress/core/commit/5020fc1d9cb5fbc1adbc9e2581bdf0766adfd1c6))


### Code Refactoring

* **markdown:** externalize custom component plugin ([a1909c0](https://github.com/vuepress/core/commit/a1909c01a2e9db49b989f7bd64f37d3d9e9d5483))
* **markdown:** externalize headers and title plugin ([8441569](https://github.com/vuepress/core/commit/84415691662b7452f09ed04d2b80d92e4c9a2e8e))
* **markdown:** externalize sfc plugin ([a23aaa1](https://github.com/vuepress/core/commit/a23aaa142d5fc8979adb14e468b7aadc2c062b84))


### Features

* **markdown:** support frontmatter options ([6056e37](https://github.com/vuepress/core/commit/6056e37342d2851b8320cd9f7e6bd5f04649194f))
* **theme-default:** try to keep current hash across languages ([a13c1e7](https://github.com/vuepress/core/commit/a13c1e792126a89d6a45afc85a49486d1bc069f9))
* **utils:** add isChildPath util ([698e599](https://github.com/vuepress/core/commit/698e5998956f149a00b1dd12706285d264b896ab))


### BREAKING CHANGES

* **markdown:** `markdown.extractHeaders` has been renamed to `markdown.headers`
* **markdown:** `markdown.extractTitle` has been renamed to `markdown.title`
* **markdown:** `markdown.hoistTags` has been renamed to `markdown.sfc`
* **markdown:** node-api `page.hoistedTags` has been renamed to `page.sfcBlocks`
* **markdown:** `markdown.customComponent` has been renamed to `markdown.component`



# [2.0.0-beta.48](https://github.com/vuepress/core/compare/v2.0.0-beta.47...v2.0.0-beta.48) (2022-06-11)


### Bug Fixes

* **plugin-docsearch:** keep base in result items (close [#933](https://github.com/vuepress/core/issues/933)) ([35ebc91](https://github.com/vuepress/core/commit/35ebc91bbcaf8ef6772baf037eb8c99083ab50dc))
* **shared:** check markdown links correctly ([252f4ac](https://github.com/vuepress/core/commit/252f4acb2f7b69b8c920aafac362d44027f9ae49))


### Performance Improvements

* replace object literals with json when generating client codes ([6db42f0](https://github.com/vuepress/core/commit/6db42f0cb2030285e0e208a83bb6e9e82f82caf8))



# [2.0.0-beta.47](https://github.com/vuepress/core/compare/v2.0.0-beta.46...v2.0.0-beta.47) (2022-06-10)


### Bug Fixes

* **plugin-active-header-links:** remove hash at page top (close [#913](https://github.com/vuepress/core/issues/913)) ([#920](https://github.com/vuepress/core/issues/920)) ([268fa6d](https://github.com/vuepress/core/commit/268fa6d0848829c97433bd8bbe57c21bb26c8423))
* **plugin-docsearch:** fix search modal on mobile ([52fda1e](https://github.com/vuepress/core/commit/52fda1e2de5c02f5b51e3cfe7bddb50127b0a5f5))
* **plugin-docsearch:** use min-width to avoid layout shift after initialization ([b208be5](https://github.com/vuepress/core/commit/b208be5a86bb6cf11071798eccd1326d4d8f4a89))
* **theme-default:** fix header anchor offset regression ([e4b4ded](https://github.com/vuepress/core/commit/e4b4dedea8652b305d9092a7d236479ffcef6741))


### Features

* **bundler-vite:** enable vue prod devtools in debug mode ([39fe57b](https://github.com/vuepress/core/commit/39fe57bb3a2d2536eb5fd2282047ff342f603ae4))
* **bundler-webpack:** enable vue prod devtools in debug mode ([4acc725](https://github.com/vuepress/core/commit/4acc725de7bd479dcba78e531a196fa6cbebb878))
* **core:** support permalinkPattern in app options (close [#778](https://github.com/vuepress/core/issues/778)) ([#834](https://github.com/vuepress/core/issues/834)) ([07fbe43](https://github.com/vuepress/core/commit/07fbe43ac3ba62411d85813351893ea83dff2cd5))
* **markdown:** support markdown.slugify option ([0143ba6](https://github.com/vuepress/core/commit/0143ba62eb2c4694ab77cee75bc036a7b2481c61))
* **plugin-pwa:** improve types definition ([e7590f4](https://github.com/vuepress/core/commit/e7590f49d38677f2d6065d13984fb9a928821aac))
* **plugin-search:** improve search input hotkeys (close [#746](https://github.com/vuepress/core/issues/746)) ([#831](https://github.com/vuepress/core/issues/831)) ([c98d70a](https://github.com/vuepress/core/commit/c98d70aad899e71f9f436a2b5366d137b7d2302b))
* **theme-default:** support `colorMode` and `colorModeSwitch` options (close [#796](https://github.com/vuepress/core/issues/796)) ([d89cf86](https://github.com/vuepress/core/commit/d89cf864af39981df78a8173d0bdfffb0dc74155))


### Performance Improvements

* **bundler-vite:** only apply workaround plugin for serve ([05b88e6](https://github.com/vuepress/core/commit/05b88e6da688956656ff05d5d03f506a6e9dc36d))


### BREAKING CHANGES

* **theme-default:** `darkMode` has been replaced with `colorMode` and `colorModeSwitch`
* **theme-default:** `toggleDarkMode` has been renamed to `toggleColorMode`



# [2.0.0-beta.46](https://github.com/vuepress/core/compare/v2.0.0-beta.45...v2.0.0-beta.46) (2022-05-26)


### Bug Fixes

* **core:** wrap page content to avoid issues of fragment (close [#688](https://github.com/vuepress/core/issues/688)) ([fb76656](https://github.com/vuepress/core/commit/fb766569ec3d2622ef32fbeef2438117234a253d))
* **markdown:** resolve srcset attr of html img tags (close [#809](https://github.com/vuepress/core/issues/809)) ([#818](https://github.com/vuepress/core/issues/818)) ([ea53747](https://github.com/vuepress/core/commit/ea537470b49024efa937242e0a34b2398bbc2970))
* **plugin-pwa-popup:** fix component setup regression (close [#903](https://github.com/vuepress/core/issues/903)) ([3daecdd](https://github.com/vuepress/core/commit/3daecdd2a3fa48c734040b88b3491ca11442c260))
* **plugin-pwa:** make the options optional ([e781f0a](https://github.com/vuepress/core/commit/e781f0a1505f43ef69cea4164b8703e007e90785))
* **theme-default:** access dom after mounted ([#895](https://github.com/vuepress/core/issues/895)) ([68be74d](https://github.com/vuepress/core/commit/68be74da0cd4156b08e66278c7ebe4c2a8eca82b))
* **theme-default:** use lighter bg color for inline code ([0c9b5ce](https://github.com/vuepress/core/commit/0c9b5ce1b61acc097bd7a7d7a5c809d019fe7f35))


### Features

* **bundler-vite:** use development mode when debugging ([77dc5fc](https://github.com/vuepress/core/commit/77dc5fc45f3e18281915dc6a2789c61f86799563))
* **bundler-webpack:** use development mode when debugging (close [#734](https://github.com/vuepress/core/issues/734)) ([977114e](https://github.com/vuepress/core/commit/977114e219c765d824772b9feeb029b8754d1e8e))
* **plugin-external-link-icon:** add frontmatter type ([964c308](https://github.com/vuepress/core/commit/964c30851f2458f0704526f2633ed0e7e78b0888))
* **plugin-git:** support gitInclude frontmatter (close [#449](https://github.com/vuepress/core/issues/449)) ([#460](https://github.com/vuepress/core/issues/460)) ([4f5a9af](https://github.com/vuepress/core/commit/4f5a9afa8374f0e30601892db8cd9c7433fea6d3))
* **theme-default:** add page-content-top and page-content-bottom slots (close [#857](https://github.com/vuepress/core/issues/857)) ([51f30a2](https://github.com/vuepress/core/commit/51f30a2163f9e1c963ff88da9fc0856e91e57096))



# [2.0.0-beta.45](https://github.com/vuepress/core/compare/v2.0.0-beta.44...v2.0.0-beta.45) (2022-05-14)



# [2.0.0-beta.44](https://github.com/vuepress/core/compare/v2.0.0-beta.43...v2.0.0-beta.44) (2022-05-14)


### Bug Fixes

* **theme-default:** allow non-url-encoded filename in theme config (close [#884](https://github.com/vuepress/core/issues/884)) ([dd1d240](https://github.com/vuepress/core/commit/dd1d2408ba67519f6bfaa1dd55772d80d894f5ac))


### Features

* **cli:** add check for base and dest config ([c060a6c](https://github.com/vuepress/core/commit/c060a6c9d7d49fc099a9f14fdae6861ddea109c2))
* **cli:** allow .cjs config file ([e1152d1](https://github.com/vuepress/core/commit/e1152d1212296622c6a1349ed9e1de8c292561c2))
* **core:** merge all client files hooks into clientConfigFile ([#888](https://github.com/vuepress/core/issues/888)) ([ad8b5a8](https://github.com/vuepress/core/commit/ad8b5a804295f806274d9fe776f68d5610b92545))
* **markdown:** improve line-number DOM structure ([#819](https://github.com/vuepress/core/issues/819)) ([d938852](https://github.com/vuepress/core/commit/d938852328672b09d61a2488e72079ff625fe3a4))
* **markdown:** prepend base to absolute links to markdown files (close [#653](https://github.com/vuepress/core/issues/653)) ([e4155a0](https://github.com/vuepress/core/commit/e4155a0dc688671d5ffa493d4646e3bc8c09b273))
* **theme-default:** normalize html and body font-size ([#817](https://github.com/vuepress/core/issues/817)) ([fd26901](https://github.com/vuepress/core/commit/fd26901fbc238a1a2d6c3d80191851e965f4d7a7))


### BREAKING CHANGES

* **markdown:** now absolute links to markdown files will be treated as internal links, and do not need to prepend `base` manually
* **core:** `clientAppEnhanceFiles`, `clientAppRootComponentFiles` and `clientAppSetupFiles` hooks are removed, use `clientConfigFile` hook instead
* **core:** conventional file `.vuepress/clientAppEnhance.{js,ts}` has been renamed to `.vuepress/client.{js,ts}`, and the usage has been changed too



# [2.0.0-beta.43](https://github.com/vuepress/core/compare/v2.0.0-beta.42...v2.0.0-beta.43) (2022-05-02)


### Bug Fixes

* avoid processing extendsBundlerOptions hook twice in build (close [#863](https://github.com/vuepress/core/issues/863)) ([8d69ffb](https://github.com/vuepress/core/commit/8d69ffb532fe990352c1696c20837cd88187a6f3))
* **bundler-vite:** only set client packages in noExternal (close [#866](https://github.com/vuepress/core/issues/866)) ([ff62e2a](https://github.com/vuepress/core/commit/ff62e2ad5954cff2950b4c65981d90b6c8a40c26))
* **cli:** avoid bin name conflicts (close [#869](https://github.com/vuepress/core/issues/869)) ([6d7db43](https://github.com/vuepress/core/commit/6d7db43fcf4e516ec8db30d7db0bca0f2e7ca371))


### Features

* **markdown:** support vPre for inline code (close [#683](https://github.com/vuepress/core/issues/683)) ([ef2a014](https://github.com/vuepress/core/commit/ef2a014de2ddff8e4dd4318746d90923deb0da4c))


### BREAKING CHANGES

* **markdown:** type of `code.vPre` option changed from `boolean` to
`Record<'block' | 'inline', boolean>`



# [2.0.0-beta.42](https://github.com/vuepress/core/compare/v2.0.0-beta.41...v2.0.0-beta.42) (2022-05-01)


### Build System

* drop support for node 12 ([#852](https://github.com/vuepress/core/issues/852)) ([fc1c51b](https://github.com/vuepress/core/commit/fc1c51b3a13aa3ddf1b9824e5e98dac350a39449))


### Features

* **core:** support extendsBundlerOptions hook ([9c56052](https://github.com/vuepress/core/commit/9c56052c072623e7a19224eedb88784330c9f310))


### BREAKING CHANGES

* drop support for node 12



# [2.0.0-beta.41](https://github.com/vuepress/core/compare/v2.0.0-beta.40...v2.0.0-beta.41) (2022-04-25)


### Bug Fixes

* **plugin-nprogress:** fork nprogress to local ([45770b1](https://github.com/vuepress/core/commit/45770b1b82f27e9c37e0689f99aa098cc7a73fee))



# [2.0.0-beta.40](https://github.com/vuepress/core/compare/v2.0.0-beta.39...v2.0.0-beta.40) (2022-04-25)

## IMPORTANT

This release contains important breaking changes. The way to use bundler, theme and plugins has been totally changed.

The old way is a legacy of VuePress v1. We finally decided to drop it for following reasons:

- To get better type hint. The old string-based way is difficult to provide good types support.
- To be more explicit. Now we should import and use theme / plugins explicitly, instead of simply putting a string there.
- To be more normalized. With the old string-based way, we have to `require.resolve` dependencies inside the core package, which could not work with some strict package manager like [pnpm](https://pnpm.io/).

You could migrate your config file as follow, and check our latest docs for more details:

```diff
- module.exports = {
-   theme: '@vuepress/theme-default',
-   themeConfig: {
-     // default theme config
-   },
- }

+ const { defaultTheme } = require('vuepress')
+ module.exports = {
+   theme: defaultTheme({
+     // default theme config
+   })
+ }
```

```diff
- module.exports = {
-   bundler: '@vuepress/bundler-vite',
-   bundlerConfig: {
-     // vite bundler config
-   },
- }

+ const { viteBundler } = require('vuepress')
+ module.exports = {
+   bundler: viteBundler({
+     // vite bundler config
+   })
+ }
```

```diff
- module.exports = {
-   plugins: [
-     [
-       '@vuepress/plugin-google-analytics',
-       {
-         id: 'G-XXXXXXXXXX',
-       },
-     ],
-   ],
- }

+ const { googleAnalyticsPlugin } = require('@vuepress/plugin-google-analytics')
+ module.exports = {
+   plugins: [
+     googleAnalyticsPlugin({
+         id: 'G-XXXXXXXXXX',
+     }),
+   ],
+ }
```

### Bug Fixes

* allow building multiple times in the same dest dir (close [#772](https://github.com/vuepress/core/issues/772)) ([30bb4a8](https://github.com/vuepress/core/commit/30bb4a8aa9d06fd52ffce5611dd7b255387c0c71))
* **bundler-vite:** disable scss charset by default ([f3f8772](https://github.com/vuepress/core/commit/f3f877209a5800f7ceafdda9d73047fe8a19a785))
* **bundler-vite:** fix build failure when there are no css files (close [#697](https://github.com/vuepress/core/issues/697)) ([#829](https://github.com/vuepress/core/issues/829)) ([f6101a5](https://github.com/vuepress/core/commit/f6101a591b79469c18e6bb1cf368aa9d36120a5e))
* **bundler-vite:** remove redundant use of postcss-csso (close [#759](https://github.com/vuepress/core/issues/759)) ([00c27c3](https://github.com/vuepress/core/commit/00c27c32fb290d757725181d4cd57e9c9df85835))
* **client:** support hot-reload of frontmatter head ([effa95f](https://github.com/vuepress/core/commit/effa95f821957dc293205ce9e13c46cddc0d1ea5))
* **plugin-active-header-links:** do not append hash at page top (close [#693](https://github.com/vuepress/core/issues/693)) ([#722](https://github.com/vuepress/core/issues/722)) ([f71cb50](https://github.com/vuepress/core/commit/f71cb5020da1d84cac54e5f02812f36c02dd85f4))
* **plugin-palette:** fix sass import when path contains spaces (close [#481](https://github.com/vuepress/core/issues/481)) ([#814](https://github.com/vuepress/core/issues/814)) ([bbea812](https://github.com/vuepress/core/commit/bbea812698cbe8f19e39671e9bf7bd6b49deede4))


### Code Refactoring

* drop support for using bundler, theme and plugins by name ([#843](https://github.com/vuepress/core/issues/843)) ([b85b1c3](https://github.com/vuepress/core/commit/b85b1c3b39e80a8de92a7469381061f75ef33623))


### Features

* **cli:** enable sourcemap for ts files (close [#457](https://github.com/vuepress/core/issues/457)) ([bf8c4bc](https://github.com/vuepress/core/commit/bf8c4bc440ffdb6ea0d880309eb1dbb1f9372a39))
* **core:** enable prefetch by default ([9d40851](https://github.com/vuepress/core/commit/9d408519c69234d793359ef27977941fd80dfae1))
* **markdown:** bump markdown-it to v13 ([09a3637](https://github.com/vuepress/core/commit/09a3637c0dc81d2afe61db9da13229cd4409e0f1))
* **markdown:** improve code fence language detection (close [#752](https://github.com/vuepress/core/issues/752)) ([#815](https://github.com/vuepress/core/issues/815)) ([1c4d237](https://github.com/vuepress/core/commit/1c4d23764d51134a5807a14f881ce24e6ce2378a))
* **plugin-docsearch:** remove preact dependency ([bb4a2ca](https://github.com/vuepress/core/commit/bb4a2cabe4ab6ed29c5a698454f6a8be5729c69a))


### BREAKING CHANGES

* config `bundler` should import the bundler directly, and `bundlerConfig` has been removed
* config `theme` should import the theme directly, and `themeConfig` has been removed
* config `plugins` should import the plugins directly
* theme API `plugins` should import the plugins directly
* theme API `extends` should import the parent theme directly
* plugin function and theme function should no longer accept user options as the first param, please check out the guide for how to write a plugin and a theme
* **core:** default value of `shouldPrefetch` option has been changed from `false` to `true`



# [2.0.0-beta.39](https://github.com/vuepress/core/compare/v2.0.0-beta.38...v2.0.0-beta.39) (2022-04-10)


### Bug Fixes

* **bundler-vite:** clear file hash in workaround plugin (close [#800](https://github.com/vuepress/core/issues/800)) ([3569cd9](https://github.com/vuepress/core/commit/3569cd98f217a0e2e3a74bc5e71490efa7d697d1))





# [2.0.0-beta.38](https://github.com/vuepress/core/compare/v2.0.0-beta.37...v2.0.0-beta.38) (2022-04-05)


### Features

* **bundler-vite:** bump to vite 2.9 (close [#781](https://github.com/vuepress/core/issues/781)) ([7b3e88e](https://github.com/vuepress/core/commit/7b3e88e1877e047f97851e3c6ea9ca57fb9a00bc))
* **core:** support frontmatter type param in Page type (close [#638](https://github.com/vuepress/core/issues/638)) ([6a4733f](https://github.com/vuepress/core/commit/6a4733f2fe3acfe72f0d7611d6f604fade44d5dc))


### BREAKING CHANGES

* **core:** the generics type params of Page type has been changed





# [2.0.0-beta.37](https://github.com/vuepress/core/compare/v2.0.0-beta.36...v2.0.0-beta.37) (2022-03-31)


### Bug Fixes

* **theme-default:** fallback external-link-icon when the plugin is disabled (close [#766](https://github.com/vuepress/core/issues/766)) ([#769](https://github.com/vuepress/core/issues/769)) ([3628fbf](https://github.com/vuepress/core/commit/3628fbfa96ffd7a9ea218808d8e412e3d8ae7fbd))


### Features

* **plugin-docsearch:** add debounce on search (close [#216](https://github.com/vuepress/core/issues/216)) ([#771](https://github.com/vuepress/core/issues/771)) ([c82f735](https://github.com/vuepress/core/commit/c82f735a54e4b837c77ec4e9e5ef87fd0ba8ddb8))
* **plugin-docsearch:** bump docsearch to 3.0.0 (close [#718](https://github.com/vuepress/core/issues/718)) ([#721](https://github.com/vuepress/core/issues/721)) ([85819c3](https://github.com/vuepress/core/commit/85819c3011005727322804896fedc47c447fe5dd))
* **theme-default:** enhance header dropdown experience ([#736](https://github.com/vuepress/core/issues/736)) ([ad530e7](https://github.com/vuepress/core/commit/ad530e78f95ef71077ad0c2d1b1c7c0054a54ef3))
* **theme-default:** scroll active sidebar item into view ([#698](https://github.com/vuepress/core/issues/698)) ([08b9e9a](https://github.com/vuepress/core/commit/08b9e9a74d07de976da4da14c83279faf759579d))


### Reverts

* feat(theme-default): enhance header dropdown experience ([#736](https://github.com/vuepress/core/issues/736)) ([#786](https://github.com/vuepress/core/issues/786)) ([856be61](https://github.com/vuepress/core/commit/856be61f2f2ae5d16fe46e36ef57fcf31ffe00e4))





# [2.0.0-beta.36](https://github.com/vuepress/core/compare/v2.0.0-beta.35...v2.0.0-beta.36) (2022-03-01)


### Bug Fixes

* avoid user content to be used as string params (close [#727](https://github.com/vuepress/core/issues/727)) ([788afda](https://github.com/vuepress/core/commit/788afdab56e4048f61505280113e4a073f418f4f))
* **bundler-webpack:** allow `configureWebpack` option to return void ([#662](https://github.com/vuepress/core/issues/662)) ([4488cb3](https://github.com/vuepress/core/commit/4488cb31d01cf9a198124631f5e3296d1d0f12ab))
* **theme-default:** fix title style when no content in custom container (close [#648](https://github.com/vuepress/core/issues/648)) ([#657](https://github.com/vuepress/core/issues/657)) ([73d297f](https://github.com/vuepress/core/commit/73d297f321750de098c22c8c774dbe934475ddcb))
* use function to pass a single default slot in render function (close [#716](https://github.com/vuepress/core/issues/716)) ([4550161](https://github.com/vuepress/core/commit/455016192955fb6af74821baf52d3c2c1e4d42c9))


### Features

* **cli:** watch page dependencies on dev ([e6ed487](https://github.com/vuepress/core/commit/e6ed487c6d7002fdde1034a961853218b0eb4418))
* **markdown:** add aria-hidden for line-numbers ([#731](https://github.com/vuepress/core/issues/731)) ([6f5d132](https://github.com/vuepress/core/commit/6f5d13289dd41dbb55d883ff8bff996e77b6daf9))





# [2.0.0-beta.35](https://github.com/vuepress/core/compare/v2.0.0-beta.34...v2.0.0-beta.35) (2022-01-22)


### Bug Fixes

* **cli:** watch user config correctly on win32 (close [#611](https://github.com/vuepress/core/issues/611)) ([055b174](https://github.com/vuepress/core/commit/055b174d5eb30aae76fe409b948da2be5a7fbe58))


### Features

* **client:** allow customizing global computed resolvers (close [#338](https://github.com/vuepress/core/issues/338)) ([405fc8d](https://github.com/vuepress/core/commit/405fc8d7aa579d04b43bf21f926176da761ea2e6))





# [2.0.0-beta.34](https://github.com/vuepress/core/compare/v2.0.0-beta.33...v2.0.0-beta.34) (2022-01-21)


### Bug Fixes

* **theme-default:** add missing color transitions ([0955c9f](https://github.com/vuepress/core/commit/0955c9f48a4811d681f8b20620a1c5134dcb3c14))
* **theme-default:** highlight sidebar heading when used as a link (close [#628](https://github.com/vuepress/core/issues/628)) ([1a5f4fb](https://github.com/vuepress/core/commit/1a5f4fb7bf66671a2b0acbaf5bca47a00a48daaa))


### Code Refactoring

* remove debug plugin ([f8481eb](https://github.com/vuepress/core/commit/f8481eb06b001c81e54cd6fab7d12f1ab75cdbc7))


### Features

* **client:** add vue-devtools support ([a19d945](https://github.com/vuepress/core/commit/a19d945445a4b50455553c1221eaeefda6e73211))
* **plugin-docsearch:** bump docsearch version to support translations ([47a0ef1](https://github.com/vuepress/core/commit/47a0ef149c7acdd8317f83c2a374b80dd39761ef))
* **plugin-external-link-icon:** add locales option ([#636](https://github.com/vuepress/core/issues/636)) ([c7f0c43](https://github.com/vuepress/core/commit/c7f0c43366405ef1a8e6b69aadfb35c9c9361452))
* **plugin-theme-data:** add devtools support ([dab437c](https://github.com/vuepress/core/commit/dab437cc7f331fb8da619485a47d2529cb4ce91a))
* **theme-default:** improve sidebar a11y (close [#604](https://github.com/vuepress/core/issues/604)) ([8033b82](https://github.com/vuepress/core/commit/8033b826123e8d57f00cbd393a10b8a268239fe0))


### BREAKING CHANGES

* `@vuepress/plugin-debug` package has been removed





# [2.0.0-beta.33](https://github.com/vuepress/core/compare/v2.0.0-beta.32...v2.0.0-beta.33) (2022-01-12)


### Bug Fixes

* **core:** should process page hooks inside createPage ([e1cbab5](https://github.com/vuepress/core/commit/e1cbab50bf79f8278fdc4d9a63c21762443a3183))
* **markdown:** replace img src correctly when wrapped with other html tags (close [#597](https://github.com/vuepress/core/issues/597)) ([f2f53ef](https://github.com/vuepress/core/commit/f2f53efc21a1c16c342f32d15562b7153e48ce70))
* **theme-default:** bump vueuse to avoid localstorage error (close [#589](https://github.com/vuepress/core/issues/589)) ([#612](https://github.com/vuepress/core/issues/612)) ([7558681](https://github.com/vuepress/core/commit/755868194a05ae8d1d70fbd14c0230e8080f7db1))


### Features

* **core:** allow theme to set default HTML templates ([4fb7b55](https://github.com/vuepress/core/commit/4fb7b55741bd9a89769c758e71bc341d44d84d3e))
* **plugin-shiki:** bump shiki to 0.10.0 ([9d42e56](https://github.com/vuepress/core/commit/9d42e56c7ea4b74046ef1b41a39fc4862c39e6f3))
* **theme-default:** imporve dark mode experience (close [#387](https://github.com/vuepress/core/issues/387)) ([c20a1ba](https://github.com/vuepress/core/commit/c20a1baa97f4fbbc6a907fb8ca0f76a3cc0310c1))
* **theme-default:** make all non-global components replaceable ([f480bb2](https://github.com/vuepress/core/commit/f480bb25943fe1a81e2ceda8f1b53afbb11b254c))





# [2.0.0-beta.32](https://github.com/vuepress/core/compare/v2.0.0-beta.31...v2.0.0-beta.32) (2021-12-28)


### Bug Fixes

* **theme-default:** avoid transition on fragment child (close [#592](https://github.com/vuepress/core/issues/592)) ([10e5cc0](https://github.com/vuepress/core/commit/10e5cc06b96f9dc2fc8ba2c8bdc83f7177e213bc))


### Code Refactoring

* **core:** normalize core app structure ([6952acf](https://github.com/vuepress/core/commit/6952acfeee4575e53ce468c3d180dc9f623d6cd1))


### Features

* **shared:** improve types of site base ([66943fb](https://github.com/vuepress/core/commit/66943fb185acbc90efbc3c1509a02c9c22963393))


### BREAKING CHANGES

* **core:** config `templateSSR` is renamed to `templateBuild`





# [2.0.0-beta.31](https://github.com/vuepress/core/compare/v2.0.0-beta.30...v2.0.0-beta.31) (2021-12-24)


### Bug Fixes

* **theme-default:** code line numbers unaligned in different display scale (close [#499](https://github.com/vuepress/core/issues/499)) ([21accb5](https://github.com/vuepress/core/commit/21accb5773224363a548915a6f3a7a23a5bcfa0d))
* **theme-default:** remove focus-visible outline (close [#359](https://github.com/vuepress/core/issues/359)) ([cfbaa14](https://github.com/vuepress/core/commit/cfbaa14270df0584594f56abc5a9ac0c8a6b945a))


### Features

* **theme-default:** support collapsible sidebar (close [#397](https://github.com/vuepress/core/issues/397)) ([c7fd815](https://github.com/vuepress/core/commit/c7fd81580a9061b22f1a60a735fdc9a527ef1bfd))





# [2.0.0-beta.30](https://github.com/vuepress/core/compare/v2.0.0-beta.29...v2.0.0-beta.30) (2021-12-23)


### Bug Fixes

* **plugin-back-to-top:** fix regression when upgrading ts-debounce (close [#579](https://github.com/vuepress/core/issues/579)) ([7a6a45b](https://github.com/vuepress/core/commit/7a6a45be5aec933c0bfd983a1e9d35ee1231761d))
* **theme-default:** arrows not displaying in page nav ([#573](https://github.com/vuepress/core/issues/573)) ([2d5b084](https://github.com/vuepress/core/commit/2d5b08400316a1734ddc6451f390ebcd9db3faa3))
* **theme-default:** do not always wrap logo and hero image with client-only ([6b4ee45](https://github.com/vuepress/core/commit/6b4ee45fdba81705af02ed6a55d9c1314ddf360a))


### Features

* **bundler-webpack:** add devServerSetupMiddlewares option ([4a042a4](https://github.com/vuepress/core/commit/4a042a4abc96fc208b6da658782ad3e99fd7af7b))


### BREAKING CHANGES

* **bundler-webpack:** `beforeDevServer` and `afterDevServer` options are removed, use `devServerSetupMiddlewares` instead





# [2.0.0-beta.29](https://github.com/vuepress/core/compare/v2.0.0-beta.28...v2.0.0-beta.29) (2021-12-18)


### Bug Fixes

* **core:** set default bundler option to vite ([3fd11f5](https://github.com/vuepress/core/commit/3fd11f5321e5efbc2a6fdbf28a3b01834e9153b0))
* **core:** use theme after its plugins ([fc5bd91](https://github.com/vuepress/core/commit/fc5bd91bb7dfb9f20bd9e916886a00518ae1989f))


### Features

* extract external link icon to plugin ([437b750](https://github.com/vuepress/core/commit/437b75076667e653d3600c96f9f4a7c3c3e47e57))
* **theme-default:** export default locale options ([e3ac623](https://github.com/vuepress/core/commit/e3ac6230faa75f1557d07753f04670ef29767442))


### BREAKING CHANGES

* config `markdown.links.externalIcon` is removed, use plugin-external-link-icon instead
* frontmatter `externalIcon` is removed, use `externalLinkIcon` from plugin-external-link-icon
* component `OutboundLink` is removed, use `ExternalLinkIcon` from plugin-external-link-icon





# [2.0.0-beta.28](https://github.com/vuepress/core/compare/v2.0.0-beta.27...v2.0.0-beta.28) (2021-12-17)


### Bug Fixes

* **bundler-vite:** flatten the plugins structure to avoid ordering issue (close [#535](https://github.com/vuepress/core/issues/535)) ([b4011ac](https://github.com/vuepress/core/commit/b4011ac9c4f02a0ff06636f6cbb6f68f63d26109))
* **theme-default:** fix kbd color in dark mode ([#503](https://github.com/vuepress/core/issues/503)) ([31bea57](https://github.com/vuepress/core/commit/31bea57f855f322c1119d86bd256a5c98a983c41))
* **theme-default:** use browser default locale in last updated date ([#462](https://github.com/vuepress/core/issues/462)) ([3746e66](https://github.com/vuepress/core/commit/3746e664d79dc1088e94bbb6f2eda2cf6df7cc1c))


### Features

* **core:** replace extendsPageData with extendsPage hook ([827a873](https://github.com/vuepress/core/commit/827a873ca8f7230aeecac208f55934f824774760))
* **core:** support extendsMarkdownOptions hook ([a1fc69b](https://github.com/vuepress/core/commit/a1fc69bdbc65f09eedacc4f860bba1ac7175c4af))
* **core:** support routeMeta in frontmatter ([93cdb53](https://github.com/vuepress/core/commit/93cdb53a6134e43968b56a84f2e8bf012222436a))
* **theme-default:** make the arrows in page nav clickable ([#540](https://github.com/vuepress/core/issues/540)) ([e7b31fd](https://github.com/vuepress/core/commit/e7b31fdad9d6cc410b332458800aa1e00d538643))
* **theme-default:** support heroImageDark frontmatter (close [#526](https://github.com/vuepress/core/issues/526)) ([#559](https://github.com/vuepress/core/issues/559)) ([779ddaa](https://github.com/vuepress/core/commit/779ddaa8cb46d293d3048d5ac2a425ead1322763))
* **vuepress-webpack:** add vuepress-webpack package ([a2d9c9a](https://github.com/vuepress/core/commit/a2d9c9ae95a9e89795bf81cd767a52770ccfa523))
* **vuepress:** switch default bundler to vite ([e1004df](https://github.com/vuepress/core/commit/e1004df6e892f68d31e15f252010d189a3762b52))


### BREAKING CHANGES

* **vuepress:** switch default bundler from webpack to vite
* **core:** now `app.markdown` is only available in and after `onInitialized` hook
* **core:** now `extendsPageOptions` hook does not allow a return value any more
* **core:** `extendsPageData` hook should be migrated to `extendsPage` hook





# [2.0.0-beta.27](https://github.com/vuepress/core/compare/v2.0.0-beta.26...v2.0.0-beta.27) (2021-10-28)


### Bug Fixes

* **shared:** treat ftp links as external (close [#456](https://github.com/vuepress/core/issues/456)) ([9894b56](https://github.com/vuepress/core/commit/9894b5691950545fc90976e7fcc9aee9190ca7f8))
* **theme-default:** avoid ssr-mismatch of dark mode logo (close [#453](https://github.com/vuepress/core/issues/453)) ([aaf1152](https://github.com/vuepress/core/commit/aaf1152495f6f28285f94f9a48c35b1002f522e9))
* **theme-default:** fix code overflow-wrap in Safari (close [#435](https://github.com/vuepress/core/issues/435)) ([6e6fe4f](https://github.com/vuepress/core/commit/6e6fe4fed7cc50f33db0ecd345dc21861f57dc60))
* **theme-default:** hero actions spacing on small devices (close [#381](https://github.com/vuepress/core/issues/381)) ([#442](https://github.com/vuepress/core/issues/442)) ([288927a](https://github.com/vuepress/core/commit/288927a9186cd2d50b0523c8970271d259279d04))


### Features

* **bundler-vite:** compat with vite 2.6 ([bad82eb](https://github.com/vuepress/core/commit/bad82eb89dd85a3b9786fc72fbb9ee299a3909fe))
* **shared:** add isLinkFtp util ([b8f35c9](https://github.com/vuepress/core/commit/b8f35c970f32f723179d229a7e297d5cd6fb2efb))
* **theme-default:** support editLinkPattern frontmatter (close [#450](https://github.com/vuepress/core/issues/450)) ([edecf2d](https://github.com/vuepress/core/commit/edecf2d2b0735200b2b354afabc851ebf43e3225))





# [2.0.0-beta.26](https://github.com/vuepress/core/compare/v2.0.0-beta.25...v2.0.0-beta.26) (2021-09-11)


### Bug Fixes

* **client:** fix aria-hidden attribute of OutboundLink (close [#427](https://github.com/vuepress/core/issues/427)) ([#432](https://github.com/vuepress/core/issues/432)) ([0575ba9](https://github.com/vuepress/core/commit/0575ba9326cbb41a97fa3956e0e28d60af7c9c13))
* **client:** fix wrong attrs selector when loading head tags (close [#426](https://github.com/vuepress/core/issues/426)) ([5654685](https://github.com/vuepress/core/commit/5654685c9674e705b099bc5e1b75ba491205ef83))
* **core:** use absolute path when creating pages (close [#421](https://github.com/vuepress/core/issues/421)) ([0a2f7dc](https://github.com/vuepress/core/commit/0a2f7dc0b17903723e1358cf4d66b20b709241db))


### Features

* **theme-default:** support navbar and sidebar slot for Layout.vue ([a42e431](https://github.com/vuepress/core/commit/a42e431a898240c67471a198fbde33c8805c2850))


### BREAKING CHANGES

* **core:** now `PageOptions` does not accept relative file path





# [2.0.0-beta.25](https://github.com/vuepress/core/compare/v2.0.0-beta.24...v2.0.0-beta.25) (2021-08-29)


### Bug Fixes

* **plugin-git:** add HEAD into git shortlog arguments (close [#205](https://github.com/vuepress/core/issues/205)) ([#398](https://github.com/vuepress/core/issues/398)) ([9be4de1](https://github.com/vuepress/core/commit/9be4de1c02fa0e2574fdac3872bf7afc3611e4ae))
* **theme-default:** improve the style for non-square logo ([#386](https://github.com/vuepress/core/issues/386)) ([ff7c57f](https://github.com/vuepress/core/commit/ff7c57f9b99736d67c01d232b6208fdc2f0d0321))


### Code Refactoring

* add prefix to client constants (close [#392](https://github.com/vuepress/core/issues/392)) ([c6447c4](https://github.com/vuepress/core/commit/c6447c4ba1a98cb5c5ea6991c1fcdd573668c9c1))


### Features

* **bundler-webpack:** bump webpack-dev-server to 4.0.0 ([6e3fc32](https://github.com/vuepress/core/commit/6e3fc324b1bc79c6a743ebe68046dcb10255bc21))


### BREAKING CHANGES

* client constants should add `VUEPRESS` prefix now





# [2.0.0-beta.24](https://github.com/vuepress/core/compare/v2.0.0-beta.23...v2.0.0-beta.24) (2021-08-14)


### Bug Fixes

* **plugin-pwa:** compat with workbox-build 6.2.2 (close [#361](https://github.com/vuepress/core/issues/361)) ([f28e4cb](https://github.com/vuepress/core/commit/f28e4cbc6a1b760440b4bdd1598eded5b47dfec5))
* **theme-default:** avoid recursive ref update in code-group ([ca8404a](https://github.com/vuepress/core/commit/ca8404a12b8ab83ac9904431fac189f61f7e5100))


### Code Refactoring

* **client:** move built-in meta tags to default html template (close [#358](https://github.com/vuepress/core/issues/358)) ([e5c0fec](https://github.com/vuepress/core/commit/e5c0feccb92b6aea4351110c20656dd66a6e0847))


### Features

* **theme-default:** add `logoDark` locale option (close [#283](https://github.com/vuepress/core/issues/283)) ([991c07a](https://github.com/vuepress/core/commit/991c07a26d745b5c13ab320b04d8ee79ac5a6ebc))
* **theme-default:** add css variables for transition ([#325](https://github.com/vuepress/core/issues/325)) ([2b09004](https://github.com/vuepress/core/commit/2b09004cfb65ca15e593c680d8e80f2a28ecd741))
* **theme-default:** improve a11y and animation of sidebar button ([#365](https://github.com/vuepress/core/issues/365)) ([c99861e](https://github.com/vuepress/core/commit/c99861e4c65dfcce8b29c9ce7943944e3d6ca3c1))
* **theme-default:** store dark mode state in local storage (close [#335](https://github.com/vuepress/core/issues/335)) ([9582b3b](https://github.com/vuepress/core/commit/9582b3b72c42b28f74484b55d88bc1fb2d8f56df))


### BREAKING CHANGES

* **client:** the previous built-in meta tags should be manually added to custom html template





# [2.0.0-beta.23](https://github.com/vuepress/core/compare/v2.0.0-beta.22...v2.0.0-beta.23) (2021-08-01)


### Bug Fixes

* **markdown:** encode file path when coverting links (close [#306](https://github.com/vuepress/core/issues/306)) ([920c9ac](https://github.com/vuepress/core/commit/920c9ac9864ad6877606e0839ae0f35695fe5e0c))
* **theme-default:** use constant color for inserted token (close [#296](https://github.com/vuepress/core/issues/296)) ([4596028](https://github.com/vuepress/core/commit/459602898cee7c3ecd5d3c05c83a7db97729a14f))


### Features

* **bundler-webpack:** bump webpack-dev-server to 4.0.0-rc.0 ([816da00](https://github.com/vuepress/core/commit/816da009ea1597e170b754c54253c0797208db1b))
* **core:** store page data in page object (close [#319](https://github.com/vuepress/core/issues/319)) ([c7d3710](https://github.com/vuepress/core/commit/c7d3710f451e2d40ed09a1b2ae516adca0a7ab99))
* **core:** support paths without html extension (close [#292](https://github.com/vuepress/core/issues/292)) ([#324](https://github.com/vuepress/core/issues/324)) ([1d41365](https://github.com/vuepress/core/commit/1d41365f56425384c0c8b919008c344b03ab9431))
* **markdown:** support `code.lineNumbers` to be set to number (close [#231](https://github.com/vuepress/core/issues/231)) ([#276](https://github.com/vuepress/core/issues/276)) ([a7fbdec](https://github.com/vuepress/core/commit/a7fbdec893e01937b392ba40ed9dc8888415f9ed))
* **theme-default:** add `toggleDarkMode` locale option ([#275](https://github.com/vuepress/core/issues/275)) ([a685a1b](https://github.com/vuepress/core/commit/a685a1b9e47ef91da40c27194e927daa63343520))
* **theme-default:** add missing transitions ([066c6e4](https://github.com/vuepress/core/commit/066c6e413986f4246b1812ae88c828254404e5c5))
* **theme-default:** enhance color transitions ([#287](https://github.com/vuepress/core/issues/287)) ([9b96871](https://github.com/vuepress/core/commit/9b968719bee5742cb6e3feb8d7dfbd00d13d0785))
* **theme-default:** enhance color transitions ([#321](https://github.com/vuepress/core/issues/321)) ([aeaa3ba](https://github.com/vuepress/core/commit/aeaa3ba8362af7e4013d419af1db246c657646ff))
* **theme-default:** set dark mode color-scheme ([#289](https://github.com/vuepress/core/issues/289)) ([0b3abd3](https://github.com/vuepress/core/commit/0b3abd37f1201176d057d8bdd870dcbc1ea25079))
* **theme-default:** support page slot for Layout.vue ([a8de0a9](https://github.com/vuepress/core/commit/a8de0a990711a2732f2f85b086e733fbd8a74110))


### BREAKING CHANGES

* **core:** now `extendsPageData` hook is processed before `onInitialized` hook





# [2.0.0-beta.22](https://github.com/vuepress/core/compare/v2.0.0-beta.21...v2.0.0-beta.22) (2021-07-11)


### Bug Fixes

* **bundler-vite:** fallback html requests to index.html (close [#265](https://github.com/vuepress/core/issues/265)) ([665cda3](https://github.com/vuepress/core/commit/665cda3b84f53a62177083af8af6d034b7e1c147))
* **markdown:** resolve assets links in html img tags (close [#254](https://github.com/vuepress/core/issues/254)) ([7cbb163](https://github.com/vuepress/core/commit/7cbb163bf19cbe8e8d682ef9707c3f738486e089))
* **plugin-active-header-links:** update active header link selector ([#259](https://github.com/vuepress/core/issues/259)) ([adaeed5](https://github.com/vuepress/core/commit/adaeed5b71b2746b8d30e0eac7be55a736eefb11))
* **theme-default:** break long links on overflow (close [#266](https://github.com/vuepress/core/issues/266)) ([#273](https://github.com/vuepress/core/issues/273)) ([eb970c3](https://github.com/vuepress/core/commit/eb970c3aa4c4d650cd964b0c1f60d423a7d55125))





# [2.0.0-beta.21](https://github.com/vuepress/core/compare/v2.0.0-beta.20...v2.0.0-beta.21) (2021-07-03)


### Bug Fixes

* **client:** avoid duplicate slash after base in withBase util (close [#246](https://github.com/vuepress/core/issues/246)) ([af9ceff](https://github.com/vuepress/core/commit/af9ceff912466ce538da756dd90d56f697f9ea2d))
* **markdown:** filter permalink symbol in toc (close [#251](https://github.com/vuepress/core/issues/251)) ([5a35806](https://github.com/vuepress/core/commit/5a3580656336349c29abb033a3d732646e111bfd))
* **theme-default:** fix nav glitch at exactly 719px screen width ([#238](https://github.com/vuepress/core/issues/238)) ([3154fbb](https://github.com/vuepress/core/commit/3154fbbc5c3b11e5f2a2310a0895538491fbec8f))
* **theme-default:** use default cursor on non-link sidebar items ([ca22d4f](https://github.com/vuepress/core/commit/ca22d4fe7ade66571f34dc80343f4ec57483b44a))


### Features

* **bundler-vite:** avoid global constants being replaced by vite (close [#244](https://github.com/vuepress/core/issues/244)) ([#245](https://github.com/vuepress/core/issues/245)) ([0c86968](https://github.com/vuepress/core/commit/0c869684c4e179347eebc38d916a0dfd2115b321))





# [2.0.0-beta.20](https://github.com/vuepress/core/compare/v2.0.0-beta.19...v2.0.0-beta.20) (2021-06-26)


### Bug Fixes

* **core:** invoke extendsPageOptions hook in createPage ([76292aa](https://github.com/vuepress/core/commit/76292aac7000e2bf924c563ff7452624008102cd))


### Features

* **markdown:** bump markdown-it-anchor to 8.0.4 ([41338f7](https://github.com/vuepress/core/commit/41338f7d656bf9e692c3ff22e05e4b3c1a9cbd6f))
* **plugin-pwa:** bump mitt to 3.0.0 ([8e2eb33](https://github.com/vuepress/core/commit/8e2eb3358baa91c410adffb01f218404c4a4f393))
* **theme-default:** refine sidebar config ([ea7c4bb](https://github.com/vuepress/core/commit/ea7c4bbac269f2f9ade4d58cb77dad27055d9bc0))


### BREAKING CHANGES

* **markdown:** `markdown.anchor` has changed, see changelog of markdown-it-anchor 8.0.0
* **theme-default:** `isGroup` field of sidebar config is removed
* **core:** extendsPageOptions now accept page options as the first argument





# [2.0.0-beta.19](https://github.com/vuepress/core/compare/v2.0.0-beta.18...v2.0.0-beta.19) (2021-06-19)


### Bug Fixes

* **bundler-vite:** resolve client entry url correctly (close [#190](https://github.com/vuepress/core/issues/190)) ([36babba](https://github.com/vuepress/core/commit/36babba394eccc070838c6d0861e91924d305e26))
* **bundler-webpack:** sync types of webpack-dev-server 4 (close [#208](https://github.com/vuepress/core/issues/208)) ([207014b](https://github.com/vuepress/core/commit/207014b087d29f43bd01604954e33277b6b19150))


### Features

* **bundler-webpack:** support vue-loader options ([5a51912](https://github.com/vuepress/core/commit/5a51912d974ba4a83a9586b40cb7cb7982c6c81b))
* **theme-default:** support activeMatch in navbar config ([ab0c6d1](https://github.com/vuepress/core/commit/ab0c6d1544e62b505547c45afe6347fdb735c011))
* **theme-default:** support disabling dark mode ([6517ce1](https://github.com/vuepress/core/commit/6517ce1c66219fc45f0cb645f3db30e275e592bf))





# [2.0.0-beta.18](https://github.com/vuepress/core/compare/v2.0.0-beta.17...v2.0.0-beta.18) (2021-06-12)


### Bug Fixes

* **plugin-search:** disable default form action on Enter key ([#189](https://github.com/vuepress/core/issues/189)) ([81b5b24](https://github.com/vuepress/core/commit/81b5b24379c44ddcf83b38b086f6f2905453f58b))
* **plugin-toc:** exclude h1 header in toc ([5e96641](https://github.com/vuepress/core/commit/5e96641b8d2dd947372222e0af2ea47729afbada))
* **theme-default:** exclude h1 header in sidebar ([280626d](https://github.com/vuepress/core/commit/280626dd33f5006d6611f6e121eb5edfad8a258e))
* **theme-default:** show outline of toggle-dark-button ([bc94de0](https://github.com/vuepress/core/commit/bc94de0cb3a9454ac0a3e72f3df07326568057d2))


### Code Refactoring

* **core:** drop support for plugin nesting ([f7da97f](https://github.com/vuepress/core/commit/f7da97f7f0ff24984cc6a2d0926b5fdf3af274c5))
* **core:** resolve page title from markdown env ([09d08a4](https://github.com/vuepress/core/commit/09d08a4b89af16fcb833774e902b4d5404181689))


### Features

* **cli:** watch dependencies of user config file ([b220524](https://github.com/vuepress/core/commit/b220524f1534a1ada3b896854dba181e8ea36221))
* **markdown:** add extract-title plugin ([e0a1556](https://github.com/vuepress/core/commit/e0a1556a1469cd71469f5c81e2d058a5e9b9d801))


### Performance Improvements

* **bundler-vite:** make server build lighter ([a6ddea5](https://github.com/vuepress/core/commit/a6ddea5fd1a1979f5d3a7cc460e1602cb5254f08))


### BREAKING CHANGES

* **core:** a plugin cannot use other plugins anymore
* **core:** markdown emoji syntax is not supported in frontmatter title





# [2.0.0-beta.17](https://github.com/vuepress/core/compare/v2.0.0-beta.16...v2.0.0-beta.17) (2021-06-04)


### Bug Fixes

* **theme-default:** avoid long inline code breaking the layout ([#180](https://github.com/vuepress/core/issues/180)) ([ada2e2a](https://github.com/vuepress/core/commit/ada2e2a884749d9654c3550c4bb92611ea29906c))
* **theme-default:** fix error of sidebar resolving (close [#185](https://github.com/vuepress/core/issues/185)) ([6a96af0](https://github.com/vuepress/core/commit/6a96af0b480b04a3c2564739e87a0ae786756581))
* **theme-default:** respect root-level custom container config (close [#175](https://github.com/vuepress/core/issues/175)) ([f2ad5f0](https://github.com/vuepress/core/commit/f2ad5f0e988b075cfa37726d67feb8fa54f6176b))


### Features

* **core:** support multi-level theme inheritance ([5df8662](https://github.com/vuepress/core/commit/5df86621cfcd7b138e473d40dc622e6ff8e0795f))
* **theme-default:** improve a11y of CodeGroup ([#163](https://github.com/vuepress/core/issues/163)) ([2b76463](https://github.com/vuepress/core/commit/2b7646399116114a967a5df64266c6879babb10f))


### BREAKING CHANGES

* **theme-default:** default title of danger container is changed to "DANGER"





# [2.0.0-beta.16](https://github.com/vuepress/core/compare/v2.0.0-beta.15...v2.0.0-beta.16) (2021-05-28)


### Bug Fixes

* **plugin-pwa-popup:** increase default z-index ([67242e8](https://github.com/vuepress/core/commit/67242e896f52c09c1e42566a32ae10291d0fb648))
* **theme-default:** increase medium-zoom delay ([9c92443](https://github.com/vuepress/core/commit/9c9244385f4fe6f65115cab6ba08f47dffc1580a))


### Features

* **bundler-vite:** configure postcss by default ([6197578](https://github.com/vuepress/core/commit/61975781151ace783f3021bd6a3c55c4fa7b12bd))
* **plugin-back-to-top:** add z-index variable ([3d7d4a4](https://github.com/vuepress/core/commit/3d7d4a4ba173dab4c3ad80abea5ac96cc1eb0bde))
* **plugin-medium-zoom:** add more css variables (close [#174](https://github.com/vuepress/core/issues/174)) ([d717800](https://github.com/vuepress/core/commit/d71780094839db02424b60f3a2877871e34eaf64))
* **plugin-nprogress:** add z-index variable ([151e087](https://github.com/vuepress/core/commit/151e087c289a387d7ff77654059de9d71910263a))
* **plugin-pwa-popup:** add more css variables ([3ae6f72](https://github.com/vuepress/core/commit/3ae6f72a1fb981ff132325637d5996c5c07b52f2))





# [2.0.0-beta.15](https://github.com/vuepress/core/compare/v2.0.0-beta.14...v2.0.0-beta.15) (2021-05-27)


### Bug Fixes

* **markdown:** decode assets link to ensure bundler can find the file ([#144](https://github.com/vuepress/core/issues/144)) ([d3e5409](https://github.com/vuepress/core/commit/d3e5409246a47edae93209c9ce5dd2614e14c936))
* **theme-default:** handle rotate events on iPad ([#150](https://github.com/vuepress/core/issues/150)) ([bbdda60](https://github.com/vuepress/core/commit/bbdda60bba0a56590535f3e762dec55767ec031c))
* **theme-default:** show header anchors when being focused ([#164](https://github.com/vuepress/core/issues/164)) ([8de5f0f](https://github.com/vuepress/core/commit/8de5f0fa2873f64be0622aced46e1512c7f4fac5))


### Features

* **bundler-webpack:** bump webpack-dev-server to 4.0.0-beta.3 ([2e86826](https://github.com/vuepress/core/commit/2e8682680eba7736bcf3325014a927a87503ba0b))
* **cli:** allow setting default app config ([41f9dc6](https://github.com/vuepress/core/commit/41f9dc612d65a7aae777a75ee00715f0b7bab7c6))
* **plugin-search:** add --search-bg-color variable ([6c778a8](https://github.com/vuepress/core/commit/6c778a83b5d26529c830057aadc9c6fde8dc1805))
* **plugin-search:** improve a11y support ([#165](https://github.com/vuepress/core/issues/165)) ([205aafe](https://github.com/vuepress/core/commit/205aafe4e6600987e06730b926abe2be3e4d5d73))
* **theme-default:** support dark mode (close [#29](https://github.com/vuepress/core/issues/29)) ([680e429](https://github.com/vuepress/core/commit/680e4298a80ddb06b0381af48644124ffb0b0c4c))
* **theme-default:** support full link for github repo ([#152](https://github.com/vuepress/core/issues/152)) ([8a5055b](https://github.com/vuepress/core/commit/8a5055b57d2068e73b4a1c52601c94bdbbc1a7c5))
* **theme-default:** support Gitee repo ([5cad664](https://github.com/vuepress/core/commit/5cad664bd7224a08e679dc06f61f17af6c790b97))


### BREAKING CHANGES

* **theme-default:** most sass variables are migrated to css variables





# [2.0.0-beta.14](https://github.com/vuepress/core/compare/v2.0.0-beta.13...v2.0.0-beta.14) (2021-05-12)


### Bug Fixes

* **bundler-vite:** compat with vite 2.3 changes (close [#134](https://github.com/vuepress/core/issues/134)) ([1370984](https://github.com/vuepress/core/commit/13709840080d17c6c239af53a212258d9157ffae))
* **core:** avoid mutating theme layouts array ([fe27a57](https://github.com/vuepress/core/commit/fe27a57c57bd92623ef4c3df6ce4282b8eda6f71))


### Features

* **core:** allow alias and define hook to return a promise ([3b3d289](https://github.com/vuepress/core/commit/3b3d2893c58115de65606ffc508fdc7a9cf96f79))





# [2.0.0-beta.13](https://github.com/vuepress/core/compare/v2.0.0-beta.12...v2.0.0-beta.13) (2021-05-06)


### Bug Fixes

* **bundler-vite:** make site base work in vite dev (close [#126](https://github.com/vuepress/core/issues/126)) ([d257e01](https://github.com/vuepress/core/commit/d257e01b69a8b4d0032b75be233b1c381289b529))
* **core:** path of page options should have the highest priority ([0fc6fd3](https://github.com/vuepress/core/commit/0fc6fd38225816b6bfc59fb12de837634c7ffb5d))
* **markdown:** ensure ending newline in import code ([160df2d](https://github.com/vuepress/core/commit/160df2de1567a3b6b3e889b86e6bd7b95a3cc77b))


### Features

* **markdown:** allow omitting start or end of import code lines range ([21bba5c](https://github.com/vuepress/core/commit/21bba5c86bc8e8dec1c86f820e9de27cf15919b2))





# [2.0.0-beta.12](https://github.com/vuepress/core/compare/v2.0.0-beta.11...v2.0.0-beta.12) (2021-04-30)


### Bug Fixes

* **core:** avoid uri encoded filename ([4ff7f3b](https://github.com/vuepress/core/commit/4ff7f3b287936cce0f9cfe5c8689c2efbb2b52aa))
* **theme-default:** align the font of line numbers with code blocks (close [#124](https://github.com/vuepress/core/issues/124)) ([#125](https://github.com/vuepress/core/issues/125)) ([a3ea87d](https://github.com/vuepress/core/commit/a3ea87d507a644dc31bf9ffbb5703eb99342cc60))


### Features

* **core:** add deps to page object ([83c9aae](https://github.com/vuepress/core/commit/83c9aaedcaf531d72d70ad514b9dd8ddf2e508d1))
* **core:** make filePath available in markdown env ([aa52549](https://github.com/vuepress/core/commit/aa52549648b175626d3eafabe8629a78a8caf8e5))
* **markdown:** support import code blocks (close [#15](https://github.com/vuepress/core/issues/15)) ([fe20ccc](https://github.com/vuepress/core/commit/fe20cccf3d44565c7fcb890e8ebf2aa4659ab3e1))


### Performance Improvements

* **core:** reduce page data and component file size ([4c6eea5](https://github.com/vuepress/core/commit/4c6eea5188e804cb3f6c7648d6528d43002618ae))
* **core:** reduce routes file size ([d926a17](https://github.com/vuepress/core/commit/d926a170ee5f384845f5b166029fbc392f51dcde))


### BREAKING CHANGES

* **core:** `pagePath` prop of `<Content>` renamed to `pageKey`





# [2.0.0-beta.11](https://github.com/vuepress/core/compare/v2.0.0-beta.10...v2.0.0-beta.11) (2021-04-28)


### Bug Fixes

* **bundler-vite:** make the timestamp of client entry consistent ([4bbff4c](https://github.com/vuepress/core/commit/4bbff4c22f67c456a0f4dcfe3ddf5724902a4d2a))


### Performance Improvements

* do not register hooks in dev mode for prod-only plugins ([d5af139](https://github.com/vuepress/core/commit/d5af1398f059c075783c0c58456cef7b41bcaaf9))
* specify optimizeDeps for vite dev ([0d77331](https://github.com/vuepress/core/commit/0d773312181380114cba16f61b633a5266dd1cf3))
* **core:** merge page routes to reduce requests in vite dev ([fa2a614](https://github.com/vuepress/core/commit/fa2a61413c70afd426f74e57e6e5d2a4900c6568))





# [2.0.0-beta.10](https://github.com/vuepress/core/compare/v2.0.0-beta.9...v2.0.0-beta.10) (2021-04-27)


### Bug Fixes

* **bundler-vite:** avoid client code to be optimized or externalized ([f8a088d](https://github.com/vuepress/core/commit/f8a088db5f428087a58dec4823627a9e3b447a75))
* **bundler-vite:** disable clearScreen in dev by default ([e7bfe49](https://github.com/vuepress/core/commit/e7bfe49d10aa8d3c5121120435ed5076fbe80a27))
* **cli:** do not clean cache and temp on restart ([047a52c](https://github.com/vuepress/core/commit/047a52c265db355de3aaa298c14150779e9182f4))
* **client:** implement ClientOnly correctly ([e27872d](https://github.com/vuepress/core/commit/e27872d89f1e6894ebc734e2e26c800bea82e162))
* **client:** make hydration work properly (close [#123](https://github.com/vuepress/core/issues/123)) ([34a5364](https://github.com/vuepress/core/commit/34a5364ad6005e64a3e726296b9b8b73318fcbd4))
* **core:** allow extendsMarkdown to return a promise ([a4be2fd](https://github.com/vuepress/core/commit/a4be2fda5952f64da2db6ba837b94bfb4e1315ce))


### Features

* **bundler-vite:** bump vite to 2.2.1 to support cacheDir ([d7f685b](https://github.com/vuepress/core/commit/d7f685b5d729d9f8c9f858673355a37cb22fc90e))
* **client:** support custom layout ([c32866d](https://github.com/vuepress/core/commit/c32866d769cb5a29fb811fd2f00e06d7b94e1508))
* **markdown:** support externalIcon in config and frontmatter ([#122](https://github.com/vuepress/core/issues/122)) ([d1389bc](https://github.com/vuepress/core/commit/d1389bc6c0eee3ad2fe83d5636fd293d0710e0fb))
* **plugin-search:** add search plugin (close [#35](https://github.com/vuepress/core/issues/35)) ([70bb066](https://github.com/vuepress/core/commit/70bb0668c53b984f17bdbf7b95ac8e3258034e73))
* **theme-default:** compat with docsearch and search plugin ([cb00182](https://github.com/vuepress/core/commit/cb0018257c2c6b4b21e2add5f73e7213b537fb6f))
* **theme-default:** support pageClass frontmatter (close [#118](https://github.com/vuepress/core/issues/118)) ([809d575](https://github.com/vuepress/core/commit/809d5750c36662e894be566c0ff53c2f2a700da0))
* **theme-default:** support sidebarDepth ([b79ba90](https://github.com/vuepress/core/commit/b79ba90f8e4cb93d76dac1f284131cf618aee784))





# [2.0.0-beta.9](https://github.com/vuepress/core/compare/v2.0.0-beta.8...v2.0.0-beta.9) (2021-04-21)


### Bug Fixes

* **core:** allow plugin itself as an item of plugin config array ([1fa8903](https://github.com/vuepress/core/commit/1fa8903549d8f9eba3fc49e3117ee2018993b496))
* **core:** ensure trailing slash of page path (close [#114](https://github.com/vuepress/core/issues/114)) ([cbcf166](https://github.com/vuepress/core/commit/cbcf16624602e37c17935211ac4076c72db22507))
* **markdown:** do not escape extracted headers (close [#117](https://github.com/vuepress/core/issues/117)) ([81b1336](https://github.com/vuepress/core/commit/81b133622a00e6474f0bfe4a58e35bfab9fe3e49))
* **plugin-back-to-top:** fix back-to-top styles ([933643a](https://github.com/vuepress/core/commit/933643aa9c24458eb914429b21f5ec22f6b23f9a))
* **theme-default:** remove font-smothing in code block ([41c281e](https://github.com/vuepress/core/commit/41c281e016c77dc5f1d9d12e8917814e48af1424))


### Code Refactoring

* **core:** move evergreen option to bundler-webpack ([58c30c1](https://github.com/vuepress/core/commit/58c30c1207f0f6e09e9d68096786ef189c67e9db))


### Features

* **client:** provide client types file ([89a32b5](https://github.com/vuepress/core/commit/89a32b50767ef82556f5ae3300ec016e0acaf0e5))
* **core:** make frontmatter available in markdown env ([f977192](https://github.com/vuepress/core/commit/f97719237db9d14c94716bf6b18fe52519a008cf))
* **plugin-palette:** add watchers for palette and style files ([0cf1b9b](https://github.com/vuepress/core/commit/0cf1b9b346de2bc62789a940699298ee9e2873db))
* **plugin-register-components:** add register components plugin (close [#112](https://github.com/vuepress/core/issues/112)) ([6af204d](https://github.com/vuepress/core/commit/6af204df76b8f6969aef0fc061a64a796deb24ab))
* **theme-default:** add more palette variables for code styles ([db8e0f4](https://github.com/vuepress/core/commit/db8e0f4870b051184a4d4b3c5b17497e302b0b11))


### BREAKING CHANGES

* **core:** `evergreen` option is moved to `bundlerConfig.evergreen` for bundler-webpack





# [2.0.0-beta.8](https://github.com/vuepress/core/compare/v2.0.0-beta.7...v2.0.0-beta.8) (2021-04-11)


### Bug Fixes

* **plugin-docsearch:** provide default value for locales (close [#107](https://github.com/vuepress/core/issues/107)) ([491eb64](https://github.com/vuepress/core/commit/491eb6416664775c366c0fb2a67388fe37098e2c))
* **plugin-pwa-popup:** provide default value for locales ([f7cbc15](https://github.com/vuepress/core/commit/f7cbc15669c731e6598657c8048abe9cdfa4ee40))


### Code Refactoring

* normalize themes and plugins structure ([7781172](https://github.com/vuepress/core/commit/77811722401bf1ed1fec44c64158ab0cd1ab3179))
* **core:** resolve theme when creating app ([fa683cb](https://github.com/vuepress/core/commit/fa683cb76e8a3bcacc08d1dfd8bea6af79fee1d2))


### Features

* **markdown:** support internalTag option in links plugin ([1872ad9](https://github.com/vuepress/core/commit/1872ad95d7c86247883c24f2ec86db07d7596923))
* **utils:** add logger.createError method ([0c198d7](https://github.com/vuepress/core/commit/0c198d7f9e122828b37a2db670048cfc2ce20e81))


### BREAKING CHANGES

* client API that provided by plugins should be imported from `plugin-foo/lib/client`
* **core:** theme plugins could be overridden by user plugins now





# [2.0.0-beta.7](https://github.com/vuepress/core/compare/v2.0.0-beta.6...v2.0.0-beta.7) (2021-04-09)


### Bug Fixes

* **bundler-webpack:** always extract css file in build mode ([accc484](https://github.com/vuepress/core/commit/accc484f95485a6013aad573f562565c16ac5ff8))
* **client:** install vue-router after clientAppEnhance (close [#100](https://github.com/vuepress/core/issues/100)) ([2f5450f](https://github.com/vuepress/core/commit/2f5450f0b8dcc4aa49b1c19a1adea6e84a1594c4))
* **client:** make page data hmr work as expected ([374ae43](https://github.com/vuepress/core/commit/374ae43545c982ecc8762776035cc92359b874f5))
* **theme-default:** allow direct img children to be zoomable (close [#84](https://github.com/vuepress/core/issues/84)) ([832bd6f](https://github.com/vuepress/core/commit/832bd6fbbd9612e2209a28ed89a49bf9eb658838))


### Features

* **bundler-webpack:** bump webpack-dev-server to 4.0.0-beta.2 ([dd8c408](https://github.com/vuepress/core/commit/dd8c40875cca382450d2758b2c7609bb69332d19))
* **core:** show warning when duplicate plugins are detected ([742f581](https://github.com/vuepress/core/commit/742f5811032b3a2f0687edf3f966d25517734a8d))
* **plugin-toc:** add toc plugin ([0ea1720](https://github.com/vuepress/core/commit/0ea1720ae3ed2007f0232123bfd7de77af6ae383))





# [2.0.0-beta.6](https://github.com/vuepress/core/compare/v2.0.0-beta.5...v2.0.0-beta.6) (2021-03-26)


### Reverts

* refactor(client): remove extra handling for router base ([6205279](https://github.com/vuepress/core/commit/620527917e4d3ee7cfa4c1db7d3cadc36a30eaab))





# [2.0.0-beta.5](https://github.com/vuepress/core/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2021-03-26)


### Bug Fixes

* **client:** ensure page component is loaded before route resolve ([598adf3](https://github.com/vuepress/core/commit/598adf38b1f9edd3034bb011358a1a9d3bcb6b9e))
* **markdown:** avoid wrapping highlighted code with multiple pre ([f0b3872](https://github.com/vuepress/core/commit/f0b38722f1a06c736366a36d7c4888952d28c947))
* **plugin-prismjs:** avoid loading languages multiple times ([4af5005](https://github.com/vuepress/core/commit/4af50053c03408fc9e2e5426df89ae340de0e824))
* **theme-default:** add active class to sidebar group heading ([8dcb945](https://github.com/vuepress/core/commit/8dcb9457c532de8076f94b3b165c1347e9bd9c86))
* **theme-default:** allow NavLink in sidebar children ([ea50010](https://github.com/vuepress/core/commit/ea5001076b86a7dc8b807811796a8ed44fbcf7b9))
* **theme-default:** make navlink active in subpath (close [#70](https://github.com/vuepress/core/issues/70)) ([4c865b1](https://github.com/vuepress/core/commit/4c865b16430d0e72b0ac1103f9579a93f248bf9c))
* **theme-default:** make nested sidebar groups work ([4ada701](https://github.com/vuepress/core/commit/4ada701062db400787c41008942354f6947bf80b))
* **theme-default:** make scrollBehavior work with transition (close [#77](https://github.com/vuepress/core/issues/77)) ([4b8d0cf](https://github.com/vuepress/core/commit/4b8d0cff2d7fa3d74d69d551976a3b12263e6124))


### Features

* **plugin-shiki:** add shiki plugin ([66bbcbd](https://github.com/vuepress/core/commit/66bbcbde497cca525fc585b4046b11784e8d61bc))


### Performance Improvements

* improve HMR support ([38f0073](https://github.com/vuepress/core/commit/38f007335864db4c9125ea5905ca91850fb7103b))





# [2.0.0-beta.4](https://github.com/vuepress/core/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2021-03-20)


### Bug Fixes

* **bundler-vite:** disable auto resolving vite config file ([57967f7](https://github.com/vuepress/core/commit/57967f7dec27c4148edf920decead327cc8746bf))


### Code Refactoring

* **markdown:** remove default syntax highlighter ([4a1abe3](https://github.com/vuepress/core/commit/4a1abe39335eaaf3ef1dca3e35a324b12981c0d2))


### Features

* **plugin-prismjs:** add prismjs plugin ([638ad8a](https://github.com/vuepress/core/commit/638ad8afdf9f3fe779e9eb1d02dca6c1caef0307))
* **theme-default:** use prismjs plugin ([f131de4](https://github.com/vuepress/core/commit/f131de4783685dbabfde4e4966182d570224a246))


### BREAKING CHANGES

* **markdown:** prismjs is no longer the default syntax highlighter





# [2.0.0-beta.3](https://github.com/vuepress/core/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2021-03-17)


### Bug Fixes

* **bundler-vite:** fix fs path on windows (close [#74](https://github.com/vuepress/core/issues/74)) ([db3c3e8](https://github.com/vuepress/core/commit/db3c3e8639d040aa8b408006d48b160a0b234e12))


### Features

* **cli:** show info of vite related packages ([73a66df](https://github.com/vuepress/core/commit/73a66df2c19b4b292e5f7b48cb967490a0a5dd69))





# [2.0.0-beta.2](https://github.com/vuepress/core/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2021-03-14)


### Bug Fixes

* **bundler-vite:** avoid optimizing client package ([5708934](https://github.com/vuepress/core/commit/57089344f87bf381f8e6f2711eb6df9364c72432))
* **bundler-vite:** workaround for [vitejs/vite#2503](https://github.com/vitejs/vite/issues/2503) ([055b280](https://github.com/vuepress/core/commit/055b280a8488c42614702533cc9eb8fb2852c71b))
* **plugin-nprogress:** always optimize nprogress with vite ([2aeb2bf](https://github.com/vuepress/core/commit/2aeb2bf9b70b149bf2e56d2fd1b593e6628d72dd))





# [2.0.0-beta.1](https://github.com/vuepress/core/compare/v2.0.0-beta.0...v2.0.0-beta.1) (2021-03-13)

**Note:** Version bump only





# [2.0.0-beta.0](https://github.com/vuepress/core/compare/v2.0.0-alpha.26...v2.0.0-beta.0) (2021-03-13)


### Bug Fixes

* **plugin-google-analytics:** fix types ([92aa486](https://github.com/vuepress/core/commit/92aa48629d0355808a15942594e499d39bb3f1e7))


### Features

* **vuepress-vite:** add vuepress-vite package ([03a6583](https://github.com/vuepress/core/commit/03a658364d8c5f0b2510e10cd2bf8ec8bcbf41cb))
* implement vite hmr ([525c18d](https://github.com/vuepress/core/commit/525c18d5a64fbdbdeb5ce1348ec1e1ead3dbd8f9))
* **bundler-vite:** add vite support :zap: ([7d612c4](https://github.com/vuepress/core/commit/7d612c45d83d42b246316f93cc3385a9968307af))
* **cli:** add defineUserConfig util ([c20f7b7](https://github.com/vuepress/core/commit/c20f7b7be5d04cb247d699c31bf6f68071180df6))
* **client:** add defineClientAppEnhance and defineClientAppSetup utils ([1520517](https://github.com/vuepress/core/commit/15205172c3b56fc8a879bba040f4ecc815d2c924))
* **theme-default:** use sass as css pre-processor ([7eb1fd8](https://github.com/vuepress/core/commit/7eb1fd8b8901d3f2c2335ad550b7d601a9354826))


### BREAKING CHANGES

* **theme-default:** the palette system of default theme is migrated to sass





# [2.0.0-alpha.26](https://github.com/vuepress/core/compare/v2.0.0-alpha.25...v2.0.0-alpha.26) (2021-02-24)


### Bug Fixes

* **cli:** add theme-data plugin and rename palette plugin ([97ce42b](https://github.com/vuepress/core/commit/97ce42bddbfcef5e66476c2355e031e54d9176ea))


### Features

* **bundler-webpack:** enable options API by default ([e29b6e1](https://github.com/vuepress/core/commit/e29b6e1bb1ba89b7d440e54dafe3a84ecf4273db))
* **plugin-palette:** add palette plugin ([556a23c](https://github.com/vuepress/core/commit/556a23cc9076f972deb3d5c0905441b63b700682))


### BREAKING CHANGES

* **plugin-palette:** migrate `@vuepress/plugin-palette-stylus` to `@vuepress/plugin-palette`





# [2.0.0-alpha.25](https://github.com/vuepress/core/compare/v2.0.0-alpha.24...v2.0.0-alpha.25) (2021-02-20)


### Bug Fixes

* **markdown:** do not treat autolink as a component (close [#60](https://github.com/vuepress/core/issues/60)) ([9f6cffa](https://github.com/vuepress/core/commit/9f6cffa1e0c39d0caf9f7ab34c5f06f36a87948b))


### Code Refactoring

* **core:** remove theme data from site data ([187aef3](https://github.com/vuepress/core/commit/187aef36607efc62d7b2d5c773553f89685cf64c))


### Features

* **plugin-theme-data:** extract theme data injection to a plugin ([e971e39](https://github.com/vuepress/core/commit/e971e3964cf11361ac267501768b0f8bc7dba909))


### BREAKING CHANGES

* **core:** `themeConfig` is not available in site data any more





# [2.0.0-alpha.24](https://github.com/vuepress/core/compare/v2.0.0-alpha.23...v2.0.0-alpha.24) (2021-02-13)


### Code Refactoring

* **core:** change page default date to 0000-00-00 ([1ce602e](https://github.com/vuepress/core/commit/1ce602ef811f29f083a8d10695a7b212ed82cae5))
* **core:** remove permalink and pattern from page options ([9534989](https://github.com/vuepress/core/commit/9534989a82e620b1c09b4a09d4cfee1e99d145fc))


### Features

* **core:** add extendsPageOptions hook ([19b7e83](https://github.com/vuepress/core/commit/19b7e83cb25ec523857d34c415782d595a05d0ff))
* **core:** add watchers parameter to onWatched hook ([0bcd594](https://github.com/vuepress/core/commit/0bcd594d1645fe9994d1456e86803e5619057bfb))


### BREAKING CHANGES

* **core:** remove permalink and pattern from page options
* **core:** change page default date from 1970-01-01 to 0000-00-00





# [2.0.0-alpha.23](https://github.com/vuepress/core/compare/v2.0.0-alpha.22...v2.0.0-alpha.23) (2021-02-10)


### Bug Fixes

* **markdown:** remove site base from internal links (close [#58](https://github.com/vuepress/core/issues/58)) ([a8c7fdd](https://github.com/vuepress/core/commit/a8c7fdd86a9c4f08c51673f3dba0451455a731d2))





# [2.0.0-alpha.22](https://github.com/vuepress/core/compare/v2.0.0-alpha.21...v2.0.0-alpha.22) (2021-02-10)


### Bug Fixes

* **client:** only watch route path to update head ([3174f5a](https://github.com/vuepress/core/commit/3174f5a676d95943df256b2be31227eb844d0144))
* **plugin-debug:** avoid enabling in production mode (close [#53](https://github.com/vuepress/core/issues/53)) ([9612282](https://github.com/vuepress/core/commit/961228234e3983f1f84f992a1317316d09f8cb98))





# [2.0.0-alpha.21](https://github.com/vuepress/core/compare/v2.0.0-alpha.20...v2.0.0-alpha.21) (2021-02-05)


### Features

* **plugin-git:** collect page created time (close [#45](https://github.com/vuepress/core/issues/45)) ([4045a8c](https://github.com/vuepress/core/commit/4045a8c1ab591dbbb0303aa43c6d13bf248d995c))


* **plugin-google-analytics:** migrate to google analytics 4 (close [#36](https://github.com/vuepress/core/issues/36)) ([d2393f7](https://github.com/vuepress/core/commit/d2393f7970c346bfcef2e72658f9a4a89a93b396))


### BREAKING CHANGES

* migrate to google analytics 4 and drop v3 support





# [2.0.0-alpha.20](https://github.com/vuepress/core/compare/v2.0.0-alpha.19...v2.0.0-alpha.20) (2021-02-04)


### Bug Fixes

* **plugin-medium-zoom:** always refresh medium-zoom with delay ([2495f5d](https://github.com/vuepress/core/commit/2495f5d30fa75b50c203919abf2d8dab7dfda2d9))
* **theme-default:** fix max width of navbar links wrapper ([846e60c](https://github.com/vuepress/core/commit/846e60ca9f0137f54a96df7589df4ea4cd99f18a))
* **theme-default:** remove extra rem in styles (close [#50](https://github.com/vuepress/core/issues/50)) ([9b1b852](https://github.com/vuepress/core/commit/9b1b852a9c11c28b43253f87b40362693ad2cb95))


### Features

* **core:** create siteData in vuepress app ([05b87dd](https://github.com/vuepress/core/commit/05b87ddf32f32c94cc131e0074365aeba70f85f2))
* **core:** make language available in page data ([03bb09f](https://github.com/vuepress/core/commit/03bb09fd51aeaff56d26820a1401b87ea8bdeb38))





# [2.0.0-alpha.19](https://github.com/vuepress/core/compare/v2.0.0-alpha.18...v2.0.0-alpha.19) (2021-01-24)


### Bug Fixes

* **cli:** add esbuild external ([8d285ea](https://github.com/vuepress/core/commit/8d285ea88946683d96d46a379d4215963338dff4))


### Features

* **core:** add onWatched hook ([9725a10](https://github.com/vuepress/core/commit/9725a101599363094a85916317109b67d365dff4))
* **plugin-docsearch:** allow more fields in locales config ([ce1cf18](https://github.com/vuepress/core/commit/ce1cf18248129f44651b33091329c4366320131b))





# [2.0.0-alpha.18](https://github.com/vuepress/core/compare/v2.0.0-alpha.17...v2.0.0-alpha.18) (2021-01-17)


### Bug Fixes

* **client:** load existing head tags on mounted ([15722c5](https://github.com/vuepress/core/commit/15722c5175e44a8d6363bfe5f138f2c2c8edeec3))
* **markdown:** load some languages by default to partially avoid prism issue ([48c085a](https://github.com/vuepress/core/commit/48c085af6a8751211fe7180a82bb67ff5a7b191f))
* **theme-default:** fix homepage frontmatter type ([9cf2d28](https://github.com/vuepress/core/commit/9cf2d288e115d335f6ff9f1a849a2ce82db799c9))
* **theme-default:** fix sidebar config override ([2c2c280](https://github.com/vuepress/core/commit/2c2c2801be716dfb102345090888fd1e22a0ac92))
* **theme-default:** make sr-only tags unselectable ([0f6488e](https://github.com/vuepress/core/commit/0f6488e3a00674c0670737c8831763db0a0ffa93))


### Features

* **client:** make usePageFrontmatter generic ([2c5e5c1](https://github.com/vuepress/core/commit/2c5e5c1400469a3cb4da2856104514a9413bff8a))
* **shared:** optimize frontmatter type and support generics ([8a7025f](https://github.com/vuepress/core/commit/8a7025ff39b4656f98f9a35e93848373ce72ddbe))
* **theme-default:** add code-group custom container ([d0a20aa](https://github.com/vuepress/core/commit/d0a20aaacefc78708a4181c53704b28c60b520b4))
* **theme-default:** add page transition ([845cc2c](https://github.com/vuepress/core/commit/845cc2cb64223b856261bfc7b384dec6557456c4))
* **theme-default:** allow html in homepage footer ([87e0821](https://github.com/vuepress/core/commit/87e0821cee66c34141c1c3a62e8f5ecb6b21a957))
* **theme-default:** optimize scrollbar style of sidebar ([27abb26](https://github.com/vuepress/core/commit/27abb26509fa737ea27c3036bbe834d544e60298))
* **theme-default:** support multiple action buttons in homepage (close [#23](https://github.com/vuepress/core/issues/23)) ([bb44710](https://github.com/vuepress/core/commit/bb44710624d2dbb65bd5f3da2eafabdec73ecadf))





# [2.0.0-alpha.17](https://github.com/vuepress/core/compare/v2.0.0-alpha.16...v2.0.0-alpha.17) (2021-01-13)


### Bug Fixes

* **bundler-webpack:** add trailing slash to url ([cbe4c7f](https://github.com/vuepress/core/commit/cbe4c7f3924c11b751dfefbb01f8fc0528516b3b))


### Features

* **cli:** add --clean-temp option ([752d725](https://github.com/vuepress/core/commit/752d72563d88d5441a5570af3bc1b4c571e268c2))
* **theme-default:** allow dropdown subtitle as a link ([5fb6558](https://github.com/vuepress/core/commit/5fb6558c926ddbb569f2b1901903cf9be4ad426e))





# [2.0.0-alpha.16](https://github.com/vuepress/core/compare/v2.0.0-alpha.15...v2.0.0-alpha.16) (2021-01-11)


### Bug Fixes

* **core:** support special characters in filename and permalink ([c3e68ef](https://github.com/vuepress/core/commit/c3e68ef6a4aa3f6722d5bc4079bafe5d3b176e5e))
* **markdown:** fix assets relative path handling (close [#33](https://github.com/vuepress/core/issues/33)) ([9a95431](https://github.com/vuepress/core/commit/9a95431aa3994855f7194d3efe810b4fd2cf72d9))


### Features

* **cli:** show info of vue packages ([2d19e84](https://github.com/vuepress/core/commit/2d19e84c1ac24e1a127d330009617c42eb7a2bc3))





# [2.0.0-alpha.15](https://github.com/vuepress/core/compare/v2.0.0-alpha.14...v2.0.0-alpha.15) (2021-01-04)


### Bug Fixes

* **core:** fix site locale data type ([7898500](https://github.com/vuepress/core/commit/7898500f8b611662777ca3bdeb89c5b3bb658595))
* **theme-default:** click to close dropdown that opened by tab and click ([88d1ae2](https://github.com/vuepress/core/commit/88d1ae2bf6a92113ece8efa7ed57352b34ad18c4))
* **theme-default:** fix font-size of dropdown group title ([563156c](https://github.com/vuepress/core/commit/563156cb8458aeb71fadd882b08e03bee8ae5fba))


### Features

* **core:** provide app in all plugin hooks ([21cc3a6](https://github.com/vuepress/core/commit/21cc3a608e54d38de8de8f453b5e88031b4cedb1))


### Reverts

* fix(theme-default): remove outline when focused on dropdown button ([66d3feb](https://github.com/vuepress/core/commit/66d3feba01bf8a3ce751788a9a025dd69757efb4))





# [2.0.0-alpha.14](https://github.com/vuepress/core/compare/v2.0.0-alpha.13...v2.0.0-alpha.14) (2021-01-03)


### Bug Fixes

* **bundler-webpack:** remove esbuild minimizer ([4b3c00b](https://github.com/vuepress/core/commit/4b3c00becad376fed98bfaef700e565c19724a0b))
* **core:** fix page date resolving ([de6c5c8](https://github.com/vuepress/core/commit/de6c5c8ca89347bea4ba2925e283a7b710a5b5d3))
* **plugin-docsearch:** fix docsearch style issue ([7550587](https://github.com/vuepress/core/commit/7550587dbdf876b834dc14aa83847fabf1dba668))
* **theme-default:** assign default locale data ([d59f55d](https://github.com/vuepress/core/commit/d59f55d355299a8edbdb43986cc7aaff5345ea1f))
* **theme-default:** fix overflow style of code block line-numbers ([dd77cf4](https://github.com/vuepress/core/commit/dd77cf448a28423ee23930b3d76601d8a5a6da18))
* **theme-default:** remove outline when focused on dropdown button ([77842e3](https://github.com/vuepress/core/commit/77842e396f1ebcc9e874af537a6520b818d028c2))
* **theme-default:** set font-size explicitly for h4 to h6 ([a6459c0](https://github.com/vuepress/core/commit/a6459c0eca38fbc19545442581ea6f0e73908b30))
* **vuepress:** add a wrapper for cli bin (close [#21](https://github.com/vuepress/core/issues/21)) ([2708ac3](https://github.com/vuepress/core/commit/2708ac325c05a39cc5139e7e5f902e2fead5ca7a))





# [2.0.0-alpha.13](https://github.com/vuepress/core/compare/v2.0.0-alpha.12...v2.0.0-alpha.13) (2020-12-23)


### Bug Fixes

* **markdown:** only prepend prefix to explicit relative image path ([8d6a095](https://github.com/vuepress/core/commit/8d6a095ace0ed724b4ac4eea0e44a28f120a48bc))
* **plugin-git:** replace -P with --no-pager for better compatibility (close [#16](https://github.com/vuepress/core/issues/16)) ([f394c78](https://github.com/vuepress/core/commit/f394c78a06a3dae7cea91759db6010d04746f999))


### Features

* **cli:** respect conventional clientAppEnhance files (close [#20](https://github.com/vuepress/core/issues/20)) ([0777376](https://github.com/vuepress/core/commit/0777376bcb5cafec50f47877a6bf3926d6ff0076))





# [2.0.0-alpha.12](https://github.com/vuepress/core/compare/v2.0.0-alpha.11...v2.0.0-alpha.12) (2020-12-19)


### Bug Fixes

* **markdown:** support v-on shorthand in html inline tags ([86a1299](https://github.com/vuepress/core/commit/86a1299d16555fb453f36aa1db49ff9ce184e874))
* **theme-default:** fix navbar type to allow nested group ([9ef46ae](https://github.com/vuepress/core/commit/9ef46ae3d41dc56c536d884665d28f71a7883a59))


### Features

* **markdown:** code-block-level config for line-numbers and v-pre ([9ac3e4a](https://github.com/vuepress/core/commit/9ac3e4a12066f8b05e5d3a5211adf837a944c29d))





# [2.0.0-alpha.11](https://github.com/vuepress/core/compare/v2.0.0-alpha.10...v2.0.0-alpha.11) (2020-12-17)


### Bug Fixes

* **bundler-webpack:** freeze webpack version ([95523a2](https://github.com/vuepress/core/commit/95523a2f2b32f8dad773c74553bd22a0940cd27a))





# [2.0.0-alpha.10](https://github.com/vuepress/core/compare/v2.0.0-alpha.9...v2.0.0-alpha.10) (2020-12-17)


### Bug Fixes

* **theme-default:** fix content headers styles ([7ead1f6](https://github.com/vuepress/core/commit/7ead1f60db5135ed7d1a428cb23fecbbc11b223e))


### Features

* **cli:** add info command ([1f30993](https://github.com/vuepress/core/commit/1f30993a920189c0de89e413d85feb957546e47f))





# [2.0.0-alpha.9](https://github.com/vuepress/core/compare/v2.0.0-alpha.8...v2.0.0-alpha.9) (2020-12-16)


### Bug Fixes

* **bundler-webpack:** freeze version of prerelease packages ([50d5fa0](https://github.com/vuepress/core/commit/50d5fa0b88cfdf1924a38cbc0d19d29ce2bdef89))
* **cli:** prepare pages entry if the page key is changed ([4c79839](https://github.com/vuepress/core/commit/4c79839b730dd9cd9042c5929820d09ce102a88f))
* **plugin-git:** split arguments to get updated time ([70e8b5e](https://github.com/vuepress/core/commit/70e8b5ec0e7a960ef9a2398200ff23ae67086ab9))





# [2.0.0-alpha.8](https://github.com/vuepress/core/compare/v2.0.0-alpha.7...v2.0.0-alpha.8) (2020-12-11)


### Bug Fixes

* **bundler-webpack:** display localhost by default in console ([8bf0987](https://github.com/vuepress/core/commit/8bf0987b71588b2959475da9d502b2e4f9cc6bbb))
* **cli:** remove shorthand of host option ([8340797](https://github.com/vuepress/core/commit/8340797da03462c8078753a4535a9977c349ca04))


### Features

* **plugin-pwa:** migrate pwa plugin ([aa54fd6](https://github.com/vuepress/core/commit/aa54fd65aa77b32b97de0a38359f1ad07f96f566))
* **plugin-pwa-popup:** extract pwa popup plugin ([c3e8fb2](https://github.com/vuepress/core/commit/c3e8fb26c348b7cae47f7cc0c4a0fba998c308d3))





# [2.0.0-alpha.7](https://github.com/vuepress/core/compare/v2.0.0-alpha.6...v2.0.0-alpha.7) (2020-12-09)


### Bug Fixes

* **bundler-webpack:** fix windows compatibility (close [#12](https://github.com/vuepress/core/issues/12)) ([f35f768](https://github.com/vuepress/core/commit/f35f76861785e69c26d3e8731d5a1afe7e2f01be))





# [2.0.0-alpha.6](https://github.com/vuepress/core/compare/v2.0.0-alpha.5...v2.0.0-alpha.6) (2020-12-09)


### Features

* **bundler-webpack:** migrate to webpack 5 ([37dca96](https://github.com/vuepress/core/commit/37dca9644622a61e50ba2cda420c08581a824a19))
* **client:** remove built-in debug component ([a5962bb](https://github.com/vuepress/core/commit/a5962bb82483f56800b33b4e35c50dcb49fd48b1))
* **plugin-debug:** add debug plugin ([ddf0a92](https://github.com/vuepress/core/commit/ddf0a925c849fd7dba894ee69f9840d63dee99f4))
* **shared:** add esm build ([f8463e7](https://github.com/vuepress/core/commit/f8463e791c909493e343d98468663c9d31bcbb5f))
* **theme-default:** use debug plugin ([e12b1f3](https://github.com/vuepress/core/commit/e12b1f3293b5e8faebd93b444b71b6ac11b1029d))





# [2.0.0-alpha.5](https://github.com/vuepress/core/compare/v2.0.0-alpha.4...v2.0.0-alpha.5) (2020-12-03)


### Bug Fixes

* **plugin-google-analytics:** report site base ([31c8cad](https://github.com/vuepress/core/commit/31c8cadfba7676e7ac5809d669a6262f421e7831))
* **theme-default:** fix code related styles ([83d8a6f](https://github.com/vuepress/core/commit/83d8a6f50537ed1b4c5e5c0f4221841999eeaeab))
* **theme-default:** fix the condition of using router-link as nav-link ([8141f69](https://github.com/vuepress/core/commit/8141f691495fc92ee19bd4d7bfd496c07112ac6a))


### Features

* **markdown:** support doc lang highlight ([dc91db6](https://github.com/vuepress/core/commit/dc91db6327fd818f365abbec96cc5dde0b6ba243))





# [2.0.0-alpha.4](https://github.com/vuepress/core/compare/v2.0.0-alpha.3...v2.0.0-alpha.4) (2020-12-02)


### Bug Fixes

* **bundler-webpack:** remove spinner when preparing data ([7f3b425](https://github.com/vuepress/core/commit/7f3b4253a6d4d2f58b3487a407c609c417be1326))
* **cli:** keep message format consistent ([1de416d](https://github.com/vuepress/core/commit/1de416d75fb115523d78e6e709712210cbf39db9))
* **core:** failed to resolve local theme ([4d836e2](https://github.com/vuepress/core/commit/4d836e2bc3e7affe17f63df1c4ce40c464a7e6fb))
* **core:** warn if layout directory does not exist ([3d2d414](https://github.com/vuepress/core/commit/3d2d4148024963521b9e1ebbc29aa19697ac3452))


### Features

* **cli:** allow default export in user config file ([b2f86c7](https://github.com/vuepress/core/commit/b2f86c7b6c11de81c5aaf6e96973921dc0b9ad60))
* **cli:** allow loading ts files globally ([a9d94ac](https://github.com/vuepress/core/commit/a9d94ac9243ec75c5de20a0a08546e3a032dd43e))
* **utils:** add hasExportDefault util ([575a9c5](https://github.com/vuepress/core/commit/575a9c5d9eee44c0ce20b0712830e2eb2a303780))





# [2.0.0-alpha.3](https://github.com/vuepress/core/compare/v2.0.0-alpha.2...v2.0.0-alpha.3) (2020-12-01)


### Bug Fixes

* **bundler-webpack:** check public dir before using copy-plugin ([2481802](https://github.com/vuepress/core/commit/248180221e870a2e1cc2e4a67973c4e0918a3651))
* **core:** avoid runtime warning for empty template (close [#10](https://github.com/vuepress/core/issues/10)) ([bcbf703](https://github.com/vuepress/core/commit/bcbf703e6e449f7753697b7dfc503bd643bfd240))


### Features

* **cli:** use esbuild to load ts file ([41cfbc5](https://github.com/vuepress/core/commit/41cfbc57872f00b1f8ff80ffc9b127942792fbc6))





# [2.0.0-alpha.2](https://github.com/vuepress/core/compare/v2.0.0-alpha.1...v2.0.0-alpha.2) (2020-12-01)


### Bug Fixes

* **plugin-git:** check if git repo is valid ([3e9fc83](https://github.com/vuepress/core/commit/3e9fc8301e3fc9a0be7a8c7ede25e10063a10c9f))


### Features

* **bundler-webpack:** use esbuild for compilation and minification ([4351f99](https://github.com/vuepress/core/commit/4351f997ffee41d560a257abd28880aa98ee29a4))





# 2.0.0-alpha.1 (2020-12-01)
