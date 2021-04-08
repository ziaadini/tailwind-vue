import { onUnmounted } from "vue";
import { onMounted } from "vue";
export const useResize = callback => {
  onMounted(() => {
    window.addEventListener("resize", callback);
  });
  onUnmounted(() => {
    window.removeEventListener("resize", callback);
  });
};
