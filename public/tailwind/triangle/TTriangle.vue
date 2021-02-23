<template>
  <div
    v-bind="$attrs"
    data-name="triangle-triangle"
    :class="
      renderClass(
        `${triangleClassByDirection} ${borderColor} w-0 h-0`,
        'triangle'
      )
    "
  ></div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType } from "vue";
import { arrowDirections, variants } from "@/utility/css-helper";
import { useRenderClass } from "@/compositionFunctions/settings";

export default defineComponent({
  name: "TTriangle",
  props: {
    direction: {
      type: String as PropType<string>,
      validator: (value: string) => {
        return !!arrowDirections[value];
      },
      default: () =>
        inject("t-triangle-direction", arrowDirections["arrow-left"])
    },
    variant: {
      type: String,
      default: () => inject("t-triangle-variant", "primary"),
      validator: (propValue: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        return !!variants[propValue];
      }
    },
    colorClass: {
      type: String,
      default: () => inject("t-triangle-colorClass", "")
    }
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
          return "";
      }
    });
    const borderColor = computed(() => {
      if (props.colorClass) {
        return props.colorClass;
      }
      return `border-${props.variant}`;
    });
    const { renderClass } = useRenderClass("triangle");
    return {
      renderClass,
      triangleClassByDirection,
      borderColor
    };
  }
});
</script>

<style scoped></style>
