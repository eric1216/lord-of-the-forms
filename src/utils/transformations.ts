export const capitalize = (string: string) => {
  // todo: build this function
  // `capitalize("jOn")` should output `"Jon"`
  return string
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.substring(1).toLowerCase())
    .join(' ');
};

export const formatPhoneNumber = (phoneString: string) => {
  // todo: build this function
  // `formatPhoneNumber("1234567")` should be `"12-34-56-7"`
  return phoneString.split('').reduce((acc, val, index) => {
    const prefix = index !== 0 && index % 2 === 0 ? '-' : '';
    return (acc += `${prefix}${val}`);
  }, '');
};
