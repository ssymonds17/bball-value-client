import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './views/Home';
import Player from './views/players/Player';
import PlayerIndex from './views/players/PlayerIndex';
import GreatestPlayers from './views/players/GreatestPlayers';
import Team from './views/teams/Team';
import GreatestTeams from './views/teams/GreatestTeams';
import TeamIndex from './views/teams/TeamIndex';
import FranchiseIndex from './views/teams/FranchiseIndex';
import Overall from './views/seasons/Overall';
import RegularSeason from './views/seasons/RegularSeason';
import Playoffs from './views/seasons/Playoffs';
import SeasonIndex from './views/seasons/SeasonIndex';
import GreatestOverall from './views/greatest-seasons/GreatestOverall';
import GreatestRS from './views/greatest-seasons/GreatestRS';
import GreatestPlayoffs from './views/greatest-seasons/GreatestPlayoffs';
import Navbar from './components/Navbar';
import NotFound from './views/NotFound';

import './App.css';

function App() {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        {/* HOME */}
        <Route exact path='/' component={Home} />
        {/* PLAYER */}
        <Route exact path='/players/:playerID' component={Player} />
        {/* PLAYER INDEX */}
        <Route exact path='/players' component={PlayerIndex} />
        {/* TEAM */}
        <Route exact path='/teams/:teamID/:year' component={Team} />
        {/* FRANCHISE INDEX */}
        <Route exact path='/teams' component={FranchiseIndex} />
        {/* TEAM INDEX */}
        <Route exact path='/teams/:teamID' component={TeamIndex} />
        {/* SEASON INDEX */}
        <Route exact path='/seasons' component={SeasonIndex} />
        {/* SEASON OVERALL */}
        <Route
          exact
          path='/seasons/overall/:league/:year'
          component={Overall}
        />
        {/* SEASON RS */}
        <Route
          exact
          path='/seasons/regularseason/:league/:year'
          component={RegularSeason}
        />
        {/* SEASON PLAYOFF */}
        <Route
          exact
          path='/seasons/playoffs/:league/:year'
          component={Playoffs}
        />
        {/* GREATEST PLAYERS */}
        <Route exact path='/rankings/players' component={GreatestPlayers} />
        {/* GREATEST TEAMS */}
        <Route exact path='/rankings/teams' component={GreatestTeams} />
        {/* GREATEST SEASONS OVERALL */}
        <Route
          exact
          path='/rankings/seasons/overall'
          component={GreatestOverall}
        />
        {/* GREATEST SEASONS RS */}
        <Route
          exact
          path='/rankings/seasons/regularseason'
          component={GreatestRS}
        />
        {/* GREATEST SEASONS PLAYOFFS */}
        <Route
          exact
          path='/rankings/seasons/playoffs'
          component={GreatestPlayoffs}
        />
        <Route component={NotFound} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
