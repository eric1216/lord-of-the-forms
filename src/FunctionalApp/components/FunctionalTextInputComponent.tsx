import { ErrorMessage } from '../../ErrorMessage';
import { TextComponentPropTypes } from '../../types';

export const FunctionalTextInput = ({
  labelText,
  inputProps,
  errorMessage,
  shouldErrorShow,
}: TextComponentPropTypes) => {
  return (
    <>
      <div className='input-wrap'>
        <label>{labelText}:</label>
        <input type='text' {...inputProps} />
      </div>
      <ErrorMessage message={errorMessage} show={shouldErrorShow} />
    </>
  );
};
