<template>
  <div class="flex items-center">
    <app-button
      :disabled="isPlusDisable"
      @click="plus"
      class="w-10"
      v-bind="buttonProps"
    >
      +
    </app-button>
    <span class="w-10 text-center">{{ modelValue }}</span>
    <app-button
      :disabled="isMinusDisable"
      @click="minus"
      class="w-10"
      v-bind="buttonProps"
    >
      -
    </app-button>
  </div>
</template>

<script lang="ts">
<<<<<<< HEAD:src/components/numberPicker/TNumberPicker.vue
import { defineComponent, PropType } from "vue";
import AppButton from "@/components/button/TButton.vue";
=======
import { computed, defineComponent, PropType } from "vue";
import AppButton from "@/components/tailwind/TButton.vue";
>>>>>>> master:src/components/tailwind/numberPicker/TNumberPicker.vue
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
      type: Object as PropType<{ variant: string }>,
      default: () => ({ variant: "primary" })
    }
  },
  emits: {
    "update:modelValue"(value: number) {
      return typeof value === "number";
    }
  },
  setup(props, { emit }) {
    const isPlusDisable = computed(() => {
      return props.max !== undefined && props.max <= props.modelValue;
    });
    const isMinusDisable = computed(() => {
      return props.min >= props.modelValue;
    });

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
    return { plus, minus, isPlusDisable, isMinusDisable };
  }
});
</script>
