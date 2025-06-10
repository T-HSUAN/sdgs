<template>
  <div class="topic-drawer" id="worldwide-goal">
    <div class="drawer-content">
      <!-- Close button -->
      <button class="close-drawer-btn" id="closeDrawerBtn">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      </button>
      <header class="topic-header sr-only">
        <h3 class="heading">
          <span class="heading-ch">全球SDGs進度表</span>
        </h3>
      </header>
      <!-- Drawer Content -->
      <div class="inline">
        <!-- Lottie Animation -->
        <div class="inline-image wwg-inline-image">
          <canvas class="lottie-goal17"></canvas>
        </div>
        <div class="inline-text wwg-items pos-relative">
          <div class="wwg-item active">
            <img class="heading img-drawer-heading" :src="`${imgUrl}/worldwide/${data[0].title_img}`" alt="heading" />
            <p>{{ data[0].content }}</p>
          </div>
          <div class="wwg-item" v-for="(item, index) in data.slice(1)" :key="index">
            <img class="heading img-drawer-heading" :src="`${imgUrl}/worldwide/${item.title_img}`" alt="heading" />
            <p>{{ item.content }}</p>
          </div>
        </div>

      </div>

      <!-- Bottom Navigation -->
      <nav class="pagination wwg-pagination">
        <button class="btn btn-white btn-close wwg-close" @click="show_drawer = false">
          ╳
        </button>
        <p class="wwg-page active" data-item="0">1</p>
        <p class="wwg-page btn btn-gray" :data-item="n" v-for="(n, index) in 16" :key="index">{{ n + 1 }}</p>
      </nav>
    </div>
  </div>
</template>
<script setup>
import { loadAnimation } from 'lottie-web';
import { gsap } from "gsap";
import { data_sdgs_worldwide } from "assets/text/data.js";

const show_drawer = useShowGoal17();
const data = data_sdgs_worldwide;
const imgUrl = import.meta.env.VITE_FOLDER + "/images";
const current_idx = ref(0);
const content = ref(null);
const items = ref(null);

const transitioning = ref(false);
const scrollQueue = [];
const scrollTimeout = ref(null);

// Touch handling variables
const touch_startX = ref(0);
const touch_startY = ref(0);
const touch_endX = ref(0);
const touch_endY = ref(0);
const touching = ref(false);

// Lottie animation variables
const lottie = ref(null);
const frames = [15, 45, 75, 105, 135,
  165, 195, 225, 255, 285, 315, 345, 375, 405, 435, 465, 495
];


// Drawer control functions
const closeDrawer = () => {
  show_drawer.value = false;
  document.body.style.overflow = ''; // Restore background scroll

  // Reset drawer to initial state (drawer 1)
  resetDrawerState();
}

const resetDrawerState = () => {
  // Clear any pending transitions and queue
  scrollQueue.value = [];
  transitioning.value = false;

  // Reset to first drawer
  content.value[current_idx.value].classList.remove('active');
  current_idx.value = 0;
  content.value[current_idx.value].classList.add('active');

  // Update navigation items
  updateNav();
}


// const to set Lottie animation frame based on current drawer
const setLottieFrame = (itemIdx) => {
  if (lottie.value && frames[itemIdx] !== undefined) {
    // Animate to the specific frame for this drawer
    lottie.value.goToAndStop(frames[itemIdx], true);
  }
}

// const to update navigation items
const updateNav = () => {
  items.value.forEach((item, index) => {
    item.classList.toggle('active', index === current_idx.value);
  });

  // Set Lottie animation with current drawer
  setLottieFrame(current_idx.value);
}

// const to process scroll queue
const processScrollQueue = () => {
  if (scrollQueue.length === 0 || transitioning.value) return;

  const direction = scrollQueue.shift();
  changeDrawer(direction);
}

// const to change drawers
const changeDrawer = (direction) => {
  if (transitioning.value) return false;

  const newIdx = direction > 0 ? current_idx.value + 1 : current_idx.value - 1;

  // Check boundaries
  if (newIdx < 0 || newIdx >= content.value.length) {
    return false;
  }

  transitioning.value = true;

  // Switch drawers with fast transition
  content.value[current_idx.value].classList.remove('active');
  current_idx.value = newIdx;
  content.value[current_idx.value].classList.add('active');

  // Update navigation
  updateNav();

  // Reset transition flag after CSS transition completes
  setTimeout(() => {
    transitioning.value = false;
    // Process next queued scroll after a short delay
    setTimeout(processScrollQueue, 50);
  }, 200);

  return true;
}

// const to go to specific item (direct navigation)
const goToItem = (itemIdx) => {
  if (transitioning.value || itemIdx === current_idx.value) return;

  // Clear queue when using direct navigation
  scrollQueue.value = [];

  transitioning.value = true;

  // Switch to specific drawer
  content.value[current_idx.value].classList.remove('active');
  current_idx.value = itemIdx;
  content.value[current_idx.value].classList.add('active');

  // Update navigation
  updateNav();

  setTimeout(() => {
    transitioning.value = false;
  }, 200);
}


// Touch event handlers for mobile swipe
const handleTouch_start = (e) => {
  if (!show_drawer.value) return;

  touching.value = true;
  touch_startX.value = e.touch_es[0].clientX;
  touch_startY.value = e.touch_es[0].clientY;
}

