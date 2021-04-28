<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Number Transformer</h3>
    <p class="mb-2">
      Transform the number with stepper animation from start to end point.
    </p>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Simple</h2>
      <p class="mb-2">Set the number and change it.</p>
      <div class="flex items-center mb-3">
        <t-number-transformer
          :number="number"
          class="mr-4 w-40 font-bold"
        ></t-number-transformer>
        <t-button @click="number = 1000" variant="success" size="sm"
          >Transform</t-button
        ><t-button @click="number = 0" variant="warning" size="sm" class="ml-2"
          >Reset</t-button
        >
      </div>
      <iframe
        width="100%"
        height="150"
        src="//jsfiddle.net/mohstarsos1/sgjna6ev/2/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Duration</h2>
      <p class="mb-2">
        With use this prop you can define time to operate number transformation.
        (example: 2Sec)
      </p>
      <div class="flex items-center mb-3">
        <t-number-transformer
          :number="number2"
          class="mr-4 w-40 font-bold"
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
        height="150"
        src="//jsfiddle.net/mohstarsos1/0tu745L6/1/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Step</h2>
      <p class="mb-2">
        This prop define step to transformation. (example: each 10 from 0 to
        100)
      </p>
      <div class="flex items-center mb-3">
        <t-number-transformer
          :step="10"
          :number="number3"
          class="mr-4 w-40 font-bold"
          :maxDuration="2000"
        ></t-number-transformer>
        <t-button @click="number3 = 100" variant="success" size="sm"
          >Transform</t-button
        ><t-button @click="number3 = 0" variant="warning" size="sm" class="ml-2"
          >Reset</t-button
        >
      </div>

      <iframe
        width="100%"
        height="150"
        src="//jsfiddle.net/mohstarsos1/9tpmuxbn/embedded/html,js/dark/"
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
