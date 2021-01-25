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
      <t-button variant="primary" @click="changeActiveIndex(-1)">-</t-button>
    </div>
    <div class="absolute transform left-0 top-1/2 -translate-y-1/2">
      <t-button variant="primary" @click="changeActiveIndex(+1)">+</t-button>
    </div>
    <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2">
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRefs } from "vue";
import TButton from "@/components/tailwind/button/TButton.vue";

export default defineComponent({
  components: {
    TButton,
  },
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
  },
  setup(props) {
    const activeIndex = ref(0);

    const { vertical, horizontal } = toRefs(props);

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

    return {
      verticalClasses,
      horizontalClasses,
      changeActiveIndex,
      activeIndex,
    };
  },
});
</script>

<style lang="scss" scoped></style>
