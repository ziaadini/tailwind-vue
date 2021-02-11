<template>
  <div
    data-name="countDownTimer-container"
    v-if="!hasSlot"
    :class="renderClass('flex items-center ltr', 'container')"
  >
    <div
      data-name="countDownTimer-digit"
      :class="renderClass('min-w-8', 'digit')"
      v-if="!hideDays"
    >
      {{ day }}
      <span
        data-name="countDownTimer-separator"
        :class="renderClass('mx-1', 'separator')"
        >:
      </span>
    </div>

    <div
      data-name="countDownTimer-digit"
      :class="renderClass('min-w-8', 'digit')"
      v-if="!hideHours"
    >
      {{ hours }}
      <span
        data-name="countDownTimer-separator"
        :class="renderClass('mx-1', 'separator')"
        >:
      </span>
    </div>
    <div
      data-name="countDownTimer-digit"
      :class="renderClass('min-w-8', 'digit')"
      v-if="!hideMinutes"
    >
      {{ minutes }}
      <span
        data-name="countDownTimer-separator"
        :class="renderClass('mx-1', 'separator')"
        >:
      </span>
    </div>

    <div
      data-name="countDownTimer-digit"
      :class="renderClass('min-w-8', 'digit')"
      v-if="!hideSeconds"
    >
      {{ seconds }}
      <span
        data-name="countDownTimer-separator"
        :class="renderClass('mx-1', 'separator')"
      ></span>
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
import { useRenderClass } from "@/compositionFunctions/settings";

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
    const { renderClass } = useRenderClass("countDownTimer");
    return {
      renderClass,
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
