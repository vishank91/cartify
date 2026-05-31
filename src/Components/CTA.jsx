import React, { useEffect } from 'react'
import AOS from 'aos';
export default function CTA() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);
    return (
        <section id="call-to-action" className="call-to-action section dark-background">

            <img src="/assets/img/cta-bg.jpg" alt="" />

            <div className="container">
                <div className="row justify-content-center" data-aos="zoom-in" data-aos-delay="100">
                    <div className="col-xl-10">
                        <div className="text-center">
                            <h3>Call To Action</h3>
                            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                            <a className="cta-btn" href="#">Call To Action</a>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}
