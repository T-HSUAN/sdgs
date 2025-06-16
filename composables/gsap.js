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
      { autoAlpha: 1, y: 0, duration: 1, ease: "expo.out" }
    )
    .fromTo(
      "#header",
      { autoAlpha: 0, y: "-100" },
      { autoAlpha: 1, y: 0, duration: 1, ease: "expo.out" },
      0
    )
    .fromTo(
      ".bg-main-visual",
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 1.5, ease: "expo.out" }, 0.8
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

//滾動文字內容使左圖蛋糕層變化
export const gsap_change_cakes = (cakes, textarea_name, img_name) => {
  let mm = gsap.matchMedia();
  mm.add("(min-width: 1024px)", () => {
    cakes.forEach((cake, i) => {
      const textarea = cake.querySelector(textarea_name);
      const img = cake.querySelector(img_name);
      const start_y = i == 0 ? -32 : 'top'; // 第五個蛋糕不需要往上移動
      const scroll_height = i === 0 ? (textarea.scrollHeight + 32) : i === 4 ? 0 : textarea.scrollHeight;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: cake,
          start: `${start_y} 105`,
          end: () => `+=${scroll_height}`,
          scrub: true,
          pin: true,
          pinSpacing: false,
          anticipatePin: 1,
        },
      });


      if (i > 0) tl.fromTo(img, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.05 }, ">");
      tl.to(textarea, {
        y: () => -scroll_height,
        ease: "none",
        duration: 1,
      });
      if (i < 4) tl.to(img, { autoAlpha: 0, duration: 0.05 });

    });
  });
};
