<template>
  <template v-if="type === SkeletonTypes.AVATAR_LIST">
    <div
      v-bind="$attrs"
      :class="{ 'border border-gray-200': border, shadow }"
      class="rounded-md p-4 w-full mx-auto cursor-wait"
    >
      <div class="animate-pulse flex space-x-reverse space-x-4">
        <div class="rounded-full bg-gray-300 h-12 w-12"></div>
        <div class="flex-1 space-y-4 py-1">
          <div class="h-4 bg-gray-300 rounded w-3/4"></div>
          <div class="space-y-2">
            <div class="h-4 bg-gray-300 rounded"></div>
            <div class="h-4 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <template v-else-if="type === SkeletonTypes.CARD">
    <div
      v-bind="$attrs"
      :class="{ 'border border-gray-200': border, shadow }"
      class="max-w-xs  rounded-sm w-full mx-auto cursor-wait"
    >
      <div class="animate-pulse flex flex-col space-y-5 pb-5">
        <div class="w-full h-60 bg-gray-300 rounded-t-sm"></div>
        <template v-if="$slots.footer">
          <slot name="footer"></slot>
        </template>
        <template v-else>
          <div class="h-4 bg-gray-300 rounded w-1/2 mr-6"></div>
        </template>
      </div>
    </div>
  </template>

  <template v-else-if="type === SkeletonTypes.ONE_LINE">
    <div
      v-bind="$attrs"
      :class="{ 'border border-gray-200': border, shadow }"
      class="rounded-md p-4 w-full mx-auto cursor-wait"
    >
      <div class="animate-pulse h-4 bg-gray-300 rounded w-full"></div>
    </div>
  </template>
  <template v-else-if="type === SkeletonTypes.THREE_LINE">
    <div
      v-bind="$attrs"
      :class="{ 'border border-gray-200': border, shadow }"
      class="rounded-md p-4 w-full mx-auto cursor-wait"
    >
      <div class="flex-1 space-y-3 py-1 animate-pulse">
        <div class="h-4 bg-gray-300 rounded w-3/4"></div>
        <div class="h-4 bg-gray-300 rounded"></div>
        <div class="h-4 bg-gray-300 rounded w-5/6"></div>
      </div>
    </div>
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { SkeletonTypes } from "@/utility/enums/SkeletonTypes";
export default defineComponent({
  props: {
    type: {
      type: String,
      default: SkeletonTypes.AVATAR_LIST,
      validator: (value: SkeletonTypes) => {
        return Object.values(SkeletonTypes).includes(value);
      }
    },
    border: {
      type: Boolean,
      default: () => true
    },
    shadow: {
      type: Boolean,
      default: () => true
    }
  },
  setup() {
    return { SkeletonTypes };
  }
});
</script>
