<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Dropdown</h3>
    <p class="mb-2">
      Toggle contextual overlays for displaying lists of links and more
    </p>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Simple</h2>
      <p class="mb-2">
        Choose this basic dropdown, only contains items and placeholder.
      </p>
      <div class="my-4">
        <t-dropdown
          placeholder="Simple with placeholder"
          :items="['item-1', 'item-2', 'item-3', 'item-4', 'item-5']"
        />
      </div>
      <iframe
        width="100%"
        height="150"
        src="//jsfiddle.net/mohstarsos1/cqfzj2s4/1/embedded/html/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">
        Open with hover and Divided item
      </h2>
      <p class="mb-2">Open whit cursor hover and add border between items.</p>
      <div class="my-4">
        <t-dropdown
          placeholder="Open with hover"
          :items="['item-1', 'item-2', 'item-3', 'item-4', 'item-5']"
          hover
        />
        <t-dropdown
          placeholder="divided items"
          :items="['item-1', 'item-2', 'item-3', 'item-4', 'item-5']"
          divide
          class="mt-3"
        />
      </div>
      <iframe
        width="100%"
        height="300"
        src="//jsfiddle.net/mohstarsos1/wmzushbo/1/embedded/html/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Variant color, Outline and Rounded</h2>
      <p class="mb-2">
        add default variant colors and outline mode and rounded.
      </p>
      <div class="flex">
        <div class="my-4">
          <t-dropdown
            placeholder="Primary dropdown"
            variant="primary"
            :outline="false"
            :items="['item-1', 'item-2', 'item-3', 'item-4', 'item-5']"
          />
          <t-dropdown
            placeholder="Sucess dropdown"
            variant="success"
            :outline="false"
            :items="['item-1', 'item-2', 'item-3', 'item-4', 'item-5']"
            class="mt-3"
          />
          <t-dropdown
            placeholder="Warning dropdown"
            variant="warning"
            :outline="false"
            :items="['item-1', 'item-2', 'item-3', 'item-4', 'item-5']"
            class="mt-3"
          />
          <t-dropdown
            placeholder="Danger dropdown"
            variant="danger"
            :outline="false"
            :items="['item-1', 'item-2', 'item-3', 'item-4', 'item-5']"
            class="mt-3"
          />
        </div>
        <div class="my-4 ml-8">
          <t-dropdown
            placeholder="Primary rounded"
            variant="primary"
            :outline="false"
            :items="['item-1', 'item-2', 'item-3', 'item-4', 'item-5']"
            rounded
          />
          <t-dropdown
            placeholder="Sucess rounded"
            variant="success"
            :outline="false"
            :items="['item-1', 'item-2', 'item-3', 'item-4', 'item-5']"
            rounded
            class="mt-3"
          />
          <t-dropdown
            placeholder="Warning rounded"
            variant="warning"
            :outline="false"
            :items="['item-1', 'item-2', 'item-3', 'item-4', 'item-5']"
            rounded
            class="mt-3"
          />
          <t-dropdown
            placeholder="Danger rounded"
            variant="danger"
            :outline="false"
            :items="['item-1', 'item-2', 'item-3', 'item-4', 'item-5']"
            rounded
            class="mt-3"
          />
        </div>
        <div class="my-4 ml-8">
          <t-dropdown
            placeholder="Primary outline"
            variant="primary"
            :items="['item-1', 'item-2', 'item-3', 'item-4', 'item-5']"
            rounded
          />
          <t-dropdown
            placeholder="Sucess outline"
            variant="success"
            :items="['item-1', 'item-2', 'item-3', 'item-4', 'item-5']"
            rounded
            class="mt-3"
          />
          <t-dropdown
            placeholder="Warning outline"
            variant="warning"
            :items="['item-1', 'item-2', 'item-3', 'item-4', 'item-5']"
            rounded
            class="mt-3"
          />
          <t-dropdown
            placeholder="Danger outline"
            variant="danger"
            :items="['item-1', 'item-2', 'item-3', 'item-4', 'item-5']"
            rounded
            class="mt-3"
          />
        </div>
      </div>
      <iframe
        width="100%"
        height="500"
        src="//jsfiddle.net/mohstarsos1/sLc0dohq/4/embedded/html/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Animation Timing</h2>
      <p class="mb-2">
        Custom animation delay and animation duration.
      </p>
      <div class="my-4">
        <t-dropdown
          placeholder="Fade after 2000 ms"
          :items="['item-1', 'item-2', 'item-3', 'item-4', 'item-5']"
          animationDelayType="close"
          animationDuration="2000"
        />
        <t-dropdown
          placeholder="Close after 2000 ms"
          :items="['item-1', 'item-2', 'item-3', 'item-4', 'item-5']"
          animationDelayType="close"
          animationDelay="2000"
          class="mt-3"
        />
      </div>
      <iframe
        width="100%"
        height="300"
        src="//jsfiddle.net/mohstarsos1/o6ev4tys/1/embedded/html/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Open on the top and disable mode</h2>
      <p class="mb-2">
        Opening dropdown on the top and disable mode.
      </p>
      <div class="my-4">
        <t-dropdown
          placeholder="Open on the Top"
          :items="['item-1', 'item-2', 'item-3', 'item-4', 'item-5']"
          top
        />
        <t-dropdown
          disabled
          placeholder="Disabled"
          :items="['test1', 'test2', 'test3']"
          class="mt-3"
        />
      </div>
      <iframe
        width="100%"
        height="300"
        src="//jsfiddle.net/mohstarsos1/0o49avtw/2/embedded/html/dark/"
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
import TDropdown from "@/components/tailwind/dropdown/TDropdown.vue";

export default defineComponent({
  name: "App",
  components: {
    TDropdown
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
    this.mdFile = await fetch("/tailwind/dropdown/README.md").then(res =>
      res.text()
    );
  }
});
</script>

<style lang="scss" scoped></style>
