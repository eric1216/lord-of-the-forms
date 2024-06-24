import { PhoneInputState } from '../types';

export const capitalize = (string: string) => {
  // todo: build this function
  // `capitalize("jOn")` should output `"Jon"`
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const formatPhoneNumber = (phoneArray: PhoneInputState) => {
  // todo: build this function
  // `formatPhoneNumber("1234567")` should be `"12-34-56-7"`
  return phoneArray.join('-');
};
