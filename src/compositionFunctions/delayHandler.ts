import { delayType } from "./../utility/css-helper";
import { computed } from "vue";

export const useDelayHandler = (
  type: delayType,
  animationDelay,
  isOpened,
  isClosed
) => {
  const getAnimationDelay = computed(() => {
    if (
      type === delayType.both ||
      (type === delayType.open && isOpened.value) ||
      (type === delayType.close && isClosed.value)
    ) {
      return `delay-${animationDelay}`;
    }
    return "";
  });

  return {
    getAnimationDelay
  };
};
