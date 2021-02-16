### props
| name | Type | Default | Description |
| ------------ | ------------ | ------------ | ------------ |
| v-model | Boolean | - | v-model supported with tooltip |
| variant | string | primary | background color variant |
| position | string | top | show on witch side of element |
| message | string | '' | message you want to show |
| hover | boolean | true | set to false if you want to control with v-model |

### slots
| name | description 
| ------------ | ------------ |
| default | the trigger you want to show tooltip on it |
| message | if you need more than a simple message (also we will pass close method to it). |

