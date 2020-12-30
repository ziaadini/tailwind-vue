<template>
  <div class="flex items-center">
    <app-button @click="plus" v-bind="buttonProps">
      +
    </app-button>
    <span class="w-10 text-center">{{ modelValue }}</span>
    <app-button @click="minus" v-bind="buttonProps">
      -
    </app-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppButton from "@/components/AppButton.vue";
export default defineComponent({
  name: "AppNumberPicker",
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
