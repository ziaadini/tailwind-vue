<template>
  <template v-if="card">
    <div class="sm:hidden">
      <template v-for="i in getLength" :key="`row-item-${i}`">
        <div class="m-3" :class="[getRowVariant(i), { 'rounded-md': rounded }]">
          <div
            v-for="(headerItem, index) in getHeaders"
            :key="`td-item-${index}-${headerItem.key}`"
            class="border-grey-light border p-3"
            :class="[
              getCellVariant(i, headerItem.key),
              { 'first:rounded-t-inherit last:rounded-b-inherit': rounded },
              { [hoverClass]: hover },
              { [stripedClass]: striped && i % 2 !== 0 }
            ]"
          >
            <template
              v-if="!slots[`card-cell(${headerItem.key})`] && !hasCardCellSlot"
            >
              <div class="flex justify-between items-center">
                <t-th
                  tag="div"
                  :key="`header-${index}-${headerItem.key}`"
                  :active-sort="activeSort"
                  @sort="onSort"
                  :item="headerItem"
                >
                  <template v-if="hasCardHeaderSlot" #default="data">
                    <div>
                      <slot name="card-header" v-bind="data"></slot>
                    </div>
                  </template>
                </t-th>
                <div
                  v-if="hasCardCounter && index === 0"
                  class="pl-2 whitespace-nowrap text-sm text-gray-500"
                >
                  {{ i }}
                  <slot name="card-counter" :value="i"></slot>
                </div>
              </div>

              <div>
                {{ getItems[i - 1][headerItem.key] }}
              </div>
            </template>
            <template v-else-if="slots[`card-cell(${headerItem.key})`]">
              <slot
                :name="`card-cell(${headerItem.key})`"
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
                name="card-cell"
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
          </div>
        </div>
        <template v-if="hasRowDetailsSlot">
          <t-collapsable :show="getShowDetails(i)">
            <slot
              name="rowDetails"
              :show="getShowDetails(i)"
              :isCard="false"
              :column="index"
              :row="i - 1"
              :rowItem="getItems[i - 1]"
              :toggleDetails="
                () => {
                  toggleDetails(i);
                }
              "
            ></slot>
          </t-collapsable>
        </template>
      </template>
    </div>
  </template>

  <div v-bind="$attrs" :class="{ 'hidden sm:block': card }" class="mx-4">
    <div class="flex flex-col">
      <div class="overflow-x-auto scrollbar-sm">
        <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div
            class="shadow overflow-hidden border-b border-gray-200"
            :class="{ 'rounded-md': rounded }"
          >
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <!--        <template v-for="i in getLength" :key="`header-item-${i}`">-->
                <tr>
                  <template v-if="hasCounter">
                    <t-th
                      key="counter"
                      :active-sort="activeSort"
                      @sort="onSort"
                      :item="{ key: '#', label: '#', sortable: false }"
                      scope="col"
                      class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      <template v-if="hasHeaderSlot" #default="data">
                        <div>
                          <slot name="header" v-bind="data"></slot>
                        </div>
                      </template>
                    </t-th>
                  </template>
                  <t-th
                    v-for="(headerItem, index) in getHeaders"
                    :key="`header-${index}-${headerItem.key}`"
                    :active-sort="activeSort"
                    @sort="onSort"
                    :item="headerItem"
                    scope="col"
                    class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    <template v-if="hasHeaderSlot" #default="data">
                      <div>
                        <slot name="header" v-bind="data"></slot>
                      </div>
                    </template>
                  </t-th>
                </tr>
                <!--        </template>-->
              </thead>
              <tbody
                class="bg-white"
                :class="{ 'divide-y divide-gray-200': divideY }"
              >
                <template v-for="i in getLength" :key="`row-item-${i}`">
                  <tr
                    :class="[
                      getRowVariant(i),
                      { 'divide-x divide-x-reverse': divideX },
                      { [hoverClass]: hover },
                      { [stripedClass]: striped && i % 2 !== 0 }
                    ]"
                    @mouseenter="onMouseenter(i)"
                    @mouseleave="onMouseleave(i)"
                  >
                    <td
                      v-if="hasCounter"
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                    >
                      {{ i }}
                      <slot name="counter" :value="i"></slot>
                    </td>

                    <td
                      v-for="(headerItem, index) in getHeaders"
                      :key="`td-item-${index}-${headerItem.key}`"
                      class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
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
                          <slot
                            name="rowDetails"
                            :show="getShowDetails(i)"
                            :isCard="false"
                            :column="index"
                            :row="i - 1"
                            :rowItem="getItems[i - 1]"
                            :toggleDetails="
                              () => {
                                toggleDetails(i);
                              }
                            "
                          ></slot>
                        </t-collapsable>
                      </td>
                    </tr>
                  </template>
                </template>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
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
      type: Boolean,
      default: () => true
    },
    card: {
      type: Boolean,
      default: () => true
    },
    divideX: {
      type: Boolean,
      default: () => true
    },
    divideY: {
      type: Boolean,
      default: () => true
    },
    hasCounter: {
      type: Boolean,
      default: () => true
    },
    hasCardCounter: {
      type: Boolean,
      default: () => true
    },
    hover: {
      type: Boolean,
      default: () => true
    },
    hoverClass: {
      type: String,
      default: "hover:bg-gray-100"
    },
    striped: {
      type: Boolean,
      default: () => true
    },
    stripedClass: {
      type: String,
      default: "bg-gray-50"
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
    const {
      getRowVariant,
      getCellVariant,
      onMouseenter,
      onMouseleave
    } = useTableVariant(getItems, props.hover);
    const { getShowDetails, toggleDetails } = useShowDetails(
      getItems,
      resetFlag
    );

    return {
      onMouseenter,
      onMouseleave,
      hasRowDetailsSlot,
      hasCellSlot: !!slots.cell,
      hasCardCellSlot: !!slots["card-cell"],
      hasHeaderSlot: !!slots.header,
      hasCardHeaderSlot: !!slots["card-header"],
      activeSort,
      slots,
      toggleDetails,
      getShowDetails,
      getHeaders,
      getHeaderLength: getHeaderLength.value + (props.hasCounter ? 1 : 0),
      getLength,
      onSort,
      getItems,
      getRowVariant,
      getCellVariant
    };
  }
});
</script>
