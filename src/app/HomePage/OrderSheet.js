"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFoodCategory } from "../_provider/food-category";
import { useRouter } from "next/navigation";
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

export function OrderSheet({}) {
  const { foodList } = useFoodCategory();
  const router = useRouter();
  // console.log("foodList", foodList);

  const [activeTab, setActiveTab] = useState("cart");
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState("");

  const getFoodOrder = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const getCart = cart
      .map((item) => {
        const food = foodList
          .flatMap((f) => f.data)
          .find((f) => f._id === item._id);
        if (!food) return null;
        return {
          ...food,
          quantity: item.quantity,
        };
      })
      .filter(Boolean);

    setCart(getCart);
  };

  // const [token, setToken] = useState(null);

  const handleClickLogin = () => {
    router.push("/Login");
  };
  const handleClickSignup = () => {
    router.push("/Signup");
  };
  // console.log(cart, "foodfoodfoodfoodfood");

  useEffect(() => {
    getFoodOrder();
  }, [foodList]);

  const increase = (itemId) => {
    const updatedCart = cart.map((item) =>
      item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);

    // Update localStorage
    const cartStorage = updatedCart.map((item) => ({
      _id: item._id,
      quantity: item.quantity,
    }));
    localStorage.setItem("cart", JSON.stringify(cartStorage));
  };

  const decrease = (itemId) => {
    const updatedCart = cart.map((item) =>
      item._id === itemId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);

    // Update localStorage
    const cartStorage = updatedCart.map((item) => ({
      _id: item._id,
      quantity: item.quantity,
    }));
    localStorage.setItem("cart", JSON.stringify(cartStorage));
  };

  const removeItem = (itemId) => {
    const updatedCart = cart.filter((item) => item._id !== itemId);
    setCart(updatedCart);

    // Update localStorage
    const cartStorage = updatedCart.map((item) => ({
      _id: item._id,
      quantity: item.quantity,
    }));
    localStorage.setItem("cart", JSON.stringify(cartStorage));
  };

  // Calculate total price for each item
  const getItemTotal = (item) => {
    return (item.price * item.quantity).toFixed(2);
  };

  // Calculate grand total
  const getGrandTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };
  const lastTotalPrice = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity + 6000, 0)
      .toFixed(2);
  };
  const handleCheckout = () => {
    const token = localStorage.getItem("token");
    if (token) {
      //back ruu huselt yvna
    } else {
      setOpen(true);
    }
  };
  useEffect(() => {
    const saved = localStorage.getItem("location");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocation(saved);
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default" className="bg-white rounded-full">
          <ShoppingCart className="text-black" />
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[535px] overflow-scroll bg-[#404040]">
        <SheetHeader>
          <SheetTitle className="text-[#FAFAFA] flex gap-2 font-inter text-[20px] font-semibold leading-7 tracking-[-0.5px]">
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
          {activeTab === "cart" && (
            <div className="flex flex-col gap-6">
              <div className="bg-white flex flex-col justify-between items-start p-4 flex-1 self-stretch gap-5 rounded-[20px] ">
                <h1 className="text-(--text-text-muted-foreground,#71717A) font-inter   text-[20px] font-semibold leading-7  tracking-[-0.5px]">
                  My cart
                </h1>
                {cart.map((item) => (
                  <div key={item._id}>
                    <div className="flex gap-6">
                      <Image
                        src={
                          item.image ||
                          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx2qcKAz_hqMRda9TnCrnA1uZEmbAc6vLVQA&s"
                        }
                        alt="image"
                        width={120}
                        height={120}
                        className="object-cover rounded-xl "
                      />

                      <div className=" flex flex-col justify-between gap-6 w-[305px]">
                        <div className="flex flex-col gap-3">
                          <div className="text-[#EF4444] font-inter text-4 font-medium leading-5 ">
                            {item.foodName}
                          </div>
                          <div className=" h-4 text-[14px] text-[#09090B] truncate">
                            {item.ingredients}
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <div className="flex flex-row gap-3 items-center">
                            <div
                              onClick={() => decrease(item._id)}
                              className="cursor-pointer border rounded-full border-black w-8 h-8 flex justify-center items-center"
                            >
                              -
                            </div>
                            <div>{item.quantity}</div>
                            <div
                              onClick={() => increase(item._id)}
                              className="cursor-pointer border rounded-full border-black w-8 h-8 flex justify-center items-center"
                            >
                              +
                            </div>
                          </div>
                          <div>
                            <p className="text-(--text-text-foreground,#09090B) font-inter text-base font-normal leading-6">
                              Total price
                            </p>
                            <div className="text-(--text-text-foreground,#09090B) font-inter text-[16px] font-semibold leading-8 tracking-[-0.6px]">
                              ₮{getItemTotal(item)}
                            </div>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => removeItem(item._id)}
                        className="text-red-500 text-2  border rounded-full border-red-500 cursor-pointer w-8 h-8"
                      >
                        x
                      </button>
                    </div>
                    <div className="border-b custom-dash border-[#09090B]/50 p-2"></div>
                  </div>
                ))}
                <h1 className="text-(--text-text-muted-foreground,#71717A) font-inter   text-[20px] font-semibold leading-7  tracking-[-0.5px]">
                  Delivery location
                </h1>
                <input
                  className=" flex flex-col items-start p-[8px_12px] flex-1 self-stretch  rounded-[6px] border border-[#E4E4E7] bg-white shadow-sm"
                  placeholder="Please share your complete address"
                  value={location}
                />
              </div>

              <div className="flex flex-col items-start justify-between p-4 gap-5 self-stretch rounded-[20px] bg-white">
                <h1 className="text-(--text-text-muted-foreground,#71717A) font-inter   text-[20px] font-semibold leading-7  tracking-[-0.5px]">
                  Payment info
                </h1>
                {cart.length > 0 && (
                  <div className="flex w-[471px] justify-between   border-gray-200">
                    <p className="text-[#71717A] font-inter text-[16px] font-normal leading-7">
                      Items
                    </p>
                    <p className="text-[#09090B] text-right font-inter text-[16px] font-bold leading-7">
                      ₮{getGrandTotal()}
                    </p>
                  </div>
                )}
                <div className="flex w-[471px] justify-between   border-gray-200">
                  <p className="text-[#71717A] font-inter text-[16px] font-normal leading-7">
                    Shipping
                  </p>
                  <p className="text-[#09090B] text-right font-inter text-[16px] font-bold leading-7">
                    ₮6000
                  </p>
                </div>
                <div className="border-b custom-dash border-[#09090B]/50 p-2 w-full"></div>
                <div className="flex w-[471px] justify-between   border-gray-200">
                  <p className="text-[#71717A] font-inter text-[16px] font-normal leading-7">
                    Total price
                  </p>
                  <p className="text-[#09090B] text-right font-inter text-[16px] font-bold leading-7">
                    ₮{lastTotalPrice()}
                  </p>
                </div>

                <Button
                  onClick={handleCheckout}
                  className="w-full h-10 bg-[#EF4444] text-white hover:bg-[#DC2626] rounded-full"
                >
                  Checkout
                </Button>

                <Dialog
                  open={open}
                  onOpenChange={() => setOpen((prev) => !prev)}
                >
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>You need to log in first</DialogTitle>
                    </DialogHeader>

                    <DialogFooter>
                      <Button
                        variant="default"
                        className="cursor-pointer"
                        onClick={handleClickLogin}
                      >
                        Log in
                      </Button>
                      <Button
                        variant="default"
                        className="bg-white text-black  cursor-pointer"
                        onClick={handleClickSignup}
                      >
                        Sign up
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          )}
          {activeTab === "order" && <div>hello order</div>}
        </div>
      </SheetContent>
    </Sheet>
  );
}
