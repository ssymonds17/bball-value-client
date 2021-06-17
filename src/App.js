import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Player from './views/players/Player';
import Team from './views/teams/Team';

function App() {
  return (
    <React.Fragment>
      <Switch>
        <Route exact path='/' component={Player} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
