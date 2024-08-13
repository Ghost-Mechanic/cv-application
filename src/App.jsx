import { useState } from 'react';
import './App.css';
import GeneralInput from './General';
import EducationInput from './Education';

// this function takes in a date as returned from a form and converts it to a
// more readable format
function dateString(date) {
  const dateObject = new Date(date);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const dateMonth = months[Number(date.substr(5)) - 1];
  const dateYear = dateObject.getFullYear();

  return `${dateMonth} ${dateYear}`;
}

function App() {
  // states for the general information form
  const [editingGenInfo, setEditingGenInfo] = useState(false);
  const [formError, setFormError] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');

  // states for the educational information form
  const [editingEducationInfo, setEditingEducationInfo] = useState(false);
  const [formErrorEducation, setFormErrorEducation] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [studyTitle, setStudyTitle] = useState('');
  const [fromStudyDate, setFromStudyDate] = useState('');
  const [toStudyDate, setToStudyDate] = useState('');

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

  // handle the educational information forms
  function handleSchoolNameChange(e) {
    setSchoolName(e.target.value);
  }

  function handleStudyTitleChange(e) {
    setStudyTitle(e.target.value);
  }

  function handleFromStudyDateChange(e) {
    setFromStudyDate(e.target.value);
  }

  function handleToStudyDateChange(e) {
    setToStudyDate(e.target.value);
  }

  // handle the educational info submission while handling errors
  function handleEducationInfoSubmit(e) {
    e.preventDefault();

    if (schoolName === '') {
      setFormErrorEducation('You must include a school name');
    }
    else if (studyTitle === '') {
      setFormErrorEducation('You must include a study title');
    }
    else if (fromStudyDate === '') {
      setFormErrorEducation('You must include a from date for your education');
    }
    else if (toStudyDate === '') {
      setFormErrorEducation('You must include a to date for your education');
    }
    else {
      setFormErrorEducation('');
      setEditingEducationInfo(false);
    }
  }

  return (
    <>
      
        {name !== '' && phoneNumber !== '' && email !== '' && !editingGenInfo ? 
        <div className="gen-info">
          <h1>{name}</h1>
          <div className="gen-info-contact">
            <h2>{phoneNumber}</h2>
            {phoneNumber !== '' && email !== '' ? <div className="vl"></div> : null}
            <h2>{email}</h2>
          </div>
        </div> : null}

        {schoolName !== '' && studyTitle !== '' && fromStudyDate !== '' && toStudyDate !== '' && !editingEducationInfo ? 
        <div>
          <h1 className="section-title">Education</h1>
          <div className="hl"></div>
          <div className="school-section">
            <div className="school-main">
              <h2>{schoolName}</h2>
              <h3>{studyTitle}</h3>
            </div>
            <div className="school-dates">
              <h3>{dateString(fromStudyDate)} - {dateString(toStudyDate)}</h3>
            </div>
          </div>
        </div> : null}

        <div className="edit-buttons">
          <button onClick={() => {setEditingGenInfo(!editingGenInfo); setEditingEducationInfo(false)}}>Edit General Information</button>
          <button onClick={() => {setEditingEducationInfo(!editingEducationInfo); setEditingGenInfo(false)}}>Edit Education</button>
        </div>

        {editingGenInfo && !editingEducationInfo ? 
        <div className="gen-form">
          <GeneralInput label="Name" value={name} handleChange={handleNameChange} />
          <GeneralInput label="Phone Number" value={phoneNumber} handleChange={handleNumberChange} />
          <GeneralInput label="Email" value={email} handleChange={handleEmailChange} />
          <GeneralInput label="Submit" handleChange={handleGenInfoSubmit} error={formError} />
        </div> : null} 
      
        {editingEducationInfo && !editingGenInfo ?
        <div className="edu-form">
          <EducationInput label="School Name" value={schoolName} handleChange={handleSchoolNameChange} />
          <EducationInput label="Study Title" value={studyTitle} handleChange={handleStudyTitleChange} />
          <EducationInput label="From" value={fromStudyDate} handleChange={handleFromStudyDateChange} />
          <EducationInput label="To" value={toStudyDate} handleChange={handleToStudyDateChange} />
          <EducationInput label="Submit" handleChange={handleEducationInfoSubmit} error={formErrorEducation} />
        </div> : null}
    </>
  )
}

export default App
