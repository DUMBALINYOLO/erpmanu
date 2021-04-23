import React from 'react';
import ProfileBag from '../Templates/ProfileBag';
import Profile from './Profile';



class CompanyProfile extends React.Component {
  render() {

    return (
      <ProfileBag >
          <Profile />
      </ProfileBag >
    );
  }
}

export default CompanyProfile;