<template>
  <!-- zoom wrapper -->
  <div
    data-name="zoom-wrapper"
    :class="[renderClass('overflow-hidden w-64 h-64', 'wrapper')]"
    v-bind="$attrs"
    @mousemove="handleMouseHover"
    @mouseover="setTranslateHover"
    @mouseout="resetTranslate"
  >
    <!-- zoom image -->
    <t-image
      :src="src"
      data-name="zoom-image"
      :class="[
        renderClass(
          `w-full h-full transform origin-top-left ${scaleClass}`,
          'mask'
        )
      ]"
      :style="{
        '--tw-translate-x': `${-translateXY.x}px`,
        '--tw-translate-y': `${-translateXY.y}px`
      }"
    />

    <!-- zoom mask -->
    <!--    TODO v-show="showMask" is not working-->
    <t-image
      :src="maskSrc"
      data-name="zoom-mask"
      :class="[
        renderClass('relative -top-full w-full h-full', 'mask'),
        {
          hidden: !showMask
        }
      ]"
    />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  reactive,
  ref
} from "vue";
import TImage from "@/components/tailwind/image/TImage.vue";
import { userOffsetFinder } from "@/compositionFunctions/offset";
import { useRenderClass } from "@/compositionFunctions/settings";

const scales = [1.5, 2, 3, 4];
const component = (propName: string) => "t-zoom-" + propName;

export default defineComponent({
  components: {
    TImage
  },
  props: {
    src: {
      default: "",
      type: String,
      required: true
    },
    scale: {
      type: Number,
      default: () => inject(component("scale"), 1.5),
      required: false,
      valdator: (value: any) => {
        return !!scales.find(value);
      }
    },
    maskSrc: {
      type: String,
      default: () => inject(component("maskSrc"), "")
    }
  },
  setup(props) {
    // translate variables
    const translateXY = reactive({
      x: 0,
      y: 0,
      hover: false
    });

    const { findOffset } = userOffsetFinder();

    const scaleClass = ref("");
    const zoomOption = ref({
      scale: 1,
      class: ""
    });

    function setTranslate(offset: { left: number; top: number }) {
      translateXY.x = offset.left * zoomOption.value.scale;
      translateXY.y = offset.top * zoomOption.value.scale;

      scaleClass.value = zoomOption.value.class;
    }

    // if hovering the image then hover is set to true
    function setTranslateHover() {
      translateXY.hover = true;
    }

    // reset translate state
    function resetTranslate() {
      translateXY.x = 0;
      translateXY.y = 0;
      translateXY.hover = false;

      scaleClass.value = "";
    }

    // handle image zoom scale based on the passed scale
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

    // base on the hover position(x,y) set the translate
    function handleMouseHover($event) {
      const offset = findOffset($event);

      setTranslate(offset);
    }

    // handle image showing when mask is enabled
    const showImage = computed(function() {
      return props.maskSrc ? translateXY.hover : true;
    });

    const showMask = computed(function() {
      return props.maskSrc && !translateXY.hover;
    });

    onMounted(() => {
      handleScaleClass();
    });

    const { renderClass } = useRenderClass("zoom");

    return {
      handleMouseHover,
      resetTranslate,
      translateXY,
      scales,
      showImage,
      setTranslateHover,
      showMask,
      scaleClass,
      renderClass
    };
  }
});
</script>
