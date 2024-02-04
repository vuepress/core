## VPLink

## Home Page

- <VPLink to="/">text</VPLink>
- <VPLink to="/README.md">text</VPLink>
- <VPLink to="/index.html">text</VPLink>

## Not Exist

- <VPLink to="/non-existent">text</VPLink>
- <VPLink to="/non-existent.md">text</VPLink>
- <VPLink to="/non-existent.html">text</VPLink>

## Non-ASCII

- <VPLink to="/routes/non-ascii-paths/中文目录名/中文文件名">text</VPLink>
- <VPLink to="/routes/non-ascii-paths/中文目录名/中文文件名.md">text</VPLink>
- <VPLink to="/routes/non-ascii-paths/中文目录名/中文文件名.html">text</VPLink>

## Non-ASCII Encoded

- <VPLink :to="encodeURI('/routes/non-ascii-paths/中文目录名/中文文件名')">text</VPLink>
- <VPLink :to="encodeURI('/routes/non-ascii-paths/中文目录名/中文文件名.md')">text</VPLink>
- <VPLink :to="encodeURI('/routes/non-ascii-paths/中文目录名/中文文件名.html')">text</VPLink>

## Active

- <VPLink to="/README.md" active="">text</VPLink>
- <VPLink to="/README.md" active>text</VPLink>
- <VPLink to="/README.md" :active='false'>text</VPLink>
- <VPLink to="/README.md">text</VPLink>

## Class

- <VPLink to="/README.md" class="custom-class">text</VPLink>
- <VPLink to="/README.md" active class="custom-class">text</VPLink>

## Attrs

- <VPLink to="/README.md" title="Title">text</VPLink>
- <VPLink to="/README.md" target="_blank">text</VPLink>
- <VPLink to="/README.md" rel="noopener">text</VPLink>
- <VPLink to="/README.md" aria-label="test">text</VPLink>

## Slots

- <VPLink to="/README.md"><span>text</span></VPLink>
- <VPLink to="/README.md"><span>text</span><span>text</span></VPLink>
