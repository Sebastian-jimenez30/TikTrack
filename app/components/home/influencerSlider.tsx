"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Scrollbar, A11y, Autoplay } from "swiper/modules";
import React from "react";
import InfluencerCard from "~/app/components/cards/influencer.card";
import "swiper/css";
import "swiper/css/scrollbar";

interface InfluencerSliderProps {
  influencers: {
    username: string;
    profilePicture: string;
    city: string;
    engagementVisualizationRate: number;
    followers: string;
    updatedAt: string;
  }[];
}

const InfluencerSlider: React.FC<InfluencerSliderProps> = ({ influencers }) => {
  return (
    <div>
      <Swiper
        modules={[Scrollbar, A11y, Autoplay]}
        scrollbar={{ draggable: true }}
        className="h-100 w-[70vw] rounded-lg mx-5"
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        {influencers.map((influencer, i) => (
          <SwiperSlide key={i}>
            <div className="flex justify-center items-center h-full w-full block w-full h-full object-cover my-5">
              <InfluencerCard
                username={influencer.username}
                profilePicture={influencer.profilePicture}
                city={influencer.city}
                engagementVisualizationRate={
                  influencer.engagementVisualizationRate
                }
                followers={influencer.followers}
                updatedAt={influencer.updatedAt}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default InfluencerSlider;
