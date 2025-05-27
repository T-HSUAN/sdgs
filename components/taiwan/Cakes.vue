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
          <canvas class="img-cakes"></canvas>
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
            <canvas :class="`img-cake img-cake-${item.id}`"></canvas>
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
import { DotLottie } from "@lottiefiles/dotlottie-web";
import { data_sdgs_twcakes } from 'assets/text/data.js';

const isDesktop = ref(null);
const get_width = () => {
  isDesktop.value = window.innerWidth > 1023.9;
};
const data = data_sdgs_twcakes;
const imgFolder = import.meta.env.VITE_FOLDER;

onMounted(() => {
  get_width();
  window.addEventListener("resize", get_width);
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", get_width);
});

watch(isDesktop, async (newVal) => {
  await nextTick();
  const canvas = document.querySelector(".img-cakes");
  if (newVal && canvas) {
    const lottie = new DotLottie({
      canvas: canvas,
      src: `${imgFolder}/images/taiwan/cakes.json`,
      autoplay: false,
      loop: false,
      renderConfig: {
        autoResize: true,
      }
    });

    const part_height = document.querySelector(".cake-text-part").getBoundingClientRect().height;
    gsap_change_cakes(lottie, ".gsap-scroll-cakes", ".cake-parts-desktop", -105, part_height);
  } else {
    for (let i = 0; i < data.length; i++) {
      new DotLottie({
        canvas: document.querySelector(`.img-cake-${data[i].id}`),
        src: imgFolder + data[i].lottie,
        autoplay: true,
        loop: true,
        renderConfig: {
          autoResize: true,
        }
      });
    }
  }
});
</script>