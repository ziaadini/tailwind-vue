export const userOffsetFinder = () => {
  function findOffset($event: MouseEvent) {
    const leftOffset =
      // @ts-ignore
      $event.pageX - $event.target!.offsetLeft;
    const topOffset =
      // @ts-ignore
      $event.pageY - $event.target!.offsetTop;
    return {
      left: leftOffset,
      top: topOffset,
    };
  }

  return { findOffset };
};
