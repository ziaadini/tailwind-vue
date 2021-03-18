import {
  computed,
  onBeforeMount,
  onMounted,
  reactive,
  ref,
  watch,
  watchEffect
} from "vue";
import { Table } from "@/utility/types/base-component-types";
import SortEnum = Table.SortEnum;

export const useTableHeader = props => {
  const getHeaders = computed((): Table.HeaderItem[] => {
    if (props.fields) {
      return props.fields;
    }
    const firstItem = props.items[0];
    if (!firstItem) {
      return [];
    }
    const result: Table.HeaderItem[] = [];
    for (const key in firstItem) {
      result.push({
        key,
        label: key,
        sortable: false,
        variant: "gray"
      });
    }
    return result;
  });
  const getHeaderLength = computed(() => getHeaders.value.length);
  return { getHeaders, getHeaderLength };
};
export const useShowDetails = (getItems, resetFlag = ref(false)) => {
  const showDetailsRef = ref({});
  let hasReset = false;
  watchEffect(() => {
    if (resetFlag.value) {
      hasReset = true;
      showDetailsRef.value = {};
      resetFlag.value = false;
    }
  });
  const getShowDetails = computed(() => i => {
    if (showDetailsRef.value[i] !== undefined) {
      return showDetailsRef.value[i];
    } else if (hasReset) {
      return false;
    }
    return getItems.value[i - 1]._showDetails;
  });
  const toggleDetails = i => {
    if (getShowDetails.value(i)) {
      showDetailsRef.value[i] = false;
    } else {
      showDetailsRef.value[i] = true;
    }
  };
  return { toggleDetails, getShowDetails };
};

export const useTableVariant = (getItems, hoverable) => {
  const hovering = ref<number>(-1);
  const onMouseenter = i => {
    if (hoverable) {
      hovering.value = i;
    }
  };
  const onMouseleave = () => {
    if (hoverable) {
      hovering.value = -1;
    }
  };

  const getRowVariant = computed(() => i => {
    if (getItems.value[i - 1]?._rowVariant) {
      return `bg-${getItems.value[i - 1]._rowVariant}-50`;
    }
    return "";
  });
  const getCellVariant = computed(() => (i, key) => {
    if (hoverable && hovering.value === i) {
      return "";
    }
    if (getItems.value[i - 1]._cellVariants?.[key]) {
      return `bg-${getItems.value[i - 1]._cellVariants?.[key]}-50`;
    }
    return "";
  });
  return { getRowVariant, getCellVariant, onMouseenter, onMouseleave };
};

export const useTableSort = (props, { emit }, doneCallback) => {
  const activeSort = reactive({
    key: "",
    sort: "" as Table.SortEnum
  });
  const setActiveSort = ({ key, sort }) => {
    activeSort.key = key;
    activeSort.sort = sort;
  };
  const onSort = ({ key, sort }) => {
    if (props.localSort) {
      setActiveSort({ key, sort });
    }
    emit("sort", {
      key,
      sort,
      setSort: () => {
        setActiveSort({ key, sort });
      }
    });
    doneCallback();
  };
  watch(
    () => (props.defaultSort),
    () => {
      onSort(props.defaultSort);
    },
    { immediate: true }
  );
  // onMounted(() => {
  //   console.log(
  //     'activeSort.key !== "" && activeSort.sort',
  //     activeSort.key !== "" && activeSort.sort
  //   );
  //   if (activeSort.key !== "" && activeSort.sort) {
  //     onSort(props.defaultSort);
  //   }
  // });
  const compare = (a, b) => {
    if (a[activeSort.key] < b[activeSort.key]) {
      return activeSort.sort === SortEnum.ASC ? -1 : 1;
    }
    if (a[activeSort.key] > b[activeSort.key]) {
      return activeSort.sort === SortEnum.ASC ? 1 : -1;
    }
    return 0;
  };
  const getItems = computed(() => {
    if (activeSort.key && props.localSort) {
      return [...props.items].sort(compare);
    }
    return props.items;
  });
  return { getItems, onSort, activeSort };
};
