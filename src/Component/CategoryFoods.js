"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import * as React from "react";
import { FoodCard } from "./FoodCard";
import { useFoodCategory } from "@/app/_provider/food-category";

export const CategoryFoods = ({ id, category }) => {
  const { foodList, getFood } = useFoodCategory();

  useEffect(() => {
    getFood(id);
  }, [id]);

  if (foodList.length < 0) {
    return <div>...loading</div>;
  }
  console.log("foodlist", foodList);
  return foodList
    .filter((item) => item.id === id)
    .map((item) =>
      item.data.map((food) => (
        <FoodCard key={food._id || food.id} category={category} item={food} />
      ))
    );
};
