# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-beta.29](https://github.com/vuepress/vuepress-next/compare/v2.0.0-beta.28...v2.0.0-beta.29) (2021-12-18)


### Features

* extract external link icon to plugin ([437b750](https://github.com/vuepress/vuepress-next/commit/437b75076667e653d3600c96f9f4a7c3c3e47e57))


### BREAKING CHANGES

* config `markdown.links.externalIcon` is removed, use plugin-external-link-icon instead
* frontmatter `externalIcon` is removed, use `externalLinkIcon` from plugin-external-link-icon
* component `OutboundLink` is removed, use `ExternalLinkIcon` from plugin-external-link-icon
