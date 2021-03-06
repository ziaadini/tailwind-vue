import { variants } from "@/utility/css-helper";
export namespace BreadCrumb {
  export type Root = { text?: string; url?: string; active?: boolean }[];
}
export namespace SwitchAndCheckbox {
  export type Value = any[] | string | number | boolean | object; //also used in radio
}

export namespace DropDown {
  export type stringForm = string[];
  export interface ObjectForm {
    label: string;
    value: any;
  }

  export type Root = stringForm | ObjectForm[];
}

export namespace Table {
  export interface HeaderItem {
    key?: string;
    label?: string;
    sortable?: boolean;
    variant?: string;
  }
  export interface Item {
    _cellVariants?: { [key: string]: variants };
    _rowVariant?: string;
    _showDetails?: boolean;
    [key: string]: any;
  }
  export enum SortEnum {
    ASC = "asc",
    DESC = "desc"
  }
}
