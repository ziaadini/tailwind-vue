<template>
  <ol
    data-name="breadcrumb-container"
    :class="renderClass('flex text-gray-500', 'container')"
  >
    <template v-for="(item, index) in items" :key="item">
      <li
        class="px-2"
        data-name="breadcrumb-active"
        :class="renderClass(item.active ? 'text-indigo-600' : '', 'active')"
      >
        <slot name="beforeLink" v-bind="item" />
        <slot v-bind="item"></slot>
        <template v-if="!hasDefaultSlot">
          <component
            data-name="breadcrumb-link"
            :class="[
              renderClass(!item.active ? 'hover:underline' : '', 'link'),
              { 'cursor-default': item.active }
            ]"
            :to="item.url"
            :is="linkType"
          >
            {{ item.text }}</component
          >
        </template>

        <slot name="afterLink" v-bind="item" />
      </li>
      <li
        data-name="breadcrumb-slash"
        v-if="index + 1 < items.length"
        :class="renderClass('text-gray-500 select-none', 'slash')"
      >
        /
      </li>
    </template>
  </ol>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { BreadCrumb } from "@/utility/types/base-component-types";
import { useRenderClass } from "@/compositionFunctions/settings";

export default defineComponent({
  props: {
    nuxt: {
      type: Boolean,
      required: false,
      default: false
    },
    items: {
      required: true,
      type: Array as PropType<BreadCrumb.Root>,
      default: () => {
        return [];
      }
    }
  },
  setup(props, { slots }) {
    const linkType = computed(() => {
      if (!props.nuxt) {
        return "router-link";
      }
      return "nuxt-link";
    });
    const { renderClass } = useRenderClass("breadcrumb");
    return {
      linkType,
      hasDefaultSlot: !!slots.default,
      renderClass
    };
  }
});
</script>
