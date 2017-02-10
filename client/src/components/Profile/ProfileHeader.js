import React from 'react';

export const ProfileHeader = ({joinDate, totalGames}) => {
  return (
    <p className='profile-header'>
      Total Games Played: {totalGames}
    </p>
  );
}
