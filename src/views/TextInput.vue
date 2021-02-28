<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Text Input</h3>
    <p class="mb-2">
      Text input components are used for collecting user provided information.
    </p>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">
        Simple (Only Text Input with Placeholder)
      </h2>
      <p class="mb-2">Choose this basic text input, only with placeholder.</p>
      <TTextInput placeholder="some placeholder" variant="white" class="mb-3" />
      <iframe
        width="100%"
        height="100"
        src="//jsfiddle.net/mohstarsos1/hqsLy3bd/2/embedded/html/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">
        Simple (with ripple and variant colors)
      </h2>
      <p class="mb-2">
        Choose this basic button, with ripple and default variant colors.
      </p>
      <div class="mb-2 flex">
        <TTextInput
          placeholder="some test placeholder"
          v-model.format:,:4="myNumber"
          inputType="numeric"
          variant="primary"
          right-icon="bookmarks"
        />
      </div>
      <iframe
        width="100%"
        height="160"
        src="//jsfiddle.net/mohstarsos1/c925pg8s/1/embedded/html/dark/"
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
import TTextInput from "@/components/tailwind/text-input/TTextInput.vue";

export default defineComponent({
  name: "App",
  components: {
    TTextInput,
  },
  setup() {
    return {};
  },
  data() {
    return {
      mdFile: "",
      myNumber: 0,
    };
  },
  async mounted() {
    this.mdFile = await fetch("/tailwind/text-input/README.md").then((res) =>
      res.text()
    );
  },
});
</script>

<style lang="scss" scoped></style>
