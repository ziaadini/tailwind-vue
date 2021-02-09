import { customRef } from "vue";
import { numberFormat } from "@/helpers/generalHelper";
export const useFormatRef = (
  value: string | number,
  separator = ",",
  digitLength = 3
) => {
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return numberFormat(value, separator, digitLength);
      },
      set(newValue: string | number) {
        value = newValue;
        trigger();
      }
    };
  });
};
