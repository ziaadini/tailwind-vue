<template>
  <div
    class="relative bg-gray-100 overflow-hidden"
    v-bind="{
      ...$attrs,
      onMouseDown: swipeEnabled && onMouseDown,
      onTouchstart: swipeEnabled && onTouchstart,
    }"
  >
    <div class="absolute w-full h-full">
      <img
        v-for="(link, index) in modelValue"
        :key="index + 'img-link'"
        class="absolute w-full h-full transition transform origin-center duration-500 delay-150"
        :class="[
          horizontalClasses(index),
          activeIndex !== index &&
            `${rotate && 'rotate-90'} ${scale && 'scale-150'}`,
        ]"
        :src="link.url"
        alt=""
      />
    </div>
    <div class="absolute transform right-0 top-1/2 -translate-y-1/2 z-20">
      <slot
        name="rightButton"
        :leftDisabled="leftDisabled"
        :rightDisabled="rightDisabled"
        :next="() => buttonClick(+1)"
        :back="() => buttonClick(-1)"
      />
    </div>
    <div class="absolute transform left-0 top-1/2 -translate-y-1/2 z-20">
      <slot
        name="leftButton"
        :leftDisabled="leftDisabled"
        :rightDisabled="rightDisabled"
        :next="() => buttonClick(+1)"
        :back="() => buttonClick(-1)"
      />
    </div>
    <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { useInterval } from "@/compositionFunctions/interval";
import { useSwipeElement } from "@/compositionFunctions/swipe";
import {
  computed,
  defineComponent,
  PropType,
  ref,
  toRefs,
  watch,
  watchEffect,
} from "vue";

export default defineComponent({
  props: {
    scale: {
      type: Boolean,
      required: false,
      default: false,
    },
    rotate: {
      type: Boolean,
      required: false,
      default: false,
    },
    autoPlay: {
      type: Boolean,
      default: true,
      required: false,
    },
    autoPlaceInterval: {
      type: Number,
      default: 2000,
      required: false,
    },
    modelValue: {
      type: Array as PropType<{ value: number; url: string }[]>,
      default: 2000,
      required: false,
    },
    index: {
      type: Number,
      default: 0,
      required: false,
    },
    swipeThreshold: {
      type: Number,
      default: 50,
      required: false,
    },
    swipeEnabled: {
      type: Boolean,
      default: true,
      required: false,
    },
  },
  setup(props, { emit }) {
    const activeIndex = ref(0);

    const { autoPlay, autoPlaceInterval, modelValue, index } = toRefs(props);

    const horizontalClasses = (index: number) => ({
      "translate-x-0 top-0 z-20": index === activeIndex.value,
      "-translate-x-full top-0": activeIndex.value - index > 0,
      "translate-x-full top-0": activeIndex.value - index < 0,
    });

    const itemChangedEvent = () => {
      emit(
        "update:index",
        modelValue.value[activeIndex.value].value || activeIndex
      );
    };

    const changeActiveIndex = (value: number) => {
      activeIndex.value = activeIndex.value + value;
      itemChangedEvent();
    };

    const leftDisabled = computed(() => {
      return activeIndex.value === 0;
    });

    const rightDisabled = computed(() => {
      return activeIndex.value === props.modelValue.length - 1;
    });

    watch(index, (newIndex) => {
      changeActiveIndex(newIndex - activeIndex.value);
    });

    let increment = true;

    const { start } = useInterval(() => {
      if (rightDisabled.value) increment = false;
      else if (leftDisabled.value) increment = true;
      if (increment) changeActiveIndex(+1);
      else changeActiveIndex(-1);
    }, null);

    const setCarouselInterval = () => {
      start(autoPlaceInterval.value);
    };

    watchEffect(() => {
      if (autoPlay.value) {
        setCarouselInterval();
      } else {
        start(null);
      }
    });

    const buttonClick = (variance) => {
      start(null);
      changeActiveIndex(variance);
      if (autoPlay.value) {
        setCarouselInterval();
      }
    };

    const {
      bind: swipeEvent,
      state: state,
      xDiff: swipeDiff,
    } = useSwipeElement();

    if (props.swipeEnabled)
      watchEffect(() => {
        if (state.isDropped) {
          if (swipeDiff.value > props.swipeThreshold) {
            !leftDisabled.value && buttonClick(-1);
          } else if (swipeDiff.value < -props.swipeThreshold) {
            !rightDisabled.value && buttonClick(1);
          }
        }
      });
    return {
      horizontalClasses,
      changeActiveIndex,
      activeIndex,
      leftDisabled,
      rightDisabled,
      buttonClick,
      onMouseDown: swipeEvent.onMousedown,
      onTouchstart: swipeEvent.onTouchstart,
    };
  },
});
</script>

<style lang="scss" scoped></style>
