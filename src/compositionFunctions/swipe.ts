import {
  reactive,
  computed,
  watch,
  onMounted,
  onUnmounted,
  watchEffect
} from "vue";
export const useSwipeElement = (disabled = false) => {
  const state = reactive({
    xStart: 0,
    xPosition: 0,
    yStart: 0,
    yPosition: 0,
    isDropped: false,
    isTouching: false
  });
  let initialFlag = true;
  let xStart = 0;
  let xPosition = 0;
  let yStart = 0;
  let yPosition = 0;
  const onDragStart = event => {
    state.isTouching = true;
    state.isDropped = false;
    if (event.type === "touchstart") {
      event.clientX = event.touches[0].clientX;
      event.clientY = event.touches[0].clientY;
    }
    state.xPosition = event.clientX;
    state.yPosition = event.clientY;
    state.xStart = event.clientX;
    state.yStart = event.clientY;

    if (initialFlag) {
      initialFlag = false;
      xPosition = event.clientX;
      yPosition = event.clientY;
      xStart = event.clientX;
      yStart = event.clientY;
    }
  };
  const reset = () => {
    state.xPosition = xPosition;
    state.yPosition = yPosition;
    state.xStart = xStart;
    state.yStart = yStart;
  };
  const resize = () => {
    initialFlag = true;
  };
  onMounted(() => {
    window.addEventListener("resize", resize);
  });
  onUnmounted(() => {
    window.removeEventListener("resize", resize);
  });
  const onDragging = event => {
    if (event.type === "touchmove") {
      event.clientX = event.touches[0].clientX;
      event.clientY = event.touches[0].clientY;
    }
    state.xPosition = event.clientX;
    state.yPosition = event.clientY;
  };
  const onDragEnd = () => {
    state.isTouching = false;
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
  const yDiff = computed(() => state.yPosition - state.yStart);
  const xDiff = computed(() => state.xPosition - state.xStart);
  // watchEffect(() => {
  //   console.log("YYYYYYYYYYYYY");
  //   console.log("yDiff is : ", yDiff.value);
  //   console.log("yStart : ", state.yStart);
  //   console.log("yPosition : ", state.yPosition);
  //
  //   console.log("XXXXXXXXXXXXX");
  //   console.log("xDiff is : ", xDiff.value);
  //   console.log("xStart : ", state.xStart);
  //   console.log("xPosition : ", state.xPosition);
  // });
  return {
    bind: {
      onMousedown: onButtonDown,
      onTouchstart: onButtonDown
    },
    state,
    xDiff,
    yDiff,
    reset
  };
};

export const useSwipeDownToClose = (close, threshold = 80, max = 180) => {
  const { bind: swipeEvents, yDiff, state, reset } = useSwipeElement();

  watch(
    () => state.isDropped,
    () => {
      if (yDiff.value > threshold) {
        close();
      }
      reset();
    }
  );
  const swipeY = computed(() => {
    if (yDiff.value > 0) {
      return yDiff.value > max ? max : yDiff.value;
    } else {
      return 0;
    }
  });
  watchEffect(() => {
    if (yDiff.value >= max) {
      close();
    }
  });
  return { swipeEvents, swipeY, isTouching: computed(() => state.isTouching) };
};
