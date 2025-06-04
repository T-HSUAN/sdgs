<template>
  <section class="topic" id="worldwide">
    <header class="topic-header">
      <p class="no">01</p>
      <h2 class="heading">
        <span class="heading-ch">全球SDGs進度表：誰在落後清單上？</span><br />
        <span class="heading-en" lang="en"
          >Global SD GS schedule: Who is on the lagging list?</span
        >
      </h2>
    </header>
    <div class="inline">
      <div class="inline-text ww-inline-text">
        <p>
          全球推動聯合國永續發展目標SDGs即將邁入第10年，最新進度揭示一個不容忽視的現實，就是僅有17%的目標如期推進。當氣候變遷、貧富差距、資源枯竭等挑戰持續加劇，距離2030年只剩最後5年，我們是否還有翻盤的機會？
        </p>
        <p>
          從聯合國最新報告《The Sustainable Development Goals Report
          2024》，揭示全球17項的永續目標進展中，單項最高達成率（On track or
          target
          met）僅約40%，分別為SDG7可負擔的永續能源、SDG12責任消費與生產。透過此區塊的視覺設計，一起掌握哪些永續項目岌岌可危。
        </p>
        <button class="btn btn-white btn-more" @click="show_goal17 = true">
          點按看進度
        </button>
      </div>
      <div class="inline-image">
        <canvas class="img-goals"></canvas>
      </div>
    </div>
  </section>
  <WorldwideGoal17 v-show="show_goal17" />
</template>
<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DotLottie } from "@lottiefiles/dotlottie-web";
gsap.registerPlugin(ScrollTrigger);

const imgUrl = import.meta.env.VITE_FOLDER + "/images";
const show_goal17 = useShowGoal17();

onMounted(async () => {
  await nextTick();
  const lottie = new DotLottie({
    canvas: document.querySelector(".img-goals"),
  });

  ScrollTrigger.create({
    trigger: "#worldwide",
    start: "top 20%",
    end: "bottom",
    once: true,
    onEnter: () => {
      setTimeout(() => {
        lottie.load({
          src: `${imgUrl}/worldwide/goals.json`,
          autoplay: true,
          loop: false,
          speed: 3,
        });
      }, 500);
    },
  });
});
</script>