<template>
  <div class="relative w-96 h-96 bg-gray-100 overflow-hidden">
    <div class="absolute w-full h-full">
      <img
        v-for="(link, index) in links"
        :key="index + 'img-link'"
        class="absolute w-full h-full transition transform-gpu origin-center duration-500 delay-150 opacity-0"
        :class="[
          verticalClasses(index),
          horizontalClasses(index),
          activeIndex !== index &&
            `${rotate && 'rotate-90'} ${scale && 'scale-150'}`,
        ]"
        :src="link"
        alt=""
        :style="{ '--besides-size': besidesSize }"
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
    links: {
      type: Array as PropType<string[]>,
      required: true,
      default: [],
    },
    besidesSize: {
      type: String,
      required: false,
      default: null,
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
  },
  setup(props) {
    const activeIndex = ref(0);

    const { vertical, horizontal, autoPlay, autoPlaceInterval } = toRefs(props);

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
    //  rotate-90
    const changeActiveIndex = (value: number) => {
      activeIndex.value = activeIndex.value + value;
    };

    const leftDisabled = computed(() => {
      return activeIndex.value === 0;
    });

    const rightDisabled = computed(() => {
      return activeIndex.value === props.links.length - 1;
    });

    let interval;
    let increment = true;

    watchEffect(() => {
      if (autoPlay.value) {
        interval = setInterval(() => {
          if (rightDisabled.value) increment = false;
          else if (leftDisabled.value) increment = true;
          if (increment) activeIndex.value++;
          else activeIndex.value--;
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
