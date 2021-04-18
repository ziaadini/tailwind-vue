<template>
  <img v-if="lazy" v-bind="$attrs" ref="imageRef" />
  <img v-else @load="setLoadingState" v-bind="$attrs" :src="getSrc" />
  <div v-if="loading && hasLoaderSlot">
    <slot v-bind="$attrs" name="loader" />
  </div>
</template>

<script lang="ts">
import { useIntersectElement } from "@/compositionFunctions/intersect";
import { useImageDownloader } from "@/compositionFunctions/image";
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  ref,
  toRefs,
  watch,
  watchEffect
} from "vue";

const component = (propName: string) => "t-image-" + propName;

export default defineComponent({
  props: {
    src: {
      type: String,
      default: "",
      required: true
    },
    default: {
      type: String,
      default: () => inject(component("default"), ""),
      required: false //TODO default prop with provide-inject
    },
    lazy: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  setup(props, { slots }) {
    const { src, default: defaultImage, lazy } = toRefs(props);

    // handle loading state of image
    const loading = ref(true);
    function setLoadingState(value = false) {
      loading.value = value;
    }

    // image ref
    const imageRef = ref(null);

    function handleImageLazyLoad() {
      // handle image downloading
      const {
        image: imageDownloaded,
        setImage,
        downloadImage
      } = useImageDownloader();

      // watch for image source changes and download the new image
      watch(src, newSrc => {
        if (newSrc) {
          setLoadingState(true);
          downloadImage(newSrc);
        }
      });

      // if new images downloaded set them
      watch(imageDownloaded, () => {
        setLoadingState(false);
        setImage(imageRef);
      });

      const { isIntersecting, destroyObserver } = useIntersectElement(
        {
          passRef: true
        },
        undefined,
        imageRef.value,
        false
      );

      if (!props.src)
        // @ts-ignore
        imageRef.value && (imageRef.value.src = defaultImage.value);

      watchEffect(() => {
        if (isIntersecting?.value) {
          downloadImage(src.value);
          destroyObserver();
        }
      });
    }

    const hasLoaderSlot = computed(() => !!slots.loader);
    const getSrc = computed(() => src.value || defaultImage.value);

    onMounted(() => {
      // hanlde lazy loading
      if (lazy.value) {
        handleImageLazyLoad();
      }
    });

    return {
      imageRef,
      hasLoaderSlot,
      setLoadingState,
      loading,
      getSrc
    };
  }
});
</script>
