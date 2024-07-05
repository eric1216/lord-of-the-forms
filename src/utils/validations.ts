import { PhoneInputState } from '../types';
import { allCities } from './all-cities';

const lettersOnly = /^[a-zA-Z]+$/;

export function isEmailValid(emailAddress: string) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}

export function isFirstAndLastNameInputValid(name: string) {
  return name.length > 1 && lettersOnly.test(name);
}

export function isCityValid(city: string) {
  const formattedCity = city.trim().toLowerCase();
  return allCities.map((city) => city.toLowerCase()).includes(formattedCity);
}

export function isPhoneInputValid(phoneNumber: PhoneInputState) {
  return phoneNumber.join('').length === 7;
}
