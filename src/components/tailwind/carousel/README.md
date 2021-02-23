### props

| name              | Type    | Default | Description                                        |
| ----------------- | ------- | ------- | -------------------------------------------------- |
| scale             | boolean | true    | when true scale animation gets added               |
| rotate            | boolean | true    | when true rotate animation gets rotate             |
| autoPlay          | boolean | true    | auto play in the carousel                          |
| autoPlaceInterval | number  | 2000    | interval between each image change in milliseconds |
| modelValue        | number  | 0       | selected index of carousel                         |
| items             | array   | []      | items of the carousel to show                      |
| swipeThreshold    | Number  | 50      | number of the pixels needed for swipe              |
| swipeEnabled      | boolean | true    | when true carousel would change with swipe         |

### slots

| name        | description                |
| ----------- | -------------------------- |
| default     | slot for caption content   |
| rightButton | slot for right side button |
| leftButton  | slot for left side button  |

<!-- @import "[TOC]" {cmd="toc" depthFrom=1 depthTo=6 orderedList=false} -->
