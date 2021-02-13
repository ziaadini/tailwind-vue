<template>
  <img v-bind="$attrs" ref="image" />
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
  setup(props) {
    const { src, default: defaultImage, lazy } = toRefs(props);
    const image = ref(null);

    const {
      image: imageDownloaded,
      setImage,
      downloadImage,
    } = useImageDownloader();

    // watch for src changes
    watch(src, (newSrc) => {
      if (newSrc) {
        downloadImage(newSrc);
      }
    });

    // if new images downloaded set them
    watch(imageDownloaded, () => {
      setImage(image);
    });

    // hanlde lazy loading
    if (lazy.value) {
      const { isIntersecting, destroyObserver } = useIntersectElement(
        {
          passRef: true,
        },
        () => ({}),
        image
      );

      watchEffect(() => {
        if (isIntersecting?.value) {
          downloadImage(src.value);
          destroyObserver();
        }
      });
    } else {
      downloadImage(src.value);
    }

    onMounted(() => {
      // @ts-ignore
      image.value.src = defaultImage.value;
    });

    return {
      image,
    };
  },
});
</script>
