export interface TSettings {
  tabs?: {
    header?: TSettingItem;
  };
  card?:{
    title?:TSettingItem;
    description?:TSettingItem;
  }
}

export interface TSettingItem {
  delete?: string[];
  add?: string;
  replace: { [key: string]: string };
}
