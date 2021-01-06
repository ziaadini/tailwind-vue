<template>
  <label class="flex items-center" :class="{ 'cursor-pointer': !disabled }">
    <div
      :class="isChecked ? `border-${variant}` : 'bg-white border-gray-400'"
      class="border-2 rounded-full w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2"
    >
      <input
        :class="[{ 'cursor-pointer': !disabled }, `checked:bg-${variant}`]"
        class="opacity-0 absolute"
        type="radio"
        v-bind="$attrs"
        :disabled="disabled"
        :value="value"
        v-model="computedValue"
      />

      <div
        class="w-3 h-3 rounded-full"
        :class="{ [`bg-${variant}`]: isChecked }"
      ></div>
    </div>
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
    const isChecked = computed(() => {
      return (
        (typeof props.value === "object" &&
          JSON.stringify(props.value) === JSON.stringify(props.modelValue)) ||
        props.value === props.modelValue
      );
    });
    watch(
      () => props.modelValue,
      val => {
        newValue.value = val;
      }
    );
    return { computedValue, isChecked };
  }
});
</script>
