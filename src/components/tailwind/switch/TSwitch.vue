<template>
  <div
    class="flex justify-between items-center"
    :class="{ 'cursor-pointer': !disabled }"
    @click="updateInput"
  >
    <div
      class="w-16 h-8 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out"
      :class="{ [`bg-${variant}`]: isChecked }"
    >
      <div
        class="bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out"
        :class="{ '-translate-x-8': isChecked }"
      ></div>
    </div>
    <label
      class="mr-2"
      :class="{ 'text-gray-500': disabled, 'cursor-pointer': !disabled }"
      >{{ label }}</label
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import SwitchAndCheckboxProps from "@/utility/commonProps/SwitchAndCheckboxProps";
import { useSwitchAndCheckbox } from "@/compositionFunctions/switchAndCheckbox";

export default defineComponent({
  props: SwitchAndCheckboxProps,
  emits: ["update:modelValue"],
  setup(props, context) {
    onMounted(() => {
      if (Array.isArray(props.modelValue) && props.value === undefined) {
        console.error(
          "TSwitchError: v-model is Array but value is undefined you should pass a value"
        );
      }
    });
    const { isChecked, updateInput } = useSwitchAndCheckbox(props, context);
    return { isChecked, updateInput };
  }
});
</script>
