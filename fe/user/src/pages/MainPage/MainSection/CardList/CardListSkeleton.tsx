import styled from '@emotion/styled';
import { paintSkeleton } from '~/styles/designSystem';

export const CardListSkeleton: React.FC = () => {
  const skeletonCount =
    window.innerWidth < 640
      ? 1
      : window.innerWidth < 960
      ? 2
      : window.innerWidth < 1200
      ? 3
      : 4;

  return (
    <StyledCardListSkeleton>
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <StyledCard key={index}>
          <StyledImage />
          <StyledText />
          <StyledText />
        </StyledCard>
      ))}
    </StyledCardListSkeleton>
  );
};

const StyledCardListSkeleton = styled.div`
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const StyledCard = styled.div`
  width: 260px;

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledImage = styled.div`
  width: 100%;
  height: 500px;
  border-radius: 8px;
  ${paintSkeleton};
`;

const StyledText = styled.div`
  width: 100%;
  height: 30px;
  border-radius: 8px;
  ${paintSkeleton};
`;
