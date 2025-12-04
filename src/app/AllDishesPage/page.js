"use client";

import { Badge } from "@/components/ui/badge";
import { FoodCategory } from "@/Component/FoodCategory";
import { Food } from "@/Component/Food";
import SvgComponent from "../Icons/UpdateIcon";
import { useFoodCategory } from "../_provider/food-category";

export default function AllDishesPage() {
  const { categories, loading, deleteCategory, createCategory } =
    useFoodCategory();
  // console.log("categories", categories);
  // console.log("loading", loading);
  return (
    <div className="flex bg-gray-100 gap-5">
      <div className="w-[205px] h-full bg-white px-5 py-9 flex flex-col p-6 items-start gap-4 self-stretch rounded-xl">
        NomVom
      </div>
      <div>
        <FoodCategory />
        <Food />
      </div>
    </div>
  );
}
