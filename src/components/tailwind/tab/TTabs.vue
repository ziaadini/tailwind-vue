<template>
  <div class="flex flex-col items-center space-y-4">
    <div class="flex max-w-full row items-center">
      <div v-if="showArrows" @click="onScrollRight">
        <t-icon
          :disabled="startIntersecting"
          name="keyboard_arrow_right"
        ></t-icon>
      </div>
      <nav
        ref="navRef"
        class="flex  items-center flex-row max-w-full overflow-x-auto scrollbar-hidden"
      >
        <div ref="startItem" class="w-1 h-1 px-1"></div>
        <button
          class="text-gray-600 min-w-max py-4 px-6 block  md:hover:text-blue-500 focus:outline-none"
          v-for="(tab, index) in tabs"
          :key="`${index}-${tab.props.title}`"
          @click="selectTab(index, tab)"
          :class="{
            'text-blue-500 border-b-2 font-medium border-blue-500':
              index === selectedIndex
          }"
        >
          {{ tab.props.title }}
        </button>
        <div ref="endItem" class="w-1 h-1 px-1"></div>
      </nav>
      <div v-if="showArrows" @click="onScrollLeft">
        <t-icon :disabled="endIntersecting" name="keyboard_arrow_left"></t-icon>
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
  watch
} from "vue";
import { useScrollElement } from "@/compositionFunctions/scroll";
import TIcon from "@/components/tailwind/TIcon.vue";
import { useIntersectElement } from "@/compositionFunctions/intersect";

interface TabProps {
  title: string;
  value?: string | number;
}

export default defineComponent({
  name: "TTabs",
  components: { TIcon },
  props: {
    modelValue: { type: [String, Number], default: 0 },
    arrows: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { slots, emit }) {
    const state = reactive({
      selectedIndex: 0,
      tabs: [] as VNode<TabProps>[],
      count: 0
    });

    provide("TabsProvider", state);

    const selectTab = (i: number, tab) => {
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
      root: navRef.value
    });
    const {
      elementRef: endItem,
      isIntersecting: endIntersecting
    } = useIntersectElement({
      passRef: true,
      root: navRef.value
    });

    const showArrows = computed(
      () =>
        props.arrows && (!startIntersecting!.value || !endIntersecting!.value)
    );

    return {
      startIntersecting,
      endIntersecting,
      startItem,
      endItem,
      ...toRefs(state),
      selectTab,
      onScrollLeft,
      onScrollRight,
      showArrows,
      navRef
    };
  }
});
</script>
