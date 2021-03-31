import * as components from "@/components/tailwind";

export * from "@/components/tailwind";
export { useDebouncedRef } from "@/compositionFunctions/expose/debounce";
export { useFormatRef } from "@/compositionFunctions/expose/format";
export { TSettings, TSettingItem } from "@/utility/types/TSettings";

const install = app => {
  Object.keys(components).forEach(name => {
    app.component(name, components[name]);
  });
};

export default install;
