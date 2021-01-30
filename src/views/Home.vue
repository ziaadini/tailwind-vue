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
    <t-menu hover placement="right" full>
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
  <!-- <div ref="triggerDropdown">
    <t-button
      ripple
      variant="warning"
      icon="bookmarks"
      @click="dropdownOpened = !dropdownOpened"
      >trigger dropdown</t-button
    >
  </div> -->
  dropdownOpened:
  {{ dropdownOpened }}
  <div class="flex justify-center w-100 flex-wrap space-x-1 space-x-reverse">
    <t-dropdown
      v-model="dropdownModel"
      v-model:opened="dropdownOpened"
      outline
      placeholder="this is a test placeholder"
      rounded
      :items="['test1', 'test2', 'test3']"
    />
    <t-dropdown placeholder="تست" :items="['test1', 'test2', 'test3']" />
  </div>

  <h6>
    BADGE
  </h6>
  <div class="flex justify-center w-100 flex-wrap space-x-1 space-x-reverse">
    <t-badge v-model="badgeData" position="bottomRight">
      <t-button loading variant="success">Test</t-button>
    </t-badge>
    <t-badge v-model="badgeData" position="topRight">
      <t-button loading variant="success">Test</t-button>
    </t-badge>
    <t-badge v-model="badgeData" position="topLeft">
      <t-button loading variant="success">Test</t-button>
    </t-badge>
    <t-badge v-model="badgeData" position="bottomLeft">
      <t-button loading variant="success">Test</t-button>
    </t-badge>
  </div>
  <br />
  <div class="flex justify-center w-100 flex-wrap space-x-1 space-x-reverse">
    <t-badge
      v-model="badgeData"
      variant="primary"
      :rounded="false"
      position="bottomRight"
    >
      <t-button loading variant="success">Test</t-button>
    </t-badge>
    <t-badge
      v-model="badgeData"
      variant="danger"
      :rounded="false"
      position="topRight"
    >
      <t-button loading variant="success">Test</t-button>
    </t-badge>
    <t-badge
      v-model="badgeData"
      variant="success"
      :rounded="false"
      position="topLeft"
    >
      <t-button loading variant="success">Test</t-button>
    </t-badge>
    <t-badge
      v-model="badgeData"
      variant="warning"
      :rounded="false"
      position="bottomLeft"
    >
      <t-button loading variant="success">Test</t-button>
    </t-badge>
  </div>
  <br />
  <div class="flex justify-center w-100 flex-wrap space-x-1 space-x-reverse">
    <t-badge
      v-model="badgeData"
      variant="primary"
      size="sm"
      position="bottomRight"
    >
      <t-button loading variant="success">Test</t-button>
    </t-badge>
    <t-badge v-model="badgeData" variant="danger" size="md" position="topRight">
      <t-button loading variant="success">Test</t-button>
    </t-badge>
    <t-badge
      v-model="badgeData"
      variant="warning"
      size="lg"
      :rounded="false"
      position="topLeft"
    >
      <t-button loading variant="success">Test</t-button>
    </t-badge>
    <t-badge
      v-model="badgeData"
      variant="warning"
      size="xs"
      :rounded="false"
      position="bottomLeft"
    >
      <t-button loading variant="success">Test</t-button>
    </t-badge>
  </div>
  <br />
  <h6>
    Rating
  </h6>
  <TextInput
    placeholder="some test placeholder"
    v-model="text"
    variant="warning"
    outline
    align="center"
    disabled
  />
  rateValue:{{ rateValue }}
  <div class="flex justify-center w-100 flex-wrap space-x-1 space-x-reverse">
    <t-rate
      v-model="rateValue"
      class="w-32"
      emptyIcon="https://lh3.googleusercontent.com/proxy/8GG-0KeJvTeodpW_doSy75fiZlT51YUeZ4TjZefIxNGOYBPD2PPUJzhmVyD8doCTQnpxZHGqH4wMbl4e3XdZveVa"
      fullIcon="https://cdn.mobit.ir/product/17864/5f2a53856b1c5.jpg?inline=1"
    ></t-rate>
    <t-rate
      v-model="rateValue"
      hover
      class="w-10"
      :length="8"
      halfIcon="https://p.kindpng.com/picc/s/11-11q4993_transparent-black-star-png-half-filled-star-icon.png"
      emptyIcon="https://lh3.googleusercontent.com/proxy/8GG-0KeJvTeodpW_doSy75fiZlT51YUeZ4TjZefIxNGOYBPD2PPUJzhmVyD8doCTQnpxZHGqH4wMbl4e3XdZveVa"
      fullIcon="https://cdn.mobit.ir/product/17864/5f2a53856b1c5.jpg?inline=1"
    ></t-rate>
  </div>

  <h6>
    CAROUSEL
  </h6>
  itemChange: {{ itemChange }}
  <t-carousel v-model="links" v-model:index="itemChange">
    test

    <template #leftButton="{leftDisabled, back}">
      <t-button variant="primary" :disabled="leftDisabled" @click="back">
        -</t-button
      >
    </template>

    <template #rightButton="{rightDisabled, next}">
      <t-button variant="primary" :disabled="rightDisabled" @click="next">
        +</t-button
      >
    </template>
  </t-carousel>

  <br />

  <h6>
    TSlider
  </h6>
  <t-slider>
    <div
      v-for="i in count"
      :key="i"
      class="w-32 h-32 rounded mx-2 bg-primary-50 inline-block"
    ></div>

    <template #leftButton="{scrollLeft}">
      <span @click="scrollLeft">
        left
      </span>
    </template>

    <template #rightButton="{scrollRight}">
      <span @click="scrollRight">
        right
      </span>
    </template>
  </t-slider>

  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TButton from "@/components/tailwind/button/TButton.vue";
