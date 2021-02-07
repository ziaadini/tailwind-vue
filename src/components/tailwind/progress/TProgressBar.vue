<template>
  <div class="w-full ltr">
    <div
      data-name="progressBar-container"
      :class="
        renderClass('shadow w-full bg-gray-200 rounded-full', 'container')
      "
      v-bind="$attrs"
    >
      <div
        data-name="progressBar-progress"
        :class="[
          `bg-${variant}`,
          { 'text-white': variant !== 'white' },
          renderClass(
            'rounded-inherit text-xs leading-none py-1 text-center transition',
            'progress'
          )
        ]"
        :style="{ width: `${percent}%` }"
      >
        <template v-if="showPercent">{{ Math.floor(percent) }}%</template>
        <slot :percent="Math.floor(percent)"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { variants } from "@/utility/css-helper";
import { useRenderClass } from "@/compositionFunctions/settings";
export default defineComponent({
  name: "TProgressBar",
  props: {
    value: {
      type: Number as PropType<number>,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    showPercent: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: "primary",
      validator: (propValue: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        return !!variants[propValue];
      }
    }
  },
  setup(props) {
    const percent = computed(() => (props.value * 100) / props.max);
    const { renderClass } = useRenderClass("progressBar");
    return { percent, renderClass };
  }
});
</script>

<style scoped></style>
