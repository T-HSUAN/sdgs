<template lang="pug">
TresCanvas.bg-main
  TresGroup(ref="sceneRef")
    //- 動態生成積木
    TresMesh(
      v-for="(block, index) in blocks",
      :key="index",
      :position="block.position",
      :rotation-y="block.rotation",
      :visible="isVisible(block.angle)",
      :frustumCulled="true"
    )
      RoundedBox(:args="[4 * scaleFactor, 300, 500 * scaleFactor, 5, 50]")
        TresShaderMaterial(
          :uniforms="getUniforms(block.color)",
          :fragmentShader="fragmentShader",
          :vertexShader="vertexShader",
          :transparent="true",
          :opacity="block.opacity"
        )

  //- 相機設定
  TresPerspectiveCamera(:position="[0, 0, 1200]")
</template>
<script setup>
import { Color } from "three";

const totalBlocks = 17; // 總積木數量
const radius = 480; // 圓形半徑
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

// 建立 shader uniforms
const getUniforms = (colorHex) => ({
  topColor: { value: new Color(colorHex) },
  opacity: { value: 0.8 },
});

// Vertex Shader 程式碼
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`;

// Fragment Shader 程式碼
const fragmentShader = `
  uniform vec3 topColor;
  uniform float opacity;
  varying vec2 vUv;
  varying vec3 vNormal;

  const vec3 lightDir1 = normalize(vec3(1.0, 1.0, 8.0));
  const vec3 lightDir2 = normalize(vec3(-1.0, -1.0, 8.0));

  void main() {
    float diff1 = max(dot(vNormal, lightDir1), 0.0);
    float diff2 = max(dot(vNormal, lightDir2), 0.0);
    float brightness = (diff1 + diff2) * 0.7 + 0.5;

    vec3 baseColor = mix(vec3(0.0), topColor, 0.5 + vUv.y);
    vec3 finalColor = baseColor * brightness;

    gl_FragColor = vec4(finalColor, opacity);
  }`;

// 建立積木資料
const blocks = ref([]);
for (let i = 0; i < totalBlocks; i++) {
  const angle = ((2 * Math.PI) / totalBlocks) * i;
  blocks.value.push({
    color: colors[i],
    opacity: 0.9,
    position: [radius * Math.cos(angle), 0, radius * Math.sin(angle)],
    rotation: Math.PI / 2 - angle,
    angle,
  });
}

// 計算積木是否在視角內
const sceneRef = ref(null);
const isVisible = (angle) => {
  const sceneRotation = sceneRef.value?.rotation.y || 0;

  let adjustedAngle = (angle - sceneRotation + Math.PI * 2) % (Math.PI * 2);

  const minAngle = (20 * Math.PI) / 180;
  const maxAngle = (160 * Math.PI) / 180;
  //26.5° ~ 153.5°
  return adjustedAngle >= minAngle && adjustedAngle <= maxAngle;
};

// 圖形旋轉動畫
const { onLoop } = useRenderLoop();
const rotationSpeed = ref(0.003);

onLoop(() => {
  if (sceneRef.value) {
    sceneRef.value.rotation.y =
      (sceneRef.value.rotation.y + rotationSpeed.value) % (Math.PI * 2); // 限制角度在0到2π之間
  }
});

// 螢幕比例計算
const scaleFactor = ref(1);
const updateScaleFactor = () => {
  scaleFactor.value = window.innerWidth / 1920; // 基準寬度為$desk-max
};

onMounted(() => {
  updateScaleFactor();
  window.addEventListener("resize", updateScaleFactor);
});

onUnmounted(() => {
  window.removeEventListener("resize", updateScaleFactor);
});
</script>

<style scoped lang="scss">
.bg-main {
  position: relative !important;
  width: clamp($tab-min, 90%, $desk-max) !important;
  height: clamp(432px, 100vh, 1080px) !important;
  margin: 0 auto !important;
}
</style>