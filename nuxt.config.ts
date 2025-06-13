import { loadEnv } from "vite";

const env = loadEnv(import.meta.env.MODE, "env");
console.log("mode:", env.VITE_ENV);
console.log("env:", env.VITE_TITLE);
console.log("url:", env.VITE_BASE_URL);
console.log("folder:", env.VITE_FOLDER);
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
  ],
  vite: {
    envDir: "env",
  },

  // runtimeConfig: {
  //   public: {
  //     Folder: process.env.VITE_FOLDER,
  //     ImgUrl: process.env.VITE_IMG_URL,
  //   },
  // },

  modules: [
    ["@nuxtjs/stylelint-module", { lintonstart: false }],
    "nuxt-aos",
    // ['@tresjs/nuxt', { devtools: true }],
  ],
  compatibilityDate: '2024-11-01',
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  }
})