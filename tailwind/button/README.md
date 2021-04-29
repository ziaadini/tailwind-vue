### props

| name         | Type    | Default | Description                                                          |
| ------------ | ------- | ------- | -------------------------------------------------------------------- |
| rounded      | Boolean | false   | make button rounded                                                  |
| fab          | Boolean | false   | add fab ability to button                                            |
| variant      | string  | white   | background color of the button                                       |
| size         | string  | md      | size of the button                                                   |
| color        | string  | ""      | when used default variant would be ignored and color is used instead |
| icon         | string  | ""      | right icon of button                                                 |
| disabled     | boolean | false   | disable button                                                       |
| outline      | boolean | false   | outline color of button                                              |
| ripple       | boolean | false   | show a ripple effect when clicked                                    |
| to           | object  | string  | ""                                                                   |
| nuxt         | boolean | false   | `nuxt-link` instead of `router-link` when passing `to` prop          |
| full         | boolean | false   | full width button                                                    |
| loading      | boolean | false   | to show a loading in button                                          |
| loadingProps | object  | {}      | loading component props                                              |

### slots

| name    | description          |
| ------- | -------------------- |
| default | inner text of button |
| loading | for custom loading   |
