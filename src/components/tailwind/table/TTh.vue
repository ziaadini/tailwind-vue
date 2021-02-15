<template>
  <component
    :is="tag"
    @click="onClick"
    :class="[getVariantClass, { 'cursor-pointer': item.sortable }]"
  >
    <div class="flex flex-row items-center">
      <div class="ml-2" :class="{ hidden: item.key !== activeSort.key }">
        <t-triangle
          direction="arrow-up"
          class="transform scale-75"
          :color-class="
            activeSort.sort === SortEnum.ASC
              ? 'border-gray-500'
              : 'border-gray-300'
          "
        ></t-triangle>
        <t-triangle
          direction="arrow-down"
          class="mt-0.5 transform scale-75"
          :color-class="
            activeSort.sort === SortEnum.DESC
              ? 'border-gray-500'
              : 'border-gray-300'
          "
        ></t-triangle>
      </div>
      <template v-if="hasDefaultSlot">
        <slot :item="item" :activeSort="activeSort"></slot>
      </template>
      <template v-else>
        {{ item.label }}
      </template>
    </div>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import { Table } from "@/utility/types/base-component-types";
import TTriangle from "@/components/tailwind/triangle/TTriangle.vue";
export default defineComponent({
  name: "TTh",
  components: { TTriangle },
  emits: ["sort"],
  props: {
    item: {
      type: Object as PropType<Table.HeaderItem>,
      required: true
    },
    activeSort: {
      type: Object as PropType<{ key: string; sort: Table.SortEnum }>
    },
    tag: {
      type: String,
      default: "th"
    }
  },
  setup(props, { emit, slots }) {
    const sortRef = ref<Table.SortEnum>(Table.SortEnum.DESC);
    const toggleSort = () => {
      if (sortRef.value === Table.SortEnum.ASC) {
        sortRef.value = Table.SortEnum.DESC;
      } else {
        sortRef.value = Table.SortEnum.ASC;
      }
      return sortRef.value;
    };
    const onClick = (): void => {
      if (props.item.sortable) {
        emit("sort", { key: props.item.key, sort: toggleSort() });
      }
    };
    const getVariantClass = computed(() => {
      if (props.item.variant) {
        return `sm:bg-${props.item.variant}-50 sm:text-gray-700 text-${props.item.variant}`;
      }
      return "text-gray-700";
    });
    return {
      onClick,
      getVariantClass,
      SortEnum: Table.SortEnum,
      hasDefaultSlot: !!slots.default
    };
  }
});
</script>

<style scoped></style>
