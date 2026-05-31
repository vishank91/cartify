import React from 'react'

import Feature from '../Components/Feature'
import About from '../Components/About'
import Products from '../Components/Products'
import CTA from '../Components/CTA'
import Testimonial from '../Components/Testimonial'
import FAQ from '../Components/FAQ'

export default function HomePage() {
    return (
        <>
            <section id="hero" className="hero section dark-background">

                <img src="/assets/img/world-dotted-map.png" alt="" className="hero-bg" data-aos="fade-in" />

                <div className="container">
                    <div className="row gy-4 d-flex justify-content-between">
                        <div className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center">
                            <h2 data-aos="fade-up">Your Lightning Fast Delivery Partner</h2>
                            <p data-aos="fade-up" data-aos-delay="100">Facere distinctio molestiae nisi fugit tenetur repellat non praesentium nesciunt optio quis sit odio nemo quisquam. eius quos reiciendis eum vel eum voluptatem eum maiores eaque id optio ullam occaecati odio est possimus vel reprehenderit</p>

                            <form action="#" className="form-search d-flex align-items-stretch mb-3" data-aos="fade-up" data-aos-delay="200">
                                <input type="text" className="form-control" placeholder="Your ZIP code or City. e.g. New York" />
                                <button type="submit" className="btn btn-primary">Search</button>
                            </form>

                            <div className="row gy-4" data-aos="fade-up" data-aos-delay="300">

                                <div className="col-lg-3 col-6">
                                    <div className="stats-item text-center w-100 h-100">
                                        <span data-purecounter-start="0" data-purecounter-end="232" data-purecounter-duration="0" className="purecounter">232</span>
                                        <p>Clients</p>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-6">
                                    <div className="stats-item text-center w-100 h-100">
                                        <span data-purecounter-start="0" data-purecounter-end="521" data-purecounter-duration="0" className="purecounter">521</span>
                                        <p>Projects</p>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-6">
                                    <div className="stats-item text-center w-100 h-100">
                                        <span data-purecounter-start="0" data-purecounter-end="1453" data-purecounter-duration="0" className="purecounter">1453</span>
                                        <p>Support</p>
                                    </div>
                                </div>

                                <div className="col-lg-3 col-6">
                                    <div className="stats-item text-center w-100 h-100">
                                        <span data-purecounter-start="0" data-purecounter-end="32" data-purecounter-duration="0" className="purecounter">32</span>
                                        <p>Workers</p>
                                    </div>
                                </div>

                            </div>

                        </div>

                        <div className="col-lg-5 order-1 order-lg-2 hero-img" data-aos="zoom-out">
                            <img src="/assets/img/hero-img.svg" className="img-fluid mb-3 mb-lg-0" alt="" />
                        </div>

                    </div>
                </div>

            </section>
            <Feature/>
            <About/>
            <Products/>
            <CTA/>
            <FAQ/>
            <Testimonial/>
        </>
    )
}
