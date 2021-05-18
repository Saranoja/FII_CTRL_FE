import React from 'react';
import { withTeacher } from 'hocs';
import StyledAnnouncementsCreationSegment from './AnnouncementsCreationSegment.style';

const AnnouncementsCreationSegment = () => {
  return (
    <StyledAnnouncementsCreationSegment>
      <p> Here! </p>
    </StyledAnnouncementsCreationSegment>
  );
};

export default withTeacher(AnnouncementsCreationSegment);
