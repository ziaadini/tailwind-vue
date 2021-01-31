<template>
  <div class="w-64" ref="container">
    <div class="relative z-10 h-2">
      <div
        class="absolute z-10 left-0 right-0 bottom-0 top-0 rounded-md bg-gray-200"
      ></div>

      <div
        class="absolute z-20 top-0 bottom-0 rounded-md bg-green-300"
        :style="'right:' + maxThumb + '%; left:' + minThumb + '%'"
      ></div>

      <div
        class="absolute z-30 w-6 h-6 top-0 left-0 bg-green-300 rounded-full -mt-2 -ml-1"
        :style="'left: ' + minThumb + '%'"
        v-bind="minEvents"
      ></div>

      <div
        class="absolute z-30 w-6 h-6 top-0 right-0 bg-green-300 rounded-full -mt-2 -mr-3"
        :style="'right: ' + maxThumb + '%'"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onMounted,
  ref,
  watch,
  watchEffect
} from "vue";
import { useSwipeElement } from "@/compositionFunctions/swipe";

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
      default: 100
    },
    max: {
      type: Number,
      default: 10000
    },
    minValue: {
      type: Number,
      default: 0
    },
    maxValue: {
      type: Number,
      default: 0
    }
  },
  setup(props, { emit }) {
    const range = props.max - props.min;
    const container = ref<any>(null);
    const containerWith = ref(0);
    onMounted(() => {
      containerWith.value = container.value?.scrollWidth;
    });
    const minThumb = computed(
      () => ((props.minValue - props.min) * 100) / range
    );
    const maxThumb = computed(
      () => ((props.max - props.maxValue) * 100) / range
    );
    const {
      bind: minEvents,
      state: minState,
      xDiff: minSwipeDiff,
      reset: minReset
    } = useSwipeElement();

    const emitByMaxPercent = pMax => {
      const maxValue = props.max - (pMax * range) / 100;
      emit("update:maxValue", maxValue);
    };
    const emitByMinPercent = pMin => {
      //pMin
      const minValue = (pMin * range) / 100 + props.min;
      if (minValue <= props.min) {
        emit("update:minValue", props.min);
      } else if (minValue >= props.maxValue) {
        emit("update:minValue", props.maxValue);
      } else {
        emit("update:minValue", minValue);
      }
    };
    let initialMin = minThumb.value;
    watch(
      () => minState.isTouching,
      () => {
        if (minState.isTouching) {
          initialMin = minThumb.value;
        } else {
          initialMin = 0;
        }
      }
    );
    const getMinPercent = computed(() => {
      const percent = (minSwipeDiff.value * 100) / containerWith.value;
      return percent + initialMin;
    });

    watch(
      () => minSwipeDiff.value,
      () => {
        emitByMinPercent(getMinPercent.value);
      }
    );
    return {
      minThumb,
      maxThumb,
      minEvents,
      container
    };
  }
});
</script>
