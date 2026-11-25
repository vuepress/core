import type { App } from '@vuepress/core'
import type { OutputAsset } from 'rolldown'
import { expect, test } from 'vitest'

import { renderPageStyles } from '../../src/build/renderPageStyles.js'

const createApp = (base: string): App => ({ options: { base } }) as App

const createCssAsset = (fileName: string): OutputAsset =>
  ({ type: 'asset', fileName }) as OutputAsset

test('should render nothing for empty css assets', () => {
  expect(
    renderPageStyles({
      app: createApp('/'),
      outputCssAssets: [],
    }),
  ).toBe('')
})

test('should render preload and stylesheet links for single css asset with base "/"', () => {
  expect(
    renderPageStyles({
      app: createApp('/'),
      outputCssAssets: [createCssAsset('assets/style.css')],
    }),
  ).toBe(
    [
      '<link rel="preload" href="/assets/style.css" as="style">',
      '<link rel="stylesheet" href="/assets/style.css">',
    ].join(''),
  )
})

test('should render preload and stylesheet links for single css asset with base "/blog/"', () => {
  expect(
    renderPageStyles({
      app: createApp('/blog/'),
      outputCssAssets: [createCssAsset('assets/style.css')],
    }),
  ).toBe(
    [
      '<link rel="preload" href="/blog/assets/style.css" as="style">',
      '<link rel="stylesheet" href="/blog/assets/style.css">',
    ].join(''),
  )
})

test('should render all css assets in output order', () => {
  expect(
    renderPageStyles({
      app: createApp('/'),
      outputCssAssets: [
        createCssAsset('assets/style.css'),
        createCssAsset('assets/page.css'),
        createCssAsset('assets/chunk.css'),
      ],
    }),
  ).toBe(
    [
      '<link rel="preload" href="/assets/style.css" as="style">',
      '<link rel="stylesheet" href="/assets/style.css">',
      '<link rel="preload" href="/assets/page.css" as="style">',
      '<link rel="stylesheet" href="/assets/page.css">',
      '<link rel="preload" href="/assets/chunk.css" as="style">',
      '<link rel="stylesheet" href="/assets/chunk.css">',
    ].join(''),
  )
})

test('should dedupe css assets by file name and keep the first occurrence order', () => {
  expect(
    renderPageStyles({
      app: createApp('/'),
      outputCssAssets: [
        createCssAsset('assets/style.css'),
        createCssAsset('assets/page.css'),
        createCssAsset('assets/style.css'),
      ],
    }),
  ).toBe(
    [
      '<link rel="preload" href="/assets/style.css" as="style">',
      '<link rel="stylesheet" href="/assets/style.css">',
      '<link rel="preload" href="/assets/page.css" as="style">',
      '<link rel="stylesheet" href="/assets/page.css">',
    ].join(''),
  )
})
