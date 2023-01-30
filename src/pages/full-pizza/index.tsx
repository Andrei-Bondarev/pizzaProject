import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPizza, getSelectedItem } from "../../redux/pizzasSlice";
import PizzaItem from "../../features/pizza-item";
import { useAppDispatch } from "../../redux/store";

const FullPizza = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const item = useSelector(getSelectedItem);
  useEffect(() => {
    try {
      dispatch(fetchPizza(Number(params.id)));
    } catch (e) {
      console.log(e);
    }
  }, [dispatch, params.id]);
  if (!item) return <div>Loading</div>;
  return (
    <div className={"container"}>
      <PizzaItem {...item} />
    </div>
  );
};

export default FullPizza;
