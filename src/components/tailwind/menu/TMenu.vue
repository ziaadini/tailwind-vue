<template>
  <!-- menu wrapper -->
  <div
    data-name="menu-wrapper"
    :class="[renderClass('relative', 'wrapper')]"
    @mouseenter="hover && triggerMenu(true)"
    @mouseleave="hover && triggerMenu(false)"
  >
    <!-- menu trigger -->
    <div
      data-name="menu-trigger"
      :class="[
        renderClass(
          'relative flex items-center focus:outline-none min-w-full',
          'trigger'
        )
      ]"
      ref="btnWrapper"
      @click="triggerMenu"
    >
      <slot name="button" :isOpen="isOpen"></slot>
    </div>

    <!-- menu items-->
    <transition
      :name="!animate ? 'fade' : ''"
      mode="out-in"
      :style="[
        hasAlign
          ? {
              '--tw-translate-x': hasAlign && getTranslateWidth,
              '--tw-translate-y': hasAlign && getTranslateHeight
            }
          : {}
      ]"
      :class="[
        renderClass('', 'trigger', {
          'absolute transform': hasAlign
        })
      ]"
    >
      <div
        v-if="animate || isOpenWithoutAnimate"
        ref="menuRef"
        data-name="menu-items"
        @click="triggerMenu(false)"
        :class="[
          renderClass(
            'absolute shadow-lg border rounded rounded-t-none py-1 px-2 text-sm bg-white z-30 transition transform origin-center',
            'items',
            {
              'right-0': hasAlign && placement === 'right',
              '-translate-x-1/2 left-1/2': !hasAlign && placement === 'center',
              'left-0': placement !== 'right' || getTranslateHeight,
              'w-full': full,
              'z-30': !hover,
              'z-40': hover,
              'scale-0 opacity-0': animatedClosed,
              'scale-100 opacity-1': animatedOpened
            }
          )
        ]"
      >
        <slot name="content"></slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { useClickOutside } from "@/compositionFunctions/clickEvents";
import { useKeyDown } from "@/compositionFunctions/keyboardEvents";
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  ref,
  watch,
  watchEffect
} from "vue";
import { useRenderClass } from "@/compositionFunctions/settings";

const component = (propName: string) => "t-menu-" + propName;
export default defineComponent({
  props: {
    placement: {
      type: String,
      default: () => inject(component("placement"), "center"),
      validator: (value: string) =>
        ["right", "left", "center"].indexOf(value) !== -1
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false
    },
    full: {
      required: false,
      default: () => inject(component("full"), false),
      type: Boolean
    },
    hover: {
      type: Boolean,
      default: () => inject(component("hover"), false),
      required: false
    },
    animate: {
      type: Boolean,
      default: () => inject(component("animate"), false),
      required: false
    },
    align: {
      type: String,
      default: null
    }
  },
  setup(props) {
    const open = ref(false);

    const btnWrapper = ref(null as any);

    // is menu open
    const isOpen = computed(() => {
      return open.value && !props.disabled;
    });

    // handle escape key
    const onEscape = e => {
      if (e.key === "Esc" || e.key === "Escape") {
        open.value = false;
      }
    };
    useKeyDown(onEscape);

    // handle clickoutside
    const {
      clickedOutside,
      elementRef: menuRef,
      registerEvent,
      unRegisterEvent
    } = useClickOutside();
    watch(clickedOutside, value => {
      if (value) {
        open.value = false;
      }
    });

    onMounted(() => {
      watchEffect(() => {
        if (open.value) {
          registerEvent();
        } else {
          unRegisterEvent();
        }
      });
    });

    const triggerMenu = (value = null as any) => {
      if (!props.disabled) {
        open.value = value !== null ? value : !open.value;
      }
    };

    const animatedOpened = computed(() => {
      return props.animate && isOpen.value;
    });

    const animatedClosed = computed(() => {
      return props.animate && !isOpen.value;
    });

    const isOpenWithoutAnimate = computed(() => {
      return !props.animate && isOpen.value;
    });

    const hasAlign = computed(() => {
      return props.align !== null;
    });

    function hasRightAlign() {
      return props.align === "right";
    }

    function hasLeftAlign() {
      return props.align === "left";
    }

    const getTranslateWidth = computed(() => {
      if (hasAlign.value) {
        const value = btnWrapper?.value?.clientWidth || 0;
        if (value) {
          if (hasRightAlign()) return `${value}px`;
          else if (hasLeftAlign()) return "-100%";
          else return 0;
        }
      }
      return 0;
    });

    const getTranslateHeight = computed(() => {
      if (hasAlign.value) {
        const value = -btnWrapper?.value?.clientHeight || 0;
        if (value) {
          return `${value}px`;
        }
      }
      return 0;
    });

    const { renderClass } = useRenderClass("menu");

    return {
      menuRef,
      triggerMenu,
      getTranslateHeight,
      getTranslateWidth,
      hasAlign,
      isOpen,
      animatedOpened,
      animatedClosed,
      isOpenWithoutAnimate,
      renderClass,
      btnWrapper
    };
  }
});
</script>
