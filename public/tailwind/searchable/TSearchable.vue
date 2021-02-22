<template>
  <t-dropdown
    v-model="model"
    variant="white"
    :divide="false"
    v-model:opened="isOpenMenu"
    :search-key="localSearch ? search : ''"
    v-bind="$attrs"
  >
    <template #prepend="{hasItem}">
      <div class="p-2">
        <t-text-input
          ref="inputRef"
          autocomplete="off"
          v-model="search"
        ></t-text-input>
        <div v-if="!localSearch" :class="{ hidden: !isLoading }">
          <t-loading
            class="mt-2"
            color-class="bg-gray-400"
            size="sm"
            variant="primary"
          ></t-loading>
        </div>
        <div class="mt-2" v-if="showEmptyBox && !hasItem">
          {{ noResult }}
        </div>
      </div>
    </template>
    <template #label="{item}">
      <div class="text-right px-2">{{ item.label }}</div>
    </template>
  </t-dropdown>
</template>

<script lang="ts">
import { ref, defineComponent, watch, watchEffect } from "vue";
import TDropdown from "@/components/tailwind/dropdown/TDropdown.vue";
import TTextInput from "@/components/tailwind/text-input/TTextInput.vue";
import TLoading from "@/components/tailwind/loading/TLoading.vue";
import { useDebouncedRef } from "@/compositionFunctions/expose/debounce";
export default defineComponent({
  name: "TSearchable",
  components: { TLoading, TTextInput, TDropdown },
  props: {
    localSearch: {
      type: Boolean,
      default: () => true
    },
    modelValue: {
      type: [String, Number]
    },
    noResult: {
      type: String,
      default: "no result found"
    },
    delay: {
      type: Number,
      default: 200
    }
  },
  setup(props, { emit }) {
    const search = props.localSearch
      ? ref("")
      : useDebouncedRef("", props.delay);
    const model = ref(props.modelValue);
    const isLoading = ref<number | boolean>(false);
    const isOpenMenu = ref(false);
    const inputRef = ref<any>(null);
    watchEffect(() => {
      emit("update:modelValue", model.value);
    });
    watch(
      () => isOpenMenu.value,
      () => {
        if (isOpenMenu.value && inputRef.value) {
          inputRef.value.input.focus();
        } else if (!isOpenMenu.value) {
          search.value = "";
        }
      }
    );
    watch(
      () => search.value,
      () => {
        const setLoading = value => {
          isLoading.value = value;
        };
        if (isOpenMenu.value) {
          emit("search", { search: search.value, setLoading });
        }
      }
    );
    const showEmptyBox = ref<boolean>(false);
    watchEffect(() => {
      showEmptyBox.value = !!(
        search.value !== "" &&
        props.noResult &&
        !isLoading.value
      );
    });
    return { search, model, isOpenMenu, inputRef, isLoading, showEmptyBox };
  }
});
</script>

<style scoped></style>
