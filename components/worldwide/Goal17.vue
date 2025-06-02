<template>
  <section class="topic worldwide-goal" id="worldwide-goal">
    <div class="container goal17-container">
      <header class="topic-header sr-only">
        <h3 class="heading">
          <span class="heading-ch">{{ data[index].title }}</span>
        </h3>
      </header>
      <div class="inline">
        <div class="container gsap-scroll-goal">
          <div class="inline-image pos-absolute size-lg-fit">
            <canvas class="img-goal17 img-arr--style2"></canvas>
          </div>
          <div class="inline-text wwg-inline-text pos-lg-absolute w-lg-30">
            <div
              :class="`goal17-text-part g-text-part-${item.id}`"
              v-for="(item, index) in data"
              :key="index"
            >
              <img :src="item.title_img" alt="heading" />
              <p>{{ item.content }}</p>
            </div>
          </div>
        </div>
      </div>
      <nav class="pagination">
        <button
          class="btn btn-white btn-close mr-sp4"
          @click="show_goal17 = false"
        >
          ╳
        </button>
        <div
          :class="`btn btn-gray btn-page page-${page}`"
          v-for="(page, index) in 17"
          :key="page"
          :title="`第 ${page} 項`"
          @click="changePage(index)"
        >
          <p>{{ page }}</p>
          <span>|</span>
        </div>
      </nav>
    </div>
  </section>
</template>
<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { DotLottie } from "@lottiefiles/dotlottie-web";
import { data_sdgs_worldwide } from "assets/text/data.js";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const show_goal17 = useShowGoal17();
const data = data_sdgs_worldwide;
const index = useGoalIdx();

const changePage = (idx) => {
  // Change the active text part based on the index
  document.querySelector(".btn-page.active").classList.remove("active");
  document.querySelector(`.page-${idx + 1}`)?.classList.add("active");
  // Scroll to the corresponding section in the lightbox
  const lightbox = document.getElementById("worldwide-goal");
  index.value = idx;
  const progress = (5760 / 16) * index.value;
  gsap.to(lightbox, {
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

onMounted(() => {
  nextTick();
  //initialize the first text part
  document.querySelector(".page-1").classList.add("active");

  const lottie = new DotLottie({
    canvas: document.querySelector(".img-goal17"),
    src: "images/worldwide/goal17.json",
    segment: [15, 495],
    autoplay: false,
    loop: false,
  });
  gsap_change_global17(lottie, ".worldwide-goal", ".gsap-scroll-goal", 360);
  lottie.setFrame(20);
});

watch(show_goal17, async (newVal) => {
  if (newVal) {
    await nextTick();
    const lottie = new DotLottie({
      canvas: document.querySelector(".img-goal17"),
      src: "images/worldwide/goal17.json",
      segment: [15, 495],
      autoplay: false,
      loop: false,
    });

    lottie.addEventListener("load", () => {
      gsap_change_global17(lottie, ".worldwide-goal", ".gsap-scroll-goal", 360);
      lottie.setFrame(20);
    });
  }
});
</script>