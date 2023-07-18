export const imageSizeReducer = async (base64Str, maxWidth, maxHeight) => {
  let resized_base64 = await new Promise((resolve) => {
    let img = new Image();
    img.src = base64Str;
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      if (width <= maxWidth && height <= maxHeight) {
        // If resolution of image is less than actual placeholder size
        resolve(base64Str);
      }

      let canvas = document.createElement("canvas");
      if (width > height) {
        if (width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        }
      } else {
        if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }
      }
      canvas.width = width;
      canvas.height = height;
      let ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, width, height);
      // Return reduced image
      resolve(canvas.toDataURL("image/jpeg"));
    };
  });
  return resized_base64;
};
