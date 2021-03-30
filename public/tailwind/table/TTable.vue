<template>
  <template v-if="card && renderCard">
    <div
      data-name="table-cardBreakpoint"
      :class="renderClass('sm:hidden', 'cardBreakpoint')"
    >
      <template v-if="loading">
        <template v-if="hasCardLoadingSlot">
          <slot name="card-loading"></slot>
        </template>
        <template v-else>
          <t-loading v-bind="loadingProps"></t-loading>
          <p
            data-name="table-loadingText"
            :class="renderClass('mt-2 text-sm text-gray-400', 'loadingText')"
          >
            {{ loadingText }}
          </p>
        </template>
      </template>
      <template v-else v-for="i in getLength" :key="`row-item-${i}`">
        <div
          data-name="table-cardContainer"
          :class="
            renderClass(`${getRowVariant(i)} m-3`, 'cardContainer', {
              'rounded-md': rounded
            })
          "
        >
          <div
            v-for="(headerItem, index) in getHeaders"
            :key="`td-item-${index}-${headerItem.key}`"
            data-name="table-cardCell"
            :class="[
              renderClass(
                `${getCellVariant(
                  i,
                  headerItem.key
                )} border-grey-light border p-3`,
                'cardCell',
                {
                  'first:rounded-t-inherit last:rounded-b-inherit': rounded,
                  [hoverClass]: hover,
                  [stripedClass]: striped && i % 2 !== 0
                }
              )
            ]"
          >
            <template
              v-if="!slots[`card-cell(${headerItem.key})`] && !hasCardCellSlot"
            >
              <div
                data-name="table-cardCellInnerContainer"
                :class="
                  renderClass(
                    'flex justify-between items-center',
                    'cardCellInnerContainer'
                  )
                "
              >
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
                  data-name="table-cardCounter"
                  :class="
                    renderClass(
                      'pl-2 whitespace-nowrap text-sm text-gray-500',
                      'cardCounter'
                    )
                  "
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
          <t-collapsable
            data-name="table-cardCollapse"
            :class="renderClass('', 'cardCollapse')"
            :show="getShowDetails(i)"
          >
            <slot
              name="rowDetails"
              :show="getShowDetails(i)"
              :isCard="false"
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

  <template v-if="renderTable">
    <div
      data-name="table-breakpoint"
      :class="renderClass('mx-4', 'breakpoint', { 'hidden sm:block': card })"
      v-bind="$attrs"
    >
      <div
        data-name="table-container"
        :class="renderClass('overflow-x-auto scrollbar-sm', 'container')"
      >
        <div
          data-name="table-innerContainer"
          :class="
            renderClass(
              'py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8',
              'innerContainer'
            )
          "
        >
          <div
            data-name="table-shadowBox"
            :class="
              renderClass(
                'shadow overflow-hidden border-b border-gray-200',
                'shadowBox',
                { 'rounded-md': rounded }
              )
            "
          >
            <table
              data-name="table-table"
              :class="
                renderClass('min-w-full divide-y divide-gray-200', 'table')
              "
            >
              <thead
                data-name="table-thead"
                :class="renderClass('bg-gray-50', 'thead')"
              >
                <tr data-name="table-headTr" :class="renderClass('', 'headTr')">
                  <template v-if="hasCounter">
                    <t-th
                      key="counter"
                      :active-sort="activeSort"
                      @sort="onSort"
                      :item="{ key: '#', label: '#', sortable: false }"
                      scope="col"
                      data-name="table-headCounter"
                      :class="
                        renderClass(
                          'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                          'headCounter'
                        )
                      "
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
                    :class="
                      renderClass(
                        'px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
                        'headTh'
                      )
                    "
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
                data-name="table-tbody"
                :class="
                  renderClass('bg-white', 'tbody', {
                    'divide-y divide-gray-200': divideY
                  })
                "
              >
                <template v-if="loading">
                  <td
                    data-name="table-loadingContainer"
                    :class="renderClass('py-4', 'loadingContainer')"
                    :colspan="getHeaderLength"
                  >
                    <template v-if="hasLoadingSlot">
                      <slot name="loading"></slot>
                    </template>
                    <template v-else>
                      <t-loading v-bind="loadingProps"></t-loading>
                      <p
                        data-name="table-loadingText"
                        :class="
                          renderClass(
                            'mt-2 text-sm text-gray-400',
                            'loadingText'
                          )
                        "
                      >
                        {{ loadingText }}
                      </p>
                    </template>
                  </td>
                </template>
                <template v-else v-for="i in getLength" :key="`row-item-${i}`">
                  <tr
                    data-name="table-tr"
                    :class="[
                      renderClass(getRowVariant(i), 'tr', {
                        'divide-x divide-x-reverse': divideX,
                        [hoverClass]: hover,
                        [stripedClass]: striped && i % 2 !== 0
                      })
                    ]"
                    @mouseenter="onMouseenter(i)"
                    @mouseleave="onMouseleave(i)"
                  >
                    <td
                      v-if="hasCounter"
                      data-name="table-counter"
                      :class="
                        renderClass(
                          'px-6 py-4 whitespace-nowrap text-sm text-gray-500',
                          'counter'
                        )
                      "
                    >
                      {{ i }}
                      <slot name="counter" :value="i"></slot>
                    </td>

                    <td
                      v-for="(headerItem, index) in getHeaders"
                      :key="`td-item-${index}-${headerItem.key}`"
                      :class="
                        renderClass(
                          `${getCellVariant(
                            i,
                            headerItem.key
                          )} px-6 py-4 whitespace-nowrap text-sm text-gray-500`,
                          'td'
                        )
                      "
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
                    <tr
                      data-name="table-detailsTr"
                      :class="renderClass('', 'detailsTr')"
                    >
                      <td
                        data-name="table-detailsTd"
                        :class="renderClass('', 'detailsTd')"
                        :colspan="getHeaderLength"
                      >
                        <t-collapsable :show="getShowDetails(i)">
                          <slot
                            name="rowDetails"
                            :show="getShowDetails(i)"
                            :isCard="false"
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
  </template>
