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
      <TTextInput placeholder="some placeholder" class="mb-3" />
      <iframe
        width="100%"
        height="100"
        src="//jsfiddle.net/mohstarsos1/hqsLy3bd/4/embedded/html/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">
        With Placeholder and icon
      </h2>
      <p class="mb-2">
        Choose this basic text input, with Placeholder and icon. (you can change
        alignment of icon)
      </p>
      <div class="mb-2 flex">
        <TTextInput placeholder="some placeholder" right-icon="bookmarks" />
      </div>
      <div class="mb-2 flex">
        <TTextInput placeholder="some placeholder" left-icon="bookmarks" />
      </div>
      <div class="mb-2 flex">
        <TTextInput
          placeholder="some placeholder"
          right-icon="bookmarks"
          left-icon="speed"
        />
      </div>
      <iframe
        width="100%"
        height="160"
        src="//jsfiddle.net/mohstarsos1/2neghr0j/4/embedded/html/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">
        Varient color and disabled
      </h2>
      <p class="mb-2">
        Choose this text input, with default variant colors and disabled mode.
      </p>
      <div class="mb-2 flex">
        <TTextInput placeholder="some placeholder" variant="white" />
      </div>
      <div class="mb-2 flex">
        <TTextInput placeholder="some placeholder" variant="primary" />
      </div>
      <div class="mb-2 flex">
        <TTextInput placeholder="some placeholder" variant="success" />
      </div>
      <div class="mb-2 flex">
        <TTextInput placeholder="some placeholder" variant="warning" />
      </div>
      <div class="mb-2 flex">
        <TTextInput placeholder="some placeholder" variant="danger" />
      </div>
      <div class="mb-2 flex">
        <TTextInput
          placeholder="some test placeholder"
          variant="success"
          disabled
        />
      </div>
      <iframe
        width="100%"
        height="200"
        src="//jsfiddle.net/mohstarsos1/m4wnxfhq/4/embedded/html/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">
        Rounded, Hover style and error handle border color
      </h2>
      <p class="mb-2">
        Choose this text input, with Rounded, Hover style and error handle
        border color.
      </p>
      <div class="mb-2 flex">
        <TTextInput placeholder="some placeholder" rounded />
      </div>
      <div class="mb-2 flex">
        <TTextInput placeholder="some placeholder" variant="success" hover />
      </div>
      <div class="mb-2 flex">
        <TTextInput placeholder="some placeholder" error />
      </div>
      <iframe
        width="100%"
        height="150"
        src="//jsfiddle.net/mohstarsos1/hcf4eL6s/1/embedded/html/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">
        Text area
      </h2>
      <p class="mb-2">
        Choose this text input as Textarea.
      </p>
      <div class="mb-2 flex">
        <TTextInput placeholder="some placeholder" area />
      </div>
      <iframe
        width="100%"
        height="100"
        src="//jsfiddle.net/mohstarsos1/56bxz90e/1/embedded/html/dark/"
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
    TTextInput
  },
  setup() {
    return {};
  },
  data() {
    return {
      mdFile: "",
      myNumber: 0
    };
  },
  async mounted() {
    this.mdFile = await fetch("/tailwind/text-input/README.md").then(res =>
      res.text()
    );
  }
});
</script>

<style lang="scss" scoped></style>
