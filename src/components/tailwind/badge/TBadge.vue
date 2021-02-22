<template>
  <div class="relative">
    <div
      data-name="badge-container"
      :class="[
        renderClass(baseClass, 'container'),
        { 'rounded-full': rounded }
      ]"
      v-bind="$attrs"
    >
      {{ text }}
      <slot name="content"></slot>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { normalSizes, positionVariant, variants } from "@/utility/css-helper";
import { defineComponent, inject, onMounted, ref } from "vue";
import { useRenderClass } from "@/compositionFunctions/settings";

export default defineComponent({
  name: "TBadge",
  props: {
    variant: {
      type: String,
      default: () => inject("t-badge-variant", "primary"),
      validator: (propValue: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        return !!variants[propValue];
      }
    },
    position: {
      type: String,
      default: () => inject("t-badge-position", positionVariant.topRight),
      validator: (propValue: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        return !!positionVariant[propValue];
      }
    },
    rounded: {
      type: Boolean,
      default: () => inject("t-badge-rounded", true)
    },
    size: {
      type: String,
      default: () => inject("t-badge-size", normalSizes.md),
      validator: (propValue: string) => {
        return !!normalSizes[propValue];
      }
    },
    text: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    const retSize = (size: normalSizes): string => {
      switch (size) {
        case normalSizes.xs:
          return "w-2 h-2 text-xs";
        case normalSizes.sm:
          return "w-4 h-4 text-sm";
        case normalSizes.md:
          return "w-6 h-6 text-base";
        case normalSizes.lg:
          return "w-10 h-10 text-lg";

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

    onMounted(() => {
      setTimeout(() => {
        baseClass.value += ` scale-100 bg-${props.variant} ${retSize(
          props.size as normalSizes
        )}`;
      }, 500);
    });
    const { renderClass } = useRenderClass("badge");
    return {
      renderClass,
      baseClass
    };
  }
});
</script>
