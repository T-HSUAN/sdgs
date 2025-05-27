<template>
  <section class="topic lightbox worldwide-goal" :id="`worldwide-goal-${data[idx].id}`">
    <header class="topic-header sr-only">
      <h3 class="heading"><span class="heading-ch">{{ data[idx].title }}</span>
      </h3>
    </header>
    <div class="inline pos-relative">
      <div class="inline-image">
        <canvas class="img-goal17 img-arr--style2"></canvas>
      </div>
      <div class="inline-text wwg-inline-text pos-lg-absolute w-lg-30">
        <div :class="`goal17-text-part g-text-part-${idx + 1}`">
          <img :src="data[idx].title_img" alt="heading">
          <p>{{ data[idx].content }}</p>
        </div>
        <div class="virtual-scroll">
          <div class="scroll-zone">
            <div class="scoll-squar"></div>
          </div>
        </div>
      </div>
    </div>
    <nav class="pagination d-flex-row-center w-full z-index-1">
      <button class="btn btn-white btn-close mr-sp4" @click="show_goal17 = false">╳</button>
      <div class="page btn btn-page text-flex-column w-full fc-secondary" v-for="(page, index) in 17" :key="page"
        :title="`第${page}項`" @click="changePage(index)">
        <p>{{ page }}</p>
        <span>|</span>
      </div>
    </nav>
  </section>
</template>
<script setup>
import { DotLottie } from "@lottiefiles/dotlottie-web";
import { data_sdgs_worldwide } from 'assets/text/data.js';

const show_goal17 = useShowGoal17();
const idx = useGoalIdx();
const data = data_sdgs_worldwide;

const changePage = (idex) => {
  const pages = document.querySelectorAll(".page");
  pages.forEach(page => {
    if (page.classList.contains("active")) {
      page.classList.remove("active");
    }
  });
  idx.value = idex;
  document.getElementsByClassName("page")[idx.value].classList.add("active");
};

watch(show_goal17, async (newVal) => {
  if (newVal) {
    document.body.classList.add("overflow-hidden");
    await nextTick();
    const lottie = new DotLottie({
      canvas: document.querySelector(".img-goal17"),
      src: "images/worldwide/goal17.json",
      segment: [15, 495],
      autoplay: false,
      loop: false,
    });
    gsap_change_global17(lottie, '.scroll-zone', '.g-text-part-1', '.g-text-part-');
    changePage(0);
  }
});
</script>