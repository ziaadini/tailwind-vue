<template>
  <label class="flex items-center" :class="{ 'cursor-pointer': !disabled }">
    <input
      :class="[{ 'cursor-pointer': !disabled }, `checked:bg-${variant}`]"
      class="appearance-none w-5 h-5 rounded-full border-2 border-gray-500 focus:outline-none  checked:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
      type="radio"
      v-bind="$attrs"
      :disabled="disabled"
      :value="value"
      v-model="computedValue"
    />
    <span class="mr-2" :class="{ 'text-gray-500': disabled }">
      {{ label }}
    </span>
  </label>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, PropType } from "vue";
import { SwitchAndCheckbox } from "@/types/base-component-types";
import { variants } from "@/utility/css-helper";

export default defineComponent({
  name: "TRadio",
  props: {
    modelValue: [String, Number, Boolean, Object, Array] as PropType<
      SwitchAndCheckbox.Value
    >,
    value: [String, Number, Boolean, Function, Object, Array],
    disabled: Boolean,
    label: { type: String, default: "" },
    variant: {
      type: String,
      default: "primary",
      validator: (propValue: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        return !!variants[propValue];
      }
    }
  },
  inheritAttrs: false,
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const newValue = ref(props.modelValue);
    const computedValue = computed({
      get: () => {
        return newValue.value;
      },
      set: val => {
        newValue.value = val;
        emit("update:modelValue", val);
      }
    });
    watch(
      () => props.modelValue,
      val => {
        newValue.value = val;
      }
    );
    return { computedValue };
  }
});
</script>
