<template>
  <!-- menu wrapper -->
  <div
    ref="menuRef"
    data-name="menu-wrapper"
    :class="[renderClass('relative', 'wrapper')]"
    @mouseenter="hover && triggerMenu(true)"
    @mouseleave="hover && triggerMenu(false)"
  >
    <!-- menu trigger -->
    <div
      ref="btnWrapper"
      data-name="menu-trigger"
      :class="[
        renderClass(
          'relative flex items-center focus:outline-none min-w-full',
          'trigger'
        )
      ]"
      @click="triggerMenu(null, true)"
    >
      <slot name="button" :isOpen="isOpen"></slot>
    </div>

    <!-- menu items-->
    <transition :name="!animate ? 'fade' : ''" mode="out-in">
      <div
        v-show="animate || isOpenWithoutAnimate"
        data-name="menu-items"
        :style="[
          hasAlign
            ? {
                '--tw-translate-x': hasAlign && getTranslateWidth,
                '--tw-translate-y': hasAlign && getTranslateHeight
              }
            : {}
        ]"
        :class="[
          renderClass(
            'absolute shadow-lg border rounded rounded-t-none py-1 px-2 text-sm bg-white z-30 transition transform origin-center',
            'items',
            {
              'right-0': hasAlign && placement === 'right',
              'left-0': placement !== 'right' || getTranslateHeight,
              '-translate-x-1/2 left-1/2': !hasAlign && placement === 'center',
              'w-full': full,
              'z-30': !hover,
              'z-40': hover,
              'scale-0 opacity-0': animatedClosed,
              'scale-100 opacity-1': animatedOpened,
              transform: hasAlign
            }
          )
        ]"
        @click="triggerMenu(false)"
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
  defineComponent, inject,
  onMounted,
  Ref,
  ref,
  toRefs,
  watch,
  watchEffect
} from "vue";
import { useRenderClass } from "@/compositionFunctions/settings";
const component = (propName: string) => "t-menu-" + propName;

export default defineComponent({
  model: {
    prop: "modelValue",
    event: "update:modelValue"
  },
  props: {
    modelValue: {
      type: Boolean
    },
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
    },
    forceOpen: {
      type: Boolean,
      default: false
    },
    avoidHeaderClose: {
      type: Boolean,
      default: false
    },
    avoidHeaderOpen: {
      type: Boolean,
      default: false
    }
  },
  setup(props, { emit }) {
    const localOpened = ref(false);

    const { modelValue: opened } = toRefs(props)

    const btnWrapper = ref(null as any);

    const isOpen = computed(() => {
      if (props.forceOpen) {
        return true;
      }
      return localOpened.value && !props.disabled;
    });

    const onEscape = e => {
      if (e.key === "Esc" || e.key === "Escape") {
        localOpened.value = false;
      }
    };
    useKeyDown(onEscape);

    const {
      clickedOutside,
      elementRef: menuRef,
      registerEvent,
      unRegisterEvent
    } = useClickOutside();

    watch(clickedOutside, value => {
      if (value) {
        triggerMenu(false);
      }
    });

    onMounted(() => {
      watchEffect(() => {
        if (localOpened.value) {
          registerEvent();
        } else {
          unRegisterEvent();
        }
      });
    });

    function triggerMenu (value: any = null, header = false) {
      if (!props.disabled) {
        if (
          (localOpened.value && header && props.avoidHeaderClose) ||
          (!localOpened.value && header && props.avoidHeaderOpen)
        )
          return;
        localOpened.value = value !== null ? value : !localOpened.value;
      }
    };

    watch(localOpened, value => {
      emit("update:modelValue", value);
    });

    watch(opened, value => {
      triggerMenu(value);
    });

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
      renderClass: renderClass as Function,
      btnWrapper
    };
  }
});
</script>
