<template>
  <template v-if="!hasDefaultSlot">
    <img v-if="lazy" v-bind="$attrs" ref="imageRef" />
    <img @load="handleImageLoaded" v-bind="$attrs" v-else />
    <div v-if="loading">
      <slot v-bind="$attrs" name="loader" />
    </div>
  </template>
  <!-- TODO why should we have a default Slot -->
  <slot :src="src" v-bind="$attrs" />
</template>

<script lang="ts">
import { useIntersectElement } from "@/compositionFunctions/intersect";
import { useImageDownloader } from "@/compositionFunctions/image";
import {
  computed,
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
  setup(props, { slots }) {
    const { src, default: defaultImage, lazy } = toRefs(props);

    // handle loading state of image
    const loading = ref(true);
    function handleImageLoaded(value = false) {
      loading.value = value;
    }

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
          handleImageLoaded(true);
          downloadImage(newSrc);
        }
      });

      // if new images downloaded set them
      watch(imageDownloaded, () => {
        handleImageLoaded();
        setImage(imageRef);
      });

      const { isIntersecting, destroyObserver } = useIntersectElement(
        {
          passRef: true,
        },
        undefined,
        imageRef.value,
        false
      );

      watchEffect(() => {
        if (isIntersecting?.value) {
          downloadImage(src.value);
          destroyObserver();
        }
      });
    }

    const hasDefaultSlot = computed(() => !!slots.default);

    onMounted(() => {
      // hanlde lazy loading
      if (lazy.value && !hasDefaultSlot.value) {
        handleImageLazyload();
      }
      if (lazy.value || !props.src)
        // @ts-ignore
        imageRef.value && (imageRef.value.src = defaultImage.value);
    });

    return {
      imageRef,
      hasDefaultSlot,
      handleImageLoaded,
      loading,
    };
  },
});
</script>
