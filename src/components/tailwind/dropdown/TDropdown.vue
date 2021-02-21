<template>
  <div
    class="relative"
    @mouseenter="hoverTriggerMenu(true)"
    @mouseleave="hoverTriggerMenu(false)"
    :class="{
      'rounded-sm': isClosed,
    }"
  >
    <!-- parent section -->
    <!-- header slot  -->
    <template v-if="hasHeaderSlot">
      <div ref="dropdownParentRef">
        <slot
          name="header"
          :selectedItem="selectedItem"
          :label="selectedItem.label"
          :value="selectedItem.value"
          :selected-text="selectedItem.label || placeholder"
          :triggerMenu="triggerMenu"
          v-bind="$attrs"
        ></slot>
      </div>
    </template>
    <!-- default dropdown header & activator slot-->
    <template v-else>
      <div
        ref="dropdownParentRef"
        class="rounded-sm cursor-pointer w-64 h-10 flex items-center justify-center"
        :class="[
          isClosed && 'rounded-sm',
          {
            'rounded-full': isClosedRounded,
            'rounded-md': isOpenedRounded,
            'rounded-b-none': isOpened && !isOverflowed,
            'rounded-t-none': isOpened && isOverflowed,
          },
          parentClass,
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
          <div class="flex flex-row justify-center items-center w-full">
            <span class="mr-4 ml-2 overflow-ellipsis overflow-hidden h-full">
              {{ selectedItem.label || placeholder }}
            </span>
            <TTriangle
              class="mr-auto ml-4"
              :direction="arrowDirection"
              :variant="''"
            />
          </div>
        </template>
      </div>
    </template>

    <!-- items -->
    <!-- slot for prepend items & item slot -->
    <div
      ref="dropdownRef"
      :class="[
        {
          'opacity-0 -translate-y-1/2 z-0 scale-y-0': isClosed,
          'rounded-b-sm': isOpened && !isOverflowed,
          'border border-gray-200 border-t-0': variant === 'white',
          'rounded-b-md': rounded && !isOverflowed,
          'rounded-b-none': rounded && isOverflowed,
          'rounded-t-md': rounded && isOverflowed,
          '-translate-y-full top-0': isOverflowed,
          'z-30': !hover,
          'z-40': hover,
          'divide-y': divide,
        },
        `duration-${animationDelay}`,
      ]"
      class="max-h-48 overflow-y-auto scrollbar-sm transform ease-in-out cursor-pointer transition w-64 absolute bg-white"
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
            class="py-2 overflow-ellipsis overflow-hidden"
            :class="[
              childClass,
              {
                'bg-gray-100': selectedItem.value === item.value,
              },
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
              {{ item.label }}
            </template>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { arrowDirections, variants } from "@/utility/css-helper";
