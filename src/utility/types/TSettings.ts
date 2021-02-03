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
}

export interface TSettingItem {
  delete?: string[];
  add?: string;
  replace?: { [key: string]: string };
}
