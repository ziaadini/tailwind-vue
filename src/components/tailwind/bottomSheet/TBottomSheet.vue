<template>
  <teleport :to="teleportTo" :disabled="isTeleportDisable">
    <div
      :class="{ hidden: !modelValue }"
      class="fixed top-0 w-full h-full bg-gray-900 opacity-50"
      @click="close"
    ></div>

    <div
      class="fixed w-max max-w-full scrollbar-sm overflow-y-auto right-1/2 translate-x-1/2  bottom-0 bg-white transform duration-300"
      :class="[{ 'translate-y-full': !modelValue }, maxHeight, $attrs.class]"
    >
      <div>
        <div
          v-if="showHeader"
          class="px-4 sticky top-0 py-4 leading-none flex justify-between items-center font-medium text-sm bg-gray-100 border-b select-none"
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

        <div>
          <div class="p-4">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { size } from "@/utility/css-helper";
import { defineComponent, computed, PropType, ref, watch } from "vue";
import { useKeyDown } from "@/compositionFunctions/keyboardEvents";
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
    const maxHeight = computed((): string => {
      switch (props.maxSize) {
        case size.xs:
          return "max-h-1/4";
        case size.sm:
          return "max-h-1/2";
        case size.md:
          return "max-h-3/4";
        case size.lg:
          return "max-h-9/10";
        case size.full:
          return "max-h-full";
      }
      return "";
    });
    const delayModelValue = ref(props.modelValue);
    watch(
      () => props.modelValue,
      () => {
        console.log("watch working");
        setTimeout(() => {
          delayModelValue.value = props.modelValue;
        });
      }
    );
    return {
      maxHeight,
      close,
      showHeader,
      showCloseButton,
      showTitle,
      isTeleportDisable,
      delayModelValue
    };
  }
});
</script>
