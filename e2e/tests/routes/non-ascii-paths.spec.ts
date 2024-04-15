import { expect, test } from '@playwright/test'
import { removeLeadingSlash } from 'vuepress/shared'
import { BASE } from '../../utils/env'

test('should support visiting non-ASCII paths directly', async ({ page }) => {
  await page.goto(
    removeLeadingSlash(
      encodeURI('/routes/non-ascii-paths/中文目录名/中文文件名.html'),
    ),
  )

  await expect(page.locator('.e2e-theme-content p')).toHaveText(
    '这是一个中文文件',
  )
})

test('should support rendering non-ASCII paths links and navigate to it correctly', async ({
  page,
}) => {
  await page.goto('routes/non-ascii-paths/')

  await expect(page.locator('.e2e-theme-content ul li a')).toHaveCount(1)
  await expect(page.locator('.e2e-theme-content ul li a')).toHaveText(
    '中文路径',
  )
  await page
    .locator('.e2e-theme-content ul li a', { hasText: '中文路径' })
    .click()

  await expect(page).toHaveURL(
    `${BASE}routes/non-ascii-paths/中文目录名/中文文件名.html`,
  )
  await expect(page.locator('.e2e-theme-content p')).toHaveText(
    '这是一个中文文件',
  )
})
