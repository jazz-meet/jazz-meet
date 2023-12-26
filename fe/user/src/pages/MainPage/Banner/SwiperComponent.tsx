import styled from '@emotion/styled';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type Props = {
  imageUrls: string[];
  description?: string;
};

export const SwiperComponent: React.FC<Props> = ({
  imageUrls,
  description,
}) => {
  return (
    <StyledCarousel>
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          pauseOnMouseEnter: true,
        }}
      >
        {imageUrls.map((imageUrl, index) => (
          <SwiperSlide key={`${imageUrl}-${index}`}>
            <SlideImage src={imageUrl} alt={description} />
          </SwiperSlide>
        ))}
      </Swiper>
    </StyledCarousel>
  );
};

const StyledCarousel = styled.div`
  user-select: none;

  .swiper-pagination {
    left: -30%;
    bottom: 30px;
  }

  .swiper-pagination-bullet {
    background-color: #fff;
  }
`;

const SlideImage = styled.img`
  width: 100%;
  min-height: 200px;
  max-height: 400px;
  object-fit: cover;
`;
