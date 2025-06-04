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
    const split = new SplitText(heading, { type: "chars" });

    // 初始狀態設置
    gsap.set(split.chars, { y: -50, opacity: 0, filter: "blur(10px)" });

    // 建立 timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: heading.parentElement,
        start: "top 80%",
        toggleActions: "play none none reset",
      },
    });
    tl.to(split.chars, {
      y: 5,
      opacity: 0.8,
      filter: "blur(3px)",
      duration: 0.1,
      stagger: 0.03,
      ease: "power2.out",
    }).to(split.chars, {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      duration: 0.1,
      stagger: 0.05,
      ease: "power2.out",
    });
  });
};

export const gsap_change_global17 = (lottie, scroller, trigger, end) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      scroller: scroller,
      trigger: trigger,
      pin: true,
      pinSpacing: false,
      anticipatePin: 1,
      start: "top top",
      end: () => end * 16,
      scrub: true,
      snap: 1 / 16,
      onUpdate: (self) => {
        let progress = self.progress;
        progress < 0.06 && (progress = 0);
        const frame = 480 * progress + 15;
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
        for (const z of zones) {
          if (
            progress >= z.min &&
            progress <= z.max &&
            goalIdx.value !== z.idx
          ) {
            goalIdx.value = z.idx;
            lottie.setFrame(frame);

            document
              .querySelector(".wwg-page.active")
              .classList.remove("active");
            document
              .querySelector(`.wwg-page-${goalIdx.value + 1}`)
              .classList.add("active");
            break;
          }
        }

        // console.log("progress", progress);
        // console.log("goalIdx", goalIdx.value);
        // console.log("frame", lottie.currentFrame);
      },

      onLeaveBack: () => {
        useGoalIdx().value = 0;
        lottie.setFrame(20);
      },
    },
  });
  const parts = document.querySelectorAll(".goal17-text-part");
  tl.fromTo(".g-text-part-1", { autoAlpha: 1 }, { autoAlpha: 0, duration: 1 });
  Array.from(parts)
    .slice(1, 16)
    .forEach((part) => {
      tl.fromTo(part, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1 }, "<");
      tl.to(part, { autoAlpha: 0, duration: 0.5 });
    });
  tl.fromTo(
    ".g-text-part-17",
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 1 },
    "<"
  );
};

//滾動文字內容使左圖蛋糕層變化
export const gsap_change_cakes = (cakes, textarea_name, img_name) => {
  let mm = gsap.matchMedia();
  mm.add("(min-width: 1024px)", () => {
    cakes.forEach((cake, i) => {
      const textarea = cake.querySelector(textarea_name);
      const img = cake.querySelector(img_name);
      const container_height = window.innerHeight - 105;
      const scroll_height = (i = 4 && textarea.scrollHeight < container_height)
        ? container_height
        : textarea.scrollHeight;

      // 建立 timeline 控制這一段的淡入與文字滾動
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cake,
          start: "top+=-74px top+=105px",
          end: `+=${scroll_height}`,
          scrub: true,
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        },
      });

      if (i > 0) {
        tl.fromTo(cake, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.01 });
      }

      tl.to(
        textarea,
        {
          y: () => -scroll_height,
          ease: "none",
          duration: 1,
        },
        "<"
      );

      tl.to(img, { autoAlpha: 0, duration: 0.05 }, 0.6);

      tl.to(cake, { autoAlpha: 0, duration: 0.01 }, 0.99);
    });
  });
};
/*
export const gsap_change_cakes = (trigger, content, start, end) => {
  let mm = gsap.matchMedia();
  mm.add("(min-width: 1024px)", () => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: `${start} top`,
        end: () => `+=${end * 4} bottom`,
        scrub: true,
        pin: true,
        anticipatePin: 1,
        snap: 1 / 4,
        onUpdate: (self) => {
          const zones = [
            { idx: 0, min: 0.0, max: 0.22 },
            { idx: 1, min: 0.23, max: 0.33 },
            { idx: 2, min: 0.45, max: 0.55 },
            { idx: 3, min: 0.7, max: 0.8 },
            { idx: 4, min: 0.95, max: 1.0 },
          ];

          const img_idx = useCakeImg();
          const progress = self.progress;

          for (const z of zones) {
            if (
              progress >= z.min &&
              progress <= z.max &&
              img_idx.value !== z.idx
            ) {
              img_idx.value = z.idx;
              break;
            }
          }
        },
      },
    });
    for (let i = 1; i <= 4; i++) {
      tl.to(content, {
        y: -end * i,
        duration: 1,
      });
    }
  });
};
export const gsap_change_cakes = (lottie, trigger, content, start, end) => {
  let mm = gsap.matchMedia();

  lottie.addEventListener("load", () => {
    mm.add("(min-width: 1024px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: trigger,
          start: `${start} top`,
          end: () => `+=${end * 4} bottom`,
          scrub: true,
          pin: true,
          anticipatePin: 1,
          snap: 1 / 4,
          onUpdate: self => {
            const frame = lottie.totalFrames * 19 / 40 * self.progress;
            lottie.setFrame(frame);
          }
        }
      });
      for (let i = 1; i <= 4; i++) {
        tl.to(content, {
          y: -end * i,
          duration: 1
        });
      }
    });
  })
}
*/
