"use client";
import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp, Calendar } from "lucide-react";
import { useOrder } from "@/app/_provider/Order";
import { useFoodCategory } from "@/app/_provider/food-category";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function OrderPage() {
  const { allFoodOrder, loading } = useOrder();
  const { foods } = useFoodCategory();
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [expandedRows, setExpandedRows] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  const toggleSelectAll = () => {
    if (selectedOrders.length === allFoodOrder.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(allFoodOrder.map((o) => o._id));
    }
  };

  const toggleSelect = (id) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleExpand = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getStatusColor = (status) => {
    const statusLower = status?.toLowerCase() || "";
    if (statusLower === "pending") return "bg-white text-black border-red-500";
    if (statusLower === "delivered") return " border-green-300";
    if (statusLower === "cancelled") return " border-gray-300";
    return "bg-gray-100 text-gray-700 border-gray-300";
  };

  const totalPages = Math.ceil(allFoodOrder.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = allFoodOrder.slice(startIndex, startIndex + itemsPerPage);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Loading orders...</p>
        </div>
      </div>
    );
  }
  console.log("allFoodOrder", allFoodOrder);
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="p-8">
        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b border-gray-200 p-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold">Orders</h2>
                <p className="text-sm text-gray-500">
                  {allFoodOrder.length} items
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg">
                  <Calendar className="w-4 h-4 text-gray-500" />
                </div>
                <Button>Change delivery state</Button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={
                        selectedOrders.length === allFoodOrder.length &&
                        allFoodOrder.length > 0
                      }
                      onChange={toggleSelectAll}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    №
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Costumer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Food
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Date
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Total
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Delivery Address
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase">
                    Delivery state
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentData.length === 0 ? (
                  <tr>
                    <td
                      colSpan="8"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No orders found
                    </td>
                  </tr>
                ) : (
                  currentData.map((order, index) => (
                    <React.Fragment key={order._id}>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedOrders.includes(order._id)}
                            onChange={() => toggleSelect(order._id)}
                            className="w-4 h-4 rounded border-gray-300"
                          />
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {startIndex + index + 1}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700 font-mono">
                          {order.user?.email}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => toggleExpand(order._id)}
                            className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900"
                          >
                            <span>
                              {order.foodOrderItems?.length || 0} foods
                            </span>
                            {expandedRows[order._id] ? (
                              <ChevronUp className="w-4 h-4" />
                            ) : (
                              <ChevronDown className="w-4 h-4" />
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-700">
                          {new Date(
                            order.orderDate || order.createdAt
                          ).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm font-medium">
                          ₮{order.totalPrice || order.totalAmount}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                          {order.address || "N/A"}
                        </td>
                        <td className="px-6 py-4">
                          <div
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              order.status
                            )}`}
                          >
                            {order.status}
                            <ChevronDown className="w-3 h-3" />
                          </div>
                        </td>
                      </tr>
                      {expandedRows[order._id] && (
                        <tr className="bg-gray-50">
                          <td colSpan="8" className="px-6 py-4">
                            <div className="space-y-2">
                              {(order.foodOrderItems || []).map((item) => {
                                const currentFood = foods.find(
                                  (index) => index._id === item?._id
                                );
                                console.log("foodfofoofod", foods);
                                return (
                                  <div
                                    key={item._id}
                                    className="flex items-center gap-3 bg-white px-4 py-2 rounded-lg"
                                  >
                                    <Image
                                      src={
                                        currentFood.image ||
                                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx2qcKAz_hqMRda9TnCrnA1uZEmbAc6vLVQA&s"
                                      }
                                      alt="image"
                                      width={32}
                                      height={32}
                                      className="object-cover rounded-sm "
                                    />

                                    <span className="text-sm text-gray-700">
                                      {currentFood?.foodName}
                                    </span>
                                    <span className="text-sm text-gray-500 ml-auto">
                                      x {item.quantity}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="border-t border-gray-200 px-6 py-4">
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50"
                >
                  ‹
                </button>
                {[...Array(Math.min(totalPages, 5))].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded ${
                      currentPage === i + 1
                        ? "bg-black text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                {totalPages > 5 && <span className="px-2">...</span>}
                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded disabled:opacity-50"
                >
                  ›
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
