<template>
  <section class="inpage">
    <div class="inpage-header">
      <h2 class="heading sr-only">{{ data[id].title }}</h2>
      <picture>
        <source
          :srcset="`/images/sdgs/title${id}-d.png`"
          media="(min-width: 1024px)"
          type="image/png"
        />

        <source
          :srcset="`/images/sdgs/title${id}-t.png`"
          media="(min-width: 768px)"
          type="image/png"
        />
        <source :srcset="`/images/sdgs/title${id}-m.png`" type="image/png" />
        <img
          class="heading img-inpage-heading"
          :src="`/images/sdgs/title${id}-d.png`"
          :alt="`sdg${id} title`"
        />
      </picture>
    </div>
    <div class="inline inpage-inline">
      <div class="inline-text">
        <h3>完備減緩調適行動以因應氣候變遷及其影響</h3>
        <p>
          全球溫室氣體排放量不減反升，各國紛紛加速減碳，全球碳排第35名的台灣也責無旁貸。2023年《氣候變遷因應法》正式上路，明訂2050年達成淨零排放，並規劃分階段的減碳藍圖。從數據來看，2020年溫室氣體淨排放為263.226百萬公噸二氧化碳當量（MtCO₂e），較基準年下降1.88%，2022年僅略減1.77%，2023年則減少4.64%，距離第二期「減量10%」仍有落差。
        </p>
        <p>
          面對氣候危機，也得練好「調適」基本功。政府從教育扎根，推動學校開設永續發展課程，強化地方防災教育自主能力，並透過「低碳永續家園評等推動計畫」建立社區永續網絡。
        </p>
        <p>「氣候行動」是場與時間賽跑的挑戰，台灣還得加快腳步。</p>
      </div>
      <div class="inline-image">
        <picture v-for="(no, index) in data[id - 1].content_d" :key="index">
          <source
            :srcset="`/images/sdgs/target${id}-${no}-d.png`"
            media="(min-width: 1024px)"
            type="image/png"
          />
          <source
            :srcset="`/images/sdgs/target${id}-${no}-t.png`"
            media="(min-width: 768px)"
            type="image/png"
          />
          <source
            :srcset="`/images/sdgs/target${id}-${no}-m.png`"
            type="image/png"
          />
          <img
            class="img-sdg"
            :src="`/images/sdgs/target${id}-${no}-d.png`"
            :alt="`sdg${id} target`"
          />
        </picture>
      </div>
      <p class="note">
        數據來源／行政院國家永續發展委員會年度檢討報告、2025年中華民國國家溫室氣體排放清冊報告
      </p>
    </div>
  </section>
</template>
<script setup>
import { data_sdgs_twcake } from "assets/text/data-cakes.js";
const route = useRoute();
const id = +route.params.id;
const data = data_sdgs_twcake;
</script>