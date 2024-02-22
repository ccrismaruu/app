import React from 'react';
import Form from './Form';
import ImageView from './ImageView';
import Card from './Card';
import './App.css';
import { useAppContext } from './AppContext'; 

const App = () => {
  // Destructuring state variables and functions from the AppContext
  const { handleSubmit } = useAppContext();
  const {
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
    handleAccept,
    handleReject,
  } = useAppContext();

  return (
    <div className="app">
      {!accepted && !formSubmitted && (
        <Form
          name={name}
          setName={setName}
          surname={surname}
          setSurname={setSurname}
          topic={topic}
          setTopic={setTopic}
          otherTopic={otherTopic}
          setOtherTopic={setOtherTopic}
          handleSubmit={handleSubmit}
        />
      )}
      {!accepted && formSubmitted && (
        <ImageView
          imageUrl={imageUrl}
          handleAccept={handleAccept}
          handleReject={handleReject}
        />
      )}
      {accepted && (
        <Card
          name={name}
          surname={surname}
          imageUrl={imageUrl}
        />
      )}
    </div>
  );
};

export default App;