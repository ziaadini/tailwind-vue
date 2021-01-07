<template>
  <div
    :class="{
      'rounded-full': rounded,
    }"
  >
    <label
      v-if="label"
      for="price"
      class="block text-sm font-medium text-gray-700 text-right"
    >
      {{ label }}
    </label>
    <div class="mt-1 relative rounded-md shadow-sm">
      <div
        v-if="leftPadding"
        class="absolute inset-y-0 left-2 flex items-center"
      >
        <span v-if="leftIcon" class="material-icons">
          {{ leftIcon }}
        </span>
        <template v-else>
          <slot name="rightSlot" />
        </template>
      </div>
      <input
        type="text"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        class="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300"
        :class="{
          ' pr-8': rightPadding,
          ' pr-3': !rightPadding,
          ' pl-8': leftPadding,
          ' pl0-3': !leftPadding,
          [variantClasses]: true,
        }"
      />
      <div
        v-if="rightPadding"
        class="absolute inset-y-0 right-2 flex items-center pointer-events-none"
      >
        <span v-if="rightIcon" class="material-icons">
          {{ rightIcon }}
        </span>
        <template v-else>
          <slot name="rightSlot" />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { textInputVariants, variants } from "@/utility/css-helper";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "TTextInput",
  props: {
    variant: {
      type: String,
      default: "primary",
      validator: (propValue: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        return !!variants[propValue];
      },
    },
    inputType: {
      type: String,
      default: "primary",
      validator: (propValue: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        return !!textInputVariants[propValue];
      },
    },
    label: {
      required: false,
      type: String,
      default: "",
    },
    leftIcon: {
      required: false,
      type: String,
      default: "",
    },
    rightIcon: {
      required: false,
      type: String,
      default: "",
    },
    modelValue: {
      type: String,
      required: true,
    },
    rounded: {
      type: Boolean,
      required: false,
      default: false,
    },
    outline: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props, { slots }) {
    const rightPadding = computed(
      (): boolean => !!(slots.rightSlot || props.rightIcon)
    );
    const leftPadding = computed(
      (): boolean => !!(slots.leftSlot || props.leftIcon)
    );

    const variantClasses = computed((): string => {
      const baseClass =
        " hover:opacity-80 transition text-white disabled:opacity-50";
      const outlineBaseClass =
        " transition ring-4 text-dark  hover:opacity-80 disabled:opacity-50";
      return (
        (() => {
          switch (props.variant) {
            case variants.primary:
              return !props.outline
                ? "bg-primary"
                : "bg-white ring-primary hover:bg-primary focus:ring-primary-500";
            case variants.success:
              return !props.outline
                ? "bg-success"
                : "bg-white ring-success hover:bg-success focus:success-indigo-500";
            case variants.danger:
              return !props.outline
                ? "bg-danger"
                : "bg-white ring-danger hover:bg-danger focus:ring-danger-500";
            case variants.warning:
              return !props.outline
                ? "bg-warning"
                : "bg-white ring-warning hover:bg-warning focus:ring-warning-500";
            default:
              return "";
          }
        })() + (props.outline ? outlineBaseClass : baseClass)
      );
    });

    return { rightPadding, leftPadding, variantClasses };
  },
});
</script>
