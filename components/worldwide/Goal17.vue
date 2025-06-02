<template>
  <section class="topic worldwide-goal" :id="`worldwide-goal-${data[index].id}`">
    <div class="container goal17-container">
      <header class="topic-header sr-only">
        <h3 class="heading"><span class="heading-ch">{{ data[index].title }}</span>
        </h3>
      </header>
      <div class="inline">
        <div class="container gsap-scroll-goal">
          <div class="inline-image pos-absolute size-lg-fit">
            <canvas class="img-goal17 img-arr--style2"></canvas>
          </div>
          <div class="inline-text wwg-inline-text pos-lg-absolute w-lg-30">
            <div :class="`goal17-text-part g-text-part-${item.id}`" v-for="(item, index) in data" :key="index">
              <img :src="item.title_img" alt="heading">
              <p>{{ item.content }}</p>
            </div>
          </div>
        </div>

      </div>
      <nav class="pagination">
        <button class="btn btn-white btn-close mr-sp4" @click="show_goal17 = false">╳</button>
        <div class="page btn btn-page fc-secondary" v-for="(page, index) in 17" :key="page" :title="`第${page}項`"
          @click="changePage(index)">
          <p>{{ page }}</p>
          <span>|</span>
        </div>
      </nav>
    </div>
  </section>
</template>
<script setup>
import { DotLottie } from "@lottiefiles/dotlottie-web";
import { data_sdgs_worldwide } from 'assets/text/data.js';

const show_goal17 = useShowGoal17();
const index = useGoalIdx();
const data = data_sdgs_worldwide;
const height = ref(0);
const changePage = (index) => {
  index.value = index;
}

onMounted(() => {
  height.value = window.innerHeight - 105
  nextTick();
  const lottie = new DotLottie({
    canvas: document.querySelector(".img-goal17"),
    src: "images/worldwide/goal17.json",
    segment: [15, 495],
    autoplay: false,
    loop: false,
  });
  gsap_change_global17(lottie, '.worldwide-goal', '.gsap-scroll-goal', '.g-text-part', 360);
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
      gsap_change_global17(lottie, '.worldwide-goal', '.gsap-scroll-goal', '.g-text-part', 360);
      lottie.setFrame(20);
      // changePage(0);
    });
  }
});
</script>