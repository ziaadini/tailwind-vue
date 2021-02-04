export interface TSettings {
  tabs?: {
    header?: TSettingItem;
  };
  card?: {
    title?: TSettingItem;
    description?: TSettingItem;
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
}

export interface TSettingItem {
  delete?: string[];
  add?: string;
  replace?: { [key: string]: string };
}
