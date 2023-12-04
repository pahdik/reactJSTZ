import React, { useState, useEffect } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import TermsOfUse from './components/TermsOfUse/TermsOfUse';
import ImageGallery from './components/ImageGallery/ImageGallery';
import { API_BASE_URL, TEST_JSON_ENDPOINT } from './constants/api';
import styles from './App.css'

const App = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [imageData, setImageData] = useState(false);

  useEffect(() => {
    axios.get(new URL(TEST_JSON_ENDPOINT, API_BASE_URL).href)
      .then(response => setImageData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleAcceptTerms = () => {
    setTermsAccepted(true);
  };

  return (
    <div className='styles.appContainer'>
       {!termsAccepted && imageData && (
        <TermsOfUse paragraphs={imageData.terms_of_use.paragraphs} onAccept={handleAcceptTerms} />
      )}

      {termsAccepted && imageData && (
        <ImageGallery imageUrls={imageData && imageData.images.map((u) => new URL(u.image_url,API_BASE_URL).href)}/>
      )}
    </div>
  );
};

export default App;