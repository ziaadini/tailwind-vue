import { computed, watch } from "vue";
import { useSwipeElement } from "@/compositionFunctions/swipe";

export const useRangeMin = (containerWidth, rangeArea, props, { emit }) => {
  const minThumb = computed(
    () => ((props.minValue - props.min) * 100) / rangeArea
  );
  const {
    bind: minEvents,
    state: minState,
    xDiff: minSwipeDiff
  } = useSwipeElement();
  const emitByMinPercent = pMin => {
    //pMin
    const minValue = (pMin * rangeArea) / 100 + props.min;
    if (minValue <= props.min) {
      emit("update:minValue", props.min);
    } else if (minValue >= props.maxValue) {
      emit("update:minValue", props.maxValue);
    } else {
      emit("update:minValue", minValue);
    }
  };
  let initialMin = minThumb.value;
  watch(
    () => minState.isTouching,
    () => {
      if (minState.isTouching) {
        initialMin = minThumb.value;
      } else {
        initialMin = 0;
      }
    }
  );
  const getMinPercent = computed(() => {
    const percent = (minSwipeDiff.value * 100) / containerWidth.value;
    return percent + initialMin;
  });

  watch(
    () => minSwipeDiff.value,
    () => {
      emitByMinPercent(getMinPercent.value);
    }
  );
  return { minThumb, minEvents };
};
export const useRangeMax = (containerWidth, rangeArea, props, { emit }) => {
  const maxThumb = computed(
    () => ((props.max - props.maxValue) * 100) / rangeArea
  );
  const {
    bind: maxEvents,
    state: maxState,
    xDiff: maxSwipeDiff
  } = useSwipeElement();

  const emitByMaxPercent = pMax => {
    const maxValue = props.max - (pMax * rangeArea) / 100;

    if (maxValue >= props.max) {
      emit("update:maxValue", props.max);
    } else if (maxValue <= props.minValue) {
      emit("update:maxValue", props.minValue);
    } else {
      emit("update:maxValue", maxValue);
    }
  };
  let initialMax = maxThumb.value;
  watch(
    () => maxState.isTouching,
    () => {
      if (maxState.isTouching) {
        initialMax = maxThumb.value;
      } else {
        initialMax = 0;
      }
    }
  );
  const getMaxPercent = computed(() => {
    const percent = (maxSwipeDiff.value * -1 * 100) / containerWidth.value;
    return percent + initialMax;
  });

  watch(
    () => maxSwipeDiff.value,
    () => {
      emitByMaxPercent(getMaxPercent.value);
    }
  );
  return { maxThumb, maxEvents };
};
