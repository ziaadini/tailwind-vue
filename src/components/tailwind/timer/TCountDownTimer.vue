<template>
  <div v-if="!hasSlot" class="flex items-center ltr">
    <div class="min-w-8" v-if="!hideDays">
      {{ day }}
      <span class="mx-1">: </span>
    </div>

    <div class="min-w-8" v-if="!hideHours">
      {{ hours }}
      <span class="mx-1">: </span>
    </div>
    <div class="min-w-8" v-if="!hideMinutes">
      {{ minutes }}
      <span class="mx-1">: </span>
    </div>

    <div class="min-w-8" v-if="!hideSeconds">
      {{ seconds }}
      <span class="mx-1"></span>
    </div>
  </div>
  <template v-else>
    <slot
      name="default"
      :day="day"
      :hideDays="hideDays"
      :hours="hours"
      :hideHours="hideHours"
      :minutes="minutes"
      :hideMinutes="hideMinutes"
      :seconds="seconds"
      :hideSeconds="hideSeconds"
    ></slot>
  </template>
</template>

<script lang="ts">
import { duration } from "moment";
import { computed, defineComponent, PropType } from "vue";
import { useInterval } from "@/compositionFunctions/interval";

export default defineComponent({
  name: "TCountDownTimer",
  props: {
    modelValue: {
      type: Number as PropType<number>,
      default: 0
    },
    countDown: {
      default: () => 1000
    }
  },
  emits: {
    "update:modelValue"(value: number) {
      return typeof value === "number";
    },
    endTime() {
      return true;
    }
  },
  setup(props, { emit, slots }) {
    const getDuration = computed((): any => {
      return duration(props.modelValue, "seconds");
    });
    const getDays = computed(() => getDuration.value.days());
    const getHours = computed(() => getDuration.value.hours());
    const getMinutes = computed(() => getDuration.value.minutes());
    const getSecond = computed(() => getDuration.value.seconds());
    const hideDays = computed(() => getDays.value == 0);
    const hideHours = computed(() => getHours.value == 0 && hideDays.value);
    const hideMinutes = computed(
      () => getMinutes.value == 0 && hideHours.value
    );
    const hideSeconds = computed(
      () => getSecond.value == 0 && hideMinutes.value
    );
    const callback = () => {
      if (props.modelValue >= 1) {
        emit("update:modelValue", props.modelValue - 1);
      } else {
        emit("endTime");
      }
    };
    useInterval(callback, props.countDown as number | null);
    return {
      day: getDays,
      hours: getHours,
      minutes: getMinutes,
      seconds: getSecond,
      hideDays,
      hideHours,
      hideMinutes,
      hideSeconds,
      hasSlot: !!slots.default
    };
  }
});
</script>

<style scoped></style>
