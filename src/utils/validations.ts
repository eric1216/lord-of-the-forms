import { allCities } from './all-cities';

export function isEmailValid(emailAddress: string) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}

export function isFirstNameInputValid(firstName: string) {
  return firstName.length > 2;
}

export function isLastNameInputValid(lastName: string) {
  return lastName.length > 2;
}

export function isCityValid(city: string) {
  return allCities.includes(city);
}

export function isPhoneInputValid(phoneNumber: [string, string, string, string]) {
  return phoneNumber.reduce((acc, str) => acc + str.length, 0) === 7;
}
