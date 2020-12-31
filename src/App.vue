<template>
  <div class="flex justify-center">
    <img alt="Vue logo" src="./assets/logo.png" />
  </div>
  <div class="flex items-center flex-col space-y-4">
    <div>
      <div>#Ali</div>
      <t-button variant="danger" icon="accessible" disabled>
        some text
      </t-button>
    </div>
    <div>
      <div>#zia</div>
      <t-number-picker
        :max="5"
        v-model="numberPickerCount"
      ></t-number-picker>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ref } from "vue";
import TButton from "@/components/TButton.vue";
import TNumberPicker from "@/components/numberPicker/TNumberPicker.vue";
export default defineComponent({
  name: "App",
  components: {
    TNumberPicker,
    TButton
  },
  setup() {
    const numberPickerCount = ref(3);

    return { numberPickerCount };
  }
});
</script>
