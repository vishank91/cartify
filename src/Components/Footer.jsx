import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
    let [showMenu, setShowMenu] = useState(false)
    let [settingData, setSettingData] = useState({
        siteName: import.meta.env.VITE_APP_SITE_NAME,
        address: import.meta.env.VITE_APP_ADDRESS,
        map1: import.meta.env.VITE_APP_MAP1,
        email: import.meta.env.VITE_APP_EMAIL,
        phone: import.meta.env.VITE_APP_PHONE,
        whatsapp: import.meta.env.VITE_APP_WHATSAPP,
        facebook: import.meta.env.VITE_APP_FACEBOOK,
        twitter: import.meta.env.VITE_APP_TWITTER,
        instagram: import.meta.env.VITE_APP_INSTAGRM,
        linkedin: import.meta.env.VITE_APP_LINKEDIN,
        youtube: import.meta.env.VITE_APP_YOUTUBE,
    })
    return (
        <footer id="footer" className="footer dark-background">

            <div className="container footer-top">
                <div className="row gy-4">
                    <div className="col-lg-4 col-12 footer-about">
                        <Link to="/" className="logo d-flex align-items-center">
                            <span className="sitename">{settingData.siteName}</span>
                        </Link>
                        <p>Your trusted eCommerce platform for quality products, secure shopping, and fast delivery. We connect customers with great deals and a smooth online shopping experience every day.</p>
                        <div className="y-3">
                            <Link to={settingData.map1} target='_blank' className='text-light d-block mb-2'><i className='bi bi-geo-alt fs-5 me-3'></i>{settingData.address}</Link>
                            <Link to={settingData.email} target='_blank' className='text-light d-block mb-2'><i className='bi bi-envelope fs-5 me-3'></i>{settingData.email}</Link>
                            <Link to={settingData.phone} target='_blank' className='text-light d-block mb-2'><i className='bi bi-telephone fs-5 me-3'></i>{settingData.phone}</Link>
                            <Link to={settingData.whatsapp} target='_blank' className='text-light d-block mb-2'><i className='bi bi-whatsapp fs-5 me-3'></i>{settingData.whatsapp}</Link>
                        </div>
                    </div>

                    <div className="col-lg-3 col-6 footer-links">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/shop">Shop</Link></li>
                            <li><Link to="/about">About us</Link></li>
                            <li><Link to="/features">Features</Link></li>
                            <li><Link to="/faq">Faq</Link></li>
                            <li><Link to="/testimonial">Testimonial</Link></li>
                            <li><Link to="/contact">ContactUs</Link></li>
                            <li><Link to="/privacy-policy">Privacy policy</Link></li>
                            <li><Link to="/tc">Termss and Conditions</Link></li>
                        </ul>
                    </div>
 
                    <div className="col-lg-5 col-12 footer-contact text-center text-md-start">
                        <h4>Subscribe Our Newsletter Service</h4>
                        <p>Subscribe to our newsletter and stay updated with the latest products, exclusive offers, seasonal discounts, and shopping trends. Join the Cartify community and never miss a great deal.</p>

                        <div className="my-3">
                            <form>
                                <div className="btn-group w-100">
                                    <input type="email" name="email" placeholder='Email Address' className='form-control' />
                                    <button className='btn btn-primary'>Subscribe</button>
                                </div>
                            </form>
                        </div>
                        <div className="social-links d-flex mt-4">
                            <Link to={settingData.facebook}><i className="bi bi-facebook"></i></Link>
                            <Link to={settingData.twitter}><i className="bi bi-twitter-x"></i></Link>
                            <Link to={settingData.instagram}><i className="bi bi-instagram"></i></Link>
                            <Link to={settingData.linkedin}><i className="bi bi-linkedin"></i></Link>
                            <Link to={settingData.youtube}><i className="bi bi-youtube"></i></Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container copyright text-center mt-4">
                <p>© <span>Copyright</span> <strong className="px-1 sitename">{settingData.siteName}</strong> <span>All Rights Reserved</span></p>
            </div>

        </footer>
    )
}
