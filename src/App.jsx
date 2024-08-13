import { useState } from 'react';
import './App.css';
import GeneralInput from './General';

function App() {
  const [editingGenInfo, setEditingGenInfo] = useState(false);
  const [formError, setFormError] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  // handle the general information forms
  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleNumberChange(e) {
    setPhoneNumber(e.target.value);
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  // handle the general information submission while checking for errors
  function handleGenInfoSubmit(e) {
    e.preventDefault();

    if (name === '') {
      console.log('test');
      setFormError('You must include a name');
    }
    else if (phoneNumber === '') {
      setFormError('You must include a phone number');
    }
    else if (email === '') {
      setFormError('You must include an email');
    }
    else {
      setFormError('');
      setEditingGenInfo(false);
    }
  }

  return (
    <>
      
        {name !== '' && phoneNumber !== '' && email !== '' && !editingGenInfo ? <div className="gen-info">
          <h1>{name}</h1>
          <div className="gen-info-contact">
            <h2>{phoneNumber}</h2>
            {phoneNumber !== '' && email !== '' ? <div className="vl"></div> : null}
            <h2>{email}</h2>
          </div>
        </div> : null}

        <div className="edit-buttons">
          <button onClick={() => setEditingGenInfo(!editingGenInfo)}>Edit General Information</button>
          <button onClick={() => setEditingGenInfo(!editingGenInfo)}>Edit Education</button>
        </div>

        {editingGenInfo ? 
        <div className="gen-form">
          <GeneralInput label="Name" value={name} handleChange={handleNameChange} />
          <GeneralInput label="Phone Number" value={phoneNumber} handleChange={handleNumberChange} />
          <GeneralInput label="Email" value={email} handleChange={handleEmailChange} />
          <GeneralInput label="Submit" handleChange={handleGenInfoSubmit} error={formError} />
        </div> : null} 
      
    </>
  )
}

export default App
