<template>
  <div class="relative">
    <slot></slot>
    <div
      class="absolute right-1/2 transform translate-x-1/2 w-full text-gray-50"
    >
      <t-triangle class="mx-auto"></t-triangle>
      <div class="bg-primary rounded-xs p-1 w-full">tooltip</div>
    </div>
  </div>
</template>

<script>
import TTriangle from "@/components/tailwind/triangle/TTriangle";
export default {
  name: "TTooltip",
  components: { TTriangle }
};
</script>
