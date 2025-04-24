import { Swiper, SwiperSlide } from "swiper/react";
import bannerImage from '../../../json/bannerImage.json';
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./style.css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import NameSutter from "../../../utils/nameSutter/NameSutter";

const Banner = () => {
  return (
    <div>
      <NameSutter name="Banner ZHSUST" />
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          waitForTransition: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper rounded-2xl"
      >
        {bannerImage?.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image?.src} alt={image?.alt} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
