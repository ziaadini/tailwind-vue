<template>
  <!-- text input label -->
  <label
    v-if="label"
    data-name="textinput-label"
    :class="[renderClass('block text-sm font-medium text-right', 'label')]"
  >
    {{ label }}
  </label>

  <!-- text input wrapper -->
  <div
    data-name="textinput-wrapper"
    :class="[
      renderClass('mt-1 relative min-content-height', 'wrapper', {
        'rounded-full': rounded,
        'rounded-sm': !rounded
      })
    ]"
  >
    <!-- left icon section -->
    <div
      v-if="leftPadding"
      data-name="textinput-leftIcon"
      :class="[
        renderClass(
          'absolute inset-y-0 z-10 left-2 flex pointer-events-none items-center ' +
            leftIconColor,
          'leftIcon'
        )
      ]"
    >
      <t-icon v-if="leftIcon" :name="leftIcon"> </t-icon>
      <template v-else>
        <slot name="leftSlot" />
      </template>
    </div>
    <!-- input element -->
    <component
      :is="inputType"
      ref="input"
      :inputmode="inputMode"
      :type="type"
      :disabled="disabled"
      v-bind="$attrs"
      :value="modelValue"
      @input="updateFunction($event.target.value)"
      data-name="textinput-input"
      :class="[
        renderClass(
          'block h-9 w-full sm:text-sm outline-none ' + variantClasses,
          'input',
          {
            'pr-8': rightPadding,
            'pr-3': !rightPadding,
            'pl-8': leftPadding,
            'pl-3': !leftPadding,
            'rounded-full': rounded && !area,
            'rounded-sm': !rounded,
            'text-right': isRight,
            'text-center': isCenter,
            'text-left': isLeft
          }
        )
      ]"
    />
    <!-- right icon section -->
    <div
      v-if="rightPadding"
      data-name="textinput-rightIcon"
      :class="[
        renderClass(
          'absolute inset-y-0 right-2 flex pointer-events-none items-center z-10 ' +
            rightIconColor,
          'rightIcon'
        )
      ]"
    >
      <t-icon v-if="rightIcon" :name="rightIcon"> </t-icon>
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
  variants
} from "@/utility/css-helper";
import {
  computed,
  defineComponent,
  inject,
  nextTick,
  ref,
  toRefs,
  watch
} from "vue";
import { formatHandlerWrapper, numberFormat } from "@/helpers/generalHelper";
import TIcon from "@/components/tailwind/icon/TIcon.vue";
import { useRenderClass } from "@/compositionFunctions/settings";

const component = (propName: string) => "t-textinput-" + propName;
export default defineComponent({
  name: "TTextInput",
  components: { TIcon },
  props: {
    variant: {
      type: String,
      default: () => inject(component("variant"), variants.white),
      validator: (propValue: string) => {
        return !!variants[propValue];
      }
    },
    hover: {
      type: Boolean,
      default: () => inject(component("hover"), false)
    },
    type: {
      required: false,
      type: String,
      default: () => inject(component("type"), "text")
    },
    inputmode: {
      required: false,
      type: String,
      default: () => inject(component("inputmode"), "text")
    },
    label: {
      required: false,
      type: String,
      default: ""
    },
    leftIcon: {
      required: false,
      type: String,
      default: ""
    },
    rightIcon: {
      required: false,
      type: String,
      default: () => ""
    },
    leftIconColor: {
      required: false,
      type: String,
      default: () => inject(component("leftIconColor"), "")
    },
    rightIconColor: {
      required: false,
      type: String,
      default: () => inject(component("rightIconColor"), "")
    },
    rounded: {
      type: Boolean,
      required: false,
      default: () => inject(component("rounded"), false)
    },
    align: {
      type: String,
      required: false,
      validator: (propValue: string) => {
        return !!textInputAlignments[propValue];
      },
      default: () => inject(component("align"), textInputAlignments.right)
    },
    modelValue: {
      type: String,
      required: true
    },
    modelModifiers: {
      default: () => ({} as any)
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false
    },
    error: {
      type: Boolean,
      required: false,
      default: false
    },
    area: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  setup(props, { slots, emit }) {
    // handle text variant
    const variantClasses = computed((): string => {
      let classes = "";
      classes += `bg-white text-input-placehoder-black text-dark border ${
        props.error
          ? "border-red-500"
          : `border-${
              props.variant === variants.white ? "gray-300" : props.variant
            }-100 focus:border-${
              props.variant === variants.white ? "gray-600" : props.variant
            }`
      }  ${props.hover ? `hover:bg-${props.variant}-50` : ""}`;

      classes +=
        " border transition hover:opacity-80 shadow-sm hover:shadow-md disabled:opacity-50";
      return classes;
    });

    const rightPadding = computed(
      (): boolean => !!(slots.rightSlot || props.rightIcon)
    );
    const leftPadding = computed(
      (): boolean => !!(slots.leftSlot || props.leftIcon)
    );
    const isRight = (): boolean => {
      return props.align === textInputAlignments.right;
    };
    const isLeft = (): boolean => {
      return props.align === textInputAlignments.left;
    };
    const isCenter = (): boolean => {
      return props.align === textInputAlignments.center;
    };
    const { modelValue } = toRefs(props);
    const input = ref(null);

    const [formatFounded, args] = formatHandlerWrapper(
      modifierVariants.format,
      props.modelModifiers
    );

    // handling how to update textinput modelValue
    const updateFunction = formatFounded
      ? async value => {
          const formattedValue = numberFormat(value, args[0], args[1]);
          emit("update:modelValue", formattedValue.split(args[0]).join(""));
          await nextTick();
          // @ts-ignore
          input.value.value = formattedValue;
        }
      : value => {
          emit("update:modelValue", value);
        };

    // watch for modelValue changes
    watch(modelValue, value => {
      updateFunction(value);
    });

    // handle input mode when format is passed as modifier
    const inputMode = computed(function() {
      if (formatFounded) {
        return "numeric";
      }
      return props.inputmode;
    });

    enum inputTypes {
      input = "input",
      textarea = "textarea"
    }

    // handle input type (textarea or input)
    const inputType = computed(() => {
      return !props.area ? inputTypes.input : inputTypes.textarea;
    });

    const { renderClass } = useRenderClass("textinput");

    return {
      rightPadding,
      leftPadding,
      variantClasses,
      isRight,
      isLeft,
      isCenter,
      updateFunction,
      input,
      inputMode,
      inputType,
      renderClass
    };
  },
  watch: {},
  methods: {}
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

textarea::-webkit-outer-spin-button,
textarea::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
// textarea[type="number"] {
//   -moz-appearance: textfield;
// }

// textarea::-webkit-input-placeholder {
//   line-height: 3rem;
// }
// textarea:-moz-placeholder {
//   /* Firefox 18- */
//   line-height: 3rem;
// }
// textarea::-moz-placeholder {
//   /* Firefox 19+ */
//   line-height: 3rem;
// }
// textarea:-ms-input-placeholder {
//   line-height: 2.5rem;
// }
</style>
