<template>
  <div class="flex justify-center">
    <img alt="Vue logo" src="./assets/logo.png" />
  </div>
  <div class="flex items-center flex-col space-y-4">
    <div>
      <div>#Ali</div>
      <AppButton
        variant="warning"
        icon="accessible"
        outline
        disabled
        @click="clicked"
      >
        some text
      </AppButton>
    </div>
    <div>
      <div>#zia</div>
      <app-number-picker
        :max="5"
        v-model="numberPickerCount"
      ></app-number-picker>
      <div></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppNumberPicker from "@/components/AppNumberPicker.vue";
import AppButton from "@/components/AppButton.vue";
import { ref } from "vue";
export default defineComponent({
  name: "App",
  components: {
    AppNumberPicker,
    AppButton,
  },
  setup() {
    const numberPickerCount = ref(3);

    return { numberPickerCount };
  },
  methods: {
    clicked(): void {
      console.log("btn is clicked");
    },
  },
});
</script>
