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

export function FoodCategory() {
  const [category, setCategory] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  console.log(category, "category");

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:247/foodcategory", {
        categoryName: newCategory,
      });

      setCategory((prev) => [...prev, res.data]);

      setNewCategory("");
    } catch (error) {
      console.error("Category is not found", error);
    }
  };

  const getCategory = async () => {
    try {
      const res = await axios.get("http://localhost:247/foodcategory");
      console.log("res", res);
      setCategory(res.data);
    } catch (error) {
      console.error("Category is not found", error);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getCategory();
  }, []);

  return (
    <div className="flex flex-col p-6 items-start gap-4 self-stretch rounded-xl bg-white">
      <div className="text-[#09090B] font-inter text-[20px] font-semibold leading-7 tracking-[-0.5px]">
        Dishes Category
      </div>
      <div className="flex w-full flex-wrap gap-3">
        {category.map((item) => (
          <Badge variant="secondary" key={item._id}>
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
