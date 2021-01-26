<template>
  {{ content }}
  <div v-bind="$attrs" class="relative">
    <div
      ref="slidesContainer"
      class="overflow-auto whitespace-nowrap scroll w-full h-full scroll-smooth"
    >
      <template class="block" ref="content"> <slot /></template>
    </div>
    <div class="absolute transform left-0 top-1/2 -translate-y-1/2">
      <slot name="leftButton" :scrollLeft="onScrollLeft" />
    </div>
    <div class="absolute transform right-0 top-1/2 -translate-y-1/2">
      <slot name="rightButton" :scrollRight="onScrollRight" />
    </div>
  </div>
</template>

<script lang="ts">
import { nextTick } from "vue";
import { useIntersectElement } from "@/compositionFunctions/intersect";
import { useScrollElement } from "@/compositionFunctions/scroll";
import { defineComponent, onMounted, ref, watch } from "vue";

export default defineComponent({
  setup(_, { slots }) {
    const content = ref(null);
    const intersectionArray = ref([] as any[]);

    const {
      elementRef: slidesContainer,
      scrollLeft,
      scrollRight,
    } = useScrollElement();

    const currentViewStartAndEndIndex = (items: any[]) => {
      const first = items.findIndex((e) => e.isIntersecting) - 1;
      const last =
        items.slice(first).findIndex((e) => !e.isIntersecting) + first + 1;
      return [first, last];
    };

    const onScrollLeft = () => {
      console.log(intersectionArray.value);
      const [first, _] = currentViewStartAndEndIndex(intersectionArray.value);
      console.log(_, first);
      if (first !== intersectionArray.value.length - 1) {
        const notIntersected = intersectionArray.value[first + 1];
        console.log(notIntersected.ref);
        notIntersected.ref.scrollIntoView();
      } else scrollLeft(slidesContainer.value.clientWidth, 200);
    };
    const onScrollRight = () => {
      const [_, last] = currentViewStartAndEndIndex(intersectionArray.value);
      if (last) {
        const notIntersected = intersectionArray.value[last - 1];
        console.log(notIntersected.ref);
        notIntersected.ref.scrollIntoView();
      } else scrollRight(slidesContainer.value.clientWidth, 200);
    };

    const disposeIntersectionArray = () => {
      // intersectionArray.forEach((item) => item.destroyObserver());
      intersectionArray.value = [];
      console.log("intersection observer disposer");
    };

    const intersectionArrayGenerator = async () => {
      const tmp = [] as any[];
      await nextTick();
      // @ts-ignore
      (content.value! as HTMLTemplateElement).children.forEach((domItem) => {
        const intersect = useIntersectElement(
          {
            passRef: true,
          },
          undefined,
          domItem,
          false
        );
        tmp.push({
          isIntersecting: intersect.isIntersecting,
          ref: intersect.elementRef,
        });

        intersectionArray.value = tmp;
      });
    };

    onMounted(() => {
      intersectionArrayGenerator();
      // @ts-ignore
      watch(slots.default, (value) => {
        disposeIntersectionArray();
        intersectionArrayGenerator();
      });
    });

    return {
      onScrollLeft,
      onScrollRight,
      slidesContainer,
      content,
    };
  },
});
</script>

<style lang="scss">
.scroll-smooth {
  scroll-behavior: smooth;
}
</style>
