export namespace BreadCrumb {
  export type Root = { text: string; url: string; active: boolean }[];
}
export namespace SwitchAndCheckbox {
  export type Value = any[] | string | number | boolean | object; //also used in radio
}
