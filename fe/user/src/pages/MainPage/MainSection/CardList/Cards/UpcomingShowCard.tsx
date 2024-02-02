import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useShallow } from 'zustand/react/shallow';
import { useShowDetailStore } from '~/stores/useShowDetailStore';
import { UpcomingShow } from '~/types/api.types';
import { getFormattedDateString } from '~/utils/dateUtils';

type Props = {
  upcomingShow: UpcomingShow;
};

export const UpcomingShowCard: React.FC<Props> = ({ upcomingShow }) => {
  const {
    venueId,
    venueName,
    showId,
    posterUrl,
    teamName,
    startTime,
    endTime,
  } = upcomingShow;
  const navigate = useNavigate();
  const { setShowDetailId, setShowDetailDate } = useShowDetailStore(
    useShallow((state) => ({
      setShowDetailId: state.setShowDetailId,
      setShowDetailDate: state.setShowDetailDate,
    })),
  );

  const date = getFormattedDateString(startTime);
  const timeRange = `${formatTime(startTime)} ~ ${formatTime(endTime)}`;

  const goToShowDetail = () => {
    setShowDetailId(showId);
    setShowDetailDate(new Date(startTime));
    navigate(`map/venues/${venueId}`);
  };

  return (
    <StyledCard onClick={() => goToShowDetail()}>
      <StyledCardImage src={posterUrl} alt="poster" />
      <StyledTitleContainer>
        <StyledTitle>{venueName}</StyledTitle>
        <StyledSubTitle>{teamName}</StyledSubTitle>
      </StyledTitleContainer>
      <StyledContentContainer>
        <StyledContent>{date}</StyledContent>
        <StyledContent>{timeRange}</StyledContent>
      </StyledContentContainer>
    </StyledCard>
  );
};

const formatTime = (date: string) => {
  return new Date(date).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

const StyledCard = styled.div`
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 37px;
`;

const StyledCardImage = styled.img`
  width: 100%;
  height: 380px;
  object-fit: cover;
  margin-bottom: 24px;
`;

const StyledTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  font-size: 22px;
  line-height: 140%;
`;

const StyledTitle = styled.div`
  font-weight: 300;
  color: #141313;
`;

const StyledSubTitle = styled.div`
  font-weight: bold;
  letter-spacing: -1px;
`;

const StyledContentContainer = styled.div`
  margin-top: 8px;
  display: flex;
  gap: 2px;
  color: #686970;
`;

const StyledContent = styled.div`
  &:not(:last-of-type)::after {
    content: '|';
    margin: 0 8px;
  }
`;
