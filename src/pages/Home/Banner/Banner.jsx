import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router";
import bannerImg1 from "../../../assets/banner-1.jpg";
import bannerImg2 from "../../../assets/banner-2.jpg";
import bannerImg3 from "../../../assets/banner-3.jpg";

const slides = [
    {
        img: bannerImg1,
        title: "Track corporate assets with confidence",
        desc: "Manage requests, approvals, assignments, and returns in one clean dashboard.",
    },
    {
        img: bannerImg2,
        title: "Built for HR and Employees",
        desc: "HR stays in control. Employees request what they need. Everyone stays aligned.",
    },
    {
        img: bannerImg3,
        title: "Real-time visibility, fewer headaches",
        desc: "Know what’s available, what’s assigned, and who has what—instantly.",
    },
];

const Banner = () => {
    return (
        <div className="container mx-auto my-6 px-4">
            <div className="rounded-2xl overflow-hidden">
                <Carousel
                    showThumbs={false}
                    showStatus={false}
                    infiniteLoop
                    autoPlay
                    interval={4500}
                    swipeable
                    emulateTouch
                    stopOnHover
                >
                    {slides.map((s, i) => (
                        <div key={i} className="relative h-[280px] sm:h-[420px] md:h-[540px] lg:h-[620px]">
                            <img
                                src={s.img}
                                alt={`banner-${i + 1}`}
                                className="h-full w-full object-cover"
                            />

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />

                            {/* Content */}
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full max-w-7xl mx-auto px-6">
                                    <div className="max-w-xl text-left text-white">
                                        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight">
                                            {s.title}
                                        </h1>
                                        <p className="mt-3 text-sm sm:text-base md:text-lg text-white/90">
                                            {s.desc}
                                        </p>

                                        <div className="mt-6 flex flex-wrap gap-3">
                                            <Link to="/asset-overview" className="btn btn-primary">
                                                Explore Assets
                                            </Link>
                                            <Link to="/about" className="btn btn-outline btn-white">
                                                Learn More
                                            </Link>
                                        </div>

                                        <div className="mt-4 text-xs text-white/70">
                                            AssetVerse • HR-friendly asset management
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default Banner;
