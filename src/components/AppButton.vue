<template>
  <!-- This is an example component -->
  <button
    :class="{
      'rounded-full': rounded,
      [variantClasses]: true,
    }"
    class=" flex shadow w-32 block border-blue-600 border-2 focus:outline-none focus:border-blue-600 px-4 py-2 text-blue-60hover:text-white"
  >
    <svg
      class="inline-block h-5 w-5 mr-1"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 20 20"
    >
      <path
        fill-rule="evenodd"
        d="M15.8 8H14V5.6C14 2.703 12.665 1 10 1 7.334 1 6 2.703 6 5.6V8H4c-.553 0-1 .646-1 1.199V17c0 .549.428 1.139.951 1.307l1.197.387A7.731 7.731 0 007.1 19h5.8a7.68 7.68 0 001.951-.307l1.196-.387c.524-.167.953-.757.953-1.306V9.199C17 8.646 16.352 8 15.8 8zM12 8H8V5.199C8 3.754 8.797 3 10 3s2 .754 2 2.199V8z"
      />
    </svg>
    <span>Button</span>
  </button>
</template>
<script lang="ts">
import { defineComponent } from "vue";
import { vairants } from "../../utility/css-helper";
export default defineComponent({
  props: {
    rounded: {
      type: Boolean,
      default: false,
    },
    variant: {
      type: String,
      default: "primary",
    },
  },
  computed: {
    variantClasses(): string {
      if (this.variant === vairants.primary) {
        return "bg-primary hover:bg-success hover:text-white";
      } else if (this.variant === vairants.success) {
        return "bg-success hover:bg-primary hover:text-white";
      } else if (this.variant === vairants.danger) {
        return "bg-danger hover:bg-success hover:text-white";
      } else if (this.variant === vairants.warning) {
        return "bg-warning hover:bg-primary hover:text-white";
      }

      throw new Error("variant not found");
    }
  }
});
</script>
