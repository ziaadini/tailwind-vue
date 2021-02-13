| Props | Type | Default | Description |
| ------------ | ------------ | ------------ | ------------ |
| v-model | String, Number, Boolean | - | v-model supported with timeline |
| items | Array of Object | - | for example : [{label:"n",text:"nuxt",value:"N",title:"my title"},{ label: "v", text: "vue", locked: true}] |
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
| item | for custom styled item|

component will pass any useful information to slots like T