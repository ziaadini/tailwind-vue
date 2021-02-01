<template>
  <div class="relative">
    <div @mouseenter="open" @mouseleave="close">
      <slot></slot>
    </div>
    <div
      v-bind="$attrs"
      class="absolute w-full text-gray-50 transform transition-all duration-200 ease-out"
      :class="[
        {
          'top-full': isBottom,
          'bottom-full': isTop,
          'right-1/2 translate-x-1/2': isTop || isBottom,
          'left-full': isRight,
          'right-full': isLeft,
          'bottom-1/2 translate-y-1/2': isRight || isLeft
        },
        { 'h-0 w-0 overflow-hidden scale-75 opacity-0': !isShow }
      ]"
    >
      <div
        class="flex justify-center items-center"
        :class="{
          'flex-col': isBottom,
          'flex-col-reverse': isTop,
          'flex-row-reverse': isRight,
          'flex-row': isLeft
        }"
      >
        <t-triangle
          :direction="triangleDirection"
          :variant="variant"
        ></t-triangle>
        <div class="rounded-xs p-1 w-full" :class="`bg-${variant}`">
          {{ message }}
          <slot name="message" :close="forceClose"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref, watchEffect } from "vue";
import TTriangle from "@/components/tailwind/triangle/TTriangle.vue";
import { variants } from "@/utility/css-helper";

export default defineComponent({
  name: "TTooltip",
  inheritAttrs: false,
  props: {
    position: {
      type: String as PropType<string>,
      validator: (value: string) =>
        ["right", "left", "top", "bottom"].includes(value),
      default: "top"
    },
    variant: {
      type: String,
      default: "primary",
      validator: (propValue: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        return !!variants[propValue];
      }
    },
    modelValue: {
      type: Boolean,
      default: false
    },
    hover: {
      type: Boolean,
      default: () => true
    },
    message: {
      type: String,
      default: ""
    }
  },
  components: { TTriangle },
  setup(props, { emit }) {
    const isShow = ref(props.modelValue);
    const open = () => {
      if (props.hover) {
        emit("update:modelValue", true);
        isShow.value = true;
      }
    };
    const close = () => {
      if (props.hover) {
        emit("update:modelValue", false);
        isShow.value = false;
      }
    };
    const forceClose = () => {
      emit("update:modelValue", false);
      isShow.value = false;
    };

    watchEffect(() => {
      isShow.value = props.modelValue;
    });
    const triangleDirection = computed(() => {
      switch (props.position) {
        case "top":
          return "arrow-down";
        case "bottom":
          return "arrow-up";
        case "right":
          return "arrow-left";
        case "left":
          return "arrow-right";
        default:
          return "";
      }
    });

    const isTop = computed(() => props.position === "top");
    const isBottom = computed(() => props.position === "bottom");
    const isRight = computed(() => props.position === "right");
    const isLeft = computed(() => props.position === "left");
    return {
      isShow,
      open,
      close,
      forceClose,
      triangleDirection,
      isTop,
      isRight,
      isBottom,
      isLeft
    };
  }
});
</script>
