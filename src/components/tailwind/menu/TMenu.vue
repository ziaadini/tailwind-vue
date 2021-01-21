<template>
  <div class="relative">
    <div
      ref="menuRef"
      class=" relative flex items-center focus:outline-none min-w-full "
      @click="!disabled && (open = !open)"
    >
      <slot name="button"></slot>
    </div>

    <!--dropdown menu-->
    <transition
      enter-active-class="transition-all duration-200 ease-out"
      leave-active-class="transition-all duration-750 ease-in"
      enter-class="opacity-0 scale-75"
      enter-to-class="opacity-100 scale-100"
      leave-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-75"
    >
      <div
        class="absolute shadow-lg border rounded py-1 px-2 text-sm bg-white z-10 rounded-t-none"
        :class="{
          'right-0': placement === 'right',
          'left-0': placement !== 'right',
          'w-full': full,
        }"
        v-if="open && !disabled"
      >
        <slot name="content"></slot>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { useClickOutside } from "@/compositionFunctions/clickEvents";
import { useKeyDown } from "@/compositionFunctions/keyboardEvents";
import { defineComponent, ref, watch, watchEffect } from "vue";

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
  },
  setup() {
    const open = ref(false);

    const {
      clickedOutside,
      elementRef: menuRef,
      registerEvent,
      unRegisterEvent,
    } = useClickOutside();

    const onEscape = (e) => {
      if (e.key === "Esc" || e.key === "Escape") {
        open.value = false;
      }
    };
    useKeyDown(onEscape);

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

    return {
      open,
      menuRef
    };
  },
});
</script>
