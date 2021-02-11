import { onBeforeUnmount, watch, onBeforeMount } from "vue";

export const useInterval = (callback: () => void, delay: number | null) => {
  let interval;
  const clear = () => {
    if (interval) {
      clearInterval(interval);
    }
  };
  const start = (duration: number | null = null) => {
    if (duration !== null) {
      clear();
      interval = setInterval(callback, duration);
    } else if (delay !== null) {
      clear();
      interval = setInterval(callback, delay);
    }
  };
  onBeforeMount(() => {
    start();
  });
  onBeforeUnmount(() => {
    clear();
  });
  watch(
    () => delay,
    value => {
      value && start();
    }
  );
  return { start };
};
