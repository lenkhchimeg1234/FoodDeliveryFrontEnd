"use client";

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BACK_END_URL } from "@/app/_constant/index";

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
  const [allFoodOrder, setAllFoodOrder] = useState([]);
  const [loading, setLoading] = useState(false);

  const getOrder = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setOrder([]);
        return;
      }

      const res = await axios.get(`${BACK_END_URL}/foodorder/userId`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrder(res.data);
    } catch (error) {
      console.log("Order is not found", error);
      setOrder([]);
    } finally {
      setLoading(false);
    }
  };

  const getAllFoodOrder = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BACK_END_URL}/foodorder`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAllFoodOrder(res.data);
    } catch (error) {
      console.log("All orders not found", error);
      setAllFoodOrder([]);
    } finally {
      setLoading(false);
    }
  };

  const createOrder = async (orderData) => {
    console.log("orderData", orderData);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }

      const response = await axios.post(
        `${BACK_END_URL}/foodorder`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Refresh orders
      await getOrder();
      await getAllFoodOrder();

      return response.data;
    } catch (error) {
      console.error("Create order error:", error);

      if (error.response?.status === 401) {
        console.error("Session expired. Please login again.");
      } else if (error.response?.data?.message) {
        console.error(error.response.data.message);
      } else {
        console.error("Failed to create order");
      }

      throw error;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getOrder();
      getAllFoodOrder();
    }
  }, []);

  return (
    <OrderContext.Provider
      value={{
        getOrder,
        createOrder,
        order,
        getAllFoodOrder,
        allFoodOrder,
        loading,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};
