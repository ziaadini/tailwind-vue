| Props | Type | Default | Description |
| ------------ | ------------ | ------------ | ------------ |
| v-model | String, Number, Boolean | - | v-model supported with stepper |
| items | Array of Object | - | for example : [{label:"n",text:"nuxt",value:"N"},{ label: "v", text: "vue", locked: true}] |
| label | string | label | witch key inside object use for label |
| value | string | value | witch key inside object use for value |
| text | string | text | witch key inside object use for text |
| variant | string | primary | pass a valid variant color |
| clickable | boolean | false | go to next step when user clicking on it |



### slots
| name | description
| ------------ | ------------ |
| circle | for custom styled circle|
| label | for custom styled label|
| text | for custom styled text|

component will pass any useful information to slots take a look at this lines from core

```vue
<slot name="circle" 
      :isActive="isActive(index)"
      :isComplete="isComplete(index)"
      v-bind="item"
      :index="index"
></slot>
```
note that item is your current object you passed inside array
and index is current index of array

##### slot example

```vue
<t-stepper v-model="stepper" :items="stepperItems" clickable>
    <template #label="{isComplete,isActive}">
      <div v-if="isComplete" class="mt-1 mr-1">
        <t-icon name="check"></t-icon>
      </div>
      <div v-else-if="isActive">
        <div class="w-4 h-4 bg-primary-400 rounded-full"></div>
      </div>
      <div v-else class="mt-1 mr-1"><t-icon name="lock"></t-icon></div>
    </template>
</t-stepper>
```