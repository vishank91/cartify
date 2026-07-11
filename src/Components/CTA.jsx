import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import AOS from 'aos';

import { getSetting } from "../Redux/ActionCreators/SettingActionCreators"
export default function CTA() {
    let [settingData, setSettingData] = useState({
        siteName: import.meta.env.VITE_APP_SITE_NAME
    })

    let SettingStateData = useSelector(state => state.SettingStateData)
    let dispatch = useDispatch()
    useEffect(() => {
        (() => {
            dispatch(getSetting())
            if (SettingStateData.length) {
                let item = {}
                Object.keys(settingData).forEach(key => item[key] = SettingStateData[0][key] || settingData[key])
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
        <section id="call-to-action" className="call-to-action section dark-background">

            <img src="/images/banner5.jpg" alt="" />

            <div className="container">
                <div className="row justify-content-center" data-aos="zoom-in" data-aos-delay="100">
                    <div className="col-xl-10">
                        <div className="text-center">
                            <h3>Call To Action</h3>
                            <p>Explore thousands of quality products, enjoy exclusive deals, secure payments, and fast delivery. Join {settingData.siteName} today and experience a smarter, easier, and more rewarding online shopping journey.</p>
                            <Link className="cta-btn" to="/shop">Shop Now</Link>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}
