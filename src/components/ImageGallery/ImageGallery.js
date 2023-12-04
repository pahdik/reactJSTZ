import React, { useEffect, useRef } from 'react';
import { saveAs } from 'file-saver';
import styles from './ImageGallery.css'

const ImageGallery = ({ imageUrls }) => {
  const galleryRef = useRef(null);

  useEffect(() => {
    const gallery = galleryRef.current;
    gallery.innerHTML = '';
    imageUrls.forEach((url, index) => {
      const canvas = document.createElement('canvas');
      canvas.width = 200;
      canvas.height = 200;
      const context = canvas.getContext('2d');

      const image = new Image();
      image.crossOrigin = 'Anonymous';
      image.src = url;
      image.onload = () => {
        context.drawImage(image, 0, 0, 200, 200);
      };

      const button = document.createElement('button');
      button.innerHTML = 'Save Image';
      button.className = styles.button;
      button.addEventListener('click', () => handleSaveImage(canvas, `image_${index}.png`));

      const galleryItem = document.createElement('div');
      galleryItem.className = styles.galleryItem;
      galleryItem.appendChild(canvas);
      galleryItem.appendChild(button);

      gallery.appendChild(galleryItem);
    });
  }, [imageUrls]);

  const handleSaveImage = (canvas, fileName) => {
    canvas.toBlob((blob) => {
      saveAs(blob, fileName);
    });
  };

  return (
    <div ref={galleryRef} className={styles.galleryContainer}>
    </div>
  );
};

export default ImageGallery;