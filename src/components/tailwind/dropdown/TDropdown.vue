<template>
  isOverflowed: {{ isOverflowed }} roundedClass: {{ roundedClass }}
  <br />
  <div
    class="relative"
    @mouseenter="hoverTriggerMenu(true)"
    @mouseleave="hoverTriggerMenu(false)"
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
        data-name="dropdown-parent"
        :class="[
          renderClass(
            `cursor-pointer w-64 h-10 flex items-center justify-center ${parentRoundedClass} ${parentClass}`,
            'parent'
          ),
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
          <div
            data-name="dropdown-parentWrapper"
            :class="[
              renderClass(
                'flex flex-row justify-center items-center w-full',
                'parentWrapper'
              ),
            ]"
          >
            <span
              data-name="dropdown-parentWrapperText"
              :class="[
                renderClass(
                  'mr-4 ml-2 overflow-ellipsis overflow-hidden h-full',
                  'parentWrapperText'
                ),
              ]"
            >
              {{ selectedItem.label || placeholder }}
            </span>
            <TTriangle
              :class="[renderClass('mr-auto ml-4', 'parentWrapperTriangle')]"
              data-name="dropdown-parentWrapperTriangle"
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
        renderClass(
          `${handleBorderType} ${
            variant === 'white' ? 'border border-gray-200' : ''
          } ${roundedClass}
        duration-${animationDuration}
        ${getAnimationDelay}
        transform
        ${handleVerticalTraslate}`,
          'children',
          {
            'opacity-0 -translate-y-1/2 z-0 scale-y-0': isClosed,
            'z-30': !hover,
            'z-40': hover,
            'divide-y': divide,
          }
        ),
      ]"
      data-name="dropdown-children"
      class="transform overflow-hidden ease-in-out cursor-pointer transition w-64 absolute bg-white"
    >
      <div
        :class="[
          renderClass(
            'overflow-y-auto scrollbar-sm max-h-48',
            'childrenScrollbar'
          ),
        ]"
        data-name="dropdown-childrenScrollbar"
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
                renderClass(
                  'py-2 overflow-ellipsis overflow-hidden ' + childClass,
                  'childrenItem',
                  {
                    'bg-gray-100': selectedItem.value === item.value,
                  }
                ),
                ,
              ]"
              data-name="dropdown-childrenItem"
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
  </div>
</template>

<script lang="ts">
import { arrowDirections, delayType, variants } from "@/utility/css-helper";
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
} from "vue";
import { DropDown } from "@/utility/types/base-component-types";
import { useDelayHandler } from "@/compositionFunctions/delayHandler";
import { useKeyDown } from "@/compositionFunctions/keyboardEvents";
import { useClickOutside } from "@/compositionFunctions/clickEvents";
import { useRenderClass } from "@/compositionFunctions/settings";

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
    animationDuration: {
      type: String,
      default: "200",
    },
    animationDelay: {
      type: String,
      default: "0",
    },
    animationDelayType: {
      type: String as PropType<delayType>,
      default: delayType.both,
      validator: (propValue: string) => {
        return !!delayType[propValue];
      },
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

    // handle animation delay based on type
    const { getAnimationDelay } = useDelayHandler(
      props.animationDelayType,
      props.animationDelay,
      isOpened,
      isClosed
    );

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
        if (hasPlacementPosition(visibilityOverflow.top)) return false;
        else {
          if (hasPlacementPosition(visibilityOverflow.bottom)) {
            return true;
          } else return false;
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

    // handler parent rounded class
    const parentRoundedClass = computed(() => {
      //       'rounded-full': isClosedRounded,
      // 'rounded-md': isOpenedRounded,
      // 'rounded-b-none': isOpened && !isOverflowed,
      // 'rounded-t-none': isOpened && isOverflowed,
      if (isOpened.value) {
        if (!isOverflowed.value) {
          if (props.top) {
            if (props.rounded) {
              return "rounded-b-md";
            }
            return "rounded-b-sm";
          } else {
            if (props.rounded) {
              return "rounded-t-md";
            }
            return "rounded-t-sm";
          }
        } else {
          if (props.top) {
            if (props.rounded) {
              return "rounded-t-md";
            }
            return "rounded-t-sm";
          } else {
            if (props.rounded) {
              return "rounded-b-md";
            }
            return "rounded-b-sm";
          }
        }
      } else {
        if (props.rounded) {
          return "rounded-md";
        } else {
          return "rounded-sm";
        }
      }
    });

    // handle child wrapper rounded classes
    const roundedClass = computed(() => {
      if (!isOverflowed.value) {
        if (props.top) {
          if (props.rounded) {
            return "rounded-t-md";
          }
          return "rounded-t-sm";
        } else {
          if (props.rounded) {
            return "rounded-b-md";
          }
          return "rounded-b-sm";
        }
      } else {
        if (props.top) {
          if (props.rounded) {
            return "rounded-b-md";
          }
          return "rounded-b-sm";
        } else {
          if (props.rounded) {
            return "rounded-t-md";
          }
          return "rounded-t-sm";
        }
      }
      // 'rounded-b-sm': !top && !rounded && !isOverflowed,
      //     'rounded-b-md': !top && rounded && !isOverflowed,
      //     'rounded-t-md': top && rounded && !isOverflowed,
      //     'rounded-b-none': !top && rounded && isOverflowed,
      //     'rounded-t-md': !top && rounded && isOverflowed,
      //     'rounded-t-sm': !top && !rounded && isOverflowed,
      //     'rounded-t-sm': top && !rounded && !isOverflowed,
    });

    const handleVerticalTraslate = computed(() => {
      if (!isOverflowed.value) {
        if (props.top) {
          return "-translate-y-full top-0";
        }
        return "";
      } else {
        if (!props.top) {
          return "-translate-y-full top-0";
        }
        return "";
      }
    });

    const handleBorderType = computed(() => {
      // isOverflowed ? 'border-b-0' : 'border-t-0'
      if (!isOverflowed.value) {
        if (props.top) return "border-b-0";
        return "border-t-0";
      } else {
        if (props.top) return "border-t-0";
        return "border-b-0";
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
      triggerMenu(false);
    });

    function hoverTriggerMenu(value: boolean) {
      if (props.hover) {
        triggerMenu(value);
      }
    }

    watch(opened, (value) => {
      if (value) {
        triggerMenu(true);
      } else {
        triggerMenu(false);
      }
    });

    watch(toRefs(state).opened, (value) => {
      if (value) {
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

    const { renderClass } = useRenderClass("dropdown");

    return {
      hasHeaderSlot: !!slots.header,
      hasItemSlot: !!slots.item,
      hasLabelSlot: !!slots.label,
      hasActivatorSlot: !!slots.activator,
      parentClass:
        props.parentColorClasses || props.outline ? outlineClass : baseClass,
      childClass: props.itemsColorClasses || childClass,
      roundedClass,
      parentRoundedClass,
      handleVerticalTraslate,
      handleBorderType,
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
      getAnimationDelay,
      renderClass,
    };
  },
});
</script>
