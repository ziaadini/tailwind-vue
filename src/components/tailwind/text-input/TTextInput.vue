<template>
  <div
    :class="{
      ' m-2': outline,
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
        @input="emitHandler"
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
import {
  modifierVariants,
  textInputAlignments,
  textInputVariants,
  variants,
} from "@/utility/css-helper";
import { computed, defineComponent } from "vue";
import { formatHandler } from "@/helpers/generalHelper";
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
          : `bg-white text-dark hover:bg-${props.variant}-50 ring-4 ring-${props.variant} focus:ring-${props.variant}-500 focus:border-${props.variant}-500`)
      );
    });

    return { rightPadding, leftPadding, variantClasses };
  },
  methods: {
    emitHandler(e: { target: { value: string } }) {
      const value = e.target.value;
      const keys = Object.keys(this.modelModifiers);
      const findKey = (type: modifierVariants) =>
        keys.findIndex((e) => e.includes(type));
      const retArgs = (str: string) => {
        if (str.split(":").length > 1) {
          const tmp = str.split(":");
          tmp.splice(0, 1);
          return tmp.length === 2 ? tmp : [...tmp, 3];
        }
        return [",", 3];
      };

      const callMethod = (str, modifierType: modifierVariants) => {
        const key = findKey(modifierType);
        const args = retArgs(keys[key]);

        return [key, args];
      };

      const [index, args] = callMethod(value, modifierVariants.format);
      console.log(args, value, keys);

      console.log(args);
      if (index !== -1) {
        console.log(args);
        e.target.value = formatHandler(value, {
          separator: args[0],
          digitLength: args[1],
        });
      }

      this.$emit("update:modelValue", e.target.value);
    },
  },
});
</script>
