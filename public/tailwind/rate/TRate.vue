<template>
  <div class="flex justify-center flex-wrap flex-row-reverse flex-wrap space-x-reverse space-x-1 w-full">
    <div v-for="i in length" :key="i + 'rating'">
      <img
        @mousemove="hover && selectStar(i, $event)"
        @click="selectStar(i, $event)"
        v-bind="$attrs"
        :src="fullIcon"
        v-show="returnImageSrc(i) === 1"
      />
      <img
        @mousemove="hover && selectStar(i, $event)"
        @click="selectStar(i, $event)"
        v-bind="$attrs"
        :src="halfIcon"
        v-show="returnImageSrc(i) === 2"
      />
      <img
        @mousemove="hover && selectStar(i, $event)"
        @click="selectStar(i, $event)"
        v-bind="$attrs"
        :src="emptyIcon"
        v-show="returnImageSrc(i) === 3"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, toRefs, watch } from "vue";

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
    const parent = ref(null);

    const { modelValue } = toRefs(props);
    const selectedIndex = ref(modelValue.value || -1);

    const selectStar = (starIndex: number, e?) => {
      if (
        props.halfIcon &&
        e.pageX - e.srcElement.offsetLeft < e.srcElement.width / 2
      ) {
        starIndex -= 0.5;
        console.warn("star Index - 0.5", starIndex);
      }
      selectedIndex.value = starIndex;
    };
    watch(selectedIndex, (value) => {
      emit("update:modelValue", value);
    });

    watch(modelValue, (value) => {
      selectedIndex.value = value;
    });

    const returnImageSrc = computed(() => (index: number) => {
      console.log(
        selectedIndex.value - index,
        selectedIndex.value - index === 0.5
      );

      if (index <= selectedIndex.value) {
        return 1;
      } else if (selectedIndex.value - index === -0.5) {
        return 2;
      }

      return 3;
    });

    onMounted(() => {
      console.log({ parent });
    });

    return {
      selectStar,
      returnImageSrc,
      parent,
    };
  },
});
</script>
