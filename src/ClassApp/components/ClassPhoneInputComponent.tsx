import { ChangeEventHandler, Component, createRef, Fragment } from 'react';
import { PhoneInputState } from '../../types';

type ClassPhoneInputState = {
  phoneInputState: PhoneInputState;
  updatePhoneState: (newPhoneState: PhoneInputState) => void;
};

const phoneInputs = [
  { id: 'phone-input-1', placeholder: '55', maxLength: 2 },
  { id: 'phone-input-2', placeholder: '55', maxLength: 2 },
  { id: 'phone-input-3', placeholder: '55', maxLength: 2 },
  { id: 'phone-input-4', placeholder: '5', maxLength: 1 },
];

export class ClassPhoneInput extends Component<ClassPhoneInputState> {
  ref0 = createRef<HTMLInputElement>();
  ref1 = createRef<HTMLInputElement>();
  ref2 = createRef<HTMLInputElement>();
  ref3 = createRef<HTMLInputElement>();
  refsArr = [this.ref0, this.ref1, this.ref2, this.ref3];

  createOnChangeHandler =
    (index: number): ChangeEventHandler<HTMLInputElement> =>
    (e) => {
      const lengths = [2, 2, 2, 1];
      const currentMaxLength = lengths[index];
      const nextRef = this.refsArr[index + 1];
      const prevRef = this.refsArr[index - 1];
      const value = e.target.value;

      // Allow only numeric input
      if (!/^\d*$/.test(value)) {
        return;
      }

      const shouldGoToNextRef = currentMaxLength === value.length && nextRef?.current;

      const shouldGoToPrevRef = value.length === 0 && prevRef;

      const newState = this.props.phoneInputState.map((phoneInput, phoneInputIndex) =>
        index === phoneInputIndex ? e.target.value : phoneInput
      ) as PhoneInputState;

      if (shouldGoToNextRef) {
        nextRef.current?.focus();
      }

      if (shouldGoToPrevRef) {
        prevRef.current?.focus();
      }

      this.props.updatePhoneState(newState);
    };

  render() {
    const { phoneInputState } = this.props;
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
                ref={this.refsArr[index]}
                value={phoneInputState[index]}
                onChange={this.createOnChangeHandler(index)}
                maxLength={input.maxLength}
              />
              {index < phoneInputs.length - 1 && '-'}
            </Fragment>
          ))}
        </div>
      </div>
    );
  }
}
