<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Tooltip</h3>
    <p class="mb-2">
      This component provides a clean interface for handling hover states for
      any component.The t-tooltip component is a wrapper that should contain
      only one child element, and can trigger an event when hovered over.
    </p>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Simple (Only Text)</h2>
      <p class="mb-2">this component only show text with default settings.</p>
      <t-tooltip message="Test message for show with hover">
        <t-button variant="primary" class="mb-2">Hover me</t-button>
      </t-tooltip>
      <iframe
        width="100%"
        height="150"
        src="//jsfiddle.net/mohstarsos1/jmvo0fgr/1/embedded/html/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Color Variant</h2>
      <p class="mb-2">Choose this component, with variant colors.</p>
      <div class="flex">
        <t-tooltip variant="primary" message="Test message for show with hover">
          <t-button variant="primary" class="mb-2 mr-2">Primary</t-button>
        </t-tooltip>
        <t-tooltip variant="success" message="Test message for show with hover">
          <t-button variant="primary" class="mb-2 mr-2">Success</t-button>
        </t-tooltip>
        <t-tooltip variant="warning" message="Test message for show with hover">
          <t-button variant="primary" class="mb-2 mr-2">Warning</t-button>
        </t-tooltip>
        <t-tooltip variant="danger" message="Test message for show with hover">
          <t-button variant="primary" class="mb-2 mr-2">Danger</t-button>
        </t-tooltip>
      </div>

      <iframe
        width="100%"
        height="300"
        src="//jsfiddle.net/mohstarsos1/h810v7wn/embedded/html/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Position</h2>
      <p class="mb-2">You can set position opening hover.</p>
      <div class="flex">
        <t-tooltip position="top" message="Test message for show with hover">
          <t-button variant="primary" class="mb-2 mr-2">Top</t-button>
        </t-tooltip>
        <t-tooltip position="right" message="Test message for show with hover">
          <t-button variant="primary" class="mb-2 mr-2">Right</t-button>
        </t-tooltip>
        <t-tooltip position="bottom" message="Test message for show with hover">
          <t-button variant="primary" class="mb-2 mr-2">Bottom</t-button>
        </t-tooltip>
        <t-tooltip position="left" message="Test message for show with hover">
          <t-button variant="primary" class="mb-2 mr-2">Left</t-button>
        </t-tooltip>
      </div>

      <iframe
        width="100%"
        height="300"
        src="//jsfiddle.net/mohstarsos1/xo9bmLqf/embedded/html/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Handle with V-Model</h2>
      <p class="mb-2">handle show/hide tooltip with v-model.</p>
      <div class="flex items-center justify-center">
        <t-tooltip
          v-model="show"
          :hover="false"
          message="Test message for show with v-model"
        >
          <div>Some Element</div>
        </t-tooltip>
        <t-button variant="primary" @click="show = !show" class="mb-2 ml-4"
          >Click me</t-button
        >
      </div>

      <iframe
        width="100%"
        height="200"
        src="//jsfiddle.net/mohstarsos1/ph8adycg/1/embedded/html,js/dark/"
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
import TTooltip from "@/components/tailwind/tooltip/TTooltip.vue";

export default defineComponent({
  name: "App",
  components: {
    TButton,
    TTooltip
  },
  setup() {
    return {};
  },
  data() {
    return {
      mdFile: "",
      show: false
    };
  },
  async mounted() {
    this.mdFile = await fetch("/tailwind/tooltip/README.md").then(res =>
      res.text()
    );
  }
});
</script>

<style lang="scss" scoped></style>
