"use client";

import { Badge } from "@/components/ui/badge";
import { FoodCategory } from "@/Component/FoodCategory";
import { Food } from "@/Component/Food";
import SvgComponent from "../Icons/UpdateIcon";
import { useFoodCategory } from "../_provider/food-category";
import NomNomIcon from "../Icons/NomNomIcon";
import { LayoutDashboardIcon, TruckIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import OrderPage from "@/Component/OrderPage";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AllDishesPage() {
  // const { categories, loading, deleteCategory, createCategory } =
  //   useFoodCategory();
  const [activeTab, setActiveTab] = useState("foodmenu");
  const router = useRouter();
  const handleClickHomePage = () => {
    router.push("/");
  };

  return (
    <div className="flex  bg-gray-100 gap-5 h-full w-[205px]">
      <div className="  flex-col bg-white px-5 py-9 flex  p-6 items-start gap-4 self-stretch rounded-xl">
        <div className="flex gap-3 justify-center items-center">
          <NomNomIcon onClick={handleClickHomePage} />
          <div>
            <div className="text-(--text-text-foreground,#09090B) font-inter text-lg font-semibold leading-7">
              NomNom
            </div>
            <div className="text-(--text-text-muted-foreground,#71717A)  font-inter text-xs font-normal leading-4">
              Swift delivery
            </div>
          </div>
        </div>
        <Button
          className={` font-inter text-sm font-medium leading-5 transition-colors ${
            activeTab === "cart"
              ? "bg-black text-white hover:bg-black"
              : "bg-white text-black hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("foodmenu")}
        >
          <LayoutDashboardIcon className="w-[22px] h-[22px]" /> Food menu
        </Button>
        <Button
          className={`transition-colors font-inter text-sm font-medium leading-5 ${
            activeTab === "cart"
              ? "bg-black text-white hover:bg-black"
              : "bg-white text-black hover:bg-gray-100"
          }`}
          onClick={() => setActiveTab("order")}
        >
          <TruckIcon className="w-[22px] h-[22px]" /> Order
        </Button>
      </div>

      {activeTab === "foodmenu" && (
        <div className="flex flex-col gap-5 bg-gray-100 ">
          <FoodCategory />
          <Food />
        </div>
      )}
      {activeTab === "order" && <OrderPage />}
    </div>
  );
}
