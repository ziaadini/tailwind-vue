<template>
  <div class="flex flex-col items-start p-1" dir="ltr">
    <h3 class="text-5xl font-bold mb-2">Timer (CountDownTimer)</h3>
    <p class="mb-2">
      A countDownTimer is a component which is designed to count down to a
      particular event.
    </p>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Simple</h2>
      <p class="mb-2">
        With this type of component you can show simple countDownTimer.
      </p>
      <div class="mb-3">
        <t-count-down-timer v-model="timer"></t-count-down-timer>
      </div>
      <iframe
        width="100%"
        height="150"
        src="//jsfiddle.net/mohstarsos1/khcu12dz/1/embedded/html,js/dark/"
        allowfullscreen="allowfullscreen"
        allowpaymentrequest
        frameborder="0"
      ></iframe>
    </div>

    <div
      class="flex flex-col items-start mt-10 border rounded-sm p-3 w-full shadow-md"
    >
      <h2 class="text-xl font-bold mb-2">Custom</h2>
      <p class="mb-2">
        With this type of component you can custom all part of countDownTimer
        like bellow example.
      </p>
      <div class="mb-3">
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

      <iframe
        width="100%"
        height="500"
        src="//jsfiddle.net/mohstarsos1/ft5m6go0/embedded/html,js/dark/"
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
import TCountDownTimer from "@/components/tailwind/timer/TCountDownTimer.vue";

export default defineComponent({
  name: "App",
  components: {
    TCountDownTimer
  },
  setup() {
    return {};
  },
  data() {
    return {
      mdFile: "",
      timer: 60 * 60 * 24 + 4
    };
  },
  async mounted() {
    this.mdFile = await fetch("/tailwind/timer/README.md").then(res =>
      res.text()
    );
  }
});
</script>

<style lang="scss" scoped></style>
