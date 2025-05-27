<template>
  <section class="topic pos-relative" id="enterprise">
    <header class="topic-header">
      <p class="no">04</p>
      <h2 class="heading">
        <span class="heading-ch">永續好企業</span><br />
        <span class="heading-en" lang="en">Enterprise Articles</span>
      </h2>
    </header>
    <Carousel class="topic-carousel" ref="carouselRef" v-bind="carouselConfig">
      <Slide v-for="(data, index) in data" :key="index">
        <div class="inline card overflow-hidden">
          <div class="inline-image pos-relative">
            <img class="w-full" :src="data.img" />
            <img class="logo-brand" :src="data.brand_img" alt="brand logo">
          </div>
          <div class="inline-text p-sp2">
            <h3>{{ data.title }}</h3>
            <p>{{ data.content }}</p>
            <div class="labels d-flex gap-1">
              <img class="img-label" :src="`${imgFolder}/images/sdgs/label${no}.jpg`" v-for="(no, index) in data.labels"
                :key="index" alt="sdgs label" />
            </div>
          </div>
        </div>
      </Slide>
    </Carousel>
    <div class="controls">
      <button type="button" aria-label="Navigate to previous slide" title="Navigate to previous slide"
        class="carousel__prev" @click="prev"><svg class="carousel__icon" viewBox="0 0 24 24" role="img"
          aria-label="Arrow pointing to the left">
          <title>Arrow pointing to the left</title>
          <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"></path>
        </svg></button>
      <button type="button" aria-label="Navigate to next slide" title="Navigate to next slide" class="carousel__next"
        @click="next"><svg class="carousel__icon" viewBox="0 0 24 24" role="img"
          aria-label="Arrow pointing to the right">
          <title>Arrow pointing to the right</title>
          <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"></path>
        </svg></button>
    </div>
  </section>
</template>
<script setup>
import { data_enterprises } from 'assets/text/data.js';
const data = data_enterprises();
const imgFolder = import.meta.env.VITE_FOLDER;
const carouselRef = ref()

const next = () => carouselRef.value.next()
const prev = () => carouselRef.value.prev()
const carouselConfig = {
  itemsToShow: 1,
  snapAlign: 'center',
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
    1200: {
      itemsToShow: 2,
      gap: 40,
    },
    1440: {
      itemsToShow: 3,
      gap: 40,
      snapAlign: 'start',
    }
  },
  wrapAround: true,
}
</script>