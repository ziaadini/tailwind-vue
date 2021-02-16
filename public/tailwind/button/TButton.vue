<template>
  <!-- This is an example component -->
  <component
    :is="wrapperComponent"
    :to="to"
    data-name="button-container"
    :class="[
      {
        'rounded-full': rounded,
        ripple,
        'w-full': full,
      },
      variantClasses,
      renderClass(
        'shadow relative rounded-sm border-1 focus:outline-none',
        'container'
      ),
    ]"
    v-bind="$attrs"
  >
    <span
      :class="
        renderClass(
          'flex justify-center align-center px-4 py-2',
          'contentContainer'
        )
      "
      data-name="button-contentContainer"
    >
      <app-icon
        :name="icon"
        data-name="button-icon"
        :class="[
          {
            'opacity-0': loading,
          },
          renderClass('', 'icon'),
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
    </span>
  </component>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import AppIcon from "@/components/tailwind/icon/TIcon.vue";
import { variants } from "@/utility/css-helper.ts";
import TLoading from "@/components/tailwind/loading/TLoading.vue";
import { useRenderClass } from "@/compositionFunctions/settings";
export default defineComponent({
  name: "TButton",
  props: {
    rounded: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: "primary",
      validator: (propValue: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        return !!variants[propValue];
      },
    },
    icon: {
      type: String,
      default: "",
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
      const outlineBaseClass =
        " transition border hover:shadow-md text-dark hover:opacity-80 disabled:opacity-50";
      return props.outline
        ? `bg-white border-${props.variant}-50 hover:bg-${props.variant}-50` +
            outlineBaseClass
        : `
        bg-${props.variant} hover:bg-${props.variant}
        ` + baseClass;
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
    return {
      renderClass,
      variantClasses,
      loadingBindingProps,
      hasLoadingSlot: !!slots.loading,
      wrapperComponent,
    };
  },
});
</script>
