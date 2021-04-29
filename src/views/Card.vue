<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Card</h3>
    <p class="mb-2 text-left">
      The v-card component is a versatile component that can be used for
      anything from a panel to a static image. The card component has numerous
      helper components to make markup as easy as possible. Components that have
      no listed options use Vue’s functional component option for faster
      rendering and serve as markup sugar to make building easier.
    </p>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Simple</h2>
      <p class="mb-2">
        This component can be used for anything from a panel to a static image.
      </p>
      <t-card
        class="m-3"
        title="Card Title"
        description="card descriptions, card descriptions."
      />
      <iframe
        width="100%"
        height="150"
        src="//jsfiddle.net/mohstarsos1/ubxesvLj/2/embedded/html/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Rounded</h2>
      <p class="mb-2">
        This component can be used for rounded shape of card.
      </p>
      <t-card
        rounded
        class="m-3"
        title="Card Title"
        description="card descriptions, card descriptions."
      />
      <iframe
        width="100%"
        height="150"
        src="//jsfiddle.net/mohstarsos1/sk394q2r/1/embedded/html/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Without body Shadow</h2>
      <p class="mb-2">
        This component can be used for body without shadow.
      </p>
      <t-card
        no-shadow
        class="m-3"
        title="Card Title"
        description="card descriptions, card descriptions."
      />
      <iframe
        width="100%"
        height="150"
        src="//jsfiddle.net/mohstarsos1/msL4yb17/1/embedded/html/dark/"
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
import TCard from "@/components/tailwind/card/TCard.vue";

export default defineComponent({
  name: "App",
  components: {
    TCard
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
      "https://raw.githubusercontent.com/ziaadini/tailwind-vue/master/public/tailwind/card/README.md"
    ).then(res => res.text());
  }
});
</script>

<style lang="scss" scoped></style>
