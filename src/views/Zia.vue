<template>
  <div>
    <div class="my-4 w-full">
      <div>#zia</div>
      <div>
        <t-accordion :items="accourdionItems"></t-accordion>
      </div>
      <h3 class="my-3">custom title&text</h3>
      <t-accordion :items="accourdionItems">
        <template #title="{title,show}">
          <div class="cursor-pointer" :class="{ 'text-danger-500': show }">
            {{ title }}
          </div>
        </template>
        <template #text="{text}">
          <div class="text-danger">{{ text }}</div>
        </template>
      </t-accordion>
    </div>

    <div>#zia</div>
    <t-tabs v-model="tabs">
      <t-tab-item title="تب صفرم" eager>
        <tab-item-child-test></tab-item-child-test>
      </t-tab-item>

      <t-tab-item :count="1" value="first-tab" title="تب اول">
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
        از طراحان گرافیک است.
      </t-tab-item>
      <t-tab-item :count="2" title="تب دوم">
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
        از طراحان گرافیک است.
      </t-tab-item>
      <t-tab-item :count="3" title="تب سوم">
        زمان مورد نیاز شامل حروفچینی دستاوردهای اصلی و جوابگوی سوالات پیوسته اهل
        دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.
      </t-tab-item>
      <t-tab-item :count="1" title="تب چهارم">
        زمان مورد نیاز شامل حروفچینی دستامورد استفاده قرار گیرد.
      </t-tab-item>
    </t-tabs>

    <h3 class="my-3">with custom header</h3>
    <t-tabs v-model="customTab">
      <template #title="{title,selected,count}">
        <div
          class="mx-2 cursor-pointer min-w-max"
          :class="{ 'text-primary': selected }"
        >
          <div
            class="w-6 h-6  rounded-full items-center justify-center  text-white bg-gray-500"
          >
            {{ count }}
          </div>
          {{ title }}
        </div>
      </template>
      <t-tab-item :count="1" value="first-tab" eager title="tab1">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </t-tab-item>
      <t-tab-item :count="2" title="tab2">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English. Many desktop publishing packages and web
        page editors now use Lorem Ipsum as their default model text, and a
        search for 'lorem ipsum' will uncover many web sites still in their
        infancy. Various versions have evolved over the years, sometimes by
        accident, sometimes on purpose (injected humour and the like).
      </t-tab-item>
      <t-tab-item :count="3" title="tab3">
        Contrary to popular belief, Lorem Ipsum is not simply random text. It
        has roots in a piece of classical Latin literature from 45 BC, making it
        over 2000 years old. Richard McClintock, a Latin professor at
        Hampden-Sydney College in Virginia, looked up one of the more obscure
        Latin words, consectetur, from a Lorem Ipsum passage, and going through
        the cites of the word in classical literature, discovered the
        undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33
        of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by
        Cicero, written in 45 BC. This book is a treatise on the theory of
        ethics, very popular during the Renaissance. The first line of Lorem
        Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section
        1.10.32.
      </t-tab-item>
      <t-tab-item :count="1" title="tab4">
        There are many variations of passages of Lorem Ipsum available, but the
        majority have suffered alteration in some form, by injected humour, or
        randomised words which don't look even slightly believable. If you are
        going to use a passage of Lorem Ipsum, you need to be sure there isn't
        anything embarrassing hidden in the middle of text. All the Lorem Ipsum
        generators on the Internet tend to repeat predefined chunks as
        necessary, making this the first true generator on the Internet. It uses
        a dictionary of over 200 Latin words, combined with a handful of model
        sentence structures, to generate Lorem Ipsum whi
      </t-tab-item>
    </t-tabs>
  </div>

  <div class="flex items-center flex-col space-y-4">
    <div class="w-1/2">
      <div>#zia</div>
      <t-card
        title="ورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است."
        description="لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربر"
      >
      </t-card>
    </div>
    <div class="w-full md:w-1/2">
      <div>#zia</div>
      <t-stepper v-model="stepper" :items="stepperItems"></t-stepper>
      <div class="my-2">
        <div class="mb-1">custom stepper</div>
        <t-stepper v-model="stepper" :items="stepperItems" clickable>
          <template #label="{isComplete,isActive}">
            <div v-if="isComplete" class="mt-1 mr-1">
              <t-icon name="check"></t-icon>
            </div>
            <div v-else-if="isActive">
              <div class="w-4 h-4 bg-primary-400 rounded-full"></div>
            </div>
            <div v-else class="mt-1 mr-1">
              <t-icon name="lock"></t-icon>
            </div>
          </template>
        </t-stepper>
      </div>
    </div>

    <div class="my-4 w-full">
      <div>#zia</div>
      <div class="bg-gray-100 pl-6 py-5 sm:p-8">
        <t-timeline
          v-model="stepper"
          :items="stepperItems"
          :clickable="true"
        ></t-timeline>
      </div>
    </div>
    <div class="my-4 w-full">
      <div>#zia</div>
      <t-fade allocate-space :show="fade">
        <div>
          متن تصادفی
        </div>
      </t-fade>
      <t-button @click="fade = !fade">fade toggle</t-button>
    </div>

    <div>
      <div>#zia</div>

      <t-tooltip
        message="test hover message for you"
        variant="danger"
        position="right"
      >
        <t-button variant="danger" outline ripple>hover on me</t-button>
      </t-tooltip>

      <div class="my-4">with v-model</div>
      <t-tooltip
        v-model="tooltip"
        message="test hover message for you"
        variant="danger"
        position="right"
        :hover="false"
      >
        <t-button
          @mouseover="tooltip = true"
          @mouseleave="tooltip = false"
          variant="danger"
          outline
          ripple
          >hover on me
        </t-button>
      </t-tooltip>
    </div>
    <div class="w-60 my-4">
      <div>#zia</div>
      <t-progress-bar :value="30"></t-progress-bar>
    </div>
    <div class="w-60 my-2">
      <div>#zia</div>
      <t-toast
        message="There are many variations of passages of Lorem Ipsum available, but the"
      ></t-toast>
    </div>
    <div>
      <div>#Ali</div>
      <t-button variant="warning" icon="accessible" outline disabled>
        some text
      </t-button>
    </div>
    <div>
      <div>#zia</div>
      <t-number-picker
        :max="5"
        :min="2"
        v-model="numberPickerCount"
      ></t-number-picker>
      <h4 class="my-2">custom number picker</h4>
      <t-number-picker loading :max="5" :min="2" v-model="numberPickerCount">
        <template #plus="{click}">
          <div
            class="cursor-pointer w-10 border-gray-200 rounded-sm border-2"
            @click="click"
          >
            +
          </div>
        </template>
        <template #text="{value,loading}">
          <template v-if="loading">
            <div class="p-2">
              <t-loading
                type="spinner"
                size="sm"
                variant="secondary"
              ></t-loading>
            </div>
          </template>
          <div v-else class="w-8 font-light text-gray-500">
            {{ value }}
          </div>
        </template>
        <template #minus="{click}">
          <div
            class="cursor-pointer w-10 border-gray-200 rounded-sm border-2"
            @click="click"
          >
            -
          </div>
        </template>
      </t-number-picker>
    </div>

    <div>
      <div>#zia</div>
      <t-modal
        max-size="lg"
        teleport-to="#modal-content"
        v-model="modal"
        :close-callback="modalCloseCallback"
      >
        <!--        <template #closeButton="attrs">-->
        <!--          <t-button v-bind="attrs">close</t-button>-->
        <!--        </template>-->
        <p class="text-gray-800">
          Are you sure you want you delete your account? This action cannot be
          undone.
        </p>

        <div class="text-right mt-4">
          <button
            @click="modal = false"
            class="px-4 py-2 text-sm text-gray-600 focus:outline-none hover:underline"
          >
            Cancel
          </button>
          <button
            class="mr-2 px-4 py-2 text-sm rounded text-white bg-red-500 focus:outline-none hover:bg-red-400"
          >
            Delete
          </button>
        </div>
      </t-modal>
      <t-button @click="modal = true">open modal</t-button>
    </div>

    <div>
      <div>#zia</div>
      <t-drawer
        :has-close-button="true"
        max-size="md"
        teleport-to="#modal-content"
        v-model="drawer"
      >
        <div>
          <div class="h-96">hi</div>
          <div class="h-96">bye</div>
          <div class="h-96">تست</div>
          <div class="h-90 text-gray-800 bg-gray-300">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است.
          </div>
        </div>
      </t-drawer>
      <t-button @click="drawer = true" variant="success">open drawer</t-button>
    </div>

    <div>
      <div>#zia</div>
      <t-bottom-sheet
        :has-close-button="false"
        teleport-to="#modal-content"
        v-model="bottomSheet"
        title="تست عنوان"
      >
        <!--        <template #closeButton="attrs">-->
        <!--          <t-button v-bind="attrs">close</t-button>-->
        <!--        </template>-->
        <div>
          <div class="h-96">hi</div>
          <div class="h-96">bye</div>
          <div class="h-96">تست</div>
          <div class="text-gray-800 bg-gray-300">
            لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
            استفاده از طراحان گرافیک است.
          </div>
        </div>
      </t-bottom-sheet>
      <t-button @click="bottomSheet = true" variant="warning"
        >open bottomSheet
      </t-button>
    </div>

    <div>
      <div>#zia</div>
      <t-switch
        v-model="switchModel"
        :true-value="1"
        :false-value="0"
        label="فقط کالاهای موجود"
      ></t-switch>

      <!--      <t-switch-->
      <!--        v-model="switchModel"-->
      <!--        :value="[{ a: 1 }]"-->
      <!--        label="فقط کالاهای موجود"-->
      <!--      ></t-switch>-->
      <!--      <t-switch-->
      <!--        v-model="switchModel"-->
      <!--        :value="{ a: 2 }"-->
      <!--        label="فقط کالاهای موجود"-->
      <!--      ></t-switch>-->
    </div>

    <div>
      <div>#zia</div>
      <t-checkbox
        v-model="checkboxModel"
        :true-value="1"
        :false-value="0"
        label="سامسونگ"
      ></t-checkbox>

      <t-checkbox v-model="checkboxModel" :true-value="1" :false-value="0">
        <template #label>
          <div class="mr-2">my custom label</div>
        </template>
      </t-checkbox>
    </div>
    <div class="w-full">
      <div>#zia</div>
      <t-skeleton type="card" class="max-w-sm"></t-skeleton>
      <div class="my-4"></div>
      <t-skeleton type="avatar-list" class="max-w-sm"></t-skeleton>
      <div class="my-4"></div>
      <t-skeleton type="one-line" class="max-w-sm"></t-skeleton>
      <div class="my-4"></div>
      <t-skeleton type="three-line" class="max-w-sm"></t-skeleton>
      <div class="my-4"></div>
      <t-skeleton type="image" class="max-w-sm"></t-skeleton>
      <div class="my-4"></div>
      <div class="my-2">custom</div>
      <t-skeleton
        type="custom"
        :border="false"
        :shadow="false"
        class="max-w-sm"
      >
        <div class="flex items-center space-x-reverse space-x-4">
          <div class="rounded-full w-12 h-12 bg-gray-300"></div>
          <div class="rounded-sm w-9/12 h-4 bg-gray-300"></div>
        </div>
      </t-skeleton>
    </div>

    <div>
      <div>#zia</div>
      <t-loading></t-loading>
    </div>
    <div>
      <div>#zia</div>
      <t-count-down-timer v-model="timer"></t-count-down-timer>
      <div class="my-2">custom</div>
      <t-count-down-timer v-model="timer">
        <template
          #default="{day,hideDays,hours,hideHours,minutes,hideMinutes,seconds,hideSeconds}"
        >
          <div class="flex space-x-6 ltr">
            <div class="flex items-center space-x-2" v-if="!hideDays">
              <div
                class="bg-primary-400 text-white w-10 h-10 flex justify-center items-center rounded-sm"
              >
                {{ day }}
              </div>
              <div class="font-medium">:</div>
            </div>

            <div class="flex items-center space-x-2" v-if="!hideHours">
              <div
                class="bg-primary-400 text-white w-10 h-10 flex justify-center items-center rounded-sm"
              >
                {{ hours }}
              </div>
              <div class="font-medium">:</div>
            </div>

            <div class="flex items-center space-x-2" v-if="!hideMinutes">
              <div
                class="bg-primary-400 text-white w-10 h-10 flex justify-center items-center rounded-sm"
              >
                {{ minutes }}
              </div>
              <div class="font-medium">:</div>
            </div>

            <div class="flex items-center space-x-2" v-if="!hideSeconds">
              <div
                class="bg-primary-400 text-white w-10 h-10 flex justify-center items-center rounded-sm"
              >
                {{ seconds }}
              </div>
            </div>
          </div>
        </template>
      </t-count-down-timer>
    </div>
    <div>
      <div>#zia</div>
      <t-range-slider
        :min="0"
        :max="10000"
        v-model:max-value="rangeMax"
        v-model:min-value="rangeMin"
      ></t-range-slider>
      min: {{ Math.floor(rangeMin) }} max: {{ Math.floor(rangeMax) }}
    </div>
    <div>
      <div>#zia</div>
      <t-toast v-model="toast1">
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
        از طراحان گرافیک است.
      </t-toast>
      <t-toast v-model="toast2">
        لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
        از طراحان گرافیک است.
      </t-toast>
      <t-button @click="toast1 = true">
        show toast1
      </t-button>
      <t-button @click="toast2 = true">show toast2</t-button>
    </div>

    <div class="my-2">
      <div>#zia</div>
      <div class="flex w-full space-x-reverse space-x-3 mt-4">
        <t-radio
          label="تست ۱"
          variant="danger"
          v-model="radioModel"
          value="test1"
        ></t-radio>
        <t-radio
          label="تست ۲"
          variant="danger"
          v-model="radioModel"
          :value="{ a: 'test2' }"
        ></t-radio>
      </div>
      <h3 class="mt-8 mb-2">custom radio</h3>
      <div class="flex w-full space-x-reverse space-x-3 mb-4">
        <t-radio
          variant="danger"
          v-model="radioModel2"
          value="test1"
          hide-input
        >
          <template #label="{isChecked}">
            <div
              class="px-4 py-2 border-2 rounded-xs"
              :class="{ 'border-success': isChecked }"
            >
              تست ۱
            </div>
          </template>
        </t-radio>
        <t-radio
          variant="danger"
          v-model="radioModel2"
          :value="{ a: 'test2' }"
          active-class="border-primary"
          class="px-4 py-2 border-2 rounded-xs"
        >
          <template #label>
            <div class="mr-2">
              تست ۲
            </div>
          </template>
        </t-radio>
      </div>
    </div>
    <div>
      <div>#zia</div>
      <t-text-input
        class="mb-4"
        v-model="textInputValue"
        placeholder="enter a text for debouncing"
      ></t-text-input>
      textInputValue: {{ textInputValue }}
      <div class="my-4"></div>
      <t-text-input
        class="mb-4"
        v-model="textInputFormat"
        placeholder="enter a text for debouncing"
      ></t-text-input>
      textInputValue: {{ textInputFormat }}
    </div>

    <div>
      <div>#zia</div>
      <t-animate
        class="transform"
        start="translate-x-1/2 opacity-1"
        end="translate-y-full opacity-0"
        :show="animate"
        allocate-space
      >
        <div class="w-10 h-10 rounded-full bg-warning"></div>
      </t-animate>
      <t-button @click="animate = !animate">show</t-button>
    </div>

    <div>
      <div>#zia</div>
      <t-table
        :items="[
          { age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          {
            age: 21,
            first_name: 'Larsen',
            last_name: 'Shaw',
            _rowVariant: 'warning',
            _cellVariants: { age: 'success' }
          },
          {
            age: 89,
            first_name: 'Geneva',
            last_name: 'Wilson',
            _showDetails: true
          },
          { age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]"
        :fields="[
          { key: 'showDetails', label: 'show details' },
          { key: 'first_name', label: 'first name' },
          { key: 'last_name', label: 'last name', sortable: true },
          { key: 'age', label: 'age', sortable: true }
        ]"
      >
        <template #cell(showDetails)="{toggleDetails,item}">
          <t-button class="text-xs" @click="toggleDetails"
            >toggleDetails ({{ item.age }})</t-button
          >
          <!--          <span>row: {{row}}</span>-->
          <!--          <span>column: {{column}}</span>-->
        </template>
        <template #cell="{value}">
          <span class="text-gray-700">
          {{ value }}
          </span>
        </template>
        <template #rowDetails>
          <t-card
            data-container-delete="text-right"
            data-container-add="text-gray-500"
            data-title-delete="text-danger"
            title="hello world"
            >this is test text</t-card
          >
        </template>
      </t-table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect } from "vue";
