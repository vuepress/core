# register-components

<NpmBadge package="@vuepress/plugin-register-components" />

Register Vue components from component files or directory automatically.

## Usage

```bash
npm i -D @vuepress/plugin-register-components@next
```

```ts
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'

export default {
  plugins: [
    registerComponentsPlugin({
      // options
    }),
  ],
}
```

## Options

### components

- Type: `Record<string, string>`

- Default: `{}`

- Details:

  An object that defines name of components and their corresponding file path.

  The key will be used as the component name, and the value is an absolute path of the component file.

  If the component name from this option conflicts with [componentsDir](#componentsdir) option, this option will have a higher priority.

- Example:

```ts
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

export default {
  plugins: [
    registerComponentsPlugin({
      components: {
        FooBar: path.resolve(__dirname, './components/FooBar.vue'),
      },
    }),
  ],
}
```

### componentsDir

- Type: `string | null`

- Default: `null`

- Details:

  Absolute path to the components directory.

  Files in this directory which are matched with [componentsPatterns](#componentspatterns) will be registered as Vue components automatically.

- Example:

```ts
import { getDirname, path } from '@vuepress/utils'

const __dirname = getDirname(import.meta.url)

export default {
  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
  ],
}
```

Components directory:

```bash
components
├─ FooBar.vue
└─ Baz.vue
```

Components will be registered like this:

```ts
import { defineAsyncComponent } from 'vue'

app.component(
  'FooBar',
  defineAsyncComponent(() => import('/path/to/components/FooBar.vue'))
)

app.component(
  'Baz',
  defineAsyncComponent(() => import('/path/to/components/Baz.vue'))
)
```

### componentsPatterns

- Type: `string[]`

- Default: `['**/*.vue']`

- Details:

  Patterns to match component files using [globby](https://github.com/sindresorhus/globby).

  The patterns are relative to [componentsDir](#componentsdir).

### getComponentName

- Type: `(filename: string) => string`

- Default: `(filename) => path.trimExt(filename.replace(/\/|\\/g, '-'))`

- Details:

  A function to get component name from the filename.
  
  It will only take effect on the files in the [componentsDir](#componentsdir) which are matched with the [componentsPatterns](#componentspatterns).

  Notice that the `filename` is a filepath relative to [componentsDir](#componentsdir).
