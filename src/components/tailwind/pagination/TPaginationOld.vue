<template>
  <div class="min-w-max">
    <section
      class="flex justify-between bg-white rounded-lg border border-gray-200 px-10 py-3 text-gray-700 font-montserrat"
    >
      <ul class="flex items-center">
        <li class="pr-6" v-if="hasPrev()">
          <a href="#" @click.prevent="changePage(prevPage)">
            <div
              class="flex items-center justify-center hover:bg-gray-200 rounded-md transform rotate-45 h-6 w-6"
            >
              <div class="transform -rotate-45">
                <svg
                  class="h-4 w-4"
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
        <li class="pr-6" v-if="hasFirst()">
          <a href="#" @click.prevent="changePage(1)">
            <div
              class="flex hover:bg-gray-200 rounded-md transform rotate-45 h-6 w-6 items-center justify-center"
            >
              <span class="transform -rotate-45">
                1
              </span>
            </div>
          </a>
        </li>
        <li class="pr-6" v-if="hasFirst()">...</li>
        <li class="pr-6" v-for="(page, index) in pages" :key="`page-${index}`">
          <a href="#" @click.prevent="changePage(page)">
            <div
              :class="{
                'bg-gradient-to-r from-blue-400 to-indigo-400':
                  modelValue == page
              }"
              class="flex hover:bg-gray-200 rounded-md transform rotate-45 h-6 w-6 items-center justify-center"
            >
              <span class="transform -rotate-45">{{ page }}</span>
            </div>
          </a>
        </li>
        <li class="pr-6" v-if="hasLast()">...</li>
        <li class="pr-6" v-if="hasLast()">
          <a href="#" @click.prevent="changePage(totalPages)">
            <div
              class="flex hover:bg-gray-200 rounded-md transform rotate-45 h-6 w-6 items-center justify-center"
            >
              <span class="transform -rotate-45">
                {{ totalPages }}
              </span>
            </div>
          </a>
        </li>
        <li class="pr-6" v-if="hasNext()">
          <a href="#" @click.prevent="changePage(nextPage)">
            <div
              class="flex items-center justify-center hover:bg-gray-200 rounded-md transform rotate-45 h-6 w-6"
            >
              <div class="transform -rotate-45">
                <svg
                  class="h-4 w-4"
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
      </ul>
    </section>
  </div>
</template>

<script>
import { computed, defineComponent } from "vue";
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
    }
  },
  setup(props){
    const hasFirst=computed(()=>props.rangeStart !== 1)
    const hasLast=computed(()=>props.rangeEnd < this.totalPages)
  },
  methods: {
    hasFirst: function() {
      return this.rangeStart !== 1;
    },
    hasLast: function() {
      return this.rangeEnd < this.totalPages;
    },
    hasPrev: function() {
      return this.modelValue > 1;
    },
    hasNext: function() {
      return this.modelValue < this.totalPages;
    },
    changePage: function(page) {
      if (page > 0 && page <= this.totalPages) {
        this.$emit("update:modelValue", page);
      }
    }
  },
  computed: {
    pages: function() {
      const pages = [];
      for (let i = this.rangeStart; i <= this.rangeEnd; i++) {
        pages.push(i);
      }
      return pages;
    },
    rangeStart: function() {
      const start = this.modelValue - this.pageRange;
      return start > 0 ? start : 1;
    },
    rangeEnd: function() {
      const end = this.modelValue + this.pageRange;
      if (end < this.totalPages) {
        return end;
      } else {
        return this.totalPages;
      }
    },
    totalPages() {
      return Math.ceil(this.totalCount / this.perPage);
    },
    nextPage: function() {
      return this.modelValue + 1;
    },
    prevPage: function() {
      return this.modelValue - 1;
    }
  }
});
</script>

<style scoped></style>
