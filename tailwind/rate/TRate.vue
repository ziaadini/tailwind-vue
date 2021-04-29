<template>
  <div
    data-name="rate-wrapper"
    :class="[
      renderClass(
        'flex justify-center flex-wrap flex-row-reverse space-x-reverse space-x-1 w-full',
        'wrapper'
      )
    ]"
  >
    <div v-for="i in length" :key="i + 'rating'">
      <slot :name="`before-star-${i}`" />
      <t-image
        @mousemove="hover && selectStar(i, $event)"
        @click="selectStar(i, $event)"
        v-bind="$attrs"
        :src="fullIcon"
        :class="{ hidden: returnImageSrc(i) !== 1 }"
      />
      <t-image
        @mousemove="hover && selectStar(i, $event)"
        @click="selectStar(i, $event)"
        v-bind="$attrs"
        :src="halfIcon"
        :class="{ hidden: returnImageSrc(i) !== 2 }"
      />
      <t-image
        @mousemove="hover && selectStar(i, $event)"
        @click="selectStar(i, $event)"
        v-bind="$attrs"
        :src="emptyIcon"
        :class="{ hidden: returnImageSrc(i) !== 3 }"
      />
      <slot :name="`after-star-${i}`" />
    </div>
  </div>
</template>

<script lang="ts">
import { userOffsetFinder } from "@/compositionFunctions/offset";
import { computed, defineComponent, inject, ref, toRefs, watch } from "vue";
import TImage from "../image/TImage.vue";
import { useRenderClass } from "@/compositionFunctions/settings";

const component = (propName: string) => "t-rate-" + propName;
export default defineComponent({
  components: { TImage },
  props: {
    emptyIcon: {
      type: String,
      default: () => inject(component("emptyIcon"), ""),
      required: true
    },
    fullIcon: {
      type: String,
      default: () => inject(component("fullIcon"), ""),
      required: true
    },
    halfIcon: {
      type: String,
      default: () => inject(component("halfIcon"), ""),
      required: true
    },
    hover: {
      type: Boolean,
      default: () => inject(component("hover"), true),
      required: false
    },
    length: {
      type: Number,
      default: () => inject(component("length"), 5),
      required: false
    },
    modelValue: {
      type: Number,
      required: true,
      default: () => inject(component("length"), -1)
    }
  },
  setup(props, { emit }) {
    const parent = ref(null);

    const { modelValue } = toRefs(props);
    const selectedIndex = ref(modelValue.value || -1);

    const { findOffset } = userOffsetFinder();

    // handle star selection in both half and full selection
    const selectStar = (starIndex: number, e?) => {
      if (props.halfIcon && findOffset(e).left < e.srcElement.width / 2) {
        starIndex -= 0.5;
      }
      selectedIndex.value = starIndex;
    };

    watch(selectedIndex, value => {
      emit("update:modelValue", value);
    });

    watch(modelValue, value => {
      selectedIndex.value = value;
    });

    // handle image (full, half & empty) based on index
    const returnImageSrc = computed(() => (index: number) => {
      if (index <= selectedIndex.value) {
        return 1;
      } else if (selectedIndex.value - index === -0.5) {
        return 2;
      }

      return 3;
    });

    const { renderClass } = useRenderClass("rate");

    return {
      selectStar,
      returnImageSrc,
      parent,
      renderClass
    };
  }
});
</script>
