export const toggleLoading = () => {
  document.querySelector(".icon-symbol").classList.toggle("loading");
  document.querySelector(".loader-welcome").classList.toggle("hidden");
};

export const useShowGoal17 = () => useState("show_goal17", () => false);

export const useGoalIdx = () => useState("goal_idx", () => 0);

export const useCakeImg = () => useState("cake_img", () => 0);
