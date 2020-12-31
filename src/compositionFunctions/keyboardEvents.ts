import { onMounted, onUnmounted } from "vue";
export const useKeyDown = (callback: () => void) => {
  onMounted(() => {
    document.addEventListener("keydown", callback);
  });
  onUnmounted(() => {
    document.removeEventListener("keydown", callback);
  });
};
