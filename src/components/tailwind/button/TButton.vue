<template>
  <!-- This is an example component -->
  <button
    :class="{
      'rounded-full': rounded,
      [variantClasses]: true,
      ripple,
    }"
    class="shadow rounded-sm block border-1 focus:outline-none px-4 py-2 hover:text-white flex justify-center align-center "
    v-on="$attrs"
    v-bind="$attrs"
  >
    <app-icon :name="icon" />
    <span>
      <slot />
    </span>
  </button>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import AppIcon from "@/components/icon/TIcon.vue";
import { variants } from "@/utility/css-helper.ts";
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
  },
  components: {
    AppIcon,
  },
  setup(props) {
    const variantClasses = computed((): string => {
      const baseClass =
        " hover:opacity-80 transition text-white disabled:opacity-50";
      const outlineBaseClass =
        " transition ring-4 text-dark  hover:opacity-80 disabled:opacity-50";
      return (
        (props.outline
          ? `bg-white ring-${props.variant} hover:bg-${props.variant}`
          : `
        bg-${props.variant} ring-${props.variant} hover:bg-${props.variant}
        `) + (props.outline ? outlineBaseClass : baseClass)
      );
    });

    return {
      variantClasses,
    };
  },
});
</script>
