import React, { useState } from 'react';
import './ImageView.css';
import { useAppContext } from './AppContext';

const ImageView = () => {
  const { imageUrl, handleAccept, handleReject } = useAppContext();
  const [loading, setLoading] = useState(true);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <div className="image-view">
      {loading && <div className="loader">Loading...</div>}
      <img
        src={imageUrl}
        alt="Selected Topic"
        className={`image ${loading ? 'hidden' : ''}`}
        onLoad={handleImageLoad}
      />
      <div className="button-container">
        <button onClick={handleReject} data-testid="reject-button" className="reject-button">Reject</button>
        <button onClick={handleAccept} data-testid="accept-button" className="accept-button">Accept</button>
      </div>
    </div>
  );
};

export default ImageView;