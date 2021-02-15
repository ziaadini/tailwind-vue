<template>
  <div class="flex flex-col items-start" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Button</h3>
    <p class="mb-2">Small filled buttons in different styles and colors can be used for call to actions in forms and more.</p>

    <div class="flex flex-col items-start mt-10">
      <h2 class="text-xl font-bold mb-2">Simple (Only Text)</h2>
      <p class="mb-2">Choose this basic button, only with text.</p>
      <t-button>Simple</t-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TButton from "@/components/tailwind/button/TButton.vue";

export default defineComponent({
  name: "App",
  components: {
    TButton,
  },
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped></style>
