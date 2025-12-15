"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Calendar,
  MapPin,
  Package,
  ShoppingCart,
  SoupIcon,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useFoodCategory } from "../_provider/food-category";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { toast } from "react-toastify";
import { useOrder } from "../_provider/Order";

export function OrderSheet() {
  const { foodList, foods } = useFoodCategory();
  const { order, createOrder } = useOrder();
  const router = useRouter();

  console.log("foods", foods);

  const [activeTab, setActiveTab] = useState("cart");
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const getFoodOrder = () => {
    const cartStorage = JSON.parse(localStorage.getItem("cart")) || [];
    const getCart = cartStorage
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

  useEffect(() => {
    getFoodOrder();
  }, [foodList]);

  useEffect(() => {
    const saved = localStorage.getItem("location");
    setLocation(saved || "");
  }, []);

  const increase = (itemId) => {
    const updatedCart = cart.map((item) =>
      item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);

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

    const cartStorage = updatedCart.map((item) => ({
      _id: item._id,
      quantity: item.quantity,
    }));
    localStorage.setItem("cart", JSON.stringify(cartStorage));
  };

  const removeItem = (itemId) => {
    const updatedCart = cart.filter((item) => item._id !== itemId);
    setCart(updatedCart);

    const cartStorage = updatedCart.map((item) => ({
      _id: item._id,
      quantity: item.quantity,
    }));
    localStorage.setItem("cart", JSON.stringify(cartStorage));
  };

  const getItemTotal = (item) => {
    return (item.price * item.quantity).toFixed(2);
  };

  const getGrandTotal = () => {
    return cart
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const lastTotalPrice = () => {
    return (
      cart.reduce((total, item) => total + item.price * item.quantity, 0) + 6000
    ).toFixed(2);
  };

  const handleCheckout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setOpen(true);
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    if (!location || location.trim() === "") {
      toast.error("Please enter your delivery location!");
      return;
    }

    setIsLoading(true);
    const foodQuantity = localStorage.getItem("cart");
    // console.log("cart", cart);
    try {
      const orderData = {
        foodOrderItems: JSON.parse(foodQuantity),
        address: location,
        totalPrice: parseFloat(getGrandTotal()),
        grandTotal: parseFloat(lastTotalPrice()),
        status: "PENDING",
        orderDate: new Date().toISOString(),
      };
      // console.log("orderData", orderData);

      await createOrder(orderData);

      // Clear cart
      localStorage.removeItem("cart");
      setCart([]);

      // Switch to order tab
      setActiveTab("order");
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickLogin = () => {
    router.push("/Login");
  };

  const handleClickSignup = () => {
    router.push("/Signup");
  };
  const getStatusStyle = (status) => {
    const statusUpper = status?.toUpperCase();
    if (statusUpper === "PENDING") {
      return "bg-orange-50 text-orange-700 border border-orange-200";
    } else if (statusUpper === "DELIVERED") {
      return "bg-green-50 text-green-700 border border-green-200";
    } else if (statusUpper === "CANCELLED") {
      return "bg-red-50 text-red-700 border border-red-200";
    }
    return "bg-gray-50 text-gray-700 border border-gray-200";
  };

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
              <div className="bg-white flex flex-col justify-between items-start p-4 flex-1 self-stretch gap-5 rounded-[20px]">
                <h1 className="text-[#71717A] font-inter text-[20px] font-semibold leading-7 tracking-[-0.5px]">
                  My cart
                </h1>
                {cart.length === 0 ? (
                  <p className="text-gray-500 text-center w-full py-8">
                    Your cart is empty
                  </p>
                ) : (
                  cart.map((item) => (
                    <div key={item._id} className="w-full">
                      <div className="flex gap-6">
                        <Image
                          src={
                            item.image ||
                            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx2qcKAz_hqMRda9TnCrnA1uZEmbAc6vLVQA&s"
                          }
                          alt="image"
                          width={120}
                          height={120}
                          className="object-cover rounded-xl"
                        />
                        <div className="flex flex-col justify-between gap-6 w-[305px]">
                          <div className="flex flex-col gap-3">
                            <div className="text-[#EF4444] font-inter text-4 font-medium leading-5">
                              {item.foodName}
                            </div>
                            <div className="h-4 text-[14px] text-[#09090B] truncate">
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
                              <p className="text-[#09090B] font-inter text-base font-normal leading-6">
                                Total price
                              </p>
                              <div className="text-[#09090B] font-inter text-[16px] font-semibold leading-8 tracking-[-0.6px]">
                                ₮{getItemTotal(item)}
                              </div>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => removeItem(item._id)}
                          className="text-red-500 text-2 border rounded-full border-red-500 cursor-pointer w-8 h-8"
                        >
                          x
                        </button>
                      </div>
                      <div className="border-b border-[#09090B]/50 p-2"></div>
                    </div>
                  ))
                )}

                <h1 className="text-[#71717A] font-inter text-[20px] font-semibold leading-7 tracking-[-0.5px]">
                  Delivery location
                </h1>
                <input
                  className="flex flex-col items-start p-[8px_12px] flex-1 self-stretch rounded-[6px] border border-[#E4E4E7] bg-white shadow-sm w-full"
                  placeholder="Please share your complete address"
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    localStorage.setItem("location", e.target.value);
                  }}
                />
              </div>

              <div className="flex flex-col items-start justify-between p-4 gap-5 self-stretch rounded-[20px] bg-white">
                <h1 className="text-[#71717A] font-inter text-[20px] font-semibold leading-7 tracking-[-0.5px]">
                  Payment info
                </h1>
                {cart.length > 0 && (
                  <div className="flex w-full justify-between">
                    <p className="text-[#71717A] font-inter text-[16px] font-normal leading-7">
                      Items
                    </p>
                    <p className="text-[#09090B] text-right font-inter text-[16px] font-bold leading-7">
                      ₮{getGrandTotal()}
                    </p>
                  </div>
                )}
                <div className="flex w-full justify-between">
                  <p className="text-[#71717A] font-inter text-[16px] font-normal leading-7">
                    Shipping
                  </p>
                  <p className="text-[#09090B] text-right font-inter text-[16px] font-bold leading-7">
                    ₮6000
                  </p>
                </div>
                <div className="border-b border-[#09090B]/50 p-2 w-full"></div>
                <div className="flex w-full justify-between">
                  <p className="text-[#71717A] font-inter text-[16px] font-normal leading-7">
                    Total price
                  </p>
                  <p className="text-[#09090B] text-right font-inter text-[16px] font-bold leading-7">
                    ₮{lastTotalPrice()}
                  </p>
                </div>

                <Button
                  onClick={handleCheckout}
                  disabled={isLoading || cart.length === 0}
                  className="w-full h-10 bg-[#EF4444] text-white hover:bg-[#DC2626] rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Processing..." : "Checkout"}
                </Button>
              </div>
            </div>
          )}

          {activeTab === "order" && (
            <div className="bg-white flex flex-col items-start p-6 gap-6 rounded-[20px]">
              <h1 className="text-[#71717A] font-inter text-[20px] font-semibold leading-7 tracking-[-0.5px]">
                Order history
              </h1>

              {order.length === 0 ? (
                <p className="text-gray-500 text-center w-full py-8">
                  No orders yet
                </p>
              ) : (
                <div className="w-full flex flex-col gap-6">
                  {/* {console.log("order", order)} */}
                  {order.map((item) => (
                    <div
                      key={item._id}
                      className="w-full pb-6 border-b border-dashed border-gray-300 last:border-b-0"
                    >
                      {/* Header with price and status */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-baseline gap-2">
                          <span className="text-[24px] font-bold text-[#09090B]">
                            ₮{item.grandTotal || item.totalPrice}
                          </span>
                          <span className="text-[14px] text-gray-500">
                            (#{item._id?.slice(-5).toUpperCase()})
                          </span>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-[12px] font-medium ${getStatusStyle(
                            item.status
                          )}`}
                        >
                          {item.status}
                        </span>
                      </div>

                      {/* Food items */}

                      <div className="flex flex-col gap-2 mb-4">
                        {item.foodOrderItems?.map((item) => {
                          const currentFood = foods.find(
                            (index) => index._id === item?._id
                          );
                          return (
                            <div
                              key={item._id}
                              className="flex items-center gap-2 text-[14px] text-gray-700"
                            >
                              <SoupIcon className="w-4 h-4 text-gray-400" />
                              <span>{currentFood?.foodName}</span>
                              <span className="ml-auto text-gray-500">
                                x {item.quantity}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Date */}
                      <div className="flex items-center gap-2 text-[14px] text-gray-600 mb-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span>
                          {new Date(
                            item.orderDate || item.createdAt
                          ).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          })}
                        </span>
                      </div>

                      {/* Address */}
                      <div className="flex items-start gap-2 text-[14px] text-gray-600">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                        <span className="line-clamp-2">{item.address}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        <Dialog open={open} onOpenChange={() => setOpen((prev) => !prev)}>
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
                className="bg-white text-black cursor-pointer"
                onClick={handleClickSignup}
              >
                Sign up
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </SheetContent>
    </Sheet>
  );
}
