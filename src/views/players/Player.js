import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchPlayerData } from '../../apis/player';
import {
  extractPlayerID,
  filterSeasons,
  calculateTotals
} from '../../helpers/player';
import Loading from '../../components/Loading';
import '../../styles/tables.css';
import '../../styles/playerView.css';

export default function Player() {
  const [playerRS, setPlayerRS] = useState(null);
  const [playerPO, setPlayerPO] = useState(null);
  const [playerName, setPlayerName] = useState(null);
  const [overallTotal, setOverallTotal] = useState(null);
  const [rsTotal, setRSTotal] = useState(null);
  const [poTotal, setPOTotal] = useState(null);

  const loadPlayerRecord = async (playerID) => {
    const newPlayer = await fetchPlayerData(playerID);
    const rsSeasons = filterSeasons(newPlayer, 'rs');
    const poSeasons = filterSeasons(newPlayer, 'po');
    setPlayerName(rsSeasons[0].player_name);
    setOverallTotal(calculateTotals(newPlayer));
    setRSTotal(calculateTotals(newPlayer, 'rs'));
    setPOTotal(calculateTotals(newPlayer, 'po'));
    setPlayerRS(rsSeasons);
    setPlayerPO(poSeasons);
  };

  useEffect(() => {
    const playerID = extractPlayerID();
    loadPlayerRecord(playerID);
  }, []);

  return (
    <div>
      {!playerRS && !playerPO && (
        <div className='loading-parent'>
          <Loading />
        </div>
      )}
      {playerRS && playerPO && (
        <div className='container player-container'>
          <header className='player-header'>
            <h1>{playerName}</h1>
            <section className='player-totals-container'>
              <h2>Overall: {overallTotal}</h2>
              <h2>Regular Season: {rsTotal}</h2>
              <h2>Playoffs: {poTotal}</h2>
            </section>
          </header>
          <h2>Regular Season</h2>
          <table>
            <thead>
              <tr>
                <th>Year</th>
                <th>Score</th>
                <th>Lg</th>
                <th>Age</th>
                <th>Team</th>
                <th>Pos</th>
                <th>G</th>
                <th>MP</th>
                <th>Val%</th>
                <th>Tm Record</th>
                <th>Tm Result</th>
              </tr>
            </thead>
            <tbody>
              {playerRS.map((season) => {
                return (
                  <tr key={season.year + season.rs_score}>
                    <td>
                      <Link
                        to={`/seasons/regularseason/${season.league}/${season.year}`}
                      >
                        {season.year}
                      </Link>
                    </td>
                    <td className='score-column'>
                      {Number(season.rs_score).toFixed(2)}
                    </td>
                    <td>
                      <Link
                        to={`/seasons/regularseason/${season.league}/${season.year}`}
                      >
                        {season.league}
                      </Link>
                    </td>
                    <td>{season.rs_age}</td>
                    <td>
                      <Link to={`/teams/${season.rs_tm}/${season.year}`}>
                        {season.rs_tm}
                      </Link>
                    </td>
                    <td>{season.rs_pos}</td>
                    <td>{season.rs_g}</td>
                    <td>{season.rs_mp}</td>
                    <td>{season.rs_val_perc}</td>
                    <td>{season.tm_record}</td>
                    <td>{season.tm_result}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* If no playoff records exist do not display playoff table */}
          {playerPO.length ? (
            <div style={{ borderTop: '0.5px solid black', marginTop: '2rem' }}>
              <h2>Playoffs</h2>
              <table>
                <thead>
                  <tr>
                    <th>Year</th>
                    <th>Score</th>
                    <th>Lg</th>
                    <th>Age</th>
                    <th>Team</th>
                    <th>Pos</th>
                    <th>G</th>
                    <th>MP</th>
                    <th>Val%</th>
                    <th>Tm Result</th>
                  </tr>
                </thead>
                <tbody>
                  {playerPO.map((season) => {
                    return (
                      <tr key={season.year + season.po_score}>
                        <td>
                          <Link
                            to={`/seasons/playoffs/${season.league}/${season.year}`}
                          >
                            {season.year}
                          </Link>
                        </td>
                        <td className='score-column'>
                          {Number(season.po_score).toFixed(2)}
                        </td>
                        <td>
                          <Link
                            to={`/seasons/playoffs/${season.league}/${season.year}`}
                          >
                            {season.league}
                          </Link>
                        </td>
                        <td>{season.po_age}</td>
                        <td>
                          <Link to={`/teams/${season.po_tm}/${season.year}`}>
                            {season.po_tm}
                          </Link>
                        </td>
                        <td>{season.po_pos}</td>
                        <td>{season.po_g}</td>
                        <td>{season.po_mp}</td>
                        <td>{season.po_val_perc}</td>
                        <td>{season.tm_result}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
