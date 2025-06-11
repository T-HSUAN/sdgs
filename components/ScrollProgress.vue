<template>
  <div class="scroll-progress-bar" :style="`width:${scrollPercent}%`"></div>
</template>
<script setup>
const scrollPercent = ref(0);
onMounted(() => {
  const progress = document.querySelector('.scroll-progress-bar');

  const updateProgress = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    scrollPercent.value = (scrollTop / windowHeight) * 100;

    progress.style.width = `${scrollPercent.value}%`;
  };

  window.addEventListener('scroll', updateProgress);
  updateProgress(); // Initial call to set the progress bar on load
});
</script>