import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AOS from 'aos';

import { getFeature } from "../Redux/ActionCreators/FeatureActionCreators"
import { getSetting } from "../Redux/ActionCreators/SettingActionCreators"
export default function Feature() {
    let [settingData, setSettingData] = useState({
        siteName: import.meta.env.VITE_APP_SITE_NAME
    })

    let SettingStateData = useSelector(state => state.SettingStateData)
    let FeatureStateData = useSelector(state => state.FeatureStateData)
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

    useEffect(() => {
        (() => {
            dispatch(getFeature())
        })()
    }, [FeatureStateData.length])
    return (
        <>
            <section id="featured-services" className="featured-services section">
                <div className="container section-title" data-aos="fade-up">
                    <span>Our Features</span>
                    <h2>Our Features</h2>
                    <p>Discover the features that make {settingData.siteName} your preferred online shopping destination. From secure payments and fast delivery to quality products and reliable customer support, we provide everything you need for a convenient, safe, and enjoyable shopping experience.</p>
                </div>
                <div className="container">

                    <div className="row gy-4">

                        {FeatureStateData.filter(x => x.status).map(item => {
                            return <div key={item.id} className="col-lg-4 col-md-6 service-item d-flex" data-aos="fade-up" data-aos-delay="100">
                                <div className="icon flex-shrink-0"><span dangerouslySetInnerHTML={{ __html: item.icon }} /></div>
                                <div>
                                    <h4 className="title">{item.name}</h4>
                                    <p className="description">{item.shortDescription}</p>
                                </div>
                            </div>
                        })}

                    </div>

                </div>

            </section>
        </>
    )
}
