import { onUnmounted, ref } from "vue";
export const useClickOutside = (elementRef = ref(null)) => {
  const clickedOutside = ref(false);
  const eventHandler = function(event) {
    const isClickInside = (elementRef.value as any)?.contains(event.target);

    if (!isClickInside) {
      clickedOutside.value = true;
      return;
    }

    clickedOutside.value = false;
  };

  const registerEvent = () => {
    setTimeout(() => {
      document.addEventListener("click", eventHandler);
    }, 0);
  };
  const unRegisterEvent = () => {
    setTimeout(() => {
      document.removeEventListener("click", eventHandler);
      clickedOutside.value = false;
    }, 0);
  };
  onUnmounted(() => {
    document.removeEventListener("click", eventHandler);
  });
  return {
    elementRef,
    clickedOutside,
    registerEvent,
    unRegisterEvent
  };
};
