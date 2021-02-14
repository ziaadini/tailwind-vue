import { computed, reactive, ref, watchEffect } from "vue";
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

export const useTableVariant = getItems => {
  const getRowVariant = computed(() => i => {
    if (getItems.value[i - 1]?._rowVariant) {
      return `bg-${getItems.value[i - 1]._rowVariant}`;
    }
    return "";
  });
  const getCellVariant = computed(() => (i, key) => {
    if (getItems.value[i - 1]._cellVariants?.[key]) {
      return `bg-${getItems.value[i - 1]._cellVariants?.[key]}`;
    }
    return "";
  });
  return { getRowVariant, getCellVariant };
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
