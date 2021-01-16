<template>
  <div class="flex">
    <div
      v-bind="$attrs"
      :class="`bg-${variant} ${withClass}`"
      class="rounded-full loader"
    ></div>
    <div
      v-bind="$attrs"
      :class="`bg-${variant} ${withClass}`"
      class="rounded-full mx-1 loader-middle"
    ></div>
    <div
      v-bind="$attrs"
      :class="`bg-${variant} ${withClass}`"
      class="rounded-full loader"
    ></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { size, variants } from "@/utility/css-helper";
export default defineComponent({
  name: "TLoading",
  inheritAttrs: false,
  props: {
    size: {
      type: String,
      default: () => {
        return "sm";
      },
      validator: (propValue: string) => {
        return !!size[propValue];
      }
    },
    variant: {
      type: String,
      default: "primary",
      validator: (propValue: string) => {
        return !!variants[propValue];
      }
    }
  },
  setup(props) {
    const withClass = computed((): string => {
      switch (props.size) {
        case size.xs:
          return "w-1 h-1";
        case size.sm:
          return "w-2 h-2";
        case size.md:
          return "w-4 h-4";
        case size.lg:
          return "w-6 h-6";
        case size.full:
          return "w-8 h-8";
      }
      return "";
    });
    return { withClass };
  }
});
</script>

<style scoped>
.loader {
  -webkit-animation: spinner 0.7s linear infinite;
  animation: spinner 0.7s linear infinite;
}
.loader-middle {
  -webkit-animation: spinner-middle 0.7s linear infinite;
  animation: spinner-middle 0.7s linear infinite;
}

@-webkit-keyframes spinner-middle {
  0% {
    -webkit-transform: scale(1);
    opacity: 1;
  }
  50% {
    -webkit-transform: scale(0.8);
    opacity: 0.3;
  }
  100% {
    -webkit-transform: scale(1);
    opacity: 1;
  }
}

@-webkit-keyframes spinner {
  0% {
    -webkit-transform: scale(0.8);
    opacity: 0.3;
  }
  50% {
    -webkit-transform: scale(1);
    opacity: 1;
  }
  100% {
    opacity: 0.3;
    -webkit-transform: scale(0.8);
  }
}

@keyframes spinner-middle {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(0.8);
    opacity: 0.3;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes spinner {
  0% {
    transform: scale(0.8);
    opacity: 0.3;
  }
  50% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
}
</style>