import TAlert from "@/components/tailwind/alert/TAlert.vue";
import TextInput from "@/components/tailwind/text-input/TTextInput.vue";
import TMenu from "@/components/tailwind/menu/TMenu.vue";
import TDropdown from "@/components/tailwind/dropdown/TDropdown.vue";
import TImage from "@/components/tailwind/image/TImage.vue";
import TBadge from "@/components/tailwind/badge/TBadge.vue";
import TRate from "@/components/tailwind/rate/TRate.vue";
import TCarousel from "@/components/tailwind/carousel/TCarousel.vue";
import TSlider from "@/components/tailwind/slider/TSlider.vue";
export default defineComponent({
  name: "App",
  components: {
    TButton,
    TAlert,
    TextInput,
    TMenu,
    TDropdown,
    TBadge,
    TRate,
    TCarousel,
    TSlider,
  },
  data() {
    return {
      text: "",
      dropdownModel: "",
      dropdownTriggerRef: "" as any,
      dropdownOpened: false,
      badgeData: "123",
      imgSource:
        "https://images.pexels.com/photos/6303791/pexels-photo-6303791.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
      rateValue: 1.5,
      links: [
        {
          url: "https://cdn.mobit.ir/product/17864/5f2a53856b1c5.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17828/5f227507430bf.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17864/5f2a53856b1c5.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17828/5f227507430bf.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17864/5f2a53856b1c5.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17828/5f227507430bf.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17864/5f2a53856b1c5.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17828/5f227507430bf.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17864/5f2a53856b1c5.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17828/5f227507430bf.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17864/5f2a53856b1c5.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17828/5f227507430bf.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17864/5f2a53856b1c5.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17828/5f227507430bf.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17864/5f2a53856b1c5.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17828/5f227507430bf.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17864/5f2a53856b1c5.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17828/5f227507430bf.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17864/5f2a53856b1c5.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17828/5f227507430bf.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17864/5f2a53856b1c5.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17828/5f227507430bf.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17864/5f2a53856b1c5.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17828/5f227507430bf.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17864/5f2a53856b1c5.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17828/5f227507430bf.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17864/5f2a53856b1c5.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17828/5f227507430bf.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17864/5f2a53856b1c5.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17828/5f227507430bf.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17864/5f2a53856b1c5.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17828/5f227507430bf.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17864/5f2a53856b1c5.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17828/5f227507430bf.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17864/5f2a53856b1c5.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17828/5f227507430bf.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17864/5f2a53856b1c5.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17828/5f227507430bf.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17864/5f2a53856b1c5.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17828/5f227507430bf.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17864/5f2a53856b1c5.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17828/5f227507430bf.jpg?inline=1",
        },
      ],
      count: 10,
      itemChange: 0,
    };
  },
  mounted() {
    this.dropdownTriggerRef = this.$refs.triggerDropdown;

    setTimeout(() => {
      this.count *= 3;
    }, 5000);
  },
});
</script>
