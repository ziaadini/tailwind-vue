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
            <template v-if="hasItemSlot">
              <slot name="item" :value="1"></slot>
            </template>
            <template v-else>
              <span
                data-name="pagination-itemContainer"
                :class="
                  renderClass(
                    'flex items-center justify-center rounded-full hover:opacity-80 sm:h-10 sm:w-10 h-8 w-8',
                    'itemContainer'
                  )
                "
              >
                <template v-if="hasPageSlot">
                  <slot name="page" :value="1"></slot>
                </template>
                <template v-else>
                  <span
                    data-name="pagination-page"
                    :class="renderClass('', 'page')"
                  >
                    1
                  </span>
                </template>
              </span>
            </template>
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
          <component
            data-name="pagination-anchor"
            :is="is"
            v-bind="dynamicBinding(page)"
            :class="renderClass('cursor-pointer', 'anchor')"
            @[eventPrevent].prevent="changePage(page)"
          >
            <!--            v-bind="dynamicBind"-->
            <!--            href="#"-->
            <template v-if="hasItemSlot">
              <slot
                name="item"
                :value="page"
                :activeValue="getModelValue"
              ></slot>
            </template>
            <template v-else>
              <span
                data-name="pagination-itemContainer"
                :class="
                  renderClass(
                    'flex items-center justify-center rounded-full hover:opacity-80  sm:h-10 sm:w-10 h-8 w-8',
                    'itemContainer',
                    { [`${getColorClass} text-white`]: getModelValue === page }
                  )
                "
              >
                <template v-if="hasPageSlot">
                  <slot
                    name="page"
                    :value="page"
                    :activeValue="getModelValue"
                  ></slot>
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
          </component>
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
            <template v-if="hasItemSlot">
              <slot name="item" :value="totalPages"></slot>
            </template>
            <template v-else>
              <span
                data-name="pagination-itemContainer"
                :class="
                  renderClass(
                    'flex items-center justify-center rounded-full hover:opacity-80  sm:h-10 sm:w-10 h-8 w-8',
                    'itemContainer'
                  )
                "
              >
                <template v-if="hasPageSlot">
                  <slot name="page" :value="totalPages"></slot>
                </template>
                <template v-else>
                  <span
                    data-name="pagination-page"
                    :class="renderClass('', 'page')"
                  >
                    {{ totalPages }}
                  </span>
                </template>
              </span>
            </template>
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
import { computed, defineComponent, inject } from "vue";
import { variants } from "@/utility/css-helper";
import { useRenderClass } from "@/compositionFunctions/settings";
import { useRoute, useRouter } from "vue-router";
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
      default: () => inject("t-pagination-perPage", 20)
    },
    pageRange: {
      type: Number,
      default: () => inject("t-pagination-pageRange", 2)
    },
    variant: {
      type: String,
      default: () => inject("t-pagination-variant", "primary"),
      validator: (propValue: string) => {
        return !!variants[propValue];
      }
    },
    colorClass: {
      type: String,
      default: () => inject("t-pagination-colorClass", "")
    },
    nuxt: {
      type: Boolean,
      default: () => inject("t-pagination-nuxt", false)
    },
    vue: {
      type: Boolean,
      default: () => inject("t-pagination-vue", false)
    },
    queryName: {
      type: String,
      default: () => inject("t-pagination-queryName", "page")
    },
    appendQuery: {
      type: Boolean,
      default: () => inject("t-pagination-appendQuery", true)
    },
    formName: {
      type: String,
      default: () => inject("t-pagination-formName", "")
    }
  },
  setup(props, { emit, slots }) {
    const route = useRoute();
    const getModelValue = computed((): number => {
      if (props.nuxt || props.vue) {
        if (route.query[props.queryName]) {
          if (props.formName) {
            return +route.query[props.formName]?.[props.queryName] || 1;
          } else {
            return +route.query[props.queryName]!;
          }
        } else {
          return 1;
        }
      }
      return props.modelValue;
    });
    const totalPages = computed(() => {
      return Math.ceil(props.totalCount / props.perPage);
    });
    const rangeStart = computed(() => {
      const start = getModelValue.value - props.pageRange;
      return start > 0 ? start : 1;
    });
    const rangeEnd = computed(() => {
      const end = getModelValue.value + props.pageRange;
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
    const hasPrev = computed(() => getModelValue.value > 1);
    const hasNext = computed(() => getModelValue.value < totalPages.value);

    const nextPage = computed(() => getModelValue.value + 1);
    const prevPage = computed(() => getModelValue.value - 1);
    const dynamicBinding = computed(() => page => {
      if (props.nuxt || props.vue) {
        const append = props.appendQuery ? route.query : {};
        const pageQuery = props.formName
          ? { [props.formName]: { [props.queryName]: page } }
          : { [props.queryName]: page };
        return {
          to: {
            query: {
              ...append,
              ...pageQuery
            }
          }
        };
      }
      return { href: "#" };
    });
    const router = useRouter();
    const changePage = page => {
      if (page > 0 && page <= totalPages.value) {
        emit("update:modelValue", page);
      }
      const link = dynamicBinding.value(page);
      if (link.to) {
        router.push(link.to);
      }
    };
    const getColorClass = computed(() => {
      if (props.colorClass) {
        return props.colorClass;
      }
      return `bg-${props.variant}`;
    });
    const is = computed(() => {
      if (props.nuxt) {
        return "nuxt-link";
      } else if (props.vue) {
        return "router-link";
      }
      return "a";
    });
    const { renderClass } = useRenderClass("pagination");
    return {
      hasPrevSlot: !!slots.prev,
      hasNextSlot: !!slots.next,
      hasItemSlot: !!slots.item,
      hasPageSlot: !!slots.page,
      getModelValue,
      is,
      dynamicBinding,
      eventPrevent: props.nuxt || props.vue ? null : "click",
      getColorClass,
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
