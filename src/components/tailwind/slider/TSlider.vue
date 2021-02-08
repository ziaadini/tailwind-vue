<template>
  <div v-bind="$attrs" class="relative">
    <div
      ref="slidesContainer"
      class="overflow-auto whitespace-nowrap scrollbar-hidden w-full h-full scroll-smooth"
    >
      <div class="contents" ref="content"><slot /></div>
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

    const currentViewStartAndEndIndex = (items: any[]): [number, number] => {
      const _ = items.findIndex((e) => e.isIntersecting);
      const first = _ !== 0 ? _ - 1 : 0;
      let last =
        items.slice(first + 1).findIndex((e) => !e.isIntersecting) + first + 1;

      if (last - first <= 2) last = items.length - 1;

      console.log("calculated first and last", { first, last, _ });
      return [first, last];
    };

    const onScrollLeft = () => {
      console.log(intersectionArray.value);
      const [_, last] = currentViewStartAndEndIndex(intersectionArray.value);
      console.log({ last });
      if (last !== intersectionArray.value.length - 1) {
        const notIntersected = intersectionArray.value[last];
        console.log(notIntersected.ref);
        notIntersected.ref.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
        
      } else scrollLeft(slidesContainer.value.clientWidth, 200);
    };
    const onScrollRight = () => {
      const [first, _] = currentViewStartAndEndIndex(intersectionArray.value);
      if (first) {
        const notIntersected = intersectionArray.value[first];
        console.log(notIntersected.ref);
        notIntersected.ref.scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      } else scrollRight(slidesContainer.value.clientWidth, 200);
    };

    const disposeIntersectionArray = () => {
      intersectionArray.value = [];
    };

    const intersectionArrayGenerator = async () => {
      const tmp = [] as any[];
      await nextTick();
      (((content.value! as HTMLTemplateElement)
        .children as unknown) as any[]).forEach((domItem) => {
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
      watch<any>(slots.default, () => {
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

<style lang="scss" scoped>
.scroll-smooth {
  scroll-behavior: smooth;
}
</style>
