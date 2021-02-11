<template>
  <div
    data-name="switch-container"
    :class="[
      { 'cursor-pointer': !disabled },
      renderClass('flex justify-between items-center', 'container')
    ]"
    @click="updateInput"
  >
    <div
      data-name="switch-pan"
      :class="[
        renderClass(
          `${
            isChecked ? `bg-${variant}` : ''
          } w-16 h-8 flex items-center bg-gray-300 rounded-full p-1 duration-300 ease-in-out`,
          'pan'
        )
      ]"
    >
      <div
        data-name="switch-circle"
        :class="[
          { '-translate-x-8': isChecked },
          renderClass(
            'bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out',
            'circle'
          )
        ]"
      ></div>
    </div>
    <label
      :class="[
        { 'text-gray-500': disabled, 'cursor-pointer': !disabled },
        renderClass('mr-2', 'label')
      ]"
      >{{ label }}</label
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import SwitchAndCheckboxProps from "@/utility/commonProps/SwitchAndCheckboxProps";
import { useSwitchAndCheckbox } from "@/compositionFunctions/switchAndCheckbox";
import { useRenderClass } from "@/compositionFunctions/settings";

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
    const { renderClass } = useRenderClass("switch");
    return { isChecked, updateInput, renderClass };
  }
});
</script>
