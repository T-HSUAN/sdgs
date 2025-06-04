<template>
  <section class="topic pos-relative" id="manuscript">
    <header class="topic-header">
      <p class="no">03</p>
      <h2 class="heading">
        <span class="heading-ch">文稿區標題</span><br />
        <span class="heading-en" lang="en">Manuscript Articles</span>
      </h2>
    </header>
    <Carousel class="topic-swiper topic-swiper--move-y" ref="swiperRef" v-bind="swiperConfig">
      <Slide v-for="(data, index) in data" :key="index">
        <div class="inline card card--row-reverse">
          <div class="inline-image"><img class="w-full" :src="data.img" /></div>
          <div class="inline-text p-sp2 p-lg-0">
            <h3>{{ data.title }}</h3>
            <p>{{ data.content }}</p>
            <button class="btn btn-white btn-more mt-auto ml-auto">了解更多</button>
          </div>
        </div>
      </Slide>
    </Carousel>
    <div class="controls">
      <button type="button" aria-label="Navigate to previous slide" title="Navigate to previous slide"
        class="swiper__prev" @click="prev"><svg class="swiper__icon" viewBox="0 0 24 24" role="img"
          aria-label="Arrow pointing to the left">
          <title>Arrow pointing to the left</title>
          <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"></path>
        </svg></button>
      <button type="button" aria-label="Navigate to next slide" title="Navigate to next slide" class="swiper__next"
        @click="next"><svg class="swiper__icon" viewBox="0 0 24 24" role="img" aria-label="Arrow pointing to the right">
          <title>Arrow pointing to the right</title>
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
        </svg></button>
    </div>
  </section>
</template>
<script setup>
import { data_articles } from 'assets/text/data.js';
const data = data_articles;

const swiperRef = ref()

const next = () => swiperRef.value.next()
const prev = () => swiperRef.value.prev()
const swiperConfig = {
  itemsToShow: 1,
  snapAlign: 'start',
  gap: 8,
  breakpoints: {
    425: {
      itemsToShow: 1.2,
      gap: 16,
    },
    500: {
      itemsToShow: 1.5,
      gap: 16,
    },
    768: {
      itemsToShow: 2,
      gap: 24,
    },
    1024: {
      itemsToShow: 1,
      gap: 40,
      snapAlign: 'center',
    }
  },
  wrapAround: true,
}
</script>
