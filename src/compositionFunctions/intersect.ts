import { onMounted, ref } from "vue";
interface IntersectionObserverConfig extends IntersectionObserverInit {
  passRef?: boolean;
}
export const useIntersectElement = (
  options: IntersectionObserverConfig = { passRef: true },
  callbackFunction?: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver
  ) => void,
  elementRef = ref(null)
) => {
  const isIntersecting = ref(false);
  let observer;
  onMounted(() => {
    const callback = (entries, observer) => {
      if (options.passRef == true) {
        isIntersecting.value = entries[0].isIntersecting;
      }
      callbackFunction?.(entries[0], observer);
    };

    observer = new IntersectionObserver(callback, options);
    observer.observe(elementRef.value!);
  });

  const destroyObserver = () => {
    observer.disconnect();
  };

  if (options.passRef) {
    return { elementRef, isIntersecting, destroyObserver };
  }
  return { elementRef, destroyObserver };
};
