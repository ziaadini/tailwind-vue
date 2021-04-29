<template>
  <div v-bind="$attrs" class="relative">
    <div
      ref="slidesContainer"
      class="overflow-auto whitespace-nowrap scrollbar-hidden w-full h-full scroll-smooth"
    >
      <div class="contents" ref="content"><slot /></div>
    </div>
    <div
      @click="onScrollLeft"
      class="absolute transform left-0 top-1/2 -translate-y-1/2"
    >
      <slot
        name="leftButton"
        :scrollRight="onScrollRight"
        :scrollLeft="onScrollLeft"
        :leftDisabled="leftDisabled"
        :rightDisabled="rightDisabled"
      />
    </div>
    <div
      class="absolute transform right-0 top-1/2 -translate-y-1/2"
      @click="onScrollRight"
    >
      <slot
        name="rightButton"
        :scrollRight="onScrollRight"
        :scrollLeft="onScrollLeft"
        :leftDisabled="leftDisabled"
        :rightDisabled="rightDisabled"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { nextTick } from "vue";
import { useIntersectElement } from "@/compositionFunctions/intersect";
import { useScrollElement } from "@/compositionFunctions/scroll";
import { defineComponent, onMounted, ref, watch } from "vue";
import { useIsScrolling } from "@/compositionFunctions/isScrolling";

export default defineComponent({
  setup(_, { slots }) {
    const content = ref(null);
    const intersectionArray = ref([] as any[]);

    const leftDisabled = ref(false);
    const rightDisabled = ref(true);

    const {
      elementRef: slidesContainer,
      scrollLeft,
      scrollRight
    } = useScrollElement();

    const currentViewStartAndEndIndex = (
      items: any[] = intersectionArray.value
    ): [number, number] => {
      const _ = items.findIndex(e => e.isIntersecting);
      const first = _ !== 0 ? _ - 1 : 0;
      let last =
        items.slice(first + 1).findIndex(e => !e.isIntersecting) + first + 1;

      if (last - first <= 2) last = items.length - 1;
      return [first, last];
    };

    const { result } = useIsScrolling(true, slidesContainer);

    watch(result, () => {
      const items = intersectionArray.value;
      [rightDisabled.value, leftDisabled.value] = [
        items[0].isIntersecting,
        items[items.length - 1].isIntersecting
      ];
    });

    // const leftDisabled = computed(() => {
    //   console.log(intersectionArray[currentViewStartAndEndIndex()[1]]);
    // });

    const onScrollLeft = () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [_, last] = currentViewStartAndEndIndex();
      if (last !== intersectionArray.value.length - 1) {
        const notIntersected = intersectionArray.value[last];
        notIntersected.ref.scrollIntoView({
          block: "nearest",
          behavior: "smooth"
        });
      } else scrollLeft(slidesContainer.value.clientWidth, 200);
    };
    const onScrollRight = () => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [first, _] = currentViewStartAndEndIndex();
      if (first) {
        const notIntersected = intersectionArray.value[first];
        notIntersected.ref.scrollIntoView({
          block: "nearest",
          behavior: "smooth"
        });
      } else scrollRight(slidesContainer.value.clientWidth, 200);
    };

    const disposeIntersectionArray = () => {
      intersectionArray.value = [];
    };

    const intersectionArrayGenerator = async () => {
      const tmp = [] as any[];
      await nextTick();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (((content.value! as HTMLTemplateElement)
        .children as unknown) as any[]).forEach(domItem => {
        const intersect = useIntersectElement(
          {
            passRef: true
          },
          undefined,
          domItem,
          false
        );
        tmp.push({
          isIntersecting: intersect.isIntersecting,
          ref: intersect.elementRef
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
      leftDisabled,
      rightDisabled
    };
  }
});
</script>

<style lang="scss" scoped>
.scroll-smooth {
  scroll-behavior: smooth;
}
</style>
