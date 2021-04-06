<template>
  <component
    :is="tag"
    ref="itemRefs"
    class="transition-all overflow-hidden"
    :class="`duration-${duration} ${easeClass}`"
    v-bind="getBindingToAnimate"
  >
    <slot></slot>
  </component>
</template>

<script>
import { computed, inject, ref } from "vue";

export default {
  name: "TCollapsible",
  props: {
    show: { type: [Boolean, Number] },
    duration: {
      type: Number,
      default: () => inject("t-collapsible-duration", 300)
    },
    easeClass: {
      type: String,
      default: () => inject("t-collapsible-easeClass", "ease-in-out")
    },
    tag: {
      type: String,
      default: () => inject("t-collapsible-tag", "div")
    }
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
