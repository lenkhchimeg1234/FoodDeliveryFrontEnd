"use client";

import { useFoodCategory } from "@/app/_provider/food-category";
import DarkNomNomIcon from "@/app/Icons/DarkNomNomIcon";
import { FacebookIcon, InstagramIcon } from "lucide-react";

export function UserFooter() {
  const { categories } = useFoodCategory();
  return (
    <div className="flex  flex-col w-[1440px] h-[755px]  py-[60px] gap-[88px] bg-(--background-bg-primary,#18181B)">
      <div className="flex w-[1440px] h-[92px] px-[98px] py-7 items-center gap-[34px] bg-[#EF4444]">
        <h2 className="text-[#FAFAFA] font-inter text-[30px] font-semibold leading-9 tracking-[-0.75px]">
          Flash fast delivered
        </h2>
      </div>
      <div className="flex justify-between px-[88px]">
        <div className="flex gap-3 ">
          <DarkNomNomIcon />
          <div className="flex flex-col">
            <div className="font-inter text-[20px] font-semibold leading-7 tracking-[-0.5px] flex">
              <div className=" text-(--text-text-primary-foreground,#FAFAFA) ">
                Nom
              </div>
              <div className="  text-(--Tailwind-red---Text-color-500,#EF4444)">
                Nom
              </div>
            </div>

            <div className=" text-(--text-text-secondary,#F4F4F5) text-center  font-inter text-[12px] font-normal  leading-4">
              Swift delivery
            </div>
          </div>
        </div>
        <div className="flex gap-28">
          <div className="flex flex-col gap-1">
            <p className="text-(--text-text-muted-foreground,#71717A) font-inter text-base font-normal leading-7 cursor-pointer">
              NOMNOM
            </p>
            <div className="text-(--text-text-primary-foreground,#FAFAFA) font-inter text-base font-normal leading-6 cursor-pointer">
              Home
            </div>
            <div className="text-(--text-text-primary-foreground,#FAFAFA) font-inter text-base font-normal leading-6 cursor-pointer">
              Contact us
            </div>
            <div className="text-(--text-text-primary-foreground,#FAFAFA) font-inter text-base font-normal leading-6 cursor-pointer">
              Delivery zone
            </div>
          </div>

          <div>
            <p className="text-(--text-text-muted-foreground,#71717A) font-inter text-base font-normal leading-7 cursor-pointer">
              MENU
            </p>
            {categories?.map((cat) => (
              <div
                key={cat._id}
                value={cat._id}
                className="text-(--text-text-primary-foreground,#FAFAFA) font-inter text-base font-normal leading-6 cursor-pointer"
              >
                {cat.categoryName}
              </div>
            ))}
          </div>
          <div className="pr-[168px]">
            <p className="text-(--text-text-muted-foreground,#71717A) font-inter text-base font-normal leading-7 cursor-pointer">
              FOLLOW US
            </p>
            <div className="flex gap-4">
              <FacebookIcon className="text-(--text-text-primary-foreground,#FAFAFA) font-inter text-base font-normal leading-6 cursor-pointer" />
              <InstagramIcon className="text-(--text-text-primary-foreground,#FAFAFA) font-inter text-base font-normal leading-6 cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-[1264px] py-8 mx-auto items-center justify-center gap-28 border-t border-t-gray-500 ">
        <p className=" text-(--text-text-muted-foreground,#71717A) font-inter text-sm font-normal leading-5 cursor-pointer">
          Copy right 2024 ©Nomnom LLC
        </p>
        <p className="text-(--text-text-muted-foreground,#71717A) font-inter text-sm font-normal leading-5 cursor-pointer">
          Privacy policy
        </p>
        <p className="text-(--text-text-muted-foreground,#71717A) font-inter text-sm font-normal leading-5 cursor-pointer">
          Terms and conditoin
        </p>
        <p className="text-(--text-text-muted-foreground,#71717A) font-inter text-sm font-normal leading-5 cursor-pointer">
          Cookie policy
        </p>
      </div>
    </div>
  );
}
