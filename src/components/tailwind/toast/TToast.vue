<template>
  <div
    class="fixed z-20 w-max right-1/2 transform translate-x-1/2 transition-all text-white ease-in-out rounded-sm max-w-9/10  p-2 duration-500"
    :class="[
      `bg-${variant}`,
      {
        'bottom-10 scale-100 opacity-95': modelValue,
        '-bottom-full opacity-0 scale-0': !modelValue
      }
    ]"
  >
    <slot :close="close"></slot>
    {{ message }}
  </div>
</template>

<script>
import { watchEffect } from "vue";

export default {
  name: "TToast",
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: "success"
    },
    duration: {
      type: Number,
      default: 3000
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
    return { close };
  }
};
</script>

<style scoped></style>
