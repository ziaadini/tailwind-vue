<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Loading</h3>
    <p class="mb-2">
      Indicate the loading state of a component or page with loading.
    </p>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Simple</h2>
      <p class="mb-2">
        Choose this basic loading to show the loading state in your projects.
      </p>
      <t-loading class="mb-3"></t-loading>
      <iframe
        width="100%"
        height="100"
        src="//jsfiddle.net/mohstarsos1/ywx5v6kn/embedded/html/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Type</h2>
      <p class="mb-2">
        with this prop you can select spinner or default type of loading
        component.
      </p>
      <t-loading class="mb-3"></t-loading>
      <t-loading type="spinner" class="mb-3"></t-loading>
      <iframe
        width="100%"
        height="110"
        src="//jsfiddle.net/mohstarsos1/wnk7pxae/embedded/html/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Size</h2>
      <p class="mb-2">You can select three level size contain sm, md and lg.</p>
      <t-loading size="sm" class="mb-3"></t-loading>
      <t-loading size="md" class="mb-3"></t-loading>
      <t-loading size="lg" class="mb-3"></t-loading>
      <t-loading size="sm" type="spinner" class="mb-3"></t-loading>
      <t-loading size="md" type="spinner" class="mb-3"></t-loading>
      <t-loading size="lg" type="spinner" class="mb-3"></t-loading>
      <iframe
        width="100%"
        height="200"
        src="//jsfiddle.net/mohstarsos1/wvgo6dn7/embedded/html/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Variant Colors</h2>
      <p class="mb-2">With This prop set default variant colors for loading.</p>
      <t-loading variant="primary" class="mb-3"></t-loading>
      <t-loading variant="success" class="mb-3"></t-loading>
      <t-loading variant="warning" class="mb-3"></t-loading>
      <t-loading variant="danger" class="mb-3"></t-loading>
      <t-loading variant="primary" type="spinner" class="mb-3"></t-loading>
      <t-loading variant="success" type="spinner" class="mb-3"></t-loading>
      <t-loading variant="warning" type="spinner" class="mb-3"></t-loading>
      <t-loading variant="danger" type="spinner" class="mb-3"></t-loading>
      <iframe
        width="100%"
        height="220"
        src="//jsfiddle.net/mohstarsos1/3fnxv8bg/1/embedded/html/dark/"
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
import TLoading from "@/components/tailwind/loading/TLoading.vue";

export default defineComponent({
  name: "App",
  components: {
    TLoading
  },
  setup() {
    return {};
  },
  data() {
    return {
      mdFile: ""
    };
  },
  async mounted() {
    this.mdFile = await fetch("/tailwind/loading/README.md").then(res =>
      res.text()
    );
  }
});
</script>

<style lang="scss" scoped></style>
