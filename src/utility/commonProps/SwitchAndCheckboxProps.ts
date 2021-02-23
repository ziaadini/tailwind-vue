import { inject, PropType } from "vue";
import { SwitchAndCheckbox } from "@/utility/types/base-component-types";
import { variants } from "@/utility/css-helper";

export default (isCheckbox = true) => {
  const component = isCheckbox ? "t-checkbox" : "t-switch";
  return {
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
      default: () => inject(`${component}-trueValue`, 1)
    },
    falseValue: {
      type: [Array, String, Number, Boolean, Object] as PropType<
        SwitchAndCheckbox.Value
      >,
      default: () => inject(`${component}-falseValue`, 0)
    },
    variant: {
      type: String,
      default: () => inject(`${component}-variant`, "primary"),
      validator: (propValue: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        return !!variants[propValue];
      }
    },
    disabled: {
      type: Boolean,
      default: () => false
    }
  };
};
