import { TAccordion } from "@/components/tailwind";
import TAlert from "./components/tailwind/alert/TAlert.vue";
import TAnimate from "./components/tailwind/animate/TAnimate.vue";
import TBadge from "./components/tailwind/badge/TBadge.vue";
import TButton from "./components/tailwind/button/TButton.vue";
import TBottomSheet from "./components/tailwind/bottomSheet/TBottomSheet.vue";
import TBreadcrumb from "./components/tailwind/breadcrumb/TBreadcrumb.vue";
import TCard from "./components/tailwind/card/TCard.vue";
import TCarousel from "./components/tailwind/carousel/TCarousel.vue";
import TCheckbox from "./components/tailwind/checkbox/TCheckbox.vue";
import TCollapsable from "./components/tailwind/collapsable/TCollapsable.vue";
import TDrawer from "./components/tailwind/drawer/TDrawer.vue";
import TDropdown from "./components/tailwind/dropdown/TDropdown.vue";
import TFade from "./components/tailwind/fade/TFade.vue";
import TIcon from "./components/tailwind/icon/TIcon.vue";
import TImage from "./components/tailwind/image/TImage.vue";
import TLoading from "./components/tailwind/loading/TLoading.vue";
import TMenu from "./components/tailwind/menu/TMenu.vue";
import TModal from "./components/tailwind/modal/TModal.vue";
import TNumberPicker from "./components/tailwind/numberPicker/TNumberPicker.vue";
import numberTransformer from "./components/tailwind/numberTransformer/TNumberTransformer.vue";
import TPagination from "./components/tailwind/pagination/TPagination.vue";
import TProgressBar from "./components/tailwind/progress/TProgressBar.vue";
import TRadio from "./components/tailwind/radio/TRadio.vue";
import TRangeSlider from "./components/tailwind/rangeSlider/TRangeSlider.vue";
import TRate from "./components/tailwind/rate/TRate.vue";
import TSearchable from "./components/tailwind/searchable/TSearchable.vue";
import TSkeleton from "./components/tailwind/skeleton/TSkeleton.vue";
import TSlider from "./components/tailwind/slider/TSlider.vue";
import TStepper from "./components/tailwind/stepper/TStepper.vue";
import TSwitch from "./components/tailwind/switch/TSwitch.vue";
import TTabs from "./components/tailwind/tab/TTabs.vue";
import TTabItem from "./components/tailwind/tab/TTabItem.vue";
import TTh from "./components/tailwind/table/TTh.vue";
import TTable from "./components/tailwind/table/TTable.vue";
import TTextInput from "./components/tailwind/text-input/TTextInput.vue";
import TTimeline from "./components/tailwind/timeline/TTimeline.vue";
import TCountDownTimer from "./components/tailwind/timer/TCountDownTimer.vue";
import TToast from "./components/tailwind/toast/TToast.vue";
import TTooltip from "./components/tailwind/tooltip/TTooltip.vue";
import TTriangle from "./components/tailwind/triangle/TTriangle.vue";
import TZoom from "./components/tailwind/zoom/TZoom.vue";
import { useDebouncedRef } from "./compositionFunctions/expose/debounce";
import { useFormatRef } from "./compositionFunctions/expose/format";
const components = {
  TZoom,
  TTriangle,
  TTooltip,
  TToast,
  TCountDownTimer,
  TTimeline,
  TTextInput,
  TTable,
  TTh,
  TTabItem,
  TTabs,
  TSwitch,
  TStepper,
  TSlider,
  TSkeleton,
  TSearchable,
  TRate,
  TRangeSlider,
  TRadio,
  TProgressBar,
  TPagination,
  numberTransformer,
  TNumberPicker,
  TModal,
  TMenu,
  TLoading,
  TImage,
  TFade,
  TAccordion,
  TAlert,
  TAnimate,
  TButton,
  TBadge,
  TBottomSheet,
  TBreadcrumb,
  TCard,
  TCarousel,
  TCheckbox,
  TCollapsable,
  TDrawer,
  TDropdown,
  TIcon,
  utilities: {
    useDebouncedRef,
    useFormatRef
  }
};

export default {
  install: app => {
    Object.keys(components).forEach(name => {
      app.components(name, components[name]);
    });
  }
};

export default components;
