import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import bannerImg1 from "../../../assets/banner-1.jpg";
import bannerImg2 from "../../../assets/banner-2.jpg";
import bannerImg3 from "../../../assets/banner-3.jpg";

const Banner = () => {
    return (
        <div className="w-full container mx-auto my-5">
            <Carousel
                showThumbs={false}
                showStatus={false}
                infiniteLoop
                autoPlay
                interval={4000}
                swipeable
            >
                {[bannerImg1, bannerImg2, bannerImg3].map((img, i) => (
                    <div key={i} className="h-[260px] sm:h-[380px] md:h-[520px] lg:h-[620px]">
                        <img
                            src={img}
                            alt={`banner-${i + 1}`}
                            className="h-full w-full object-cover rounded-2xl"
                        />
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Banner;
