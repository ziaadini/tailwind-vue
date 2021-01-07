<template>
  <!-- This is an example component -->
  <button
    :class="{
      'rounded-full': rounded,
      ripple: ripple,
      [variantClasses]: true
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
import AppIcon from "@/components/tailwind/TIcon.vue";
import { variants } from "@/utility/css-helper.ts";
export default defineComponent({
  name: "TButton",
  props: {
    rounded: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: "primary",
      validator: (propValue: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        return !!variants[propValue];
      }
    },
    icon: {
      type: String,
      default: ""
    },
    outline: {
      type: Boolean,
      default: false
    },
    ripple: {
      type: Boolean,
      default: false
    }
  },
  components: {
    AppIcon
  },
  setup(props) {
    const variantClasses = computed((): string => {
      switch (props.variant) {
        case variants.primary:
          return !props.outline
            ? "bg-primary hover:opacity-80 transition text-white disabled:opacity-50"
            : "bg-white transition ring-primary ring-4 text-dark hover:bg-primary hover:opacity-80 disabled:opacity-50";
        case variants.success:
          return !props.outline
            ? "bg-success hover:opacity-80 transition text-white disabled:opacity-50"
            : "bg-white transition ring-success ring-4 text-dark hover:bg-success hover:opacity-80 disabled:opacity-50";
        case variants.danger:
          return !props.outline
            ? "bg-danger hover:opacity-80 transition text-white disabled:opacity-50"
            : "bg-white transition ring-danger ring-4 text-dark hover:bg-danger hover:opacity-80 disabled:opacity-50";
        case variants.warning:
          return !props.outline
            ? "bg-warning hover:opacity-80 transition text-white disabled:opacity-50"
            : "bg-white transition ring-warning ring-4 text-dark hover:bg-warning hover:opacity-80 disabled:opacity-50";
        default:
          return "";
      }
    });

    return {
      variantClasses
    };
  }
});
</script>