import {
  useIsVisible,
  visibilityOverflow,
} from "@/compositionFunctions/visible";
import {
  computed,
  defineComponent,
  nextTick,
  PropType,
  reactive,
  ref,
  toRefs,
  watch,
  watchEffect,
} from "vue";
import { DropDown } from "@/utility/types/base-component-types";
import { useKeyDown } from "@/compositionFunctions/keyboardEvents";
import { useClickOutside } from "@/compositionFunctions/clickEvents";
import TTriangle from "@/components/tailwind/triangle/TTriangle.vue";
export default defineComponent({
  props: {
    variant: {
      type: String,
      default: variants.white,
      validator: (propValue: string) => {
        return !!variants[propValue];
      },
    },
    modelValue: {
      type: String,
    },
    divide: {
      type: Boolean,
      default: true,
    },
    item: {
      type: Object,
      default: () => ({ label: undefined, value: undefined }),
    },
    outline: {
      type: Boolean,
      default: true,
      required: false,
    },
    placeholder: {
      type: String,
      default: "",
      required: false,
    },
    rounded: {
      type: Boolean,
      default: false,
      required: false,
    },
    hover: {
      type: Boolean,
      default: false,
      required: false,
    },
    top: {
      type: Boolean,
      default: false,
      required: false,
    },
    items: {
      default: [],
      type: Array as PropType<DropDown.Root>,
    },
    opened: {
      type: Boolean,
      default: false,
      required: false,
    },
    searchKey: {
      type: String,
      default: "",
    },
    labelField: {
      type: String,
      default: "label",
    },
    valueField: {
      type: String,
      default: "value",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    toggleByHeader: {
      type: Boolean,
      default: true,
    },
    parentColorClasses: {
      type: String,
      default: "",
    },
    itemsColorClasses: {
      type: String,
      default: "",
    },
    animationDelay: {
      type: String,
      default: "200",
    },
  },
  components: { TTriangle },
  setup(props, { emit, slots }) {
    const baseClass = computed(
      () =>
        `bg-${
          props.variant === variants.white
            ? `${props.variant} text-dark bg-white border border-gray-200`
            : `${props.variant} text-white`
        }  transition ${props.disabled ? "opacity-50" : "hover:opacity-80"}`
    );
    const outlineClass = computed(
      () =>
        ` border hover:shadow ${
          props.disabled
            ? "bg-gray-100"
            : `border-${props.variant}-50 shadow-sm hover:bg-${props.variant}-50`
        }`
    );
    const childClass = `bg-${props.variant}-50 hover:bg-${props.variant}-50 hover:opacity-60 focus:border-${props.variant} transition`;

    const state = reactive({
      selected: null as any,
      opened: props.opened,
      disabled: false,
    });

    const { items, opened, disabled } = toRefs(props);

    // initiate refs
    const dropdownRef = ref(null);
    const dropdownParentRef = ref(null);

    const containerRef = computed(function() {
      return !props.toggleByHeader ? dropdownParentRef : dropdownRef;
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

    function updateSelectedValue(item: any) {
      state.selected = item.value;
      emit("update:modelValue", item.value);
      emit("update:item", item);
    }

    // init clickoutside
    const { clickedOutside, registerEvent, unRegisterEvent } = useClickOutside(
      containerRef.value
    );

    // init dropdown visibility
    const { placement, handlePlacement, isOpen: isVisibleWatch } = useIsVisible(
      dropdownRef,
      dropdownParentRef
    );

    // handle dropdown visibility
    function hasPlacementPosition(position: visibilityOverflow) {
      return placement.value?.includes(position);
    }
    const isOverflowed = computed(() => {
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

    // initialize dropdown items
    const itemFactory = computed(() => {
      if (!items.value || items.value.length === 0) return [];

      const newItems = [] as DropDown.ObjectForm[];

      items.value.forEach((item) => {
        if (typeof item === "string") {
          newItems.push({
            label: item,
            value: item,
          });
        } else {
          newItems.push({
            label: item[props.labelField],
            value: item[props.valueField],
          });
        }
      });

      if (props.searchKey) {
        return newItems.filter((i) =>
          i.label.toLowerCase().includes(props.searchKey.toLowerCase())
        );
      }

      return newItems;
    });
    const selectedItem = computed(() => {
      return (
        itemFactory.value.find((e) => e.value === state.selected) || {
          label: false,
        }
      );
    });
    const getModelValue = computed(() =>
      props.item.value !== undefined ? props.item.value : props.modelValue
    );

    watch(
      getModelValue,
      (value) => {
        if (value !== state.selected) state.selected = value;
      },
      { immediate: true }
    );

    const handleEmitOpened = async () => {
      emit("update:opened", isVisibleWatch.value);
      await nextTick();
      handlePlacement();
    };

    // handle open and close state of dropdown
    async function triggerMenu(value = null as any) {
      // handle disabled
      if (state.disabled) return;
      if (value !== state.opened) {
        isVisibleWatch.value = state.opened = value;
        await handleEmitOpened();
      } else if (value === null) {
        isVisibleWatch.value = state.opened = !state.opened;
        await handleEmitOpened();
      }
    }

    // handle disabled state
    watch(disabled, (value) => {
      if (value) triggerMenu(false);
      state.disabled = value;
    });

    function selectItem(item) {
      triggerMenu(false);
      updateSelectedValue(item);
    }

    // handle clickoutside
    const onEscape = (e: any) => {
      if (e.key === "Esc" || e.key === "Escape") {
        triggerMenu(false);
      }
    };
    useKeyDown(onEscape);
    watch(clickedOutside, (value) => {
      if (value) {
        triggerMenu(false);
      }
    });

    function hoverTriggerMenu(value: boolean) {
      if (props.hover) {
        triggerMenu(value);
      }
    }

    watchEffect(() => {
      if (opened.value || state.opened) {
        triggerMenu(true);
        registerEvent();
      } else {
        unRegisterEvent();
      }
    });

    // handle arrow direction
    const arrowDirection = computed(function() {
      if (props.top) {
        if (state.opened) {
          if (isOverflowed.value) {
            return arrowDirections["arrow-up"];
          }
          return arrowDirections["arrow-down"];
        } else {
          return arrowDirections["arrow-up"];
        }
      } else {
        if (state.opened) {
          if (isOverflowed.value) {
            return arrowDirections["arrow-down"];
          }
          return arrowDirections["arrow-up"];
        }
        return arrowDirections["arrow-down"];
      }
    });

    return {
      hasHeaderSlot: !!slots.header,
      hasItemSlot: !!slots.item,
      hasLabelSlot: !!slots.label,
      hasActivatorSlot: !!slots.activator,
      parentClass:
        props.parentColorClasses || props.outline ? outlineClass : baseClass,
      childClass: props.itemsColorClasses || childClass,
      isOpened,
      isClosed,
      isClosedRounded,
      isOpenedRounded,
      getItems: itemFactory,
      hasItem: computed(() => !!itemFactory.value.length),
      triggerMenu,
      hoverTriggerMenu,
      selectItem,
      selectedItem,
      state,
      dropdownRef,
      dropdownParentRef,
      isOverflowed,
      placement,
      arrowDirection,
    };
  },
});
</script>
