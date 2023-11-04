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

  const [plans, setPlan] = useState([
    {value: 'Arcade', monthly: 9, yearly: 90, img: '/public/assets/images/icon-arcade.svg', selected: true},
    {value: 'Advanced', monthly: 12, yearly: 120, img: '/public/assets/images/icon-advanced.svg', selected: false},
    {value: 'Pro', monthly: 15, yearly: 150, img: '/public/assets/images/icon-pro.svg', selected: false}
  ]);

  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');

  const [step1, setStep1] = useState(false);
  const [step2, setStep2] = useState(false);
  const [step3, setStep3] = useState(false);
  const [step4, setStep4] = useState(false);

  const [isMonthly, setIsMonthly] = useState(true);

  const handleAddPersonalInfo = () => {
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


  const handleSelectedPlan = (selected) => {
    const updatePlans = plans.map((plan) => {
      plan.selected = plan.value === selected.value;
      return plan;
    });

    setPlan(updatePlans);
  }


  const renderSelectedPlan = () => {
    const findPlan = plans.find(plan => plan.selected);

    if(findPlan) {
      if(isMonthly) {
        return findPlan.monthly;
      } else {
        return findPlan.yearly;
      }
    }
  }


  const handleGoBack = () => {
    if (step1 && step2 && step3) {
      setStep3(false);
    } else if (step1 && step2) {
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
  }


  const handleCheckbox = (e, index) => {
    const updateAddon = [...addons];
    updateAddon[index].checked = e.target.checked;
    setAddons(updateAddon);
  }


  const handleAddAddon = () => {
    setStep3(true);
  }


  const handleAddPlan = () => {
    setStep2(true);
  }


  const totalPrice = () => {
    const findPlan = plans.find(plan => plan.selected);
    const planPrice = isMonthly ? findPlan.monthly: findPlan.yearly;

    const addonTotalPrice = addons
    .filter((addon) => addon.checked)
    .reduce((total, addon) => total + (isMonthly ? addon.monthly: addon.yearly), 0);

    return planPrice + addonTotalPrice;
  }


  const handleChange = () => {
    setStep2(false);
    setStep3(false);
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
          <p className={`step-indicator ${step1 && step2 && !step3 ? 'active-step': ''}`}>3</p>
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
                handleAddPersonalInfo();
              }}>Next Step</button>
            </div>

          </form>
        </div>


        {/* SELECT PLAN */}
        <div className={`form-section ${step1 && !step2 ? 'active-form': ''}`}>
          <h1 className='header'>Select your plan</h1>
          <p className='description'>You have the option of monthly or yearly billing.</p>

          <div className='plan-container'>
            {plans.map((option) => (
              <button
              key={option.value}
              className={`plan-buttons ${option.selected ? 'selected-plan': ''}`}
              onClick={() => handleSelectedPlan(option)}
              >
                <img src={option.img} alt={option.value}></img>
                <div className='plan-price'>
                  <span>{option.value}</span>
                  <span>{isMonthly? `${option.monthly}/mo`: `${option.yearly}/yr`}</span>
                  <span>{isMonthly? '': '2 months free'}</span>
                </div>
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
            <button className='next-btn' onClick={handleAddPlan}>Next step</button>
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


        {/* Summary */}
        <div className={`form-section ${step1 && step2 && step3 && !step4 ? 'active-form': ''}`}>
          <h1 className='header'>Finishing up</h1>
          <p className='description'>Double check everything looks OK before confirming</p>

          <div className='summary-plan'>
            <div>
              <p>{selectedPlan.value} ({isMonthly ? 'Monthly': 'Yearly'})</p>
              <button onClick={handleChange}>Change</button>
            </div>
            <p>${isMonthly ? `${renderSelectedPlan()}/mo`: `${renderSelectedPlan()}/yr`}</p>
          </div>

          <ul className='summary-addon'>
            {addons.filter((addon) => addon.checked)
            .map((addon, index) => (
              <li key={index}>
                <p>{addon.name}</p>
                <p>+${isMonthly ? `${addon.monthly}/mo`: `${addon.yearly}/yr`}</p>
              </li>
            ))}
          </ul>

          <div className='total'>
            <p>Total ({isMonthly ? 'per month': 'per year'})</p>
            <p>${totalPrice()}{isMonthly ? '/mo': '/yr'}</p>
          </div>

          <div className='buttons'>
            <button className='prev-btn' onClick={handleGoBack}>Go back</button>
            <button className='next-btn' onClick={() => setStep4(true)}>Next step</button>
          </div>
        </div>


        {/* Final */}
        <div className={`form-section${step1 && step2 && step3 && step4 ? 'active-form': ''}`}>
          <div className='final-section'>
            <img src='/public/assets/images/icon-thank-you.svg' alt='check'></img>
            <h1>Thank you!</h1>
            <p>Thanks for confirming subscription! We hope you have fun using our platform. If you ever need support,
              please feel free to email us at at support@loremgaming.com </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default App;
