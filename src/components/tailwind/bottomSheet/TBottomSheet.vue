<template>
  <teleport :to="teleportTo" :disabled="isTeleportDisable">
    <div
      :class="{ hidden: !modelValue }"
      class="fixed top-0 w-full h-full bg-gray-900 opacity-50"
      @click="close"
    ></div>

    <!--    <div class="relative">-->
    <div
      class="fixed w-max max-w-full right-1/2 translate-x-1/2 bottom-0 bg-white transform"
      :class="[
        { 'translate-y-full': !modelValue, 'duration-300': !isTouching },
        maxHeight.class,
        $attrs.class
      ]"
      :style="[modelValue ? { '--tw-translate-y': swipeY + 'px' } : {}]"
    >
      <div class="py-2" v-bind="swipeEvents">
        <div
          class="bg-gray-300 mx-auto rounded-full h-1.5 w-20 cursor-pointer"
        ></div>
      </div>

      <div
        v-if="showHeader"
        class="px-4 h-14 rounded-inherit top-0 py-4 leading-none flex justify-between items-center font-medium text-sm bg-gray-100 border-b select-none"
      >
        <div>
          <component :is="titleTag" v-if="showTitle"> {{ title }} </component>
          <template v-else>
            <slot name="title"></slot>
          </template>
        </div>

        <div
          v-if="showCloseButton"
          @click="close"
          class="text-2xl hover:text-gray-600 cursor-pointer"
        >
          &#215;
        </div>
        <template v-else>
          <slot name="closeButton" :onClick="close"></slot>
        </template>
      </div>
      <div
        class="overflow-y-auto scrollbar-sm p-4 bottom-sheet-content-container"
        :class="[{ 'bottom-sheet-height': showHeader }]"
        :style="{ '--max-height': maxHeight.variable }"
      >
        <slot></slot>
      </div>
    </div>
    <!--    </div>-->
  </teleport>
</template>

<script lang="ts">
import { size } from "@/utility/css-helper";
import { defineComponent, computed, PropType, ref, watch } from "vue";
import { useKeyDown } from "@/compositionFunctions/keyboardEvents";
import {
  useSwipeDownToClose,
  useSwipeElement
} from "@/compositionFunctions/swipe";
type BooleanFunction = () => boolean;
export default defineComponent({
  name: "TBottomSheet",
  emits: {
    "update:modelValue"(value: number | boolean) {
      return typeof value === "number" || typeof value === "boolean";
    }
  },
  props: {
    modelValue: {
      type: [Number, Boolean],
      default: 0
    },
    title: {
      type: String,
      default: ""
    },
    titleTag: {
      type: String,
      default: "h4"
    },
    teleportTo: {
      type: String
    },
    hasCloseButton: {
      type: Boolean,
      default: () => {
        return true;
      }
    },
    maxSize: {
      type: String,
      default: () => {
        return "md";
      },
      validator: (propValue: string) => {
        return !!(size as { [key: string]: string })[propValue];
      }
    },
    closeCallback: {
      type: Function as PropType<BooleanFunction>,
      default: () => {
        return () => true;
      }
    },
    full: {
      type: Boolean,
      default: () => false
    },
    eager: {
      type: Boolean,
      default: (): boolean => {
        return false;
      }
    }
  },
  setup(props, { emit, slots }) {
    const close = () => {
      props.closeCallback() && emit("update:modelValue", false);
    };
    const onEscape = (e: any) => {
      if (e.key === "Esc" || e.key === "Escape") {
        close();
      }
    };
    useKeyDown(onEscape);
    const isTeleportDisable = computed(() => {
      return props.teleportTo === undefined;
    });
    const showTitle = computed(() => {
      return props.title && !slots.title;
    });
    const showCloseButton = computed(() => {
      return props.hasCloseButton && !slots.closeButton;
    });
    const showHeader = computed(() => {
      return (
        props.hasCloseButton ||
        props.title ||
        !!slots.closeButton ||
        !!slots.title
      );
    });
    const maxHeight = computed((): { class: string; variable: string } => {
      switch (props.maxSize) {
        case size.xs:
          return { class: "max-h-1/4", variable: "25vh" };
        case size.sm:
          return { class: "max-h-1/2", variable: "50vh" };
        case size.md:
          return { class: "max-h-3/4", variable: "75vh" };
        case size.lg:
          return { class: "max-h-9/10", variable: "90vh" };
        case size.full:
          return { class: "max-h-full", variable: "100vh" };
      }
      return { class: "", variable: "" };
    });

    const { isTouching, swipeY, swipeEvents } = useSwipeDownToClose(close);
    return {
      isTouching,
      swipeY,
      swipeEvents,
      maxHeight,
      close,
      showHeader,
      showCloseButton,
      showTitle,
      isTeleportDisable,
      clickedItem: () => {
        alert("item clicked");
      }
    };
  }
});
</script>
<style scoped lang="scss">
.bottom-sheet-height {
  height: calc(100% - 3.5rem);
}
.bottom-sheet-content-container {
  max-height: calc(var(--max-height) - 3.5rem);
}
</style>
