<template>
  <BModal v-model:show="show_goal17" id="modal-tall model-xl" class="model-xl">
    <section class="topic worldwide-goal" :id="`worldwide-goal-${data[idx].id}`">
      <div class="container gsap-scroll-goal17">
        <div class=" wwg-parts">
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
        </div>
      </div>
      <!-- <div class="virtual-scroll">
        <div class="scroll-zone">
          <div class="scoll-squar"></div>
        </div>
      </div> -->
    </section>
  </BModal>
</template>
<script setup>
import { DotLottie } from "@lottiefiles/dotlottie-web";
import { data_sdgs_worldwide } from 'assets/text/data.js';

const show_goal17 = useShowGoal17();
const idx = useGoalIdx();
const data = data_sdgs_worldwide;
const height = ref(0);
onMounted(() => {
  height.value = window.innerHeight - 105
});
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

    // lottie.addEventListener("load", () => {
    //   gsap_change_global17(lottie, '.worldwide-goal', '.gsap-scroll-goal17', '.wwg-parts', height.value);
    // }, 5000);
    lottie.setFrame(20);

    // changePage(0);
  }
});
</script>