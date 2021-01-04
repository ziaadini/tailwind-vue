<template>
  <ol class="flex text-gray-700">
    <template v-for="(item, index) in returnValues" :key="item" class="px-2">
      <template v-if="!item.active">
        <li class="px-2">
          <a href="#" class="hover:underline">{{ item.text }}</a>
        </li>
      </template>
      <template v-else>
        <li class="px-2 text-indigo-600">{{ item.text }}</li>
      </template>
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
import { defineComponent, PropType } from "vue";
import { BreadCrumb } from "@/types/base-component-types";

export default defineComponent({
  props: {
    modelValue: {
      required: true,
      type: Object as PropType<BreadCrumb.Root>,
      default: () => {
        return [];
      }
    }
  },
  computed: {
    returnValues(): BreadCrumb.Root {
      return this.modelValue?.length > 0 ? this.modelValue : [];
    }
  }
});
</script>
