<template>
  <i v-if="name" :class="renderClass('material-icons', 'container')">
    {{ name }}
  </i>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRenderClass } from "@/compositionFunctions/settings";
export default defineComponent({
  name: "TIcon",
  props: {
    name: {
      type: String,
      default: ""
    }
  },
  setup() {
    const { renderClass } = useRenderClass("icon");
    return { renderClass };
  }
});
</script>
