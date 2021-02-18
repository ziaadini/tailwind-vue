<template>
  <div class="min-w-max">
    <section
      class="flex justify-between bg-white rounded-lg border border-gray-200 px-10 py-3 text-gray-700 font-montserrat"
    >
      <ul class="flex items-center">
        <li class="pr-6" v-if="hasPrev">
          <a href="#" @click.prevent="changePage(prevPage)">
            <div
              class="flex items-center justify-center rounded-md transform rotate-45 h-10 w-10"
            >
              <div class="transform -rotate-45">
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </a>
        </li>
        <li class="pr-6" v-if="hasFirst">
          <a href="#" @click.prevent="changePage(1)">
            <div
              class="flex rounded-md transform rotate-45 h-10 w-10 items-center justify-center"
            >
              <span class="transform -rotate-45">
                1
              </span>
            </div>
          </a>
        </li>
        <li class="pr-6" v-if="hasFirst">...</li>
        <li class="pr-6" v-for="(page, index) in pages" :key="`page-${index}`">
          <a href="#" @click.prevent="changePage(page)">
            <div
              :class="{
                [`bg-${variant} text-white`]: modelValue === page
              }"
              class="flex rounded-full transform rotate-45 h-10 w-10 items-center justify-center"
            >
              <span class="transform -rotate-45">{{ page }}</span>
            </div>
          </a>
        </li>
        <li class="pr-6" v-if="hasLast">...</li>
        <li class="pr-6" v-if="hasLast">
          <a href="#" @click.prevent="changePage(totalPages)">
            <div
              class="flex rounded-md transform rotate-45 h-10 w-10 items-center justify-center"
            >
              <span class="transform -rotate-45">
                {{ totalPages }}
              </span>
            </div>
          </a>
        </li>
        <li class="pr-6" v-if="hasNext">
          <a href="#" @click.prevent="changePage(nextPage)">
            <div
              class="flex items-center justify-center rounded-md transform rotate-45 h-10 w-10"
            >
              <div class="transform -rotate-45">
                <svg
                  class="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </div>
            </div>
          </a>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { variants } from "@/utility/css-helper";
export default defineComponent({
  name: "TPagination",
  props: {
    modelValue: {
      type: Number,
      default: 1
    },
    totalCount: {
      type: Number,
      default: 0
    },
    perPage: {
      type: Number,
      default: 9
    },
    pageRange: {
      type: Number,
      default: 2
    },
    variant: {
      type: String,
      default: "primary",
      validator: (propValue: string) => {
        return !!variants[propValue];
      }
    }
  },
  setup(props, { emit }) {
    const totalPages = computed(() => {
      return Math.ceil(props.totalCount / props.perPage);
    });
    const rangeStart = computed(() => {
      const start = props.modelValue - props.pageRange;
      return start > 0 ? start : 1;
    });
    const rangeEnd = computed(() => {
      const end = props.modelValue + props.pageRange;
      if (end < totalPages.value) {
        return end;
      } else {
        return totalPages.value;
      }
    });
    const pages = computed(() => {
      const pages = [];
      for (let i = rangeStart.value; i <= rangeEnd.value; i++) {
        pages.push(i);
      }
      return pages;
    });

    const hasFirst = computed(() => rangeStart.value !== 1);
    const hasLast = computed(() => rangeEnd.value < totalPages.value);
    const hasPrev = computed(() => props.modelValue > 1);
    const hasNext = computed(() => props.modelValue < totalPages.value);

    const nextPage = computed(() => props.modelValue + 1);
    const prevPage = computed(() => props.modelValue - 1);
    const changePage = page => {
      if (page > 0 && page <= totalPages.value) {
        emit("update:modelValue", page);
      }
    };
    return {
      pages,
      changePage,
      totalPages,
      hasPrev,
      hasNext,
      nextPage,
      prevPage,
      hasFirst,
      hasLast
    };
  }
});
</script>

<style scoped></style>
