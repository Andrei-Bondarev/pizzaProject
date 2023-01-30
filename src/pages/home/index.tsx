import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import qs from "qs";
import { Link, useNavigate } from "react-router-dom";
import Categories from "../../features/categories";
import Sort, { sortBy } from "../../features/sort";
import Skeleton from "../../features/pizza-item/skeleton";
import PizzaItem from "../../features/pizza-item";
import Pagination from "../../features/pagination";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryId,
  getCurrentPage,
  getSearch,
  getSortParam,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../../redux/filterSlice";
import { fetchPizzas, getItems, getStatus } from "../../redux/pizzasSlice";
import { useAppDispatch } from "../../redux/store";

const Home: FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const categoryId = useSelector(getCategoryId);
  const items = useSelector(getItems);
  const status = useSelector(getStatus);
  const sortParam = useSelector(getSortParam);
  const currentPage = useSelector(getCurrentPage);
  const search = useSelector(getSearch);
  const isSearch = useRef(false);
  const isMounted = useRef(false);
  const setPage = (value: number) => {
    dispatch(setCurrentPage(value));
  };
  const fetchPizza = useCallback(async () => {
    try {
      dispatch(fetchPizzas({ categoryId, sortParam, search, currentPage }));
    } catch (e) {
      console.log(e);
    }
  }, [categoryId, currentPage, search, sortParam.sort]);
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortBy.find((obj) => obj.sort === params.sort);
      isSearch.current = true;
      // @ts-ignore
      dispatch(setFilters({ ...params, sort }));
    }
  }, [dispatch]);
  useEffect(() => {
    if (!isSearch.current) {
      fetchPizza();
    }
    isSearch.current = false;
  }, [categoryId, sortParam, search, currentPage, fetchPizza]);
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sort: sortParam.sort,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortParam, search, currentPage, navigate]);
  return (
    <div className="container">
      <div className="content__top">
        <Categories
          activeIndex={categoryId}
          setActiveIndex={(i: number) => dispatch(setCategoryId(i))}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {status === "loading"
          ? [...new Array(8)].map((item, index) => <Skeleton key={index} />)
          : items.map((pizza: any) => <PizzaItem {...pizza} key={pizza.id} />)}
      </div>
      <Pagination setCurrentPage={setPage} />
    </div>
  );
};

export default Home;
