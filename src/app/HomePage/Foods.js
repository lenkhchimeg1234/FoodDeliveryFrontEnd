"use client";

import { useFoodCategory } from "@/app/_provider/food-category";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function Foods({ categoryId }) {
  const { foodList, getFood } = useFoodCategory();
  const [open, setOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const increase = () => setQuantity((q) => q + 1);
  const decrease = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  // const totalPrice = foodPrice * quantity;

  const addToCart = (_id) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    const exist = cart.find((item) => item._id === _id);

    if (exist) {
      exist.quantity = exist.quantity + quantity;
    } else {
      cart.push({ _id: _id, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    setOpen(false);
  };

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
            <div className="absolute pr-2 pb-2">
              <Dialog>
                <form>
                  <DialogTrigger asChild>
                    <Button
                      variant="default"
                      className="bg-white rounded-full gap-1 "
                      onClick={() => setOpen(true)}
                    >
                      <PlusIcon className="text-red-500" />
                    </Button>
                  </DialogTrigger>
                  {open && (
                    <DialogContent className="sm:max-w-[826px] ">
                      <div className="flex gap-6">
                        <Image
                          src={
                            item.image ||
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx2qcKAz_hqMRda9TnCrnA1uZEmbAc6vLVQA&s"
                          }
                          alt="image"
                          width={377}
                          height={364}
                          className="object-cover rounded-xl "
                        />
                        <div className="py-8 flex flex-col justify-between">
                          <div className="flex flex-col gap-3">
                            <div className="text-[#EF4444] font-inter text-[24px] font-medium leading-5 w-[295px]">
                              {item.foodName}
                            </div>
                            <div className="w-[365px] h-10 text-[14px] text-[#09090B] truncate">
                              {item.ingredients}
                            </div>
                          </div>
                          <div className="flex justify-between">
                            <div>
                              <p className="text-(--text-text-foreground,#09090B) font-inter text-base font-normal leading-6">
                                Total price
                              </p>
                              <div className="text-(--text-text-foreground,#09090B) font-inter text-[24px] font-semibold leading-8 tracking-[-0.6px]">
                                ₮{item.price}
                              </div>
                            </div>
                            <div className="flex flex-row gap-3 items-center">
                              <div
                                onClick={decrease}
                                className="cursor-pointer border rounded-full border-black w-11 h-11 flex justify-center items-center"
                              >
                                {/* <QuantityMinusIcon /> */}-
                              </div>
                              <div>{quantity}</div>
                              <div
                                onClick={increase}
                                className="cursor-pointer border rounded-full border-black w-11 h-11 flex justify-center items-center"
                              >
                                {/* <QuantityPlusIcon /> */}+
                              </div>
                            </div>
                          </div>
                          <Button onClick={() => addToCart(item._id)}>
                            Add to cart
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  )}
                </form>
              </Dialog>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-[#EF4444] font-inter text-[24px] font-medium leading-5 w-[295px]">
              {item.foodName}
            </div>
            <div className="text-[#09090B] font-inter text-[18px] font-normal leading-4">
              ₮{item.price}
            </div>
          </div>
          <div className="w-[365px] h-10 text-[14px] text-[#09090B] truncate">
            {item.ingredients}
          </div>
        </div>
      ))
    );
}
