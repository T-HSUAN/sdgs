<template>
  <div class="main-visual">
    <TresCanvas clear-color="black" shadows window-size>
      <TresPerspectiveCamera :position="[0, 0, 10]" :look-at="[0, 0, 0]" />
      <OrbitControls />
      <TresAmbientLight :intensity="2" />
      <TresDirectionalLight
        :position="[0, 0, 5]"
        color="white"
        :intensity="1"
      />
      <TresGroup ref="groupRef">
        <RoundedBox
          v-for="(block, index) in blocks"
          :key="index"
          :args="[0.1, 2, 3.5]"
          :position="block.position"
          :rotation-y="block.rotation"
        >
          <TresMeshToonMaterial
            :color="block.color"
            :transparent="true"
            :opacity="0.9"
          />
        </RoundedBox>
      </TresGroup>
    </TresCanvas>
  </div>
</template>

<script setup>
const blocks = ref([]);
const numBlocks = 17;
const radius = 5;
const colors = [
  "#E5243B",
  "#DDA63A",
  "#4C9F38",
  "#C5192D",
  "#FF3A21",
  "#26BDE2",
  "#FCC30B",
  "#A21942",
  "#FD6925",
  "#DD1367",
  "#FD9D24",
  "#BF8B2E",
  "#3F7E44",
  "#0A97D9",
  "#56C02B",
  "#00689D",
  "#19486A",
];

for (let i = 0; i < numBlocks; i++) {
  const angle = (i / numBlocks) * Math.PI * 2;
  blocks.value.push({
    position: [Math.cos(angle) * radius, 0, Math.sin(angle) * radius],
    rotation: Math.PI / 2 - angle,
    color: colors[i],
  });
}

const { onLoop } = useRenderLoop();
const groupRef = ref(null);

onLoop(() => {
  if (groupRef.value) {
    groupRef.value.rotation.y += 0.0002;
  }
});
</script>
<style lang="scss" scoped>
.main-visual {
  position: absolute;
  top: 0;
  display: flex;
  justify-content: center;
  width: 100%;
  text-align: center;
  z-index: -1;
}

canvas {
  position: relative !important;
  width: 90% !important;
  height: 100vh !important;
}
</style>