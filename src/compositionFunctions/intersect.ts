import { onMounted, ref, watch, Ref } from "vue";
interface IntersectionObserverConfig extends IntersectionObserverInit {
  passRef?: boolean;
  delay?: number;
  defaultValue?: boolean;
  enable?: Ref<boolean>;
}

export const useIntersectElement = (
  {
    passRef = true,
    delay = 0,
    defaultValue = false,
    enable = ref(true),
    ...options
  }: IntersectionObserverConfig = {},
  callbackFunction?: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver
  ) => void,
  elementRef = ref(null) as any,
  mounted = true
) => {
  const isIntersecting = ref(defaultValue);
  let observer;
  let timeout;
  const observeFunc = () => {
    const callback = (entries, observer) => {
      const callbackMethod = () => {
        if (passRef == true) {
          isIntersecting.value = entries[0].isIntersecting;
        }
        callbackFunction?.(entries[0], observer);
      };
      if (delay && delay > 0) {
        clearTimeout(timeout);
        timeout = setTimeout(() => {
          callbackMethod();
        }, delay);
      } else {
        callbackMethod();
      }
    };
    // @ts-ignore
    observer = new IntersectionObserver(callback, options);
    observer.observe(mounted ? elementRef.value : elementRef);
  };
  if (mounted)
    onMounted(() => {
      observeFunc();
    });
  else observeFunc();

  const destroyObserver = () => {
    observer?.disconnect();
  };
  watch(enable, value => {
    if (value) {
      observeFunc();
    } else {
      destroyObserver();
    }
  });

  if (passRef) {
    return {
      elementRef,
      isIntersecting,
      destroyObserver,
      startObserver: observeFunc
    };
  }
  return { elementRef, destroyObserver, startObserver: observeFunc };
};
