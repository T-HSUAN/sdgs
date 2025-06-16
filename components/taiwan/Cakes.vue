<template>
  <section class="topic" id="taiwan">
    <header class="topic-header">
      <p class="no">02</p>
      <h2 class="heading">
        <span class="heading-ch">台灣蛋糕層</span><br />
        <span class="heading-en" lang="en">Taiwan Cake Layer</span>
      </h2>
    </header>
    <div class="inline d-flex flex-column gap-10 gap-sm-15 gap-lg-0 bgc-primary">
      <div class="cake-part" v-for="(item, index) in data" :key="index">
        <div class="inline-image pos-relative">
          <img :src="`${pgwImgUrl}/taiwan/${data[index].img}`" :class="`img-cake img-cake-${item.id}`" />
        </div>
        <div class="inline-text cake-inline-text">
          <div class="container gsap-scroll-tw">
            <h3>{{ item.title }}</h3>
            <p v-for="p in item.content" :key="p">{{ p }}</p>
            <div class="cake-list">
              <NuxtLink :class="[
                'link',
                'sdgs-card',
                'cake-item',
                'h-auto',
                'bc-sdg-' + no,
                { ['bgc-sdg-' + no]: hover_index === index },
                { ['bgc-sdg-' + no]: isDesktop && hover_index === index },
              ]" :to="'/cake' + no" v-for="(no, index) in item.label" :key="index" @mouseenter="hover_index = index"
                @mouseleave="hover_index = null">
                <img class="img-cake-label" :src="`${pgwImgUrl}/sdgs/label${no}.jpg`" :alt="`sdg ${no}`" />
                <div class="inline-text d-iflex-row-center gap-1">
                  <h4>SDG {{ no }}</h4>
                  <p>{{ data_headings[no - 1] }}</p>
                  <svg :class="[
                    'icon-plus',
                    'fc-sdg-' + no,
                    { ['fc-primary']: hover_index === index },
                  ]" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <line x1="12" y1="2" x2="12" y2="22" stroke="currentColor" stroke-width="2" />
                    <line x1="2" y1="12" x2="22" y2="12" stroke="currentColor" stroke-width="2" />
                  </svg>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { data_sdgs_twcakes, data_sdgs_headings } from "assets/text/data.js";

const isDesktop = ref(null);
const get_width = () => {
  isDesktop.value = window.innerWidth > 1023.9;
};
const pgwImgUrl = import.meta.env.VITE_FOLDER + "/images";
const data = data_sdgs_twcakes;
const data_headings = data_sdgs_headings;
const hover_index = ref(null);

onMounted(async () => {
  get_width();
  window.addEventListener("resize", get_width);

  await nextTick(() => {
    const cakes = document.querySelectorAll(".cake-part");
    gsap_change_cakes(cakes, ".gsap-scroll-tw", ".img-cake");
  });
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", get_width);
});
</script>