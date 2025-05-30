import { mediumZoomPlugin } from '@vuepress/plugin-medium-zoom'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { viteBundler } from '@vuepress/bundler-vite'
import { fileURLToPath, URL } from 'node:url'

export default defineUserConfig({
  lang: 'en-US',
  base: '/vue-imagine/',

  title: 'VueImagine',
  description: 'Vue3 Image displaying tools. These components I use for my own photo album.',

  theme: defaultTheme({
    logo: 'https://vuejs.press/images/hero.png',
    navbar: [
      '/',
      {
        text: 'ImageZoomer',
        link: '/ImageZoomer.html',
      },
      {
        text: 'ImageSlider',
        link: '/ImageSlider.html',
      },
      {
        text: 'AdaptiveDiv',
        link: '/AdaptiveDiv.html',
      },
    ],
    contributors: false,
  }),

  plugins: [
    mediumZoomPlugin({ selector: 'none' }),
  ],

  bundler: viteBundler({
    viteOptions: {
      resolve: {
        alias: {
          '@': fileURLToPath(new URL('../../src', import.meta.url))
        },
      },
    },
  }),
})
