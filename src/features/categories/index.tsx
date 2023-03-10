import React, { FC } from "react";
type CategoriesProps = {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
};
const Categories: FC<CategoriesProps> = ({ activeIndex, setActiveIndex }) => {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  return (
    <div className="categories">
      <ul>
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => setActiveIndex(index)}
            className={activeIndex === index ? "active" : ""}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;
