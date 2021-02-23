<template>
  <label
    data-name="checkbox-container"
    :class="[
      renderClass('flex justify-start items-start', 'container'),
      $attrs.class,
      {
        'cursor-pointer': !disabled,
        [activeClass]: isChecked,
        [inActiveClass]: !isChecked
      }
    ]"
  >
    <span
      data-name="checkbox-inputContainer"
      :class="[
        {
          [`bg-${variant} border-${variant}`]: isChecked && !hideInput,
          'bg-white border-gray-400': !isChecked && !hideInput
        },
        hideInput ? 'w-0 h-0' : 'w-6 h-6 border-2 mr-2',
        renderClass(
          'rounded-xs flex flex-shrink-0 justify-center items-center',
          'inputContainer'
        )
      ]"
    >
      <input
        type="checkbox"
        class="opacity-0 absolute"
        :class="{ 'cursor-pointer': !disabled }"
        v-bind="$attrs"
        :disabled="disabled"
        :checked="isChecked"
        :value="value"
        @change="updateInput"
      />
      <svg
        class="text-white fill-current hidden w-4 h-4 pointer-events-none"
        viewBox="0 0 20 20"
      >
        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
      </svg>
    </span>
    <span
      data-name="checkbox-label"
      v-if="label"
      :class="[{ 'text-gray-500': disabled }, renderClass('mr-2', 'label')]"
    >
      {{ label }}
    </span>
    <slot name="label" :isChecked="isChecked" :disabled="disabled"></slot>
  </label>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted } from "vue";
import SwitchAndCheckboxProps from "@/utility/commonProps/SwitchAndCheckboxProps";
import { useSwitchAndCheckbox } from "@/compositionFunctions/switchAndCheckbox";
import { useRenderClass } from "@/compositionFunctions/settings";

export default defineComponent({
  props: {
    ...SwitchAndCheckboxProps(),
    activeClass: {
      type: String,
      default: () => inject("t-checkbox-activeClass", "")
    },
    inActiveClass: { type: String, default: "" },
    hideInput: {
      type: Boolean,
      default: () => false
    }
  },
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
    const { renderClass } = useRenderClass("checkbox");
    return { isChecked, updateInput, renderClass };
  }
});
</script>

<style scoped>
input:checked + svg {
  display: block;
}
</style>
