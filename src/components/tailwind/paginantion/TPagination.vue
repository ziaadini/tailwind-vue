<template>
  <div class="w-1/2">
    <div
      class="flex flex-row items-center justify-center bg-white p-4 w-full border-t mt-3 justify-between"
    >
      <button
        class="rounded-sm bg-white p-3 mx-2 outline-none focus:outline-none shadow font-bold"
        @click="setCurrentPage(1)"
      >
        اولین صفحه
      </button>
      <div class="flex">
        <button
          v-for="item in pagination"
          :id="currentPageVar"
          :key="item.page"
          :class="{
            'text-white bg-primary': item.page === currentPageVar
          }"
          class="rounded-sm bg-white px-3 py-1 mx-1 focus:outline-none shadow "
          @click="setCurrentPage(item.page)"
        >
          {{ item.page }}
        </button>
      </div>
      <button
        class="rounded-sm bg-white p-3 mx-2 focus:outline-none shadow font-bold"
        @click="setCurrentPage(maxPages)"
      >
        آخرین صفحه
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "TPagination",
  props: {
    maxPages: {
      type: Number,
      default: 1
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },

  setup(props, { emit }) {
    interface Page {
      page: number;
      // route: string;
    }
    const currentPageVar = ref(props.currentPage);
    const pagination = computed((): Page[] => {
      const pages: Page[] = [];
      const current: number = currentPageVar.value;
      const max = props.maxPages;
      // const prevDist = this.currentPage - 1
      if (max - current < 3) {
        for (
          let i: number = current - 6 + max - current;
          i < current - 3;
          i++
        ) {
          // console.log(i);
          if (i > 0) pages.push({ page: i });
        }
      }
      for (let i: number = current - 3; i < current; i++) {
        // console.log(i);
        if (i > 0) pages.push({ page: i });
      }
      pages.push({ page: current });
      for (let i = current + 1; i < current + 4; i++) {
        if (i <= max) pages.push({ page: i });
      }
      if (current < 4) {
        console.log({ max, current, diffmax: max - current });

        for (
          let i: number = current + 4;
          i < current + 4 + (4 - current);
          i++
        ) {
          // console.log(i);
          if (i > 0) pages.push({ page: i });
        }
      }
      return pages;
    });
    const setCurrentPage = value => {
      currentPageVar.value = value;
      emit("pagechange", { currentPageVar });
      // console.log(value, Number(currentPageVar.value), pagination.value);
    };

    return { setCurrentPage, currentPageVar, pagination };
  }
});
</script>

<style scoped></style>
