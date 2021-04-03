<template>
  <i
    v-if="name"
    :class="
      renderClass('material-icons', 'container', { [name]: nameInsideClass })
    "
  >
    {{ nameInsideTag ? name : "" }}
  </i>
</template>

<script lang="ts">
import { defineComponent, inject } from "vue";
import { useRenderClass } from "@/compositionFunctions/settings";
export default defineComponent({
  name: "TIcon",
  props: {
    name: {
      type: String,
      default: () => inject("t-icon-name", "")
    },
    nameInsideTag: {
      type: Boolean,
      default: () => inject("t-icon-nameInsideTag", true)
    },
    nameInsideClass: {
      type: Boolean,
      default: () => inject("t-icon-nameInsideClass", false)
    }
  },
  setup() {
    const { renderClass } = useRenderClass("icon");
    return { renderClass };
  }
});
</script>
