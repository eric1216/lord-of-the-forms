import { ChangeEventHandler, Dispatch, Fragment, SetStateAction, useRef } from 'react';
import { PhoneInputState } from '../../types';

const phoneInputs = [
  { id: 'phone-input-1', placeholder: '55', maxLength: 2 },
  { id: 'phone-input-2', placeholder: '55', maxLength: 2 },
  { id: 'phone-input-3', placeholder: '55', maxLength: 2 },
  { id: 'phone-input-4', placeholder: '5', maxLength: 1 },
];

export function FunctionalPhoneInput({
  phoneInputState,
  setPhoneInputState,
}: {
  phoneInputState: PhoneInputState;
  setPhoneInputState: Dispatch<SetStateAction<PhoneInputState>>;
}) {
  const ref0 = useRef<HTMLInputElement>(null);
  const ref1 = useRef<HTMLInputElement>(null);
  const ref2 = useRef<HTMLInputElement>(null);
  const ref3 = useRef<HTMLInputElement>(null);
  const refs = [ref0, ref1, ref2, ref3];

  const createOnChangeHandler =
    (index: number): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const lengths = [2, 2, 2, 1];
      const currentMaxLength = lengths[index];
      const nextRef = refs[index + 1];
      const prevRef = refs[index - 1];
      const value = e.target.value;

      // Allow only numeric input
      if (!/^\d*$/.test(value)) {
        return;
      }

      const shouldGoToNextRef = currentMaxLength === value.length && nextRef?.current;

      const shouldGoToPrevRef = value.length === 0 && prevRef;

      const newState = phoneInputState.map((phoneInput, phoneInputIndex) =>
        index === phoneInputIndex ? e.target.value : phoneInput
      ) as PhoneInputState;

      if (shouldGoToNextRef) {
        nextRef.current?.focus();
      }

      if (shouldGoToPrevRef) {
        prevRef.current?.focus();
      }

      setPhoneInputState(newState);
    };

  return (
    <div className='input-wrap'>
      <label htmlFor='phone'>Phone:</label>
      <div id='phone-input-wrap'>
        {phoneInputs.map((input, index) => (
          <Fragment key={input.id}>
            <input
              key={input.id}
              type='text'
              id={input.id}
              placeholder={input.placeholder}
              ref={refs[index]}
              value={phoneInputState[index]}
              onChange={createOnChangeHandler(index)}
              maxLength={input.maxLength}
            />
            {index < phoneInputs.length - 1 && '-'}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
