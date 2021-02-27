import { useIsScrolling } from "./isScrolling";
import { onUnmounted, watch, watchEffect } from "vue";
import { ref } from "vue";
export enum visibilityOverflow {
  right = "right",
  left = "left",
  top = "top",
  bottom = "bottom",
}

let isScrolling = null as any;
let scrollDestroyed = null as any;
let destroyScroll = null as any;

let observersCount = 0;
export const useIsVisible = (
  element = ref(null as any),
  parentElement = ref(null as any)
) => {
  observersCount++;

  const isOpen = ref(false);
  const placement = ref(null as null | visibilityOverflow[]);
  if (isScrolling === null) {
    const scrollInstance = useIsScrolling();
    isScrolling = scrollInstance.result;
    scrollInstance.initiateScroll();
    destroyScroll = scrollInstance.destroyScroll;
    scrollDestroyed = scrollInstance.scrollDestroyed;
  }

  const handlePlacement = () => {
    if (!isOpen.value) return;

    const childBounding = element.value!.getBoundingClientRect();
    const parentBounding = parentElement.value!.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const placementTemporaryValue = [] as visibilityOverflow[] | null;
    const childWidth = childBounding.width;
    const childHeight = childBounding.height;
    if (parentBounding.top > childHeight) {
      placementTemporaryValue!.push(visibilityOverflow.top);
    }
    if (parentBounding.right > childWidth) {
      placementTemporaryValue!.push(visibilityOverflow.right);
    }
    if (parentBounding.left > childWidth) {
      placementTemporaryValue!.push(visibilityOverflow.left);
    }
    if (windowHeight - parentBounding.bottom > childHeight) {
      placementTemporaryValue!.push(visibilityOverflow.bottom);
    }

    if (placementTemporaryValue?.length) {
      placement.value = placementTemporaryValue;
    } else {
      placement.value = [
        visibilityOverflow.bottom,
        visibilityOverflow.left,
        visibilityOverflow.right,
        visibilityOverflow.top,
      ];
    }

  };

  watch(isScrolling, (resultValue) => {
    handlePlacement();
  });

  onUnmounted(() => {
    observersCount--;
    if (observersCount === 0) {
      destroyScroll();
      isScrolling = null;
    }
  });
  watch(scrollDestroyed, () => {
    observersCount = 0;
    isScrolling = null;
  });
  return {
    element,
    placement,
    parentElement,
    handlePlacement,
    isOpen,
  };
};
