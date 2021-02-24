<template>
  <!-- carousel wrapper -->
  <div
    data-name="carousel-wrapper"
    :class="[renderClass('relative bg-transparent overflow-hidden', 'wrapper')]"
    v-bind="{
      ...$attrs,
      onMouseDown: swipeEnabled && onMouseDown,
      onTouchstart: swipeEnabled && onTouchstart,
    }"
  >
    <!-- carousel images -->
    <div
      data-name="carousel-images"
      :class="[renderClass('absolute w-full h-full', 'images')]"
      ref="slotWrapperRef"
    >
      <template v-if="!hasDefaultSlot">
        <t-image
          v-for="(link, index) in items"
          :key="index + 'img'"
          data-name="carousel-imageItem"
          v-bind="imageProps"
          :class="[
            renderClass(
              `absolute w-full h-full transition transform origin-center duration-500 delay-150`,
              'imageItem',
              {
                'rotate-90': activeIndex !== index && rotate,
                'scale-150': activeIndex !== index && scale,
                ...horizontalClasses(index),
              }
            ),
          ]"
          :src="link.url"
      /></template>
      <div
        v-for="(link, index) in items"
        :key="index + 'img'"
        data-name="carousel-imageItem"
        v-bind="imageProps"
        :class="[
          renderClass(
            `absolute w-full h-full transition transform origin-center duration-500 delay-150`,
            'imageItem',
            {
              'rotate-90': activeIndex !== index && rotate,
              'scale-150': activeIndex !== index && scale,
              ...horizontalClasses(index),
            }
          ),
        ]"
      >
        <slot :src="link.url" :index="index" :activeIndex="activeIndex" />
      </div>
    </div>
    <div
      data-name="carousel-rightBtn"
      :class="[
        renderClass(
          'absolute transform right-0 top-1/2 -translate-y-1/2 z-20',
          'rightBtn'
        ),
      ]"
    >
      <slot
        name="rightButton"
        :leftDisabled="leftDisabled"
        :rightDisabled="rightDisabled"
        :next="() => buttonClick(+1)"
        :back="() => buttonClick(-1)"
      />
    </div>
    <div
      data-name="carousel-leftBtn"
      :class="[
        renderClass(
          'absolute transform left-0 top-1/2 -translate-y-1/2 z-20',
          'leftBtn'
        ),
      ]"
    >
      <slot
        name="leftButton"
        :leftDisabled="leftDisabled"
        :rightDisabled="rightDisabled"
        :next="() => buttonClick(+1)"
        :back="() => buttonClick(-1)"
      />
    </div>
    <div
      data-name="carousel-caption"
      :class="[
        renderClass(
          'absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20',
          'caption'
        ),
      ]"
    >
      <slot name="caption" />
    </div>
  </div>
</template>

<script lang="ts">
import { useInterval } from "@/compositionFunctions/interval";
import { useSwipeElement } from "@/compositionFunctions/swipe";
import {
  computed,
  defineComponent,
  inject,
  onMounted,
  PropType,
  ref,
  toRefs,
  watch,
  watchEffect,
} from "vue";
import { useRenderClass } from "@/compositionFunctions/settings";
import TImage from "@/components/tailwind/image/TImage.vue";

const component = (propName: string) => "t-carousel-" + propName;
export default defineComponent({
  props: {
    scale: {
      type: Boolean,
      required: false,
      default: false,
    },
    rotate: {
      type: Boolean,
      required: false,
      default: false,
    },
    autoPlay: {
      type: Boolean,
      default: () => inject(component("autoPlay"), true),
      required: false,
    },
    autoPlaceInterval: {
      type: Number,
      default: () => inject(component("autoPlaceInterval"), 2000),
      required: false,
    },
    modelValue: {
      type: Number,
      default: () => inject(component("modelValue"), 0),
      required: false,
    },
    items: {
      type: Array as PropType<{ value: number; url: string }[]>,
      default: [],
    },
    swipeThreshold: {
      type: Number,
      default: () => inject(component("swipeThreshold"), 50),
      required: false,
    },
    swipeEnabled: {
      type: Boolean,
      default: () => inject(component("swipeEnabled"), true),
      required: false,
    },
    imageProps: {
      type: Object,
      required: false,
      default: () => inject(component("imageProps"), {}),
    },
  },
  components: { TImage },
  setup(props, { emit, slots }) {
    const activeIndex = ref(0);

    const { autoPlay, autoPlaceInterval, modelValue, items } = toRefs(props);

    const horizontalClasses = (index: number) => ({
      "translate-x-0 top-0 z-20": index === activeIndex.value,
      "-translate-x-full top-0": activeIndex.value - index > 0,
      "translate-x-full top-0": activeIndex.value - index < 0,
    });

    const itemChangedEvent = () => {
      emit("update:modelValue", activeIndex);
    };

    const changeActiveIndex = (value: number) => {
      activeIndex.value = activeIndex.value + value;
      itemChangedEvent();
    };

    const leftDisabled = computed(() => {
      return activeIndex.value === 0;
    });

    const rightDisabled = computed(() => {
      return activeIndex.value >= props.items.length - 1;
    });

    watch(modelValue, (newIndex) => {
      changeActiveIndex(newIndex - activeIndex.value);
    });

    let increment = true;

    const { start } = useInterval(() => {
      if (rightDisabled.value) increment = false;
      else if (leftDisabled.value) increment = true;
      if (increment) changeActiveIndex(+1);
      else changeActiveIndex(-1);
    }, null);

    const setCarouselInterval = () => {
      start(autoPlaceInterval.value);
    };

    const buttonClick = (variance) => {
      start(null);
      changeActiveIndex(variance);
      if (autoPlay.value) {
        setCarouselInterval();
      }
    };

    const {
      bind: swipeEvent,
      state: state,
      xDiff: swipeDiff,
    } = useSwipeElement();

    if (props.swipeEnabled)
      watchEffect(() => {
        if (state.isDropped) {
          if (swipeDiff.value > props.swipeThreshold) {
            !leftDisabled.value && buttonClick(-1);
          } else if (swipeDiff.value < -props.swipeThreshold) {
            !rightDisabled.value && buttonClick(1);
          }
        }
      });

    const { renderClass } = useRenderClass("carousel");

    const slotWrapperRef = ref(null);

    const hasDefaultSlot = computed(() => {
      return !!slots.default;
    });

    onMounted(() => {
      watchEffect(() => {
        if (autoPlay.value) {
          setCarouselInterval();
        } else {
          start(null);
        }
      });
    });

    return {
      horizontalClasses,
      changeActiveIndex,
      activeIndex,
      leftDisabled,
      rightDisabled,
      buttonClick,
      onMouseDown: swipeEvent.onMousedown,
      onTouchstart: swipeEvent.onTouchstart,
      renderClass,
      slotWrapperRef,
      hasDefaultSlot,
    };
  },
});
</script>

<style lang="scss" scoped></style>
