"use client";

import { useFoodCategory } from "@/app/_provider/food-category";

import { Foods } from "./Foods";

export function UserBody() {
  const { categories, foodList, getFood } = useFoodCategory();

  return (
    <div>
      <div className="flex flex-col gap-[54px]  bg-neutral-700">
        {categories?.map((cat) => (
          <div
            key={cat._id}
            value={cat._id}
            className="text-white font-inter text-[30px] font-semibold leading-9 tracking-[-0.75px] "
          >
            {cat.categoryName}
            <div className="grid grid-cols-3 gap-9">
              <Foods categoryId={cat._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
