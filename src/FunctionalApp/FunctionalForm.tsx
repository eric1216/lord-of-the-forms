import { ErrorMessage } from '../ErrorMessage';
import { ChangeEvent, useState, Dispatch, SetStateAction } from 'react';
import {
  isCityValid,
  isEmailValid,
  isFirstNameInputValid,
  isLastNameInputValid,
  isPhoneInputValid,
} from '../utils/validations';
import { FunctionalPhoneInput, PhoneInputState } from './components/FunctionalPhoneInputComponent';

const firstNameErrorMessage = 'First name must be at least 2 characters long';
const lastNameErrorMessage = 'Last name must be at least 2 characters long';
const emailErrorMessage = 'Email is Invalid';
const cityErrorMessage = 'State is Invalid';
const phoneNumberErrorMessage = 'Invalid Phone Number';

export const FunctionalForm = () => {
  // state
  const [firstNameInputState, setFirstNameInputState] = useState('');
  const [lastNameInputState, setLastNameInputState] = useState('');
  const [emailInputState, setEmailInputState] = useState('');
  const [cityInputState, setCityInputState] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phoneInputState, setPhoneInputState] = useState<PhoneInputState>(['', '', '', '']);

  // validations
  const shouldShowFirstNameError = isSubmitted && !isFirstNameInputValid(firstNameInputState);
  const shouldShowLastNameError = isSubmitted && !isLastNameInputValid(lastNameInputState);
  const shouldShowEmailError = isSubmitted && !isEmailValid(emailInputState);
  const shouldShowCityError = isSubmitted && !isCityValid(cityInputState);
  const shouldShowPhoneError = isSubmitted && !isPhoneInputValid(phoneInputState);

  const handleInputOnChange = (event: ChangeEvent<HTMLInputElement>, stateSetter: Dispatch<SetStateAction<string>>) => {
    // Allow only alphabetic input
    if (!/^[a-zA-Z]*$/.test(event.currentTarget.value)) {
      return;
    }
    stateSetter(event.currentTarget.value);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setIsSubmitted(true);
      }}>
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <div className='input-wrap'>
        <label>{'First Name'}:</label>
        <input
          type='text'
          placeholder='Bilbo'
          value={firstNameInputState}
          onChange={(e) => {
            handleInputOnChange(e, setFirstNameInputState);
          }}
        />
      </div>
      {shouldShowFirstNameError && <ErrorMessage message={firstNameErrorMessage} show={true} />}

      {/* last name input */}
      <div className='input-wrap'>
        <label>{'Last Name'}:</label>
        <input
          type='text'
          placeholder='Baggins'
          value={lastNameInputState}
          onChange={(e) => {
            handleInputOnChange(e, setLastNameInputState);
          }}
        />
      </div>
      {shouldShowLastNameError && <ErrorMessage message={lastNameErrorMessage} show={true} />}

      {/* Email Input */}
      <div className='input-wrap'>
        <label>{'Email'}:</label>
        <input
          type='text'
          placeholder='bilbo-baggins@adventurehobbits.net'
          value={emailInputState}
          onChange={(e) => {
            setEmailInputState(e.target.value);
          }}
        />
      </div>
      {shouldShowEmailError && <ErrorMessage message={emailErrorMessage} show={true} />}

      {/* City Input */}
      <div className='input-wrap'>
        <label>{'City'}:</label>
        <input
          type='text'
          list='cities'
          placeholder='Hobbiton'
          value={cityInputState}
          onChange={(e) => {
            setCityInputState(e.target.value);
          }}
        />
      </div>
      {shouldShowCityError && <ErrorMessage message={cityErrorMessage} show={true} />}

      <div className='input-wrap'>
        <label htmlFor='phone'>Phone:</label>
        <div id='phone-input-wrap'>
          <FunctionalPhoneInput phoneInputState={phoneInputState} setPhoneInputState={setPhoneInputState} />
        </div>
      </div>
      {shouldShowPhoneError && <ErrorMessage message={phoneNumberErrorMessage} show={true} />}

      <input type='submit' value='Submit' />
    </form>
  );
};
