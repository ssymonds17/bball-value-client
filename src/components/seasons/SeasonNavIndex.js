import React from 'react';
import SeasonNavButton from '../seasons/SeasonNavButton';

export default function SeasonNavIndex({
  direction,
  league,
  year,
  seasonType
}) {
  const prevOverall = `/seasons/overall/${league}/${Number(year - 1)}`;
  const nextOverall = `/seasons/overall/${league}/${Number(year) + 1}`;
  const prevRS = `/seasons/regularseason/${league}/${Number(year) - 1}`;
  const nextRS = `/seasons/regularseason/${league}/${Number(year) + 1}`;
  const nextPO = `/seasons/playoffs/${league}/${Number(year) - 1}`;
  const prevPO = `/seasons/playoffs/${league}/${Number(year) + 1}`;

  switch (seasonType) {
    case 'overall':
      if (direction === 'prev') {
        return (
          <SeasonNavButton link={prevOverall} direction='prev' year={year} />
        );
      } else if (direction === 'next') {
        return (
          <SeasonNavButton link={nextOverall} direction='next' year={year} />
        );
      }
      break;
    case 'rs':
      if (direction === 'prev') {
        return <SeasonNavButton link={prevRS} direction='prev' year={year} />;
      } else if (direction === 'next') {
        return <SeasonNavButton link={nextRS} direction='next' year={year} />;
      }
      break;
    case 'po':
      if (direction === 'prev') {
        return <SeasonNavButton link={nextPO} direction='prev' year={year} />;
      } else if (direction === 'next') {
        return <SeasonNavButton link={prevPO} direction='next' year={year} />;
      }
      break;
    default:
      return null;
  }
}
