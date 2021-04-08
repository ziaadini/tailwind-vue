import { App, DefineComponent } from "vue";
export { TSettings } from "../src/utility/types/TSettings";

/**
 * Install entry point
 *
 * @param app - A target Vue app instance
 * @param options - An install options
 */
export declare function install(app: App, ...options: unknown[]): void;

declare module "tailwind-vue3" {
  export const TAccordion: DefineComponent;
  export const TAlert: DefineComponent;
  export const TAnimate: DefineComponent;
  export const TBadge: DefineComponent;
  export const TButton: DefineComponent;
  export const TBottomSheet: DefineComponent;
  export const TBreadcrumb: DefineComponent;
  export const TCard: DefineComponent;
  export const TCarousel: DefineComponent;
  export const TCheckbox: DefineComponent;
  export const TCollapsible: DefineComponent;
  export const TDrawer: DefineComponent;
  export const TDropdown: DefineComponent;
  export const TFade: DefineComponent;
  export const TIcon: DefineComponent;
  export const TImage: DefineComponent;
  export const TLoading: DefineComponent;
  export const TMenu: DefineComponent;
  export const TModal: DefineComponent;
  export const TNumberPicker: DefineComponent;
  export const numberTransformer: DefineComponent;
  export const TPagination: DefineComponent;
  export const TProgressBar: DefineComponent;
  export const TRadio: DefineComponent;
  export const TRangeSlider: DefineComponent;
  export const TRate: DefineComponent;
  export const TSearchable: DefineComponent;
  export const TSkeleton: DefineComponent;
  export const TSlider: DefineComponent;
  export const TStepper: DefineComponent;
  export const TSwitch: DefineComponent;
  export const TTabs: DefineComponent;
  export const TTabItem: DefineComponent;
  export const TTh: DefineComponent;
  export const TTable: DefineComponent;
  export const TTextInput: DefineComponent;
  export const TTimeline: DefineComponent;
  export const TCountDownTimer: DefineComponent;
  export const TToast: DefineComponent;
  export const TTooltip: DefineComponent;
  export const TTriangle: DefineComponent;
  export const TZoom: DefineComponent;
}
