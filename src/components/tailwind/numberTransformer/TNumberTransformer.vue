<template>
  <span>{{ val }}</span>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, inject } from "vue";
import { useInterval } from "@/compositionFunctions/interval";

export default defineComponent({
  name: "TNumberTransformer",
  props: {
    number: {
      type: Number,
      required: true
    },
    maxDuration: {
      type: Number,
      default: () => inject("t-number-transformer-maxDuration", 1000)
    },
    maxUpdate: {
      type: Number,
      default: () => inject("t-number-transformer-maxUpdate", 20)
    },
    step: {
      type: Number,
      default: () => inject("t-number-transformer-step", 0)
    }
  },
  setup(props) {
    const val = ref(props.number);
    const from = ref(props.number);
    let isUpCounter = true;
    const getDiff = computed(() => Math.abs(props.number - from.value));
    const getStep = computed(() => {
      if (props.step) {
        return props.step;
      }
      return props.maxUpdate === 0
        ? 1
        : Math.ceil(getDiff.value / props.maxUpdate);
    });
    const getDomUpdate = computed(() => getDiff.value / getStep.value);
    const getTotalDuration = computed(() => {
      const duration = 100 * getDomUpdate.value; //100ms per domUpdate
      return duration > props.maxDuration ? props.maxDuration : duration;
    }); //each dom update 100ms
    const getIntervalDuration = computed((): number | null => {
      const value = (getTotalDuration.value * getStep.value) / getDiff.value;
      return value > 0 ? value : null;
    });
    const callback = () => {
      if (isUpCounter) {
        if (val.value + getStep.value < props.number) {
          val.value += getStep.value;
        } else {
          val.value = props.number;
        }
      } else {
        if (val.value - getStep.value >= props.number) {
          val.value -= getStep.value;
        } else {
          val.value = props.number;
        }
      }
    };
    const { clear, start } = useInterval(callback, null);

    watch(
      () => getIntervalDuration.value,
      value => {
        start(value);
      }
    );
    watch(
      () => props.number,
      (value, oldValue) => {
        isUpCounter = value > oldValue;
        from.value = oldValue;
      }
    );
    watch(
      () => val.value,
      () => {
        val.value === props.number && clear();
      }
    );
    return { val };
  }
});
</script>
