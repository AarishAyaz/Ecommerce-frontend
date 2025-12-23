import React from 'react'
import Navbar from '../components/Navbar'
import HeroSection from '../components/HeroSection'
import CategoriesSection from '../components/CategorySection'
import ProductsSection from '../components/ProductSection'
import ArticlesSection from '../components/Articles'
import ContactUs from '../components/Contact'

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
    </div>
    
    </section>
    

  )
}

export default Home
