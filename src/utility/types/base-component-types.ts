export namespace BreadCrumb {
  export type Root = { text: string; url: string; active: boolean }[];
}
export namespace SwitchAndCheckbox {
  export type Value = any[] | string | number | boolean | object; //also used in radio
}

export namespace DropDown {
  export type stringForm = string[]
  export interface ObjectForm {
    label: string; value: any 
  }

  export type Root = stringForm | ObjectForm[]
}