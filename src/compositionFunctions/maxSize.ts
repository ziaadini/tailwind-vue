import { computed } from "vue";
import { size } from "@/utility/css-helper";

export const useMaxWidth = maxSize =>
  computed((): string => {
    switch (maxSize) {
      case size.xs:
        return "max-w-1/4";
      case size.sm:
        return "max-w-1/2";
      case size.md:
        return "max-w-3/4";
      case size.lg:
        return "max-w-9/10";
      case size.full:
        return "max-w-full";
    }
    return "";
  });
