import React, { useEffect, useRef } from 'react';
import './Form.css';
import { useAppContext } from './AppContext';

const Form = () => {
  const { name, setName, surname, setSurname, topic, setTopic, otherTopic, setOtherTopic, handleSubmit } = useAppContext();

  const nameInputRef = useRef(null);

  useEffect(() => {
    nameInputRef.current.focus();
  }, []);

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Enter Details</h2>
      <input ref={nameInputRef} type="text" className="input-field" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
      <input type="text" className="input-field" placeholder="Surname" value={surname} onChange={e => setSurname(e.target.value)} />
      <select className="select-field" value={topic} onChange={e => setTopic(e.target.value)}>
        <option value="">Select a topic</option>
        <option value="Travel">Travel</option>
        <option value="Cars">Cars</option>
        <option value="Wildlife">Wildlife</option>
        <option value="Technology">Technology</option>
        <option value="Other">Other</option>
      </select>
      {topic === 'Other' && (
        <input type="text" className="input-field" placeholder="Enter Other Topic" value={otherTopic} onChange={e => setOtherTopic(e.target.value)} />
      )}
      <div>
        <button type="submit" className="submit-button">Submit</button>
      </div>
    </form>
  );
};

export default Form;