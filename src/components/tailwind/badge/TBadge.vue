<template>
  <div class="relative">
    <div :class="[baseClass, { 'rounded-full': rounded }]" v-bind="$attrs">
      {{ modelValue }}
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { normalSizes, positionVariant, variants } from "@/utility/css-helper";
import { defineComponent, ref } from "vue";
export default defineComponent({
  props: {
    variant: {
      type: String,
      default: "primary",
      validator: (propValue: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        return !!variants[propValue];
      },
    },
    position: {
      type: String,
      default: positionVariant.topRight,
      required: false,
      validator: (propValue: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        return !!positionVariant[propValue];
      },
    },
    rounded: {
      type: Boolean,
      default: true,
      required: false,
    },
    size: {
      type: String,
      default: () => {
        return normalSizes.md;
      },
      validator: (propValue: string) => {
        return !!normalSizes[propValue];
      },
    },
    modelValue: {
      type: String,
      required: true,
      default: "",
    },
  },
  setup(props) {
    const retSize = (size: normalSizes): string => {
      switch (size) {
        case normalSizes.xs:
          return "w-3 h-3 text-xs";
        case normalSizes.sm:
          return "w-6 h-6 text-sm";
        case normalSizes.md:
          return "w-7 h-7 text-base";
        case normalSizes.lg:
          return "w-12 h-12 text-lg";

        default:
          return "w-3 h-3";
      }
    };

    const baseClass = ref(
      `flex text-white transition justify-center items-center z-20 transform origin-center scale-0 absolute ${
        props.position === positionVariant.topRight
          ? "left-full top-0 -translate-y-1/2 -translate-x-1/2"
          : props.position === positionVariant.bottomRight
          ? "left-full top-full -translate-y-1/2 -translate-x-1/2"
          : props.position === positionVariant.bottomLeft
          ? "top-full left-0 -translate-y-1/2 -translate-x-1/2"
          : "left-0 top-0  -translate-y-1/2 -translate-x-1/2"
      }`
    );

    setTimeout(() => {
      baseClass.value += ` scale-100 bg-${props.variant} ${retSize(
        props.size as normalSizes
      )}`;
    }, 1000);

    return {
      baseClass,
    };
  },
});
</script>
