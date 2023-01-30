import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, getItems } from "../../redux/cartSlice";
import { useAppDispatch } from "../../redux/store";
import { Link } from "react-router-dom";

type CartItem = {
  id: string;
  title: string;
  count: number;
  price: number;
  type: string;
  size: number;
  imageUrl: string;
};

type PizzaItemProps = {
  id: string;
  title: string;
  price: number;
  types: Array<number>;
  sizes: Array<number>;
  imageUrl: string;
};

const PizzaItem: FC<PizzaItemProps> = ({
  id,
  title,
  price,
  imageUrl,
  types,
  sizes,
}) => {
  const [activeIndex, setActiveIndex] = useState(sizes[0]);
  const [activeTypeIndex, setActiveTypeIndex] = useState(types[0]);
  const typesName = ["Тонкое", "Традиционное"];
  const dispatch = useAppDispatch();
  const items = useSelector(getItems);
  const count = items.find((item: CartItem) => {
    return (
      item.id === id &&
      item.size === activeIndex &&
      item.type === typesName[activeTypeIndex]
    );
  })?.count;
  const onClickAdd = () => {
    const item = {
      id,
      title,
      price,
      imageUrl,
      type: typesName[activeTypeIndex],
      size: activeIndex,
    };
    dispatch(addItem({ ...item, count: 1 }));
  };
  return (
    <div className="pizza-block">
      <Link key={id} to={`/pizza/${id}`}>
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </Link>
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type, index) => (
            <li
              key={index}
              onClick={() => setActiveTypeIndex(type)}
              className={activeTypeIndex === type ? "active" : ""}
            >
              {typesName[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, index) => (
            <li
              key={index}
              onClick={() => setActiveIndex(size)}
              className={activeIndex === size ? "active" : ""}
            >
              {size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <div
          className="button button--outline button--add"
          onClick={onClickAdd}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
              fill="white"
            />
          </svg>
          <span>Добавить</span>
          {count && count > 0 && <i>{count}</i>}
        </div>
      </div>
    </div>
  );
};

export default PizzaItem;
