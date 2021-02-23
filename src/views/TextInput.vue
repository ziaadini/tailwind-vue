<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Text Input</h3>
    <p class="mb-2">Small filled buttons in different styles and colors can be used for call to actions in forms and more.</p>

    <div class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md">
      <h2 class="text-xl font-bold mb-2">Simple (Only Text)</h2>
      <p class="mb-2">Choose this basic button, only with text.</p>
      <t-button class="mb-2">Simple</t-button>
      <iframe width="100%" height="100" src="//jsfiddle.net/mohstarsos1/13xgw0ry/8/embedded/html/dark" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
    </div>

    <div class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md">
      <h2 class="text-xl font-bold mb-2">Simple (with ripple and variant colors)</h2>
      <p class="mb-2">Choose this basic button, with ripple and default variant colors.</p>
      <div class="mb-2 flex">
        <t-button variant="primary" ripple class="mr-2">Primary</t-button>
        <t-button variant="success" ripple class="mr-2">Success</t-button>
        <t-button variant="warning" ripple class="mr-2">Warning</t-button>
        <t-button variant="danger" ripple class="mr-2">Danger</t-button>
      </div>
      <iframe width="100%" height="160" src="//jsfiddle.net/mohstarsos1/c925pg8s/1/embedded/html/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
    </div>

    <div class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md">
      <h2 class="text-xl font-bold mb-2">Outline, rounded and disabled</h2>
      <p class="mb-2">Choose this basic button, with outline, rounded and disabled.</p>
      <div class="mb-2 flex">
        <t-button variant="primary" outline class="mr-2">Primary</t-button>
        <t-button variant="success" outline class="mr-2">Success</t-button>
        <t-button variant="warning" outline class="mr-2">Warning</t-button>
        <t-button variant="danger" outline class="mr-2">Danger</t-button>
      </div>
      <div class="mb-2 flex">
        <t-button variant="primary" rounded ripple class="mr-2">Primary</t-button>
        <t-button variant="success" rounded ripple class="mr-2">Success</t-button>
        <t-button variant="warning" rounded ripple class="mr-2">Warning</t-button>
        <t-button variant="danger" rounded ripple class="mr-2">Danger</t-button>
      </div>
      <div class="mb-2 flex">
        <t-button variant="primary" disabled class="mr-2">Primary</t-button>
        <t-button variant="success" disabled class="mr-2">Success</t-button>
        <t-button variant="warning" disabled class="mr-2">Warning</t-button>
        <t-button variant="danger" disabled class="mr-2">Danger</t-button>
      </div>
      <iframe width="100%" height="300" src="//jsfiddle.net/mohstarsos1/ftdboukw/4/embedded/html/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
    </div>

    <div class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md">
      <h2 class="text-xl font-bold mb-2">With icon and text or icon only</h2>
      <p class="mb-2">Choose this basic button, with icon and text or icon only.</p>
      <div class="mb-2 flex">
        <t-button variant="primary" icon="create" outline ripple class="mr-2">Outline</t-button>
        <t-button variant="primary" icon="verified_user" ripple class="mr-2">Primary</t-button>
        <t-button variant="success" icon="speed" rounded ripple class="mr-2">Success</t-button>
        <t-button variant="warning" icon="location_on" disabled class="mr-2">Warning</t-button>
        <t-button variant="danger" icon="delete_outline" ripple class="mr-2">Danger</t-button>
      </div>
      <div class="mb-2 flex">
        <t-button variant="primary" icon="create" outline ripple class="mr-2"></t-button>
        <t-button variant="primary" icon="verified_user" ripple class="mr-2"></t-button>
        <t-button variant="success" icon="speed" rounded ripple class="mr-2" fab></t-button>
        <t-button variant="warning" icon="location_on" disabled class="mr-2"></t-button>
        <t-button variant="danger" icon="delete_outline" ripple class="mr-2"></t-button>
      </div>
      <iframe width="100%" height="280" src="//jsfiddle.net/mohstarsos1/vek8fz1o/4/embedded/html/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
    </div>

    <div class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md">
      <h2 class="text-xl font-bold mb-2">Loading</h2>
      <p class="mb-2">Choose this basic button, with loading icon.</p>
      <div class="mb-2 flex">
        <t-button loading variant="primary" outline class="mr-2"></t-button>
        <t-button loading variant="primary" class="mr-2"></t-button>
        <t-button loading variant="success" rounded class="mr-2"></t-button>
        <t-button loading variant="warning" disabled class="mr-2"></t-button>
        <t-button loading variant="danger" class="mr-2"></t-button>
      </div>
      <iframe width="100%" height="160" src="//jsfiddle.net/mohstarsos1/45jfLc7k/1/embedded/html/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
    </div>

    <div class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md">
      <h2 class="text-xl font-bold mb-2">Block (full-width size)</h2>
      <p class="mb-2">Choose this basic button, with block full width of screen.</p>
      <div class="mb-2 w-full">
        <t-button variant="primary" full ripple class="mb-2">Primary</t-button>
        <t-button variant="success" full ripple class="mb-2">Success</t-button>
        <t-button variant="warning" full ripple class="mb-2">Warning</t-button>
        <t-button variant="danger" full ripple>Danger</t-button>
      </div>
      <iframe width="100%" height="150" src="//jsfiddle.net/mohstarsos1/ymr0czbf/1/embedded/html/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
    </div>

    <div class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md">
      <h2 class="text-xl font-bold mb-2">Size (full-Body size)</h2>
      <p class="mb-2">Choose this button, with three size include Medium(default), Large and Small.</p>
      <div class="mb-2 flex">
        <t-button variant="primary" size="small" ripple class="mr-2">Small</t-button>
        <t-button variant="success" ripple class="mr-2">Medium</t-button>
        <t-button variant="warning" size="large" ripple class="mr-2">Large</t-button>
      </div>
      <iframe width="100%" height="140" src="//jsfiddle.net/mohstarsos1/4egusLpa/1/embedded/html/dark/" allowfullscreen="allowfullscreen" allowpaymentrequest frameborder="0"></iframe>
    </div>

    <div class="mt-10 border rounded-sm p-3 w-full shadow-md">
      <article class="prose prose-xl text-left"><vue3-markdown-it :source="mdFile" /></article>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TButton from "@/components/tailwind/button/TButton.vue";

export default defineComponent({
  name: "App",
  components: {
    TButton,
  },
  setup() {
    return {};
  },
  data() {
    return {
      mdFile: "",
    };
  },
  async mounted() {
    this.mdFile = await fetch("/tailwind/button/README.md").then((res) => res.text());
  },
});
</script>

<style lang="scss" scoped></style>
