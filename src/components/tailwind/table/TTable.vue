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
          <template v-for="i in getLength" :key="`row-item-${i}`">
            <tr
              class="flex flex-col flex-no wrap sm:table-row mb-2 sm:mb-0"
              :class="getRowVariant(i)"
            >
              <td
                v-for="(headerItem, index) in getHeaders"
                :key="`td-item-${index}-${headerItem.key}`"
                class="border-grey-light border hover:bg-gray-100 p-3"
                :class="getCellVariant(i, headerItem.key)"
              >
                <template
                  v-if="!slots[`cell(${headerItem.key})`] && !hasCellSlot"
                >
                  {{ getItems[i - 1][headerItem.key] }}
                </template>
                <template v-else-if="slots[`cell(${headerItem.key})`]">
                  <slot
                    :name="`cell(${headerItem.key})`"
                    :column="index"
                    :row="i - 1"
                    :item="getItems[i - 1]"
                    :itemKey="headerItem.key"
                    :value="getItems[i - 1][headerItem.key]"
                    :toggleDetails="
                      () => {
                        toggleDetails(i);
                      }
                    "
                  ></slot>
                </template>
                <template v-else>
                  <slot
                    name="cell"
                    :column="index"
                    :row="i - 1"
                    :item="getItems[i - 1]"
                    :itemKey="headerItem.key"
                    :value="getItems[i - 1][headerItem.key]"
                    :toggleDetails="
                      () => {
                        toggleDetails(i);
                      }
                    "
                  ></slot>
                </template>
              </td>
            </tr>
            <template v-if="hasRowDetailsSlot">
              <tr>
                <td :colspan="getHeaderLength">
                  <t-collapsable :show="getShowDetails(i)">
                    <slot name="rowDetails"></slot>
                  </t-collapsable>
                </td>
              </tr>
            </template>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, reactive, ref } from "vue";
import { Table } from "@/utility/types/base-component-types";
import TTh from "@/components/tailwind/table/TTh.vue";
import SortEnum = Table.SortEnum;
import TCollapsable from "@/components/tailwind/collapsable/TCollapsable.vue";

export default defineComponent({
  name: "TTable",
  components: { TCollapsable, TTh },
  emits: {
    sort(_: { key: string; sort: Table.SortEnum }) {
      return true;
    }
  },
  props: {
    items: {
      type: Array as PropType<Table.Item[]>,
      default: () => []
    },
    fields: {
      type: Array as PropType<Table.HeaderItem[]>
    },
    localSort: {
      type: Boolean,
      default: () => true
    }
  },
  setup(props, { emit, slots }) {
    const itemRefs = ref<Element[]>([]);
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
    const getHeaderLength = computed(() => getHeaders.value.length);
    const getLength = computed(() => props.items.length);
    const activeSort = reactive({
      key: "",
      sort: "" as Table.SortEnum
    });
    const onSort = ({ key, sort }) => {
      if (props.localSort) {
        activeSort.key = key;
        activeSort.sort = sort;
      }
      emit("sort", { key, sort });
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
    const getRowVariant = computed(() => i => {
      if (getItems.value[i - 1]?._rowVariant) {
        return `bg-${getItems.value[i - 1]._rowVariant}`;
      }
      return "";
    });
    const getCellVariant = computed(() => (i, key) => {
      if (getItems.value[i - 1]._cellVariants?.[key]) {
        return `bg-${getItems.value[i - 1]._cellVariants?.[key]}`;
      }
      return "";
    });
    const showDetailsRef = ref({});
    const getShowDetails = computed(() => i => {
      if (showDetailsRef.value[i] !== undefined) {
        return showDetailsRef.value[i];
      }
      return getItems.value[i - 1]._showDetails;
    });
    const toggleDetails = i => {
      if (getShowDetails.value(i)) {
        showDetailsRef.value[i] = false;
      } else {
        showDetailsRef.value[i] = true;
      }
    };
    return {
      hasRowDetailsSlot: !!slots.rowDetails,
      hasCellSlot: !!slots.cell,
      slots,
      itemRefs,
      toggleDetails,
      getShowDetails,
      getHeaders,
      getHeaderLength,
      getLength,
      onSort,
      getItems,
      getRowVariant,
      getCellVariant
    };
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
