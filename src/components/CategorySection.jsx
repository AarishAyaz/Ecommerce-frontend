import Electronics from '../assets/Electronics.jpeg'
import Fashion from '../assets/Fashion.jpeg'
import Furniture from '../assets/Furniture.jpeg'
import HomeAppliance from '../assets/HomeAppliance.jpg'
import CategoryCard from "./CategoryCard";

const CategoriesSection = () => {
  const categories = [
    { title: "Electronics", image: Electronics },
    { title: "Fashion", image: Fashion },
    { title: "Furniture", image: Furniture },
    { title: "Home Appliances", image: HomeAppliance },
  ];

  return (
    <section id="categories" className="py-20 bg-gray-50">
      {/* Section Title */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Categories
        </h1>
        <p className="mt-4 text-gray-600 text-lg md:text-xl">
          Explore our wide range of products across top categories
        </p>
      </div>

      {/* Category Cards */}
      <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat, idx) => (
          <CategoryCard
            key={idx}
            image={cat.image}
            title={cat.title}
            onClick={() => alert(`Go to ${cat.title}`)}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
