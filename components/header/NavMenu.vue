<template>
  <header id="header">
    <div class="header-container">
      <a class="logo-link" href="https://udn.com/news/index" target="_blank" title="聯合新聞網"><img class="logo-header"
          :src="`${imgUrl}/logo1.svg`" alt="main logo : 聯合新聞網" /></a>
      <nav class="navbar" aria-label="主選單">
        <ul class="main-menu">
          <li>
            <NuxtLink class="link" to="#hero" @click="changeState('menu')">SDGs十周年</NuxtLink>
          </li>
          <li>
            <NuxtLink class="link" to="#worldwide" @click="changeState('menu')">聯合國進程</NuxtLink>
          </li>
          <li>
            <NuxtLink class="link" to="#taiwan" @click="changeState('menu')">台灣蛋糕層 +</NuxtLink>
          </li>
          <li>
            <NuxtLink class="link" to="#manuscript" @click="changeState('menu')">文稿3篇</NuxtLink>
          </li>
          <!-- <li>
            <NuxtLink class="link" to="#enterprise">永續好企業</NuxtLink>
          </li> -->
        </ul>
        <span :class="['burger', { 'menu-active': d_active }]" role="button" aria-label="下拉式目錄開關"
          @click="changeState('burger')"></span>
      </nav>
    </div>
  </header>
</template>
<script setup>
const imgUrl = import.meta.env.VITE_FOLDER + "/images";
const d_active = defineModel('d_active', { type: Boolean, default: false })
const device_d = ref(false);
const lightbox = useShowGoal17();

const changeState = (type) => {
  if (type === 'menu') {
    d_active.value = false;
  } else if (type === 'burger') {
    d_active.value = !d_active.value;
  }
  lightbox.value = false;
};

const checkWidth = () => {
  device_d.value = window.innerWidth >= 1024;
};

onMounted(() => {
  checkWidth()
  window.addEventListener('resize', checkWidth)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkWidth)
})
</script>