import React from "react";

const ArticleCard = ({ title, description, onReadMore }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-xl transition-shadow duration-300">

      {/* Article Image
      <div className="w-full h-56 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div> */}

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 leading-snug">
          {title}
        </h3>

        <p className="text-gray-600 mt-2 text-sm">
          {description.length > 120
            ? description.substring(0, 120) + "..."
            : description}
        </p>

        <button
          onClick={onReadMore}
          className="mt-4 inline-block text-blue-600 font-medium hover:text-blue-800 transition"
        >
          Read More →
        </button>
      </div>
    </div>
  );
};

export default ArticleCard;
