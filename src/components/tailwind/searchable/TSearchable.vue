<template>
  <div class="my-5">
    <t-dropdown
      v-model="model"
      variant="white"
      :divide="false"
      v-model:opened="isOpenMenu"
      :search-key="localSearch ? search : ''"
      placeholder="select..."
      :items="[
        { label: 'zia', value: 'zzz' },
        { label: 'ali', value: 'aaa' }
      ]"
    >
      <template #prepend="{hasItem}">
        <div class="p-2">
          <t-text-input
            ref="inputRef"
            autocomplete="off"
            v-model="search"
          ></t-text-input>
          <t-fade :show="isLoading">
            <t-loading
              class="mt-2"
              color-class="bg-gray-400"
              size="sm"
              variant="primary"
            ></t-loading>
          </t-fade>
          <div class="mt-2" v-if="noResult && !hasItem && search !== ''">
            {{ noResult }}
          </div>
        </div>
      </template>
      <template #label="{item}">
        <div class="text-right px-2">{{ item.label }}</div>
      </template>
    </t-dropdown>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, watch } from "vue";
import TDropdown from "@/components/tailwind/dropdown/TDropdown.vue";
import TTextInput from "@/components/tailwind/text-input/TTextInput.vue";
import TLoading from "@/components/tailwind/loading/TLoading.vue";
import TFade from "@/components/tailwind/fade/TFade.vue";
import postcss from "postcss";
import comma = postcss.list.comma;
export default defineComponent({
  name: "TSearchable",
  components: { TFade, TLoading, TTextInput, TDropdown },
  props: {
    localSearch: {
      type: Boolean,
      default: () => true
    },
    noResult: {
      type: String,
      default: "no result found"
    }
  },
  setup(props, { emit }) {
    const search = ref("");
    const model = ref("");
    const isLoading = ref(false);
    const isOpenMenu = ref(false);
    const inputRef = ref<any>(null);
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
        emit("search", { search: search.value, setLoading });
      }
    );

    return { search, model, isOpenMenu, inputRef, isLoading };
  }
});
</script>

<style scoped></style>
