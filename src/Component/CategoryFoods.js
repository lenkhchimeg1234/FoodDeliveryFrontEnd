"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import * as React from "react";
import { FoodCard } from "./FoodCard";

export const CategoryFoods = ({ id, category, item }) => {
  const [foodList, setFoodList] = useState([]);
  const [foodUpdate, setFoodUpdate] = useState({
    foodName: item?.foodName,
    price: item?.price,
    image: item?.image,
    ingredients: item?.ingredients,
    category: item?.categoryName,
  });

  const getFood = async () => {
    try {
      const res = await axios.get(`http://localhost:247/food/${id}`);
      setFoodList(res.data);
    } catch (error) {
      console.error("Food is not found", error);
    }
  };
  const updateFood = async (id, foodUpdate) => {
    try {
      const response = await axios.put(`http://localhost:247/food/${id}`, {
        foodName: foodUpdate.foodName,
        price: foodUpdate.price,
        image: foodUpdate.image,
        ingredients: foodUpdate.ingredients,
        category: foodUpdate.category,
      });
      setFoodUpdate(response.data);
    } catch (error) {
      console.error("Update is not found", error);
    }
  };

  // const handleFoodUpdateSubmit = async (id, foodUpdate) => {
  //   try {
  //     const res = await axios.post("http://localhost:247/food", {
  //       ...foodUpdate,
  //       category: id,
  //     });

  //     // setFoodUpdate({
  //     //   foodName: "",
  //     //   price: "",
  //     //   image: "",
  //     //   ingredients: "",
  //     //   category: "",
  //     // });
  //   } catch (error) {
  //     console.error("Food is not found", error);
  //   }
  // };

  useEffect(() => {
    getFood();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return foodList.map((item) => (
    <FoodCard
      key={item._id}
      item={item}
      category={category}
      handleFoodUpdateSubmit={updateFood}
    />
  ));
};
