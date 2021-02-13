<template>
  <th
    @click="onClick"
    :class="[`bg-${item.variant}`,{'cursor-pointer':item.sortable}]"
  >
    {{ item.label }}
  </th>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { Table } from "@/utility/types/base-component-types";
export default defineComponent({
  name: "TTh",
  emits: ["sort"],
  props: {
    item: {
      type: Object as PropType<Table.HeaderItem>,
      required: true
    }
  },
  setup(props, { emit }) {
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
    return { onClick };
  }
});
</script>

<style scoped></style>
