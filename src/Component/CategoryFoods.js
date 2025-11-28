"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export const CategoryFoods = ({ id }) => {
  const [foodList, setFoodList] = useState([]);

  const getFood = async () => {
    try {
      const res = await axios.get(`http://localhost:247/food/${id}`);
      setFoodList(res.data);
    } catch (error) {
      console.error("Food is not found", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getFood();
  });

  return foodList.map((item) => (
    <div
      key={item._id}
      className="flex p-4 w-[270.75px] h-[241px] flex-col items-start gap-5 flex-1 self-stretch rounded-[20px] border border-[#E4E4E7] bg-white"
    >
      {/* <Image></Image> */}
      <div className="flex items-center justify-between">
        <div className="text-[#EF4444] font-inter text-sm font-medium leading-5 w-[190px]">
          {item.foodName}
        </div>
        <div className="text-[#09090B] font-inter text-xs font-normal leading-4">
          ${item.price}
        </div>
      </div>
      <div>{item.ingredients}</div>
    </div>
  ));
};