import TButton from "@/components/tailwind/button/TButton.vue";
import TModal from "@/components/tailwind/modal/TModal.vue";
import { ref } from "vue";
import TNumberPicker from "@/components/tailwind/numberPicker/TNumberPicker.vue";
import TSwitch from "@/components/tailwind/switch/TSwitch.vue";
import TCheckbox from "@/components/tailwind/checkbox/TCheckbox.vue";
import TSkeleton from "@/components/tailwind/skeleton/TSkeleton.vue";
import TRadio from "@/components/tailwind/radio/TRadio.vue";
import TDrawer from "@/components/tailwind/drawer/TDrawer.vue";
import TLoading from "@/components/tailwind/loading/TLoading.vue";
import TBottomSheet from "@/components/tailwind/bottomSheet/TBottomSheet.vue";
import TProgressBar from "@/components/tailwind/progress/TProgressBar.vue";
import TTabs from "@/components/tailwind/tab/TTabs.vue";
import TTabItem from "@/components/tailwind/tab/TTabItem.vue";
import TabItemChildTest from "@/components/TabItemChildTest.vue";
import TToast from "@/components/tailwind/toast/TToast.vue";
import TStepper from "@/components/tailwind/stepper/TStepper.vue";
import TIcon from "@/components/tailwind/TIcon.vue";
import TTooltip from "@/components/tailwind/tooltip/TTooltip.vue";
import TCard from "@/components/tailwind/card/TCard.vue";
import TTimeline from "@/components/tailwind/timeline/TTimeline.vue";
import TAccordion from "@/components/tailwind/accoirdion/TAccordion.vue";
import TRangeSlider from "@/components/tailwind/rangeSlider/TRangeSlider.vue";
import TCountDownTimer from "@/components/tailwind/timer/TCountDownTimer.vue";
import TFade from "@/components/tailwind/fade/TFade.vue";
import TTextInput from "@/components/tailwind/text-input/TTextInput.vue";
import { useDebouncedRef } from "@/compositionFunctions/expose/debounce";
import { useFormatRef } from "@/compositionFunctions/expose/format";
import TAnimate from "@/components/tailwind/animate/TAnimate.vue";
import TTable from "@/components/tailwind/table/TTable.vue";
// import TabItemChildTest from "@/components/TabItemChildTest.vue";
export default defineComponent({
  name: "App",
  components: {
    TTable,
    TAnimate,
    TTextInput,
    TFade,
    TCountDownTimer,
    TRangeSlider,
    TTooltip,
    TIcon,
    TStepper,
    TToast,
    TabItemChildTest,
    // TabItemChildTest,
    TTabItem,
    TTabs,
    TProgressBar,
    TBottomSheet,
    TLoading,
    TDrawer,
    TRadio,
    TSkeleton,
    TCheckbox,
    TSwitch,
    TModal,
    TNumberPicker,
    TButton,
    TCard,
    TTimeline,
    TAccordion
  },
  setup() {
    const numberPickerCount = ref<number>(3);
    const switchModel = ref("");
    const checkboxModel = ref("");
    const radioModel = ref<Record<string, any> | string>("");
    const radioModel2 = ref<Record<string, any> | string>("");
    const modal = ref<boolean>(false);
    const drawer = ref<boolean>(false);
    const bottomSheet = ref<boolean>(false);
    const toast1 = ref<boolean>(false);
    const toast2 = ref<boolean>(false);
    const modalCloseCallback = () => {
      console.log("modal has been closed");
      return true;
    };
    // watchEffect(() => {
    //   console.log("switchModel", switchModel.value);
    //   console.log("checkboxModel", checkboxModel.value);
    // });
    // watchEffect(() => {
    //   console.log("radioModel is : ", radioModel.value);
    // });
    const tabs = ref<number | string>("first-tab");
    const customTab = ref<number | string>(3);
    watchEffect(() => {
      console.log("tabs", tabs.value);
    });
    // setTimeout(() => {
    //   tabs.value = 3;
    // }, 1000);
    const stepper = ref("t");
    const stepperItems = [
      { label: "p", text: "personal" },
      { label: "t", text: "tailwind", value: "t" },
      { label: "v", text: "vue", locked: true }
    ];
    const tooltip = ref(false);
    const accourdionItems = ref([
      {
        title: "title is",
        text:
          "you include the reCAPTFFCHA branding visibly in the user flow. Please include the following text: Yes, please use",
        selected: true
      },
      {
        title: "title is",
        text:
          "o do this, load the v3 site key as documented, and then explicitly renderv2 using grecaptcha.render. You are allowed to hide the badge as long asyou include the reCAPTCHA branding visibly in the user flow. Pleaseinclude the following text: Yes, please use"
      }
    ]);
    // setTimeout(() => {
    //   accourdionItems.value.push({
    //     title: "added item is",
    //     text:
    //       "you include the reCAPTFFCHA branding visibly in the user flow. Please include the following text: Yes, please use",
    //     selected: true
    //   });
    // }, 500);
    const timer = ref(60 * 60 * 24 + 4);
    const rangeMax = ref(8000);
    const rangeMin = ref(0);
    const fade = ref(0);
    const textInputValue = useDebouncedRef("");
    const textInputFormat = useFormatRef("12345");
    const animate = ref(false);
    return {
      animate,
      textInputFormat,
      textInputValue,
      fade,
      timer,
      rangeMax,
      rangeMin,
      accourdionItems,
      tooltip,
      stepper,
      stepperItems,
      toast1,
      toast2,
      customTab,
      tabs,
      numberPickerCount,
      switchModel,
      modal,
      drawer,
      modalCloseCallback,
      checkboxModel,
      radioModel,
      radioModel2,
      bottomSheet
    };
  }
});
</script>
