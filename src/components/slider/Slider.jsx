import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
const Slider = () => {
  return (
    <>
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
        className="mySwiper h-56 md:h-[500px] rounded-xl text-center"
      >
        <SwiperSlide>
          <img
            className="w-full h-full"
            src="https://i.ibb.co.com/ZgzZMJp/Blue-Welcome-to-School-Library-Banner.png"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            className="w-full  h-full "
            src="https://i.ibb.co.com/dtb88pr/Basic-English-Class-Banner.png"
            alt=""
          />
        </SwiperSlide>

        <SwiperSlide>
          <img
            className="w-full  h-full "
            src="https://i.ibb.co.com/tq3Rdk8/Study-Habits-Education-Presentation-in-Black-Blue-and-Yellow-Illustrative-Style-1.png"
            alt=""
          />
        </SwiperSlide>
      </Swiper>
    </>
  );
};

export default Slider;
