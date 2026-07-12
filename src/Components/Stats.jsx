import React, { useEffect } from 'react'
import AOS from 'aos';
import PureCounter from "@srexi/purecounterjs";
export default function Stats() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
        new PureCounter();
    }, []);

    return (
        <>
            <section id="stats" className="stats section">

                <div className="container" data-aos="fade-up" data-aos-delay="100">

                    <div className="row gy-4">

                        <div className="col-lg-3 col-md-6">
                            <div className="stats-item text-center w-100 h-100">
                                <span data-purecounter-start="0" data-purecounter-end="1000" data-purecounter-duration="1" className="purecounter"></span>
                                <p>Happy Customers</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="stats-item text-center w-100 h-100">
                                <span data-purecounter-start="0" data-purecounter-end="100" data-purecounter-duration="1" className="purecounter"></span>
                                <p>Products</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="stats-item text-center w-100 h-100">
                                <span data-purecounter-start="0" data-purecounter-end="20" data-purecounter-duration="1" className="purecounter"></span>
                                <p>Brands</p>
                            </div>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <div className="stats-item text-center w-100 h-100">
                                <span data-purecounter-start="0" data-purecounter-end="15" data-purecounter-duration="1" className="purecounter"></span>
                                <p>Days Refund Policy</p>
                            </div>
                        </div>

                    </div>

                </div>

            </section>
        </>
    )
}
