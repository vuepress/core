# Интерфейс командной строки

<NpmBadge package="@vuepress/cli" />

VuePress CLI предоставляется пакетом [@vuepress/cli](https://www.npmjs.com/package/@vuepress/cli). Он включен в пакет [vuepress](https://www.npmjs.com/package/vuepress), и вы также можете установить его отдельно.

Выполните `vuepress --help`, чтобы получить следующие справочные сообщения:

```bash
Usage:
  $ vuepress <command> [options]

Commands:
  dev [sourceDir]    Start development server
  build [sourceDir]  Build to static site
  info               Display environment information

For more info, run any command with the `--help` flag:
  $ vuepress dev --help
  $ vuepress build --help
  $ vuepress info --help

Options:
  -v, --version  Display version number
  -h, --help     Display this message
```

::: tip
VuePress использует модуль [debug](https://www.npmjs.com/package/debug).

Установите переменную окружения `DEBUG=vuepress*`, чтобы включить режим отладки.
:::

## dev

Запустите сервер разработки для локальной разработки вашего сайта VuePress.

```bash
Usage:
  $ vuepress dev [sourceDir]

Options:
  -c, --config <config>  Set path to config file
  -p, --port <port>      Use specified port (default: 8080)
  -t, --temp <temp>      Set the directory of the temporary files
  --host <host>          Use specified host (default: 0.0.0.0)
  --cache <cache>        Set the directory of the cache files
  --clean-temp           Clean the temporary files before dev
  --clean-cache          Clean the cache files before dev
  --open                 Open browser when ready
  --debug                Enable debug mode
  --no-watch             Disable watching page and config files (default: true)
  -v, --version          Display version number
  -h, --help             Display this message
```

::: tip
Options set by CLI will override those options with the same name in your config file.
:::

## build

Build your VuePress site to static files, which are ready for [deployment](../guide/deployment.md).

```bash
Usage:
  $ vuepress build [sourceDir]

Options:
  -c, --config <config>  Set path to config file
  -d, --dest <dest>      Set the directory build output (default: .vuepress/dist)
  -t, --temp <temp>      Set the directory of the temporary files
  --cache <cache>        Set the directory of the cache files
  --clean-temp           Clean the temporary files before build
  --clean-cache          Clean the cache files before build
  --debug                Enable debug mode
  -v, --version          Display version number
  -h, --help             Display this message
```

::: tip
Параметры, установленные CLI, переопределяют параметры с тем же именем в вашем файле конфигурации.
:::

## info

Выводит информацию о вашей системе и зависимостях.

Эта команда будет полезна, если вы хотите проверить свою среду или сообщить о проблеме.
