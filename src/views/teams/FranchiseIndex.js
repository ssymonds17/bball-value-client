import React, { useState, useEffect } from 'react';
import {
  fetchCurrentFranchises,
  fetchDefunctFranchises
} from '../../apis/team';

export default function FranchiseIndex() {
  const [currentFranchises, setCurrentFranchises] = useState([]);
  const [defunctFranchises, setDefunctFranchises] = useState([]);
  const [isCurrentLoading, setIsCurrentLoading] = useState(true);
  const [isDefunctLoading, setIsDefunctLoading] = useState(true);

  const loadCurrentFranchiseList = async () => {
    const current = await fetchCurrentFranchises();
    setCurrentFranchises(current);
    setIsCurrentLoading(false);
  };
  const loadDefunctFranchiseList = async () => {
    const defunct = await fetchDefunctFranchises();
    setDefunctFranchises(defunct);
    setIsDefunctLoading(false);
  };

  useEffect(() => {
    loadCurrentFranchiseList();
    loadDefunctFranchiseList();
  }, []);

  return (
    <div>
      <h1>Franchise Index</h1>
      {isCurrentLoading && isDefunctLoading && <div>Loading....</div>}
      {!isCurrentLoading && (
        <div>
          <h1>Current Franchises</h1>
          <table>
            <thead>
              <tr>
                <th>Team Name</th>
                <th>From</th>
                <th>Until</th>
              </tr>
            </thead>
            <tbody>
              {currentFranchises.map((franchise) => {
                return (
                  <tr key={franchise.franchise_code}>
                    <td>{franchise.franchise}</td>
                    <td>{franchise.first_year}</td>
                    <td>{franchise.last_year}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {!isDefunctLoading && (
        <div>
          <h1>Defunct Franchises</h1>
          <table>
            <thead>
              <tr>
                <th>Team Name</th>
                <th>From</th>
                <th>Until</th>
              </tr>
            </thead>
            <tbody>
              {defunctFranchises.map((franchise) => {
                return (
                  <tr key={franchise.franchise_code}>
                    <td>{franchise.franchise}</td>
                    <td>{franchise.first_year}</td>
                    <td>{franchise.last_year}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
