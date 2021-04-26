<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Table</h3>
    <p class="mb-2">
      The t-table component is used for displaying tabular data. Features
      include sorting, toggle details and customizing template of component.
    </p>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Simple</h2>
      <p class="mb-2">
        This type of component is a simple wrapper component around the element.
      </p>
      <t-table :items="tableData" :fields="tableHeader">
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
      mdFile: "",
      tableData: [
        { age: 40, firstName: "Dickerson", lastName: "Macdonald" },
        {
          age: 21,
          firstName: "Larsen",
          lastName: "Shaw"
        },
        {
          age: 89,
          firstName: "Geneva",
          lastName: "Wilson"
        },
        { age: 38, firstName: "Jami", lastName: "Carney" }
      ],
      tableHeader: [
        { key: "firstName", label: "first name" },
        { key: "lastName", label: "last name" },
        { key: "age", label: "age" }
      ]
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
