<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Bottom Sheet</h3>
    <p class="mb-2">
      The bottom sheet is a modified dialog that slides from the bottom of the
      screen. a bottom sheet can contain anything.
    </p>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Simple</h2>
      <p class="mb-2">Choose this basic button, only with text.</p>
      <t-bottom-sheet teleport-to="#modal-content" v-model="btmSheet">
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </t-bottom-sheet>
      <t-button @click="btmSheet = true" class="mb-2">Simple</t-button>
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
      <h2 class="text-xl font-bold mb-2">Title and Close Button</h2>
      <p class="mb-2">Choose this basic button, only with text.</p>
      <t-bottom-sheet
        :hasCloseButton="false"
        teleport-to="#modal-content"
        v-model="btmSheet2"
      >
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </t-bottom-sheet>
      <t-button @click="btmSheet2 = true" class="mb-2">Simple</t-button>
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
import TButton from "@/components/tailwind/button/TButton.vue";
import TBottomSheet from "@/components/tailwind/bottomSheet/TBottomSheet.vue";

export default defineComponent({
  name: "App",
  components: {
    TButton,
    TBottomSheet
  },
  setup() {
    return {};
  },
  data() {
    return {
      mdFile: "",
      btmSheet: false,
      btmSheet2: false
    };
  },
  async mounted() {
    this.mdFile = await fetch("/tailwind/bottomSheet/README.md").then(res =>
      res.text()
    );
  }
});
</script>

<style lang="scss" scoped></style>
