<template>
  <label class="flex items-center" :class="{ 'cursor-pointer': !disabled }">
    <input
      :class="{ 'cursor-pointer': !disabled }"
      class="w-5 h-5 rounded shadow-sm disabled:opacity-50 disabled:cursor-not-allowed text-blue-500 border-gray-300"
      type="checkbox"
      v-bind="$attrs"
      :disabled="disabled"
      :checked="isChecked"
      :value="value"
      @change="updateInput"
    />
    <span class="mr-2" :class="{ 'text-gray-500': disabled }">
      {{ label }}
    </span>
  </label>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import SwitchAndCheckboxProps from "@/utility/commonProps/SwitchAndCheckboxProps";
import { useSwitchAndCheckbox } from "@/compositionFunctions/switchAndCheckbox";

export default defineComponent({
  props: SwitchAndCheckboxProps,
  inheritAttrs: false,
  emits: ["update:modelValue"],
  setup(props, context) {
    onMounted(() => {
      if (Array.isArray(props.modelValue) && props.value === undefined) {
        console.error(
          "TCheckboxError: v-model is Array but value is undefined you should pass a value"
        );
      }
    });
    const { isChecked, updateInput } = useSwitchAndCheckbox(props, context);
    return { isChecked, updateInput };
  }
});
</script>
