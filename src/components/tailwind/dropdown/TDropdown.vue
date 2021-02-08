<template>
  <div
    class="relative"
    @mouseenter="hover && openClose(true)"
    @mouseleave="hover && openClose(false)"
    :class="{
      'rounded-sm': isClosed,
    }"
  >

    <!-- parent -->
    <div
      ref="dropdownParentRef"
      class="rounded-sm cursor-pointer w-64 h-10 flex items-center justify-center"
      :class="[
        isClosed && 'rounded-sm',
        {
          'rounded-full': isClosedRounded,
          'rounded-md': isOpenedRounded,
          'rounded-b-none': isOpenedRounded && !isBottomOverflowed,
          'rounded-t-none': isOpenedRounded && isBottomOverflowed,
        },
        parentClass,
      ]"
      @click="openClose(true)"
    >
      {{ selectedItem.label || placeholder }}
    </div>

    <!-- items -->
    <div
      ref="dropdownRef"
      :class="{
        'opacity-0 -translate-y-1/2 z-0 scale-y-0': isClosed,
        'rounded-b-md': rounded && !isBottomOverflowed,
        'rounded-b-none': rounded && isBottomOverflowed,
        '-translate-y-full top-0': isBottomOverflowed,
        'z-30': !hover,
        'z-40': hover,
      }"
      class="duration-200 transform ease-in-out cursor-pointer transition w-64 absolute bg-white shadow"
    >
      <template v-for="(item, index) in getItems" :key="index">
        <div
          class="py-2"
          :class="[
            childClass,
            {
              'rounded-b-md':
                index + 1 === items.length && rounded && !isBottomOverflowed,
              'rounded-b-none': rounded && isBottomOverflowed,
              'border border-indigo-200 box-border':
                selectedItem.value === item.value,
            },
          ]"
          @click="selectItem(item.value)"
        >
          {{ item.label }}
        </div>
        <hr v-if="getItems.length !== index + 1" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { variants } from "@/utility/css-helper";
import {
  useIsVisible,
  visibilityOverflow,
} from "@/compositionFunctions/visible";
import {
  computed,
  defineComponent,
  PropType,
  reactive,
  toRefs,
  watch,
  watchEffect,
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
      },
    },
    modelValue: {
      type: String,
      required: true,
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
  },
  setup(props, { emit }) {
    const baseClass = `bg-${props.variant} text-white hover:opacity-80 transition`;
    const outlineClass = `border-${props.variant}-50 shadow-sm border hover:bg-${props.variant}-50 hover:shadow`;
    const childClass = `bg-${props.variant}-50 hover:bg-${props.variant}-50 hover:opacity-60 focus:border-${props.variant} transition`;

    const state = reactive({
      selected: null as any,
      opened: props.opened,
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
      unRegisterEvent,
    } = useClickOutside();

    const { modelValue, items, opened } = toRefs(props);

    watch(clickedOutside, (value) => {
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
      const type = typeof items.value[0];

      if (type === "string") {
        (items.value as DropDown.stringForm).forEach((item) => {
          newItems.push({
            label: item,
            value: item,
          });
        });

        return newItems;
      }

      return newItems;
    });

    const selectItem = (value) => {
      state.opened = false;
      emit("update:opened", false);
      state.selected = value;
      emit("update:modelValue", value);
    };

    const selectedItem = computed(() => {
      return (
        itemFactory.value.find((e) => e.value === state.selected) || {
          label: false,
        }
      );
    });

    watch(modelValue, (value) => {
      if (value !== state.selected) state.selected = value;
    });

    const openClose = (value = null as any) => {
      console.log("openclose called", value);
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
        openClose(true);
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
      parentClass: props.outline ? outlineClass : baseClass,
      childClass,
      isOpened,
      isClosed,
      isClosedRounded,
      isOpenedRounded,
      getItems: itemFactory,
      openClose,
      selectItem,
      selectedItem,
      state,
      dropdownRef,
      dropdownParentRef,
      isBottomOverflowed,
      placement,
    };
  },
});
</script>
