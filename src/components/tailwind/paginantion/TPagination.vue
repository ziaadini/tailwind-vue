<template>
  <div
    class="flex flex-row items-center justify-center bg-white p-4 w-full border-t mt-3"
  >
    <button
      class="rounded-sm bg-gray-200 p-3 mx-2 outline-none focus:outline-none"
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
          'page-btn_active': item.page === currentPageVar
        }"
        class="rounded-sm bg-gray-200 w-10 h-10 mx-1 focus:outline-none"
        @click="setCurrentPage(item.page)"
      >
        {{ item.page }}
      </button>
    </div>
    <button
      class="rounded-sm bg-gray-200 p-3 mx-2 focus:outline-none"
      @click="setCurrentPage(maxPages)"
    >
      آخرین صفحه
    </button>
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
      route: string;
    }
    const currentPageVar = ref(props.currentPage);
    const pagination = computed((): Page[] => {
      const pages: Page[] = [];
      const current: number = currentPageVar.value;
      const max = props.maxPages;
      // const prevDist = this.currentPage - 1
      for (let i: number = current - 3; i < current; i++) {
        console.log(i);
        if (i > 0) pages.push({ page: i, route: "" });
      }
      pages.push({ page: current, route: "" });
      for (let i = current + 1; i < current + 4; i++) {
        if (i <= max) pages.push({ page: i, route: "" });
      }
      return pages;
    });
    const setCurrentPage = value => {
      currentPageVar.value = value;
      emit("pagechange", { currentPageVar });
      console.log(value, Number(currentPageVar.value), pagination.value);
    };
    return { setCurrentPage, currentPageVar, pagination };
  }
});
</script>

<style scoped>
.page-btn_active {
  @apply bg-red-400;
}
</style>
