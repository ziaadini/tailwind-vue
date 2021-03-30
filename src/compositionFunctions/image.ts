import { ref } from "vue";
export const useImageDownloader = () => {
  const image = ref(null as any);
  const downloadingImage = new Image();
  const downloadImage = (src) => {
    downloadingImage.onload = function() {
      // @ts-ignore
      image.value = src;
    };
    downloadingImage.src = src;
  };


  const setImage = (imageRef: any) => {
    imageRef.value.src = image.value;
  };

  return {
    image,
    setImage,
    downloadImage
  };
};
