<template>
  <header id="header" role="banner">
    <div class="header-container">
      <a class="logo-link" href="https://vip.udn.com/vip/index" title="聯合報"><img class="logo-header"
          src="public/images/logo1.svg" alt="main logo" /></a>
      <nav class="navbar">
        <ul class="main-menu">
          <li>
            <NuxtLink class="link" to="/#hero">SDGs十周年</NuxtLink>
          </li>
          <li>
            <NuxtLink class="link" to="/#worldwide">聯合國進程</NuxtLink>
          </li>
          <li>
            <NuxtLink class="link" to="/#taiwan">台灣蛋糕層 +</NuxtLink>
          </li>
          <li>
            <NuxtLink class="link" to="/#manuscript">文稿3篇</NuxtLink>
          </li>
          <li>
            <NuxtLink class="link" to="/#enterprise">永續好企業</NuxtLink>
          </li>
        </ul>
        <span :class="['hamburger', { 'menu-active': m_active }]" @click="menuClick"></span>
        <div :class="['dropdown-menu', { 'dropdown-active': d_active }]">
          <ul class="ddm-list">
            <li>
              <NuxtLink class="link topic-title" to="#worldwide">全球SDGs進度表：誰在落後清單上？</NuxtLink>
            </li>
            <li>
              <NuxtLink class="link topic-title" to="#taiwan">台灣蛋糕層</NuxtLink>
              <div class="cake-lists-container">
                <ul class="cake-list" v-for="(data, index) in data_sdgs_asp" :key="index">
                  <li :class="`cake-name fc-aspect-${data.id}`">
                    {{ data.aspect }}
                  </li>
                  <li v-for="(label, index) in data.labels" :key="index">
                    <NuxtLink class="link cake-item" :to="`/cake${label}`">{{
                      data_sdgs_ww[label - 1].title
                    }}</NuxtLink>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <NuxtLink class="link topic-title" to="#manuscript">文稿篇</NuxtLink>
              <div class="article-list swiper-header">
                <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="(data, idx) in data_sdgs_atl" :key="idx">
                    <NuxtLink class="link article-item" :to="`#article-${data.id}`">
                      <div class="menu-card card--row">
                        <img :src="data.img" />
                        <p>{{ data.title }}</p>
                      </div>
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </li>
            <li>
              <NuxtLink class="link topic-title" to="#enterprise">永續好企業</NuxtLink>
              <ul class="enterprise-list">
                <li v-for="(data, index) in data_sdgs_ent" :key="index">
                  <NuxtLink class="link enterprise-item" :to="`#enterprise-${data.id}`">
                    <img :src="`${pgwImgUrl}/enterprise/${data.brand_img}`" />
                  </NuxtLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>
<script setup>
import { useRoute } from "vue-router";
import Swiper from "swiper";
import { Mousewheel } from "swiper/modules";

import {
  data_sdgs_worldwide,
  data_sdgs_aspect,
  data_articles,
  data_enterprises,
} from "assets/text/data.js";

const route = useRoute();
const pgwImgUrl = import.meta.env.VITE_FOLDER + "/images";
const data_sdgs_asp = data_sdgs_aspect;
const data_sdgs_ww = data_sdgs_worldwide;
const data_sdgs_atl = data_articles;
const data_sdgs_ent = data_enterprises;

const m_active = ref(false);
const d_active = ref(false);
const lightbox = useShowGoal17();
const device_d = ref(false);
const menuClick = () => {
  m_active.value = !m_active.value;
  d_active.value = !d_active.value;
  lightbox.value && (lightbox.value = false);
};

const checkWidth = () => {
  device_d.value = window.innerWidth >= 1024;
};

onMounted(async () => {
  checkWidth();

  const links = document.querySelectorAll(".link");
  links.forEach((link) => {
    link.addEventListener("click", () => {
      m_active.value && (m_active.value = false);
      d_active.value && (d_active.value = false);
    });
  });
  await nextTick(() => {
    new Swiper(".swiper-header", {
      modules: [Mousewheel],
      slidesPerView: 2.2,
      spaceBetween: 5,
      watchSlidesProgress: true,
      mousewheel: {
        releaseOnEdges: false,
      },
      breakpoints: {
        425: {
          slidesPerView: 2.5,
          spaceBetween: 5,
        },
        550: {
          slidesPerView: 3,
          spaceBetween: 5,
        },
        768: {
          slidesPerView: 1.8,
          spaceBetween: 0,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 0,
        },
      },
      updateOnWindowResize: true,
    });
  });
});
onUnmounted(() => {
  window.removeEventListener("resize", checkWidth);
});
</script>