import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { isCityValid, isEmailValid, isFirstAndLastNameInputValid, isPhoneInputValid } from '../utils/validations';
import { FunctionalPhoneInput } from './components/FunctionalPhoneInputComponent';
import { FunctionalTextInput } from './components/FunctionalTextInputComponent';
import { PhoneInputState, UserInformation } from '../types';

const firstNameErrorMessage = 'First name must be at least 2 characters long';
const lastNameErrorMessage = 'Last name must be at least 2 characters long';
const emailErrorMessage = 'Email is Invalid';
const cityErrorMessage = 'State is Invalid';
const phoneNumberErrorMessage = 'Invalid Phone Number';

type FunctionalFormPropTypes = {
  setUserData: Dispatch<SetStateAction<UserInformation | null>>;
};

export const FunctionalForm = ({ setUserData }: FunctionalFormPropTypes) => {
  // state
  const [firstNameInputState, setFirstNameInputState] = useState('');
  const [lastNameInputState, setLastNameInputState] = useState('');
  const [emailInputState, setEmailInputState] = useState('');
  const [cityInputState, setCityInputState] = useState('');
  const [phoneInputState, setPhoneInputState] = useState<PhoneInputState>(['', '', '', '']);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // validations
  const isFirstNameValueValid = isFirstAndLastNameInputValid(firstNameInputState);
  const isLastNameValueValid = isFirstAndLastNameInputValid(lastNameInputState);
  const isEmailValueValid = isEmailValid(emailInputState);
  const isCityValueValid = isCityValid(cityInputState);
  const isPhoneValueValid = isPhoneInputValid(phoneInputState);

  // error message handling
  const shouldShowFirstNameError = isSubmitted && !isFirstNameValueValid;
  const shouldShowLastNameError = isSubmitted && !isLastNameValueValid;
  const shouldShowEmailError = isSubmitted && !isEmailValueValid;
  const shouldShowCityError = isSubmitted && !isCityValueValid;
  const shouldShowPhoneError = isSubmitted && !isPhoneValueValid;

  const clearStateAndForm = () => {
    setFirstNameInputState('');
    setLastNameInputState('');
    setEmailInputState('');
    setCityInputState('');
    setPhoneInputState(['', '', '', '']);
  };

  const allInputsValid = () =>
    isFirstNameValueValid && isLastNameValueValid && isEmailValueValid && isCityValueValid && isPhoneValueValid;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (allInputsValid()) {
      setUserData({
        firstName: firstNameInputState,
        lastName: lastNameInputState,
        email: emailInputState,
        city: cityInputState,
        phone: phoneInputState.join(''),
      });
      clearStateAndForm();
      setIsSubmitted(false);
    } else {
      alert('bad input data');
      setIsSubmitted(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <u>
        <h3>User Information Form</h3>
      </u>

      {/* first name input */}
      <FunctionalTextInput
        labelText={'First Name'}
        inputProps={{
          placeholder: 'Bilbo',
          value: firstNameInputState,
          onChange: (e) => setFirstNameInputState(e.target.value),
        }}
        errorMessage={firstNameErrorMessage}
        shouldErrorShow={shouldShowFirstNameError}
      />

      {/* last name input */}
      <FunctionalTextInput
        labelText='Last Name'
        inputProps={{
          placeholder: 'Baggins',
          value: lastNameInputState,
          onChange: (e) => setLastNameInputState(e.target.value),
        }}
        errorMessage={lastNameErrorMessage}
        shouldErrorShow={shouldShowLastNameError}
      />

      {/* Email Input */}
      <FunctionalTextInput
        labelText='Email'
        inputProps={{
          placeholder: 'bilbo-baggins@adventurehobbits.net',
          value: emailInputState,
          onChange: (e) => setEmailInputState(e.target.value),
        }}
        errorMessage={emailErrorMessage}
        shouldErrorShow={shouldShowEmailError}
      />

      {/* City Input */}
      <FunctionalTextInput
        labelText='City'
        inputProps={{
          list: 'cities',
          placeholder: 'Hobbiton',
          value: cityInputState,
          onChange: (e) => setCityInputState(e.target.value),
        }}
        errorMessage={cityErrorMessage}
        shouldErrorShow={shouldShowCityError}
      />

      {/* Phone Input */}
      <FunctionalPhoneInput
        phoneInputState={phoneInputState}
        setPhoneInputState={setPhoneInputState}
        errorMessage={phoneNumberErrorMessage}
        shouldErrorShow={shouldShowPhoneError}
      />

      <input type='submit' value='Submit' />
    </form>
  );
};
