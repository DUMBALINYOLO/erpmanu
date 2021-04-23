import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Creative from '../Templates/Creative';
import LandingPage from '../landing/LandingPage';

class Landing extends React.Component {
  render() {
    return (
      <Creative>
        <Switch>
          <Route exact path="/landing-creative" component={LandingPage} />
        </Switch>
      </Creative>
    );
  }
}

export default Landing;

