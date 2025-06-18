<template>
  <article class="article">
    <div class="hero">
      <div class="article-header">
        <img class="img-aspect" :src="`${imgUrl}/taiwan/cake${prologue.aspect}.webp`">
        <h2>{{ prologue.title }}</h2>
        <div class="article-labels">
          <img class="img-article-label" :src="`${pgwImgUrl}/sdgs/label${no}.jpg`" v-for="(no, index) in aspect.label"
            :key="index">
        </div>
      </div>
      <div class="guidance-scroll pos-relative h-sp10 h-xs-sp15">
        <p class="text-s fc-prompt">scroll</p>
        <span class="icon-line--anim"></span>
      </div>
    </div>
    <div class="prologue">
      <ul class="prologue-list">
        <li>
          <h3 class="prologue-heading">你必須要知道的事情<img class="mx-sp1" :src="`${imgUrl}/article/icon-list.svg`"></h3>
        </li>
        <li v-for="(item, index) in prologue.list" :key="index" :value="index + 1">{{ item }}</li>
      </ul>
      <p>{{ prologue.abstract }}</p>
    </div>
    <div class="paragraph" v-for="(item, index) in paragraph" :key="index">
      <div class="paragraph-header">
        <h3 class="paragraph-heading" v-html="item.heading"></h3>
        <div class="article-labels"><img class="img-article-label" :src="`${pgwImgUrl}/sdgs/label${no}.jpg`"
            v-for="(no, index) in item.label" :key="index">
        </div>
      </div>

      <template v-for="(content, idx) in item.content" :key="idx">
        <template v-if="content.type === 'text'">
          <p class="my-sp3 my-xl-sp6" v-for="(text, i) in content.detail" :key="i">{{ text }}</p>
        </template>
        <template v-else-if="content.type === 'img'">
          <figure>
            <img class="w-full" :src="`${pgwImgUrl}/article/${content.detail[0]}`" />
            <figcaption>{{ content.detail[1] }}</figcaption>
          </figure>
        </template>
      </template>
    </div>
  </article>
</template>
<script setup>
import { data_sdgs_aspect } from "assets/text/index.js";
import { data_prologue, data_paragraph } from 'assets/text/articles.js';
const route = useRoute();
const id = +route.params.id;
const pgwImgUrl = import.meta.env.VITE_IMG_URL;
const imgUrl = import.meta.env.VITE_FOLDER + "/images";
const aspect = data_sdgs_aspect[id - 1];
const prologue = data_prologue[id - 1];
const paragraph = data_paragraph[id - 1];
</script>