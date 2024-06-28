import { Component } from 'react';
import { TextComponentPropTypes } from '../../types';

export class ClassTextInput extends Component<TextComponentPropTypes> {
  render() {
    const { labelText, inputProps } = this.props;
    return (
      <div className='input-wrap'>
        <label>{labelText}:</label>
        <input type='text' {...inputProps} />
      </div>
    );
  }
}
