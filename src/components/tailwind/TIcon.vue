<template>
  <i
    v-if="name"
    data-name="icon-wrapper"
    :class="[
      renderClass('material-icons pl-1', 'wrapper', { 'opacity-40': disabled })
    ]"
  >
    <template v-if="!avoidText">
      {{ name }}
    </template>
  </i>
</template>

<script lang="ts">
import { useRenderClass } from "@/compositionFunctions/settings";
import { defineComponent, inject } from "vue";
const component = (propName: string) => "t-icon-" + propName;

export default defineComponent({
  name: "TIcon",
  props: {
    name: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: () => false
    },
    avoidText: {
      type: Boolean,
      default: () => inject(component("i"), false)
    }
  },
  setup() {
    const { renderClass } = useRenderClass("button");
    return {
      renderClass
    };
  }
});
</script>
