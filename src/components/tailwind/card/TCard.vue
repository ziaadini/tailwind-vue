<template>
  <div
    data-name="card-container"
    :class="
      renderClass('shadow-md border border-gray-100 text-right', 'container')
    "
  >
    <div
      v-if="title"
      data-name="card-title"
      :class="renderClass('p-2 sm:p-4 font-bold', 'title')"
    >
      {{ title }}
    </div>
    <div
      v-if="description"
      data-name="card-description"
      :class="renderClass('p-2 sm:p-4', 'description')"
    >
      {{ description }}
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { useRenderClass } from "@/compositionFunctions/settings";
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    }
  },
  setup() {
    const { renderClass } = useRenderClass("card");
    return { renderClass };
  }
});
</script>

<style scoped></style>
