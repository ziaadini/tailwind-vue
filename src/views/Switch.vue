<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Switch</h3>
    <p class="mb-2">
      Small filled buttons in different styles and colors can be used for call
      to actions in forms and more.
    </p>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Simple (Only Text)</h2>
      <p class="mb-2">Choose this basic button, only with text.</p>
      <t-switch
        v-model="switchModel"
        :true-value="1"
        :false-value="0"
        label="Switch"
      ></t-switch>
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
import TSwitch from "@/components/tailwind/switch/TSwitch.vue";

export default defineComponent({
  name: "App",
  components: {
    TSwitch
  },
  setup() {
    return {};
  },
  data() {
    return {
      mdFile: "",
      switchModel: ""
    };
  },
  async mounted() {
    this.mdFile = await fetch("/tailwind/switch/README.md").then(res =>
      res.text()
    );
  }
});
</script>

<style lang="scss" scoped></style>
