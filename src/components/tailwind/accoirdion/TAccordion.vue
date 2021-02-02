<template>
  <div v-for="(item, index) in items" :key="index">
    <template v-if="hasTitleSlot">
      <div @click="toggle(index)">
        <slot
          name="title"
          :show="
            bindToAnimate[index] ? bindToAnimate[index]['data-show'] : false
          "
          v-bind="item"
          :index="index"
        ></slot>
      </div>
    </template>
    <template v-else>
      <div
        data-name="accordion-title"
        :class="[
          {
            [renderClass('cursor-pointer', 'title-enabled')]: !item.disabled,
            [renderClass('cursor-not-allowed', 'title-disabled')]: item.disabled
          },
          renderClass('', 'title')
        ]"
        @click="toggle(index)"
      >
        {{ item.title }}
      </div>
    </template>

    <template v-if="hasTextSlot">
      <div
        data-name="accordion-text"
        :class="
          renderClass(
            'transform transition-all overflow-hidden duration-300',
            'text'
          )
        "
        v-bind="bindToAnimate[index]"
        :ref="el => (itemRefs[index] = el)"
      >
        <slot
          name="text"
          :show="
            bindToAnimate[index] ? bindToAnimate[index]['data-show'] : false
          "
          v-bind="item"
          :index="index"
        ></slot>
      </div>
    </template>

    <template v-else>
      <div
        data-name="accordion-text"
        :class="
          renderClass(
            'transform transition-all overflow-hidden duration-300',
            'text'
          )
        "
        v-bind="bindToAnimate[index]"
        :ref="el => (itemRefs[index] = el)"
      >
        {{ item.text }}
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  PropType,
  ref,
  watch,
  nextTick
} from "vue";
import { useRenderClass } from "@/compositionFunctions/settings";

export default defineComponent({
  name: "TAccordion",
  props: {
    items: {
      type: Array as PropType<ReadonlyArray<{ [key: string]: unknown }>>,
      default: () => {
        return [];
      }
    },
    collapse: {
      type: Boolean,
      default: () => false
    }
  },
  setup(props, { slots }) {
    const bindToAnimate = ref<object[]>([]);
    const itemRefs = ref<Element[]>([]);
    const getBinding = (index, show) => {
      if (show) {
        return {
          style: `max-height: ${itemRefs.value[index].scrollHeight}px`,
          "data-show": true
        };
      } else {
        return { class: "max-h-0 opacity-0", "data-show": false };
      }
    };

    const initialBinding = () => {
      props.items.forEach((item, index) => {
        bindToAnimate.value[index] = getBinding(index, item.selected);
      });
    };

    onMounted(() => {
      initialBinding();
    });
    watch(
      () => props.items,
      () => {
        nextTick(() => {
          initialBinding();
        });
      },
      { deep: true }
    );

    const toggle = index => {
      if (!props.items[index].disabled) {
        const dataShow = bindToAnimate.value[index]["data-show"];
        if (!props.collapse) {
          bindToAnimate.value.forEach((_, index) => {
            bindToAnimate.value[index] = getBinding(index, false);
          });
        }
        bindToAnimate.value[index] = getBinding(index, !dataShow);
      }
    };
    const { renderClass } = useRenderClass("accordion");
    return {
      renderClass,
      hasTitleSlot: !!slots.title,
      hasTextSlot: !!slots.text,
      bindToAnimate,
      itemRefs,
      toggle
    };
  }
});
</script>
