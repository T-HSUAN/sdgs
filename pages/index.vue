<template>
  <section class="hero" id="hero">
    <div class="container gsap-scroll-hero">
      <div class="hero-part-1 pos-absolute d-flex flex-row align-items-center">
        <header class="hero-header">
          <h1 class="d-flex flex-column align-items-center text-center" id="title"><span
              class="title-ch">SDGs十周年</span>找回我們失去的進度<span class="title-en" lang="en">Reclaiming Our Lost
              Progress</span></h1><img class="icon-symbol loading" src="/images/symbol.svg" alt="symbol" />
        </header>
        <div class="guidance-scroll h-sp10 h-xs-sp15">
          <p class="text-s fc-prompt">scroll</p><span class="icon-line--anim"></span>
        </div>
        <picture>
          <source class="bg-main-visual" srcset="/images/bg-SDGs.webp" media="(min-width: $tab-max)"
            type="image/webp" />
          <source class="bg-main-visual" srcset="/images/bg-SDGs-vert.svg" media="(max-width: 1023.9px)"
            type="image/svg+xml" /><img class="bg-main-visual" src="/images/bg-SDGs.webp" alt="main-visual" />
        </picture>
      </div>
      <div class="hero-part-2 blur pos-absolute">
        <div :class="`inline hp2-inline-${index + 1} pos-absolute d-flex-row-center`"
          v-for="(paragraph, index) in data_hero_p2" :key="paragraph">
          <p class="text-l w-80 w-sm-60 w-lg-40">{{ paragraph }}</p>
        </div>
      </div>
    </div>
  </section>
  <WorldwideGoals />
  <TaiwanCakes />
  <ManuscriptArticles />
  <Enterprise />
</template>

<script setup>
import { data_hero_part2 } from 'assets/text/data.js';

const data_hero_p2 = data_hero_part2;

nextTick(() => {

  // if (window.scrollY > 0) {
  //   window.scrollTo(0, 0);
  // }
  setTimeout(() => {
    document.querySelector(".icon-symbol").classList.toggle("loading");
    document.querySelector("#loader").classList.add("hidden");
    gsap_loading();
  }, 1);
  gsap_scroll_hero();
  gsap_split_heading();
  gsap_change_global17();
});
</script>
