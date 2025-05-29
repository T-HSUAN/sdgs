import { loadEnv } from "vite";

const env = loadEnv(import.meta.env.MODE, "env");
console.log("mode:", env.VITE_ENV);
console.log("env:", env.VITE_TITLE);
console.log("url:", env.VITE_BASE_URL);
console.log("NODE_ENV:", process.env.NODE_ENV);

export default defineNuxtConfig({
  app: {
    head: {
      title: 'SDGs 10周年',
      htmlAttrs: {
        lang: "zh-Hant",
      },
      script: [],
    },
    baseURL: env.VITE_FOLDER,
  },
  css: [
    'assets/style/components/loader.scss',
    'assets/style/all.scss',
    'bootstrap/scss/bootstrap.scss'
  ],
  vite: {
    envDir: "env",
  },

  runtimeConfig: {
    public: {
      imgFolder: env.VITE_IMG_FOLDER,
    },
  },
  modules: [
    ["@nuxtjs/stylelint-module", { lintonstart: false }],
    // ['@tresjs/nuxt', { devtools: true }],
    "nuxt-aos",
    "vue3-carousel-nuxt",
    "@bootstrap-vue-next/nuxt"
  ],
  // build:{
  // transpile: ['@tresjs/cientos'],
  // },
  compatibilityDate: '2024-11-01',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  }
})