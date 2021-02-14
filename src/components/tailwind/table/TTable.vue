<template>
  <template v-if="grid">
<!--    <div class="p-10 ltr">-->
<!--      <div class="grid grid-cols-3 divide-y divide-x divide-gray-700">-->
<!--        <div v-for="i in 12" :key="`item-${i}`" class="bg-gray-200">{{i}}</div>-->
<!--      </div>-->
<!--    </div>-->

  </template>
  <template v-else>
    <div v-bind="$attrs" class="overflow-x-auto scrollbar-sm">
      <table class="shadow-lg my-5 inline-block">
        <thead>
          <!--        <template v-for="i in getLength" :key="`header-item-${i}`">-->
          <tr class="bg-gray-100">
            <t-th
              v-for="(headerItem, index) in getHeaders"
              :key="`header-${index}-${headerItem.key}`"
              :active-sort="activeSort"
              @sort="onSort"
              :item="headerItem"
              class="p-3"
            >
            </t-th>
          </tr>
          <!--        </template>-->
        </thead>
        <tbody>
          <template v-for="i in getLength" :key="`row-item-${i}`">
            <tr class="table-row sm:mb-0" :class="getRowVariant(i)">
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
  </template>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import { Table } from "@/utility/types/base-component-types";
import TTh from "@/components/tailwind/table/TTh.vue";
import TCollapsable from "@/components/tailwind/collapsable/TCollapsable.vue";
import {
  useTableHeader,
  useShowDetails,
  useTableVariant,
  useTableSort
} from "@/compositionFunctions/table";

export default defineComponent({
  name: "TTable",
  inheritAttrs: false,
  components: { TCollapsable, TTh },
  emits: {
    sort(_: { key: string; sort: Table.SortEnum; setSort: Function }) {
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
    },
    rounded: {
      //TODO support rounded later
      type: Boolean,
      default: () => true
    },
    grid: {
      type: Boolean,
      default: () => false
    }
  },
  setup(props, { emit, slots }) {
    const { getHeaders, getHeaderLength } = useTableHeader(props);
    const getLength = computed(() => props.items.length);
    const hasRowDetailsSlot = !!slots.rowDetails;
    const resetFlag = ref(false);
    const resetShowDetails = () => {
      if (hasRowDetailsSlot) {
        resetFlag.value = true;
      }
    };

    const { getItems, onSort, activeSort } = useTableSort(
      props,
      { emit },
      resetShowDetails
    );
    const { getRowVariant, getCellVariant } = useTableVariant(getItems);
    const { getShowDetails, toggleDetails } = useShowDetails(
      getItems,
      resetFlag
    );

    return {
      hasRowDetailsSlot,
      hasCellSlot: !!slots.cell,
      activeSort,
      slots,
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
