<template>
  <div class="loader loader-welcome"></div>
  <section class="hero" id="hero">
    <div class="container gsap-scroll-hero">
      <div class="hero-part hero-part-1 pos-absolute d-flex-column-center">
        <header class="hero-header">
          <h1
            class="d-flex flex-column align-items-center text-center"
            id="title"
          >
            <span class="title-ch">SDGs十周年</span>找回我們失去的進度<span
              class="title-en"
              lang="en"
              >Reclaiming Our Lost Progress</span
            >
          </h1>
          <img
            class="icon-symbol loading"
            src="public/images/symbol.svg"
            alt="sdgs-symbol"
          />
        </header>
        <div class="guidance-scroll pos-absolute bottom-0">
          <p class="text-s fc-prompt">scroll</p>
          <span class="icon-line--anim"></span>
        </div>
        <picture>
          <source
            class="bg-main-visual"
            srcset="public/images/bg-SDGs.webp"
            media="(min-width: $tab-max)"
            type="image/webp"
          />
          <source
            class="bg-main-visual"
            srcset="public/images/bg-SDGs-vert.svg"
            media="(max-width: 1023px)"
            type="image/svg+xml"
          />
          <img
            class="bg-main-visual"
            src="public/images/bg-SDGs.webp"
            alt="main-visual"
          />
        </picture>
      </div>
      <div class="hero-part hero-part-2 pos-absolute bgc-primary-60 blur">
        <div
          :class="`inline hp2-inline-${
            index + 1
          } pos-absolute d-flex-row-center`"
          v-for="(paragraph, index) in data_hero_p2"
          :key="paragraph"
        >
          <p class="text-l w-80 w-sm-60 w-lg-40">{{ paragraph }}</p>
        </div>
      </div>
    </div>
  </section>
  <WorldwideGoals />
  <TaiwanCakes />
  <Articles />
  <!-- <Enterprise /> -->
  <section class="contributor text-center" role="complementary">
    <div class="inline">
      <div class="inline-image contrib-inline-image">
        <a class="link" href="https://udn.com/news/index" target="_blank"
          ><img
            src="public/images/logo2.svg"
            alt="contributor logo : 聯合新聞網"
        /></a>
        <a
          class="link"
          href="https://udn.com/upf/newmedia/ubrandstudio/"
          target="_blank"
          ><img
            src="public/images/logo3.svg"
            alt="contributor logo : 融媒體倡議部"
        /></a>
        <a
          class="link"
          href="https://ubrand.udn.com/ubrand/index"
          target="_blank"
          ><img src="public/images/logo4.svg" alt="contributor logo : 倡議家"
        /></a>
      </div>
      <div class="inline-text">
        <dl class="contrib-inline-text">
          <dt>製作人</dt>
          <dd>OOO、OOO</dd>
          <dt>視覺設計</dt>
          <dd>OOO</dd>
          <dt>網頁製作</dt>
          <dd>OOO</dd>
          <dt>議題行銷</dt>
          <dd>OOO</dd>
          <dt>監製</dt>
          <dd>OOO</dd>
        </dl>
      </div>
    </div>
    <p class="date my-sp3 my-md-sp4">2025.04.21</p>
  </section>
</template>

<script setup>
import { data_hero_part2 } from "assets/data/index.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

/* 攔截錨點點擊 + 手動滾動 + 更新 ScrollTrigger:攔截預設的錨點行為，並使用 gsap.to() 實現平滑滾動與動畫同步 */
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const data_hero_p2 = data_hero_part2;

nextTick(() => {
  // if (window.scrollY > 0) {
  //   window.scrollTo(0, 0);
  // }
  setTimeout(() => {
    toggleLoading();
    gsap_loading();
  }, 1);
  gsap_scroll_hero();
  gsap_split_heading();
});
</script>
