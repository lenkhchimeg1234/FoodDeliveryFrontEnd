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
  const [foodList, setFoodList] = useState([]);

  const getCategory = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://fooddeliverybackend-cgbs.onrender.com/foodcategory");

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
      await axios.post(
        "https://fooddeliverybackend-cgbs.onrender.com/foodcategory",
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
    } catch (error) {
      console.error(error);
      toast.error("Failed to add category");
    }
  };

  const deleteCategory = async (id) => {
    const token = localStorage.getItem("token") || "";
    try {
      await axios.delete(`https://fooddeliverybackend-cgbs.onrender.com/foodcategory/${id}`, {
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

  const getFood = async (id) => {
    // setLoading(true);
    try {
      const res = await axios.get(`https://fooddeliverybackend-cgbs.onrender.com/food/${id}`);

      setFoodList((prev) => {
        const exists = prev.some((item) => item.id === id);

        // If exists → update
        if (exists) {
          return prev.map((item) =>
            item.id === id ? { ...item, data: res.data } : item
          );
        }

        // If not exists → add new
        return [...prev, { id, data: res.data }];
      });
    } catch (error) {
      console.error("Food is not found", error);
    } finally {
      //   setLoading(false);
    }
  };

  const createFood = async (id, food) => {
    try {
      const token = localStorage.getItem("token") || "";
      const res = await axios.post(
        "https://fooddeliverybackend-cgbs.onrender.com/food",
        {
          ...food,
          category: id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      getFood(id);
    } catch (error) {
      console.error("Food is not found", error);
    }
  };

  const deleteFood = async (id) => {
    try {
      const token = localStorage.getItem("token") || "";
      await axios.delete(`https://fooddeliverybackend-cgbs.onrender.com/food/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Food deleted successfully!");
      getFood(id);
    } catch (error) {
      console.log("Error to delete foods", error);
    }
  };

  const updateFood = async (id, foodUpdate) => {
    console.log(id, foodUpdate);
    // setOpen(true);
    try {
      const token = localStorage.getItem("token") || "";
      await axios.put(
        `https://fooddeliverybackend-cgbs.onrender.com/food/${id}`,
        {
          foodName: foodUpdate.foodName,
          price: foodUpdate.price,
          image: foodUpdate.image,
          ingredients: foodUpdate.ingredients,
          category: foodUpdate.category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await getFood(foodUpdate.category);
    } catch (error) {
      console.error("Update is not found", error);
    } finally {
      //   setOpen(false);
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <FoodCategoryContext.Provider
      value={{
        categories,
        loading,
        deleteCategory,
        createCategory,
        foodList,
        getFood,
        createFood,
        deleteFood,
        updateFood,
        getCategory,
      }}
    >
      {children}
    </FoodCategoryContext.Provider>
  );
};
