<template>
  <div
    :class="[
      {
        [start]: !show,
        'w-0 h-0 overflow-hidden': !delayedShow && !allocateSpace,
        [end]: show
      },
      `duration-${duration} ${easeClass}`,
      transitionClass
    ]"
  >
    <slot
      :className="delayedShow ? 'h-full w-full' : 'w-0 h-0 overflow-hidden'"
      :delayedShow="delayedShow"
    ></slot>
  </div>
</template>

<script>
import { inject, ref, watch } from "vue";

export default {
  name: "TAnimate",
  props: {
    show: {
      type: [Boolean, Number],
      default: 0
    },
    start: {
      type: String,
      default: () => inject("t-animate-start", "opacity-0")
    },
    end: {
      type: String,
      default: () => inject("t-animate-end", "opacity-1")
    },
    transitionClass: {
      type: String,
      default: () => inject("t-animate-transitionClass", "transition-all")
    },
    duration: {
      type: Number,
      default: () => inject("t-animate-duration", 300)
    },
    easeClass: {
      type: String,
      default: () => inject("t-animate-easeClass", "ease-out")
    },
    allocateSpace: {
      type: Boolean,
      default: () => inject("t-animate-allocateSpace", false)
    }
  },
  setup(props) {
    const delayedShow = ref(props.show);
    watch(
      () => props.show,
      value => {
        if (!value) {
          const timeOut = setTimeout(() => {
            delayedShow.value = value;
            clearTimeout(timeOut);
          }, props.duration);
        } else {
          delayedShow.value = value;
        }
      }
    );
    return { delayedShow };
  }
};
</script>

<style scoped></style>
