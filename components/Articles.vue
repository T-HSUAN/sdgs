<template>
  <section class="topic pos-relative" id="manuscript">
    <header class="topic-header">
      <p class="no">03</p>
      <h2 class="heading">
        <span class="heading-ch">文稿區</span><br />
        <span class="heading-en" lang="en">Manuscript Articles</span>
      </h2>
    </header>
    <!-- Slider main container -->
    <div class="swiper swiper-manuscript">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide h-auto"
          v-for="(data, index) in data"
          :key="index"
        >
          <NuxtLink :to="'/article' + data.aspect">
            <div class="inline slide-card slide-card--row-reverse">
              <div class="inline-image">
                <img class="w-full" :src="`${pgwImgUrl}/article/${data.img}`" />
              </div>
              <div class="inline-text p-sp2 p-lg-0">
                <h3>{{ data.title }}</h3>
                <p>{{ data.abstract }}</p>
                <button class="btn btn-white btn-more mt-auto ml-auto">
                  了解更多
                </button>
              </div>
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="swiper-controls">
      <button
        type="button"
        aria-label="Navigate to previous slide"
        title="Navigate to previous slide"
        class="swiper-prev swiper-prev--a"
        @click="prev"
      >
        <svg
          class="swiper-icon"
          viewBox="0 0 24 24"
          role="img"
          aria-label="Arrow pointing to the left"
        >
          <title>Arrow pointing to the left</title>
          <path
            d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
          ></path>
        </svg>
      </button>
      <button
        type="button"
        aria-label="Navigate to next slide"
        title="Navigate to next slide"
        class="swiper-next swiper-next--a"
        @click="next"
      >
        <svg
          class="swiper-icon"
          viewBox="0 0 24 24"
          role="img"
          aria-label="Arrow pointing to the right"
        >
          <title>Arrow pointing to the right</title>
          <path
            d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"
          ></path>
        </svg>
      </button>
    </div>
    <!-- Slider main container -->
  </section>
</template>
<script setup>
import Swiper from "swiper";
import "swiper/css";
import { Navigation, Mousewheel } from "swiper/modules";
import { data_articles } from "assets/data/index.js";

const pgwImgUrl = import.meta.env.VITE_IMG_URL;
const data = data_articles;

nextTick(() => {
  new Swiper(".swiper-manuscript", {
    modules: [Navigation, Mousewheel],
    slidesPerView: 1,
    spaceBetween: 8,
    mousewheel: {
      releaseOnEdges: true,
    },
    navigation: {
      nextEl: ".swiper-next--a",
      prevEl: ".swiper-prev--a",
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
      1024: {
        slidesPerView: 1,
        spaceBetween: 100,
        centeredSlides: true,
        mousewheel: {
          releaseOnEdges: false,
        },
      },
    },
    watchSlidesProgress: true,
    updateOnWindowResize: true,
  });
});
</script>