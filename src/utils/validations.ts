import { allCities } from './all-cities';

const StartWithTwoCharactersNoNumbers = /^[A-Za-z]{2}[A-Za-z\s.]*$/;

export function isEmailValid(emailAddress: string) {
  // eslint-disable-next-line no-useless-escape
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return !!emailAddress.match(regex);
}

export function isFirstNameInputValid(firstName: string) {
  if (firstName.length > 1 && StartWithTwoCharactersNoNumbers.test(firstName)) {
    return true;
  }
}

export function isLastNameInputValid(lastName: string) {
  if (lastName.length > 1 && StartWithTwoCharactersNoNumbers.test(lastName)) {
    return true;
  }
}

export function isCityValid(city: string) {
  return allCities.includes(city);
}

export function isPhoneInputValid(phoneNumber: [string, string, string, string]) {
  return phoneNumber.reduce((acc, str) => acc + str.length, 0) === 7;
}
