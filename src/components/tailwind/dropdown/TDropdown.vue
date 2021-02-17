<template>
  <div
    class="relative"
    @mouseenter="hover && triggerMenu(true)"
    @mouseleave="hover && triggerMenu(false)"
    :class="{
      'rounded-sm': isClosed
    }"
  >
    <template v-if="hasHeaderSlot">
      <div ref="dropdownParentRef">
        <slot
          name="header"
          :selectedItem="selectedItem"
          :label="selectedItem.label"
          :value="selectedItem.value"
          :selected-text="selectedItem.label || placeholder"
          :triggerMenu="triggerMenu"
        ></slot>
      </div>
    </template>
    <template v-else>
      <!-- parent -->
      <div
        ref="dropdownParentRef"
        class="rounded-sm cursor-pointer w-64 h-10 flex items-center justify-center"
        :class="[
          isClosed && 'rounded-sm',
          {
            'rounded-full': isClosedRounded,
            'rounded-md': isOpenedRounded,
            'rounded-b-none': isOpened && !isBottomOverflowed,
            'rounded-t-none': isOpened && isBottomOverflowed
          },
          parentClass
        ]"
        @click="triggerMenu(true)"
      >
        <template v-if="hasActivatorSlot">
          <slot
            name="activator"
            :selectedItem="selectedItem"
            :label="selectedItem.label"
            :value="selectedItem.value"
            :selected-text="selectedItem.label || placeholder"
          ></slot>
        </template>
        <template v-else>
          {{ selectedItem.label || placeholder }}
        </template>
      </div>
    </template>

    <!-- items -->
    <div
      ref="dropdownRef"
      :class="{
        'opacity-0 -translate-y-1/2 z-0 scale-y-0': isClosed,
        shadow: isBottomOverflowed,
        'rounded-b-md': rounded,
        'rounded-b-none': rounded && isBottomOverflowed,
        'rounded-t-md': rounded && isBottomOverflowed,
        '-translate-y-full top-0': isBottomOverflowed,
        'z-30': !hover,
        'z-40': hover,
        'divide-y': divide
      }"
      class="duration-200 transform ease-in-out cursor-pointer transition w-64 absolute bg-white"
    >
      <slot name="prepend" :hasItem="hasItem"></slot>
      <template v-for="(item, index) in getItems" :key="index">
        <template v-if="hasItemSlot">
          <slot
            name="item"
            :original-item="items[index]"
            :item="item"
            :index="index"
          ></slot>
        </template>
        <template v-else>
          <div
            class="py-2"
            :class="[
              childClass,
              {
                'rounded-b-md':
                  index + 1 === items.length && rounded && !isBottomOverflowed,
                'rounded-t-md': index === 0 && rounded && isBottomOverflowed,
                'rounded-b-none': rounded && isBottomOverflowed,
                'bg-gray-100': selectedItem.value === item.value
              }
            ]"
            @click="selectItem(item)"
          >
            <template v-if="hasLabelSlot">
              <slot
                name="label"
                :item="item"
                :original-item="items[index]"
                :index="index"
              ></slot>
            </template>
            <template v-else>
              <template v-if="hasLabelSlot">
                <slot
                  name="label"
                  :item="item"
                  :original-item="items[index]"
                  :index="index"
                ></slot>
              </template>
              <template v-else>
                {{ item.label }}
              </template>
            </template>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { variants } from "@/utility/css-helper";
