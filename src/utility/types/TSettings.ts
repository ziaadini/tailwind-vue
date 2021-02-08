export interface TSettings {
  tabs?: {
    header?: TSettingItem;
  };
  card?: {
    title?: TSettingItem;
    description?: TSettingItem;
    container?: TSettingItem;
  };
  accordion?: {
    title?: TSettingItem;
    "title-enabled"?: TSettingItem;
    "title-disabled"?: TSettingItem;
    text?: TSettingItem;
  };
  alert?: {
    container?: TSettingItem;
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
}

export interface TSettingItem {
  delete?: string[];
  add?: string;
  replace?: { [key: string]: string };
}
