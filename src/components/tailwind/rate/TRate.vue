<template>
  <div class="flex flex-row-reverse flex-wrap space-x-reverse space-x-1 w-full">
    <template v-for="i in length" :key="i + 'rating'">
      <img
        @mouseenter="hover && selectStar(i)"
        @click="selectStar(i)"
        v-bind="$attrs"
        :src="returnImageSrc(i)"
      />
    </template>
  </div>
</template>

<script lang="ts">
import { normalSizes } from "@/utility/css-helper";
import { computed, defineComponent, ref, toRefs, watch } from "vue";

export default defineComponent({
  props: {
    emptyIcon: {
      type: String,
      default: "",
      required: true,
    },
    fullIcon: {
      type: String,
      default: "",
      required: true,
    },
    halfIcon: {
      type: String,
      default: "",
      required: true,
    },
    hover: {
      type: Boolean,
      default: false,
      required: false,
    },
    length: {
      type: Number,
      default: 5,
      required: false,
    },
    modelValue: {
      type: Number,
      required: true,
      default: -1,
    },
  },
  setup(props, { emit }) {
    const { modelValue } = toRefs(props);
    const selectedIndex = ref(modelValue.value || -1);
    const selectStar = (starIndex: number) => {
      selectedIndex.value = starIndex;
    };
    watch(selectedIndex, (value) => {
      emit("update:modelValue", value);
    });

    watch(modelValue, (value) => {
      console.log("model value changed", value);
      selectedIndex.value = value;
    });

    const returnImageSrc = computed(() => (index: number) => {
      console.log(
        selectedIndex.value - index,
        selectedIndex.value - index === 0.5
      );

      if (index <= selectedIndex.value) {
        return props.fullIcon;
      } else if (selectedIndex.value - index === -0.5) {
        return props.halfIcon;
      }

      return props.emptyIcon;
    });

    return {
      selectStar,
      returnImageSrc,
    };
  },
});
</script>
