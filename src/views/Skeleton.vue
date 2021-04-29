<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Skeleton</h3>
    <p class="mb-2">
      The t-skeleton component is a versatile tool that can fill many roles
      within a project. At its heart, the component provides an indication to
      the user that something is coming but not yet available.
    </p>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">
        Simple (default type: 'avatar-list')
      </h2>
      <p class="mb-2">
        The t-skeleton component provides a user with a visual indicator that
        content is coming / loading.
      </p>
      <div class="w-1/3 mb-3"><t-skeleton></t-skeleton></div>

      <iframe
        width="100%"
        height="100"
        src="//jsfiddle.net/mohstarsos1/tz2cnrqp/embedded/html/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Various Types</h2>
      <p class="mb-2">
        The t-skeleton can be used as boilerplate designs when creating mockups.
        Mix and match various pre-defined types to create your own unique
        implementations.
      </p>
      <div class="w-1/3 mb-12 text-left">
        Avatar List:<t-skeleton type="avatar-list"></t-skeleton>
      </div>
      <div class="w-1/3 mb-12 text-left">
        Card:<t-skeleton type="card"></t-skeleton>
      </div>
      <div class="w-1/3 mb-12 text-left">
        Image:<t-skeleton type="image"></t-skeleton>
      </div>
      <div class="w-1/3 mb-12 text-left">
        One Line:<t-skeleton type="one-line"></t-skeleton>
      </div>
      <div class="w-1/3 mb-12 text-left">
        Three Line:<t-skeleton type="three-line"></t-skeleton>
      </div>

      <iframe
        width="100%"
        height="180"
        src="//jsfiddle.net/mohstarsos1/u1vgjne4/1/embedded/html/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Shadow and Border</h2>
      <p class="mb-2">You can remove border and shadow form types.</p>
      <div class="w-1/3 mb-12  text-left ">
        Without Shadow:
        <t-skeleton :shadow="false"></t-skeleton>
      </div>
      <div class="w-1/3 mb-12  text-left">
        Without Border:
        <t-skeleton :border="false"></t-skeleton>
      </div>
      <div class="w-1/3 mb-12  text-left">
        Without Border and Shadow
        <t-skeleton :border="false" :shadow="false"></t-skeleton>
      </div>
      <iframe
        width="100%"
        height="150"
        src="//jsfiddle.net/mohstarsos1/5whouzb6/embedded/html/dark/"
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
import TSkeleton from "@/components/tailwind/skeleton/TSkeleton.vue";

export default defineComponent({
  name: "App",
  components: {
    TSkeleton
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
    this.mdFile = await fetch(
      "https://raw.githubusercontent.com/ziaadini/tailwind-vue/master/public/tailwind/skeleton/README.md"
    ).then(res => res.text());
  }
});
</script>

<style lang="scss" scoped></style>
