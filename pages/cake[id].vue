<template>
  <section class="inpage">
    <div class="inpage-header">
      <h2 class="heading sr-only">{{ data[id].title }}</h2>
      <picture>
        <source :srcset="`/images/sdgs/title${id}-d.png`" media="(min-width: 1024px)" type="image/png" />

        <source :srcset="`/images/sdgs/title${id}-t.png`" media="(min-width: 768px)" type="image/png" />
        <source :srcset="`/images/sdgs/title${id}-m.png`" type="image/png" />
        <img class="heading img-inpage-heading" :src="`/images/sdgs/title${id}-d.png`" :alt="`sdg${id} title`" />
      </picture>
    </div>
    <div class="inline inpage-inline">
      <div class="inline-text">
        <h3>{{ data[id - 1].heading }}</h3>
        <p v-for="(p, index) in data[id - 1].content" :key="index">{{ p }}</p>
      </div>
      <div class="inline-image">
        <img class="img-sdg d" :src="`/images/sdgs/target${id}-${no}-d.png`" :alt="`sdg${id} target`"
          v-for="(no, index) in data[id - 1].img_count.d" :key="index" />
        <picture v-for="(no, index) in data[id - 1].img_count.tm" :key="index">
          <source :srcset="`/images/sdgs/target${id}-${no}-t.png`" media="(min-width: 768px) and (max-width: 1023px)"
            type="image/png" />
          <source :srcset="`/images/sdgs/target${id}-${no}-m.png`" media="(max-width: 767px)" type="image/png" />
          <img class="img-sdg tm" :src="`/images/sdgs/target${id}-${no}-t.png`" :alt="`sdg${id} target`" />
        </picture>
      </div>
      <p class="note">數據來源／{{ data[id].note }}<br /></p>
    </div>
  </section>
</template>
<script setup>
import { data_sdgs_twcake } from "assets/text/data-cakes.js";
const route = useRoute();
const id = +route.params.id;
const data = data_sdgs_twcake;
</script>
