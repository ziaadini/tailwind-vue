<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Table</h3>
    <p class="mb-2">
      Small filled buttons in different styles and colors can be used for call
      to actions in forms and more.
    </p>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Simple</h2>
      <p class="mb-2">Choose this basic button, only with text.</p>
      <t-table
        :items="[
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          {
            age: 21,
            first_name: 'Larsen',
            last_name: 'Shaw'
          },
          {
            age: 89,
            first_name: 'Geneva',
            last_name: 'Wilson'
          },
          { age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]"
        :fields="[
          { key: 'first_name', label: 'first name' },
          { key: 'last_name', label: 'last name' },
          { key: 'age', label: 'age' }
        ]"
      >
        <template #card-header="{item}">
          <div>{{ item.label }}</div>
        </template>
        <template #header="{item}">
          <div>{{ item.label }}</div>
        </template>
        <template #cell="{value}">
          <div>{{ value }}</div>
        </template>
      </t-table>
      <iframe
        width="100%"
        height="100"
        src="//jsfiddle.net/mohstarsos1/13xgw0ry/8/embedded/html/dark"
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
import TTable from "@/components/tailwind/table/TTable.vue";

export default defineComponent({
  name: "App",
  components: {
    TTable
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
    this.mdFile = await fetch("/tailwind/table/README.md").then(res =>
      res.text()
    );
  }
});
</script>

<style lang="scss" scoped></style>
