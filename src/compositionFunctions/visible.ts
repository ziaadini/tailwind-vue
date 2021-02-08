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
export const useIsVisible = (
  element = ref(null as any),
  parentElement = ref(null as any),
) => {
  const result = ref(null as any);
  const placement = ref(null as null | visibilityOverflow[]);
  const {
    initiateScroll,
    destroyScroll,
    result: isScrolling,
  } = useIsScrolling();

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
      placement.value = [visibilityOverflow.bottom, visibilityOverflow.left, visibilityOverflow.right, visibilityOverflow.top];
    }
  };

  watchEffect(() => {
    if (isIntersecting?.value) {
      initiateScroll();
    } else {
      destroyScroll();
    }
  });

  watch(isScrolling, (resultValue) => {
    handlePlacement();
  });

  onUnmounted(() => {
    destroyObserver();
  });
  return {
    element,
    placement,
    parentElement,
  };
};
