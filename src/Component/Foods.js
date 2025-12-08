import { useFoodCategory } from "@/app/_provider/food-category";
import Image from "next/image";
import { useEffect } from "react";

export function Foods({ categoryId }) {
  const { foodList, getFood } = useFoodCategory();

  useEffect(() => {
    getFood(categoryId);
  }, [categoryId]);

  return foodList
    .filter((item) => item.id === categoryId)
    .map((food) =>
      food.data.map((item) => (
        <div
          key={item._id}
          className="flex p-4 w-[397px] h-[342px] flex-col items-start gap-5 flex-1 self-stretch rounded-[20px] border border-[#E4E4E7] bg-white"
        >
          <div className=" flex justify-end items-end relative flex-1 self-stretch rounded-xl overflow-hidden">
            <Image
              src={
                item.image ||
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx2qcKAz_hqMRda9TnCrnA1uZEmbAc6vLVQA&s"
              }
              alt="image"
              width={239}
              height={129}
              className="object-cover rounded-xl w-full h-full"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-[#EF4444] font-inter text-[24px] font-medium leading-5 w-[295px]">
              {item.foodName}
            </div>
            <div className="text-[#09090B] font-inter text-[18px] font-normal leading-4">
              ${item.price}
            </div>
          </div>
          <div className="w-[365px] h-10 text-[14px] text-[#09090B] truncate">
            {item.ingredients}
          </div>
        </div>
      ))
    );
}
