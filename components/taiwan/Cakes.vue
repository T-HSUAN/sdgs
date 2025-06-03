<template>
  <section class="topic taiwan" id="taiwan">
    <header class="topic-header">
      <p class="no">02</p>
      <h2 class="heading">
        <span class="heading-ch">台灣蛋糕層</span><br />
        <span class="heading-en" lang="en">Taiwan Cake Layer</span>
      </h2>
    </header>
    <div class="inline tw-inline">
      <div class="cake-part" v-for="(item, index) in data" :key="index">
        <div class="container gsap-scroll-tw">
          <div class="inline-image">
            <img
              :src="imgFolder + data[index].img"
              :class="`img-cake img-cake-${item.id}`"
            />
          </div>
          <div class="inline-text cake-inline-text">
            <div class="container tw-it-container">
              <h3>{{ item.title }}</h3>
              <p v-for="p in item.content" :key="p">{{ p }}</p>
              <div class="sdgs-labels w-full">
                <div
                  :class="`inline sdgs-label bc-sdg-${no}`"
                  v-for="(no, index) in item.label"
                  :key="index"
                >
                  <img
                    :src="`${imgFolder}/images/sdgs/label${no}.jpg`"
                    :alt="`sdgs ${no}`"
                  />
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
    </div>
  </section>
</template>
<script setup>
import { data_sdgs_twcakes } from "assets/text/data.js";

const isDesktop = ref(null);
const get_width = () => {
  isDesktop.value = window.innerWidth > 1023.9;
};
const data = data_sdgs_twcakes;
const imgFolder = import.meta.env.VITE_FOLDER;

onMounted(async () => {
  get_width();
  window.addEventListener("resize", get_width);

  await nextTick(() => {
    const cakes = document.querySelectorAll(".gsap-scroll-tw");
    gsap_change_cakes(cakes);
  });
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", get_width);
});
</script>