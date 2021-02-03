<template>
  <div class="relative w-96 h-96 bg-gray-100 overflow-hidden">
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

    let interval;
    let increment = true;

    const clearCarouselInterval = (interval) => clearInterval(interval);
    const setCarouselInterval = () => {
      interval = setInterval(() => {
        if (rightDisabled.value) increment = false;
        else if (leftDisabled.value) increment = true;
        if (increment) changeActiveIndex(+1);
        else changeActiveIndex(-1);
      }, autoPlaceInterval.value);
    };

    watchEffect(() => {
      if (autoPlay.value) {
        setCarouselInterval();
      } else {
        interval && clearCarouselInterval(interval);
      }
    });

    const buttonClick = variance => {
      changeActiveIndex(variance);
      if (autoPlay.value) {
        clearCarouselInterval(interval);
        setCarouselInterval();
      }
    };

    return {
      horizontalClasses,
      changeActiveIndex,
      activeIndex,
      leftDisabled,
      rightDisabled,
      buttonClick,
    };
  },
});
</script>

<style lang="scss" scoped></style>
