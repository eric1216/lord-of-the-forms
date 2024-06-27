import { Component, FormEvent } from 'react';
import { ErrorMessage } from '../ErrorMessage';
import { PhoneInputState, UserInformation } from '../types';
import {
  isCityValid,
  isEmailValid,
  isFirstNameInputValid,
  isLastNameInputValid,
  isPhoneInputValid,
} from '../utils/validations';
import { ClassPhoneInput } from './components/ClassPhoneInputComponent';
import { ClassTextInput } from './components/ClassTextInputComponent';
import { capitalize, formatPhoneNumber } from '../utils/transformations';

const firstNameErrorMessage = 'First name must be at least 2 characters long';
const lastNameErrorMessage = 'Last name must be at least 2 characters long';
const emailErrorMessage = 'Email is Invalid';
const cityErrorMessage = 'State is Invalid';
const phoneNumberErrorMessage = 'Invalid Phone Number';

type ClassFormPropTypes = {
  updateUserInformation: (newUserInformation: UserInformation | null) => void;
};

export class ClassForm extends Component<ClassFormPropTypes> {
  state = {
    firstNameInputState: '',
    lastNameInputState: '',
    emailInputState: '',
    cityInputState: '',
    phoneInputState: ['', '', '', ''] as PhoneInputState,

    isSubmitted: false,
  };

  updatePhoneState = (newPhoneState: PhoneInputState) => {
    this.setState({ phoneInputState: newPhoneState });
  };

  clearForm = () => {
    this.setState({
      firstNameInputState: '',
      lastNameInputState: '',
      emailInputState: '',
      cityInputState: '',
      phoneInputState: ['', '', '', ''],

      isSubmitted: false,
    });
  };

  handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (
      isFirstNameInputValid(this.state.firstNameInputState) &&
      isLastNameInputValid(this.state.lastNameInputState) &&
      isEmailValid(this.state.emailInputState) &&
      isCityValid(this.state.cityInputState) &&
      isPhoneInputValid(this.state.phoneInputState)
    ) {
      this.props.updateUserInformation({
        firstName: capitalize(this.state.firstNameInputState),
        lastName: capitalize(this.state.lastNameInputState),
        email: this.state.emailInputState,
        city: this.state.cityInputState,
        phone: formatPhoneNumber(this.state.phoneInputState),
      });
      this.clearForm();
    } else {
      alert('bad input data');
      this.setState({ isSubmitted: true });
    }
  };

  render() {
    const { firstNameInputState, lastNameInputState, emailInputState, cityInputState, phoneInputState, isSubmitted } =
      this.state;

    const shouldShowFirstNameError = isSubmitted && !isFirstNameInputValid(firstNameInputState);
    const shouldShowLastNameError = isSubmitted && !isLastNameInputValid(lastNameInputState);
    const shouldShowEmailError = isSubmitted && !isEmailValid(emailInputState);
    const shouldShowCityError = isSubmitted && !isCityValid(cityInputState);
    const shouldShowPhoneError = isSubmitted && !isPhoneInputValid(phoneInputState);

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
            onChange: (e) => {
              this.setState({ firstNameInputState: e.target.value });
            },
          }}
        />
        {shouldShowFirstNameError && <ErrorMessage message={firstNameErrorMessage} show={true} />}

        {/* last name input */}
        <ClassTextInput
          labelText='Last Name'
          inputProps={{
            placeholder: 'Baggins',
            value: lastNameInputState,
            onChange: (e) => {
              this.setState({ lastNameInputState: e.target.value });
            },
          }}
        />
        {shouldShowLastNameError && <ErrorMessage message={lastNameErrorMessage} show={true} />}

        {/* Email Input */}
        <ClassTextInput
          labelText='Email'
          inputProps={{
            placeholder: 'bilbo-baggins@adventurehobbits.net',
            value: emailInputState,
            onChange: (e) => {
              this.setState({ emailInputState: e.target.value });
            },
          }}
        />
        {shouldShowEmailError && <ErrorMessage message={emailErrorMessage} show={true} />}

        {/* City Input */}
        <ClassTextInput
          labelText='Email'
          inputProps={{
            list: 'cities',
            placeholder: 'Hobbiton',
            value: cityInputState,
            onChange: (e) => {
              this.setState({ cityInputState: e.target.value });
            },
          }}
        />
        {shouldShowCityError && <ErrorMessage message={cityErrorMessage} show={true} />}

        {/* Phone Input */}
        <ClassPhoneInput phoneInputState={phoneInputState} updatePhoneState={this.updatePhoneState} />
        {shouldShowPhoneError && <ErrorMessage message={phoneNumberErrorMessage} show={true} />}

        <input type='submit' value='Submit' />
      </form>
    );
  }
}
