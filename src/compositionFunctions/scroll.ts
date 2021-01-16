import { computed, onMounted, ref } from "vue";
import { ScrollDirections } from "@/utility/enums/ScrollDirections";

export const useScrollElement = () => {
  const scrollTo = (
    element,
    scrollPixels: number,
    duration: number,
    direction: ScrollDirections
  ) => {
    // element[direction] = scrollPixels;
    const scrollPos = element[direction];
    // Get the start timestamp
    const startTime =
      "now" in window.performance ? performance.now() : new Date().getTime();

    const scroll = timestamp => {
      //Calculate the timeelapsed
      const timeElapsed = timestamp - startTime;
      //Calculate progress
      const progress = Math.min(timeElapsed / duration, 1);
      //Set the scroll direction
      element[direction] = scrollPos + scrollPixels * progress;
      //Check if elapsed time is less then duration then call the requestAnimation, otherwise exit
      if (timeElapsed < duration) {
        //Request for animation
        window.requestAnimationFrame(scroll);
      } else {
        return;
      }
    };
    //Call requestAnimationFrame on scroll function first time
    window.requestAnimationFrame(scroll);
  };

  const elementRef = ref<any>(null);

  const scrollLeft = (scrollPixels: number, duration = 200) => {
    scrollTo(
      elementRef.value,
      scrollPixels * -1,
      duration,
      ScrollDirections.left
    );
  };

  const scrollRight = (scrollPixels: number, duration = 200) => {
    scrollTo(elementRef.value, scrollPixels, duration, ScrollDirections.left);
  };
  const hasHorizontalScrollbar = ref(false);
  onMounted(() => {
    // elementRef.value.addEventListener("resize", e => {
    //   console.log("resize called", e);
    // });
    hasHorizontalScrollbar.value =
      elementRef.value.scrollWidth > elementRef.value.clientWidth;
  });

  return { elementRef, scrollLeft, scrollRight, hasHorizontalScrollbar };
};
