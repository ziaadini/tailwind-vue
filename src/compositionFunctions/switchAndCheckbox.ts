import { SwitchAndCheckbox } from "@/utility/types/base-component-types";
import { computed } from "vue";

export const useSwitchAndCheckbox = (props, { emit }) => {
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
  const updateInput = e => {
    if (!props.disabled) {
      const isActive = e?.target?.checked ?? !isChecked.value;
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
    }
  };

  return { isChecked, updateInput };
};
