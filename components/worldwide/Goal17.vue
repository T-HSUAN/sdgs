<template>
  <div class="topic-drawer" id="worldwide-goal">
    <!-- Close button -->
    <header class="topic-header sr-only">
      <h3 class="heading">
        <span class="heading-ch">全球SDGs進度表</span>
      </h3>
    </header>
    <!-- Drawer Content -->
    <div class="inline">
      <!-- Lottie Animation -->
      <div class="inline-image wwg-inline-image">
        <div class="lottie-goal17"></div>
      </div>
      <div class="inline-text wwg-items pos-relative">
        <div class="wwg-item active">
          <img
            class="heading img-drawer-heading"
            :src="`${imgUrl}/worldwide/${data[0].title_img}`"
            alt="heading"
          />
          <p>{{ data[0].content }}</p>
        </div>
        <div
          class="wwg-item"
          v-for="(item, index) in data.slice(1)"
          :key="index"
        >
          <img
            class="heading img-drawer-heading"
            :src="`${imgUrl}/worldwide/${item.title_img}`"
            alt="heading"
          />
          <p>{{ item.content }}</p>
        </div>
      </div>
    </div>

    <!-- Bottom Navigation -->
    <nav class="pagination wwg-pagination">
      <button
        class="btn btn-white btn-close wwg-close"
        @click="show_drawer = false"
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <line x1="9" y1="9" x2="29" y2="29" />
          <line x1="29" y1="9" x2="9" y2="29" />
        </svg>
      </button>
      <button class="wwg-page btn btn-gray active" @click="goToItem(0)">
        <p>1</p>
        <span>|</span>
      </button>
      <button
        class="wwg-page btn btn-gray"
        v-for="(n, index) in 16"
        :key="index + 1"
        @click="goToItem(n)"
      >
        <p>{{ n + 1 }}</p>
        <span>|</span>
      </button>
    </nav>
  </div>
</template>
<script setup>
import Lottie from "lottie-web";
import { data_sdgs_worldwide } from "assets/text/data.js";

const show_drawer = useShowGoal17();
const data = data_sdgs_worldwide;
const imgUrl = import.meta.env.VITE_FOLDER + "/images";
const content = ref(null);
const items = ref(null);

// State variables for drawer interaction
const current_idx = ref(0);
let in_trans = false;
let scroll_queue = [];

// Touch handling variables
let in_touch = false;
const touch_startX = 0;
const touch_startY = 0;
const touch_endX = 0;
const touch_endY = 0;

// Lottie animation variables
const lottie = ref(null);
const frames = [
  15, 45, 75, 105, 135, 165, 195, 225, 255, 285, 315, 345, 375, 405, 435, 465,
  495,
];

// Drawer control functions
const closeDrawer = () => {
  show_drawer.value = false;
  document.body.style.overflow = ""; // Restore background scroll

  // Reset drawer to initial state (drawer 1)
  resetDrawerState();
};

const resetDrawerState = () => {
  // Clear any pending transitions and queue
  scroll_queue = [];
  in_trans = false;

  // Reset to first drawer
  content.value[current_idx.value].classList.remove("active");
  current_idx.value = 0;
  content.value[current_idx.value].classList.add("active");

  // Update navigation items
  updateNav();
};

// const to set Lottie animation frame based on current drawer
const setLottieFrame = (itemIdx) => {
  if (lottie.value && frames[itemIdx] !== undefined) {
    // Animate to the specific frame for this drawer
    lottie.value.goToAndStop(frames[itemIdx], true);
  }
};

// const to update navigation items
const updateNav = () => {
  items.value.forEach((item, index) => {
    item.classList.toggle("active", index === current_idx.value);
  });

  // Set Lottie animation with current drawer
  setLottieFrame(current_idx.value);
};

// Process scroll queue
const processScrollQueue = () => {
  if (scroll_queue.length === 0 || in_trans) return;

  const direction = scroll_queue.shift();
  changeItem(direction);
};

// Change items
const changeItem = (direction) => {
  if (in_trans) return false;

  const new_Idx = direction > 0 ? current_idx.value + 1 : current_idx.value - 1;

  // Check boundaries
  if (new_Idx < 0 || new_Idx >= content.value.length) {
    return false;
  }

  in_trans = true;

  // Switch drawers with fast transition
  content.value[current_idx.value].classList.remove("active");
  current_idx.value = new_Idx;
  content.value[current_idx.value].classList.add("active");

  // Update navigation
  updateNav();

  // Reset transition flag after CSS transition completes
  setTimeout(() => {
    in_trans = false;
    // Process next queued scroll after a short delay
    setTimeout(processScrollQueue, 50);
  }, 200);

  return true;
};

// Go to specific item (direct navigation)
const goToItem = (target_idx) => {
  if (in_trans || target_idx === current_idx.value) return;

  // Clear queue when using direct navigation
  scroll_queue = [];

  in_trans = true;

  // Switch to specific drawer
  content.value[current_idx.value].classList.remove("active");
  current_idx.value = target_idx;
  content.value[target_idx].classList.add("active");

  // Update navigation
  updateNav();

  setTimeout(() => {
    in_trans = false;
  }, 200);
};

