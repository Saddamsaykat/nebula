import { Swiper, SwiperSlide } from "swiper/react";
import bannerImage from "../../../json/bannerImage.json";
// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import "./style.css";

// import required modules
import { EffectCoverflow, Pagination } from "swiper/modules";
import NameSutter from "../../../utils/nameSutter/NameSutter";

const SwiperSlider = () => {
  return (
    <>
      <NameSutter name="ZHSUST DEPARTMENT" />
      <Swiper
        spaceBetween={50}
        effect={"coverflow"}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={"auto"}
        loop={true}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 50,
          modifier: 2,
          slideShadows: true,
        }}
        pagination={{
          clickable: true,
        }}
        // pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        {bannerImage.map((image, index) => (
          <SwiperSlide key={index}>
            <img src={image.src} alt={image.alt} className="min-w-[300px] min-h-[300px]" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default SwiperSlider;
