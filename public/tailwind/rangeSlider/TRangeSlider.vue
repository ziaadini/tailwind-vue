<template>
  <div
    data-name="rangeSlider-container"
    :class="renderClass('min-w-48', 'container')"
    ref="container"
  >
    <div
      data-name="rangeSlider-innerContainer"
      :class="renderClass('relative z-10 h-2', 'innerContainer')"
    >
      <div
        data-name="rangeSlider-pan"
        :class="
          renderClass(
            'absolute z-10 left-0 right-0 bottom-0 top-0 rounded-md bg-gray-200',
            'pan'
          )
        "
      ></div>

      <div
        data-name="rangeSlider-activePan"
        :class="[
          `bg-${variant}`,
          renderClass('absolute z-20 top-0 bottom-0 rounded-md', 'activePan')
        ]"
        :style="'right:' + maxThumb + '%; left:' + minThumb + '%'"
      ></div>

      <div
        v-if="!disableMin"
        data-name="rangeSlider-minCircle"
        :class="[
          `bg-${variant}`,
          renderClass(
            'absolute z-30 w-6 h-6 top-0 left-0 rounded-full cursor-pointer -mt-2 -ml-3',
            'minCircle'
          )
        ]"
        :style="'left: ' + minThumb + '%'"
        v-bind="minEvents"
      >
        <slot name="min-inner" :minValue="minValue"></slot>
      </div>

      <div
        data-name="rangeSlider-maxCircle"
        v-if="!disableMax"
        :class="[
          `bg-${variant}`,
          renderClass(
            'absolute z-30 w-6 h-6 top-0 right-0 rounded-full cursor-pointer -mt-2 -mr-3',
            'maxCircle'
          )
        ]"
        :style="'right: ' + maxThumb + '%'"
        v-bind="maxEvents"
      >
        <slot name="max-inner" :maxValue="maxValue"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, ref } from "vue";
import { useRangeMax, useRangeMin } from "@/compositionFunctions/rangeSlider";
import { variants } from "@/utility/css-helper";
import { useRenderClass } from "@/compositionFunctions/settings";

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
      default: () => inject("t-range-slider-disableMin", false)
    },
    disableMax: {
      type: Boolean,
      default: () => inject("t-range-slider-disableMax", false)
    },

    variant: {
      type: String,
      default: () => inject("t-range-slider-variant", "primary"),
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

    const { renderClass } = useRenderClass("rangeSlider");
    return {
      renderClass,
      minThumb,
      minEvents,
      maxThumb,
      maxEvents,
      container
    };
  }
});
</script>
