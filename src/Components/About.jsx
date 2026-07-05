import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AOS from 'aos';

import { getSetting } from "../Redux/ActionCreators/SettingActionCreators"
export default function About() {
    let [settingData, setSettingData] = useState({
        siteName: import.meta.env.VITE_APP_SITE_NAME,
        facebook: import.meta.env.VITE_APP_FACEBOOK,
        twitter: import.meta.env.VITE_APP_TWITTER,
        instagram: import.meta.env.VITE_APP_INSTAGRM,
        linkedin: import.meta.env.VITE_APP_LINKEDIN,
        youtube: import.meta.env.VITE_APP_YOUTUBE,
    })

    let SettingStateData = useSelector(state => state.SettingStateData)
    let dispatch = useDispatch()

    useEffect(() => {
        (() => {
            dispatch(getSetting())
            if (SettingStateData.length) {
                let item = {}
                Object.keys(settingData).forEach(key => item[key] = SettingStateData[0][key] || settingData[key])
                console.log(item)
                setSettingData({ ...item })
            }
        })()
    }, [SettingStateData.length])

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);
    return (
        <>
            <section id="about" className="about section">

                <div className="container">

                    <div className="row gy-4">

                        <div className="col-lg-6 position-relative align-self-start order-lg-last order-first" data-aos="fade-up" data-aos-delay="200">
                            <img src="assets/img/about.jpg" className="img-fluid" alt="" />
                        </div>

                        <div className="col-lg-6 content order-last  order-lg-first" data-aos="fade-up" data-aos-delay="100">
                            <h3>About Us</h3>
                            <p>Cartify is your trusted online shopping destination, offering quality products, secure payments, and fast delivery. We are committed to providing a seamless shopping experience with exceptional customer service, affordable prices, and products that meet your everyday lifestyle needs.</p>
                            <ul>
                                <li>
                                   <i class="bi bi-grid-3x3-gap"></i>
                                    <div>
                                        <h5>Wide Product Collection</h5>
                                        <p>Browse thousands of carefully selected products across multiple categories, ensuring quality, affordability, and variety for every customer.</p>
                                    </div>
                                </li>
                                <li>
                                    <i class="bi bi-shield-check"></i>
                                    <div>
                                        <h5>Secure & Easy Shopping</h5>
                                        <p>Shop confidently with encrypted payments, a user-friendly interface, and a smooth checkout process designed for convenience.</p>
                                    </div>
                                </li>
                                <li>
                                   <i class="bi bi-truck"></i>
                                    <div>
                                        <h5>Fast & Reliable Delivery</h5>
                                        <p>Receive your orders quickly through trusted delivery partners with real-time tracking and dependable customer support throughout the journey.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>

                    </div>

                </div>

            </section>
        </>
    )
}
