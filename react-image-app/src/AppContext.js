import React, { createContext, useContext, useState, useEffect } from 'react';
import { createApi } from 'unsplash-js';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [topic, setTopic] = useState('');
  const [otherTopic, setOtherTopic] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [accepted, setAccepted] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [unsplash, setUnsplash] = useState(null);

  useEffect(() => {
    // Create Unsplash API client
    const unsplashClient = createApi({ accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY });
    setUnsplash(unsplashClient); // Set Unsplash API client in state

    // Cleanup function to clear the Unsplash API client when the component unmounts
    return () => {
      setUnsplash(null);
    };
  }, []);

  // Function to fetch image based on the selected topic
  const fetchImage = async () => {
    try {
      if (!unsplash) {
        throw new Error('Unsplash API client not initialized');
      }
  
      let query = topic;
      if (topic === 'Other' && otherTopic.trim() !== '') {
        query = otherTopic;
      }
      const timestamp = new Date().getTime();
      const response = await unsplash.photos.getRandom({ query, orientation: 'landscape', count: 1, timestamp });
  
      if (response && response.response && response.response.length > 0) {
        const randomImage = response.response[0];
        if (randomImage && randomImage.urls && randomImage.urls.regular) {
          setImageUrl(randomImage.urls.regular);
          setAccepted(false);
        } else {
          throw new Error('Unexpected response format');
        }
      } else {
        throw new Error('Empty or invalid response');
      }
    } catch (error) {
      console.error('Error fetching image:', error.message);
    }
  };
  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (name.trim() === '' || surname.trim() === '' || topic === '') {
      alert('Please fill in all required fields: Name, Surname, and Topic.');
      return;
    }
    
    if (topic === 'Other' && otherTopic.trim() === '') {
      alert('Please specify the "Other Topic."');
      return;
    }
  
    fetchImage();
    setFormSubmitted(true);
  };

  // Function to handle accepting an image
  const handleAccept = () => {
    setAccepted(true);
  };
  
  // Function to handle rejecting an image
  const handleReject = () => {
    fetchImage();
  };

  return (
    <AppContext.Provider value={{
      name,
      setName,
      surname,
      setSurname,
      topic,
      setTopic,
      otherTopic,
      setOtherTopic,
      imageUrl,
      accepted,
      formSubmitted,
      fetchImage,
      handleSubmit,
      handleAccept,
      handleReject,
    }}>
      {children}
    </AppContext.Provider>
  );
};
