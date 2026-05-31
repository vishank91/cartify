import React, { useEffect } from 'react'
import AOS from 'aos';

export default function FAQ() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);
    return (
        <section id="faq" className="faq section">

            <div className="container section-title" data-aos="fade-up">
                <span>Frequently Asked Questions</span>
                <h2>Frequently Asked Questions</h2>
                <p>Necessitatibus eius consequatur ex aliquid fuga eum quidem sint consectetur velit</p>
            </div>

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-lg-10">

                        <div className="faq-container">

                            <div className="faq-item faq-active" data-aos="fade-up" data-aos-delay="200">
                                <i className="faq-icon bi bi-question-circle"></i>
                                <h3>Non consectetur a erat nam at lectus urna duis?</h3>
                                <div className="faq-content">
                                    <p>Feugiat pretium nibh ipsum consequat. Tempus iaculis urna id volutpat lacus laoreet non curabitur gravida. Venenatis lectus magna fringilla urna porttitor rhoncus dolor purus non.</p>
                                </div>
                                <i className="faq-toggle bi bi-chevron-right"></i>
                            </div>

                            <div className="faq-item" data-aos="fade-up" data-aos-delay="300">
                                <i className="faq-icon bi bi-question-circle"></i>
                                <h3>Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque?</h3>
                                <div className="faq-content">
                                    <p>Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.</p>
                                </div>
                                <i className="faq-toggle bi bi-chevron-right"></i>
                            </div>

                            <div className="faq-item" data-aos="fade-up" data-aos-delay="400">
                                <i className="faq-icon bi bi-question-circle"></i>
                                <h3>Dolor sit amet consectetur adipiscing elit pellentesque?</h3>
                                <div className="faq-content">
                                    <p>Eleifend mi in nulla posuere sollicitudin aliquam ultrices sagittis orci. Faucibus pulvinar elementum integer enim. Sem nulla pharetra diam sit amet nisl suscipit. Rutrum tellus pellentesque eu tincidunt. Lectus urna duis convallis convallis tellus. Urna molestie at elementum eu facilisis sed odio morbi quis</p>
                                </div>
                                <i className="faq-toggle bi bi-chevron-right"></i>
                            </div>

                            <div className="faq-item" data-aos="fade-up" data-aos-delay="500">
                                <i className="faq-icon bi bi-question-circle"></i>
                                <h3>Ac odio tempor orci dapibus. Aliquam eleifend mi in nulla?</h3>
                                <div className="faq-content">
                                    <p>Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Id interdum velit laoreet id donec ultrices. Fringilla phasellus faucibus scelerisque eleifend donec pretium. Est pellentesque elit ullamcorper dignissim. Mauris ultrices eros in cursus turpis massa tincidunt dui.</p>
                                </div>
                                <i className="faq-toggle bi bi-chevron-right"></i>
                            </div>

                            <div className="faq-item" data-aos="fade-up" data-aos-delay="600">
                                <i className="faq-icon bi bi-question-circle"></i>
                                <h3>Tempus quam pellentesque nec nam aliquam sem et tortor consequat?</h3>
                                <div className="faq-content">
                                    <p>Molestie a iaculis at erat pellentesque adipiscing commodo. Dignissim suspendisse in est ante in. Nunc vel risus commodo viverra maecenas accumsan. Sit amet nisl suscipit adipiscing bibendum est. Purus gravida quis blandit turpis cursus in</p>
                                </div>
                                <i className="faq-toggle bi bi-chevron-right"></i>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    )
}
