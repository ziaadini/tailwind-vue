<template>
  <!-- This is an example component -->
  <button
    :class="[
      {
        'rounded-full': rounded,
        ripple,
        'w-full': full,
      },
      variantClasses,
    ]"
    class="shadow relative rounded-sm border-1 focus:outline-none"
    v-bind="$attrs"
  >
    <component :is="wrapperComponent" :to="to" class="contents">
      <div class=" flex justify-center align-center px-4 py-2">
        <app-icon
          :name="icon"
          :class="{
            'opacity-0': loading,
          }"
        />
        <span
          :class="{
            'opacity-0': loading,
          }"
        >
          <slot />
        </span>

        <div
          v-if="loading"
          :class="{
            'absolute transform top-1/2 -translate-y-1/2': loading,
          }"
        >
          <t-loading v-bind="{ ...loadingProps }" size="sm" />
        </div>
      </div>
    </component>
  </button>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import AppIcon from "@/components/tailwind/icon/TIcon.vue";
import { variants } from "@/utility/css-helper.ts";
import TLoading from "@/components/tailwind/loading/TLoading.vue";
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
    to: {
      type: String,
      required: false,
      default: "",
    },
  },
  components: {
    AppIcon,
    TLoading,
  },
  setup(props) {
    const variantClasses = computed((): string => {
      const baseClass =
        " hover:opacity-80 transition hover:shadow-md text-white disabled:opacity-50";
      const outlineBaseClass =
        " transition border hover:shadow-md text-dark hover:opacity-80 disabled:opacity-50";
      return props.outline
        ? `bg-white border-${props.variant} hover:bg-${props.variant}-50` +
            outlineBaseClass
        : `
        bg-${props.variant} hover:bg-${props.variant}
        ` + baseClass;
    });

    const loadingProps = {
      variant: props.outline ? props.variant : "white",
    };

    const wrapperComponent = props.to
      ? props.nuxt
        ? "nuxt-link"
        : "router-link"
      : "template";
    return {
      variantClasses,
      loadingProps,
      wrapperComponent,
    };
  },
});
</script>
