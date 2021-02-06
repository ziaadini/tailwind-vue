<template>
  <div data-name="loading-container" :class="renderClass('flex', 'container')">
    <div
      data-name="loading-item"
      v-bind="$attrs"
      :class="
        renderClass(`rounded-full t-loader bg-${variant} ${withClass}`, 'item')
      "
    ></div>
    <div
      data-name="loading-item"
      v-bind="$attrs"
      :class="
        renderClass(
          `rounded-full t-loader-middle mx-1 bg-${variant} ${withClass}`,
          'item'
        )
      "
    ></div>
    <div
      data-name="loading-item"
      v-bind="$attrs"
      :class="
        renderClass(`rounded-full t-loader bg-${variant} ${withClass}`, 'item')
      "
    ></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { size, variants } from "@/utility/css-helper";
import { useRenderClass } from "@/compositionFunctions/settings";
export default defineComponent({
  name: "TLoading",
  inheritAttrs: false,
  props: {
    size: {
      type: String,
      default: () => {
        return "sm";
      },
      validator: (propValue: string) => {
        return !!size[propValue];
      }
    },
    variant: {
      type: String,
      default: "primary",
      validator: (propValue: string) => {
        return !!variants[propValue];
      }
    }
  },
  setup(props) {
    const withClass = computed((): string => {
      switch (props.size) {
        case size.xs:
          return "w-1 h-1";
        case size.sm:
          return "w-2 h-2";
        case size.md:
          return "w-4 h-4";
        case size.lg:
          return "w-6 h-6";
        case size.full:
          return "w-8 h-8";
      }
      return "";
    });
    const { renderClass } = useRenderClass("loading");
    return { withClass, renderClass };
  }
});
</script>
