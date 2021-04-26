<template>
  <div
    class="relative"
    ref="dropdownParentRef"
    @mouseenter="onHoverDropdown(true)"
    @mouseleave="onHoverDropdown(false)"
  >
    <!-- parent section -->
    <!-- header slot  -->
    <template v-if="hasHeaderSlot">
      <div>
        <slot
          name="header"
          :selectedItem="selectedItem"
          :label="selectedItem.label"
          :value="selectedItem.value"
          :selected-text="selectedItem.label || placeholder"
          :triggerDropdown="triggerOpen"
          v-bind="$attrs"
          :class="containerClass"
        ></slot>
      </div>
    </template>
    <!-- default dropdown header & activator slot-->
    <template v-else>
      <div
        data-name="dropdown-parent"
        :class="[
          renderClass(
            `cursor-pointer w-full h-10 flex items-center justify-center ${parentRoundedClass} ${parentClass}`,
            'parent'
          )
        ]"
        @click="triggerOpen(true)"
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
              )
            ]"
          >
            <span
              data-name="dropdown-parentWrapperText"
              :class="[
                renderClass(
                  'mr-4 ml-2 overflow-ellipsis overflow-hidden h-full',
                  'parentWrapperText'
                )
              ]"
            >
              {{ selectedItem.label || placeholder }}
            </span>
            <TTriangle
              :class="[renderClass('mr-auto ml-4', 'parentWrapperTriangle')]"
              data-name="dropdown-parentWrapperTriangle"
              :direction="arrowDirection"
              :variant="'secondary'"
              v-bind="triangleProps"
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
        containerClass,
        renderClass(
          `${
            variant === 'white'
              ? 'border border-gray-200 ' + handleBorderType
              : ''
          } ${roundedClass}
        duration-${animationDuration}
        ${getAnimationDelay}
        transform
        ${handleVerticalTranslate}`,
          'children',
          {
            'opacity-0 -translate-y-1/2 z-0 scale-y-0': isClosed,
            'z-30': !hover,
            'z-40': hover,
            'z-50': isOpened && !hover
          }
        )
      ]"
      data-name="dropdown-children"
      class="transform overflow-hidden ease-in-out cursor-pointer transition w-full absolute bg-white"
    >
      <div
        :class="[
          renderClass(
            'overflow-y-auto scrollbar-sm max-h-48',
            'childrenScrollbar',
            {
              'divide-y': divide,
              [divideColor]: divide
            }
          )
        ]"
        data-name="dropdown-childrenScrollbar"
      >
        <slot name="prepend" :hasItem="hasItem"></slot>
        <template v-for="(item, index) in getItems">
          <div v-if="hasItemSlot" :key="index">
            <slot
              name="item"
              :original-item="items[index]"
              :item="item"
              :index="index"
            ></slot>
          </div>
          <template v-else>
            <div
              :key="index"
              class="p-2 overflow-ellipsis overflow-hidden"
              :class="[
                containerClass,
                renderClass(
                  'py-2 overflow-ellipsis overflow-hidden ' + childClass,
                  'childrenItem',
                  {
                    'bg-gray-100': selectedItem.value === item.value
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
  visibilityOverflow
} from "@/compositionFunctions/visible";
import {
  computed,
  nextTick,
  PropType,
  reactive,
  ref,
  toRefs,
  watch,
  defineComponent,
  onMounted,
  inject
} from "vue";
import { DropDown } from "@/utility/types/base-component-types";
import { useDelayHandler } from "@/compositionFunctions/delayHandler";
import { useKeyDown } from "@/compositionFunctions/keyboardEvents";
import { useClickOutside } from "@/compositionFunctions/clickEvents";
import { useRenderClass } from "@/compositionFunctions/settings";
import TTriangle from "@/components/tailwind/triangle/TTriangle.vue";
const component = (propName: string) => "t-dropdown-" + propName;

export default defineComponent({
  props: {
    variant: {
      type: String,
      default: () => inject(component("variant"), variants.white),
      validator: (propValue: string) => {
        return !!variants[propValue];
      }
    },
    modelValue: {
      type: [Object, String, Number]
    },
    divide: {
      type: Boolean,
      default: () => inject(component("divide"), true)
    },
    divideColor: {
      type: String,
      default: () => inject(component("divide"), "gray")
    },
    item: {
      type: Object,
      default: () => ({ label: undefined, value: undefined })
    },
    outline: {
      type: Boolean,
      default: () => inject(component("outline"), true),
      required: false
    },
    placeholder: {
      type: String,
      default: () => inject(component("placeholder"), ""),
      required: false
    },
    rounded: {
      type: Boolean,
      default: () => inject(component("rounded"), false),
      required: false
    },
    hover: {
      type: Boolean,
      default: () => inject(component("hover"), false),
      required: false
    },
    top: {
      type: Boolean,
      default: () => inject(component("top"), false),
      required: false
    },
    items: {
      // TODO why do we need this prop?
      default: [],
      type: Array as PropType<DropDown.Root>
    },
    opened: {
      type: Boolean,
      default: () => inject(component("opened"), false),
      required: false
    },
    searchKey: {
      type: String,
      default: ""
    },
    labelField: {
      type: String,
      default: () => inject(component("labelField"), "label")
    },
    valueField: {
      type: String,
      default: () => inject(component("valueField"), "value")
    },
    disabled: {
      type: Boolean,
      default: () => inject(component("disabled"), false)
    },
    avoidCloseByHeader: {
      type: Boolean,
      default: true
    },
    parentColorClasses: {
      type: String,
      default: () => inject(component("parentColorClasses"), "")
    },
    itemsColorClasses: {
      type: String,
      default: () => inject(component("itemsColorClasses"), "")
    },
    animationDuration: {
      type: String,
      default: () => inject(component("animationDuration"), "200")
    },
    animationDelay: {
      type: String,
      default: () => inject(component("animationDelay"), "0")
    },
    animationDelayType: {
      type: String as PropType<delayType>,
      default: () => inject(component("animationDelayType"), delayType.both),
      validator: (propValue: string) => {
        return !!delayType[propValue];
      }
    },
    triangleProps: {
      type: Object,
      default: () => ({})
    },
    containerClass: {
      type: [String, Object],
      default: ""
    }
  },
  components: { TTriangle },
  setup(props, { emit, slots }) {
    const dropdownRef = ref(null);
    const dropdownParentRef = ref(null);
    const containerRef = computed(function() {
      return !props.avoidCloseByHeader ? dropdownParentRef : dropdownRef;
    });

    const state = reactive({
      selected: null as any
    });

    const localOpened = ref(props.opened);
    const localDisabled = ref(false);

    const { items, opened, disabled, rounded } = toRefs(props);

    const isOpened = computed(() => {
      return localOpened.value;
    });

    const isClosed = computed(() => {
      return !isOpened.value;
    });

    const isClosedRounded = computed(() => {
      return isClosed.value && rounded.value;
    });

    const isOpenedRounded = computed(() => {
      return isOpened.value && rounded.value;
    });

    const { getAnimationDelay } = useDelayHandler(
      props.animationDelayType,
      props.animationDelay,
      isOpened,
      isClosed
    );

    function updateSelectedValue(item: any) {
      state.selected = item.value;
      emit("update:modelValue", item.value);
      emit("update:item", item); // TODO why should we update this?
    }

    const { clickedOutside, registerEvent, unRegisterEvent } = useClickOutside(
      containerRef.value
    );

    const { placement, handlePlacement, isOpen: isVisibleWatch } = useIsVisible(
      dropdownRef,
      dropdownParentRef
    );
    function hasPlacementPosition(position: visibilityOverflow) {
      return placement?.value?.includes(position);
    }
    const isOverflowed = computed(() => {
      if (props.top) {
        if (hasPlacementPosition(visibilityOverflow.top)) return false;
        else if (hasPlacementPosition(visibilityOverflow.bottom)) {
          return true;
        } else return false;
      } else if (hasPlacementPosition(visibilityOverflow.bottom)) return false;
      else if (hasPlacementPosition(visibilityOverflow.top)) {
        return true;
      } else return false;
    });

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
    const parentRoundedClass = computed(() => {
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
        } else if (props.top) {
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
      } else if (props.rounded) {
        return "rounded-md";
      } else {
        return "rounded-sm";
      }
    });

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
      } else if (props.top) {
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
    });

    const handleVerticalTranslate = computed(() => {
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
      if (!isOverflowed.value) {
        if (props.top) return "border-b-0";
        return "border-t-0";
      } else {
        if (props.top) return "border-t-0";
        return "border-b-0";
      }
    });

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
            label: item[props.labelField],
            value: item[props.valueField]
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
    const selectedItem = computed(() => {
      return (
        itemFactory.value.find(e => e.value === state.selected) || {
          label: false // TODO why label false?
        }
      );
    });
    const getModelValue = computed(() =>
      props.item.value !== undefined ? props.item.value : props.modelValue
    );

    watch(
      getModelValue,
      value => {
        if (value !== state.selected) state.selected = value;
      },
      { immediate: true }
    );

    const onChangeOpened = async () => {
      emit("opened", localOpened.value);
      await nextTick();
      handlePlacement();
    };

    async function triggerDropdown(value = null as any) {
      console.log("triggerDropdown", value);
      if (localDisabled.value) return;
      if (value !== localOpened.value) {
        isVisibleWatch.value = localOpened.value = value;
        await onChangeOpened();
      } else if (value === null) {
        isVisibleWatch.value = localOpened.value = !localOpened.value;
        await onChangeOpened();
      }
    }

    function triggerOpen(value = true) {
      localOpened.value = value;
    }

    function selectItem(item) {
      triggerOpen(false);
      updateSelectedValue(item);
    }

    const onEscape = (e: any) => {
      if (e.key === "Esc" || e.key === "Escape") {
        triggerDropdown(false);
      }
    };
    useKeyDown(onEscape);
    watch(clickedOutside, () => {
      localOpened.value = false;
    });

    function onHoverDropdown(value: boolean) {
      if (props.hover) {
        triggerOpen(value);
      }
    }

    watch(localOpened, isOpen => {
      triggerDropdown(isOpen);
      isOpen ? registerEvent() : unRegisterEvent();
    });

    watch(disabled, isDisabled => {
      if (isDisabled) triggerDropdown(false);
      localDisabled.value = isDisabled;
    });

    onMounted(() => {
      if (localOpened.value) {
        registerEvent();
      }
    });

    const arrowDirection = computed(function() {
      if (props.top) {
        if (opened.value) {
          if (isOverflowed.value) {
            return arrowDirections["arrow-up"];
          }
          return arrowDirections["arrow-down"];
        } else {
          return arrowDirections["arrow-up"];
        }
      } else {
        if (opened.value) {
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
      handleVerticalTranslate,
      handleBorderType,
      isOpened,
      isClosed,
      isClosedRounded,
      isOpenedRounded,
      getItems: itemFactory,
      hasItem: computed(() => !!itemFactory.value.length),
      triggerDropdown,
      onHoverDropdown,
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
      triggerOpen
    };
  }
});
</script>
