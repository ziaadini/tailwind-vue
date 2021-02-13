<template>
  <div
    ref="itemRefs"
    class="transition-all overflow-hidden"
    :class="`duration-${duration} ${easeClass}`"
    v-bind="getBindingToAnimate"
  >
    <slot></slot>
  </div>
</template>

<script>
import { computed, ref } from "vue";

export default {
  name: "TCollapsable",
  props: {
    show: { type: [Boolean, Number] },
    duration: {
      type: Number,
      default: 300
    },
    easeClass: {
      type: String,
      default: "ease-in-out"
    },
  },
  setup(props) {
    const itemRefs = ref(null);
    const getBindingToAnimate = computed(() => {
      if (props.show) {
        if (!itemRefs.value) {
          return {};
        }
        return {
          style: `max-height: ${itemRefs.value.scrollHeight}px`,
          "data-show": true
        };
      } else {
        return { class: "max-h-0", "data-show": false };
      }
    });
    return {
      getBindingToAnimate,
      itemRefs
    };
  }
};
</script>

<style scoped></style>
