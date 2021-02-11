<template>
  <div
    data-name="loading-container"
    :class="renderClass('flex justify-center', 'container')"
  >
    <template v-if="type === LoadingTypes.spinner">
      <div v-bind="$attrs" :class="renderClass(`${withClass} relative`, 'spinnerContainer')">
        <div
          :class="
            renderClass(
              `border-${variant} absolute top-0 left-0 z-0 rounded-full h-full w-full opacity-60 border-2`,
              'spinnerCircle'
            )
          "
        ></div>
        <div
          :class="
            renderClass(
              `border-${variant} absolute top-0 left-0 h-full w-full  z-10 rounded-full border-gray-50 border-t-2 animate-spin`,
              'spinnerSpin'
            )
          "
        ></div>
      </div>
    </template>

    <template v-else>
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
    </template>

  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { size, variants } from "@/utility/css-helper";
import { useRenderClass } from "@/compositionFunctions/settings";
import { LoadingTypes } from "@/utility/enums/SkeletonTypes";
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
    },
    type: {
      type: String,
      default: "default",
      validator: (propValue: string) => {
        return !!LoadingTypes[propValue];
      }
    }
  },
  setup(props) {
    const withClass = computed((): string => {
      switch (props.size) {
        case size.xs:
          return props.type === LoadingTypes.default ? "w-1 h-1" : "w-3 h-3";
        case size.sm:
          return props.type === LoadingTypes.default ? "w-2 h-2" : "w-6 h-6";
        case size.md:
          return props.type === LoadingTypes.default ? "w-4 h-4" : "w-8 h-8";
        case size.lg:
          return props.type === LoadingTypes.default ? "w-6 h-6" : "w-10 h-10";
        case size.full:
          return props.type === LoadingTypes.default ? "w-8 h-8" : "w-12 h-12";
      }
      return "";
    });
    const { renderClass } = useRenderClass("loading");
    return { withClass, renderClass, LoadingTypes };
  }
});
</script>
