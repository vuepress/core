## RouteLink

### Home Page

- <RouteLink to="/">text</RouteLink>
- <RouteLink to="/README.md">text</RouteLink>
- <RouteLink to="/index.html">text</RouteLink>

### Non-Existent

- <RouteLink to="/non-existent">text</RouteLink>
- <RouteLink to="/non-existent.md">text</RouteLink>
- <RouteLink to="/non-existent.html">text</RouteLink>

### Non-ASCII

- <RouteLink to="/routes/non-ascii-paths/中文目录名/中文文件名">text</RouteLink>
- <RouteLink to="/routes/non-ascii-paths/中文目录名/中文文件名.md">text</RouteLink>
- <RouteLink to="/routes/non-ascii-paths/中文目录名/中文文件名.html">text</RouteLink>

### Non-ASCII Encoded

- <RouteLink :to="encodeURI('/routes/non-ascii-paths/中文目录名/中文文件名')">text</RouteLink>
- <RouteLink :to="encodeURI('/routes/non-ascii-paths/中文目录名/中文文件名.md')">text</RouteLink>
- <RouteLink :to="encodeURI('/routes/non-ascii-paths/中文目录名/中文文件名.html')">text</RouteLink>

### Active

- <RouteLink to="/README.md" active="">text</RouteLink>
- <RouteLink to="/README.md" active>text</RouteLink>
- <RouteLink to="/" active="">text</RouteLink>
- <RouteLink to="/" active>text</RouteLink>
- <RouteLink to="/README.md" :active="false">text</RouteLink>
- <RouteLink to="/README.md">text</RouteLink>
- <RouteLink to="/" :active="false">text</RouteLink>
- <RouteLink to="/">text</RouteLink>

### Class

- <RouteLink to="/README.md" class="custom-class">text</RouteLink>
- <RouteLink to="/README.md" active class="custom-class">text</RouteLink>
- <RouteLink to="/" class="custom-class">text</RouteLink>
- <RouteLink to="/" active class="custom-class">text</RouteLink>

### Attrs

- <RouteLink to="/README.md" title="Title">text</RouteLink>
- <RouteLink to="/README.md" target="_blank">text</RouteLink>
- <RouteLink to="/README.md" rel="noopener">text</RouteLink>
- <RouteLink to="/README.md" aria-label="test">text</RouteLink>
- <RouteLink to="/" title="Title">text</RouteLink>
- <RouteLink to="/" target="_blank">text</RouteLink>
- <RouteLink to="/" rel="noopener">text</RouteLink>
- <RouteLink to="/" aria-label="test">text</RouteLink>

### Slots

- <RouteLink to="/README.md"><span>text</span></RouteLink>
- <RouteLink to="/README.md"><span>text</span><span>text</span></RouteLink>
- <RouteLink to="/"><span>text</span></RouteLink>
- <RouteLink to="/"><span>text</span><span>text</span></RouteLink>

### Hash and query

- <RouteLink to="/README.md#hash">text</RouteLink>
- <RouteLink to="/README.md?query">text</RouteLink>
- <RouteLink to="/README.md?query#hash">text</RouteLink>
- <RouteLink to="/README.md?query=1#hash">text</RouteLink>
- <RouteLink to="/README.md?query=1&query=2#hash">text</RouteLink>
- <RouteLink to="/README.md#hash?query=1&query=2">text</RouteLink>
- <RouteLink to="/#hash">text</RouteLink>
- <RouteLink to="/?query">text</RouteLink>
- <RouteLink to="/?query#hash">text</RouteLink>
- <RouteLink to="/?query=1#hash">text</RouteLink>
- <RouteLink to="/?query=1&query=2#hash">text</RouteLink>
- <RouteLink to="/#hash?query=1&query=2">text</RouteLink>
- <RouteLink to="#hash">text</RouteLink>
- <RouteLink to="?query">text</RouteLink>
- <RouteLink to="?query#hash">text</RouteLink>
- <RouteLink to="?query=1#hash">text</RouteLink>
- <RouteLink to="?query=1&query=2#hash">text</RouteLink>
- <RouteLink to="#hash?query=1&query=2">text</RouteLink>

### Relative

- <RouteLink to="../README.md">text</RouteLink>
- <RouteLink to="../404.md">text</RouteLink>
- <RouteLink to="not-exist.md">text</RouteLink>
- <RouteLink to="../">text</RouteLink>
- <RouteLink to="../404.html">text</RouteLink>
- <RouteLink to="not-exist.html">text</RouteLink>
