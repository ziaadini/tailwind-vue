<template>
  <label
    data-name="radio-container"
    :class="[
      $attrs.class,
      renderClass('flex items-center', 'container'),
      {
        'cursor-pointer': !disabled,
        [activeClass]: isChecked,
        [inActiveClass]: !isChecked
      }
    ]"
  >
    <span
      data-name="radio-inputContainer"
      :class="[
        renderClass(
          'rounded-full flex flex-shrink-0 justify-center items-center',
          'inputContainer'
        ),
        {
          [`border-${variant}`]: isChecked && !hideInput,
          'bg-white border-gray-400': !isChecked && !hideInput
        },
        hideInput ? 'w-0 h-0' : 'w-6 h-6 border-2 mr-2'
      ]"
    >
      <input
        :class="[{ 'cursor-pointer': !disabled }, `checked:bg-${variant}`]"
        class="opacity-0 absolute"
        type="radio"
        v-bind="$attrs"
        :disabled="disabled"
        :value="value"
        v-model="computedValue"
      />

      <span
        class="w-3 h-3 rounded-full"
        :class="{ [`bg-${variant}`]: isChecked, hidden: hideInput }"
      ></span>
    </span>
    <span
      data-name="radio-label"
      v-if="label"
      :class="[{ 'text-gray-500': disabled }, renderClass('mr-2', 'label')]"
    >
      {{ label }}
    </span>
    <slot name="label" :isChecked="isChecked" :disabled="disabled"></slot>
  </label>
</template>

<script lang="ts">
import { defineComponent, computed, ref, watch, PropType, inject } from "vue";
import { SwitchAndCheckbox } from "@/utility/types/base-component-types";
import { variants } from "@/utility/css-helper";
import { useRenderClass } from "@/compositionFunctions/settings";

export default defineComponent({
  name: "TRadio",
  inheritAttrs: false,
  props: {
    modelValue: [String, Number, Boolean, Object, Array] as PropType<
      SwitchAndCheckbox.Value
    >,
    value: [String, Number, Boolean, Object, Array],
    disabled: Boolean,
    label: { type: String, default: "" },
    variant: {
      type: String,
      default: () => inject("t-radio-variant", "primary"),
      validator: (propValue: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        return !!variants[propValue];
      }
    },
    activeClass: {
      type: String,
      default: () => inject("t-radio-activeClass", "")
    },
    inActiveClass: {
      type: String,
      default: () => inject("t-radio-inActiveClass", "")
    },
    hideInput: {
      type: Boolean,
      default: () => false
    }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const newValue = ref(props.modelValue);
    const computedValue = computed({
      get: () => {
        return newValue.value;
      },
      set: val => {
        newValue.value = val;
        emit("update:modelValue", val);
      }
    });
    const isChecked = computed(() => {
      return (
        (typeof props.value === "object" &&
          JSON.stringify(props.value) === JSON.stringify(props.modelValue)) ||
        props.value === props.modelValue
      );
    });
    watch(
      () => props.modelValue,
      val => {
        newValue.value = val;
      }
    );
    const { renderClass } = useRenderClass("radio");
    return { computedValue, isChecked, renderClass };
  }
});
</script>
