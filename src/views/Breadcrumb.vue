<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">BreadCrumb</h3>
    <p class="mb-2">
      Indicate the current page’s location within a navigational hierarchy that
      automatically adds separators.
    </p>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Simple</h2>
      <p class="mb-2">Choose this basic bubreadcrumb.</p>
      <t-breadcrumb :items="items" class="mb-4" />
      <iframe
        width="100%"
        height="130"
        src="//jsfiddle.net/mohstarsos1/erushjzc/3/embedded/html,js/dark/"
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
import TBreadcrumb from "@/components/tailwind/breadcrumb/TBreadcrumb.vue";

export default defineComponent({
  name: "App",
  components: {
    TBreadcrumb
  },
  setup() {
    return {};
  },
  data() {
    return {
      mdFile: "",
      items: [
        {
          text: "Item1",
          url: "مقدار ۱"
        },
        {
          text: "Item2",
          url: "مقدار ۲"
        },
        {
          text: "Item3",
          url: "مقدار ۳",
          active: true
        }
      ]
    };
  },
  async mounted() {
    this.mdFile = await fetch(
      "https://raw.githubusercontent.com/ziaadini/tailwind-vue/master/public/tailwind/breadcrumb/README.md"
    ).then(res => res.text());
  }
});
</script>

<style lang="scss" scoped></style>
