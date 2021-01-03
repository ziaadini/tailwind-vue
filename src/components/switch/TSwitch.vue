<template>
  <div class="flex justify-between items-center" @click="updateInput">
    <div
      class="w-16 h-8 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out"
      :class="{ 'bg-green-400': isChecked }"
    >
      <div
        class="bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out"
        :class="{ '-translate-x-8': isChecked }"
      ></div>
    </div>
    <label class="mr-2">{{ label }}</label>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, PropType } from "vue";
import { SwitchAndCheckbox } from "@/types/base-component-types";

export default defineComponent({
  props: {
    modelValue: {
      default: "",
      type: [Array, String, Number, Boolean, Object] as PropType<
        SwitchAndCheckbox.Value
      >
    },
    value: {
      type: [Array, String, Number, Boolean, Object] as PropType<
        SwitchAndCheckbox.Value | undefined
      >,
      default: () => undefined
    },
    label: { type: String, default: "" },
    trueValue: {
      type: [Array, String, Number, Boolean, Object] as PropType<
        SwitchAndCheckbox.Value
      >,
      default: 1
    },
    falseValue: {
      type: [Array, String, Number, Boolean, Object] as PropType<
        SwitchAndCheckbox.Value
      >,
      default: 0
    }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    onMounted(() => {
      if (Array.isArray(props.modelValue) && props.value === undefined) {
        console.error(
          "TSwitchError: v-model is Array but value is undefined you should pass a value"
        );
      }
    });
    const compare = (
      item1: SwitchAndCheckbox.Value | undefined,
      item2: SwitchAndCheckbox.Value | undefined
    ) => {
      if (typeof item1 === "object" && typeof item2 === "object") {
        return JSON.stringify(item1) === JSON.stringify(item2);
      }
      return item1 === item2;
    };

    const isChecked = computed((): boolean => {
      if (Array.isArray(props.modelValue)) {
        return props.modelValue.some(item => compare(item, props.value));
      }
      return compare(props.modelValue, props.trueValue);
    });
    const updateInput = () => {
      const isActive = !isChecked.value;
      if (Array.isArray(props.modelValue)) {
        const newValue = [...props.modelValue];
        if (isActive) {
          newValue.push(props.value);
        } else {
          newValue.splice(
            newValue.findIndex(item => compare(item, props.value)),
            1
          );
        }
        emit("update:modelValue", newValue);
      } else {
        emit(
          "update:modelValue",
          isActive ? props.trueValue : props.falseValue
        );
      }
    };

    return { isChecked, updateInput };
  }
});
</script>
