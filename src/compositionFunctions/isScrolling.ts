import { onUnmounted, ref } from "vue";
import { onMounted } from "vue";
export const useIsScrolling = (onMount = false, element = ref(null)) => {
  const result = ref({});
  const handleScroll = (e) => {
    result.value = e;
  };
  const initiateScroll = () => {
    console.log("scroll event initiate", element);
    if (element.value) {
      (element.value! as HTMLElement).addEventListener("scroll", handleScroll);
    } else document.addEventListener("scroll", handleScroll);
  };
  const destroyScroll = () => {
    console.log("scroll event destroyed", element);
    if (element.value) {
      (element.value! as HTMLElement).removeEventListener("scroll", handleScroll);
    } else document.removeEventListener("scroll", handleScroll);
  };
  onMounted(() => {
    if (onMount) initiateScroll()
  });

  onUnmounted(() => {
    destroyScroll();
  });

  return {
    result,
    destroyScroll,
    initiateScroll,
    element,
  };
};
