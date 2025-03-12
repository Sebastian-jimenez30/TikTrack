"use client";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import Slider from "react-slick";
import InfluencerCard from "~/app/components/cards/influencer.card";

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
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    speed: 500,
    cssEase: "linear",
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 3 } },
      { breakpoint: 800, settings: { slidesToShow: 2 } },
      { breakpoint: 450, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="w-full overflow-hidden">
      <Slider {...settings}>
        {influencers.map((influencer, i) => (
          <div key={i} className="m-3 py-5 text-center">
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
        ))}
      </Slider>
    </div>
  );
};

export default InfluencerSlider;
