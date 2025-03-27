import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
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
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <img src="https://i.ibb.co.com/9mzyM5r7/1.jpg" alt="1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co.com/h1MtGh6M/2.jpg" alt="2" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co.com/21FybxKq/3.jpg" alt="3" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co.com/B2mfjQ9t/4.jpg" alt="4" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co.com/Lht369qz/5.jpg" alt="5" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co.com/YFfQQn3P/6.jpg" alt="6" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.ibb.co.com/bgZddpxv/7.jpg" alt="7" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Banner;
