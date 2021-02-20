| Props | Type | Default | Description |
| ------------ | ------------ | ------------ | ------------ |
| v-model | number |1 | active page |
| totalCount | number | 0 | total record counts |
| perPage | number | 20 | number of items in each page |
| pageRange | number | 2 | number of of page around active page |
| variant | string | primary | background color for active item |
| colorClass | string | "" | pass class to ignore variant |

### slots
| name | description
| ------------ | ------------ |
| prev | slot for prev button |
| item | slot for item number pass page as -> value |
| page | slot for page number pass page as -> value |
| next | slot for next button |

