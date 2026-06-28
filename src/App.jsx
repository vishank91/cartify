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
import AdminMaincategoryCreatePage from './Pages/Admin/Maincategory/AdminMaincategoryCreatePage'
import AdminMaincategoryUpdatePage from './Pages/Admin/Maincategory/AdminMaincategoryUpdatePage'

import AdminSubcategoryPage from './Pages/Admin/Subcategory/AdminSubcategoryPage'
import AdminSubcategoryCreatePage from './Pages/Admin/Subcategory/AdminSubcategoryCreatePage'
import AdminSubcategoryUpdatePage from './Pages/Admin/Subcategory/AdminSubcategoryUpdatePage'

import AdminBrandPage from './Pages/Admin/Brand/AdminBrandPage'
import AdminBrandCreatePage from './Pages/Admin/Brand/AdminBrandCreatePage'
import AdminBrandUpdatePage from './Pages/Admin/Brand/AdminBrandUpdatePage'

import AdminFeaturePage from './Pages/Admin/Feature/AdminFeaturePage'
import AdminFeatureCreatePage from './Pages/Admin/Feature/AdminFeatureCreatePage'
import AdminFeatureUpdatePage from './Pages/Admin/Feature/AdminFeatureUpdatePage'

import AdminFaqPage from './Pages/Admin/Faq/AdminFaqPage'
import AdminFaqCreatePage from './Pages/Admin/Faq/AdminFaqCreatePage'
import AdminFaqUpdatePage from './Pages/Admin/Faq/AdminFaqUpdatePage'

import AdminSettingPage from './Pages/Admin/Setting/AdminSettingPage'

import AdminProductPage from './Pages/Admin/Product/AdminProductPage'
import AdminProductCreatePage from './Pages/Admin/Product/AdminProductCreatePage'
import AdminProductUpdatePage from './Pages/Admin/Product/AdminProductUpdatePage'

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

        <Route path="/admin/subcategory" element={<AdminSubcategoryPage />} />
        <Route path="/admin/subcategory/create" element={<AdminSubcategoryCreatePage />} />
        <Route path="/admin/subcategory/update/:id" element={<AdminSubcategoryUpdatePage />} />

        <Route path="/admin/brand" element={<AdminBrandPage />} />
        <Route path="/admin/brand/create" element={<AdminBrandCreatePage />} />
        <Route path="/admin/brand/update/:id" element={<AdminBrandUpdatePage />} />

        <Route path="/admin/feature" element={<AdminFeaturePage />} />
        <Route path="/admin/feature/create" element={<AdminFeatureCreatePage />} />
        <Route path="/admin/feature/update/:id" element={<AdminFeatureUpdatePage />} />

        <Route path="/admin/faq" element={<AdminFaqPage />} />
        <Route path="/admin/faq/create" element={<AdminFaqCreatePage />} />
        <Route path="/admin/faq/update/:id" element={<AdminFaqUpdatePage />} />

        <Route path="/admin/setting" element={<AdminSettingPage />} />

        <Route path="/admin/product" element={<AdminProductPage />} />
        <Route path="/admin/product/create" element={<AdminProductCreatePage />} />
        <Route path="/admin/product/update/:id" element={<AdminProductUpdatePage />} />


      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
