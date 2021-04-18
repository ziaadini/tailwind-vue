<template>
  <div
    data-name="card-container"
    :class="
      renderClass('border border-gray-100 text-right', 'container', {
        'rounded-sm': rounded,
        'shadow-md': !noShadow
      })
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
import { defineComponent, inject } from "vue";

const component = (propName: string) => "t-card-" + propName;
export default defineComponent({
  name: "TCard",
  props: {
    title: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
    rounded: {
      type: Boolean,
      default: () => inject(component("rounded"), false)
    },
    noShadow: {
      type: Boolean,
      default: () => inject(component("noShadow"), false)
    }
  },
  setup() {
    const { renderClass } = useRenderClass("card");
    return { renderClass };
  }
});
</script>

<style scoped></style>
