export interface TSettings {
  tabs?: {
    header: TSettingItem;
  };
}

export interface TSettingItem {
  delete?: string[];
  add?: string;
  replace: { [key: string]: string };
}
