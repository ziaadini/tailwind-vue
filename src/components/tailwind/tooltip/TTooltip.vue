<template>
  <div class="relative">
    <div @mouseover="open" @mouseleave="close">
      <slot></slot>
    </div>
    <div
      class="absolute w-full text-gray-50 transform transition-all duration-200"
      :class="[
        {
          'top-full': isBottom,
          'bottom-full': isTop,
          'right-1/2 translate-x-1/2': isTop || isBottom,
          'left-full': isRight,
          'right-full': isLeft,
          'bottom-1/2 translate-y-1/2': isRight || isLeft
        },
        { 'h-0 w-0 overflow-hidden scale-0 opacity-0': !isShow }
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
          tooltip
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, computed, ref } from "vue";
import TTriangle from "@/components/tailwind/triangle/TTriangle.vue";
import { variants } from "@/utility/css-helper";
export default defineComponent({
  name: "TTooltip",
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
    }
  },
  components: { TTriangle },
  setup(props, { emit }) {
    const isShow = ref(props.modelValue);
    const open = () => {
      emit("update:modelValue", true);
      isShow.value = true;
    };
    const close = () => {
      emit("update:modelValue", false);
      isShow.value = false;
    };
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
      triangleDirection,
      isTop,
      isRight,
      isBottom,
      isLeft
    };
  }
});
</script>
