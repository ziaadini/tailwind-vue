<template>
  <div
    :style="{
      width: '200px',
      height: '200px',
    }"
    class="overflow-hidden"
    @mousemove="handleMouseHover"
    @mouseout="resetTranslateState"
  >
    <t-image
      :src="imgSource"
      class="w-full h-full transform origin-top-left hover:scale-150"
      :style="{
        '--tw-translate-x': `${-translateXY.x}px`,
        '--tw-translate-y': `${-translateXY.y}px`,
      }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import TImage from "@/components/tailwind/image/TImage.vue";
import { userOffsetFinder } from "@/compositionFunctions/offset";
export default defineComponent({
  components: {
    TImage,
  },
  data() {
    return {
      imgSource:
        "https://images.pexels.com/photos/6303791/pexels-photo-6303791.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
    };
  },
  setup() {
    const translateXY = reactive({
      x: 0,
      y: 0,
    });

    const { findOffset } = userOffsetFinder();

    function handleMouseHover($event) {
      const offset = findOffset($event);
      translateXY.x = offset.left;
      translateXY.y = offset.top;
    }

    function resetTranslateState() {
      translateXY.x = 0;
      translateXY.y = 0;
    }

    return {
      handleMouseHover,
      resetTranslateState,
      translateXY,
    };
  },
});
</script>
