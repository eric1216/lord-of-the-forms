import { TextComponentPropTypes } from '../../types';

export const FunctionalTextInput = ({ labelText, inputProps }: TextComponentPropTypes) => {
  return (
    <div className='input-wrap'>
      <label>{labelText}:</label>
      <input type='text' {...inputProps} />
    </div>
  );
};
