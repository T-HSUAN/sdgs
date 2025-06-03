<template>
  <section class="topic" id="taiwan">
    <header class="topic-header">
      <p class="no">02</p>
      <h2 class="heading">
        <span class="heading-ch">台灣蛋糕層</span><br />
        <span class="heading-en" lang="en">Taiwan Cake Layer</span>
      </h2>
    </header>
    <div class="inline desktop-inline" v-if="isDesktop">
      <div class="container gsap-scroll-cakes pos-relative d-flex flex-column flex-row-lg overflow-hidden">
        <div class="inline-image d-flex align-items-center">
          <img :src="imgFolder + data[index].img" :class="`img-cakes img-cakes-${n}`" v-for="(n, index) in 5"
            :key="index">
        </div>
        <div class="inline-text">
          <div class="container cake-parts-desktop">
            <div class="cake-text-part" v-for="(item, index) in data" :key="index">
              <h3>{{ item.title }}</h3>
              <p v-for="p in item.content" :key="p">{{ p }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="inline" v-else>
      <div class="container cake-parts-mobile d-flex flex-column gap-3">
        <div class="cake-part" v-for="(item, index) in data" :key="index">
          <div class="inline-image">
            <img :src="imgFolder + data[index].img" :class="`img-cake img-cake-${item.id}`">
          </div>
          <div class="inline-text">
            <h3>{{ item.title }}</h3>
            <p v-for="p in item.content" :key="p">{{ p }}</p>
            <div class="sdgs-labels w-full">
              <div :class="`inline sdgs-label bc-sdg-${no}`" v-for="(no, index) in item.label" :key="index">
                <img :src="`${imgFolder}/images/sdgs/label${no}.jpg`" :alt="`sdgs ${no}`" />
                <div class="inline-text text-flex--v-center gap-1">
                  <h4>SDGS {{ no }}</h4>
                  <p>這裡會放入一段內文</p>
                  <span :class="`icon-plus c-sdg-${no} bc-sdg-${no}`">+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { data_sdgs_twcakes } from 'assets/text/data.js';

const isDesktop = ref(null);
const get_width = () => {
  isDesktop.value = window.innerWidth > 1023.9;
};
const data = data_sdgs_twcakes;
const imgFolder = import.meta.env.VITE_FOLDER;
const cake_idx = useCakeImg();

onMounted(() => {
  get_width();
  window.addEventListener("resize", get_width);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", get_width);
});

watch(isDesktop, async (newVal) => {
  await nextTick();
  if (newVal) {
    for (let i = 1; i < data.length; i++) {
      document.querySelector(`.img-cakes-${data[i].id}`).classList.add("hidden");
    }

    const part_height = document.querySelector(".cake-text-part").getBoundingClientRect().height;
    gsap_change_cakes(".gsap-scroll-cakes", ".cake-parts-desktop", -105, part_height);
  }
});

watch(cake_idx, (newVal) => {
  for (let i = 0; i < data.length; i++) {
    document.querySelector(`.img-cakes-${data[i].id}`).classList.add("hidden");
  }
  document.querySelector(`.img-cakes-${data[cake_idx.value].id}`).classList.toggle("hidden");
});
</script>