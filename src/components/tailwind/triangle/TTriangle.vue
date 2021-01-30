<template>
  <div
    class="w-0 h-0"
    :class="[triangleClassByDirection, `border-${variant}`]"
  ></div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { variants } from "@/utility/css-helper";

export default defineComponent({
  name: "TTriangle",
  props: {
    direction: {
      type: String as PropType<string>,
      validator: (value: string) => {
        return ["arrow-up", "arrow-down", "arrow-right", "arrow-left"].includes(
          value
        );
      },
      default: "arrow-left",
    },
    variant: {
      type: String,
      default: "primary",
      validator: (propValue: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        return !!variants[propValue];
      },
    },
  },
  setup(props) {
    const triangleClassByDirection = computed(() => {
      switch (props.direction) {
        case "arrow-up":
          return "border-l-8 border-b-8 border-r-8 border-l-transparent border-r-transparent";
        case "arrow-down":
          return "border-l-8 border-t-8 border-r-8 border-l-transparent border-r-transparent";
        case "arrow-right":
          return "border-l-8 border-t-8 border-b-8 border-t-transparent border-b-transparent";
        case "arrow-left":
          return "border-r-8 border-t-8 border-b-8 border-t-transparent border-b-transparent";
        default:
          return ""
      }
    });
    return {
      triangleClassByDirection,
    };
  },
});
</script>

<style scoped></style>
