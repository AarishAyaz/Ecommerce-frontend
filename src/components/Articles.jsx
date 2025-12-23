import ArticleCard from "./ArticleCard";

const ArticlesSection = () => {
  const articles = [
    {
      title: "Top 10 Gadgets You Need in 2025",
      description:
        "Technology is evolving fast. These 10 gadgets will improve your daily life with efficiency, comfort, and style...",
    
    },
    {
      title: "How to Choose the Best Laptop",
      description:
        "Buying a laptop can be confusing, but this guide covers everything from RAM and processors to display quality...",
    },
  ];

  return (
    <section id="articles" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Latest Articles
        </h1>
        <p className="mt-3 text-gray-600 text-lg">
          Stay updated with the latest trends, tips, and reviews.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid  gap-6">
        {articles.map((a, i) => (
          <ArticleCard
            key={i}
            title={a.title}
            description={a.description}
            image={a.image}
            onReadMore={() => alert(`Reading: ${a.title}`)}
          />
        ))}
      </div>
    </section>
  );
};

export default ArticlesSection;
