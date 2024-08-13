import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import GeneralInput from './General';
import EducationInput from './Education';
import Experience from './Experience';

// this function takes in a date as returned from a form and converts it to a more readable format
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

// this function takes a date string and converts it to YYYY-MM format to repopulate the date field when editing an experience
function dateFormat(date) {
  const months = {
    'January': '01',
    'February': '02',
    'March': '03',
    'April': '04',
    'May': '05',
    'June': '06',
    'July': '07',
    'August': '08',
    'September': '09',
    'October': '10',
    'November': '11',
    'December': '12'
  };

  const [month, year] = date.split(' ');
  const monthNum = months[month];

  return `${year}-${monthNum}`;
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

  // states for the experience form
  const [editingExpInfo, setEditingExpInfo] = useState(false);
  const [addingExp, setAddingExp] = useState(false);
  const [editingExpId, setEditingExpId] = useState(null);
  const [formErrorExp, setFormErrorExp] = useState('');
  const [currCompany, setCurrCompany] = useState('');
  const [currPosition, setCurrPosition] = useState('');
  const [currExpFrom, setCurrExpFrom] = useState('');
  const [currExpTo, setCurrExpTo] = useState('');
  const [currDuties, setCurrDuties] = useState('');
  const [expArray, setExpArray] = useState([]);

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

  // handle the experience submission
  function handleCompanyChange(e) {
    setCurrCompany(e.target.value);
  }

  function handlePositionChange(e) {
    setCurrPosition(e.target.value);
  }

  function handleFromExpChange(e) {
    setCurrExpFrom(e.target.value);
  }

  function handleToExpChange(e) {
    setCurrExpTo(e.target.value);
  }

  function handleDutyChange(e) {
    setCurrDuties(e.target.value);
  }

  // handle the submission of a new experience with error checking
  function handleExpSubmit(e) {
    e.preventDefault();

    if (currCompany === '') {
      setFormErrorExp('You must include a company name');
    }
    else if (currPosition === '') {
      setFormErrorExp('You must include your position at the company');
    }
    else if (currExpFrom === '') {
      setFormErrorExp('You must include a from date for experience');
    }
    else if (currExpTo === '') {
      setFormErrorExp('You must include a to date for experience');
    }
    else if (currDuties === '') {
      setFormErrorExp('You must describe your duties');
    }
    else {
      const newExperience = {
        id: uuidv4(),
        company: currCompany,
        position: currPosition,
        from: dateString(currExpFrom),
        to: dateString(currExpTo),
        duties: currDuties
      };

      // if the experience is being edited, update the existing array else add an experience to the array
      if (editingExpId !== null) {
        setExpArray(expArray.map(exp => exp.id === editingExpId ? newExperience : exp));
      }
      else {
        setExpArray([...expArray, newExperience]);
      }

      // reset states for a new experience
      setFormErrorExp('');
      setAddingExp(false);
      setEditingExpInfo(false);
      setCurrCompany('');
      setCurrPosition('');
      setCurrExpFrom('');
      setCurrExpTo('');
      setCurrDuties('');
      setEditingExpId(null);
    }
  }

  // handle the deletion of an experience on the resume
  function handleDelete(id) {
    setExpArray(expArray.filter(exp => exp.id !== id));
  }

  // handle the edit of an existing experience
  function handleEdit(exp) {
    setEditingExpId(exp.id);
    setCurrCompany(exp.company);
    setCurrPosition(exp.position);
    setCurrExpFrom(dateFormat(exp.from));
    setCurrExpTo(dateFormat(exp.to));
    setCurrDuties(exp.duties);
    setAddingExp(true);
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

      {expArray.length !== 0 && !addingExp ? 
      <div>
      <h1 className="section-title">Experience</h1>
      <div className="hl"></div>
      {expArray.map(exp => (
        <div key={exp.id}>
          <div className="exp-section">
            <div className="exp-info">
              <h2>{exp.company}</h2>
              <h3>{exp.position}</h3>
            </div>
            <div className="exp-dates">
              <h3>{exp.from} - {exp.to}</h3>
            </div>
          </div>
          <p className="exp-duties">{exp.duties}</p>
        </div>
      ))}
    </div> : null}

      <div className="edit-buttons">
        <button onClick={() => {setEditingGenInfo(!editingGenInfo); setEditingEducationInfo(false); setEditingExpInfo(false)}}>Edit General Information</button>
        <button onClick={() => {setEditingEducationInfo(!editingEducationInfo); setEditingGenInfo(false); setEditingExpInfo(false)}}>Edit Education</button>
        <button onClick={() => {setEditingExpInfo(!editingExpInfo); setEditingGenInfo(false); setEditingEducationInfo(false)}}>Edit Experience</button>
      </div>

      {editingGenInfo && !editingEducationInfo && !editingExpInfo ? 
      <div className="gen-form">
        <GeneralInput label="Name" value={name} handleChange={handleNameChange} />
        <GeneralInput label="Phone Number" value={phoneNumber} handleChange={handleNumberChange} />
        <GeneralInput label="Email" value={email} handleChange={handleEmailChange} />
        <GeneralInput label="Submit" handleChange={handleGenInfoSubmit} error={formError} />
      </div> : null} 
    
      {editingEducationInfo && !editingGenInfo && !editingExpInfo ?
      <div className="edu-form">
        <EducationInput label="School Name" value={schoolName} handleChange={handleSchoolNameChange} />
        <EducationInput label="Study Title" value={studyTitle} handleChange={handleStudyTitleChange} />
        <EducationInput label="From" value={fromStudyDate} handleChange={handleFromStudyDateChange} />
        <EducationInput label="To" value={toStudyDate} handleChange={handleToStudyDateChange} />
        <EducationInput label="Submit" handleChange={handleEducationInfoSubmit} error={formErrorEducation} />
      </div> : null}

      {editingExpInfo && !editingGenInfo && !editingEducationInfo ?
      <div className="exp-form">
        {expArray.map(exp => (
          <div key={exp.id} className="exp-edits">
            <h4>{exp.position} at {exp.company}</h4>
            <div className="exp-buttons">
              <button onClick={() => handleEdit(exp)}>Edit</button>
              <button onClick={() => handleDelete(exp.id)}>Delete</button>
            </div>
          </div>
        ))}
        <button className="new-exp" onClick={() => setAddingExp(true)}>Add Experience</button>
        {addingExp ? 
        <div className="exp-form-inner">
          <Experience label="Company" value={currCompany} handleChange={handleCompanyChange} />
          <Experience label="Position" value={currPosition} handleChange={handlePositionChange} />
          <Experience label="From" value={currExpFrom} handleChange={handleFromExpChange} />
          <Experience label="To" value={currExpTo} handleChange={handleToExpChange} />
          <Experience label="Duties" value={currDuties} handleChange={handleDutyChange} />
          <Experience label="Submit" handleChange={handleExpSubmit} error={formErrorExp} />
        </div> : null}
      </div> : null}
    </>
  )
}

export default App
