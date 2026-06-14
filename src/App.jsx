import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Navbar from './Components/Navbar'
import Footer from './Components/Footer'


import HomePage from './Pages/HomePage'
import AboutPage from './Pages/AboutPage'
import FeaturePages from './Pages/FeaturePages'
import ShopPage from './Pages/ShopPage'
import TestimonialPage from './Pages/TestimonialPage'
import FaqPage from './Pages/FaqPage'
import ContactUsPage from './Pages/ContactUsPage'
import PrivacyPolicy from './Pages/PrivacyPolicy'
import TermsAndCondition from './Pages/TermsAndCondition'
import AdminHomePage from './Pages/Admin/AdminHomePage'
import AdminMaincategoryPage from './Pages/Admin/Maincategory/AdminMaincategoryPage'
import AdminMaincategoryCreatePage from './Pages/Admin/Maincategory/AdminMaincategoryCreatePage copy'
import AdminMaincategoryUpdatePage from './Pages/Admin/Maincategory/AdminMaincategoryUpdatePage'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/feature" element={<FeaturePages />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/testimonial" element={<TestimonialPage />} />
        <Route path="/faq" element={<FaqPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/tc" element={<TermsAndCondition />} />


        {/* Admin Routes */}
        <Route path="/admin" element={<AdminHomePage />} />

        <Route path="/admin/maincategory" element={<AdminMaincategoryPage />} />
        <Route path="/admin/maincategory/create" element={<AdminMaincategoryCreatePage />} />
        <Route path="/admin/maincategory/update/:id" element={<AdminMaincategoryUpdatePage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