</template>

<script lang="ts">
import { computed, defineComponent, inject, PropType, ref } from "vue";
import { Table } from "@/utility/types/base-component-types";
import TTh from "@/components/tailwind/table/TTh.vue";
import TCollapsable from "@/components/tailwind/collapsable/TCollapsable.vue";
import {
  useTableHeader,
  useShowDetails,
  useTableVariant,
  useTableSort
} from "@/compositionFunctions/table";
import { useRenderClass } from "@/compositionFunctions/settings";
import TLoading from "@/components/tailwind/loading/TLoading.vue";

export default defineComponent({
  name: "TTable",
  inheritAttrs: false,
  components: { TLoading, TCollapsable, TTh },
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
      default: () => inject("t-table-localSort", true)
    },
    rounded: {
      type: Boolean,
      default: () => inject("t-table-rounded", true)
    },
    card: {
      type: Boolean,
      default: () => inject("t-table-card", true)
    },
    renderTable: {
      type: Boolean,
      default: () => inject("t-table-renderTable", true)
    },
    renderCard: {
      type: Boolean,
      default: () => inject("t-table-renderCard", true)
    },
    loading: {
      type: Boolean,
      default: () => inject("t-table-loading", false)
    },
    loadingText: {
      type: String,
      default: () => inject("t-table-loadingText", "Loading")
    },
    loadingProps: {
      type: Object,
      default: () =>
        inject("t-table-loadingProps", {
          colorClass: "border-gray-300",
          size: "md",
          type: "spinner"
        })
    },
    divideX: {
      type: Boolean,
      default: () => inject("t-table-divideX", true)
    },
    divideY: {
      type: Boolean,
      default: () => inject("t-table-divideY", true)
    },
    hasCounter: {
      type: Boolean,
      default: () => inject("t-table-hasCounter", true)
    },
    hasCardCounter: {
      type: Boolean,
      default: () => inject("t-table-hasCardCounter", true)
    },
    hover: {
      type: Boolean,
      default: () => inject("t-table-hover", true)
    },
    hoverClass: {
      type: String,
      default: () => inject("t-table-hoverClass", "hover:bg-gray-100")
    },
    striped: {
      type: Boolean,
      default: () => inject("t-table-striped", false)
    },
    stripedClass: {
      type: String,
      default: () => inject("t-table-stripedClass", "bg-gray-50")
    },
    defaultSort: {
      type: Object as PropType<{ key: string; sort: Table.SortEnum }>,
      default: () =>
        inject("t-table-activeSort", {
          key: "",
          sort: "" as Table.SortEnum
        })
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
    const { renderClass } = useRenderClass("table");
    return {
      renderClass,
      onMouseenter,
      onMouseleave,
      hasRowDetailsSlot,
      hasCardLoadingSlot: !!slots["card-loading"],
      hasLoadingSlot: !!slots["loading"],
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
