import React, { useState, useEffect } from 'react';
import {
  fetchTeamPlayers,
  fetchTeamData,
  fetchFranchiseYears
} from '../../apis/team';
import {
  extractTeamID,
  extractYear,
  sanitizeTeamPlayers
} from '../../helpers/team';
import TeamTableRS from '../../components/teams/TeamTableRS';
import TeamTablePO from '../../components/teams/TeamTablePO';
import TeamNavButton from '../../components/teams/TeamNavButton';

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
    const newTeam = await fetchTeamData(teamAbbrev, year);
    const franchiseCode = newTeam[0].franchise_code;
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
  }, [currentURL]);

  return (
    <div>
      {!team && (
        <div>
          <h2>Loading....</h2>
        </div>
      )}
      {team && playersRS && playersPO && (
        <div>
          <h1>
            {teamYear} {teamName}
          </h1>
          {teamYear > franchiseFirstYear && (
            <TeamNavButton
              direction='prev'
              franchiseCode={team[0].franchise_code}
              year={teamYear}
            />
          )}
          {teamYear < franchiseLastYear && (
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
