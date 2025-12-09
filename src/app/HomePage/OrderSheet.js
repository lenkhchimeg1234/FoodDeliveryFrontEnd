"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";

export function OrderSheet({}) {
  const [activeTab, setActiveTab] = useState("cart");
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default" className="bg-white rounded-full">
          <ShoppingCart className="text-black" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[535px]">
        <SheetHeader>
          <SheetTitle>
            <ShoppingCart /> Order detail
          </SheetTitle>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="flex gap-2 w-[471px] h-11 p-1 bg-white rounded-full">
            <Button
              className={`rounded-full w-[227px] transition-colors ${
                activeTab === "cart"
                  ? "bg-[#EF4444] text-white hover:bg-[#DC2626]"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("cart")}
            >
              Cart
            </Button>

            <Button
              className={`rounded-full w-[227px] transition-colors ${
                activeTab === "order"
                  ? "bg-[#EF4444] text-white hover:bg-[#DC2626]"
                  : "bg-white text-black hover:bg-gray-100"
              }`}
              onClick={() => setActiveTab("order")}
            >
              Order
            </Button>
          </div>
          <h1>My cart</h1>
          <div></div>
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
