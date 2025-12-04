"use client";

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const FoodCategoryContext = createContext(null);

export const useFoodCategory = () => {
  const context = useContext(FoodCategoryContext);
  if (!context) {
    throw new Error(
      "useFoodCategory must be used inside a <FoodCategoryProvider>"
    );
  }
  return context;
};

export const FoodCategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCategory = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:247/foodcategory");
    //   console.log("res", res);
      setCategories(res.data);
    } catch (error) {
      console.error("Category is not found", error);
    } finally {
      setLoading(false);
    }
  };

  const createCategory = async (categoryName) => {
    try {
      const token = localStorage.getItem("token") || "";
      const res = await axios.post(
        "http://localhost:247/foodcategory",
        {
          categoryName: categoryName,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Category asses succesfully!");
      getCategory();

      //   setNewCategory("");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add category");
    }
  };

  const deleteCategory = async (id) => {
    const token = localStorage.getItem("token") || "";
    try {
      await axios.delete(`http://localhost:247/foodcategory/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.success("Category deleted successfully!");
      getCategory();
    } catch (error) {
      console.log("error", error);
      toast.error("Failed to delete category");
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <FoodCategoryContext.Provider
      value={{ categories, loading, deleteCategory, createCategory }}
    >
      {children}
    </FoodCategoryContext.Provider>
  );
};
