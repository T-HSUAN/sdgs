<template>
  <div :class="['dropdown-menu', { 'dropdown-active': d_active }]" role="menu">
    <ul class="ddm-list">
      <li>
        <NuxtLink class="link topic-title" to="#worldwide" @click="changeState"
          >全球SDGs進度表：誰在落後清單上？
        </NuxtLink>
      </li>
      <li>
        <NuxtLink class="link topic-title" to="#taiwan" @click="changeState"
          >台灣蛋糕層</NuxtLink
        >
        <div class="cake-lists-container">
          <ul
            class="cake-list"
            v-for="(data, index) in data_sdgs_asp"
            :key="index"
          >
            <li :class="`cake-name fc-aspect-${data.id}`">
              {{ data.aspect }}
            </li>
            <li v-for="(id, index) in data.label" :key="index">
              <NuxtLink
                class="link cake-item"
                :to="'/cake' + id"
                @click="changeState"
                >{{ data_sdgs_ww[id - 1].title }}</NuxtLink
              >
            </li>
          </ul>
        </div>
      </li>
      <li>
        <NuxtLink class="link topic-title" to="#manuscript" @click="changeState"
          >文稿篇</NuxtLink
        >
        <div class="article-list swiper-header">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide"
              v-for="(data, idx) in data_sdgs_atl"
              :key="idx"
            >
              <NuxtLink
                class="link article-item"
                :to="`article${data.id}`"
                @click="changeState"
              >
                <div class="menu-card">
                  <img :src="`${pgwImgUrl}/article/${data.img}`" />
                  <p>{{ data.title }}</p>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </li>
      <!-- <li>
              <NuxtLink class="link topic-title" to="#enterprise" @click="changeState">永續好企業</NuxtLink>
              <ul class="enterprise-list">
                <li v-for="(data, index) in data_sdgs_ent" :key="index">
                  <NuxtLink class="link enterprise-item" :to="`#enterprise-${data.id}`" @click="changeState">
                    <img :src="`${pgwImgUrl}/enterprise/${data.brand_img}`" />
                  </NuxtLink>
                </li>
              </ul>
            </li> -->
    </ul>
  </div>
</template>
<script setup>
import Swiper from "swiper";
import { Mousewheel } from "swiper/modules";
import {
  data_sdgs_worldwide,
  data_sdgs_aspect,
  data_articles,
  data_enterprises,
} from "assets/data/index.js";

const d_active = defineModel("d_active", { type: Boolean, default: false });
const lightbox = useShowGoal17();
const pgwImgUrl = import.meta.env.VITE_IMG_URL;
const data_sdgs_asp = data_sdgs_aspect;
const data_sdgs_ww = data_sdgs_worldwide;
const data_sdgs_atl = data_articles;
const data_sdgs_ent = data_enterprises;

const changeState = () => {
  d_active.value = !d_active.value;
  lightbox.value && (lightbox.value = false);
};

onMounted(async () => {
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
</script>