import React from 'react'
import UserProfileInformation from '../../components/user_components/UserProfileInformation';
import ClientDashBoard from './client_dashboard'

export default function Client_Profile() {
  return (
    <ClientDashBoard>
      <UserProfileInformation />
    </ClientDashBoard>
  );
}
