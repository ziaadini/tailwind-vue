<template>
  <div
    class="relative"
    @mouseenter="hover && openClose(true)"
    @mouseleave="hover && openClose(false)"
  >
    <div
      class=" relative flex items-center focus:outline-none min-w-full "
      @click="openClose"
    >
      <slot name="button"></slot>
    </div>

    <!--dropdown menu-->
    <div
      ref="menuRef"
      class="absolute shadow-lg border rounded py-1 px-2 text-sm bg-white z-30 rounded-t-none transition transform"
      :class="[
        {
          'right-0': placement === 'right',
          'left-0': placement !== 'right',
          'w-full': full,
          'z-30': !hover,
          'z-40': hover,
          'origin-top-right scale-0 opacity-0': animate && !isOpen,
          'scale-100 opacity-1': aniamte && isOpen,
          'origin-top invisible opacity-0': !animate && !isOpen,
          'opacity-1 visible': isOpen && !animate,
        },
      ]"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { useClickOutside } from "@/compositionFunctions/clickEvents";
import { useKeyDown } from "@/compositionFunctions/keyboardEvents";
import { computed, defineComponent, ref, watch, watchEffect } from "vue";

export default defineComponent({
  props: {
    placement: {
      type: String,
      default: "right",
      validator: (value: string) => ["right", "left"].indexOf(value) !== -1,
    },
    disabled: {
      type: Boolean,
      default: false,
      required: false,
    },
    full: {
      required: false,
      default: false,
      type: Boolean,
    },
    hover: {
      type: Boolean,
      default: false,
      required: false,
    },
    animate: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
  setup(props) {
    const open = ref(false);

    // is menu open
    const isOpen = computed(() => {
      return open.value && !props.disabled;
    });

    // handle escape key
    const onEscape = (e) => {
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
      unRegisterEvent,
    } = useClickOutside();
    watch(clickedOutside, (value) => {
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

    const animateFunction = (callback: any, timeout) => {
      setTimeout(() => {
        callback();
      }, timeout);
    };
    const openClose = (value = null as any) => {
      console.log("open close", value);
      if (!props.disabled) {
        open.value = value !== null ? value : !open.value;
      }
    };

    const animationClasses = ref("");

    watch(isOpen, (newValue) => {
      if (newValue) {
        animateFunction(() => {
          animationClasses.value = "scale-100 opacity-100";
        }, 100);
      } else animationClasses.value = "";
    });

    return {
      menuRef,
      openClose,
      isOpen,
      animationClasses,
    };
  },
});
</script>
