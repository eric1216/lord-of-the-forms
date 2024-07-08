import { Component, FormEvent } from 'react';
import { PhoneInputState, UserInformation } from '../types';
import { isCityValid, isEmailValid, isFirstAndLastNameInputValid, isPhoneInputValid } from '../utils/validations';
import { ClassPhoneInput } from './components/ClassPhoneInputComponent';
import { ClassTextInput } from './components/ClassTextInputComponent';

const firstNameErrorMessage = 'First name must be at least 2 characters long';
const lastNameErrorMessage = 'Last name must be at least 2 characters long';
const emailErrorMessage = 'Email is Invalid';
const cityErrorMessage = 'State is Invalid';
const phoneNumberErrorMessage = 'Invalid Phone Number';

type ClassFormPropTypes = {
  updateUserInformation: (newUserInformation: UserInformation | null) => void;
};

const defaultUserObject = {
  firstNameInputState: '',
  lastNameInputState: '',
  emailInputState: '',
  cityInputState: '',
  phoneInputState: ['', '', '', ''] as PhoneInputState,
  isSubmitted: false,
};

export class ClassForm extends Component<ClassFormPropTypes> {
  state = {
    defaultUserObject,
  };

  isFirstNameValueValid = () => isFirstAndLastNameInputValid(this.state.defaultUserObject.firstNameInputState);
  isLastNameValueValid = () => isFirstAndLastNameInputValid(this.state.defaultUserObject.lastNameInputState);
  isEmailValueValid = () => isEmailValid(this.state.defaultUserObject.emailInputState);
  isCityValueValid = () => isCityValid(this.state.defaultUserObject.cityInputState);
  isPhoneValueValid = () => isPhoneInputValid(this.state.defaultUserObject.phoneInputState);

  updatePhoneState = (newPhoneState: PhoneInputState) => {
    this.setState({ phoneInputState: newPhoneState });
  };

  clearStateAndForm = () => {
    this.setState(defaultUserObject);
  };

  allInputsValid = () =>
    this.isFirstNameValueValid() &&
    this.isLastNameValueValid() &&
    this.isEmailValueValid() &&
    this.isCityValueValid() &&
    this.isPhoneValueValid();

  setUserData = () => ({
    firstName: this.state.defaultUserObject.firstNameInputState,
    lastName: this.state.defaultUserObject.lastNameInputState,
    email: this.state.defaultUserObject.emailInputState,
    city: this.state.defaultUserObject.cityInputState,
    phone: this.state.defaultUserObject.phoneInputState.join(''),
  });

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (this.allInputsValid()) {
      this.props.updateUserInformation(this.setUserData());
      this.clearStateAndForm();
      this.setState({ isSubmitted: false });
    } else {
      alert('bad input data');
      this.setState({ isSubmitted: true });
    }
  };

  render() {
    const { firstNameInputState, lastNameInputState, emailInputState, cityInputState, phoneInputState, isSubmitted } =
      this.state.defaultUserObject;

    const shouldShowFirstNameError = isSubmitted && !this.isFirstNameValueValid();
    const shouldShowLastNameError = isSubmitted && !this.isLastNameValueValid();
    const shouldShowEmailError = isSubmitted && !this.isEmailValueValid();
    const shouldShowCityError = isSubmitted && !this.isCityValueValid();
    const shouldShowPhoneError = isSubmitted && !this.isPhoneValueValid();

    return (
      <form onSubmit={this.handleSubmit}>
        <u>
          <h3>User Information Form</h3>
        </u>

        {/* first name input */}
        <ClassTextInput
          labelText='First Name'
          inputProps={{
            placeholder: 'Bilbo',
            value: firstNameInputState,
            onChange: (e) => this.setState({ firstNameInputState: e.target.value }),
          }}
          errorMessage={firstNameErrorMessage}
          shouldErrorShow={shouldShowFirstNameError}
        />

        {/* last name input */}
        <ClassTextInput
          labelText='Last Name'
          inputProps={{
            placeholder: 'Baggins',
            value: lastNameInputState,
            onChange: (e) => this.setState({ lastNameInputState: e.target.value }),
          }}
          errorMessage={lastNameErrorMessage}
          shouldErrorShow={shouldShowLastNameError}
        />

        {/* Email Input */}
        <ClassTextInput
          labelText='Email'
          inputProps={{
            placeholder: 'bilbo-baggins@adventurehobbits.net',
            value: emailInputState,
            onChange: (e) => this.setState({ emailInputState: e.target.value }),
          }}
          errorMessage={emailErrorMessage}
          shouldErrorShow={shouldShowEmailError}
        />

        {/* City Input */}
        <ClassTextInput
          labelText='City'
          inputProps={{
            list: 'cities',
            placeholder: 'Hobbiton',
            value: cityInputState,
            onChange: (e) => this.setState({ cityInputState: e.target.value }),
          }}
          errorMessage={cityErrorMessage}
          shouldErrorShow={shouldShowCityError}
        />

        {/* Phone Input */}
        <ClassPhoneInput
          phoneInputState={phoneInputState}
          updatePhoneState={this.updatePhoneState}
          errorMessage={phoneNumberErrorMessage}
          shouldErrorShow={shouldShowPhoneError}
        />

        <input type='submit' value='Submit' />
      </form>
    );
  }
}
