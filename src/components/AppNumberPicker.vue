<template>
  <div class="flex items-center">
    <button
      @click="plus"
      class="bg-primary w-10 h-10 text-white text-xl hover:bg-primary-dark focus:outline-none focus:bg-primary focus:ring rounded"
    >
      +
    </button>
    <span class="w-10 text-center">{{ modelValue }}</span>
    <button
      @click="minus"
      class="bg-primary w-10 h-10 text-white text-xl hover:bg-primary-dark focus:outline-none focus:bg-primary focus:ring rounded"
    >
      -
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "AppNumberPicker",
  props: {
    modelValue: {
      type: Number,
      required: true
    },
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number
    }
  },
  setup(props, { emit }) {
    const plus = () => {
      if (!props.max || props.max >= props.modelValue + 1) {
        emit("update:modelValue", props.modelValue + 1);
      }
    };
    const minus = () => {
      if (props.min <= props.modelValue - 1) {
        emit("update:modelValue", props.modelValue - 1);
      }
    };
    return { plus, minus };
  }
});
</script>

<style scoped></style>
