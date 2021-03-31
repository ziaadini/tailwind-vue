<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Modal</h3>
    <p class="mb-2">Use modal plugin to add dialogs to your site for lightboxes, user notifications, or completely custom content</p>

    <div class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md">
      <h2 class="text-xl font-bold mb-2">Simple</h2>
      <p class="mb-2">Toggle a working modal demo by clicking the button below.</p>
      <t-modal max-size="lg" teleport-to="#modal-content" v-model="modal" :close-callback="modalCloseCallback">
        <p class="text-gray-800">
          Are you sure you want you delete your account? This action cannot be undone.
        </p>

        <div class="text-right mt-4">
          <button @click="modal = false" class="px-4 py-2 text-sm text-gray-600 focus:outline-none hover:underline">
            Cancel
          </button>
          <button class="mr-2 px-4 py-2 text-sm rounded text-white bg-red-500 focus:outline-none hover:bg-red-400">
            Delete
          </button>
        </div>
      </t-modal>
      <t-button @click="modal = true" class="mb-2" variant="primary">Open Modal</t-button>

      <iframe
        width="100%"
        height="300"
        src="//jsfiddle.net/mohstarsos1/uepzaqg0/2/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div class="mt-10 border rounded-sm p-3 w-full shadow-md">
      <article class="prose prose-xl text-left"><vue3-markdown-it :source="mdFile" /></article>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TButton from "@/components/tailwind/button/TButton.vue";
import TModal from "@/components/tailwind/modal/TModal.vue";

export default defineComponent({
  name: "App",
  components: {
    TButton,
    TModal,
  },
  setup() {
    return {};
  },
  data() {
    return {
      mdFile: "",
      modal: false,
    };
  },
  async mounted() {
    this.mdFile = await fetch("/tailwind/modal/README.md").then((res) => res.text());
  },
});
</script>

<style lang="scss" scoped></style>
