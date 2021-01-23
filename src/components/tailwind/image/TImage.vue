<template>
  <img
    :style="{ width, height }"
    ref="image"
    src="data:image/jpeg;base64,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"
  />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  props: {
    src: {
      type: String,
      default: "",
      reqired: true,
    },
    width: {
      type: String,
      default: "",
      reqired: null,
    },
    height: {
      type: String,
      default: "",
      reqired: null,
    },
  },
  setup(props) {
    const downloadingImage = new Image();
    const image = ref(null);

    onMounted(() => {
      console.log("image", image.value);
      downloadingImage.onload = function() {
        // @ts-ignore
        image.value.src = props.src;
      };
      downloadingImage.src = props.src;
    });

    return {
      source: "",
      image,
    };
  },
});
</script>
