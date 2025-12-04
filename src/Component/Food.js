// "use client";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import axios from "axios";
// import { Plus } from "lucide-react";
// import { useEffect, useState } from "react";
// import { CategoryFoods } from "./CategoryFoods";
// import UploadPicture from "./UploadPicture";

// // import { Textarea } from "@/components/ui/textarea";
// import Image from "next/image";

// export function Food() {
//   const [category, setCategory] = useState([]);
//   const [food, setFood] = useState({
//     foodName: "",
//     price: "",
//     image: "",
//     ingredients: "",
//     category: "",
//   });

//   const handleFoodSubmit = async (id) => {
//     try {
//       const res = await axios.post(`http://localhost:247/food`, {
//         ...food,
//         category: id,
//       });
//       //   setFoodList((prev) => [...prev, res.data]);

//       setFood({
//         foodName: "",
//         price: "",
//         image: "",
//         ingredients: "",
//         category: "",
//       });
//     } catch (error) {
//       console.error("Food is not found", error);
//     }
//   };

//   const getCategory = async () => {
//     try {
//       const res = await axios.get("http://localhost:247/foodcategory");
//       console.log("res", res);
//       setCategory(res.data);
//     } catch (error) {
//       console.error("Category is not found", error);
//     }
//   };
//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     getCategory();
//   }, []);

//   return (
//     <div>
//       {category.map((item) => (
//         <div
//           key={item._id}
//           className="flex w-[1171px] p-5 flex-col items-start gap-4 rounded-xl bg-white"
//         >
//           <div className="text-xl font-semibold">{item.categoryName}</div>
//           <div className="flex gap-4">
//             <Dialog>
//               <form>
//                 <DialogTrigger asChild>
//                   {/* <Button variant="outline"> */}
//                   <div className="flex flex-col justify-center items-center gap-6 flex-1 self-stretch p-2 px-4 rounded-[20px] border border-dashed border-[#EF4444] w-[270px] h-[241px]">
//                     <div className="flex w-9 h-9 justify-center items-center gap-2 rounded-full bg-[#EF4444] text-white">
//                       <Plus />
//                     </div>
//                     <div className="text-[#18181B] text-center font-inter text-sm font-medium leading-5 flex flex-col">
//                       <p>Add new Dish to </p>
//                       {item.categoryName}
//                     </div>
//                   </div>
//                   {/* </Button> */}
//                 </DialogTrigger>
//                 <DialogContent className="sm:max-w-[425px]">
//                   <DialogHeader>
//                     <DialogTitle>
//                       Add new Dish to {item.categoryName}
//                     </DialogTitle>
//                   </DialogHeader>
//                   <div className="grid gap-4">
//                     <div className="flex gap-6">
//                       <div className="grid gap-3">
//                         <Label>Food name</Label>
//                         <Input
//                           value={food.foodName}
//                           placeholder="Type food name"
//                           onChange={(e) =>
//                             setFood({ ...food, foodName: e.target.value })
//                           }
//                         />
//                       </div>
//                       <div className="grid gap-3">
//                         <Label>Food price</Label>
//                         <Input
//                           value={food.price}
//                           placeholder="Enter price.."
//                           onChange={(e) =>
//                             setFood({ ...food, price: e.target.value })
//                           }
//                         />
//                       </div>
//                     </div>
//                     <div className="grid gap-3">
//                       <Label>Ingredients</Label>
//                       <Input
//                         value={food.ingredients}
//                         placeholder="List ingredients.."
//                         className="h-[90px] resize-none"
//                         onChange={(e) =>
//                           setFood({ ...food, ingredients: e.target.value })
//                         }
//                       />
//                     </div>

//                     <div className="grid gap-2">
//                       <Label>Food image</Label>

//                       {food.image ? (
//                         <div className="relative w-full h-[150px] rounded-xl overflow-hidden">
//                           <Image
//                             src={food.image}
//                             alt="Food preview"
//                             fill
//                             className="object-cover"
//                           />
//                           <button
//                             onClick={() => setFood({ ...food, image: "" })}
//                             className="absolute top-2 right-2 bg-white p-1 rounded-full shadow"
//                           >
//                             ✕
//                           </button>
//                         </div>
//                       ) : (
//                         <UploadPicture
//                           onUpload={(url) => setFood({ ...food, image: url })}
//                         />
//                       )}
//                     </div>
//                   </div>
//                   <DialogFooter>
//                     <Button
//                       onClick={() => handleFoodSubmit(item._id)}
//                       type="submit"
//                     >
//                       Add Dish
//                     </Button>
//                   </DialogFooter>
//                 </DialogContent>
//               </form>
//             </Dialog>
//             <CategoryFoods id={item._id} />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
"use client";
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
import { Label } from "@/components/ui/label";
import axios from "axios";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { CategoryFoods } from "./CategoryFoods";
import UploadPicture from "./UploadPicture";
import Image from "next/image";
import UpdateIcon from "@/app/Icons/UpdateIcon";

