<template>
  <div class="flex flex-col items-center space-y-4">
    <button @click="scrollLeft">left</button>
    <nav
      ref="nav"
      class="flex flex-1 flex-row max-w-full overflow-x-auto scrollbar-hidden"
    >
      <button
        class="text-gray-600 min-w-max py-4 px-6 block hover:text-blue-500 focus:outline-none"
        v-for="(tab, index) in tabs"
        :key="index"
        @click="selectTab(index)"
        :class="{
          'text-blue-500 border-b-2 font-medium border-blue-500':
            index === selectedIndex
        }"
      >
        {{ tab.props.title }}
      </button>
    </nav>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  provide,
  onMounted,
  onBeforeMount,
  toRefs,
  VNode,
  ref
} from "vue";

interface TabProps {
  title: string;
}

export default defineComponent({
  name: "TTabs",
  setup(_, { slots }) {
    const state = reactive({
      selectedIndex: 0,
      tabs: [] as VNode<TabProps>[],
      count: 0
    });

    provide("TabsProvider", state);

    const selectTab = (i: number) => {
      state.selectedIndex = i;
    };

    onBeforeMount(() => {
      if (slots.default) {
        //@ts-ignore
        state.tabs = slots.default().filter(child => {
          //@ts-ignore
          return child.type.name === "TTabItem";
        });
      }
    });

    onMounted(() => {
      selectTab(0);
    });

    const scrollTo = (
      element,
      scrollPixels,
      duration,
      direction = "scrollLeft"
    ) => {
      const scrollPos = element[direction];
      // Get the start timestamp
      const startTime =
        "now" in window.performance ? performance.now() : new Date().getTime();

      const scroll = timestamp => {
        //Calculate the timeelapsed
        const timeElapsed = timestamp - startTime;
        //Calculate progress
        const progress = Math.min(timeElapsed / duration, 1);
        //Set the scrolleft
        element[direction] = scrollPos + scrollPixels * progress;
        //Check if elapsed time is less then duration then call the requestAnimation, otherwise exit
        if (timeElapsed < duration) {
          //Request for animation
          window.requestAnimationFrame(scroll);
        } else {
          return;
        }
      };
      //Call requestAnimationFrame on scroll function first time
      window.requestAnimationFrame(scroll);
    };

    const nav: any = ref(null);
    const scrollLeft = () => {
      scrollTo(nav.value, -40, 200);
    };

    return { ...toRefs(state), selectTab, scrollLeft, nav };
  }
});
</script>
