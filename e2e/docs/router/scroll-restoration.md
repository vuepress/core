# Scroll Restoration

<script setup lang="ts">
import { useRouter, withoutScrollRestoration } from 'vuepress/client'

const router = useRouter()

const replaceWithoutScrollRestoration = async (): Promise<void> => {
  await router.replace(
    withoutScrollRestoration({
      path: router.currentRoute.value.path,
      hash: '#target',
      state: { e2eState: 'preserved' },
    }),
  )
}

const pushWithoutScrollRestoration = async (): Promise<void> => {
  await router.push(
    withoutScrollRestoration({
      path: router.currentRoute.value.path,
      hash: '#target',
    }),
  )
}

const replaceWithScrollRestoration = async (): Promise<void> => {
  await router.replace({
    path: router.currentRoute.value.path,
    hash: '#target-2',
  })
}
</script>

<button id="skip-replace" type="button" @click="replaceWithoutScrollRestoration">Skip replace restoration</button>

<button id="skip-push" type="button" @click="pushWithoutScrollRestoration">Skip push restoration</button>

<button id="restore-replace" type="button" @click="replaceWithScrollRestoration">Restore on replace</button>

A link to the anchor on the same page: [link to target](#target)

A link to the second target: [link to target 2](#target-2)

## Section 1

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## Section 2

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## Section 3

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## Section 4

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## Section 5

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## Section 6

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## Section 7

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## Section 8

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## Section 9

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## Section 10

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## Target 2

The second target of the anchor link.

## Section 11

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## Section 12

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## Section 13

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## Section 14

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## Section 15

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## Target

The target of the anchor link.

## Section 16

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## Section 17

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## Section 18

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## Section 19

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

## Section 20

Lorem ipsum dolor sit amet, consectetur adipiscing elit.

A link to another page: [link to 404](404.md)