import {
  useIsVisible,
  visibilityOverflow
} from "@/compositionFunctions/visible";
import {
  computed,
  defineComponent,
  PropType,
  reactive,
  toRefs,
  watch,
  watchEffect
} from "vue";
import { DropDown } from "@/utility/types/base-component-types";
import { useKeyDown } from "@/compositionFunctions/keyboardEvents";
import { useClickOutside } from "@/compositionFunctions/clickEvents";
export default defineComponent({
  props: {
    variant: {
      type: String,
      default: "primary",
      validator: (propValue: string) => {
        return !!variants[propValue];
      }
    },
    modelValue: {
      type: String
    },
    divide: {
      type: Boolean,
      default: true
    },
    item: {
      type: Object,
      default: () => ({ label: undefined, value: undefined })
    },
    outline: {
      type: Boolean,
      default: true,
      required: false
    },
    placeholder: {
      type: String,
      default: "",
      required: false
    },
    rounded: {
      type: Boolean,
      default: false,
      required: false
    },
    hover: {
      type: Boolean,
      default: false,
      required: false
    },
    top: {
      type: Boolean,
      default: false,
      required: false
    },
    items: {
      default: [],
      type: Array as PropType<DropDown.Root>
    },
    opened: {
      type: Boolean,
      default: false,
      required: false
    },
    itemValue: {
      type: String,
      default: "value"
    },
    itemText: {
      type: String,
      default: "label"
    },
    searchKey: {
      type: String,
      default: ""
    }
  },
  setup(props, { emit, slots }) {
    const baseClass = `bg-${props.variant} text-white hover:opacity-80 transition`;
    const outlineClass = `border-${props.variant}-50 shadow-sm border hover:bg-${props.variant}-50 hover:shadow`;
    const childClass = `bg-${props.variant}-50 hover:bg-${props.variant}-50 hover:opacity-60 focus:border-${props.variant} transition`;

    const state = reactive({
      selected: null as any,
      opened: props.opened
    });

    const isOpened = computed(() => {
      return state.opened;
    });

    const isClosed = computed(() => {
      return !isOpened.value;
    });

    const isClosedRounded = computed(() => {
      return isClosed.value && props.rounded;
    });
    const isOpenedRounded = computed(() => {
      return isOpened.value && props.rounded;
    });

    const {
      clickedOutside,
      elementRef: dropdownRef,
      registerEvent,
      unRegisterEvent
    } = useClickOutside();

    const { items, opened } = toRefs(props);

    const getModelValue = computed(() =>
      props.item.value !== undefined ? props.item.value : props.modelValue
    );
    watch(clickedOutside, value => {
      console.log("watch clickoutside", value);
      if (value) {
        emit("update:opened", false);
        state.opened = false;
      }
    });

    const onEscape = (e: any) => {
      if (e.key === "Esc" || e.key === "Escape") {
        emit("update:opened", false);
        state.opened = false;
      }
    };

    useKeyDown(onEscape);

    const itemFactory = computed(() => {
      if (!items.value || items.value.length === 0) return [];

      const newItems = [] as DropDown.ObjectForm[];

      items.value.forEach(item => {
        if (typeof item === "string") {
          newItems.push({
            label: item,
            value: item
          });
        } else {
          newItems.push({
            label: item[props.itemText],
            value: item[props.itemValue]
          });
        }
      });

      if (props.searchKey) {
        return newItems.filter(i =>
          i.label.toLowerCase().includes(props.searchKey.toLowerCase())
        );
      }

      return newItems;
    });

    const selectItem = item => {
      state.opened = false;
      emit("update:opened", false);
      state.selected = item.value;
      emit("update:modelValue", item.value);
      emit("update:item", item);
    };

    const selectedItem = computed(() => {
      return (
        itemFactory.value.find(e => e.value === state.selected) || {
          label: false
        }
      );
    });

    watch(getModelValue, value => {
      if (value !== state.selected) state.selected = value;
    });

    const triggerMenu = (value = null as any) => {
      console.log("triggerMenu called", value);
      if (value !== null) {
        state.opened = value;
        emit("update:opened", value);
      } else {
        state.opened = !opened.value;
        emit("update:opened", !opened.value);
      }
    };

    watchEffect(() => {
      if (opened.value || state.opened) {
        triggerMenu(true);
        registerEvent();
      } else {
        unRegisterEvent();
      }
    });

    const { placement, parentElement: dropdownParentRef } = useIsVisible(
      dropdownRef
    );

    const hasPlacementPosition = (position: visibilityOverflow) => {
      return placement.value?.includes(position);
    };

    const isBottomOverflowed = computed(() => {
      if (props.top) {
        if (hasPlacementPosition(visibilityOverflow.top)) return true;
        else {
          if (hasPlacementPosition(visibilityOverflow.bottom)) {
            return false;
          } else return true;
        }
      } else {
        if (hasPlacementPosition(visibilityOverflow.bottom)) return false;
        else {
          if (hasPlacementPosition(visibilityOverflow.top)) {
            return true;
          } else return false;
        }
      }
    });

    return {
      hasHeaderSlot: !!slots.header,
      hasItemSlot: !!slots.item,
      hasLabelSlot: !!slots.label,
      hasActivatorSlot: !!slots.activator,
      parentClass: props.outline ? outlineClass : baseClass,
      childClass,
      isOpened,
      isClosed,
      isClosedRounded,
      isOpenedRounded,
      getItems: itemFactory,
      hasItem: computed(() => !!itemFactory.value.length),
      triggerMenu,
      selectItem,
      selectedItem,
      state,
      dropdownRef,
      dropdownParentRef,
      isBottomOverflowed,
      placement
    };
  }
});
</script>
