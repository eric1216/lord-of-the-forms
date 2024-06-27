import { Component } from 'react';
import { ClassForm } from './ClassForm';
import { UserInformation } from '../types';
import { ProfileInformation } from '../ProfileInformation';
type State = { userInformation: UserInformation | null };

export class ClassApp extends Component<Record<string, never>, State> {
  state = { userInformation: null };

  updateUserInformation = (newUserInformation: UserInformation | null) => {
    this.setState({ userInformation: newUserInformation });
  };

  render() {
    return (
      <>
        <h2>Class</h2>
        <ProfileInformation
          userData={
            // toggle the following lines to change
            // null
            // defaultUser
            this.state.userInformation
          }
        />
        <ClassForm updateUserInformation={this.updateUserInformation} />
      </>
    );
  }
}
