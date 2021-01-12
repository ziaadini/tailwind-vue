import { reactive, watchEffect, toRefs } from "vue";
export const useSwipeElement = (disabled = false) => {
  const state = reactive({
    startX: 0,
    xPosition: 0,
    isDropped: false
  });
  const onDragStart = event => {
    state.isDropped = false;
    if (event.type === "touchstart") {
      event.clientX = event.touches[0].clientX;
    }
    state.startX = event.clientX;
  };
  const onDragging = event => {
    if (event.type === "touchmove") {
      event.clientX = event.touches[0].clientX;
    }
    state.xPosition = event.clientX;
  };
  const onDragEnd = () => {
    state.isDropped = true;
    if (typeof window !== "undefined") {
      document.removeEventListener("mousemove", onDragging);
      document.removeEventListener("touchmove", onDragging);
      document.removeEventListener("mouseup", onDragEnd);
      document.removeEventListener("touchend", onDragEnd);
      document.removeEventListener("contextmenu", onDragEnd);
    }
  };
  const onButtonDown = event => {
    if (disabled) return;
    event.preventDefault();
    onDragStart(event);
    if (typeof window !== "undefined") {
      document.addEventListener("mousemove", onDragging);
      document.addEventListener("touchmove", onDragging);
      document.addEventListener("mouseup", onDragEnd);
      document.addEventListener("touchend", onDragEnd);
      document.addEventListener("contextmenu", onDragEnd);
    }
  };
  watchEffect(() => {
    toRefs(state);
    console.log("state is : ", state);
  });
  return {
    onMousedown: onButtonDown,
    onTouchstart: onButtonDown
  };
};
