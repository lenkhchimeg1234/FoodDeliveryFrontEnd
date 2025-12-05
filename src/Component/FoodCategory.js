"use client";

import { AlertCircleIcon, BadgeCheckIcon, CheckIcon, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useFoodCategory } from "@/app/_provider/food-category";

export function FoodCategory() {
  const { categories, loading, createCategory, deleteCategory } =
    useFoodCategory();

  
  const [newCategory, setNewCategory] = useState("");
  // console.log(category, "category");

  const handleSubmit = async () => {
    if (!newCategory.trim()) {
      toast.error("Please enter category name");
    }
    try {
      await createCategory(newCategory);
      setNewCategory("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add category");
    }
  };

  // const handleDeleteButton = async (id) => {
  //   try {
  //     await deleteCategory(id);
  //   } catch (error) {
  //     toast.error("Failed to delete category");
  //   }
  // };

  if (loading) {
    return <div>...loading</div>;
  }

 

  return (
    <div className="flex flex-col p-6 items-start gap-4 self-stretch rounded-xl bg-white">
      <div className="text-[#09090B] font-inter text-[20px] font-semibold leading-7 tracking-[-0.5px]">
        Dishes Category
      </div>
      <div className="flex w-full flex-wrap gap-3">
        {categories.map((item) => (
          <Badge variant="secondary" key={item._id} className="relative">
            <button
              className="absolute w-7 h-7 top-8 right-4 bg-white p-1 rounded-full shadow"
              onClick={() => {
                deleteCategory(item._id);
              }}
            >
              x
            </button>
            {item.categoryName}
            <Badge>112</Badge>
          </Badge>
        ))}
      </div>
      <div>
        <Dialog>
          <DialogTrigger className="flex w-9 h-9 justify-center items-center gap-2 rounded-full bg-[#EF4444] text-white">
            {/* <Button className="flex w-9 h-9 px-4 py-2 justify-center items-center gap-2 rounded-full bg-[#EF4444]"> */}
            <Plus />
            {/* </Button> */}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add new category</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name-1">Category name</Label>
                <Input
                  id="name-1"
                  name="name"
                  type="text"
                  placeholder="Type category name"
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                cancel
                {/* <Button variant="outline">Cancel</Button> */}
              </DialogClose>
              <Button onClick={handleSubmit}>Add category</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
