<template>
  <div class="flex justify-center">
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  </div>
  <div class="flex items-center flex-col space-y-4">
    <div>
      <p>ripple effect</p>
      <t-button variant="warning" icon="accessible" ripple>
        some text
      </t-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ref } from "vue";
import TButton from "@/components/tailwind/button/TButton.vue";
export default defineComponent({
  name: "App",
  components: {
    TButton
  },
  setup() {
    const numberPickerCount = ref<number>(3);
    const modal = ref<boolean>(false);
    const modalCloseCallback = () => {
      console.log("modal has been closed");
      return true;
    };
    return { numberPickerCount, modal, modalCloseCallback };
  }
});
</script>
