<template>
  <div
    ref="fadeContainer"
    :class="[
      {
        'opacity-0': !show,
        'w-0 h-0 overflow-hidden': !delayedShow && !allocateSpace,
        [opacityClass]: show
      },
      `duration-${duration} ${easeClass}`
    ]"
    class="transition-opacity"
  >
    <slot
      :className="delayedShow ? 'h-full w-full' : 'w-0 h-0 overflow-hidden'"
      :delayedShow="delayedShow"
    ></slot>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "TFade",
  props: {
    show: {
      type: [Boolean, Number],
      default: 0
    },
    duration: {
      type: Number,
      default: 300
    },
    easeClass: {
      type: String,
      default: "ease-out"
    },
    opacityClass: {
      type: String,
      default: "opacity-1"
    },
    allocateSpace: {
      type: Boolean,
      default: () => false
    }
  },
  setup(props) {
    const delayedShow = ref(props.show);
    const fadeContainer = ref(null);
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
    return { delayedShow, fadeContainer };
  }
};
</script>

<style scoped></style>
