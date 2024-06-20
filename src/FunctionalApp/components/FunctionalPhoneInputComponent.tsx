import { ChangeEventHandler, Dispatch, SetStateAction, useRef } from 'react';

export type PhoneInputState = [string, string, string, string];

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
    (index: 0 | 1 | 2 | 3): ChangeEventHandler<HTMLInputElement> =>
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
    <>
      <input
        type='text'
        id='phone-input-1'
        placeholder='55'
        ref={ref0}
        value={phoneInputState[0]}
        onChange={createOnChangeHandler(0)}
        maxLength={2}
      />
      -
      <input
        type='text'
        id='phone-input-2'
        placeholder='55'
        ref={ref1}
        value={phoneInputState[1]}
        onChange={createOnChangeHandler(1)}
        maxLength={2}
      />
      -
      <input
        type='text'
        id='phone-input-3'
        placeholder='55'
        ref={ref2}
        value={phoneInputState[2]}
        onChange={createOnChangeHandler(2)}
        maxLength={2}
      />
      -
      <input
        type='text'
        id='phone-input-4'
        placeholder='5'
        ref={ref3}
        value={phoneInputState[3]}
        onChange={createOnChangeHandler(3)}
        maxLength={1}
      />
    </>
  );
}
