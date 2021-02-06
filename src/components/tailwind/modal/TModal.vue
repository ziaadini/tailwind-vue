<template>
  <teleport :to="teleportTo" :disabled="isTeleportDisable">
    <div>
      <t-fade
        :show="modelValue"
        :allocate-space="false"
        opacity-class="opacity-50"
        class="relative z-30"
      >
        <template #default="{className}">
          <div
            data-name="bottomSheet-backDrop"
            :class="[
              // { hidden: !modelValue },
              className,
              renderClass('fixed z-20 top-0 bg-gray-900', 'backDrop')
            ]"
            @click="close"
          ></div>
        </template>
      </t-fade>
      <t-fade
        :duration="300"
        :show="modelValue"
        :allocate-space="false"
        class="relative z-30"
      >
        <template #default="{className,delayedShow}">
          <div
            class="fixed z-30  w-max rounded  scrollbar-sm max-h-full overflow-y-auto top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 transform  bg-white"
            :class="[maxWidth, { [className]: !delayedShow }]"
          >
            <div>
              <div v-if="eager || delayedShow" v-show="!eager || delayedShow">
                <div
                  v-if="showHeader"
                  class="px-4 sticky top-0 py-4 leading-none flex justify-between items-center font-medium text-sm bg-gray-100 border-b select-none"
                >
                  <div>
                    <component :is="titleTag" v-if="showTitle">{{
                      title
                    }}</component>
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
                <div :class="{ 'w-screen': full }">
                  <div class="p-4">
                    <slot></slot>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </t-fade>
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
  name: "TModal",
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
        return "lg";
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
    const { renderClass } = useRenderClass("bottomSheet");
    return {
      maxWidth,
      renderClass,
      close,
      showHeader,
      showCloseButton,
      showTitle,
      isTeleportDisable
    };
  }
});
</script>
