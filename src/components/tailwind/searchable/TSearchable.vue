<template>
  <div class="my-5">
    <t-dropdown
      v-model:item="model"
      :search-key="search"
      placeholder="select..."
      :items="[
        { label: 'zia', value: 'zzz' },
        { label: 'ali', value: 'aaa' }
      ]"
    >
      <template #header="{selectedText,triggerMenu}">
        <div @click="triggerMenu(true)">
          {{ selectedText }}
          {{ model }}
        </div>
        <t-text-input
          @click="triggerMenu(true)"
          v-model="search"
        ></t-text-input>
      </template>
    </t-dropdown>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, watch, reactive, watchEffect } from "vue";
import TDropdown from "@/components/tailwind/dropdown/TDropdown.vue";
import TTextInput from "@/components/tailwind/text-input/TTextInput.vue";
export default defineComponent({
  name: "TSearchable",
  components: { TTextInput, TDropdown },
  props: {
    localSearch: {
      type: Boolean,
      default: () => true
    }
  },
  setup(props) {
    const search = ref("");
    const model = reactive({ label: "", value: "" });
    watch(
      () => model.value,
      () => {
        console.log("modelValue", model.value);
        search.value = model.label + " ";
      }
    );
    watch(
      () => search.value,
      (value, oldValue) => {
        if (value === model.value && oldValue.trim() === model.value) {
          search.value = "";
        }
      }
    );

    return { search, model };
  }
});
</script>

<style scoped></style>
