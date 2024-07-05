import { Component } from 'react';
import { ErrorMessage } from '../../ErrorMessage';
import { TextComponentPropTypes } from '../../types';

export class ClassTextInput extends Component<TextComponentPropTypes> {
  render() {
    const { labelText, inputProps, errorMessage, shouldErrorShow } = this.props;
    return (
      <>
        <div className='input-wrap'>
          <label>{labelText}:</label>
          <input type='text' {...inputProps} />
        </div>
        <ErrorMessage message={errorMessage} show={shouldErrorShow} />
      </>
    );
  }
}
