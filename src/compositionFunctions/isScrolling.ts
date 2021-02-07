import { onUnmounted, ref } from "vue";
import { onMounted } from "vue";
export const useIsScrolling = (onMount = false) => {
  const result = ref({});
  const handleScroll = (e) => {
    result.value = e;
  };
  const initiateScroll = () => {
    console.log('scroll event initiate')
    document.addEventListener("scroll", handleScroll);
  };
  const destroyScroll = () => {
    console.log('scroll event destroyed')
    document.removeEventListener("scroll", handleScroll);
  };
  onMounted(() => {
    if (onMount) document.addEventListener("scroll", handleScroll);
  });

  onUnmounted(() => {
    destroyScroll();
  });

  return {
    result,
    destroyScroll,
    initiateScroll
  };
};
