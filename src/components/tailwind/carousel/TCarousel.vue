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
      <!-- handle carousel with t-image -->
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
      <!-- handle carousel with slot -->
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
    <!-- right btn -->
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
    <!-- left btn -->
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

    <!-- pagination wrapper -->
    <div
      v-if="!hasPaginationSlot"
      data-name="carousel-paginationWrapper"
      :class="[
        renderClass(
          'flex flex-row-reverse flex-wrap justify-center absolute right-1/2 transform translate-x-1/2 bottom-20 z-20',
          'paginationWrapper'
        ),
      ]"
    >
      <div
        v-if="activeIndex > paginationTicksNumber - 1"
        data-name="carousel-paginationBack"
        :class="[
          renderClass(
            'mr-1 w-1 h-1 cursor-pointer bg-gray-400 rounded-full',
            'paginationBack'
          ),
        ]"
        @click="handlePaginationClick(0)"
      ></div>
      <div
        data-name="carousel-paginationContainer"
        :class="[
          renderClass(
            'rounded-sm flex flex-row-reverse overflow-hidden',
            'paginationContainer'
          ),
        ]"
      >
        <div
          v-for="(item, index) in getPaginationTicks"
          :key="index + '-pagination'"
          data-name="carousel-paginationTick"
          :class="[
            renderClass('w-3 h-1 cursor-pointer', 'paginationTick', {
              'bg-transparent': item.transparent,
              'bg-gray-400': !item.transparent && !item.enabled,
              'bg-gray-100': item.enabled,
            }),
          ]"
          @click="handlePaginationClick(index)"
        ></div>
      </div>
      <div
        v-if="!rightDisabled"
        data-name="carousel-paginationNext"
        :class="[
          renderClass(
            'ml-1 w-1 h-1 cursor-pointer bg-gray-400 rounded-full',
            'paginationNext'
          ),
        ]"
        @click="handlePaginationClick(3)"
      ></div>
    </div>
    <!-- pagination slot -->
    <slot :activeIndex="activeIndex" name="pagination" />

    <!-- carousel caption -->
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
    paginationTicksNumber: {
      type: Number,
      default: () => inject(component("paginationTicksNumber"), 3),
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

    const paginationTicks = ref([] as any[]);
    for (let i = 0; i < props.paginationTicksNumber; i++) {
      paginationTicks.value.push({
        enabled: false,
        transparent: false,
      });
    }

    // handle pagination
    const getPaginationTicks = computed(() => {
      // find selected tick
      const selected = activeIndex.value % props.paginationTicksNumber;

      // reset enabled item
      paginationTicks.value.forEach((value) => {
        value.enabled = false;
      });

      // handle last item
      if (activeIndex.value === items.value.length - 1) {
        for (let i = selected + 1; i < props.paginationTicksNumber; i++) {
          paginationTicks.value[i].transparent = true;
        }
      } else if (activeIndex.value === items.value.length - 2) {
        paginationTicks.value.forEach((value) => {
          value.transparent = false;
        });
      }

      paginationTicks.value[selected].enabled = true;
      return paginationTicks.value;
    });

    // handle pagination tick clicks
    function handlePaginationClick(index) {
      if (activeIndex.value % 3 === index) return;
      return activeIndex.value % 3 < index ? buttonClick(+1) : buttonClick(-1);
    }

    const hasPaginationSlot = computed(() => {
      return !!slots.pagination;
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
      handlePaginationClick,
      getPaginationTicks,
      hasPaginationSlot
    };
  },
});
</script>

<style lang="scss" scoped></style>
