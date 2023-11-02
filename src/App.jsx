import { useState } from 'react';
import './App.css';

function App() {
  const [personalInfo, setPersonalInfo] = useState({name: '', email: '', phoneNumber: ''});
  const [selectedPlan, setSelectedPlan] = useState({value: 'Arcade', monthly: 9});
  const [addons, setAddons] = useState([    
    { name: "Online service", description: "Access to multiplayer games", monthly: 1, yearly: 10, checked: false },
    { name: "Larger storage", description: "Extra 1TB of cloud save", monthly: 2, yearly: 20, checked: false },
    { name: "Customizable profile", description: "Custom theme on your profile", monthly: 2, yearly: 20, checked: false },
  ]);
  const [summary, setSummary] = useState({});

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');``

  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);

  const [isMonthly, setIsMonthly] = useState(true);
  
  const planOption = [
    {value: 'Arcade', monthly: 9, yearly: 90, img: '/public/assets/images/icon-arcade.svg'},
    {value: 'Advanced', monthly: 12, yearly: 120, img: '/public/assets/images/icon-advanced.svg'},
    {value: 'Pro', monthly: 15, yearly: 150, img: '/public/assets/images/icon-pro.svg'}
  ]
 

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


  const handleSelectedPlan = (option) => {
    if(isMonthly) {
      setSelectedPlan({value: option.value, monthly: option.monthly});
      console.log(selectedPlan);
    } else {
      setSelectedPlan({value: option.value, yearly: option.yearly});
      console.log(selectedPlan);
    }
  }


  const handleGoBack = () => {
    if (step1 && step2) {
      setStep2(false);
    } else if (step1) {
      setStep1(false);
    }
  }


  const handleSwitchTogggle = () => {
    setIsMonthly(!isMonthly)

    if(isMonthly) {
      setSelectedPlan({value: 'Arcade', monthly: 9})
    } else {
      setSelectedPlan({value: "Arcade", yearly: 90})
    }

    console.log(selectedPlan)
  }


  const handleCheckbox = (e, index) => {
    const updateAddon = [...addons];
    updateAddon[index].checked = e.target.checked;
    setAddons(updateAddon);
  }


  const handleAddAddon = () => {
    const checkedAddons = addons.filter((addon) => addon.checked === true);
    setSummary({...summary, checkedAddons});
    setStep3(true);
    console.log(summary);
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
          <p className={`step-indicator ${step1 && !step2 ? 'active-step': ''}`}>2</p>
          <div className='step-description'>
            <p>step 2</p>
            <p>select plan</p>
          </div>
        </div>

        <div className='step'>
          <p className={`step-indicator ${step1 && step2 && !step3 ? 'active-form': ''}`}>3</p>
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
        <div className={`form-section ${step1 ? '' : 'active-form'}`}>
          <h1 className='header'>Personal info</h1>
          <p className='description'>Please provide your name, email address, and phone number</p>

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

            <div className='buttons'>
              <button className='next-btn' onClick={(e) => {
                e.preventDefault();
                validateInput();
              }}>Next Step</button>
            </div>

          </form>
        </div>


        {/* SELECT PLAN */}
        <div className={`form-section ${step1 && !step2 ? 'active-form': ''}`}>
          <h1 className='header'>Select your plan</h1>
          <p className='description'>You have the option of monthly or yearly billing.</p>

          <div className='plan-container'>
            {planOption.map((option) => (
              <button
              key={option.value}
              className={`plan-buttons ${selectedPlan.value === option.value ? 'selected-plan': ''}`}
              onClick={() => handleSelectedPlan(option)}
              >
                <img src={option.img} alt={option.value}></img>
                <span>{option.value}</span>
                <span>{isMonthly? `${option.monthly}/mo`: `${option.yearly}/yr`}</span>
              </button>
            ))}
          </div>

          <div className='switch-container'>
            <p className={isMonthly ? 'selected-switch' : ''}>Monthly</p>

            <label className="switch" >
              <input type="checkbox" onClick={handleSwitchTogggle}/>
              <span className="slider"></span>
            </label>

            <p className={isMonthly ? '' : 'selected-switch'}>Yearly</p>
          </div>

          <div className='buttons'>
            <button className='prev-btn' onClick={handleGoBack}>Go back</button>
            <button className='next-btn' onClick={() => setStep2(true)}>Next step</button>
          </div>
        </div>


        {/* Pick add-ons */}
        <div className={`form-section ${step1 && step2 && !step3 ? 'active-form': ''}`}>
          <h1 className='header'>Pick add-ons</h1>
          <p className='description'>Add-ons help enhance your gaming experience</p>

          <form>
            {addons.map((addon, index) => (
              <label key={index} htmlFor={`checkbox${index}`} className={`checkboxes ${addon.checked ? 'selected-addon': ''}`}>
                <input type="checkbox" id={`checkbox${index}`} name="checkboxGroup" value={addon.name} onChange={(e) => handleCheckbox(e, index)} />
                <div className='addon-info'>
                  <div>
                    <p className='addon-name'>{addon.name}</p>
                    <p className='addon-description'>{addon.description}</p>
                  </div>
                  <p className='addon-price'>+${isMonthly? `${addon.monthly}/mo`: `${addon.yearly}/yr`}</p>
                </div>
              </label>
            ))}
          </form>

          <div className='buttons'>
            <button className='prev-btn' onClick={handleGoBack}>Go back</button>
            <button className='next-btn' onClick={handleAddAddon}>Next step</button>
          </div>
        </div>

      </div>
    </section>
  )
}

export default App;
