<template>
  <div
    data-name="toast-container"
    :class="[
      renderClass(
        `bg-${variant} fixed z-20 w-max right-1/2 transform translate-x-1/2 transition-all text-white ease-in-out rounded-sm max-w-9/10  p-2 duration-500`,
        'container'
      ),
      renderClass(modelValue ? 'bottom-10 scale-100 opacity-95' : '', 'show'),
      renderClass(!modelValue ? '-bottom-full opacity-0 scale-0' : '', 'hide')
    ]"
  >
    <slot :close="close"></slot>
    {{ message }}
  </div>
</template>

<script lang="ts">
import { watchEffect, defineComponent, inject } from "vue";
import { useRenderClass } from "@/compositionFunctions/settings";

export default defineComponent({
  name: "TToast",
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: () => inject("t-toast-variant", "success")
    },
    duration: {
      type: Number,
      default: () => inject("t-toast-duration", 3000)
    },
    message: {
      type: String,
      default: ""
    }
  },
  setup(props, { emit }) {
    const close = () => {
      emit("update:modelValue", false);
    };
    watchEffect(() => {
      if (props.modelValue) {
        setTimeout(close, props.duration);
      }
    });
    const { renderClass } = useRenderClass("toast");
    return { close, renderClass };
  }
});
</script>

<style scoped></style>
