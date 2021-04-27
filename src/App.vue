<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/ali">Ali</router-link> |
    <router-link to="/mohammad">mohammad</router-link> |
    <router-link to="/zia">zia</router-link> |
    <t-dropdown
      v-model="dropdownModel"
      hover
      placeholder="Component's Document"
      rounded
      :items="ddItems"
      variant="success"
    />
  </div>
  <router-view />
</template>
<script lang="ts">
import { defineComponent, provide } from "vue";
import TDropdown from "@/components/tailwind/dropdown/TDropdown.vue";

export default defineComponent({
  components: {
    TDropdown
  },
  data() {
    return {
      dropdownModel: "",
      ddItems: [
        "button",
        "alert",
        "textInput",
        "badge",
        "menu",
        "modal",
        "dropdown",
        "breadcrumb",
        "slider",
        "carousel",
        "rating",
        "card",
        "tab",
        "accordion",
        "stepper",
        "timeline",
        "fade",
        "tooltip",
        "progressbar",
        "numberpicker",
        "drawer",
        "bottomsheet",
        "switch",
        "checkbox",
        "skeleton",
        "loading",
        "timer",
        "rangeSlider",
        "toast",
        "radio",
        "animate",
        "table",
        "pagination"
      ]
    };
  },
  watch: {
    dropdownModel(value) {
      this.$router.push(`/${value}`);
    }
  },
  setup() {
    // provide("TSettings", {
    //   tabs: {
    //     header: {
    //       add: "hover:bg-gray-100 py-3",
    //       delete: ["py-4"],
    //       replace: { "text-gray-600": "text-gray-700" },
    //     },
    //   },
    //   card: {
    //     title: {
    //       add: "text-danger",
    //     },
    //   },
    //   // alert: {
    //   //   container: { add: "py-1" }
    //   // }
    //   // accordion: {
    //   //   title: { add: "hover:text-warning" },
    //   //   text: { add: "text-primary" }
    //   // }
    // } as TSettings);
    provide("t-table-localSort", false);
    provide("t-bottom-sheet-titleTag", "h5");
    // provide("t-table-loading", true);
  }
});
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
