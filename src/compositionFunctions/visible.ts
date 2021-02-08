import { useIsScrolling } from "./isScrolling";
import { onMounted, onUnmounted, watch, watchEffect } from "vue";
import { ref } from "vue";
import { useIntersectElement } from "./intersect";
export enum visibilityOverflow {
  right = "right",
  left = "left",
  top = "top",
  bottom = "bottom",
}

let isScrolling = null as any;
let destroyScroll = null as any;

let observersCount = 0;
export const useIsVisible = (
  element = ref(null as any),
  parentElement = ref(null as any)
) => {
  observersCount++

  const result = ref(null as any);
  const placement = ref(null as null | visibilityOverflow[]);
  if (!isScrolling) {
    const scrollInstance = useIsScrolling();
    isScrolling = scrollInstance.result;
    scrollInstance.initiateScroll();
    destroyScroll = scrollInstance.destroyScroll;
  }
  
  const handlePlacement = () => {
    const childBounding = element.value!.getBoundingClientRect();
    const parentBounding = parentElement.value!.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const placementTemporaryValue = [] as visibilityOverflow[] | null;
    if (childBounding.top >= 0) {
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
    observersCount--
    if (observersCount === 0) {
      destroyScroll();
    }
  });
  return {
    element,
    placement,
    parentElement,
  };
};
