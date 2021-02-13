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
    <!-- left icon section -->
    <div
      v-if="leftPadding"
      class="absolute inset-y-0 left-2 flex items-center  pointer-events-none"
    >
      <t-icon
        v-if="leftIcon"
        class="material-icons z-10"
        :class="[{ 'text-gray-200': disabled }, leftIconColor]"
        :name="leftIcon"
      >
      </t-icon>
      <template v-else>
        <slot name="leftSlot" />
      </template>
    </div>
    <!-- input element -->
    <input
      ref="textInputRef"
      :inputmode="inputMode"
      :type="type"
      :disabled="disabled"
      v-bind="$attrs"
      :value="modelValue"
      @input="updateFunction($event.target.value)"
      class="block min-h-48 w-full sm:text-sm outline-none h-10"
      :class="[
        {
          'pr-8': rightPadding,
          'pr-3': !rightPadding,
          'pl-8': leftPadding,
          'pl-3': !leftPadding,
          'rounded-full': rounded,
          'rounded-sm': !rounded,
          'text-right': isRight,
          'text-center': isCenter,
          'text-left': isLeft,
        },
        variantClasses,
      ]"
    />
    <!-- right icon section -->
    <div
      v-if="rightPadding"
      class="absolute inset-y-0 right-2 flex items-center pointer-events-none"
    >
      <t-icon
        v-if="rightIcon"
        class="material-icons z-10"
        :class="[{ 'text-gray-200': disabled }, rightIconColor]"
        :name="rightIcon"
      >
      </t-icon>
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
import { computed, defineComponent, nextTick, ref, toRefs, watch } from "vue";
import { formatHandlerWrapper, numberFormat } from "@/helpers/generalHelper";
import TIcon from "@/components/tailwind/icon/TIcon.vue";
export default defineComponent({
  name: "TTextInput",
  components: { TIcon },
  props: {
    variant: {
      type: String,
      default: "primary",
      validator: (propValue: string) => {
        return !!variants[propValue];
      },
    },
    type: {
      required: false,
      type: String,
      default: "text",
    },
    inputmode: {
      required: false,
      type: String,
      default: "text",
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
      default: textInputAlignments.right,
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
  computed: {},
  setup(props, { slots, emit }) {
    const { modelValue } = toRefs(props);
    const textInputRef = ref(null);

    const [formatFounded, args] = formatHandlerWrapper(
      modifierVariants.format,
      props.modelModifiers
    );

    const updateFunction = formatFounded
      ? async (value) => {
          value = value.replace(args[0], "");
          const formattedValue = numberFormat(value, args[0], args[1]);
          emit("update:modelValue", value);
          await nextTick();
          // @ts-ignore
          textInputRef.value.value = formattedValue;
        }
      : (value) => {
          emit("update:modelValue", value);
        };

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

    const isRight = (): boolean => {
      return props.align === textInputAlignments.right;
    };
    const isLeft = (): boolean => {
      return props.align === textInputAlignments.left;
    };
    const isCenter = (): boolean => {
      return props.align === textInputAlignments.center;
    };

    watch(modelValue, (value) => {
      updateFunction(value);
    });

    const inputMode = computed(() => {
      if (formatFounded) {
        return 'numeric';
      } 
      return props.inputmode
    })

    return {
      rightPadding,
      leftPadding,
      variantClasses,
      isRight,
      isLeft,
      isCenter,
      updateFunction,
      textInputRef,
      inputMode
    };
  },
  watch: {},
  methods: {},
});
</script>

<style lang="scss">
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
