<template>
  <component
    :is="tag"
    @click="onClick"
    :data-name="isThTag ? 'th-container' : 'th-cardContainer'"
    :class="[
      renderClass(
        getVariantClass,
        isThTag ? 'th-container' : 'th-cardContainer',
        { 'cursor-pointer': item.sortable }
      )
    ]"
  >
    <div
      :data-name="isThTag ? 'th-innerContainer' : 'th-cardInnerContainer'"
      :class="
        renderClass(
          'flex flex-row items-center',
          isThTag ? 'th-innerContainer' : 'th-cardInnerContainer'
        )
      "
    >
      <div
        :data-name="isThTag ? 'th-sort' : 'th-cardSort'"
        :class="
          renderClass('ml-2', isThTag ? 'th-sort' : 'th-cardSort', {
            hidden: item.key !== activeSort.key
          })
        "
      >
        <t-triangle
          direction="arrow-up"
          :data-name="isThTag ? 'th-arrowUp' : 'th-cardArrowUp'"
          :class="
            renderClass(
              'mt-0.5 transform scale-75',
              isThTag ? 'th-arrowUp' : 'th-cardArrowUp'
            )
          "
          :color-class="
            renderClass(
              activeSort.sort === SortEnum.ASC
                ? 'border-gray-500'
                : 'border-gray-300',
              isThTag ? 'th-arrowUp' : 'th-cardArrowUp'
            )
          "
        ></t-triangle>
        <t-triangle
          direction="arrow-down"
          :data-name="isThTag ? 'th-arrowDown' : 'th-cardArrowDown'"
          :class="
            renderClass(
              'mt-0.5 transform scale-75',
              isThTag ? 'th-arrowDown' : 'th-cardArrowDown'
            )
          "
          :color-class="
            renderClass(
              activeSort.sort === SortEnum.DESC
                ? 'border-gray-500'
                : 'border-gray-300',
              isThTag ? 'th-arrowDown' : 'th-cardArrowDown'
            )
          "
        ></t-triangle>
      </div>
      <template v-if="hasDefaultSlot">
        <slot :item="item" :activeSort="activeSort"></slot>
      </template>
      <template v-else>
        <div
          :data-name="isThTag ? 'th-label' : 'th-cardLabel'"
          :class="renderClass('', isThTag ? 'th-label' : 'th-cardLabel')"
        >
          {{ item.label }}
        </div>
      </template>
    </div>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";
import { Table } from "@/utility/types/base-component-types";
import TTriangle from "@/components/tailwind/triangle/TTriangle.vue";
import { useRenderClass } from "@/compositionFunctions/settings";
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
      const currentSort = props.activeSort?.sort ?? sortRef.value;
      if (currentSort === Table.SortEnum.ASC) {
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

    const isThTag = computed(() => props.tag === "th");
    const { renderClass } = useRenderClass("th");
    return {
      renderClass,
      isThTag,
      onClick,
      getVariantClass,
      SortEnum: Table.SortEnum,
      hasDefaultSlot: !!slots.default
    };
  }
});
</script>

<style scoped></style>
