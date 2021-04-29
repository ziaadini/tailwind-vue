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
      <p class="mb-2">This is the simplest bottom sheet type.</p>
      <t-bottom-sheet teleport-to="#modal-content" v-model="btmSheet">
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </t-bottom-sheet>
      <t-button @click="btmSheet = true" variant="primary" class="mb-2"
        >Open Bottom Sheet</t-button
      >
      <iframe
        width="100%"
        height="200"
        src="//jsfiddle.net/mohstarsos1/7pstr9e0/1/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Title</h2>
      <p class="mb-2">This prop add a title to top of bottom sheet body.</p>
      <t-bottom-sheet
        title="This is a title"
        teleport-to="#modal-content"
        v-model="btmSheet2"
      >
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </t-bottom-sheet>
      <t-button @click="btmSheet2 = true" variant="primary" class="mb-2"
        >Open Bottom Sheet</t-button
      >
      <iframe
        width="100%"
        height="200"
        src="//jsfiddle.net/mohstarsos1/3a7tupeq/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Close Button</h2>
      <p class="mb-2">
        When this prop used, bottom sheet has not button for closed.
      </p>
      <t-bottom-sheet
        :hasCloseButton="false"
        teleport-to="#modal-content"
        v-model="btmSheet3"
      >
        <div>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </t-bottom-sheet>
      <t-button @click="btmSheet3 = true" variant="primary" class="mb-2"
        >Open Bottom Sheet</t-button
      >
      <iframe
        width="100%"
        height="200"
        src="//jsfiddle.net/mohstarsos1/w2fv6yp8/1/embedded/html,js/dark/"
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
      btmSheet2: false,
      btmSheet3: false
    };
  },
  async mounted() {
    this.mdFile = await fetch(
      "https://raw.githubusercontent.com/ziaadini/tailwind-vue/master/public/tailwind/bottomSheet/README.md"
    ).then(res => res.text());
  }
});
</script>

<style lang="scss" scoped></style>
