<template>
  <section class="topic-drawer worldwide-goal" id="worldwide-goal">
    <div class="container goal17-container">
      <header class="topic-header sr-only">
        <h3 class="heading">
          <span class="heading-ch">{{ data[index].title }}</span>
        </h3>
      </header>
      <div class="inline">
        <div class="container gsap-scroll-goal">
          <div class="inline-image wwg-inline-image">
            <canvas class="img-goal17"></canvas>
          </div>
          <div class="inline-text wwg-inline-text">
            <div :class="`goal17-text-part g-text-part-${item.id}`" v-for="(item, index) in data" :key="index">
              <img class="heading img-drawer-heading" :src="`${imgUrl}/worldwide/${item.title_img}`" alt="heading" />
              <p>{{ item.content }}</p>
            </div>
          </div>
        </div>
      </div>
      <nav class="pagination wwg-pagination">
        <button class="btn btn-white btn-close wwg-close" @click="show_goal17 = false">
          ╳
        </button>
        <div :class="`btn btn-gray wwg-page wwg-page-${page}`" v-for="(page, index) in 17" :key="page"
          :title="`第 ${page} 項`" @click="changePage(index)">
          <p>{{ page }}</p>
          <span>|</span>
        </div>
      </nav>
    </div>
    <Loading v-if="loading" />
  </section>
</template>
<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { DotLottie } from "@lottiefiles/dotlottie-web";
import { data_sdgs_worldwide } from "assets/text/data.js";

const loading = ref(true);
const show_goal17 = useShowGoal17();
const imgUrl = import.meta.env.VITE_FOLDER + "/images";
const data = data_sdgs_worldwide;
const index = useGoalIdx();
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const changePage = (idx) => {
  // Change the active text part based on the index
  document.querySelector(".wwg-page.active").classList.remove("active");
  document.querySelector(`.wwg-page-${idx + 1}`)?.classList.add("active");

  // Scroll to the corresponding section in the lightbox
  index.value = idx;
  const scroller = document.getElementById("worldwide-goal");
  const progress = (5760 / 16) * index.value;
  gsap.to(scroller, {
    duration: 1,
    scrollTo: {
      y: progress,
      autoKill: false, // 確保滾動不會被其他事件打斷
    },
    ease: "power2.inOut",
    onUpdate: () => ScrollTrigger.update(), // 動畫中持續更新
    onComplete: () => ScrollTrigger.refresh(), // 最後重新整理位置
  });
};

onMounted(async () => {
  await nextTick();
  //initialize the first text part
  document.querySelector(".wwg-page-1").classList.add("active");
});

watch(
  show_goal17,
  async (newVal) => {
    if (newVal) {
      await nextTick();

      setTimeout(() => {
        loading.value = false;
      }, 300);
      const lottie = new DotLottie({
        canvas: document.querySelector(".img-goal17"),
        src: "images/worldwide/goal17.json",
        segment: [15, 495],
        autoplay: false,
        loop: false,
      });

      const scroller = document.getElementById("worldwide-goal");
      const trigger = document.querySelector(".gsap-scroll-goal");
      lottie.addEventListener("load", () => {
        gsap_change_global17(lottie, scroller, trigger, 360);
        lottie.setFrame(15);
      });
    }
  },
  { once: true }
);

watch(
  index,
  (newVal) => {
    if (newVal) {
      document
        .querySelector(".wwg-page.active")
        .classList.remove("active");
      document
        .querySelector(`.wwg-page-${index.value + 1}`)
        .classList.add("active");
    }
  }
);
</script>
