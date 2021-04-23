import React from 'react';
import ThemeWrapper, { AppContext } from './theme/ThemeWrapper';
import LandingPage from './containers/landing/LandingPage'
import UserProfile from './containers/UserProfile/UserProfile';
import InformationTechnologyHome from './it/dashboard/InformationTechnologyHome';
import {Switch, Route} from 'react-router-dom';
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

function App() {
  return (
    <ThemeWrapper>
      <AppContext.Consumer>
          {(changeMode) => (
          <Switch>
            <Route path="/" exact component={LandingPage} />
            <Route exact path='/itdashboard' component={InformationTechnologyHome} />
            <Route exact path='/userprofile' component={UserProfile} />
          </Switch>
        )}
      </AppContext.Consumer>
    </ThemeWrapper>
  );
}

export default App;
