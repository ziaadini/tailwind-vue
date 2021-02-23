<template>
  <img v-if="lazy" v-bind="$attrs" ref="imageRef" />
  <img v-else :src="src" v-bind="$attrs" />
</template>

<script lang="ts">
import { useIntersectElement } from "@/compositionFunctions/intersect";
import { useImageDownloader } from "@/compositionFunctions/image";
import {
  defineComponent,
  onMounted,
  ref,
  toRefs,
  watch,
  watchEffect,
} from "vue";
export default defineComponent({
  props: {
    src: {
      type: String,
      default: "",
      required: true,
    },
    default: {
      type: String,
      default: "",
      required: false,
    },
    lazy: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props, { attrs }) {
    const { src, default: defaultImage, lazy } = toRefs(props);

    // image ref
    const imageRef = ref(null);

    function handleImageLazyload() {
      // handle image downloading
      const {
        image: imageDownloaded,
        setImage,
        downloadImage,
      } = useImageDownloader();

      // watch for image source changes and download the new image
      watch(src, (newSrc) => {
        if (newSrc) {
          downloadImage(newSrc);
        }
      });

      // if new images downloaded set them
      watch(imageDownloaded, () => {
        setImage(imageRef);
      });

      const { isIntersecting, destroyObserver } = useIntersectElement(
        {
          passRef: true,
        },
        () => ({}),
        imageRef
      );

      watchEffect(() => {
        if (isIntersecting?.value) {
          downloadImage(src.value);
          destroyObserver();
        }
      });
    }

    // hanlde lazy loading
    if (lazy.value) {
      handleImageLazyload();
    }

    onMounted(() => {
      if (lazy.value)
        // @ts-ignore
        imageRef.value.src = defaultImage.value;
    });

    return {
      imageRef,
    };
  },
});
</script>
