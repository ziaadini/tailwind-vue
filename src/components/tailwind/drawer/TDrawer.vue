<template>
  <teleport :to="teleportTo" :disabled="isTeleportDisable">
    <t-fade
      :show="modelValue"
      :allocate-space="false"
      opacity-class="opacity-50"
      class="relative z-30"
    >
      <template #default="{className}">
        <div
          data-name="drawer-backDrop"
          :class="[
            // { hidden: !modelValue },
            className,
            renderClass('fixed z-20 top-0 bg-gray-900', 'backDrop')
          ]"
          @click="close"
        ></div>
      </template>
    </t-fade>
    <div
      data-name="drawer-container"
      :class="[
        renderClass(
          'fixed z-30 top-0 bg-white transform duration-300',
          'container'
        ),
        {
          [left
            ? '-translate-x-full -right-full'
            : 'translate-x-full -right-full']: !modelValue,
          [left ? 'rounded-r-md' : 'rounded-l-md']: rounded
        },
        left ? 'left-0' : 'right-0',
        maxWidth
      ]"
    >
      <div
        data-name="drawer-header"
        v-if="showHeader"
        :class="[
          { 'flex-row-reverse': left },
          renderClass(
            'px-4 h-12 rounded-inherit  py-4 leading-none flex justify-between items-center font-medium text-sm select-none',
            'header'
          )
        ]"
      >
        <div>
          <component
            :is="titleTag"
            v-if="showTitle"
            :class="renderClass('', 'title')"
            data-name="drawer-title"
          >
            {{ title }}
          </component>
          <template v-else>
            <slot name="title"></slot>
          </template>
        </div>

        <div
          v-if="showCloseButton"
          data-name="drawer-close"
          @click="close"
          :class="
            renderClass('text-2xl hover:text-gray-600 cursor-pointer', 'close')
          "
        >
          &#215;
        </div>
        <template v-else>
          <slot name="closeButton" :onClick="close"></slot>
        </template>
      </div>
      <div v-else class="h-2"></div>

      <div
        data-name="drawer-contentContainer"
        :class="[
          renderClass(
            'overflow-y-auto scrollbar-sm p-4 max-h-screen bottom-sheet-content-container drawer-max-height',
            'contentContainer'
          ),
          { 'drawer-height': showHeader, 'w-screen': full }
        ]"
      >
        <slot></slot>
      </div>
      <div
        :class="{ [left ? 'rounded-br-md' : 'rounded-bl-lg']: rounded }"
        class="bg-white h-4 w-full"
      ></div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { size } from "@/utility/css-helper";
import { defineComponent, computed, PropType } from "vue";
import { useKeyDown } from "@/compositionFunctions/keyboardEvents";
import { useMaxWidth } from "@/compositionFunctions/maxSize";
import { useRenderClass } from "@/compositionFunctions/settings";
import TFade from "@/components/tailwind/fade/TFade.vue";
type BooleanFunction = () => boolean;
export default defineComponent({
  name: "TDrawer",
  components: { TFade },
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
    rounded: {
      type: Boolean,
      default: () => true
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
        return "full";
      },
      validator: (propValue: string) => {
        return !!size[propValue];
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
    left: {
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
    const maxWidth = useMaxWidth(props.maxSize);
    const { renderClass } = useRenderClass("drawer");
    return {
      renderClass,
      maxWidth,
      close,
      showHeader,
      showCloseButton,
      showTitle,
      isTeleportDisable
    };
  }
});
</script>
<style scoped lang="scss">
.drawer-height {
  height: calc(100vh - 4rem);
}
.drawer-max-height {
  max-height: calc(100vh - 2rem);
}
</style>
