<template>
  <!-- This is an example component -->
  <button
    :class="{
      'rounded-full': rounded,
      [variantClasses]: true
    }"
    class="shadow w-32 block border-blue-600 border-2 focus:outline-none focus:border-blue-600 px-4 py-2 text-blue-60 hover:text-white flex justify-center align-center "
    v-on="$attrs"
    v-bind="$attrs"
  >
    <i v-if="icon" class="material-icons pl-1">
      {{ icon }}
    </i>
    <span>Button</span>
  </button>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { variants } from "@/utility/css-helper.ts";
export default defineComponent({
  props: {
    rounded: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String,
      default: "primary"
    },
    icon: {
      type: String,
      default: ""
    }
  },
  computed: {
    variantClasses(): string {
      if (this.variant === variants.primary) {
        return "bg-primary hover:bg-success hover:text-white disabled:opacity-50";
      } else if (this.variant === variants.success) {
        return "bg-success hover:bg-primary hover:text-white disabled:opacity-50";
      } else if (this.variant === variants.danger) {
        return "bg-danger hover:bg-success hover:text-white disabled:opacity-50";
      } else if (this.variant === variants.warning) {
        return "bg-warning hover:bg-primary hover:text-white disabled:hover:bg-warning disabled:hover:text-danger";
      }
      throw new Error("variant not found");
    }
  }
});
</script>
