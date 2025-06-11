export const toggleLoading = () => {
  document.querySelector(".icon-symbol").classList.toggle("loading");
  document.querySelector(".loader-welcome").classList.toggle("hidden");
};

export const isMobileTouch = () => {
  // 1. 檢查 navigator 和 window 是否存在
  if (typeof navigator === "undefined" || typeof window === "undefined") return false;

  // 2. 判斷 userAgent 是否為行動裝置
  const ua = navigator.userAgent || "";
  const isMobile = /iPhone|iPad|iPod|Android/i.test(ua);

  // 3. 判斷是否支援觸控
  const isTouch = (
    "ontouchstart" in window ||
    (navigator.maxTouchPoints > 0) ||
    (navigator.msMaxTouchPoints > 0)
  );

  return isMobile && isTouch;
}


export const useShowGoal17 = () => useState("show_goal17", () => false);

export const useGoalIdx = () => useState("goal_idx", () => 0);

export const useCakeImg = () => useState("cake_img", () => 0);
