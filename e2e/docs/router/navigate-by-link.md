## Markdown Links

- [Home](/README.md)
- [404](/404.md)
- [Home with query](/README.md?home=true)
- [Home with query and hash](/README.md?home=true#home)
- [404 with hash](/404.md#404)
- [404 with hash and query](/404.md#404?notFound=true)

## HTML Links

<a :href="$withBase('/')" class="home">Home</a>
<a :href="$withBase('/404.html')" class="not-found">404</a>
<a :href="$withBase('/?home=true')" class="home-with-query">Home</a>
<a :href="$withBase('/?home=true#home')" class="home-with-query-and-hash">Home</a>
<a :href="$withBase('/404.html#404')" class="not-found-with-hash">404</a>
<a :href="$withBase('/404.html#404?notFound=true')" class="not-found-with-hash-and-query">404</a>

## HTML Clean Links

<a :href="$withBase('/')" class="home">Home</a>
<a :href="$withBase('/404')" class="not-found">404</a>
<a :href="$withBase('/?home=true')" class="home-with-query">Home</a>
<a :href="$withBase('/?home=true#home')" class="home-with-query-and-hash">Home</a>
<a :href="$withBase('/404#404')" class="not-found-with-hash">404</a>
<a :href="$withBase('/404#404?notFound=true')" class="not-found-with-hash-and-query">404</a>

## Markdown Clean Links

> Non-recommended usage. HTML paths could not be prepended with `base` correctly.

- [Home](/)
- [404](/404)
- [Home with query](/?home=true)
- [Home with query and hash](/?home=true#home)
- [404 with hash](/404#404)
- [404 with hash and query](/404#404?notFound=true)

## Markdown Links with html paths

> Non-recommended usage. HTML paths could not be prepended with `base` correctly.

- [Home](/)
- [404](/404.html)
- [Home with query](/?home=true)
- [Home with query and hash](/?home=true#home)
- [404 with hash](/404.html#404)
- [404 with hash and query](/404.html#404?notFound=true)
