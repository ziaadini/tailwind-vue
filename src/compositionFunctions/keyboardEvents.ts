import { onMounted, onUnmounted } from "vue";
export const useKeyDown = (callback: (e: any) => void) => {
  onMounted(() => {
    document.addEventListener("keydown", callback);
  });
  onUnmounted(() => {
    document.removeEventListener("keydown", callback);
  });
};
