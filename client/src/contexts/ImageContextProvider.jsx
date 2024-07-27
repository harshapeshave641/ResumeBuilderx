import React, { useState, useContext } from 'react';
import ImageContext from './ImageContext';

const ImageProvider = ({ children }) => {
  const [image, setImage] = useState('');

  const handleImageChange = (newImage) => {
    setImage(newImage);
  };

  return (
    <ImageContext.Provider value={{ image, handleImageChange }}>
      {children}
    </ImageContext.Provider>
  );
};

export default ImageProvider;
