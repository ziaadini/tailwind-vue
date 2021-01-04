<template>
  <div class="transition" :class="{ 'opacity-0': !modelValue }">
    <div
      class="fixed w-full h-full top-0 left-0 flex items-center justify-center z-10 "
      v-if="eager || modelValue"
      v-show="!eager || modelValue"
    >
      <div
        class="absolute w-full h-full bg-gray-900 opacity-50"
        @click="close"
      ></div>

      <div class="absolute max-h-full" :class="maxWidth">
        <div class="container bg-white overflow-hidden md:rounded">
          <div
            v-if="showHeader"
            class="px-4 py-4 leading-none flex justify-between items-center font-medium text-sm bg-gray-100 border-b select-none"
          >
            <div>
              <component :is="titleTag" v-if="showTitle">{{ title }}</component>
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

          <div class="max-h-full px-4 py-4">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { size } from "@/utility/css-helper";
import { defineComponent, computed, PropType } from "vue";
import { useKeyDown } from "@/compositionFunctions/keyboardEvents";
type BooleanFunction = () => boolean;
export default defineComponent({
  name: "TModal",
  emits: {
    "update:modelValue"(value: number | boolean) {
      return typeof value === "number" || typeof value === "boolean";
    },
  },
  props: {
    modelValue: {
      type: [Number, Boolean],
      default: 0,
    },
    title: {
      type: String,
      default: "",
    },
    titleTag: {
      type: String,
      default: "h4",
    },
    hasCloseButton: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    maxSize: {
      type: String,
      default: () => {
        return "full";
      },
      validator: (propValue: string) => {
        return !!(size as { [key: string]: string })[propValue];
      },
    },
    closeCallback: {
      type: Function as PropType<BooleanFunction>,
      default: () => {
        return () => true;
      },
    },
    eager: {
      type: Boolean,
      default: (): boolean => {
        return false;
      },
    },
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
    const maxWidth = computed((): string => {
      switch (props.maxSize) {
        case size.xs:
          return "max-w-lg";
        case size.sm:
          return "max-w-xl";
        case size.md:
          return "max-w-2xl";
        case size.lg:
          return "max-w-3xl";
        case size.full:
          return "max-w-full";
      }
      return "";
    });
    return {
      maxWidth,
      close,
      showHeader,
      showCloseButton,
      showTitle,
    };
  },
});
</script>
