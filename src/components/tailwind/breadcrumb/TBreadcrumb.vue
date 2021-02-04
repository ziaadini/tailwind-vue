<template>
  <ol class="flex text-gray-700">
    <template v-for="(item, index) in returnValues" :key="item" class="px-2">
      <li class="px-2" :class="{ 'text-indigo-600': !item.active }">
        <slot name="beforeLink" />
        <component
          :class="[
            { 'hover:underline': !item.active, 'cursor-default': item.active },
          ]"
          :to="item.url"
          :is="linkType"
        >
          {{ item.text }}</component
        >
      <slot name="afterLink" />
      </li>
      <li
        v-if="index + 1 < returnValues.length"
        class="text-gray-500 select-none"
      >
        /
      </li>
    </template>
  </ol>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { BreadCrumb } from "@/utility/types/base-component-types";

export default defineComponent({
  props: {
    nuxt: {
      type: Boolean,
      required: false,
      default: false,
    },
    value: {
      required: true,
      type: Object as PropType<BreadCrumb.Root>,
      default: () => {
        return [];
      },
    },
  },
  setup(props) {
    const returnValues = computed(
      (): BreadCrumb.Root => {
        return props.value?.length > 0 ? props.value : [];
      }
    );

    const linkType = computed(() => {
      if (!props.nuxt) {
        return "router-link";
      }
      return "nuxt-link";
    });

    return {
      returnValues,
      linkType,
    };
  },
});
</script>
