import type { App, Page } from '@vuepress/core'
import type { GitData } from '@vuepress/plugin-git'
import { removeEndingSlash, removeLeadingSlash } from '@vuepress/shared'
import { chalk, fs, logger, withSpinner } from '@vuepress/utils'
import { SitemapStream } from 'sitemap'
import type {
  ModifyTimeGetter,
  SitemapFrontmatterOption,
  SitemapImageOption,
  SitemapLinkOption,
  SitemapNewsOption,
  SitemapOptions,
  SitemapVideoOption,
} from './types'

interface SitemapPageInfo {
  lastmod?: string
  changefreq?: string
  priority?: number
  img?: SitemapImageOption[]
  video?: SitemapVideoOption[]
  links?: SitemapLinkOption[]
  news?: SitemapNewsOption[]
}

const reportedLocales: string[] = []

const stripLocalePrefix = (
  page: Page
): {
  // path of root locale
  defaultPath: string
  // Locale path prefix of the page
  pathLocale: string
} => ({
  defaultPath: page.path.replace(page.pathLocale, '/'),
  pathLocale: page.pathLocale,
})

const generatePageMap = (
  app: App,
  options: SitemapOptions
): Map<string, SitemapPageInfo> => {
  const {
    changefreq,
    excludeUrls = ['/404.html'],
    modifyTimeGetter = ((page: Page<{ git: GitData }>): string =>
      page.data.git?.updatedTime
        ? new Date(page.data.git.updatedTime).toISOString()
        : '') as ModifyTimeGetter,
  } = options

  const {
    pages,
    options: { base, locales },
  } = app

  const pageLocalesMap = pages.reduce(
    (map, page) => {
      const { defaultPath, pathLocale } = stripLocalePrefix(page)
      const pathLocales = map.get(defaultPath) || []

      pathLocales.push(pathLocale)

      return map.set(defaultPath, pathLocales)
    },
    // a map with keys of defaultPath and string[] value with pathLocales
    new Map<string, string[]>()
  )

  const pagesMap = new Map<string, SitemapPageInfo>()

  pages.forEach((page) => {
    const frontmatterOptions: SitemapFrontmatterOption =
      (page.frontmatter.sitemap as SitemapFrontmatterOption) || {}

    const metaRobotTags = (page.frontmatter.head || []).find(
      (head) => head[1].name === 'robots'
    )

    const excludePage = metaRobotTags
      ? ((metaRobotTags[1].content as string) || '')
          .split(/,/u)
          .map((content) => content.trim())
          .includes('noindex')
      : frontmatterOptions.exclude

    if (excludePage || excludeUrls.includes(page.path)) return

    const lastmodifyTime = modifyTimeGetter(page)
    const { defaultPath } = stripLocalePrefix(page)
    const relatedLocales = pageLocalesMap.get(defaultPath) || []

    let links: SitemapLinkOption[] = []

    if (relatedLocales.length > 1) {
      // warnings for missing `locale[path].lang` in debug mode
      if (app.env.isDebug)
        relatedLocales.forEach((localePrefix) => {
          if (
            !locales[localePrefix].lang &&
            !reportedLocales.includes(localePrefix)
          ) {
            logger.warn(
              `[@vuepress/plugin-sitemap] 'lang' option for ${localePrefix} is missing`
            )
            reportedLocales.push(localePrefix)
          }
        })

      links = relatedLocales.map((localePrefix) => ({
        lang: locales[localePrefix]?.lang || 'en',
        url: `${base}${removeLeadingSlash(
          defaultPath.replace(/^\//u, localePrefix)
        )}`,
      }))
    }

    const sitemapInfo: SitemapPageInfo = {
      ...(changefreq ? { changefreq } : {}),
      links,
      ...(lastmodifyTime ? { lastmod: lastmodifyTime } : {}),
      ...frontmatterOptions,
    }

    // log sitemap info in debug mode
    if (app.env.isDebug) {
      logger.info(
        `[@vuepress/plugin-sitemap] sitemap option for ${page.path}`,
        sitemapInfo
      )
    }

    pagesMap.set(page.path, sitemapInfo)
  })

  return pagesMap
}

export const generateSiteMap = async (
  app: App,
  options: SitemapOptions
): Promise<void> => {
  const { extraUrls = [], xmlNameSpace: xmlns } = options
  const hostname = removeEndingSlash(options.hostname)
  const sitemapFilename = options.sitemapFilename
    ? removeLeadingSlash(options.sitemapFilename)
    : 'sitemap.xml'
  const {
    dir,
    options: { base },
  } = app

  await withSpinner(`Generating sitemap to ${chalk.cyan(sitemapFilename)}`)(
    () =>
      new Promise<void>((resolve) => {
        const sitemap = new SitemapStream({
          hostname,
          ...(xmlns ? { xmlns } : {}),
        })
        const pagesMap = generatePageMap(app, options)
        const sitemapXMLPath = dir.dest(sitemapFilename)
        const writeStream = fs.createWriteStream(sitemapXMLPath)

        sitemap.pipe(writeStream)

        pagesMap.forEach((page, path) =>
          sitemap.write({
            url: `${base}${removeLeadingSlash(path)}`,
            ...page,
          })
        )

        extraUrls.forEach((item) =>
          sitemap.write({ url: `${base}${removeLeadingSlash(item)}` })
        )
        sitemap.end(() => {
          resolve()
        })
      })
  )

  const robotTxtPath = dir.dest('robots.txt')

  if (fs.existsSync(robotTxtPath)) {
    await withSpinner(`Appended sitemap path to ${chalk.cyan('robots.txt')}`)(
      async () => {
        const robotsTxt = await fs.readFile(robotTxtPath, { encoding: 'utf8' })

        const newRobotsTxtContent = `${robotsTxt.replace(
          /^Sitemap: .*$/u,
          ''
        )}\nSitemap: ${hostname}${base}${sitemapFilename}\n`

        await fs.writeFile(robotTxtPath, newRobotsTxtContent, { flag: 'w' })
      }
    )
  }
}
