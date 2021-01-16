<template>
  <div class="flex flex-col items-center space-y-4">
    <div
      class="flex flex-1 max-w-full row items-center space-x-reverse space-x-0.5"
    >
      <div v-if="showArrows" @click="onScrollRight">
        <t-icon name="keyboard_arrow_right"></t-icon>
      </div>
      <nav
        :key="tabsLength"
        ref="navRef"
        class="flex flex-1 items-center flex-row max-w-full overflow-x-auto scrollbar-hidden"
      >
        <button
          class="text-gray-600 min-w-max py-4 px-6 block hover:text-blue-500 focus:outline-none"
          v-for="(tab, index) in tabs"
          :key="`${index}-${tab.props.title}`"
          @click="selectTab(index)"
          :class="{
            'text-blue-500 border-b-2 font-medium border-blue-500':
              index === selectedIndex
          }"
        >
          {{ tab.props.title }}
        </button>
      </nav>
      <div v-if="showArrows" @click="onScrollLeft">
        <t-icon name="keyboard_arrow_left"></t-icon>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  onBeforeMount,
  onMounted,
  provide,
  reactive,
  toRefs,
  VNode,
  onUpdated,
  watch,
  watchEffect
} from "vue";
import { useScrollElement } from "@/compositionFunctions/scroll";
import TIcon from "@/components/tailwind/TIcon.vue";

interface TabProps {
  title: string;
}

export default defineComponent({
  name: "TTabs",
  components: { TIcon },
  props: {
    arrows: {
      type: Boolean,
      default: true
    }
  },
  setup(props, { slots }) {
    const state = reactive({
      selectedIndex: 0,
      tabs: [] as VNode<TabProps>[],
      count: 0
    });

    provide("TabsProvider", state);

    const selectTab = (i: number) => {
      state.selectedIndex = i;
    };
    const renderChildren = () => {
      if (slots.default) {
        //@ts-ignore
        state.tabs = slots.default().filter(child => {
          //@ts-ignore
          return child.type.name === "TTabItem";
        });
      }
    };
    watchEffect(() => {
      renderChildren();
    });
    const tabsLength = computed(() => state.tabs.length);

    onMounted(() => {
      selectTab(0);
    });

    const {
      elementRef: navRef,
      scrollLeft,
      scrollRight,
      hasHorizontalScrollbar
    } = useScrollElement();
    const onScrollLeft = () => {
      scrollLeft(50, 200);
    };
    const onScrollRight = () => {
      scrollRight(50, 200);
    };
    const showArrows = computed(
      () => props.arrows && hasHorizontalScrollbar.value
    );
    return {
      ...toRefs(state),
      tabsLength,
      selectTab,
      onScrollLeft,
      onScrollRight,
      showArrows,
      navRef
    };
  }
});
</script>
