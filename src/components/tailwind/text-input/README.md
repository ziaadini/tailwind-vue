### props

| name           | Type    | Default   | Description                                             |
| -------------- | ------- | --------- | ------------------------------------------------------- |
| label          | string  | ""        | label of text input                                     |
| type           | string  | "text"    | html input type                                         |
| input-mode     | string  | "text"    | html input, inputmode                                   |
| variant        | string  | "primary" | variant is the color and background color of text input |
| leftIcon       | string  | ""        | left Icon of text input                                 |
| leftIconColor  | string  | ""        | left Icon color of text input                           |
| rightIcon      | string  | ""        | right Icon of text input                                |
| rightIconColor | string  | ""        | right Icon color of text input                          |
| rounded        | boolean | false     | makes text input rounded                                |
| outline        | boolean | true      | makes text input with outline styles                    |
| align          | string  | right     | aligns text inside text input                           |
| disabled       | boolean | false     | disables the text input and avoid typing in it          |
| error          | boolean | false     | changes input element color for error state             |

### slots

| name | description |
| ---- | ----------- |


### model modifiers

| name   | description                         | arguments                                                                                    |
| ------ | ----------------------------------- | -------------------------------------------------------------------------------------------- |
| format | format numbers with given arguments | two arguments: 1- separator: a character, 2- number of characters to separate with separator |
