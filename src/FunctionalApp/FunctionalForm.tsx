import { ErrorMessage } from '../ErrorMessage';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
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
import { formatPhoneNumber } from '../utils/transformations';

const firstNameErrorMessage = 'First name must be at least 2 characters long';
const lastNameErrorMessage = 'Last name must be at least 2 characters long';
const emailErrorMessage = 'Email is Invalid';
const cityErrorMessage = 'State is Invalid';
const phoneNumberErrorMessage = 'Invalid Phone Number';

export const FunctionalForm = ({ setUserData }: { setUserData: Dispatch<SetStateAction<UserInformation | null>> }) => {
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
    setIsSubmitted(false);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (
      isFirstNameInputValid(firstNameInputState) &&
      isLastNameInputValid(lastNameInputState) &&
      isEmailValid(emailInputState) &&
      isCityValid(cityInputState) &&
      isPhoneInputValid(phoneInputState)
    ) {
      setUserData({
        firstName: firstNameInputState,
        lastName: lastNameInputState,
        email: emailInputState,
        city: cityInputState,
        phone: formatPhoneNumber(phoneInputState),
      });
      clearForm();
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
          onChange: (e) => {
            setFirstNameInputState(e.target.value);
          },
        }}
      />
      {shouldShowFirstNameError && <ErrorMessage message={firstNameErrorMessage} show={true} />}

      {/* last name input */}
      <FunctionalTextInput
        labelText='Last Name'
        inputProps={{
          placeholder: 'Baggins',
          value: lastNameInputState,
          onChange: (e) => {
            setLastNameInputState(e.target.value);
          },
        }}
      />
      {shouldShowLastNameError && <ErrorMessage message={lastNameErrorMessage} show={true} />}

      {/* Email Input */}
      <FunctionalTextInput
        labelText='Email'
        inputProps={{
          placeholder: 'bilbo-baggins@adventurehobbits.net',
          value: emailInputState,
          onChange: (e) => {
            setEmailInputState(e.target.value);
          },
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
          onChange: (e) => {
            setCityInputState(e.target.value);
          },
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
