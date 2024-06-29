import { ErrorMessage } from '../ErrorMessage';
import { Dispatch, FormEvent, SetStateAction, useState, ChangeEventHandler } from 'react';
import {
  isCityValid,
  isEmailValid,
  isFirstNameInputValid,
  isLastNameInputValid,
  isPhoneInputValid,
} from '../utils/validations';
import { FunctionalPhoneInput } from './components/FunctionalPhoneInputComponent';
import { FunctionalTextInput } from './components/FunctionalTextInputComponent';
import { PhoneInputState, UserInformation } from '../types';
import { capitalize, formatPhoneNumber } from '../utils/transformations';

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
  const shouldShowFirstNameError = isSubmitted && !isFirstNameInputValid(firstNameInputState);
  const shouldShowLastNameError = isSubmitted && !isLastNameInputValid(lastNameInputState);
  const shouldShowEmailError = isSubmitted && !isEmailValid(emailInputState);
  const shouldShowCityError = isSubmitted && !isCityValid(cityInputState);
  const shouldShowPhoneError = isSubmitted && !isPhoneInputValid(phoneInputState);

  const clearForm = () => {
    setFirstNameInputState('');
    setLastNameInputState('');
    setEmailInputState('');
    setCityInputState('');
    setPhoneInputState(['', '', '', '']);
  };

  const allInputsValid = () =>
    isFirstNameInputValid(firstNameInputState) &&
    isLastNameInputValid(lastNameInputState) &&
    isEmailValid(emailInputState) &&
    isCityValid(cityInputState) &&
    isPhoneInputValid(phoneInputState);

  const handleInputChange =
    (setState: Dispatch<SetStateAction<string>>): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      setState(e.target.value);
    };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (allInputsValid()) {
      setUserData({
        firstName: capitalize(firstNameInputState),
        lastName: capitalize(lastNameInputState),
        email: emailInputState,
        city: cityInputState,
        phone: formatPhoneNumber(phoneInputState),
      });
      clearForm();
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
          onChange: handleInputChange(setFirstNameInputState),
        }}
      />
      {shouldShowFirstNameError && <ErrorMessage message={firstNameErrorMessage} show={true} />}

      {/* last name input */}
      <FunctionalTextInput
        labelText='Last Name'
        inputProps={{
          placeholder: 'Baggins',
          value: lastNameInputState,
          onChange: handleInputChange(setLastNameInputState),
        }}
      />
      {shouldShowLastNameError && <ErrorMessage message={lastNameErrorMessage} show={true} />}

      {/* Email Input */}
      <FunctionalTextInput
        labelText='Email'
        inputProps={{
          placeholder: 'bilbo-baggins@adventurehobbits.net',
          value: emailInputState,
          onChange: handleInputChange(setEmailInputState),
        }}
      />
      {shouldShowEmailError && <ErrorMessage message={emailErrorMessage} show={true} />}

      {/* City Input */}
      <FunctionalTextInput
        labelText='City'
        inputProps={{
          list: 'cities',
          placeholder: 'Hobbiton',
          value: cityInputState,
          onChange: handleInputChange(setCityInputState),
        }}
      />
      {shouldShowCityError && <ErrorMessage message={cityErrorMessage} show={true} />}

      {/* Phone Input */}
      <FunctionalPhoneInput phoneInputState={phoneInputState} setPhoneInputState={setPhoneInputState} />
      {shouldShowPhoneError && <ErrorMessage message={phoneNumberErrorMessage} show={true} />}

      <input type='submit' value='Submit' />
    </form>
  );
};
