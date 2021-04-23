import React from 'react';
import Corporate from '../Templates/Corporate';
import  HomePage  from './HomePage';

class Landing extends React.Component {
  render() {
    return (
      <Corporate>
        <HomePage />
      </Corporate>
    );
  }
}

export default Landing;
