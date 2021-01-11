<template>
  <label
    v-if="label"
    for="price"
    class="block text-sm font-medium text-gray-700 text-right"
  >
    {{ label }}
  </label>
  <div class="mt-1 relative rounded-md shadow-sm">
    <div v-if="leftPadding" class="absolute inset-y-0 left-2 flex items-center">
      <span
        v-if="leftIcon"
        class="material-icons z-10"
        :class="{ 'text-gray-200': disabled }"
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
      :class="{
        ' pr-8': rightPadding,
        ' pr-3': !rightPadding,
        ' pl-8': leftPadding,
        ' pl0-3': !leftPadding,
        'rounded-full': rounded,
        'rounded-sm': !rounded,
        [variantClasses]: true,
        'text-right': isRight,
        'text-center': isCenter,
        'text-left': isLeft,
      }"
    />
    <div
      v-if="rightPadding"
      class="absolute inset-y-0 right-2 flex items-center pointer-events-none"
    >
      <span
        v-if="rightIcon"
        class="material-icons z-10"
        :class="{ 'text-gray-200': disabled }"
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
      return (
        (!props.outline
          ? "hover:opacity-80 transition text-white disabled:opacity-50 "
          : "transition hover:opacity-80 disabled:opacity-50 ") +
        (!props.outline
          ? `bg-${props.variant}`
          : `bg-white text-dark hover:bg-${props.variant}-50 border-4 border-${props.variant} focus:border-${props.variant}-500 focus:border-${props.variant}-500`)
      );
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
