<template>
  <!-- menu wrapper -->
  <div
    class="relative"
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
      @click="triggerMenu"
    >
      <slot name="button" :isOpen="isOpen"></slot>
    </div>

    <!-- menu items-->
    <transition :name="!animate && 'fade'" mode="out-in">
      <div
        v-if="animate || isOpenWithoutAnimate"
        ref="menuRef"
        data-name="menu-items"
        :class="[
          renderClass(
            'absolute shadow-lg border rounded rounded-t-none py-1 px-2 text-sm bg-white z-30 transition transform origin-top-right',
            'items',
            {
              'right-0': placement === 'right',
              'left-0': placement !== 'right',
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
      default: () => inject(component("placement"), "right"),
      validator: (value: string) => ["right", "left"].indexOf(value) !== -1
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
    }
  },
  setup(props) {
    const open = ref(false);

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
      console.log("watch clickoutside", value);
      if (value) {
        open.value = false;
      }
    });
    watchEffect(() => {
      if (open.value) {
        registerEvent();
      } else {
        unRegisterEvent();
      }
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

    const { renderClass } = useRenderClass("menu");

    return {
      menuRef,
      triggerMenu,
      isOpen,
      animatedOpened,
      animatedClosed,
      isOpenWithoutAnimate,
      renderClass
    };
  }
});
</script>
