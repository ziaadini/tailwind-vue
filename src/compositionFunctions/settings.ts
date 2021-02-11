import { computed, inject } from "vue";
import { TSettings, TSettingItem } from "@/utility/types/TSettings";

export const useRenderClass = (componentName: string) => {
  const TSettings = inject<TSettings>("TSettings");
  const renderClass = computed(
    () => (className: string, elementName: string, objectBinding = {}) => {
      let result = className;
      for (const k in objectBinding) {
        console.log("objectBinding[k]", k, "->", objectBinding[k]);
        if (objectBinding[k]) {
          console.log("k is ", k);
          result += " " + k + " ";
        }
      }
      const settings: TSettingItem | null =
        TSettings &&
        TSettings[componentName] &&
        TSettings[componentName][elementName]
          ? TSettings[componentName][elementName]
          : null;
      if (settings) {
        if (settings.delete) {
          console.log("settings.delete", settings.delete);
          settings.delete.forEach(item => {
            result = result.replace(item, "");
          });
        }
        if (settings.add) {
          result += " " + settings.add;
        }
        if (settings.replace) {
          for (const key in settings.replace) {
            result = result.replace(key, settings.replace[key]);
          }
        }
      }
      return result;
    }
  );

  return { renderClass };
};
