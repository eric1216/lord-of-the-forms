import { useState } from 'react';
import { ProfileInformation } from '../ProfileInformation';
import { FunctionalForm } from './FunctionalForm';

export const FunctionalApp = () => {
  const [userData, setUserData] = useState([]);

  return (
    <>
      <h2>Functional</h2>
      <ProfileInformation userData={null} />
      <FunctionalForm />
    </>
  );
};
