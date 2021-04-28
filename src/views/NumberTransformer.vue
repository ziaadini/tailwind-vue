<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Number Transformer</h3>
    <p class="mb-2">
      Small filled buttons in different styles and colors can be used for call
      to actions in forms and more.
    </p>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Simple</h2>
      <p class="mb-2">Choose this basic button, only with text.</p>
      <div class="flex items-center mb-3">
        <t-number-transformer
          :number="number"
          class="mr-4 w-40"
        ></t-number-transformer>
        <t-button @click="number = 1000" variant="success" size="sm"
          >Transform</t-button
        ><t-button @click="number = 0" variant="warning" size="sm" class="ml-2"
          >Reset</t-button
        >
      </div>

      <iframe
        width="100%"
        height="100"
        src="//jsfiddle.net/mohstarsos1/13xgw0ry/8/embedded/html/dark"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Duration</h2>
      <p class="mb-2">Choose this basic button, only with text.</p>
      <div class="flex items-center mb-3">
        <t-number-transformer
          :number="number2"
          class="mr-4 w-40"
          :maxDuration="2000"
        ></t-number-transformer>
        <t-button @click="number2 = 1000" variant="success" size="sm"
          >Transform</t-button
        ><t-button @click="number2 = 0" variant="warning" size="sm" class="ml-2"
          >Reset</t-button
        >
      </div>

      <iframe
        width="100%"
        height="100"
        src="//jsfiddle.net/mohstarsos1/13xgw0ry/8/embedded/html/dark"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Step</h2>
      <p class="mb-2">Choose this basic button, only with text.</p>
      <div class="flex items-center mb-3">
        <t-number-transformer
          :step="100000"
          :number="number3"
          class="mr-4 w-40"
          :maxDuration="2000"
        ></t-number-transformer>
        <t-button @click="number3 = 1000000" variant="success" size="sm"
          >Transform</t-button
        ><t-button @click="number3 = 0" variant="warning" size="sm" class="ml-2"
          >Reset</t-button
        >
      </div>

      <iframe
        width="100%"
        height="100"
        src="//jsfiddle.net/mohstarsos1/13xgw0ry/8/embedded/html/dark"
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
import TNumberTransformer from "@/components/tailwind/numberTransformer/TNumberTransformer.vue";
import TButton from "@/components/tailwind/button/TButton.vue";

export default defineComponent({
  name: "App",
  components: {
    TNumberTransformer,
    TButton
  },
  setup() {
    return {};
  },
  data() {
    return {
      mdFile: "",
      number: 0,
      number2: 0,
      number3: 0
    };
  },
  async mounted() {
    this.mdFile = await fetch(
      "/tailwind/numberTransformer/README.md"
    ).then(res => res.text());
  }
});
</script>

<style lang="scss" scoped></style>
