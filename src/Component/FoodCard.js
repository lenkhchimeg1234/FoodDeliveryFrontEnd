"use client";

import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import UpdateIcon from "@/app/Icons/UpdateIcon";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import TrashIcon from "@/app/Icons/TrashIcon";
import axios from "axios";
import {
  FoodCategoryProvider,
  useFoodCategory,
} from "@/app/_provider/food-category";

export const FoodCard = ({ item, category }) => {
  const { updateFood, deleteFood, categories, getCategory } = useFoodCategory();
  console.log(category, "category");
  console.log(item, "item");

  const [foodUpdate, setFoodUpdate] = useState({
    foodName: item?.foodName,
    price: item?.price,
    image: item?.image,
    ingredients: item?.ingredients,
    category: category._id,
  });

  const [open, setOpen] = useState(false);

  const handleUpdateFood = async (id) => {
    try {
      await updateFood(id, foodUpdate);
      getCategory();
    } catch (error) {
      console.error("Update is not found", error);
    } finally {
      setOpen(false);
    }
  };

  return (
    <div
      key={item._id}
      className="flex p-4 w-[270.75px] h-[241px] flex-col items-start gap-5 flex-1 self-stretch rounded-[20px] border border-[#E4E4E7] bg-white"
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

        <div className="absolute">
          <Dialog>
            <form>
              <DialogTrigger asChild>
                <UpdateIcon onClick={() => setOpen(true)} />
              </DialogTrigger>
              {open && (
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Dishes info</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <div className="grid gap-3">
                      <div className="grid gap-3">
                        <Label>Dishes name</Label>
                        <Input
                          value={foodUpdate.foodName || ""}
                          onChange={(e) =>
                            setFoodUpdate({
                              ...foodUpdate,
                              foodName: e.target.value,
                            })
                          }
                        />
                      </div>
                      <Label htmlFor="name-1">Dish category</Label>

                      <Select
                        onValueChange={(value) =>
                          setFoodUpdate({ ...foodUpdate, category: value })
                        }
                        defaultValue={item?.category}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue>{item?.categoryName}</SelectValue>
                        </SelectTrigger>

                        <SelectContent>
                          <SelectGroup>
                            {categories?.map((cat) => (
                              <SelectItem key={cat._id} value={cat._id}>
                                {cat.categoryName}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-3">
                      <Label htmlFor="ingredients-1">Ingredients</Label>
                      <Input
                        value={foodUpdate.ingredients || ""}
                        onChange={(e) =>
                          setFoodUpdate({
                            ...foodUpdate,
                            ingredients: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label>Food price</Label>
                      <Input
                        value={foodUpdate.price || ""}
                        onChange={(e) =>
                          setFoodUpdate({
                            ...foodUpdate,
                            price: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button onClick={() => deleteFood(item._id)}>
                        <TrashIcon />
                      </Button>
                    </DialogClose>
                    <Button onClick={() => handleUpdateFood(item._id)}>
                      Save changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              )}
            </form>
          </Dialog>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-[#EF4444] font-inter text-sm font-medium leading-5 w-[190px]">
          {item.foodName}
        </div>
        <div className="text-[#09090B] font-inter text-xs font-normal leading-4">
          ${item.price}
        </div>
      </div>
      <div className="w-[236px] h-6 truncate">{item.ingredients}</div>
    </div>
  );
};
