import { PropType } from "vue";
import { SwitchAndCheckbox } from "@/utility/types/base-component-types";
import { variants } from "@/utility/css-helper";

export default {
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
  },
  variant: {
    type: String,
    default: "primary",
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
