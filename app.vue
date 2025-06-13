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
  const route = useRoute();
  const router = useRouter();

  route.hash && history.replaceState(null, "", location.pathname + location.search);


  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault(); // 阻止預設錨點行為

      let anchor = e.currentTarget.getAttribute('href');

      if (route.path !== "/") {
        router.push("/");
      }

      gsap.to(window, {
        scrollTo: { y: anchor, offsetY: 105, autoKill: false },
        duration: 1,
        delay: 0.1,
        ease: "power2.inOut",
        onUpdate: () => ScrollTrigger.update(),
        onComplete: () => ScrollTrigger.refresh(),
      });
    });
  });

  // 更新 ScrollTrigger
  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });
});

</script>
