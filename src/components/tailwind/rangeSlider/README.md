### props

| name | Type | Default | Description |
| ------------ | ------------ | ------------ | ------------ |
| v-model:minValue | Number | 0 | v-model for min value |
| v-model:maxValue | Number | 0 | v-model for max value |
| min | Number | 0 | min value (range) |
| max | Number | 0 | max value (range) |
| disableMin | Boolean | false | don't show min circle |
| disableMax | Boolean | false | don't show min circle |
| variant | string | primary | background color variant |

### slots

| name | description
| ------------ | ------------ |
| min-inner | if you want set any things inside min circle |
| max-inner | if you want set any things inside max circle |

inside core : 
```vue
<slot name="max-inner" :maxValue="maxValue"></slot>
<slot name="min-inner" :minValue="minValue"></slot>
```
