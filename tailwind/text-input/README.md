### props

| name           | Type    | Default   | Description                                             |
| -------------- | ------- | --------- | ------------------------------------------------------- |
| variant        | string  | "primary" | variant is the color and background color of text input |
| hover          | boolean | false     | adds simple background when hovered                     |
| type           | string  | "text"    | html input type                                         |
| inputmode      | string  | "text"    | html input, inputmode                                   |
| label          | string  | ""        | label of text input                                     |
| leftIcon       | string  | ""        | left Icon of text input                                 |
| rightIcon      | string  | ""        | right Icon of text input                                |
| leftIconColor  | string  | ""        | left Icon color of text input                           |
| rightIconColor | string  | ""        | right Icon color of text input                          |
| rounded        | boolean | false     | makes text input rounded                                |
| align          | string  | right     | aligns text inside text input                           |
| disabled       | boolean | false     | disables the text input and avoid typing in it          |
| error          | boolean | false     | changes input element color for error state             |
| area           | boolean | false     | make the input element textarea                         |

### slots

| name       | description                  |
| ---------- | ---------------------------- |
| left slot  | left slot of the text input  |
| right slot | right slot of the text input |

### model modifiers

| name   | description                         | arguments                                                                                    |
| ------ | ----------------------------------- | -------------------------------------------------------------------------------------------- |
| format | format numbers with given arguments | two arguments: 1- separator: a character, 2- number of characters to separate with separator |
