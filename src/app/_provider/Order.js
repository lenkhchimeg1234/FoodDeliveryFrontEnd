"use client";

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const OrderContext = createContext(null);

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error("useOrder must be used inside a <OrderProvider>");
  }
  return context;
};

export const OrderProvider = ({ children }) => {
  const [order, setOrder] = useState([]);
  const [foodOrder, setFoodOrder] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOrder = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:247/foodorder/userId");
      setOrder(res.data);
    } catch (error) {
      console.log("Order is not found", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  const getFoodOrder = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:247/foodorder");
      setFoodOrder(res.data);
    } catch (error) {
      console.log("Order is not found", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFoodOrder();
  }, []);

  const createOrder = async () => {
    try {
      const token = localStorage.getItem("token") || "";
      await axios.post(
        "http://localhost:247/foodorder",

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Order asses succesfully!");
      getOrder();
    } catch (error) {
      console.error(error);
      toast.error("Failed to add category");
    }
  };

  return (
    <OrderContext.Provider
      value={{
        getOrder,
        createOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
