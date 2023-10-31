import { useState } from 'react';
import './App.css';

function App() {
  const [personalInfo, setPersonalInfo] = useState({name: '', email: '', phoneNumber: ''});
  const [plan, setPlan] = useState({plan: 'price'});
  const [addOn, setAddOn] = useState({addOn: 'price'});
  const [summary, setSummary] = useState({});

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);


  const validateInput = () => {
    let isValid = true;

    if(personalInfo.name === '') {
      setNameError('This field is required');
      isValid = false;
    } else {
      setNameError('');
    }
  
    if(personalInfo.email === '') {
      setEmailError('This field is required');
      isValid = false;
    } else {
      setEmailError('');
    }
  
    if(personalInfo.phoneNumber === '') {
      setPhoneError('This field is required');
      isValid = false;
    } else {
      setPhoneError('');
    }
  
    if (isValid) {
      setStep1(true);
    }
  }


  return (
    <section className='multi-step-container'>

      <aside className='step-container'>
        <div className='step'>
          <p className={`step-indicator ${step1 ? '': 'active-step'}`}>1</p>
          <div className='step-description'>
            <p>step 1</p>
            <p>your info</p>
          </div>
        </div>

        <div className='step'>
          <p className={`step-indicator ${step1 ? 'active-step': ''}`}>2</p>
          <div className='step-description'>
            <p>step 2</p>
            <p>select plan</p>
          </div>
        </div>

        <div className='step'>
          <p className={`step-indicator ${step2 ? 'active-step': ''}`}>3</p>
          <div className='step-description'>
            <p>step 3</p>
            <p>add-ons</p>
          </div>
        </div>

        <div className='step'>
          <p className={`step-indicator ${step3 ? 'active-step': ''}`}>4</p>
          <div className='step-description'>
            <p>step 4</p>
            <p>summary</p>
          </div>
        </div>

      </aside>

      <div className='step-form'>

        {/* PERSONAL INFO */}
        <div className='personal-info'>
          <h1>Personal info</h1>
          <p>Please provide your name, email address, and phone number</p>

          <form>
            <div className='form-input'>
              <label htmlFor='name'>Name</label>
              <input type='text' id='name' placeholder='e.g. Stephen King' onChange={(e) => setPersonalInfo(prev => ({...prev, name: e.target.value}))}></input>
              <span>{nameError}</span>
            </div>

            <div className='form-input'>
              <label htmlFor='email'>Email Address</label>
              <input type='email' id='email' placeholder='e.g. stephenking@lorem.com' onChange={(e) => setPersonalInfo(prev => ({...prev, email: e.target.value}))}></input>
              <span>{emailError}</span>
            </div>

            <div className='form-input'>
              <label htmlFor='phone-number'>Phone Number</label>
              <input type='tel' id='phone-number' placeholder='e.g. +1 234 567 890' onChange={(e) => setPersonalInfo(prev => ({...prev, phoneNumber: e.target.value}))}></input>
              <span>{phoneError}</span>
            </div>

            <button className='next-btn' onClick={(e) => {
              e.preventDefault();
              validateInput();
            }}>Next Step</button>
          </form>
        </div>


        <div>

        </div>
      </div>
    </section>
  )
}

export default App;
