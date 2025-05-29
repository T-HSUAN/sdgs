<template>
  <div id="loader"></div>
  <Header />
  <main>
    <nuxtPage />
  </main>
  <Footer />
</template>
<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollToPlugin } from "gsap/ScrollToPlugin";


/* 攔截錨點點擊 + 手動滾動 + 更新 ScrollTrigger:攔截預設的錨點行為，並使用 gsap.to() 實現平滑滾動與動畫同步 */
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

onMounted(() => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault(); // 阻止預設錨點行為
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);

      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: target,
            offsetY: 105, // 偏移量，確保滾動到正確位置
            autoKill: false // 確保滾動不會被其他事件打斷
          },
          ease: "power2.inOut",
          onUpdate: () => ScrollTrigger.update(), // 動畫中持續更新
          onComplete: () => ScrollTrigger.refresh() // 最後重新整理位置
        });
      }
    });
  });

  window.addEventListener('resize', () => {
    ScrollTrigger.refresh(); // 窗口大小改變時重新整理 ScrollTrigger
    console.log("Window resized, ScrollTrigger refreshed");
  });
});


</script>
