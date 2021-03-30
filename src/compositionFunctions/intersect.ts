import { mount } from '@vue/test-utils';
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
  elementRef = ref(null) as any,
  mounted = true
) => {
  const isIntersecting = ref(false);
  let observer;

  const observeFunc = () => {
    const callback = (entries, observer) => {
      if (options.passRef == true) {
        isIntersecting.value = entries[0].isIntersecting;
      }
      callbackFunction?.(entries[0], observer);
    };

    observer = new IntersectionObserver(callback, options);
    observer.observe(mounted ? elementRef.value: elementRef);
  };
  if (mounted)
    onMounted(() => {
      observeFunc();
    });
  else 
    observeFunc()

  const destroyObserver = () => {
    observer.disconnect();
  };

  if (options.passRef) {
    return { elementRef, isIntersecting, destroyObserver };
  }
  return { elementRef, destroyObserver };
};
