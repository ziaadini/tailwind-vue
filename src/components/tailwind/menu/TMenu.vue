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
      <slot name="button" :isOpen="isOpen"></slot>
    </div>

    <!--dropdown menu-->
    <transition :name="!animate && 'fade'" mode="out-in">
      <div
        v-if="animate || notAnimatedOpened"
        ref="menuRef"
        class="absolute shadow-lg border rounded rounded-t-none py-1 px-2 text-sm bg-white z-30 transition transform origin-top-right "
        :class="[
          {
            'right-0': placement === 'right',
            'left-0': placement !== 'right',
            'w-full': full,
            'z-30': !hover,
            'z-40': hover,
            'scale-0 opacity-0': animatedClosed,
            'scale-100 opacity-1': animatedOpened,
          },
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

    const openClose = (value = null as any) => {
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

    const notAnimatedOpened = computed(() => {
      return !props.animate && isOpen.value;
    });

    return {
      menuRef,
      openClose,
      isOpen,
      animatedOpened,
      animatedClosed,
      notAnimatedOpened
    };
  },
});
</script>
