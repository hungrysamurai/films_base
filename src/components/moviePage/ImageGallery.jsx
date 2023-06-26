import { useGlobalContext } from "../../contexts/GlobalContext";

const ImageGallery = () => {
  const { baseName } = useGlobalContext();

  const tempImages = [
    `${baseName}assets/images/gallery/1.jpg`,
    `${baseName}assets/images/gallery/2.jpg`,
    `${baseName}assets/images/gallery/3.jpg`,
    `${baseName}assets/images/gallery/4.jpg`,
    `${baseName}assets/images/gallery/5.jpg`,
    `${baseName}assets/images/gallery/6.jpg`,
    `${baseName}assets/images/gallery/7.jpg`,
  ];

  return (
    <div className="gallery-container">
      <div className="gallery-wrapper">
        {tempImages.map((image, i) => {
          return (
            <div className="gallery-image-container" key={i}>
              <img src={image} alt="img" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageGallery;
