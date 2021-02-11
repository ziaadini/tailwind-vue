<template>
  <div class="flex items-center justify-center">
    <div class="container">
      <table
        class="w-full flex flex-row flex-no-wrap sm:bg-white rounded-lg overflow-hidden sm:shadow-lg my-5"
      >
        <thead>
          <template v-for="i in getLength" :key="`header-item-${i}`">
            <tr
              class="bg-gray-100 flex flex-col flex-no wrap sm:table-row rounded-r-lg sm:rounded-none mb-2 sm:mb-0"
            >
              <t-th
                v-for="(headerItem, index) in getHeaders"
                :key="`header-${index}-${headerItem.key}`"
                @sort="onSort"
                :item="headerItem"
                class="p-3"
              >
              </t-th>
            </tr>
          </template>
        </thead>
        <tbody class="flex-1 sm:flex-none">
          <tr
            v-for="i in getLength"
            :key="`row-item-${i}`"
            class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0"
          >
            <td
              v-for="(headerItem, index) in getHeaders"
              :key="`td-item-${index}-${headerItem.key}`"
              class="border-grey-light border hover:bg-gray-100 p-3"
            >
              {{ getItems[i - 1][headerItem.key] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive } from "vue";
import { Table } from "@/utility/types/base-component-types";
import TTh from "@/components/tailwind/table/TTh.vue";
import SortEnum = Table.SortEnum;

export default defineComponent({
  name: "TTable",
  components: { TTh },
  props: {
    items: {
      type: Array as PropType<{ [key: string]: any }[]>,
      default: () => []
    },
    fields: {
      type: Array as PropType<Table.HeaderItem[]>
    }
  },
  setup(props) {
    const getHeaders = computed((): Table.HeaderItem[] => {
      if (props.fields) {
        return props.fields;
      }
      const firstItem = props.items[0];
      if (!firstItem) {
        return [];
      }
      const result: Table.HeaderItem[] = [];
      for (const key in firstItem) {
        result.push({
          key,
          label: key,
          sortable: false,
          variant: "gray"
        });
      }
      return result;
    });
    const getLength = computed(() => props.items.length);
    const activeSort = reactive({
      key: "",
      sort: "" as Table.SortEnum
    });
    const onSort = ({ key, sort }) => {
      activeSort.key = key;
      activeSort.sort = sort;
      console.log(key, sort);
    };
    const compare = (a, b) => {
      if (a[activeSort.key] < b[activeSort.key]) {
        return activeSort.sort === SortEnum.ASC ? -1 : 1;
      }
      if (a[activeSort.key] > b[activeSort.key]) {
        return activeSort.sort === SortEnum.ASC ? 1 : -1;
      }
      return 0;
    };
    const getItems = computed(() => {
      if (activeSort.key) {
        return [...props.items].sort(compare);
      }
      return props.items;
    });
    return { getHeaders, getLength, onSort, getItems };
  }
});
</script>

<style>
@media (min-width: 640px) {
  table {
    display: inline-table !important;
  }

  thead tr:not(:first-child) {
    display: none;
  }
}

td:not(:last-child) {
  border-bottom: 0;
}

th:not(:last-child) {
  border-bottom: 2px solid rgba(0, 0, 0, 0.1);
}
</style>
