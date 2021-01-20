<template>
  <h6>
    BUTTONS
  </h6>
  <div class="flex justify-center flex-wrap space-x-1 space-x-reverse">
    <t-button variant="primary">Test</t-button>
    <t-button ripple variant="warning" icon="bookmarks">Test</t-button>
    <t-button rounded variant="danger">Test</t-button>
    <t-button rounded variant="success">Test</t-button>
  </div>
  <br />
  <div class="flex justify-center flex-wrap space-x-1 space-x-reverse">
    <t-button outline variant="primary">Test</t-button>
    <t-button outline ripple variant="warning" icon="bookmarks">Test</t-button>
    <t-button rounded outline variant="danger">Test</t-button>
    <t-button rounded outline variant="success">Test</t-button>
  </div>
  <br />
  <div class="flex justify-center flex-wrap space-x-1 space-x-reverse">
    <t-button loading variant="primary">Test</t-button>
    <t-button loading ripple variant="warning" icon="bookmarks">Test</t-button>
    <t-button loading rounded variant="danger">Test</t-button>
    <t-button loading rounded variant="success">Test</t-button>
  </div>
  <br />
  <div class="flex justify-center flex-wrap space-x-1 space-x-reverse">
    <t-button loading outline variant="primary">Test</t-button>
    <t-button loading outline ripple variant="warning" icon="bookmarks"
      >Test</t-button
    >
    <t-button loading rounded outline variant="danger">Test</t-button>
    <t-button loading rounded outline variant="success">Test</t-button>
  </div>

  <br />
  <h6>
    ALERTS
  </h6>
  <div class="container mx-auto p-4">
    <t-alert variant="primary">
      This is a Test Message
    </t-alert>
    <t-alert variant="success">
      This is a Test Message
    </t-alert>
    <t-alert variant="danger" icon="bookmarks">
      This is a Test Message
    </t-alert>
    <t-alert variant="warning" icon="bookmarks">
      This is a Test Message
    </t-alert>
  </div>

  <br />
  <h6>
    TEXT INPUT
  </h6>
  <div class="flex justify-center flex-wrap space-x-1 space-x-reverse">
    <TextInput
      placeholder="some test placeholder"
      v-model="text"
      variant="primary"
      right-icon="bookmarks"
    />
    <TextInput
      placeholder="some test placeholder"
      v-model="text"
      variant="success"
      rounded
    />
    <TextInput
      placeholder="some test placeholder"
      v-model="text"
      variant="danger"
      align="center"
    />
    <TextInput
      placeholder="some test placeholder"
      v-model="text"
      variant="warning"
      align="center"
      disabled
    />
  </div>
  <div class="flex justify-center flex-wrap space-x-1 space-x-reverse">
    <TextInput
      placeholder="some test placeholder"
      v-model="text"
      variant="primary"
      right-icon="bookmarks"
      outline
    />
    <TextInput
      placeholder="some test placeholder"
      v-model="text"
      rounded
      variant="success"
      outline
    />
    <TextInput
      placeholder="some test placeholder"
      v-model="text"
      variant="danger"
      outline
      align="center"
    />
    <TextInput
      placeholder="some test placeholder"
      v-model="text"
      variant="warning"
      outline
      align="center"
      disabled
    />
  </div>

  <br />
  <h6>
    MENU
  </h6>
  <div class="flex justify-center w-100 flex-wrap space-x-1 space-x-reverse">
    <t-menu placement="right" full>
      <!-- Button content -->
      <template v-slot:button>
        <t-button class="z-10" variant="primary" full outline icon="accessible">
          test
        </t-button>
      </template>

      <!-- Opened dropdown content -->
      <template v-slot:content>
        <a
          class="flex w-full justify-between items-center rounded px-2 py-1 my-1 hover:bg-indigo-600 hover:text-white"
          >Profile</a
        >
        <a
          class="flex w-full justify-between items-center rounded px-2 py-1 my-1 hover:bg-indigo-600 hover:text-white"
          >Settings</a
        >
        <a
          class="flex w-full justify-between items-center rounded px-2 py-1 my-1 hover:bg-indigo-600 hover:text-white"
          >Help</a
        >

        <hr />

        <a
          class="flex w-full justify-between items-center rounded px-2 py-1 my-1 hover:bg-red-600 hover:text-white"
          >Logout</a
        >
      </template>
    </t-menu>
  </div>
  <h6>
    DROPDOWN
  </h6>
  {{ dropdownModel }}
  <div ref="triggerDropdown">
    <t-button
      ripple
      variant="warning"
      icon="bookmarks"
      @click="dropdownOpened = !dropdownOpened"
      >trigger dropdown</t-button
    >
  </div>
  dropdownOpened:
  {{ dropdownOpened }}
  <div class="flex justify-center w-100 flex-wrap space-x-1 space-x-reverse">
    <t-dropdown
      v-model="dropdownModel"
      v-model:opened="dropdownOpened"
      placeholder="this is a test placeholder"
      rounded
      :items="['test1', 'test2', 'test3']"
    />
    <t-dropdown placeholder="تست" :items="['test1', 'test2', 'test3']" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TButton from "@/components/tailwind/button/TButton.vue";
import TAlert from "@/components/tailwind/alert/TAlert.vue";
import TextInput from "@/components/tailwind/text-input/TTextInput.vue";
import TMenu from "@/components/tailwind/menu/TMenu.vue";
import TDropdown from "@/components/tailwind/dropdown/TDropdown.vue";
export default defineComponent({
  name: "App",
  components: {
    TButton,
    TAlert,
    TextInput,
    TMenu,
    TDropdown,
  },
  data() {
    return {
      text: "",
      dropdownModel: "",
      dropdownTriggerRef: "" as any,
      dropdownOpened: false,
    };
  },
  mounted() {
    this.dropdownTriggerRef = this.$refs.triggerDropdown;
  },
});
</script>
