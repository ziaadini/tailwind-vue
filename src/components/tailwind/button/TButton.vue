<template>
  <!-- This is an example component -->
  <component
    :is="wrapperComponent"
    :to="to"
    :disabled="disabled"
    data-name="button-container"
    :class="[
      renderClass(
        `${variantClasses} flex justify-center items-center px-4 py-2 min-w-14 shadow relative rounded-sm border-1 focus:outline-none`,
        'container',
        {
          'rounded-full': rounded,
          ripple: ripple && !isDisabled,
          'w-full': full,
        }
      ),
    ]"
    v-bind="$attrs"
  >
    <app-icon
      :name="icon"
      data-name="button-icon"
      :class="[
        renderClass('pl-2', 'icon', {
          'opacity-0': loading,
        }),
      ]"
    />
    <span
      :class="{
        'opacity-0': loading,
      }"
    >
      <slot />
    </span>

    <span
      v-if="loading"
      data-name="button-loadingContainer"
      :class="{
        [renderClass(
          'absolute transform top-1/2 -translate-y-1/2',
          'loadingContainer'
        )]: loading,
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
import { computed, defineComponent } from "vue";
import AppIcon from "@/components/tailwind/icon/TIcon.vue";
import { buttonSizes, variants } from "@/utility/css-helper.ts";
import TLoading from "@/components/tailwind/loading/TLoading.vue";
import { useRenderClass } from "@/compositionFunctions/settings";
export default defineComponent({
  name: "TButton",
  props: {
    rounded: {
      type: Boolean,
      default: false,
    },
    fab: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: "primary",
      validator: (propValue: string) => {
        return !!variants[propValue];
      },
    },
    size: {
      type: String,
      default: "normal",
      validator: (propValue: string) => {
        return !!buttonSizes[propValue];
      },
    },
    color: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    outline: {
      type: Boolean,
      default: false,
    },
    ripple: {
      type: Boolean,
      default: false,
    },
    to: {
      type: String,
      required: false,
      default: "",
    },
    nuxt: {
      required: false,
      type: Boolean,
      default: false,
    },
    full: {
      type: Boolean,
      default: false,
      required: false,
    },
    loading: {
      type: Boolean,
      default: false,
      required: false,
    },
    loadingProps: {
      type: Object,
      default: () => ({}),
    },
  },
  components: {
    AppIcon,
    TLoading,
  },
  setup(props, { slots }) {
    const variantClasses = computed((): string => {
      const baseClass =
        " hover:opacity-80 transition hover:shadow-md text-white disabled:opacity-50";
      const variantClass = `bg-${props.variant} hover:bg-${props.variant}`;

      const outlineVariantClass = `bg-white border-${props.variant}-50 hover:bg-${props.variant}-50`;
      const outlineBaseClass =
        " transition border hover:shadow-md text-dark hover:opacity-80 disabled:opacity-50";

      let size = " ";

      let height;
      let width;
      switch (props.size) {
        case buttonSizes.small:
          height = "h-11";
          width = "w-11";
          break;
        case buttonSizes.large:
          height = "h-14";
          width = "w-14";
          break;
        default:
          height = "h-12";
          width = "w-12";
          break;
      }

      size += height + " ";
      if (props.fab) {
        size += width;
      }

      return (
        (props.outline
          ? (props.color || outlineVariantClass) + outlineBaseClass
          : (props.color || variantClass) + baseClass) + size
      );
    });

    const loadingBindingProps = {
      variant: props.outline ? props.variant : "white",
      ...props.loadingProps,
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

    return {
      renderClass,
      variantClasses,
      loadingBindingProps,
      hasLoadingSlot: !!slots.loading,
      wrapperComponent,
      isDisabled,
    };
  },
});
</script>
