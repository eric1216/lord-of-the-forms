import { PhoneInputState } from '../types';

export const capitalize = (string: string) => {
  // todo: build this function
  // `capitalize("jOn")` should output `"Jon"`
  return string
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export const formatPhoneNumber = (phoneArray: PhoneInputState) => {
  // todo: build this function
  // `formatPhoneNumber("1234567")` should be `"12-34-56-7"`
  return phoneArray.join('-');
};
