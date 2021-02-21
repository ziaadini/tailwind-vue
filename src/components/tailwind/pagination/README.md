| Props | Type | Default | Description |
| ------------ | ------------ | ------------ | ------------ |
| v-model | number | 1 | active page |
| totalCount | number | 0 | total records count |
| perPage | number | 20 | number of items in each page |
| pageRange | number | 2 | number of of page around active page |
| variant | string | primary | background color for active item |
| colorClass | string | "" | pass class to ignore variant |
| nuxt | boolean | false | put `nuxt-link` instead normal link (v-model not working in this case)  |
| vue | boolean | false | put `router-link` instead normal link (v-model not working in this case)  |
| queryName | string | "page" | query name when using nuxt or vue link |
| appendQuery | boolean | true | append query when using nuxt or vue link |
| formName | string | "" | container key for query make sure using qs for stringify of parse your queries |

### slots
| name | description
| ------------ | ------------ |
| prev | slot for prev button |
| item | slot for item number pass page as -> value |
| page | slot for page number pass page as -> value |
| next | slot for next button |

