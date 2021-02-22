<template>
  {{ scaleClass }}
  {{ translateXY }}
  <div
    class="overflow-hidden w-64 h-64"
    v-bind="$attrs"
    @mousemove="handleMouseHover"
    @mouseover="setTranslateHover"
    @mouseout="resetTranslate"
  >
    <t-image v-show="showMask" :src="maskSrc" class="w-full h-full" />
    <t-image
      :src="imgSrc"
      class="w-full h-full transform origin-top-left"
      :class="[scaleClass]"
      :style="{
        '--tw-translate-x': `${-translateXY.x}px`,
        '--tw-translate-y': `${-translateXY.y}px`,
      }"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, reactive, ref } from "vue";
import TImage from "@/components/tailwind/image/TImage.vue";
import { userOffsetFinder } from "@/compositionFunctions/offset";

const scales = [1.5, 2, 3, 4];
export default defineComponent({
  components: {
    TImage,
  },
  props: {
    imgSrc: {
      default: "",
      type: String,
      required: true,
    },
    scale: {
      type: Number,
      default: 1.5,
      required: false,
      valdator: (value: any) => {
        return !!scales.find(value);
      },
    },
    maskSrc: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const translateXY = reactive({
      x: 0,
      y: 0,
      hover: false,
    });

    const { findOffset } = userOffsetFinder();

    const scaleClass = ref("");
    const zoomOption = ref({
      scale: 1,
      class: "",
    });

    function setTranslate(offset: { left: number; top: number }) {
      translateXY.x = offset.left * zoomOption.value.scale;
      translateXY.y = offset.top * zoomOption.value.scale;

      scaleClass.value = zoomOption.value.class;
    }

    function setTranslateHover() {
      translateXY.hover = true;
    }

    function resetTranslate() {
      translateXY.x = 0;
      translateXY.y = 0;
      translateXY.hover = false;

      scaleClass.value = "";
    }

    function handleScaleClass() {
      let option;
      switch (props.scale) {
        case scales[1]:
          option = { scale: 1, class: "hover:scale-200" };
          break;
        case scales[2]:
          option = { scale: 2, class: "hover:scale-300" };
          break;
        case scales[3]:
          option = { scale: 3, class: "hover:scale-400" };
          break;
        default:
          option = { scale: 0.5, class: "hover:scale-150" };
      }

      zoomOption.value = option;
    }

    function handleMouseHover($event) {
      const offset = findOffset($event);

      setTranslate(offset);
    }

    const showImage = computed(function() {
      return props.maskSrc ? translateXY.hover : true;
    });

    const showMask = computed(function() {
      return props.maskSrc && !translateXY.hover;
    });

    onMounted(() => {
      handleScaleClass();
    });

    return {
      handleMouseHover,
      resetTranslate,
      translateXY,
      scales,
      showImage,
      setTranslateHover,
      showMask,
      scaleClass,
    };
  },
});
</script>
