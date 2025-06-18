<template>
  <section class="topic pos-relative" id="enterprise">
    <header class="topic-header">
      <p class="no">04</p>
      <h2 class="heading">
        <span class="heading-ch">永續好企業</span><br />
        <span class="heading-en" lang="en">Enterprise Articles</span>
      </h2>
    </header>
    <!-- Slider main container -->
    <div class="swiper swiper-enterprise">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(data, index) in data" :key="index">
          <div class="inline card">
            <div class="inline-image pos-relative">
              <img class="w-full" :src="`${pgwImgUrl}/enterprise/${data.img}`" alt="article image" />
              <img class="logo-brand" :src="`${pgwImgUrl}/enterprise/${data.brand_img}`" alt="brand logo" />
            </div>
            <div class="inline-text p-sp2">
              <h3>{{ data.title }}</h3>
              <p>{{ data.content }}</p>
              <div class="labels d-flex gap-2">
                <img class="img-label" :src="`${pgwImgUrl}/sdgs/label${no}.jpg`" v-for="(no, index) in data.labels"
                  :key="index" alt="sdgs label" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="swiper-controls">
      <button type="button" aria-label="Navigate to previous slide" title="Navigate to previous slide"
        class="swiper-prev swiper-prev--e" @click="prev">
        <svg class="swiper-icon" viewBox="0 0 24 24" role="img" aria-label="Arrow pointing to the left">
          <title>Arrow pointing to the left</title>
          <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"></path>
        </svg>
      </button>
      <button type="button" aria-label="Navigate to next slide" title="Navigate to next slide"
        class="swiper-next swiper-next--e" @click="next">
        <svg class="swiper-icon" viewBox="0 0 24 24" role="img" aria-label="Arrow pointing to the right">
          <title>Arrow pointing to the right</title>
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
        </svg>
      </button>
    </div>
    <!-- Slider main container -->
  </section>
</template>
<script setup>
import Swiper from "swiper";
import { Navigation, Mousewheel } from "swiper/modules";
import "swiper/css";
import { data_enterprises } from "assets/text/index.js";

const pgwImgUrl = import.meta.env.VITE_IMG_URL;
const data = data_enterprises;

nextTick(() => {
  const slideCount = document.querySelectorAll(".swiper-slide").length;
  if (slideCount <= 3 && window.innerWidth >= 1440) {
  }
  new Swiper(".swiper-enterprise", {
    modules: [Navigation, Mousewheel],
    loop: true,
    slidesPerView: 1,
    centeredSlides: true,
    spaceBetween: 8,
    mousewheel: true,
    navigation: {
      nextEl: ".swiper-prev--e",
      prevEl: ".swiper-next--e",
    },
    breakpoints: {
      425: {
        slidesPerView: 1.2,
        spaceBetween: 16,
      },
      500: {
        slidesPerView: 1.5,
        spaceBetween: 16,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      1200: {
        slidesPerView: 2,
        spaceBetween: 40,
      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 40,
        centeredSlides: false,
        // loop: true,
      },
    },
    watchSlidesProgress: true,
    updateOnWindowResize: true,
  });
});
</script>