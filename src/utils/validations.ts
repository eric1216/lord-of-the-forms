import { PhoneInputState } from '../types';
import { allCities } from './all-cities';

const lettersOnly = /^[a-zA-Z]+$/;

export function isEmailValid(emailAddress: string) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}

export function isFirstNameInputValid(firstName: string) {
  if (firstName.length > 1 && lettersOnly.test(firstName)) {
    return true;
  }
}

export function isLastNameInputValid(lastName: string) {
  if (lastName.length > 1 && lettersOnly.test(lastName)) {
    return true;
  }
}

export function isCityValid(city: string) {
  const formattedCity = city.trim().toLowerCase();
  return allCities.map((city) => city.toLowerCase()).includes(formattedCity);
}

export function isPhoneInputValid(phoneNumber: PhoneInputState) {
  return phoneNumber.reduce((acc, str) => acc + str.length, 0) === 7;
}
