import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import Landing from './Landing.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Landing', Landing)
  }
} satisfies Theme

