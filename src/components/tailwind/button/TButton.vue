<template>
  <!-- component wrapper for button router link and nuxt link -->
  <component
    :is="wrapperComponent"
    :to="to"
    :disabled="disabled"
    data-name="button-container"
    :class="[
      renderClass(
        `${variantClasses} flex justify-center items-center px-4 py-2 shadow relative rounded-sm border-1 focus:outline-none`,
        'container',
        {
          'rounded-full': rounded,
          ripple: ripple && !isDisabled,
          'w-full': full,
          'min-w-14': !fab && hasMinWidth
        }
      )
    ]"
    v-bind="$attrs"
  >
    <!-- button icon -->
    <app-icon
      :name="icon"
      data-name="button-icon"
      :class="[
        renderClass('', 'icon', {
          'opacity-0': loading,
          'pl-2': !fab
        })
      ]"
    />

    <!-- default slot -->
    <span
      :class="{
        'opacity-0': loading
      }"
    >
      <slot />
    </span>

    <!-- button loading -->
    <span
      v-if="loading"
      data-name="button-loadingContainer"
      :class="{
        [renderClass(
          'absolute transform top-1/2 -translate-y-1/2',
          'loadingContainer'
        )]: loading
      }"
    >
      <template v-if="hasLoadingSlot">
        <slot name="loading" v-bind="loadingProps"></slot>
      </template>
      <t-loading
        v-else
        data-name="button-loading"
        :class="renderClass('', 'loading')"
        v-bind="loadingBindingProps"
        size="sm"
      />
    </span>
  </component>
</template>
<script lang="ts">
import { computed, defineComponent, inject } from "vue";
import AppIcon from "@/components/tailwind/icon/TIcon.vue";
import { size, variants } from "@/utility/css-helper";
import TLoading from "@/components/tailwind/loading/TLoading.vue";
import { useRenderClass } from "@/compositionFunctions/settings";

const component = (propName: string) => "t-button-" + propName;
export default defineComponent({
  name: "TButton",
  props: {
    rounded: {
      type: Boolean,
      default: () => inject(component("rounded"), false)
    },
    fab: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: () => inject(component("variant"), variants.white),
      validator: (propValue: string) => {
        return !!variants[propValue];
      }
    },
    size: {
      type: String,
      default: () => inject(component("size"), size.md),
      validator: (propValue: string) => {
        return !!size[propValue];
      }
    },
    color: {
      type: String,
      default: () => inject(component("color"), "")
    },
    icon: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    outline: {
      type: Boolean,
      default: () => inject(component("outline"), false)
    },
    ripple: {
      type: Boolean,
      default: () => inject(component("ripple"), false)
    },
    to: {
      type: [String, Object],
      required: false,
      default: ""
    },
    nuxt: {
      required: false,
      type: Boolean,
      default: () => inject(component("nuxt"), false)
    },
    full: {
      type: Boolean,
      default: () => inject(component("full"), false),
      required: false
    },
    loading: {
      type: Boolean,
      default: false,
      required: false
    },
    loadingProps: {
      type: Object,
      default: () => inject(component("loadingProps"), {})
    }
  },
  components: {
    AppIcon,
    TLoading
  },
  setup(props, { slots }) {
    const variantClasses = computed((): string => {
      const baseClass = ` hover:opacity-80 transition hover:shadow-md ${
        props.variant === variants.white ? "text-dark" : "text-white"
      } disabled:opacity-50`;
      const variantClass = `bg-${props.variant} hover:bg-${props.variant}`;

      const outlineVariantClass = `border-${props.variant}-50 text-${props.variant} hover:bg-${props.variant}-50`;
      const outlineBaseClass =
        " transition hover:shadow-md disabled:opacity-50";

      let btnSize = " ";

      let height;
      let width;
      switch (props.size) {
        case size.xs:
          height = "h-7";
          width = "w-7";
          break;
        case size.sm:
          height = "h-9";
          width = "w-9";
          break;
        case size.lg:
          height = "h-13";
          break;
        default:
          height = "h-11";
          break;
      }

      btnSize += height + " ";
      if (props.fab) {
        btnSize += width;
      }

      return (
        (props.outline
          ? (props.color || outlineVariantClass) + outlineBaseClass
          : (props.color || variantClass) + baseClass) + btnSize
      );
    });

    const loadingBindingProps = {
      variant: props.outline ? props.variant : "white",
      ...props.loadingProps
    };

    const wrapperComponent = computed((): string => {
      if (!props.to) {
        return "button";
      }
      if (props.nuxt) {
        return "nuxt-link";
      }
      return "router-link";
    });
    const { renderClass } = useRenderClass("button");

    const isDisabled = computed(() => {
      return props.loading || props.disabled;
    });

    const hasMinWidth = computed(() => {
      return props.size === size.xs || props.size === size.sm ? false : true;
    });

    return {
      renderClass,
      variantClasses,
      loadingBindingProps,
      hasLoadingSlot: !!slots.loading,
      wrapperComponent,
      isDisabled,
      hasMinWidth
    };
  }
});
</script>
