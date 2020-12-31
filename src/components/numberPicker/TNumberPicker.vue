<template>
  <div class="flex items-center">
    <app-button @click="plus" class="w-10" v-bind="buttonProps">
      +
    </app-button>
    <span class="w-10 text-center">{{ modelValue }}</span>
    <app-button @click="minus" class="w-10" v-bind="buttonProps">
      -
    </app-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppButton from "@/components/TButton.vue";
export default defineComponent({
  name: "TNumberPicker",
  components: { AppButton },
  props: {
    modelValue: {
      type: Number,
      default: 1
    },
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number
    },
    buttonProps: {
      type: Object,
      default: () => {
        return { variant: "primary" };
      }
    }
  },
  emits: {
    "update:modelValue"(value: number) {
      return typeof value === "number";
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
