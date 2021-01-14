<template>
  <div class="flex justify-center flex-wrap space-x-1 space-x-reverse">
    <t-button variant="primary">Test</t-button>
    <t-button ripple variant="warning">Test</t-button>
    <t-button rounded variant="danger">Test</t-button>
    <t-button rounded variant="success">Test</t-button>
  </div>
  <br />
  <div class="flex justify-center flex-wrap space-x-1 space-x-reverse">
    <t-button outline variant="primary">Test</t-button>
    <t-button outline ripple variant="warning">Test</t-button>
    <t-button rounded outline variant="danger">Test</t-button>
    <t-button rounded outline variant="success">Test</t-button>
  </div>
  <br />
  <div class="flex justify-center flex-wrap space-x-1 space-x-reverse">
    <t-button loading variant="primary">Test</t-button>
    <t-button loading ripple variant="warning">Test</t-button>
    <t-button loading rounded variant="danger">Test</t-button>
    <t-button loading rounded variant="success">Test</t-button>
  </div>
  <br />
  <div class="flex justify-center flex-wrap space-x-1 space-x-reverse">
    <t-button loading outline variant="primary">Test</t-button>
    <t-button loading outline ripple variant="warning">Test</t-button>
    <t-button loading rounded outline variant="danger">Test</t-button>
    <t-button loading rounded outline variant="success">Test</t-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ref } from "vue";
import TButton from "@/components/tailwind/button/TButton.vue";
export default defineComponent({
  name: "App",
  components: {
    TButton,
  },
  setup() {
    const numberPickerCount = ref<number>(3);
    const modal = ref<boolean>(false);
    const modalCloseCallback = () => {
      console.log("modal has been closed");
      return true;
    };
    return { numberPickerCount, modal, modalCloseCallback };
  },
});
</script>
