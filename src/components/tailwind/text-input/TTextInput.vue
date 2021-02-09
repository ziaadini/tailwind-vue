<template>
  <label
    v-if="label"
    class="block text-sm font-medium text-gray-700 text-right"
  >
    {{ label }}
  </label>
  <div
    class="mt-1 relative"
    :class="{
      'rounded-full': rounded,
      'rounded-sm': !rounded,
    }"
  >
    <div v-if="leftPadding" class="absolute inset-y-0 left-2 flex items-center">
      <span
        v-if="leftIcon"
        class="material-icons z-10"
        :class="[{ 'text-gray-200': disabled }, leftIconColor]"
      >
        {{ leftIcon }}
      </span>
      <template v-else>
        <slot name="rightSlot" />
      </template>
    </div>
    <input
      type="text"
      :disabled="disabled"
      v-bind="$attrs"
      :value="modelValue"
      @input="emitHandler($event.target.value)"
      class="block min-h-48 w-full sm:text-sm outline-none h-10"
      :class="[
        {
          'pr-8': rightPadding,
          'rounded-full': rounded,
          'rounded-sm': !rounded,
          'pr-3': !rightPadding,
          'pl-8': leftPadding,
          'pl0-3': !leftPadding,
          'text-right': isRight,
          'text-center': isCenter,
          'text-left': isLeft,
        },
        variantClasses,
      ]"
    />
    <div
      v-if="rightPadding"
      class="absolute inset-y-0 right-2 flex items-center pointer-events-none"
    >
      <span
        v-if="rightIcon"
        class="material-icons z-10"
        :class="[{ 'text-gray-200': disabled }, rightIconColor]"
      >
        {{ rightIcon }}
      </span>
      <template v-else>
        <slot name="rightSlot" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import {
  modifierVariants,
  textInputAlignments,
  textInputVariants,
  variants,
} from "@/utility/css-helper";
import { computed, defineComponent } from "vue";
import { formatHandler, formatHandlerWrapper } from "@/helpers/generalHelper";
export default defineComponent({
  name: "TTextInput",
  props: {
    variant: {
      type: String,
      default: "primary",
      validator: (propValue: string) => {
        return !!variants[propValue];
      },
    },
    inputType: {
      type: String,
      default: "primary",
      validator: (propValue: string) => {
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
    leftIconColor: {
      required: false,
      type: String,
      default: "",
    },
    rightIconColor: {
      required: false,
      type: String,
      default: "",
    },
    rounded: {
      type: Boolean,
      required: false,
      default: false,
    },
    outline: {
      type: Boolean,
      required: false,
      default: true,
    },
    align: {
      type: String,
      required: false,
      default: "right",
      validator: (propValue: string) => {
        return !!textInputAlignments[propValue];
      },
    },
    modelValue: {
      type: String,
      required: true,
    },
    modelModifiers: {
      default: () => ({} as any),
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
    error: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    isRight(): boolean {
      return this.align === textInputAlignments.right;
    },
    isLeft(): boolean {
      return this.align === textInputAlignments.left;
    },
    isCenter(): boolean {
      return this.align === textInputAlignments.center;
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
      let classes = "";
      if (!props.outline) {
        classes += `${
          props.variant === variants.white ? "text-dark" : "text-white"
        } ${
          props.error ? "bg-red-300 border-red-200" : "bg-" + props.variant
        } ${
          props.variant === variants.white
            ? "placeholder-gray-300"
            : "placeholder-white"
        }`;
      } else {
        classes += `bg-white text-input-placehoder-black text-dark border ${
          props.error
            ? "border-red-500"
            : `border-${
                props.variant === variants.white ? "gray" : props.variant
              }-50 focus:border-${
                props.variant === variants.white ? "gray-400" : ""
              } hover:bg-${props.variant}-50`
        }`;
      }

      classes +=
        " border transition hover:opacity-80 shadow-sm hover:shadow disabled:opacity-50";
      return classes;
    });

    return { rightPadding, leftPadding, variantClasses };
  },
  watch: {
    modelValue: {
      immediate: true,
      handler(value: string) {
        this.emitHandler(value, true);
      },
    },
  },
  methods: {
    emitHandler(value: string, watchCommitted = false) {
      const [formatFounded, args] = formatHandlerWrapper(
        modifierVariants.format,
        this.modelModifiers
      );

      if (formatFounded) {
        value = formatHandler(value, {
          separator: args[0],
          digitLength: args[1],
        });
        watchCommitted && this.$emit("update:modelValue", value);
      }

      !watchCommitted && this.$emit("update:modelValue", value);
    },
  },
});
</script>

<style lang="scss"></style>
