<template>
  <div class="flex items-center">
    <t-button
      :disabled="isPlusDisable || loading"
      @click="plus"
      class="w-10"
      v-bind="buttonProps"
    >
      +
    </t-button>
    <div class="w-10 text-center">
      <template v-if="loading">
        <t-loading v-bind="loadingProps"></t-loading>
      </template>
      <template v-else>
        {{ modelValue }}
      </template>
    </div>
    <t-button
      :disabled="isMinusDisable || loading"
      @click="minus"
      class="w-10"
      v-bind="buttonProps"
    >
      -
    </t-button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import TButton from "@/components/tailwind/button/TButton.vue";
import TLoading from "@/components/tailwind/loading/TLoading.vue";
export default defineComponent({
  name: "TNumberPicker",
  components: { TLoading, TButton },
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
      type: Object as PropType<{ variant: string; [key: string]: any }>,
      default: () => ({ variant: "primary" })
    },
    loadingProps: {
      type: Object as PropType<{ variant: string; [key: string]: any }>,
      default: () => ({ variant: "secondary", type: "spinner" })
    },
    loading: {
      type: Boolean,
      default: true
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
