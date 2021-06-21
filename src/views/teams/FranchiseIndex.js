import React, { useState, useEffect } from 'react';
import {
  fetchCurrentFranchises,
  fetchDefunctFranchises
} from '../../apis/team';
import FranchiseIndexTable from '../../components/teams/FranchiseIndexTable';

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
      {isCurrentLoading && isDefunctLoading && (
        <div>
          <h2>Loading....</h2>
        </div>
      )}
      {!isCurrentLoading && (
        <div>
          <h1>Current Franchises</h1>
          <FranchiseIndexTable franchiseList={currentFranchises} />
        </div>
      )}
      {!isDefunctLoading && (
        <div>
          <h1>Defunct Franchises</h1>
          <FranchiseIndexTable franchiseList={defunctFranchises} />
        </div>
      )}
    </div>
  );
}