// Touch event handlers for mobile swipe
const handleTouchStart = (e) => {
  if (!show_drawer.value) return;

  in_touch = true;
  touch_startX = e.touches[0].clientX;
  touch_startY = e.touches[0].clientY;
};

const handleTouchMove = (e) => {
  if (!show_drawer.value || !in_touch) return;

  // Prevent default scroll behavior during touch
  e.preventDefault();
};

const handleTouchEnd = (e) => {
  if (!show_drawer.value || !in_touch) return;

  in_touch = false;
  touch_endX = e.changedTouches[0].clientX;
  touch_endY = e.changedTouches[0].clientY;

  handleSwipe();
};

const handleSwipe = () => {
  const deltaX = touch_endX - touch_startX;
  const deltaY = touch_endY - touch_startY;
  const minSwipeDist = 50; // Minimum distance for a swipe
  const maxCrossAxisDist = 100; // Maximum cross-axis movement for primary swipe

  // Determine if this is primarily horizontal or vertical swipe
  const horiz_swipe = Math.abs(deltaX) > Math.abs(deltaY);

  if (
    horiz_swipe &&
    Math.abs(deltaX) > minSwipeDist &&
    Math.abs(deltaY) < maxCrossAxisDist
  ) {
    // Horizontal swipe - change drawers
    const direction = deltaX > 0 ? -1 : 1; // Swipe right = previous drawer, swipe left = next drawer
    changeItem_Swipe(direction);
  } else if (
    !horiz_swipe &&
    Math.abs(deltaY) > minSwipeDist &&
    Math.abs(deltaX) < maxCrossAxisDist
  ) {
    // Vertical swipe - also change drawers (better mobile UX)
    const direction = deltaY > 0 ? -1 : 1; // Swipe down = previous drawer, swipe up = next drawer
    changeItem_Swipe(direction);
  }
};

const changeItem_Swipe = (direction) => {
  // Check boundaries before processing
  const newIdx = direction > 0 ? current_idx.value + 1 : current_idx.value - 1;

  if (newIdx >= 0 && newIdx < content.value.length) {
    // Within bounds, change drawer
    const drawer_changed = changeItem(direction);

    if (!drawer_changed && !in_trans) {
      // Add to queue if couldn't change immediately
      if (scroll_queue.length < 3) {
        scroll_queue.push(direction);
      }
    }
  }
};

// Wheel handler for drawer
const handleDrawerWheel = (e) => {
  // Only handle wheel events when drawer is open
  if (!show_drawer.value) return;

  const direction = e.deltaY > 0 ? 1 : -1;

  // Check if we're at boundaries first
  const newIdx = direction > 0 ? current_idx.value + 1 : current_idx.value - 1;

  if (newIdx < 0 || newIdx >= content.value.length) {
    // At boundary - prevent scrolling out of drawer
    e.preventDefault();
    e.stopPropagation();
    return;
  }

  // Prevent default scroll
  e.preventDefault();
  e.stopPropagation();

  // Try to change drawer immediately
  const drawer_changed = changeItem(direction);

  if (!drawer_changed && !in_trans) {
    // If drawer didn't change and we're not transitioning, add to queue
    if (scroll_queue.length < 3) {
      // Limit queue size to prevent excessive queuing
      scroll_queue.push(direction);
    }
  }
};

// Drawer switching with navigation
nextTick(() => {
  content.value = document.querySelectorAll(".wwg-items .wwg-item");
  items.value = document.querySelectorAll(".wwg-pagination .wwg-page");

  // Initialize: show first drawer
  content.value[0].classList.add("active");

  // Close drawer with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && show_drawer.value) {
      closeDrawer();
    }
  });

  // Add global event listeners for drawer interactions
  document.addEventListener("wheel", handleDrawerWheel, { passive: false });
  document.addEventListener("touch_start", handleTouchStart, {
    passive: false,
  });
  document.addEventListener("touchmove", handleTouchMove, { passive: false });
  document.addEventListener("touch_end", handleTouchEnd, { passive: false });

  // Close drawer on any scroll when drawer is open (simpler approach)
  // window.addEventListener("scroll", () => {
  //   const scrollTimeout = ref(null);
  //   if (show_drawer.value) {
  //     // Debounce scroll events to avoid excessive calls
  //     clearTimeout(scrollTimeout.value);
  //     scrollTimeout.value = setTimeout(() => {
  //       closeDrawer();
  //     }, 100);
  //   }
  // });
});

watch(show_drawer, (newValue) => {
  if (newValue) {
    document.body.style.overflow = "hidden"; // Prevent background scroll
    // Initialize Lottie animation
    const initLottie = () => {
      lottie.value = Lottie.loadAnimation({
        container: document.querySelector(".lottie-goal17"),
        renderer: "svg",
        loop: false,
        autoplay: false,
        path: "/images/worldwide/goal17.json",
      });

      // Go to first frame when loaded
      lottie.value.addEventListener("DOMLoaded", () => {
        lottie.value.goToAndStop(frames[0], true);
      });
    };
    // Initialize Lottie animation when drawer opens
    if (!lottie.value) {
      initLottie();
    }
  } else {
    // Close drawer - reset state
    resetDrawerState();
    document.body.style.overflow = ""; // Restore background scroll
  }
});
</script>
