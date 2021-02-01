<template>
  <div class="w-64" ref="container">
    <div class="relative z-10 h-2">
      <div
        class="absolute z-10 left-0 right-0 bottom-0 top-0 rounded-md bg-gray-200"
      ></div>

      <div
        class="absolute z-20 top-0 bottom-0 rounded-md"
        :class="`bg-${variant}`"
        :style="'right:' + maxThumb + '%; left:' + minThumb + '%'"
      ></div>

      <div
        v-if="!disableMin"
        class="absolute z-30 w-6 h-6 top-0 left-0 rounded-full cursor-pointer -mt-2 -ml-3"
        :class="`bg-${variant}`"
        :style="'left: ' + minThumb + '%'"
        v-bind="minEvents"
      >
        <slot name="min-inner" :minValue="minValue"></slot>
      </div>

      <div
        v-if="!disableMax"
        class="absolute z-30 w-6 h-6 top-0 right-0 rounded-full cursor-pointer -mt-2 -mr-3"
        :class="`bg-${variant}`"
        :style="'right: ' + maxThumb + '%'"
        v-bind="maxEvents"
      >
        <slot name="max-inner" :maxValue="maxValue"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRangeMax, useRangeMin } from "@/compositionFunctions/rangeSlider";
import { variants } from "@/utility/css-helper";

export default defineComponent({
  name: "TRangeSlider",
  emits: {
    "update:minValue"(value: number) {
      return typeof value === "number";
    },
    "update:maxValue"(value: number) {
      return typeof value === "number";
    }
  },
  props: {
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 0
    },
    minValue: {
      type: Number,
      default: 0
    },
    maxValue: {
      type: Number,
      default: 0
    },
    disableMin: {
      type: Boolean,
      default: () => false
    },
    disableMax: {
      type: Boolean,
      default: () => false
    },

    variant: {
      type: String,
      default: "primary",
      validator: (propValue: string) => {
        return !!variants[propValue];
      }
    }
  },
  setup(props, { emit }) {
    const rangeArea = props.max - props.min;
    const container = ref<any>(null);
    const containerWidth = ref(0);
    onMounted(() => {
      if (props.minValue < props.min || props.minValue > props.max) {
        console.error("t-range-slider : minValue is out of range");
      }
      if (props.maxValue < props.min || props.maxValue > props.max) {
        console.error("t-range-slider : maxvalue is out of range");
      }
      if (props.min === props.max) {
        console.error(
          "t-range-slider : range area is invalid min and max are equal"
        );
      } else if (props.min > props.max) {
        console.error(
          "t-range-slider : range area is invalid max is bigger than min"
        );
      }
      containerWidth.value = container.value?.scrollWidth;
    });
    const { minThumb, minEvents } = useRangeMin(
      containerWidth,
      rangeArea,
      props,
      { emit }
    );
    const { maxThumb, maxEvents } = useRangeMax(
      containerWidth,
      rangeArea,
      props,
      { emit }
    );

    return {
      minThumb,
      minEvents,
      maxThumb,
      maxEvents,
      container
    };
  }
});
</script>
