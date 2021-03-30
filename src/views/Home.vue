<template>
  <h6>
    BUTTONS
  </h6>
  <small>
    simple button
  </small>
  <div class="flex justify-center flex-wrap space-x-1 space-x-reverse">
    <t-button
      to="zia"
      size="sm"
      class="w-1"
      ripple
      @click="log('clicked')"
      disabled
      >Test</t-button
    >
    <t-button ripple variant="warning" icon="bookmarks">Test</t-button>
    <t-button rounded variant="danger">Test</t-button>
    <t-button rounded variant="success" size="large">Test</t-button>
    <t-button rounded variant="success" icon="bookmarks" size="large" fab>
    </t-button>
  </div>
  <br />
  <small>
    outline button
  </small>
  <div class="flex justify-center flex-wrap space-x-1 space-x-reverse">
    <t-button outline variant="primary">Test</t-button>
    <t-button outline ripple variant="warning" icon="bookmarks">Test</t-button>
    <t-button rounded outline variant="danger">Test</t-button>
    <t-button rounded outline variant="success">Test</t-button>
  </div>
  <br />
  <small>
    simple loading button
  </small>
  <div class="flex justify-center flex-wrap space-x-1 space-x-reverse">
    <t-button loading variant="primary"></t-button>
    <t-button loading ripple variant="warning" icon="bookmarks">Test</t-button>
    <t-button loading rounded variant="danger">Test</t-button>
    <t-button loading rounded variant="success">Test</t-button>
  </div>
  <br />
  <small>
    outline loading button
  </small>
  <div class="flex justify-center flex-wrap space-x-1 space-x-reverse">
    <t-button loading outline variant="primary">Test</t-button>
    <t-button loading outline ripple variant="warning" icon="bookmarks"
      >Test</t-button
    >
    <t-button loading rounded outline variant="danger">Test</t-button>
    <t-button loading rounded outline variant="success">Test</t-button>
  </div>
  <br />
  <small>
    outline & primary loading button
  </small>
  <div class="flex justify-center flex-wrap space-x-1 space-x-reverse">
    <t-button to="zia" outline variant="primary">Test</t-button>
    <t-button to="zia" outline ripple variant="warning" icon="bookmarks"
      >Test</t-button
    >
    <t-button to="zia" rounded variant="danger">Test</t-button>
    <t-button to="zia" rounded variant="success">Test</t-button>
  </div>

  <br />
  <h6>
    ALERTS
  </h6>
  <div class="container mx-auto p-4">
    <small>
      simple alert
    </small>
    <t-alert show variant="primary">
      This is a Test Message This is a Test Message This is a Test Message This
      is a Test Message This is a Test Message This is a Test Message This is a
      Test Message This is a Test Message This is a Test Message This is a Test
      Message This is a Test Message This is a Test Message This is a Test
      Message This is a Test Message This is a Test Message This is a Test
      Message This is a Test Message This is a Test Message This is a Test
      Message This is a Test Message This is a Test Message This is a Test
      Message This is a Test Message This is a Test Message This is a Test
      Message This is a Test Message This is a Test Message This is a Test
      Message This is a Test Message This is a Test Message This is a Test
      Message This is a Test Message
    </t-alert>
    <t-alert v-model="successAlert" show variant="success" icon="home">
      This is a Test Message This is a Test Message This is a Test Message This
    </t-alert>
    <t-alert v-model="successAlert" variant="success" icon="home">
      This is a Test Message This is a Test Message This is a Test Message This
      is a Test Message This is a Test Message This is a Test Message This is a
      Test Message This is a Test Message This is a Test Message This is a Test
      Message This is a Test Message This is a Test Message This is a Test
      Message This is a Test Message This is a Test Message This is a Test
      Message This is a Test Message This is a Test Message This is a Test
      Message This is a Test Message This is a Test Message This is a Test
      Message This is a Test Message This is a Test Message This is a Test
      Message This is a Test Message This is a Test Message This is a Test
      Message This is a Test Message This is a Test Message This is a Test
      Message This is a Test Message This is a Test Message
    </t-alert>
    <small>alert with icon</small>
    <t-alert show variant="danger" icon="bookmarks">
      This is a Test Message This is a Test Message This is a Test Message This
      is a Test Message This is a Test Message This is a Test Message This is a
      Test Message This is a Test Message This is a Test Message This is a Test
      Message This is a Test Message This is a Test Message This is a Test
      Message This is a Test Message This is a Test Message This is a Test
      Message This is a Test Message This is a Test Message This is a Test
      Message This is a Test Message This is a Test Message This is a Test
      Message This is a Test Message This is a Test Message This is a Test
      Message This is a Test Message This is a Test Message This is a Test
      Message This is a Test Message This is a Test Message This is a Test
      Message This is a Test Message This is a Test Message
    </t-alert>
    <t-alert show variant="warning" icon="bookmarks">
      This is a Test Message This is a Test Message This is a Test Message This
      is a Test Message This is a Test Message This is a Test Message This is a
      Test Message This is a Test Message This is a Test Message This is a Test
      Message This is a Test Message This is a Test Message This is a Test
      Message This is a Test Message This is a Test Message This is a Test
      Message This is a Test Message This is a Test Message This is a Test
      Message This is a Test Message This is a Test Message This is a Test
      Message This is a Test Message This is a Test Message This is a Test
      Message This is a Test Message This is a Test Message This is a Test
      Message This is a Test Message This is a Test Message This is a Test
      Message This is a Test Message This is a Test Message
    </t-alert>
  </div>

  <br />

  <h6>
    TEXT INPUT
  </h6>
  <small>
    simple text inputs
  </small>
  <div class="flex justify-center flex-wrap space-x-1 space-x-reverse">
    <TextInput
      area
      placeholder="some test placeholder"
      variant="white"
      left-icon="bookmarks"
      right-icon="bookmarks"
    />
    {{ text1 }}
    <TextInput
      placeholder="some test placeholder"
      v-model.format:,:4="text1"
      inputType="numeric"
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

    <TextInput
      placeholder="some test placeholder"
      v-model="text"
      :value="'error'"
      variant="primary"
      right-icon="bookmarks"
      error
    />
  </div>
  <br />
  <small>
    simple hover text inputs
  </small>
  <div class="flex justify-center flex-wrap space-x-1 space-x-reverse">
    <TextInput placeholder="some test placeholder" variant="white" hover />
    {{ text1 }}
    <TextInput
      placeholder="some test placeholder"
      v-model.format:,:4="text1"
      inputType="numeric"
      hover
      variant="primary"
      right-icon="bookmarks"
    />
    <TextInput
      placeholder="some test placeholder"
      hover
      v-model="text"
      variant="success"
      rounded
    />
    <TextInput
      placeholder="some test placeholder"
      v-model="text"
      variant="danger"
      hover
      align="center"
    />
    <TextInput
      placeholder="some test placeholder"
      v-model="text"
      variant="warning"
      align="center"
      disabled
      hover
    />

    <TextInput
      placeholder="some test placeholder"
      v-model="text"
      :value="'error'"
      variant="primary"
      right-icon="bookmarks"
      hover
      error
    />
  </div>
  <br />
  <!-- <small> -->
  <!-- raised buttons
  </small>
  <div class="flex justify-center flex-wrap space-x-1 space-x-reverse">
    <TextInput
      placeholder="some test placeholder"
      v-model="text"
      variant="white"
      right-icon="bookmarks"
      :outline="false"
    />
    <TextInput
      placeholder="some test placeholder"
      v-model="text"
      variant="primary"
      right-icon="bookmarks"
      rightIconColor="text-white"
      :outline="false"
    />
    <TextInput
      placeholder="some test placeholder"
      v-model="text"
      rounded
      variant="success"
      :outline="false"
    />
    <TextInput
      placeholder="some test placeholder"
      v-model="text"
      variant="danger"
      align="center"
      :outline="false"
    />
    <TextInput
      placeholder="some test placeholder"
      v-model="text"
      variant="warning"
      align="center"
      :outline="false"
      disabled
    />

    <TextInput
      placeholder="some test placeholder"
      v-model="text"
      :value="'error'"
      variant="primary"
      right-icon="bookmarks"
      :outline="false"
      error
    />
  </div> -->

  <br />
  <h6>
    MENU
  </h6>
  <div class="flex justify-center w-100 flex-wrap space-x-1 space-x-reverse">
    <t-menu placement="right">
      <!-- Button content -->
      <template v-slot:button>
        <t-button class="z-10" variant="primary" full outline>
          ...
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
    <t-menu hover placement="right" animate>
      <!-- Button content -->
      <template v-slot:button>
        <t-button class="z-10" variant="primary" full outline icon="accessible">
          test test test test test
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

  <br />
  <h6>
    DROPDOWN
  </h6>
  <small> simple dropdown </small>
  <div
    class="flex flex-col justify-center w-100 flex-wrap space-x-1 space-x-reverse"
  >
    <t-dropdown
      animationDelay="2000"
      animationDelayType="close"
      v-model="dropdownModel"
      placeholder="this is a test placeholder"
      rounded
      :items="[
        'test1',
        'test2',
        'test3',
        'test2',
        'test3',
        'test2',
        'test3',
        'test2',
        'test3',
        'test2',
        'test3',
        'test2',
        'test3',
        'test2',
        'test3',
        'test2',
        'test3',
      ]"
    />
    <t-dropdown
      v-model="dropdownModel"
      placeholder="this is a test placeholder"
      rounded
      :items="['test1', 'test2', 'test3']"
      variant="danger"
    />
    <t-dropdown
      v-model="dropdownModel"
      hover
      placeholder="this is a test placeholder"
      rounded
      :items="['test1', 'test2', 'test3']"
      variant="success"
    />
    <t-dropdown
      v-model="dropdownModel"
      hover
      :disabled="disabled"
      placeholder="this is a disabled placeholder"
      rounded
      :items="['test1', 'test2', 'test3']"
      variant="warning"
    />
  </div>
  <br />
  <small> raised dropdown </small>
  <div
    class="flex justify-center flex-col w-100 flex-wrap space-x-1 space-x-reverse"
  >
    <t-dropdown
      v-model="dropdownModel"
      v-model:opened="openedDropdown"
      :toggleByHeader="false"
      :outline="false"
      variant="white"
      placeholder="this is a testfsafsdfsdfsdf placeholder"
      labelField="title"
      :items="dropdownItems"
      animationDelay="1000"
      animationDelayType="close"
    />
    <t-dropdown
      v-model="dropdownModel"
      :outline="false"
      top
      variant="white"
      placeholder="this is a test placeholder"
      :items="['test1', 'test2', 'test3']"
    />
    <t-dropdown
      :outline="false"
      :disabled="disabled"
      rounded
      variant="danger"
      placeholder="تست"
      :items="['test1', 'test2', 'test3']"
    />
    <t-dropdown
      :outline="false"
      variant="success"
      placeholder="تست"
      :items="['test1', 'test2', 'test3']"
    />
    <t-dropdown
      :outline="false"
      variant="warning"
      top
      rounded
      placeholder="تست"
      :items="[
        'test1',
        'test2',
        'test3',
        'test2',
        'test3',
        'test2',
        'test3',
        'test2',
        'test3',
      ]"
    />
  </div>

  <h6>
    BADGE
  </h6>
  <div class="flex justify-center w-100 flex-wrap space-x-1 space-x-reverse">
    <t-badge :text="badgeData" position="bottomRight">
      <t-button loading variant="success">Test</t-button>
    </t-badge>
    <t-badge :text="badgeData" position="topRight">
      <t-button loading variant="success">Test</t-button>
    </t-badge>
    <t-badge :text="badgeData" position="topLeft">
      <t-button loading variant="success">Test</t-button>
    </t-badge>
    <t-badge :text="badgeData" position="bottomLeft">
      <t-button loading variant="success">Test</t-button>
    </t-badge>
  </div>
  <br />
  <div class="flex justify-center w-100 flex-wrap space-x-1 space-x-reverse">
    <t-badge
      :text="badgeData"
      variant="primary"
      :rounded="true"
      position="bottomRight"
      size="lg"
    >
      <t-button loading variant="success">Test</t-button>
    </t-badge>
    <t-badge
      :text="badgeData"
      variant="danger"
      :rounded="false"
      position="topRight"
    >
      <t-button loading variant="success">Test</t-button>
    </t-badge>
    <t-badge
      :text="badgeData"
      variant="success"
      :rounded="false"
      position="topLeft"
    >
      <t-button loading variant="success">Test</t-button>
    </t-badge>
    <t-badge
      :text="badgeData"
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
      :text="badgeData"
      variant="primary"
      size="md"
      position="bottomRight"
    >
      <t-button loading variant="success">Test</t-button>
    </t-badge>
    <t-badge :text="badgeData" variant="danger" size="md" position="topRight">
      <t-button loading variant="success">Test</t-button>
    </t-badge>
    <t-badge
      :text="badgeData"
      variant="warning"
      size="lg"
      :rounded="false"
      position="topLeft"
    >
      <t-button loading variant="success">Test</t-button>
    </t-badge>
    <t-badge
      :text="badgeData"
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
  <div
    class="flex justify-center items-center w-100 flex-wrap space-x-1 space-x-reverse"
  >
    <small>
      simple rate component
    </small>
    <small> rateValue:{{ rateValue }} </small>
    <t-rate
      v-model="rateValue"
      class="w-32"
      emptyIcon="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Empty_Star.svg/1200px-Empty_Star.svg.png"
      fullIcon="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Star_full.svg/1200px-Star_full.svg.png"
    >
      <template #star-1> test </template>
    </t-rate>
    <small>
      simple rate component with half state
    </small>
    <small> rateValue:{{ rateValue2 }} </small>
    <t-rate
      v-model="rateValue2"
      class="w-28"
      emptyIcon="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Empty_Star.svg/1200px-Empty_Star.svg.png"
      halfIcon="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Half_Star_Yellow.svg/1024px-Half_Star_Yellow.svg.png"
      fullIcon="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Star_full.svg/1200px-Star_full.svg.png"
    ></t-rate>

    <small>
      simple rate component with different size
    </small>
    <small> rateValue:{{ rateValue3 }} </small>
    <t-rate
      v-model="rateValue3"
      hover
      class="w-20"
      :length="8"
      emptyIcon="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Empty_Star.svg/1200px-Empty_Star.svg.png"
      fullIcon="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Star_full.svg/1200px-Star_full.svg.png"
      halfIcon="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Half_Star_Yellow.svg/1024px-Half_Star_Yellow.svg.png"
    ></t-rate>
  </div>

  <h6>
    CAROUSEL
  </h6>
  itemChange: {{ itemChange }}
  <t-carousel
    :autoPlay="false"
    v-model="itemChange"
    :items="links"
    class="w-96 h-96"
    style="margin: 0 auto;"
  >
    <!-- <t-button variant="primary" :key="i"> test</t-button> -->

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
      class=" rounded w-32 h-56 mx-2 bg-primary-50 inline-block"
    >
      <span class="text-center">{{ i }}</span>
    </div>

    <template #leftButton="{scrollLeft, leftDisabled}">
      <t-button variant="primary" @click="scrollLeft" :disabled="leftDisabled">
        left
      </t-button>
    </template>

    <template #rightButton="{scrollRight, rightDisabled}">
      <t-button
        variant="success"
        @click="scrollRight"
        :disabled="rightDisabled"
      >
        right
      </t-button>
    </template>
  </t-slider>
  <br />
  <h6>
    breadcrumb
  </h6>

  <t-breadcrumb :items="items" />
  <br />
  <h6>
    image component
  </h6>

  <TZoom
    imgSrc="https://images.pexels.com/photos/6303791/pexels-photo-6303791.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
  ></TZoom>
  <TZoom
    imgSrc="https://images.pexels.com/photos/6303791/pexels-photo-6303791.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
    :scale="2"
  ></TZoom>
  <TZoom
    imgSrc="https://images.pexels.com/photos/6303791/pexels-photo-6303791.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
    :scale="3"
  ></TZoom>
  <TZoom
    imgSrc="https://images.pexels.com/photos/6303791/pexels-photo-6303791.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
    maskSrc="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg"
    :scale="4"
  ></TZoom>
  <small>
    image without lazy loading
  </small>
  <t-image :src="imgSource" />
  <br />
  <br />
  <br />
  <small>
    image with lazy loading
  </small>
  <t-image :src="imgSource2" lazy :default="defaultImage">
    <template #loader>
      <p class="text-9xl">
        image is being loaded
      </p>
    </template>
  </t-image>
  <t-image :src="imgSource2" lazy :default="defaultImage" />
  <t-image :src="imgSource2" lazy :default="defaultImage" />
  <t-image :src="imgSource2" lazy :default="defaultImage" />
  <t-image :src="imgSource2" lazy :default="defaultImage" />
  <t-image :src="imgSource2" lazy :default="defaultImage" />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
  <br />
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import TButton from "@/components/tailwind/button/TButton.vue";
import TAlert from "@/components/tailwind/alert/TAlert.vue";
import TextInput from "@/components/tailwind/text-input/TTextInput.vue";
import TMenu from "@/components/tailwind/menu/TMenu.vue";
import TDropdown from "@/components/tailwind/dropdown/TDropdown.vue";
import TImage from "@/components/tailwind/image/TImage.vue";
import TZoom from "@/components/tailwind/zoom/TZoom.vue";
import TBadge from "@/components/tailwind/badge/TBadge.vue";
import TRate from "@/components/tailwind/rate/TRate.vue";
import TBreadcrumb from "@/components/tailwind/breadcrumb/TBreadcrumb.vue";
import TCarousel from "@/components/tailwind/carousel/TCarousel.vue";
import TSlider from "@/components/tailwind/slider/TSlider.vue";
import { BreadCrumb } from "@/utility/types/base-component-types";
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
    TBreadcrumb,
    TImage,
    TZoom,
  },
  data() {
    return {
      text: "",
      text1: "",
      dropdownModel: "",
      dropdownTriggerRef: "" as any,
      dropdownOpened: false,
      badgeData: "123",
      imgSource:
        "https://images.pexels.com/photos/6303791/pexels-photo-6303791.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
      imgSource2:
        "https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&h=650&w=940 940w, https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260 1260w, https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940 1880w, https://images.pexels.com/photos/2166711/pexels-photo-2166711.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260 2520w",
      defaultImage:
        "https://images.pexels.com/photos/3850251/pexels-photo-3850251.jpeg?auto=compress&cs=tinysrgb&h=650&w=940 940w, https://images.pexels.com/photos/3850251/pexels-photo-3850251.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260 1260w, https://images.pexels.com/photos/3850251/pexels-photo-3850251.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940 1880w, https://images.pexels.com/photos/3850251/pexels-photo-3850251.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260 2520w",
      rateValue: 1,
      rateValue2: 1.5,
      rateValue3: 3,
      links: [
        {
          url: "https://cdn.mobit.ir/product/17864/5f2a53856b1c5.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17828/5f227507430bf.jpg?inline=1",
        },
        {
          url:
            "data:image/jpeg;base64,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",
        },
        {
          url: "https://cdn.mobit.ir/product/17864/5f2a53856b1c5.jpg?inline=1",
        },
        {
          url: "https://cdn.mobit.ir/product/17828/5f227507430bf.jpg?inline=1",
        },
        {
          url:
            "data:image/jpeg;base64,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",
        },
        {
          url: "https://cdn.mobit.ir/product/17864/5f2a53856b1c5.jpg?inline=1",
        },
      ],
      count: 10,
      itemChange: 0,
      items: [
        {
          text: "test1",
          url: "مقدار ۱",
        },
        {
          text: "test2",
          url: "مقدار ۲",
        },
        {
          text: "test3",
          url: "مقدار ۳",
          active: true,
        },
      ] as BreadCrumb.Root,
      disabled: false,
      openedDropdown: false,
      dropdownItems: [
        {
          title: "aldddddddddddddddddddddddddddddddddddddddddddddddddddddddi",
          value: {},
        },
        {
          title: "ali2",
          value: {},
        },
        {
          title: "ali3",
          value: {},
        },
        {
          title: "ali4",
          value: {},
        },
        {
          title: "ali5",
          value: {},
        },
        {
          title: "ali6",
          value: {},
        },
        {
          title: "ali7",
          value: {},
        },
      ],
    };
  },
  setup() {
    const successAlert = ref(false);
    setTimeout(() => {
      successAlert.value = true;
    }, 1000);
    return { successAlert };
  },
  methods: {
    log(str: string): void {
      console.log(str);
    },
  },
  mounted() {
    this.dropdownTriggerRef = this.$refs.triggerDropdown;

    setTimeout(() => {
      this.count *= 3;
      this.disabled = true;
      this.openedDropdown = true;
    }, 2000);
    setTimeout(() => {
      this.openedDropdown = false;
    }, 4000);
  },
});
</script>
