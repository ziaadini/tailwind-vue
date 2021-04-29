<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Accordion</h3>
    <p class="mb-2">
      The v-expansion-panel component is useful for reducing vertical space with
      large amounts of information. The default functionality of the component
      is to only display one expansion-panel body at a time.
    </p>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Simple</h2>
      <p class="mb-2">
        Expansion panels in their simplest form display a list of expandable
        items.
      </p>
      <div class="text-left">
        <t-accordion :items="accordionItems"></t-accordion>
      </div>

      <iframe
        width="100%"
        height="200"
        src="//jsfiddle.net/mohstarsos1/9mfw2vnq/3/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Default Selected</h2>
      <p class="mb-2">
        This feature used for select and expand item to view.
      </p>
      <div class="text-left">
        <t-accordion :items="accordionItems2"></t-accordion>
      </div>

      <iframe
        width="100%"
        height="200"
        src="//jsfiddle.net/mohstarsos1/kfyheg1m/2/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">With custom Title and Appearance</h2>
      <p class="mb-2">
        This feature used for custom title and appearance items.
      </p>
      <div class="text-left">
        <t-accordion :items="accordionItems3">
          <template #title="{title,show}">
            <div class="cursor-pointer" :class="{ 'text-danger-500': show }">
              {{ title }}
            </div>
          </template>
          <template #text="{text}">
            <div class="text-danger">{{ text }}</div>
          </template>
        </t-accordion>
      </div>

      <iframe
        width="100%"
        height="300"
        src="//jsfiddle.net/mohstarsos1/dfh6pvyL/2/embedded/html,js/dark/"
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
import TAccordion from "@/components/tailwind/accoirdion/TAccordion.vue";

export default defineComponent({
  name: "App",
  components: {
    TAccordion
  },
  setup() {
    return {};
  },
  data() {
    return {
      mdFile: "",
      accordionItems: [
        {
          title: "Click here to expand",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
          title: "Click here to expand",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        }
      ],
      accordionItems2: [
        {
          title: "Click here to expand",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          selected: true
        },
        {
          title: "Click here to expand",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        }
      ],
      accordionItems3: [
        {
          title: "Click here to expand",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          selected: true
        },
        {
          title: "Click here to expand",
          text:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        }
      ]
    };
  },
  async mounted() {
    this.mdFile = await fetch(
      "https://raw.githubusercontent.com/ziaadini/tailwind-vue/master/public/tailwind/accoirdion/README.md"
    ).then(res => res.text());
  }
});
</script>

<style lang="scss" scoped></style>
