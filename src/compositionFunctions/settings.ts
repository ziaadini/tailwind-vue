import { computed, inject, getCurrentInstance } from "vue";
import { TSettings, TSettingItem } from "@/utility/types/TSettings";

export const useRenderClass = (componentName: string) => {
  const TSettings = inject<TSettings>("TSettings");
  const instance = getCurrentInstance();

  const renderClass = computed(
    () => (className: string, elementName: string, objectBinding = {}) => {
      const getSettings = computed((): TSettingItem | null => {
        let s: TSettingItem | undefined =
          TSettings?.[componentName]?.[elementName];
        const dataDelete = instance?.attrs?.[`data-${elementName}-delete`];
        const dataAdd = instance?.attrs?.[`data-${elementName}-add`];
        if (dataDelete && typeof dataDelete === "string") {
          if (!s) {
            s = {};
          }
          if (!s.delete) {
            s.delete = [];
          }
          s.delete = [...s.delete, ...dataDelete.split(" ")];
        }
        if (dataAdd) {
          if (!s) {
            s = {};
          }
          if (!s.add) {
            s.add = "";
          }
          s.add += " " + dataAdd;
        }
        return s || null;
      });
      let result = className;
      for (const k in objectBinding) {
        if (objectBinding[k]) {
          result += " " + k + " ";
        }
      }
      const settings = getSettings.value;
      if (settings) {
        if (settings.add) {
          result += " " + settings.add;
        }
        if (settings.delete) {
          settings.delete.forEach(item => {
            result = result.replace(item, "");
          });
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
