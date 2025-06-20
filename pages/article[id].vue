<template>
  <article class="article">
    <div class="article-hero">
      <div class="article-header">
        <img
          class="img-aspect"
          :src="`${imgUrl}/taiwan/cake${prologue.aspect}.webp`"
        />
        <h2 class="article-heading">
          <div class="type-wrapper">
            <span :class="'typing-text h-text-' + id"></span>
          </div>
          <span class="sr-only">{{ prologue.title }}</span>
        </h2>
        <div class="article-labels" data-aos="zoom-in">
          <NuxtLink
            class="link"
            :to="'/cake' + id"
            v-for="(id, index) in aspect.label"
            :key="index"
            ><img
              class="img-article-label"
              :src="`${pgwImgUrl}/sdgs/label${id}.jpg`"
              :alt="'sdg' + id"
          /></NuxtLink>
        </div>
      </div>
      <div class="guidance-scroll mt-auto">
        <p class="text-s fc-prompt">scroll</p>
        <span class="icon-line--anim"></span>
      </div>
    </div>
    <div class="prologue">
      <ul class="prologue-list" data-aos="zoom-in">
        <li>
          <h3 class="prologue-heading">
            你必須要知道的事情<img
              class="mx-sp1"
              :src="`${imgUrl}/article/icon-list.svg`"
            />
          </h3>
        </li>
        <li
          v-for="(item, index) in prologue.list"
          :key="index"
          :value="index + 1"
        >
          {{ item }}
        </li>
      </ul>
      <p data-aos="zoom-in">{{ prologue.abstract }}</p>
    </div>
    <div class="paragraph" v-for="(item, index) in paragraph" :key="index">
      <div class="paragraph-header">
        <h3
          class="paragraph-heading text-center text-left-md"
          v-html="item.heading"
        ></h3>
        <div class="article-labels">
          <NuxtLink
            class="link"
            :to="'/cake' + id"
            v-for="(id, index) in item.label"
            :key="index"
            ><img
              class="img-paragraph-label"
              :src="`${pgwImgUrl}/sdgs/label${id}.jpg`"
          /></NuxtLink>
        </div>
      </div>

      <template v-for="(content, index) in item.content" :key="index">
        <template v-if="content.type === 'text'">
          <p
            class="my-sp3 my-xl-sp6"
            v-for="(text, index) in content.detail"
            :key="index"
            data-aos="fade-up"
          >
            {{ text }}
          </p>
        </template>
        <template v-else-if="content.type === 'img'">
          <figure data-aos="fade-up">
            <img
              class="w-full"
              :src="`${pgwImgUrl}/article/${content.detail[0]}`"
            />
            <figcaption>{{ content.detail[1] }}</figcaption>
          </figure>
        </template>
      </template>
    </div>
  </article>
</template>
<script setup>
import { data_sdgs_aspect } from "assets/data/index.js";
import { data_prologue, data_paragraph } from "assets/data/articles.js";
const route = useRoute();
const id = +route.params.id;
const pgwImgUrl = import.meta.env.VITE_IMG_URL;
const imgUrl = import.meta.env.VITE_FOLDER + "/images";
const aspect = data_sdgs_aspect[id - 1];
const prologue = data_prologue[id - 1];
const paragraph = data_paragraph[id - 1];
const sdg_colors = [
  "#e5243b",
  "#dda63a",
  "#4c9f38",
  "#c5192d",
  "#ff3a21",
  "#26bde2",
  "#fcc30b",
  "#a21942",
  "#fd6925",
  "#dd1367",
  "#fd9d24",
  "#bf8b2e",
  "#3f7e44",
  "#0a97d9",
  "#56c02b",
  "#00689d",
  "#19486a",
];
let sdg_color = [];
aspect.label.forEach((id) => {
  sdg_color.push(sdg_colors[id - 1]);
});

onMounted(() => {
  document.querySelector(
    ".prologue-list"
  ).style.borderImage = `linear-gradient(to right, ${sdg_color.join(",")} ) 1`;
});
</script>

<style lang="scss" scoped>
@use "/assets/styles/helpers/type" as *;
@use "sass:list";

$heading: (
  "未來10年環境風險居首 台灣「怎麼做」扭轉危機？",
  "十年轉型社會更不平等？世代焦慮在蔓延 社會裂縫從哪補起"
);
$heading-s: (
  "未來10年環境風險居首\A台灣「怎麼做」扭轉危機？",
  "十年轉型社會更不平等？\A世代焦慮在蔓延 社會裂縫從哪補起"
);

.type-wrapper {
  position: relative;
  display: block;
  width: 100%;
  text-align: center;

  .typing-text {
    &::before {
      font-weight: 600;
    }
  }

  @for $i from 1 through 2 {
    .h-text-#{$i} {
      @include typed(
        list.nth($heading-s, $i),
        (
          type: 0.05,
        ),
        (
          iterations: 0,
          caret-width: 2px,
        )
      );

      @media (width >= 768px) {
        @include typed(
          list.nth($heading, $i),
          (
            type: 0.05,
          ),
          (
            iterations: 0,
            caret-width: 2px,
          )
        );
      }
    }
  }
}
</style>
