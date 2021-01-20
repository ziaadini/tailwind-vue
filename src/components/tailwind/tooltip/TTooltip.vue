<template>
  <div class="relative">
    <slot></slot>
    <div
      class="absolute right-1/2 transform translate-x-1/2 w-full text-gray-50"
    >
      <div
        class="w-0 h-0 mx-auto border-l-8 border-b-8 border-r-8 border-l-transparent border-r-transparent  border-primary"
      ></div>
      <div class="bg-primary rounded-xs p-1 w-full">tooltip</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TTooltip"
};
</script>
