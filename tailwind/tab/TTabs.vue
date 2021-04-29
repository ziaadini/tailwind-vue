<template>
  <div
    data-name="tabs-container"
    :class="renderClass('flex flex-col items-center space-y-4', 'container')"
  >
    <div
      data-name="tabs-headerContainer"
      :class="
        renderClass('flex max-w-full row items-center', 'headerContainer')
      "
    >
      <div v-if="showArrows" @click="onScrollRight">
        <template v-if="hasRightArrowSlot">
          <slot name="arrowRight" :disabled="endIntersecting"></slot>
        </template>
        <div
          v-else
          :disabled="startIntersecting"
          name="keyboard_arrow_right"
          data-name="tabs-arrow"
          :class="
            renderClass('cursor-pointer self-center fill-current', 'arrow', {
              'opacity-50': startIntersecting
            })
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
          >
            <path
              d="M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z"
            />
          </svg>
        </div>
      </div>
      <nav
        ref="navRef"
        data-name="tabs-nav"
        :class="
          renderClass(
            'flex items-center flex-row max-w-full overflow-x-auto scrollbar-hidden',
            'nav'
          )
        "
      >
        <div ref="startItem" class="w-1 h-1 px-1"></div>
        <template v-if="hasTitleSlot">
          <div
            v-for="(tab, index) in tabs"
            :key="`${index}-${tab.props.title}`"
            @click="selectTab(index, tab, $event)"
          >
            <slot
              name="title"
              :selected="index === selectedIndex"
              :title="tab.props.title"
              v-bind="tab.props"
            ></slot>
          </div>
        </template>
        <button
          v-else
          v-for="(tab, index) in tabs"
          :key="`${index}-${tab.props.title}`"
          @click="selectTab(index, tab, $event)"
          data-name="tabs-header"
          :class="[
            renderClass(
              `${
                index === selectedIndex
                  ? `text-${variant} border-b-2 font-medium border-${variant}`
                  : ''
              } text-gray-600 min-w-max py-4 px-6 block  md:hover:text-blue-500 focus:outline-none`,
              'header'
            )
          ]"
        >
          {{ tab.props.title }}
        </button>
        <div ref="endItem" class="w-1 h-1 px-1"></div>
      </nav>
      <div v-if="showArrows" @click="onScrollLeft">
        <template v-if="hasLeftArrowSlot">
          <slot name="arrowLeft" :disabled="endIntersecting"></slot>
        </template>
        <div
          v-else
          :disabled="endIntersecting"
          name="keyboard_arrow_left"
          data-name="tabs-arrow"
          :class="
            renderClass('cursor-pointer self-center fill-current', 'arrow', {
              'opacity-50': endIntersecting
            })
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            viewBox="0 0 24 24"
          >
            <path
              d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"
            />
          </svg>
        </div>
      </div>
    </div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  provide,
  reactive,
  toRefs,
  VNode,
  watchEffect,
  watch,
  inject,
  onMounted,
  ref
} from "vue";
import { useScrollElement } from "@/compositionFunctions/scroll";
import { useIntersectElement } from "@/compositionFunctions/intersect";
import { useRenderClass } from "@/compositionFunctions/settings";
import { variants } from "@/utility/css-helper";
import { useResize } from "@/compositionFunctions/useResize";
interface TabProps {
  title: string;
  value?: string | number;
}

export default defineComponent({
  name: "TTabs",
  props: {
    modelValue: { type: [String, Number], default: 0 },
    arrows: {
      type: Boolean,
      default: () => inject("t-tabs-arrows", true)
    },
    variant: {
      type: String,
      default: () => inject("t-tabs-variant", "primary"),
      validator: (propValue: string) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        return !!variants[propValue];
      }
    }
  },
  setup(props, { slots, emit }) {
    const state = reactive({
      selectedIndex: 0,
      tabs: [] as VNode<TabProps>[],
      count: 0
    });

    provide("TabsProvider", state);

    const selectTab = (i: number, tab, e) => {
      e.target.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
      emit("update:modelValue", tab.props.value || i);
    };
    const renderChildren = () => {
      if (slots.default) {
        //@ts-ignore
        state.tabs = slots.default().filter(child => {
          //@ts-ignore
          return child.type.name === "TTabItem";
        });
        const selectedIndex = state.tabs.findIndex(
          item => item?.props?.value === props.modelValue
        );
        if (selectedIndex !== -1) {
          state.selectedIndex = selectedIndex;
        } else if (typeof props.modelValue === "number") {
          state.selectedIndex = props.modelValue;
        }
      }
    };
    watchEffect(() => {
      renderChildren();
    });
    const tabsLength = computed(() => state.tabs.length);

    watch(
      () => tabsLength.value,
      (value, oldValue) => {
        console.warn(
          "t-tabs : change tabs length is not allowed",
          `from: ${oldValue} to: ${value}`
        );
      }
    );

    const { elementRef: navRef, scrollLeft, scrollRight } = useScrollElement();
    const onScrollLeft = () => {
      scrollLeft(navRef.value.clientWidth, 200);
    };
    const onScrollRight = () => {
      scrollRight(navRef.value.clientWidth, 200);
    };

    const {
      elementRef: startItem,
      isIntersecting: startIntersecting
    } = useIntersectElement({
      passRef: true,
      root: navRef.value,
      defaultValue: true
    });
    const {
      elementRef: endItem,
      isIntersecting: endIntersecting
    } = useIntersectElement({
      passRef: true,
      root: navRef.value,
      defaultValue: true
    });
    const hasHorizontalScroll = ref(false);
    const handleScrollWidth = () => {
      const clientWidth = (navRef.value as Element).clientWidth;
      const scrollWidth = (navRef.value as Element).scrollWidth;
      if (scrollWidth > clientWidth) {
        hasHorizontalScroll.value = true;
      } else {
        hasHorizontalScroll.value = false;
      }
    };
    onMounted(handleScrollWidth);

    useResize(() => {
      handleScrollWidth();
    });

    const showArrows = computed(
      () =>
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        props.arrows && hasHorizontalScroll.value
    );

    const { renderClass } = useRenderClass("tabs");
    return {
      hasTitleSlot: !!slots.title,
      startIntersecting,
      endIntersecting,
      startItem,
      endItem,
      ...toRefs(state),
      selectTab,
      onScrollLeft,
      onScrollRight,
      showArrows,
      navRef,
      renderClass,
      hasRightArrowSlot: !!slots.arrowRight,
      hasLeftArrowSlot: !!slots.arrowLeft
    };
  }
});
</script>
