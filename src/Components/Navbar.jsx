import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
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
        <>
            <div className="container">
                <div className="row">
                    <div className="col-9">
                        <ul className='list-unstyled mt-2 d-flex'>
                            <li className="me-3"><Link to={settingData.map1} className='text-dark' target='_blank'><i className='bi bi-geo-alt'></i><span className='d-none d-lg-inline-block ms-2'>{settingData.address}</span></Link></li>
                            <li className="me-3"><Link to={settingData.map1} className='text-dark' target='_blank'><i className='bi bi-envelope'></i><span className='d-none d-lg-inline-block ms-2'>{settingData.email}</span></Link></li>
                            <li className="me-3"><Link to={settingData.map1} className='text-dark' target='_blank'><i className='bi bi-telephone'></i><span className='d-none d-lg-inline-block ms-2'>{settingData.phone}</span></Link></li>
                            <li className="me-3"><Link to={settingData.map1} className='text-dark' target='_blank'><i className='bi bi-whatsapp'></i><span className='d-none d-lg-inline-block ms-2'>{settingData.whatsapp}</span></Link></li>
                        </ul>
                    </div>
                    <div className="col-3">
                        <ul className='list-unstyled mt-2 d-flex float-end'>
                            <li className="me-3"><Link to={settingData.map1} className='text-dark' target='_blank'><i className='bi bi-facebook'></i></Link></li>
                            <li className="me-3"><Link to={settingData.map1} className='text-dark' target='_blank'><i className='bi bi-twitter'></i></Link></li>
                            <li className="me-3"><Link to={settingData.map1} className='text-dark' target='_blank'><i className='bi bi-linkedin'></i></Link></li>
                            <li className="me-3"><Link to={settingData.map1} className='text-dark' target='_blank'><i className='bi bi-instagram'></i></Link></li>
                            <li className="me-3"><Link to={settingData.map1} className='text-dark' target='_blank'><i className='bi bi-youtube'></i></Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <header id="header" className={`header d-flex align-items-center ${showMenu ? 'mobile-nav-active' : ''}`}>
                <div className="container-fluid container-xl position-relative d-flex align-items-center">

                    <Link to="/" className="logo d-flex align-items-center me-auto">
                        <h1 className="sitename">{settingData.siteName}</h1>
                    </Link>

                    <nav id="navmenu" className="navmenu">
                        <ul>
                            <li><Link to="/" className="active">Home<br /></Link></li>
                            <li><Link to="/shop">Shop</Link></li>
                            <li><Link to="/about">About</Link></li>
                            <li><Link to="/feature">Features</Link></li>
                            <li><Link to="/testimonial">Testimonial</Link></li>
                            <li><Link to="/faq">Faq</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/admin">Admin</Link></li>
                            <li className="dropdown"><a href="#"><span>Nitin Chahan</span> <i className="bi bi-chevron-down toggle-dropdown"></i></a>
                                <ul>
                                    <li><Link to="/profile?choice=Profile">Profile</Link></li>
                                    <li><Link to="/profile?choice=Orders">Order</Link></li>
                                    <li><Link to="/profile?choice=Wishlist">Wishlist</Link></li>
                                    <li><Link to="/profile?choice=Address">Address</Link></li>
                                    <li><Link to="/cart">Cart</Link></li>
                                    <li><Link to="/checkout">Checkout</Link></li>
                                    <li><button className='btn btn-light ms-2'>Logout</button></li>
                                </ul>
                            </li>
                        </ul>
                        <i className={`mobile-nav-toggle d-xl-none bi ${showMenu ? 'bi-x' : 'bi-list'}`} onClick={() => setShowMenu(!showMenu)}></i>
                    </nav>
                </div>
            </header>
        </>

    )
}
