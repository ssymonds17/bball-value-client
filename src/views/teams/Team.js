import React, { useState, useEffect } from 'react';
import {
  fetchTeamPlayers,
  fetchTeamData,
  fetchFranchiseYears,
  fetchFranchiseCode
} from '../../apis/team';
import {
  extractTeamID,
  extractYear,
  sanitizeTeamPlayers,
  checkFirstYear,
  checkLastYear
} from '../../helpers/team';
import TeamTableRS from '../../components/teams/TeamTableRS';
import TeamTablePO from '../../components/teams/TeamTablePO';
import TeamNavButton from '../../components/teams/TeamNavButton';
import Loading from '../../components/Loading';

export default function Team() {
  const [playersRS, setPlayersRS] = useState([]);
  const [playersPO, setPlayersPO] = useState([]);
  const [team, setTeam] = useState(null);
  const [teamYear, setTeamYear] = useState(null);
  const [teamName, setTeamName] = useState(null);
  const [franchiseFirstYear, setFranchiseFirstYear] = useState(null);
  const [franchiseLastYear, setFranchiseLastYear] = useState(null);
  const [initialURL, setInitialURL] = useState('');
  const currentURL = window.location.pathname;

  const loadTeamRecord = async (teamAbbrev, year) => {
    // Retrieve franchise code with the team abbreviation
    const franchise = await fetchFranchiseCode(teamAbbrev);
    const franchiseCode = franchise[0].franchise_code;
    // Get the team data for that year using franchise code and year
    const newTeam = await fetchTeamData(franchiseCode, year);
    // Get the player records for that team season
    const teamPlayers = await fetchTeamPlayers(franchiseCode, year);
    const franchiseYears = await fetchFranchiseYears(franchiseCode);
    const rsPlayers = sanitizeTeamPlayers(teamPlayers, 'rs');
    const poPlayers = sanitizeTeamPlayers(teamPlayers, 'po');
    setTeamYear(newTeam[0].year);
    setTeamName(newTeam[0].team_full);
    setPlayersRS(rsPlayers);
    setPlayersPO(poPlayers);
    setTeam(newTeam);
    setFranchiseFirstYear(franchiseYears[0].first_year);
    setFranchiseLastYear(franchiseYears[0].last_year);
  };

  useEffect(() => {
    const teamAbbrev = extractTeamID();
    const year = extractYear();
    loadTeamRecord(teamAbbrev, year);
    setInitialURL(window.location.pathname);
  }, []);

  // When navigational buttons to prev and next seasons are clicked another db call is triggered to get the new season data. This is done by checking the old url path to the existing one and looking for discrepencies
  useEffect(() => {
    if (initialURL !== currentURL) {
      const teamAbbrev = extractTeamID();
      const year = extractYear();
      loadTeamRecord(teamAbbrev, year);
      setInitialURL(window.location.pathname);
    }
  }, [currentURL, initialURL]);

  return (
    <div>
      {!team && (
        <div>
          <Loading />
        </div>
      )}
      {team && playersRS && playersPO && (
        <div>
          <h1>
            {teamYear} {teamName}
          </h1>
          {/* Ensure user cannot navigate to season earlier than first year */}
          {checkFirstYear(
            teamYear,
            franchiseFirstYear,
            team[0].franchise_code
          ) && (
            <TeamNavButton
              direction='prev'
              franchiseCode={team[0].franchise_code}
              year={teamYear}
            />
          )}
          {/* Ensure user cannot navigate to season later than last year */}
          {checkLastYear(
            teamYear,
            franchiseLastYear,
            team[0].franchise_code
          ) && (
            <TeamNavButton
              direction='next'
              franchiseCode={team[0].franchise_code}
              year={teamYear}
            />
          )}
          <h2>Regular Season</h2>
          <TeamTableRS playersRS={playersRS} />
          {/* If no playoff records exist do not display playoff table */}
          {playersPO.length ? (
            <div>
              <h2>Playoffs</h2>
              <TeamTablePO playersPO={playersPO} />
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
