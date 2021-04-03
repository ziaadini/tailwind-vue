import { onUnmounted, ref } from "vue";
export const useClickOutside = (elementRef = ref(null)) => {
  const clickedOutside = ref(false);
  const eventHandler = function(event) {
    const isClickInside = (elementRef.value as any).contains(event.target);

    console.log("click event trigger isClickInside=> ", isClickInside);

    if (!isClickInside) {
      clickedOutside.value = true;
      return;
    }

    clickedOutside.value = false;
  };

  const registerEvent = () => {
    setTimeout(() => {
      console.log("registered click outside event");
      document.addEventListener("click", eventHandler);
    }, 0);
  };
  const unRegisterEvent = () => {
    setTimeout(() => {
      console.log("unregistered click outside event");
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
