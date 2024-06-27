import { Component, ComponentProps } from 'react';

type ClassTextPropTypes = {
  labelText: string;
  inputProps: ComponentProps<'input'>;
};

export class ClassTextInput extends Component<ClassTextPropTypes> {
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
