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
        height="300"
        src="//jsfiddle.net/mohstarsos1/ptv61jgw/1/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Local Sort</h2>
      <p class="mb-2">
        Using the localSort prop will enable you to sort on multiple columns at
        the same time.
      </p>
      <t-table localSort :items="tableData2" :fields="tableHeader2">
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
        height="300"
        src="//jsfiddle.net/mohstarsos1/pq6x0z5w/1/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Default Sort</h2>
      <p class="mb-2">
        Using the Default sort prop for sorted table at mounted component.
      </p>
      <t-table
        localSort
        :items="tableData3"
        :fields="tableHeader3"
        :default-sort="{ key: 'firstName', sort: 'asc' }"
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
        height="300"
        src="//jsfiddle.net/mohstarsos1/hj8kw175/1/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Loading</h2>
      <p class="mb-2">
        You can use the loading prop to indicate that data in the table is
        currently loading. If there is no data in the table, a loading message
        will also be displayed.
      </p>
      <div class="flex">
        <t-table loading :items="tableData3" :fields="tableHeader3">
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
        <t-table
          loading
          loadingText="Please Wait (Custom Text)"
          :items="tableData3"
          :fields="tableHeader3"
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
      </div>

      <iframe
        width="100%"
        height="500"
        src="//jsfiddle.net/mohstarsos1/k3h8ydje/2/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Without Counter</h2>
      <p class="mb-2">
        You can remove counter from each row with this prop.
      </p>
      <t-table :hasCounter="false" :items="tableData" :fields="tableHeader">
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
        height="300"
        src="//jsfiddle.net/mohstarsos1/v1yc4w90/1/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Striped - Zebra Table</h2>
      <p class="mb-2">
        This prop used for hoverd one in between rows.
      </p>
      <t-table striped :items="tableData" :fields="tableHeader">
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
        height="300"
        src="//jsfiddle.net/mohstarsos1/18emcqrg/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Border - DivideX, DivideY</h2>
      <p class="mb-2">
        Use the DivideX and DivideY prop to set the divider border from rows and
        columns of the table.
      </p>
      <div class="mt-6">Divide X:</div>
      <t-table :divideX="false" :items="tableData" :fields="tableHeader">
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
      <div class="mt-6">Divide Y:</div>
      <t-table :divideY="false" :items="tableData" :fields="tableHeader">
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
      <div class="mt-6">Divide X,Y:</div>
      <t-table
        :divideY="false"
        :divideX="false"
        :items="tableData"
        :fields="tableHeader"
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
        height="500"
        src="//jsfiddle.net/mohstarsos1/8dyzmrtf/1/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Custom Styles</h2>
      <p class="mb-2">
        With this type of component you are able to give your data tables an
        alternate style.
      </p>
      <div class="mt-6">Custom Header:</div>
      <t-table :items="tableData" :fields="tableHeader">
        <template #card-header="{item}">
          <div class="text-blue-500 font-bold">{{ item.label }}</div>
        </template>
        <template #header="{item}">
          <div class="text-blue-500 font-bold">{{ item.label }}</div>
        </template>
        <template #cell="{value}">
          <div>{{ value }}</div>
        </template>
      </t-table>
      <div class="mt-6">Custom Header (Variant Color Cells):</div>
      <t-table :items="tableData5" :fields="tableHeader5">
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
      <div class="mt-6">Custom Row (Variant Color Rows):</div>
      <t-table :items="tableData6" :fields="tableHeader6">
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
      <div class="mt-6">Without Row Hover Effect:</div>
      <t-table :hover="false" :items="tableData" :fields="tableHeader">
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
        height="500"
        src="//jsfiddle.net/mohstarsos1/epb6cujv/5/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Toggle Row</h2>
      <p class="mb-2">
        With this type of component you can toggled row for table.
      </p>
      <t-table
        :items="tableData7"
        :fields="tableHeader7"
        :resetExpand="$route.query.page"
      >
        <template #cell(showDetails)="{toggleDetails,item}">
          <t-button
            variant="success"
            class="text-xs"
            size="sm"
            @click="toggleDetails"
            >toggleDetails ({{ item.age }})</t-button
          >
        </template>

        <template #card-cell(showDetails)="{toggleDetails,item}">
          <t-button
            variant="success"
            class="text-xs"
            size="sm"
            @click="toggleDetails"
            >toggleDetails ({{ item.age }})</t-button
          >
        </template>

        <template #cell="{value}">
          <span class="text-gray-700">
            {{ value }}
          </span>
        </template>
        <template #rowDetails="{rowItem}">
          <t-card
            data-container-delete="text-right shadow-md border border-gray-100"
            data-container-add="text-gray-500 bg-gray-100"
            data-title-delete="text-danger"
            title="hello world"
          >
            <div class="h-16">This is a test text ({{ rowItem.age }})</div>
          </t-card>
        </template>
      </t-table>
      <iframe
        width="100%"
        height="500"
        src="//jsfiddle.net/mohstarsos1/6un08s5g/3/embedded/html,js/dark/"
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
import TButton from "@/components/tailwind/button/TButton.vue";

export default defineComponent({
  name: "App",
  components: {
    TTable,
    TButton
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
      ],
      tableData2: [
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
      tableHeader2: [
        { key: "firstName", label: "first name" },
        { key: "lastName", label: "last name" },
        { key: "age", label: "age", sortable: true }
      ],
      tableData3: [
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
      tableHeader3: [
        { key: "firstName", label: "first name" },
        { key: "lastName", label: "last name" },
        { key: "age", label: "age" }
      ],
      tableData4: [
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
      tableHeader4: [
        { key: "firstName", label: "first name" },
        { key: "lastName", label: "last name" },
        { key: "age", label: "age" }
      ],
      tableData5: [
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
      tableHeader5: [
        { key: "firstName", label: "first name", variant: "success" },
        { key: "lastName", label: "last name", variant: "warning" },
        { key: "age", label: "age", variant: "danger" }
      ],
      tableData6: [
        {
          age: 40,
          firstName: "Dickerson",
          lastName: "Macdonald",
          _rowVariant: "primary"
        },
        {
          age: 21,
          firstName: "Larsen",
          lastName: "Shaw",
          _rowVariant: "success"
        },
        {
          age: 89,
          firstName: "Geneva",
          lastName: "Wilson",
          _rowVariant: "warning"
        },
        {
          age: 38,
          firstName: "Jami",
          lastName: "Carney",
          _rowVariant: "danger"
        }
      ],
      tableHeader6: [
        { key: "firstName", label: "first name" },
        { key: "lastName", label: "last name" },
        { key: "age", label: "age" }
      ],
      tableData7: [
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
        { age: 39, firstName: "Jon", lastName: "Carney" }
      ],
      tableHeader7: [
        { key: "showDetails", label: "show details" },
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
