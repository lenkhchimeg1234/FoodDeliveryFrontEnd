import DarkNomNomIcon from "@/app/Icons/DarkNomNomIcon";
import { Button } from "@/components/ui/button";
import { ChevronRight, MapPin, ShoppingCart, User } from "lucide-react";
import Image from "next/image";

export function UserHeader() {
  return (
    <div>
      <div className="flex w-[1440px] px-[88px] py-3 justify-between items-center bg-(--background-bg-primary,#18181B)">
        <div className="flex gap-3">
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
        <div className="flex gap-3">
          <Button variant="default" className="bg-white rounded-full gap-1">
            <MapPin className="text-[#EF4444]" />
            <p className="text-[#EF4444] font-inter text-[12px] font-normal leading-4">
              Delivery address:
            </p>
            <p className="text-[#71717A] font-inter text-[12px] font-normal leading-4">
              Add location
            </p>
            <ChevronRight className="text-[#71717A]" />
          </Button>
          <Button variant="default" className="bg-white rounded-full">
            <ShoppingCart className="text-black" />
          </Button>
          <Button variant="default" className="bg-[#EF4444] rounded-full">
            <User />
          </Button>
        </div>
      </div>
      <div>
        <Image
          src="/FoodIcon.png"
          alt="foodicon"
          width={1440}
          height={570}
          className="mx-auto"
        />
      </div>
    </div>
  );
}
