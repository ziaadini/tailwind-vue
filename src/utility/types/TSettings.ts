export interface TSettings {
  tabs?: {
    container?: TSettingItem;
    headerContainer?: TSettingItem;
    arrow?: TSettingItem;
    nav?: TSettingItem;
    header?: TSettingItem;
  };
  card?: {
    title?: TSettingItem;
    description?: TSettingItem;
    container?: TSettingItem;
  };
  accordion?: {
    title?: TSettingItem;
    titleEnabled?: TSettingItem;
    titleDisabled?: TSettingItem;
    text?: TSettingItem;
  };
  alert?: {
    container?: TSettingItem;
    innerContainer?: TSettingItem;
    wrapper?: TSettingItem;
    icon?: TSettingItem;
    close?: TSettingItem;
  };
  badge?: {
    container?: TSettingItem;
  };
  bottomSheet?: {
    backDrop?: TSettingItem;
    container?: TSettingItem;
    swiperContainer?: TSettingItem;
    swiper?: TSettingItem;
    header?: TSettingItem;
    title?: TSettingItem;
    close?: TSettingItem;
    contentContainer?: TSettingItem;
  };
  breadcrumb?: {
    container?: TSettingItem;
    active?: TSettingItem;
    link?: TSettingItem;
    slash?: TSettingItem;
  };
  button?: {
    container?: TSettingItem;
    contentContainer?: TSettingItem;
    icon?: TSettingItem;
    loadingContainer?: TSettingItem;
    loading?: TSettingItem;
  };
  checkbox?: {
    container?: TSettingItem;
    inputContainer?: TSettingItem;
    label?: TSettingItem;
  };
  drawer?: {
    backDrop?: TSettingItem;
    container?: TSettingItem;
    header?: TSettingItem;
    title?: TSettingItem;
    close?: TSettingItem;
    contentContainer?: TSettingItem;
  };
  icon?: {
    container?: TSettingItem;
  };
  loading?: {
    container?: TSettingItem;
    item?: TSettingItem;
  };
  numberPicker?: {
    plus?: TSettingItem;
    minus?: TSettingItem;
    text?: TSettingItem;
    loading?: TSettingItem;
  };
  progressBar?: {
    container?: TSettingItem;
    progress?: TSettingItem;
  };
  radio?: {
    container?: TSettingItem;
    inputContainer?: TSettingItem;
    label?: TSettingItem;
  };
  rangeSlider?: {
    container?: TSettingItem;
    innerContainer?: TSettingItem;
    pan?: TSettingItem;
    activePan?: TSettingItem;
    minCircle?: TSettingItem;
    maxCircle?: TSettingItem;
  };
  skeleton?: {
    avatarListContainer?: TSettingItem;
    avatarListInnerContainer?: TSettingItem;
    avatarListCircle?: TSettingItem;
    avatarListLine?: TSettingItem;
    imageContainer?: TSettingItem;
    imageInnerContainer?: TSettingItem;
    image?: TSettingItem;
    cardContainer?: TSettingItem;
    cardInnerContainer?: TSettingItem;
    cardImage?: TSettingItem;
    cardLine?: TSettingItem;
    lineContainer?: TSettingItem;
    line?: TSettingItem;
    threeLineContainer?: TSettingItem;
    threeLineInnerContainer?: TSettingItem;
    threeLine?: TSettingItem;
    customContainer?: TSettingItem;
    custom?: TSettingItem;
  };
  stepper?: {
    container?: TSettingItem;
    itemContainer?: TSettingItem;
    circle?: TSettingItem;
    activeCircle?: TSettingItem;
    completeCircle?: TSettingItem;
    text?: TSettingItem;
    line?: TSettingItem;
  };
  timeline?: {
    container?: TSettingItem;
    line?: TSettingItem;
    itemContainer?: TSettingItem;
    emptySpace?: TSettingItem;
    circle?: TSettingItem;
    activeCircle?: TSettingItem;
    completeCircle?: TSettingItem;
    item?: TSettingItem;
  };
  switch?: {
    container?: TSettingItem;
    pan?: TSettingItem;
    circle?: TSettingItem;
    label?: TSettingItem;
  };
  countDownTimer?: {
    container?: TSettingItem;
    digit?: TSettingItem;
    separator?: TSettingItem;
  };
  toast?: {
    container?: TSettingItem;
    show?: TSettingItem;
    hide?: TSettingItem;
  };
  tooltip?: {
    container?: TSettingItem;
    innerContainer?: TSettingItem;
    triangle?: TSettingItem;
    message?: TSettingItem;
  };
  triangle?: {
    triangle?: TSettingItem;
  };
  table?: {
    cardBreakpoint?: TSettingItem;
    cardContainer?: TSettingItem;
    cardCell?: TSettingItem;
    cardCellInnerContainer?: TSettingItem;
    cardCounter?: TSettingItem;
    cardCollapse?: TSettingItem;
    breakpoint?: TSettingItem;
    container?: TSettingItem;
    innerContainer?: TSettingItem;
    shadowBox?: TSettingItem;
    table?: TSettingItem;
    thead?: TSettingItem;
    headTr?: TSettingItem;
    headCounter?: TSettingItem;
    tbody?: TSettingItem;
    tr?: TSettingItem;
    counter?: TSettingItem;
    detailsTr?: TSettingItem;
    detailsTd?: TSettingItem;
  };
  th?: {
    container?: TSettingItem;
    cardContainer?: TSettingItem;
    innerContainer?: TSettingItem;
    cardInnerContainer?: TSettingItem;
    sort?: TSettingItem;
    cardSort?: TSettingItem;
    arrowUp?: TSettingItem;
    cardArrowUp?: TSettingItem;
    arrowDown?: TSettingItem;
    cardArrowDown?: TSettingItem;
    label?: TSettingItem;
    cardLabel?: TSettingItem;
  };
  pagination?: {
    container?: TSettingItem;
    ul?: TSettingItem;
    li?: TSettingItem;
    anchor?: TSettingItem;
    itemContainer?: TSettingItem;
    iconContainer?: TSettingItem;
    icon?: TSettingItem;
    page?: TSettingItem;
  };
  dropdown?: {
    parent: TSettingItem;
    parentWrapper: TSettingItem;
    parentWrapperText: TSettingItem;
    parentWrapperTriangle: TSettingItem;
    children: TSettingItem;
    childrenScrollbar: TSettingItem;
    childrenItem: TSettingItem;
  };
  rate?: {
    wrapper: TSettingItem;
  };
  textinput?: {
    label: TSettingItem;
    wrapper: TSettingItem;
    leftIcon: TSettingItem;
    input: TSettingItem;
    rightIcon: TSettingItem;
  };
  menu: {
    trigger: TSettingItem;
    items: TSettingItem;
  };
  carousel: {
    wrapper: TSettingItem;
    images: TSettingItem;
    imageItem: TSettingItem;
    rightBtn: TSettingItem;
    leftBtn: TSettingItem;
    caption: TSettingItem;
  };
}

export interface TSettingItem {
  delete?: string[];
  add?: string;
  replace?: { [key: string]: string };
}
