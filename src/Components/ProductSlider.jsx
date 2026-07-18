import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

let sliderOptions = {
    navigation: true,
    modules: [Navigation, Autoplay],
    loop: true,
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    breakpoints: {
        640: {
            slidesPerView: 1,
            spaceBetween: 0,
        },
        768: {
            slidesPerView: 2,
            spaceBetween: 10,
        },
        992: {
            slidesPerView: 3,
            spaceBetween: 10,
        }
    },
}
import SingleProduct from './SingleProduct'
export default function ProductSlider({ title, data }) {
    return (
        <section id="featured-services" className="featured-services section">
            <div className="container section-title" data-aos="fade-up">
                <span>{title === "Related Products" ? title : `Latest Prodicts for ${title}`}</span>
                <h2>{title === "Related Products" ? title : `Latest Prodicts for ${title}`}</h2>
            </div>
            <div className="container">
                <Swiper {...sliderOptions}>
                    <div className="row gy-4">
                        {data.map((item, index) => {
                            return <SwiperSlide key={index}>
                                <SingleProduct item={item} />
                            </SwiperSlide>
                        })}
                    </div>
                </Swiper>
            </div>

        </section>
    )
}
