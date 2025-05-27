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
      }
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
      { autoAlpha: 0, pointerEvents: 'none' },
      { autoAlpha: 1, pointerEvents: 'auto', duration: 1 },
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
}

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
        toggleActions: "play none none reset"
      }
    });
    tl.to(split.chars, {
      y: 5,
      opacity: 0.8,
      filter: "blur(3px)",
      duration: 0.1,
      stagger: 0.03,
      ease: "power2.out"
    })
      .to(split.chars, {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.1,
        stagger: 0.05,
        ease: "power2.out"
      });
  });
};

export const gsap_change_global17 = (lottie, trigger, content_first, content) => {
  lottie.addEventListener("load", () => {
    lottie.setFrame(20);

    // ScrollTrigger 控制幀數
    const scroll = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        pin: true,
        start: "top top",
        end: "bottom bottom", // 動畫播放區間，可調整
        scrub: true,
        snap: 1 / 16,
        markers: true,
        onUpdate: self => {
          const frame = 480 * self.progress + 15;
          lottie.setFrame(frame);
        },
        onLeaveBack: () => {
          console.log('🆙 已往回滾並觸頂，觸發動作！')
          useGoalIdx().value = 0;
          gsap.set(content_first, { autoAlpha: 0 });
          gsap.to(content_first, { autoAlpha: 1, duration: 1 });
          lottie.setFrame(20);
        }
      },
    });

    gsap.set(content_first, { autoAlpha: 0 });
    gsap.to(content_first, { autoAlpha: 1, duration: 1 });

    for (let idx = 1; idx <= 16; idx++) {
      scroll.fromTo(
        content + (idx + 1),
        { autoAlpha: 0 },
        {
          autoAlpha: 1, duration: 1,
          onStart: () => {
            const text_idx = useGoalIdx();
            text_idx.value = idx;
            console.log('idx', text_idx.value);
            console.log('idx store:', useGoalIdx().value);
          },
        }
      );
    }
  });
}
//滾動文字內容使左圖蛋糕層變化
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
          markers: true,
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