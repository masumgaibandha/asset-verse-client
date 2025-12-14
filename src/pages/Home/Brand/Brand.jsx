import React from 'react'
import 'swiper/css';
import amazon from '../../../assets/zapshift-assets/brands/amazon.png'
import amazon_vector from '../../../assets/zapshift-assets/brands/amazon_vector.png'
import casio from '../../../assets/zapshift-assets/brands/casio.png'
import randstad from '../../../assets/zapshift-assets/brands/randstad.png'
import star from '../../../assets/zapshift-assets/brands/star.png'
import start_people from '../../../assets/zapshift-assets/brands/start_people.png'
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react'

const brandLogos = [amazon, amazon_vector, casio, randstad, star, start_people]

export const Brand = () => {
  return (
     <Swiper
            loop={true}
            modules={[Autoplay]}
            slidesPerView={4}
            centeredSlides={true}
            spaceBetween={30}
            grabCursor={true}
            autoplay={{
                delay: 1000,
                disableOnInteraction: false,
            }}

        >
            {
                brandLogos.map((logo, index) => <SwiperSlide key={index}><img src={logo} alt="" /></SwiperSlide>)
            }

        </Swiper>
  )
}
