<template>
  <div class="flex items-center">
    <template v-if="hasPlusSlot">
      <slot
        name="plus"
        :disabled="isPlusDisable || loading"
        :loading="loading"
        :click="plus"
      ></slot>
    </template>
    <template v-else>
      <t-button
        data-name="numberPicker-plus"
        :disabled="isPlusDisable || loading"
        @click="plus"
        :class="renderClass('w-10', 'plus')"
        v-bind="buttonProps"
      >
        +
      </t-button>
    </template>

    <template v-if="hasTextSlot">
      <slot
        name="text"
        :value="modelValue"
        :disabled="isMinusDisable || loading"
        :loading="loading"
      ></slot>
    </template>
    <template v-else>
      <div class="w-10 text-center">
        <template v-if="loading">
          <slot name="loading"></slot>
          <t-loading
            data-name="numberPicker-loading"
            :class="renderClass('number-picker-loading', 'loading')"
            v-if="!hasLoadingSlot"
            v-bind="loadingProps"
          ></t-loading>
        </template>
        <template v-else>
          <span
            data-name="numberPicker-text"
            :class="renderClass('number-picker-text', 'text')"
            >{{ modelValue }}</span
          >
        </template>
      </div>
    </template>
    <template v-if="hasMinusSlot">
      <slot
        name="minus"
        :disabled="isMinusDisable || loading"
        :loading="loading"
        :click="minus"
      ></slot>
    </template>
    <template v-else>
      <t-button
        data-name="numberPicker-minus"
        :disabled="isMinusDisable || loading"
        @click="minus"
        :class="renderClass('w-10', 'minus')"
        v-bind="buttonProps"
      >
        -
      </t-button>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType } from "vue";
import TButton from "@/components/tailwind/button/TButton.vue";
import TLoading from "@/components/tailwind/loading/TLoading.vue";
import { useRenderClass } from "@/compositionFunctions/settings";
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
      default: () => inject("t-number-picker-min", 1)
    },
    max: {
      type: Number,
      default: () => inject("t-number-picker-max", undefined)
    },
    buttonProps: {
      type: Object as PropType<{ variant: string; [key: string]: any }>,
      default: () =>
        inject("t-number-picker-buttonProps", { variant: "primary" })
    },
    loadingProps: {
      type: Object as PropType<{ variant: string; [key: string]: any }>,
      default: () =>
        inject("t-number-picker-loadingProps", {
          variant: "secondary",
          type: "spinner"
        })
    },
    loading: {
      type: Boolean,
      default: () => inject("t-number-picker-loadingProps", false)
    }
  },
  emits: {
    "update:modelValue"(value: number) {
      return typeof value === "number";
    }
  },
  setup(props, { emit, slots }) {
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
    const { renderClass } = useRenderClass("numberPicker");
    return {
      renderClass,
      plus,
      minus,
      isPlusDisable,
      isMinusDisable,
      hasPlusSlot: !!slots.plus,
      hasMinusSlot: !!slots.minus,
      hasTextSlot: !!slots.text,
      hasLoadingSlot: !!slots.loading
    };
  }
});
</script>
