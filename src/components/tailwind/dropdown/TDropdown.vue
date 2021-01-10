<template>
  <div class="relative">
    <div
      class=" relative flex items-center focus:outline-none min-w-full "
      @click="!disabled && (open = !open)"
    >
      <slot name="button"></slot>
    </div>

    <!-- to close when clicked on space around it-->
    <button
      class="fixed inset-0 h-full w-full cursor-default focus:outline-none"
      v-if="open"
      @click="open = false"
      tabindex="-1"
    ></button>
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
        class="absolute shadow-lg border rounded py-1 px-2 text-sm bg-white z-10"
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
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      open: false,
    };
  },
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
  methods: {
    onEscape(e) {
      if (e.key === "Esc" || e.key === "Escape") {
        this.open = false;
      }
    },
  },
  mounted() {
    document.addEventListener("keydown", this.onEscape);
  },
  beforeUnmount() {
    document.removeEventListener("keydown", this.onEscape);
  },
});
</script>
