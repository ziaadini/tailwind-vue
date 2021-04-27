<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Pagination</h3>
    <p class="mb-2">
      The t-pagination component is used to separate long sets of data so that
      it is easier for a user to consume information. Depending on the length
      provided, the pagination component will automatically scale.
    </p>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Simple</h2>
      <p class="mb-2">
        Pagination by default displays the number of pages based on the set
        length prop, with prev and next buttons surrounding to help you
        navigate.
      </p>
      <t-pagination
        class="mx-auto"
        v-model="pagination"
        :total-count="80"
        :per-page="5"
      ></t-pagination>
      <iframe
        width="100%"
        height="150"
        src="//jsfiddle.net/mohstarsos1/ujboes8n/2/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Variant Colors</h2>
      <p class="mb-2">
        The variant prop gives you an alternate background color style for
        pagination buttons.
      </p>
      <t-pagination
        variant="primary"
        class="mx-auto"
        v-model="pagination"
        :total-count="80"
        :per-page="5"
      ></t-pagination>
      <t-pagination
        variant="success"
        class="mx-auto"
        v-model="pagination"
        :total-count="80"
        :per-page="5"
      ></t-pagination>
      <t-pagination
        variant="warning"
        class="mx-auto"
        v-model="pagination"
        :total-count="80"
        :per-page="5"
      ></t-pagination>
      <t-pagination
        variant="danger"
        class="mx-auto"
        v-model="pagination"
        :total-count="80"
        :per-page="5"
      ></t-pagination>
      <iframe
        width="100%"
        height="200"
        src="//jsfiddle.net/mohstarsos1/qdco7mn8/1/embedded/html,js/dark/"
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
import TPagination from "@/components/tailwind/pagination/TPagination.vue";

export default defineComponent({
  name: "App",
  components: {
    TPagination
  },
  setup() {
    return {};
  },
  data() {
    return {
      mdFile: "",
      pagination: 1
    };
  },
  async mounted() {
    this.mdFile = await fetch("/tailwind/pagination/README.md").then(res =>
      res.text()
    );
  }
});
</script>

<style lang="scss" scoped></style>
