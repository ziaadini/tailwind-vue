<template>
  <div
    class="fixed w-max right-1/2 transform translate-x-1/2 transition-all text-white rounded-sm  p-2  max-w-full duration-1000"
    :class="[
      `bg-${variant}`,
      {
        'bottom-10': modelValue,
        '-bottom-full opacity-0': !modelValue
      }
    ]"
  >
    <slot></slot>
    {{ message }}
  </div>
</template>

<script>
import { watchEffect, watch, ref } from "vue";

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
  }
};
</script>

<style scoped></style>
