import { onMounted, ref } from "vue";
interface IntersectionObserverConfig extends IntersectionObserverInit {
  passRef?: boolean;
}
export const useIntersectElement = (
  options: IntersectionObserverConfig = { passRef: true },
  callbackFunction?: (
    entry: IntersectionObserverEntry,
    observer: IntersectionObserver
  ) => void
) => {
  const elementRef = ref(null);
  const isIntersecting = ref(false);
  onMounted(() => {
    const callback = (entries, observer) => {
      if (options.passRef == true) {
        isIntersecting.value = entries[0].isIntersecting;
      }
      callbackFunction?.(entries[0], observer);
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(elementRef.value!);
  });
  if (options.passRef) {
    return { elementRef, isIntersecting };
  }
  return { elementRef };
};
