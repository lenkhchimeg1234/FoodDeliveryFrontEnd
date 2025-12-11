"use client";

import DarkNomNomIcon from "@/app/Icons/DarkNomNomIcon";
import { Button } from "@/components/ui/button";
import { ChevronRight, MapPin, ShoppingCart, User } from "lucide-react";
import Image from "next/image";
import { OrderSheet } from "./OrderSheet";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function UserHeader() {
  const router = useRouter();
  const [token, setToken] = useState(null);

  const handleClickLogin = () => {
    router.push("/Login");
  };
  const handleClickSignup = () => {
    router.push("/Signup");
  };
  useEffect(() => {
    const t = localStorage.getItem("token");
    setToken(t);
  }, []);
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
        {token ? (
          <div className="flex gap-3">
            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <Button
                    variant="default"
                    className="bg-white rounded-full gap-1"
                  >
                    <MapPin className="text-[#EF4444]" />
                    <p className="text-[#EF4444] font-inter text-[12px] font-normal leading-4">
                      Delivery address:
                    </p>
                    <p className="text-[#71717A] font-inter text-[12px] font-normal leading-4">
                      Add location
                    </p>
                    <ChevronRight className="text-[#71717A]" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>
                      Please write your delivery address!
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <div className="grid gap-3">
                      <Input placeholder="Please share your complete address" />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Deliver here</Button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>

            <OrderSheet />

            <Button variant="default" className="bg-[#EF4444] rounded-full">
              <User />
            </Button>
          </div>
        ) : (
          <div className="flex gap-4">
            <Button
              variant="default"
              className="bg-white text-black rounded-3xl cursor-pointer"
              onClick={handleClickSignup}
            >
              Sign up
            </Button>
            <Button
              variant="default"
              className="bg-[#EF4444] rounded-3xl cursor-pointer"
              onClick={handleClickLogin}
            >
              Log in
            </Button>
            <OrderSheet />
          </div>
        )}
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
