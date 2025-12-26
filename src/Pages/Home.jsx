import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import CategoriesSection from '../components/CategorySection'
import ProductsSection from '../components/ProductSection'
import ArticlesSection from '../components/Articles'
import ContactUs from '../components/Contact'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <section id='home'>
<div className="bg-darkgray">
      <Navbar />
      <HeroSection />
      <CategoriesSection />
      <ProductsSection />
      <ArticlesSection />
      <ContactUs />
      <Footer/>
    </div>
    
    </section>
    

  )
}

export default Home
