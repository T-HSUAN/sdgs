<template>
  <section class="topic taiwan" id="taiwan">
    <header class="topic-header">
      <p class="no">02</p>
      <h2 class="heading">
        <span class="heading-ch">台灣蛋糕層</span><br />
        <span class="heading-en" lang="en">Taiwan Cake Layer</span>
      </h2>
    </header>
    <div class="inline d-flex flex-column gap-10 gap-sm-15 bgc-primary">
      <div class="cake-part" v-for="(item, index) in data" :key="index">
        <div class="inline-image pos-relative">
          <img :src="`${pgwImgUrl}/taiwan/${data[index].img}`" :class="`img-cake img-cake-${item.id}`" />
        </div>
        <div class="inline-text cake-inline-text">
          <div class="container gsap-scroll-tw">
            <h3>{{ item.title }}</h3>
            <p v-for="p in item.content" :key="p">{{ p }}</p>
            <div class="sdgs-labels w-full">
              <div :class="`inline sdgs-label h-auto bc-sdg-${no}`" v-for="(no, index) in item.label" :key="index">
                <img :src="`${pgwImgUrl}/sdgs/label${no}.jpg`" :alt="`sdgs ${no}`" />
                <div class="inline-text d-iflex-row-center gap-1">
                  <h4>SDGS {{ no }}</h4>
                  <p>這裡會放入一段內文</p>
                  <span :class="`icon-plus fc-sdg-${no}`">+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { data_sdgs_twcakes } from "assets/text/data.js";

const isDesktop = ref(null);
const get_width = () => {
  isDesktop.value = window.innerWidth > 1023.9;
};
const pgwImgUrl = import.meta.env.VITE_FOLDER + "/images";
const data = data_sdgs_twcakes;
const labels_id = data.flatMap((item) => item.label || []);

onMounted(async () => {
  get_width();
  window.addEventListener("resize", get_width);

  const labels = document.querySelectorAll(".sdgs-label");

  for (let i = 0; i < labels.length; i++) {
    labels[i].addEventListener("mouseenter", (e) => {
      const label = e.currentTarget;
      const id = labels_id[i];
      const icon = e.currentTarget.querySelector(".icon-plus");
      label.classList.add(`bgc-sdg-${id}`);
      icon.classList.add("fc-primary");
    });

    labels[i].addEventListener("mouseleave", (e) => {
      const label = e.currentTarget;
      const id = labels_id[i];
      const icon = e.currentTarget.querySelector(".icon-plus");
      label.classList.remove(`bgc-sdg-${id}`);
      icon.classList.remove("fc-primary");
    });
  }

  await nextTick(() => {
    const cakes = document.querySelectorAll(".cake-part");
    gsap_change_cakes(cakes, ".gsap-scroll-tw", ".img-cake");
  });
});
onBeforeUnmount(() => {
  window.removeEventListener("resize", get_width);
});
</script>