const handleTouchMove = (e) => {
  if (!show_drawer.value || !touching.value) return;

  // Prevent default scroll behavior during touch
  e.preventDefault();
}

const handleTouch_end = (e) => {
  if (!show_drawer.value || !touching.value) return;

  touching.value = false;
  touch_endX.value = e.changedTouch_es[0].clientX;
  touch_endY.value = e.changedTouch_es[0].clientY;

  handleSwipe();
}

const handleSwipe = () => {
  const deltaX = touch_endX.value - touch_startX.value;
  const deltaY = touch_endY.value - touch_startY.value;
  const minSwipeDistance = 50; // Minimum distance for a swipe
  const maxCrossAxisDistance = 100; // Maximum cross-axis movement for primary swipe

  // Determine if this is primarily horizontal or vertical swipe
  const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY);

  if (isHorizontalSwipe && Math.abs(deltaX) > minSwipeDistance && Math.abs(deltaY) < maxCrossAxisDistance) {
    // Horizontal swipe - change drawers
    const direction = deltaX > 0 ? -1 : 1; // Swipe right = previous drawer, swipe left = next drawer
    changeDrawerWithSwipe(direction);

  } else if (!isHorizontalSwipe && Math.abs(deltaY) > minSwipeDistance && Math.abs(deltaX) < maxCrossAxisDistance) {
    // Vertical swipe - also change drawers (better mobile UX)
    const direction = deltaY > 0 ? -1 : 1; // Swipe down = previous drawer, swipe up = next drawer
    changeDrawerWithSwipe(direction);
  }
}

const changeDrawerWithSwipe = (direction) => {
  // Check boundaries before processing
  const wouldBeNewIdx = direction > 0 ? current_idx.value + 1 : current_idx.value - 1;

  if (wouldBeNewIdx >= 0 && wouldBeNewIdx < content.value.length) {
    // Within bounds, change drawer
    const drawerChanged = changeDrawer(direction);

    if (!drawerChanged && !transitioning.value) {
      // Add to queue if couldn't change immediately
      if (scrollQueue.length < 3) {
        scrollQueue.push(direction);
      }
    }
  }
}


// Wheel handler for drawer
const handleDrawerWheel = (e) => {
  // Only handle wheel events when drawer is open
  if (!show_drawer.value) return;

  const direction = e.deltaY > 0 ? 1 : -1;

  // Check if we're at boundaries first
  const wouldBeNewIdx = direction > 0 ? current_idx.value + 1 : current_idx.value - 1;

  if (wouldBeNewIdx < 0 || wouldBeNewIdx >= content.value.length) {
    // At boundary - prevent scrolling out of drawer
    e.preventDefault();
    e.stopPropagation();
    return;
  }

  // Prevent default scroll
  e.preventDefault();
  e.stopPropagation();

  // Try to change drawer immediately
  const drawerChanged = changeDrawer(direction);

  if (!drawerChanged && !transitioning.value) {
    // If drawer didn't change and we're not transitioning.value, add to queue
    if (scrollQueue.length < 3) { // Limit queue size to prevent excessive queuing
      scrollQueue.push(direction);
    }
  }
}

// Drawer switching with navigation
nextTick(() => {
  content.value = document.querySelectorAll('.wwg-items .wwg-item');
  let closeDrawerBtn = document.getElementById('closeDrawerBtn');

  items.value = document.querySelectorAll('.wwg-pagination .wwg-page');

  // Initialize: show first drawer
  content.value[0].classList.add('active');

  // Close drawer with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && show_drawer.value) {
      closeDrawer();
    }
  });

  // Add global event listeners for drawer interactions
  document.addEventListener('wheel', handleDrawerWheel, { passive: false });
  document.addEventListener('touch_start', handleTouch_start, { passive: false });
  document.addEventListener('touchmove', handleTouchMove, { passive: false });
  document.addEventListener('touch_end', handleTouch_end, { passive: false });

  // Close drawer on any scroll when drawer is open (simpler approach)
  window.addEventListener('scroll', () => {
    if (show_drawer.value) {
      // Debounce scroll events to avoid excessive calls
      clearTimeout(scrollTimeout.value);
      scrollTimeout.value = setTimeout(() => {
        closeDrawer();
      }, 100);
    }
  });

  // Add click handlers for navigation dots
  items.value.forEach((item, index) => {
    item.addEventListener('click', () => {
      goToItem(index);
    });
  });
});

watch(show_drawer, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'; // Prevent background scroll
    // Initialize Lottie animation
    const initLottie = () => {
      lottie.value = loadAnimation({
        container: document.getElementById('lottie-goal17'),
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: '/images/worldwide/goal17.json'
      });

      // Go to first frame when loaded
      lottie.value.addEventListener('DOMLoaded', () => {
        lottie.value.goToAndStop(frames[0], true);
      });
    }
    // Initialize Lottie animation when drawer opens
    if (!lottie.value) {
      initLottie();
    }
  } else {
    // Close drawer - reset state
    resetDrawerState();
    document.body.style.overflow = ''; // Restore background scroll
  }
});
</script>