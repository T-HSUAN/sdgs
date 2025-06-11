import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
gsap.registerPlugin(ScrollTrigger, SplitText);

export const gsap_loading = () => {
  const loading = gsap.timeline();

  loading
    .fromTo(
      "#title, .guidance-scroll",
      { autoAlpha: 0, y: 100 },
      { autoAlpha: 1, y: 0, duration: 2, ease: "expo.out" }
    )
    .fromTo(
      "#header",
      { autoAlpha: 0, y: "-100" },
      { autoAlpha: 1, y: 0, duration: 2, ease: "expo.out" },
      0
    )
    .fromTo(
      ".bg-main-visual",
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 2, ease: "expo.out" }
    );
};

export const gsap_scroll_hero = () => {
  const heroScroll = gsap.timeline({
    scrollTrigger: {
      trigger: "#hero",
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      pin: ".gsap-scroll-hero",
      pinSpacing: false,
      snap: {
        snapTo: 1 / 3,
        duration: 0.5,
      },
    },
  });

  heroScroll
    .fromTo(
      ".hero-header, .guidance-scroll",
      { autoAlpha: 1 },
      { autoAlpha: 0, duration: 1 }
    )
    .fromTo(
      ".hero-part-2",
      { autoAlpha: 0, pointerEvents: "none" },
      { autoAlpha: 1, pointerEvents: "auto", duration: 1 },
      "<"
    )
    .fromTo(
      ".hp2-inline-1",
      { autoAlpha: 0, y: "100%" },
      { autoAlpha: 1, y: 0, duration: 1 },
      "<"
    )
    .to(".hp2-inline-1", { autoAlpha: 0, y: "-100%", duration: 0.5 })
    .fromTo(
      ".hp2-inline-2",
      { autoAlpha: 0, y: "100%" },
      { autoAlpha: 1, y: 0, duration: 1 },
      "<"
    )
    .to(".hp2-inline-2", { autoAlpha: 0, y: "-100%", duration: 0.5 })
    .fromTo(
      ".hp2-inline-3",
      { autoAlpha: 0, y: "100%" },
      { autoAlpha: 1, y: 0, duration: 1 },
      "<"
    );
};

export const gsap_split_heading = () => {
  gsap.utils.toArray(".heading-ch").forEach((heading) => {
    new SplitText(heading, {
      type: "chars",
      autoSplit: true,
      onSplit(self) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heading.parentElement,
            start: "top 80%",
            toggleActions: "play none none reset"
          },
        });
        tl.fromTo(self.chars, { y: -50, opacity: 0, filter: "blur(10px)" }, { y: 5, opacity: 0.8, filter: "blur(3px)", duration: 0.1, stagger: 0.03, ease: "power2.out" }
        ).to(self.chars, { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.1, stagger: 0.05, ease: "power2.out" });
      },
    });
  });
};

export const gsap_change_global17 = (lottie, scroller, trigger, end) => {
  const goalIdx = useGoalIdx();
  const zones = [
    { idx: 0, min: 0.0, max: 0.061 },
    { idx: 1, min: 0.061, max: 0.063 },
    { idx: 2, min: 0.124, max: 0.126 },
    { idx: 3, min: 0.186, max: 0.188 },
    { idx: 4, min: 0.249, max: 0.251 },
    { idx: 5, min: 0.311, max: 0.313 },
    { idx: 6, min: 0.374, max: 0.376 },
    { idx: 7, min: 0.436, max: 0.438 },
    { idx: 8, min: 0.499, max: 0.501 },
    { idx: 9, min: 0.561, max: 0.563 },
    { idx: 10, min: 0.624, max: 0.626 },
    { idx: 11, min: 0.686, max: 0.688 },
    { idx: 12, min: 0.749, max: 0.751 },
    { idx: 13, min: 0.811, max: 0.813 },
    { idx: 14, min: 0.874, max: 0.876 },
    { idx: 15, min: 0.936, max: 0.938 },
    { idx: 16, min: 0.99, max: 1.0 },
  ];
  let lastFrame = null;
  const tl = gsap.timeline({
    scrollTrigger: {
      scroller: scroller,
      trigger: trigger,
      pin: true,
      pinType: "fixed",
      pinSpacing: false,
      anticipatePin: 1,
      start: "top top",
      end: () => `+=${end * 15}`,
      scrub: true,
      snap: 1 / 16,
      markers: true,
      defaults: { duration: 1, ease: "none" },
      onUpdate: (self) => {
        let progress = self.progress;
        //   progress < 0.06 && (progress = 0);
        //   // const frame = 480 * progress + 15;
        //   const frame = Math.round(480 * progress + 15);
        //   for (const z of zones) {
        //     if (
        //       progress >= z.min &&
        //       progress <= z.max &&
        //       goalIdx.value !== z.idx
        //     ) {
        //       goalIdx.value = z.idx;
        // lottie.setFrame(frame);
        //       break;
        //     }
        //   }

        //   if (frame !== lastFrame) {
        //     lastFrame = frame;
        //     lottie.setFrame(frame);
        //   }
      },
      onLeaveBack: () => {
        useGoalIdx().value = 0;
        lottie.setFrame(15);
      },
    },
  });
  const parts = document.querySelectorAll(".goal17-text-part");
  parts.forEach((part, i) => {
    if (i < parts.length - 1) {
      tl.to(part, { visibility: "hidden" });
      tl.fromTo(
        parts[i + 1],
        { visibility: "hidden" },
        { visibility: "visible" },
        "<"
      );
    }
  });
};

//滾動文字內容使左圖蛋糕層變化
export const gsap_change_cakes = (cakes, textarea_name, img_name) => {
  let mm = gsap.matchMedia();
  mm.add("(min-width: 1024px)", () => {
    cakes.forEach((cake, i) => {
      const textarea = cake.querySelector(textarea_name);
      const img = cake.querySelector(img_name);
      const container_height = window.innerHeight - 105;
      const scroll_height = i == 4 ? 0 : textarea.scrollHeight;
      /* const scroll_height = (i == 4 && textarea.scrollHeight < container_height) ? container_height : textarea.scrollHeight;*/

      // 建立 timeline 控制這一段的淡入與文字滾動
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cake,
          start: "top+=-179px top+=105px",
          end: `+=${scroll_height}`,
          scrub: true,
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        },
      });

      if (i > 0)
        tl.fromTo(img, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.05 }, ">");

      tl.to(textarea, {
        y: () => -scroll_height,
        ease: "none",
        duration: 1,
      });
      if (i < 4) tl.to(img, { autoAlpha: 0, duration: 0.1 });
    });
  });
};
