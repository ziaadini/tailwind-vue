<template>
  <!-- This is an example component -->
  <button
    :class="{
      'rounded-full': rounded,
      [variantClasses]: true
    }"
    class="shadow rounded-sm block border-blue-600 border-1 focus:outline-none focus:border-blue-600 px-4 py-2 text-blue-60 hover:text-white flex justify-center align-center "
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
import AppIcon from "@/components/AppIcon.vue";
import { variants } from "@/utility/css-helper.ts";
export default defineComponent({
  name: "AppButton",
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
    }
  },
  components: {
    AppIcon
  },
  setup(props) {
    const variantClasses = computed((): string => {
      if (props.variant === variants.primary) {
        return "bg-primary hover:opacity-80 transition text-white disabled:opacity-50";
      } else if (props.variant === variants.success) {
        return "bg-success hover:opacity-80 transition text-white disabled:opacity-50";
      } else if (props.variant === variants.danger) {
        return "bg-danger hover:opacity-80 transition text-white disabled:opacity-50";
      } else if (props.variant === variants.warning) {
        return "bg-warning hover:opacity-80 transition text-white disabled:opacity-50";
      }

      return "";
    });

    return {
      variantClasses
    };
  }
});
</script>
