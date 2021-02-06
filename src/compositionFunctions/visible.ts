import { onMounted, onUnmounted, watch } from "vue";
import { ref } from "vue";
import { useIntersectElement } from "./intersect";
export enum visibilityOverflow {
  right = "right",
  left = "left",
  top = "top",
  bottom = "bottom",
}
export const useIsVisible = (element = ref(null as any)) => {
  const result = ref(null as any);
  const placement = ref(null as any);
  const { isIntersecting, destroyObserver } = useIntersectElement(
    {
      passRef: true,
      threshold: [...Array(100).keys()].map((x) => x / 100),
    },
    (entry) => {
      result.value = entry;
    },
    element
  );
  const handlePlacement = () => {
    const bounding = result.value!.boundingClientRect;
    if (bounding.top >= 0) {
      const windowWidth =
        window.innerWidth || document.documentElement.clientWidth;
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight;
      if (bounding.right > windowWidth) {
        placement.value = {
          type: visibilityOverflow.right,
          px: windowWidth - bounding.right,
        };
      } else if (bounding.left < 0) {
        placement.value = {
          type: visibilityOverflow.left,
          px: bounding.left - windowHeight,
        };
      } else if (bounding.bottom > windowHeight) {
        placement.value = {
          type: visibilityOverflow.bottom,
          px: bounding.bottom - windowHeight,
        };
      } else {
        placement.value = null;
      }
    }
  };
  watch(result, (resultValue) => {
    if (resultValue && isIntersecting?.value) {
      handlePlacement();
    }
    else {
        placement.value = null
    }
  });

  onUnmounted(() => {
    destroyObserver();
  });
  return {
    element,
    placement,
  };
};
