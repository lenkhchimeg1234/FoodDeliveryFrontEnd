import { FoodCategoryProvider } from "../_provider/food-category";

export default function AdminPageLayout({ children }) {
  return (
    <div>
      <FoodCategoryProvider>{children}</FoodCategoryProvider>
    </div>
  );
}
