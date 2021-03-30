<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Badge</h3>
    <p class="mb-2">
      Badge is small count and labeling component.
    </p>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Simple (Only Text)</h2>
      <p class="mb-2">Choose this basic badge, only with text.</p>
      <div class="mb-4">
        <t-badge text="X">
          <div>Element</div>
        </t-badge>
      </div>
      <iframe
        width="100%"
        height="130"
        src="//jsfiddle.net/mohstarsos1/umphayvL/1/embedded/html/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Positioning</h2>
      <p class="mb-2">Choose this badge and set position.</p>
      <div class="flex my-4">
        <div class="mx-5">
          <t-badge text="X" position="topRight">
            <div>Element</div>
          </t-badge>
        </div>
        <div class="mx-5">
          <t-badge text="Y" position="bottomRight">
            <div>Element</div>
          </t-badge>
        </div>
        <div class="mx-5">
          <t-badge text="Z" position="topLeft">
            <div>Element</div>
          </t-badge>
        </div>
        <div class="mx-5">
          <t-badge text="K" position="bottomLeft">
            <div>Element</div>
          </t-badge>
        </div>
      </div>

      <iframe
        width="100%"
        height="300"
        src="//jsfiddle.net/mohstarsos1/6af9jyso/2/embedded/html/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Variant color and not rounded</h2>
      <p class="mb-2">
        Choose this badge using variant color or set not rounded.
      </p>
      <div class="flex my-4">
        <div class="mx-5">
          <t-badge text="X" variant="primary" position="topRight">
            <div>Element</div>
          </t-badge>
        </div>
        <div class="mx-5">
          <t-badge text="Y" variant="success" position="topRight">
            <div>Element</div>
          </t-badge>
        </div>
        <div class="mx-5">
          <t-badge text="Z" variant="warning" position="topRight">
            <div>Element</div>
          </t-badge>
        </div>
        <div class="mx-5">
          <t-badge text="K" variant="danger" position="topRight">
            <div>Element</div>
          </t-badge>
        </div>
      </div>

      <div class="flex my-4">
        <div class="mx-5">
          <t-badge
            text="X"
            variant="primary"
            :rounded="false"
            position="topRight"
          >
            <div>Element</div>
          </t-badge>
        </div>
        <div class="mx-5">
          <t-badge
            text="Y"
            variant="success"
            :rounded="false"
            position="topRight"
          >
            <div>Element</div>
          </t-badge>
        </div>
        <div class="mx-5">
          <t-badge
            text="Z"
            variant="warning"
            :rounded="false"
            position="topRight"
          >
            <div>Element</div>
          </t-badge>
        </div>
        <div class="mx-5">
          <t-badge
            text="K"
            variant="danger"
            :rounded="false"
            position="topRight"
          >
            <div>Element</div>
          </t-badge>
        </div>
      </div>

      <iframe
        width="100%"
        height="300"
        src="//jsfiddle.net/mohstarsos1/so1wc3fL/4/embedded/html/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Size</h2>
      <p class="mb-2">Choose this bage with more sizes.</p>
      <div class="flex my-4">
        <div class="mx-5">
          <t-badge text="X" size="xs">
            <div>Element</div>
          </t-badge>
        </div>
        <div class="mx-5">
          <t-badge text="Y" size="sm">
            <div>Element</div>
          </t-badge>
        </div>
        <div class="mx-5">
          <t-badge text="Z" size="md">
            <div>Element</div>
          </t-badge>
        </div>
        <div class="mx-5">
          <t-badge text="K" size="lg">
            <div>Element</div>
          </t-badge>
        </div>
      </div>

      <iframe
        width="100%"
        height="300"
        src="//jsfiddle.net/mohstarsos1/q3zty4gx/embedded/html/dark/"
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
import TBadge from "@/components/tailwind/badge/TBadge.vue";

export default defineComponent({
  name: "App",
  components: {
    TBadge,
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
    this.mdFile = await fetch("/tailwind/badge/README.md").then((res) =>
      res.text()
    );
  },
});
</script>

<style lang="scss" scoped></style>
