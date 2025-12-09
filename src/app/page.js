import { UserFooter } from "@/app/HomePage/UserFooter";
import { UserHeader } from "@/app/HomePage/UserHeader";
import { UserBody } from "./HomePage/UserBody";

export default function Home() {
  return (
    <div className="flex flex-col gap-[88px] items-center justify-center bg-neutral-700">
      <UserHeader />
      <UserBody />
      <UserFooter />
    </div>
  );
}