export function Food() {
  const [category, setCategory] = useState([]);
  const [food, setFood] = useState({
    foodName: "",
    price: "",
    image: "",
    ingredients: "",
    category: "",
  });

  const handleFoodSubmit = async (id) => {
    try {
      const res = await axios.post("http://localhost:247/food", {
        ...food,
        category: id,
      });
      // setFoodList((prev) => [...prev, res.data]);
      setFood({
        foodName: "",
        price: "",
        image: "",
        ingredients: "",
        category: "",
      });
    } catch (error) {
      console.error("Food is not found", error);
    }
  };
  const getCategory = async () => {
    try {
      const res = await axios.get("http://localhost:247/foodcategory");
      // console.log("res", res);
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
    <div>
      {category.map((item) => (
        <div
          key={item._id}
          className="flex w-[1171px] p-5 flex-col items-start gap-4 rounded-xl bg-white"
        >
          <div>{item.categoryName}</div>
          <div className="grid grid-cols-4 gap-4">
            <Dialog>
              <form>
                <DialogTrigger asChild>
                  {/* <Test item={item} /> */}

                  {/* hello */}
                  {/* <Button variant="outline"> */}
                  <div className="flex flex-col justify-center items-center gap-6 flex-1 self-stretch p-2 px-4 rounded-[20px] border border-dashed border-[#EF4444] w-[270px] h-[241px]">
                    <div className="flex w-9 h-9 justify-center items-center gap-2 rounded-full bg-[#EF4444] text-white">
                      <Plus />
                    </div>{" "}
                    <div className="text-[#18181B] text-center font-inter text-sm font-medium leading-5 flex flex-col">
                      Add new Dish to {item.categoryName}
                    </div>
                  </div>
                  {/* </Button> */}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>
                      Add new Dish to {item.categoryName}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <div className="flex gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="name-1">Food name</Label>
                        <Input
                          value={food.foodName}
                          placeholder="Type food name"
                          onChange={(e) =>
                            setFood({ ...food, foodName: e.target.value })
                          }
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="price-1">Food price</Label>
                        <Input
                          value={food.price}
                          placeholder="Enter price.."
                          onChange={(e) =>
                            setFood({ ...food, price: e.target.value })
                          }
                        />
                      </div>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="ingredients-1">Ingredients</Label>
                      <Input
                        value={food.ingredients}
                        placeholder="List ingredients.."
                        className="h-[90px] items-start justify-start"
                        onChange={(e) =>
                          setFood({ ...food, ingredients: e.target.value })
                        }
                      />
                    </div>
                    <div className="grid gap-2 relative ">
                      <Label>Food image</Label>

                      <UploadPicture
                        onUpload={(url) => setFood({ ...food, image: url })}
                        food={food}
                      />
                      <UpdateIcon />

                      {/* {console.log(food)} */}
                      {food.image && (
                        <button
                          onClick={() => setFood({ ...food, image: "" })}
                          className="absolute w-7 h-7 top-8 right-4 bg-white p-1 rounded-full shadow"
                        >
                          ✕
                        </button>
                      )}

                      {/* {food.image ? (
                        <div className="relative w-full h-[150px] rounded-xl overflow-hidden ">
                          <Image
                            src={food.image}
                            alt="Food preview"
                            fill
                            className="object-cover"
                          />
                          <button
                            onClick={() => setFood({ ...food, image: "" })}
                            className="absolute w-full h-[150px] top-2 right-2 bg-white p-1 rounded-full shadow"
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <UploadPicture
                          onUpload={(url) => setFood({ ...food, image: url })}
                        />
                      )} */}
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={() => handleFoodSubmit(item._id)}>
                      Add Dish
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
            <CategoryFoods id={item._id} category={category} />
          </div>
        </div>
      ))}
    </div>
  );
}

// const Test = ({ item }) => {
//   return (
//     <div className="flex flex-col justify-center items-center gap-6 flex-1 self-stretch p-2 px-4 rounded-[20px] border border-dashed border-[#EF4444] w-[270px] h-[241px]">
//       <div className="flex w-9 h-9 justify-center items-center gap-2 rounded-full bg-[#EF4444] text-white">
//         <Plus />
//       </div>{" "}
//       <div className="text-[#18181B] text-center font-inter text-sm font-medium leading-5 flex flex-col">
//         Add new Dish to {item.categoryName}
//       </div>
//     </div>
//   );
// };
