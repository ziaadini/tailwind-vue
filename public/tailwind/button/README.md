### props
| Name | Type | Default | Description |
| ------------ | ------------ | ------------ | ------------ |
| rounded | Boolean | false | make button rounded |
| variant | string | primary | background color of the button |
| icon | string | "" | right icon of button |
| outline | boolean | false | outline color of button |
| ripple | boolean | false | show a ripple effect when clicked |
| to | object|string | "" | button as router link  |
| nuxt | boolean | false | `nuxt-link` instead of `router-link` when passing `to` prop  |
| full | boolean | false | full width button |
| loading | boolean | false | to show a loading in button |
| loadingProps | object | {} | props for loading component |

### slots
| name | description 
| ------------ | ------------ |
| default | inner text of button |
| loading | for custom loading |

