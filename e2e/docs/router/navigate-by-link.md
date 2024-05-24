## Markdown Links with html

- [Home with query](/?home=true)
- [Home with query and hash](/?home=true#home)
- [404 with hash](/404.html#404)
- [404 with hash and query](/404.html#404?notFound=true)

## Markdown Links with md

- [Home with query](/README.md?home=true)
- [Home with query and hash](/README.md?home=true#home)
- [404 with hash](/404.md#404)
- [404 with hash and query](/404.md#404?notFound=true)

## HTML Links

<a :href="$withBase('/?home=true')" class="home-with-query">Home</a>
<a :href="$withBase('/?home=true#home')" class="home-with-query-and-hash">Home</a>
<a :href="$withBase('/404.html#404')" class="not-found-with-hash">404</a>
<a :href="$withBase('/404.html#404?notFound=true')" class="not-found-with-hash-and-query">404</a>
