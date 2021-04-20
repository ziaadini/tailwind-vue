<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Number Picker</h3>
    <p class="mb-2">
      The Number Picker component allows you to select a number with two button
      (increase/decrease).
    </p>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Simple</h2>
      <p class="mb-2">
        This component only have a v-model and start at v-model number to
        infinity.
      </p>
      <t-number-picker
        v-model="numberPickerCount"
        class="mb-3"
      ></t-number-picker>
      <iframe
        width="100%"
        height="150"
        src="//jsfiddle.net/mohstarsos1/apuczdhL/1/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Min/Max range</h2>
      <p class="mb-2">
        With this type of component only select a number between min and max
        value of props.
      </p>
      <t-number-picker
        :min="5"
        :max="10"
        v-model="numberPickerCount2"
        class="mb-3"
      ></t-number-picker>
      <iframe
        width="100%"
        height="150"
        src="//jsfiddle.net/mohstarsos1/fnyw5tc0/2/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Loading</h2>
      <p class="mb-2">
        This prop active and show loading shape insted of number.
      </p>
      <t-number-picker
        loading
        v-model="numberPickerCount"
        class="mb-3"
      ></t-number-picker>
      <iframe
        width="100%"
        height="150"
        src="//jsfiddle.net/mohstarsos1/efgo4rmk/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Button and Loading Variant Colors</h2>
      <p class="mb-2">Choose this basic button, only with text.</p>
      <div class="flex">
        <div class="mr-32">
          <t-number-picker
            v-model="numberPickerCount"
            class="mb-3"
            :buttonProps="{ variant: 'primary' }"
          ></t-number-picker>
          <t-number-picker
            v-model="numberPickerCount"
            class="mb-3"
            :buttonProps="{ variant: 'success' }"
          ></t-number-picker>
          <t-number-picker
            v-model="numberPickerCount"
            class="mb-3"
            :buttonProps="{ variant: 'warning' }"
          ></t-number-picker>
          <t-number-picker
            v-model="numberPickerCount"
            class="mb-3"
            :buttonProps="{ variant: 'danger' }"
          ></t-number-picker>
        </div>
        <div>
          <t-number-picker
            v-model="numberPickerCount"
            class="mb-3"
            loading
            :loadingProps="{ variant: 'primary' }"
          ></t-number-picker>
          <t-number-picker
            v-model="numberPickerCount"
            class="mb-3"
            loading
            :loadingProps="{ variant: 'success' }"
          ></t-number-picker>
          <t-number-picker
            v-model="numberPickerCount"
            class="mb-3"
            loading
            :loadingProps="{ variant: 'warning' }"
          ></t-number-picker>
          <t-number-picker
            v-model="numberPickerCount"
            class="mb-3"
            loading
            :loadingProps="{ variant: 'danger' }"
          ></t-number-picker>
        </div>
      </div>

      <iframe
        width="100%"
        height="300"
        src="//jsfiddle.net/mohstarsos1/dbw3rLj0/1/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div class="mt-10 border rounded-sm p-3 w-full shadow-md">
      <article class="prose prose-xl text-left">
        <vue3-markdown-it :source="mdFile" />
      </article>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TNumberPicker from "@/components/tailwind/numberPicker/TNumberPicker.vue";

export default defineComponent({
  name: "App",
  components: {
    TNumberPicker
  },
  setup() {
    return {};
  },
  data() {
    return {
      mdFile: "",
      numberPickerCount: 1,
      numberPickerCount2: 5
    };
  },
  async mounted() {
    this.mdFile = await fetch("/tailwind/numberPicker/README.md").then(res =>
      res.text()
    );
  }
});
</script>

<style lang="scss" scoped></style>
