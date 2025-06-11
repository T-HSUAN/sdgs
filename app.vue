<template>
  <ScrollProgress />
  <Header />
  <main>
    <nuxtPage />
  </main>
  <Footer />
</template>
<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

/* 攔截錨點點擊 + 手動滾動 + 更新 ScrollTrigger:攔截預設的錨點行為，並使用 gsap.to() 實現平滑滾動與動畫同步 */
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

onMounted(() => {
  //點擊錨點時，使用 gsap 平滑滾動到目標元素
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault(); // 阻止預設錨點行為
      const targetId = this.getAttribute("href");
      const target = document.querySelector(targetId);

      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: {
            y: target,
            offsetY: 105,
            autoKill: false, // 確保滾動不會被其他事件打斷
          },
          ease: "power2.inOut",
          onUpdate: () => ScrollTrigger.update(),
          onComplete: () => ScrollTrigger.refresh(),
        });
      }

      history.replaceState(null, "", location.pathname);
    });
  });

  // 更新 ScrollTrigger
  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });
});

</script>
