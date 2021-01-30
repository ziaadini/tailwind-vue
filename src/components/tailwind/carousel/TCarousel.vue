<template>
  <div class="relative w-96 h-96 bg-gray-100 overflow-hidden">
    <div class="absolute w-full h-full">
      <img
        v-for="(link, index) in modelValue"
        :key="index + 'img-link'"
        class="absolute w-full h-full transition transform-gpu origin-center duration-500 delay-150 opacity-0"
        :class="[
          verticalClasses(index),
          horizontalClasses(index),
          activeIndex !== index &&
            `${rotate && 'rotate-90'} ${scale && 'scale-150'}`,
        ]"
        :src="link.url"
        alt=""
      />
    </div>
    <div class="absolute transform right-0 top-1/2 -translate-y-1/2">
      <slot
        name="rightButton"
        :leftDisabled="leftDisabled"
        :rightDisabled="rightDisabled"
        :next="() => changeActiveIndex(+1)"
        :back="() => changeActiveIndex(-1)"
      />
    </div>
    <div class="absolute transform left-0 top-1/2 -translate-y-1/2">
      <slot
        name="leftButton"
        :leftDisabled="leftDisabled"
        :rightDisabled="rightDisabled"
        :next="() => changeActiveIndex(+1)"
        :back="() => changeActiveIndex(-1)"
      />
    </div>
    <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2">
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
  watchEffect,
} from "vue";

export default defineComponent({
  props: {
    vertical: {
      type: Boolean,
      required: false,
      default: false,
    },
    horizontal: {
      type: Boolean,
      required: false,
      default: true,
    },
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
  },
  setup(props, { emit }) {
    const activeIndex = ref(0);

    const {
      vertical,
      horizontal,
      autoPlay,
      autoPlaceInterval,
      modelValue,
    } = toRefs(props);

    const verticalClasses = (index: number) =>
      vertical.value && {
        "translate-y-full opacity-0": index !== activeIndex.value,
        "translate-y-0  opacity-100": index === activeIndex.value,
      };

    const horizontalClasses = (index: number) =>
      horizontal.value && {
        "translate-x-full opacity-100": index === activeIndex.value,
        "right-full top-0": true,
      };

    const itemChangedEvent = () => {
      emit(
        "itemChanged",
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

    let interval;
    let increment = true;

    watchEffect(() => {
      if (autoPlay.value) {
        interval = setInterval(() => {
          if (rightDisabled.value) increment = false;
          else if (leftDisabled.value) increment = true;
          if (increment) changeActiveIndex(+1);
          else changeActiveIndex(-1);
        }, autoPlaceInterval.value);
      } else {
        interval && clearInterval(interval);
      }
    });

    return {
      verticalClasses,
      horizontalClasses,
      changeActiveIndex,
      activeIndex,
      leftDisabled,
      rightDisabled,
    };
  },
});
</script>

<style lang="scss" scoped></style>
