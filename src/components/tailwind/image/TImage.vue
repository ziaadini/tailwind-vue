<template>
  <img v-bind="$attrs" ref="image" :src="imageSrc" />
</template>

<script lang="ts">
import { useIntersectElement } from "@/compositionFunctions/intersect";
import { defineComponent, ref, toRefs, watchEffect } from "vue";

export default defineComponent({
  props: {
    src: {
      type: String,
      default: "",
      required: true
    },
    default: {
      type: String,
      default: "",
      required: false
    },
    lazy: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(props) {
    const { src, default: defaultImage, lazy } = toRefs(props);
    const downloadingImage = new Image();

    const image = ref(null);

    const imageSrc = ref(defaultImage.value || "");

    const downloadImage = () => {
      downloadingImage.onload = function() {
        // @ts-ignore
        imageSrc.value = props.src;
      };
      downloadingImage.src = src.value;
    };

    if (lazy.value) {
      const { isIntersecting, destroyObserver } = useIntersectElement(
        {
          passRef: true
        },
        () => ({}),
        image
      );

      watchEffect(() => {
        if (isIntersecting?.value) {
          downloadImage();
          destroyObserver();
        }
      });
    } else {
      imageSrc.value = src.value;
    }

    return {
      imageSrc,
      image
    };
  }
});
</script>
