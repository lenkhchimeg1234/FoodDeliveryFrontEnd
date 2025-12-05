"use client";

import { Badge } from "@/components/ui/badge";
import { FoodCategory } from "@/Component/FoodCategory";
import { Food } from "@/Component/Food";
import SvgComponent from "../Icons/UpdateIcon";
import { useFoodCategory } from "../_provider/food-category";
import NomNomIcon from "../Icons/NomNomIcon";
import { LayoutDashboardIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AllDishesPage() {
  // const { categories, loading, deleteCategory, createCategory } =
  //   useFoodCategory();

  return (
    <div className="flex  bg-gray-100 gap-5 h-full w-[205px]">
      <div className="  flex-col bg-white px-5 py-9 flex  p-6 items-start gap-4 self-stretch rounded-xl">
        <NomNomIcon />
        <div>
          <div className="text-(--text-text-foreground,#09090B) font-inter text-lg font-semibold leading-7">
            NomNom
          </div>
          <div className="text-(--text-text-muted-foreground,#71717A)  font-inter text-xs font-normal leading-4">
            Swift delivery
          </div>
        </div>
        <Button className="text-(--text-text-foreground,#09090B) font-inter text-sm font-medium leading-5">
          <LayoutDashboardIcon className="w-[22px] h-[22px]" /> Food menu
        </Button>
      </div>

      <div className="flex flex-col gap-5 bg-gray-100 ">
        <FoodCategory />
        <Food />
      </div>
    </div>
  );
}
