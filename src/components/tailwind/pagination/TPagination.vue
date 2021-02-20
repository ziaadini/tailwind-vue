<template>
  <div class="w-full overflow-x-auto">
    <section
      data-name="pagination-container"
      :class="
        renderClass(
          'flex justify-between bg-white py-3 text-gray-700',
          'container'
        )
      "
    >
      <ul
        data-name="pagination-ul"
        :class="renderClass('flex items-center mx-auto', 'ul')"
      >
        <li
          data-name="pagination-li"
          :class="renderClass('px-0.5 sm:px-3', 'li')"
          v-if="hasPrev"
        >
          <a
            data-name="pagination-anchor"
            :class="renderClass('', 'anchor')"
            href="#"
            @click.prevent="changePage(prevPage)"
          >
            <span
              data-name="pagination-itemContainer"
              :class="
                renderClass(
                  'flex items-center justify-center rounded-full hover:opacity-80  sm:h-10 sm:w-10 h-8 w-8',
                  'itemContainer'
                )
              "
            >
              <span
                data-name="pagination-iconContainer"
                :class="renderClass('', 'iconContainer')"
              >
                <template v-if="hasPrevSlot">
                  <slot name="prev"></slot>
                </template>
                <template v-else>
                  <svg
                    data-name="pagination-icon"
                    :class="renderClass('w-4 h-4 sm: h-5 sm:w-5', 'icon')"
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
                </template>
              </span>
            </span>
          </a>
        </li>
        <li
          data-name="pagination-li"
          :class="renderClass('px-0.5 sm:px-3', 'li')"
          v-if="hasFirst"
        >
          <a
            data-name="pagination-anchor"
            :class="renderClass('', 'anchor')"
            href="#"
            @click.prevent="changePage(1)"
          >
            <span
              data-name="pagination-itemContainer"
              :class="
                renderClass(
                  'flex items-center justify-center rounded-full hover:opacity-80 sm:h-10 sm:w-10 h-8 w-8',
                  'itemContainer'
                )
              "
            >
              <span
                data-name="pagination-page"
                :class="renderClass('', 'page')"
              >
                1
              </span>
            </span>
          </a>
        </li>
        <li
          data-name="pagination-li"
          :class="renderClass('px-0.5 sm:px-3', 'li')"
          v-if="hasFirst"
        >
          ...
        </li>
        <li
          data-name="pagination-li"
          :class="renderClass('px-0.5 sm:px-3', 'li')"
          v-for="(page, index) in pages"
          :key="`page-${index}`"
        >
          <a
            data-name="pagination-anchor"
            :class="renderClass('', 'anchor')"
            href="#"
            @click.prevent="changePage(page)"
          >
            <template v-if="hasItemSlot"> </template>
            <template v-else>
              <span
                data-name="pagination-itemContainer"
                :class="
                  renderClass(
                    'flex items-center justify-center rounded-full hover:opacity-80  sm:h-10 sm:w-10 h-8 w-8',
                    'itemContainer',
                    { [`bg-${variant} text-white`]: modelValue === page }
                  )
                "
              >
                <template v-if="hasPageSlot">
                  <slot name="page"></slot>
                </template>
                <template v-else>
                  <span
                    data-name="pagination-page"
                    :class="renderClass('', 'page')"
                    >{{ page }}</span
                  >
                </template>
              </span>
            </template>
          </a>
        </li>
        <li
          data-name="pagination-li"
          :class="renderClass('px-0.5 sm:px-3', 'li')"
          v-if="hasLast"
        >
          ...
        </li>
        <li
          data-name="pagination-li"
          :class="renderClass('px-0.5 sm:px-3', 'li')"
          v-if="hasLast"
        >
          <a
            data-name="pagination-anchor"
            :class="renderClass('', 'anchor')"
            href="#"
            @click.prevent="changePage(totalPages)"
          >
            <span
              data-name="pagination-itemContainer"
              :class="
                renderClass(
                  'flex items-center justify-center rounded-full hover:opacity-80  sm:h-10 sm:w-10 h-8 w-8',
                  'itemContainer'
                )
              "
            >
              <span
                data-name="pagination-page"
                :class="renderClass('', 'page')"
              >
                {{ totalPages }}
              </span>
            </span>
          </a>
        </li>
        <li
          data-name="pagination-li"
          :class="renderClass('px-0.5 sm:px-3', 'li')"
          v-if="hasNext"
        >
          <a
            data-name="pagination-anchor"
            :class="renderClass('', 'anchor')"
            href="#"
            @click.prevent="changePage(nextPage)"
          >
            <span
              data-name="pagination-itemContainer"
              :class="
                renderClass(
                  'flex items-center justify-center rounded-full hover:opacity-80  sm:h-10 sm:w-10 h-8 w-8',
                  'itemContainer'
                )
              "
            >
              <span
                data-name="pagination-iconContainer"
                :class="renderClass('', 'iconContainer')"
              >
                <template v-if="hasNextSlot">
                  <slot name="next"></slot>
                </template>
                <template v-else>
                  <svg
                    data-name="pagination-icon"
                    :class="renderClass('w-4 h-4 sm: h-5 sm:w-5', 'icon')"
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
                </template>
              </span>
            </span>
          </a>
        </li>
      </ul>
    </section>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { variants } from "@/utility/css-helper";
import { useRenderClass } from "@/compositionFunctions/settings";
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
  setup(props, { emit, slots }) {
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
      const pages: number[] = [];
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
    const { renderClass } = useRenderClass("pagination");
    return {
      hasPrevSlot: !!slots.prev,
      hasNextSlot: !!slots.next,
      hasItemSlot: !!slots.item,
      hasPageSlot: !!slots.page,
      renderClass,
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
