<template>
  <!-- This is an example component -->
  <button
    :class="{
      'rounded-full': rounded,
      [variantClasses]: true,
      ripple,
      'w-full': full,
    }"
    class="shadow relative rounded-sm block border-1 align-se focus:outline-none px-4 py-2  flex justify-center align-center "
    v-bind="$attrs"
  >
    <div class="contents">
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
    </div>
    <div
      v-if="loading"
      :class="{
        'absolute transform top-1/2 -translate-y-1/2': loading,
      }"
    >
      <t-loading size="sm" />
    </div>
  </button>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import AppIcon from "@/components/icon/TIcon.vue";
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
  },
  components: {
    AppIcon,
    TLoading,
  },
  setup(props) {
    const variantClasses = computed((): string => {
      const baseClass =
        " hover:opacity-80 transition text-white disabled:opacity-50";
      const outlineBaseClass =
        " transition border-4 text-dark  hover:opacity-80 disabled:opacity-50";
      return props.outline
        ? `bg-white border-${props.variant} hover:bg-${props.variant}-50` +
            outlineBaseClass
        : `
        bg-${props.variant} hover:bg-${props.variant}
        ` + baseClass;
    });

    return {
      variantClasses,
    };
  },
});
</script>
