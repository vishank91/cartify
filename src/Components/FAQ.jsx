import React, { useEffect, useState } from 'react'
import AOS from 'aos';
import { useDispatch, useSelector } from 'react-redux';

import { getFaq } from "../Redux/ActionCreators/FaqActionCreators"
import { getSetting } from "../Redux/ActionCreators/SettingActionCreators"
export default function FAQ() {
    let [selected, setSelected] = useState(0)

    let [settingData, setSettingData] = useState({
        siteName: import.meta.env.VITE_APP_SITE_NAME
    })

    let SettingStateData = useSelector(state => state.SettingStateData)
    let FaqStateData = useSelector(state => state.FaqStateData)
    let dispatch = useDispatch()


    useEffect(() => {
        (() => {
            dispatch(getFaq())
        })()
    }, [FaqStateData.length])

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
        <section id="faq" className="faq section">

            <div className="container section-title" data-aos="fade-up">
                <span>Frequently Asked Questions</span>
                <h2>Frequently Asked Questions</h2>
                <p>Find answers to the most frequently asked questions about shopping, payments, shipping, returns, refunds, and account management. Our FAQ section is designed to provide quick solutions and help you enjoy a smooth, hassle-free shopping experience with {settingData.siteName}.</p>
            </div>

            <div className="container">

                <div className="row justify-content-center">

                    <div className="col-lg-10">

                        <div className="faq-container">

                            {FaqStateData.filter(x => x.status).map((item, index) => {
                                return <div onClick={() => selected === index ? setSelected(-1) : setSelected(index)} className={`faq-item ${index === selected ? 'faq-active' : ''}`} key={index}>
                                    <i className="faq-icon bi bi-question-circle"></i>
                                    <h3>{item.question}</h3>
                                    <div className="faq-content">
                                        <p>{item.answer}</p>
                                    </div>
                                    <i className="faq-toggle bi bi-chevron-right"></i>
                                </div>
                            })}

                        </div>

                    </div>

                </div>

            </div>

        </section>
    )
}
