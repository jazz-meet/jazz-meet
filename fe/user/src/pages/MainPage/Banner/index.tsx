import styled from '@emotion/styled';
import { SwiperComponent } from './SwiperComponent';

export const Banner: React.FC = () => {
  return (
    <StyledBanner>
      <SwiperComponent
        imageUrls={[
          'https://jazzmeet.s3.ap-northeast-2.amazonaws.com/banner/banner_1.webp',
          'https://jazzmeet.s3.ap-northeast-2.amazonaws.com/banner/banner_2.webp',
          'https://jazzmeet.s3.ap-northeast-2.amazonaws.com/banner/banner_3.webp',
          'https://jazzmeet.s3.ap-northeast-2.amazonaws.com/banner/banner_4.webp',
          'https://jazzmeet.s3.ap-northeast-2.amazonaws.com/banner/banner_5.webp',
        ]}
      />
    </StyledBanner>
  );
};

const StyledBanner = styled.div`
  margin-bottom: 105px;
`;
