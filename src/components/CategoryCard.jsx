import React from 'react'

const CategoryCard = ({image, title, onClick}) => {
  return (
    <div  onClick={onClick}
      className="cursor-pointer relative rounded-xl overflow-hidden shadow-lg group hover:shadow-2xl transition-shadow duration-300">
      
      <img 
        src={image}
        alt = {title}
        className="w-full h-56 md:h-64 object-cover group-hover:scale-105 transition-transform duration-500"
      />

       <div className="absolute inset-0 bg-black/25 group-hover:bg-black/35 transition-colors duration-300"></div>

        <div className="absolute bottom-4 left-4 text-white text-xl md:text-2xl font-semibold drop-shadow-lg">
        {title}
      </div>
    </div>
  )
}

export default CategoryCard
