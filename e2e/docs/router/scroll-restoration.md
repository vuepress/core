# Scroll Restoration

<script setup lang="ts">
import { createScrollRestorationSkipState, useRouter } from 'vuepress/client'

const router = useRouter()

const skipScrollRestoration = async (): Promise<void> => {
  await router.replace({
    path: router.currentRoute.value.path,
    hash: '#target',
    state: createScrollRestorationSkipState(),
  })
}
</script>

<button id="skip-scroll-restoration" type="button" @click="skipScrollRestoration">
Skip scroll restoration
</button>

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
