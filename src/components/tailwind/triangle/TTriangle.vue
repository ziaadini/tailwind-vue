<template>
  <div class="w-0 h-0 border-primary" :class="[triangleClassByDirection]"></div>
</template>

<script>
import { computed } from "vue";

export default {
  name: "TTriangle",
  props: {
    direction: {
      type: String,
      validator: value => {
        return ["arrow-up", "arrow-down", "arrow-right", "arrow-left"].includes(
          value
        );
      },
      default: "arrow-up"
    }
  },
  setup(props) {
    const triangleClassByDirection = computed(() => {
      switch (props.direction) {
        case "arrow-up":
          return "border-l-8 border-b-8 border-r-8 border-l-transparent border-r-transparent";
        case "arrow-down":
          return "border-l-8 border-b-8 border-r-8 border-l-transparent border-r-transparent";
      }
    });
    return {
      triangleClassByDirection
    }
  }
};
</script>

<style scoped></style>
