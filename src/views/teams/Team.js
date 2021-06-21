import React, { useState, useEffect } from 'react';
import { fetchTeamPlayers, fetchTeamData } from '../../apis/team';
import {
  extractTeamID,
  extractYear,
  sanitizeTeamPlayers
} from '../../helpers/team';
import TeamTableRS from '../../components/teams/TeamTableRS';
import TeamTablePO from '../../components/teams/TeamTablePO';

export default function Team() {
  const [playersRS, setPlayersRS] = useState([]);
  const [playersPO, setPlayersPO] = useState([]);
  const [team, setTeam] = useState(null);
  const [teamYear, setTeamYear] = useState(null);
  const [teamName, setTeamName] = useState(null);

  const loadTeamRecord = async (teamAbbrev, year) => {
    const newTeam = await fetchTeamData(teamAbbrev, year);
    const franchiseCode = newTeam[0].franchise_code;
    const teamPlayers = await fetchTeamPlayers(franchiseCode, year);
    const rsPlayers = sanitizeTeamPlayers(teamPlayers, 'rs');
    const poPlayers = sanitizeTeamPlayers(teamPlayers, 'po');
    setTeamYear(newTeam[0].year);
    setTeamName(newTeam[0].team_full);
    setPlayersRS(rsPlayers);
    setPlayersPO(poPlayers);
    setTeam(newTeam);
  };

  useEffect(() => {
    const teamAbbrev = extractTeamID();
    const year = extractYear();
    loadTeamRecord(teamAbbrev, year);
  }, []);

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
