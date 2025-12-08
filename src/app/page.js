import { UserBody } from "@/Component/UserBody";
import { UserFooter } from "@/Component/UserFooter";
import { UserHeader } from "@/Component/UserHeader";

export default function Home() {
  return (
    <div className="flex flex-col gap-[88px] items-center justify-center bg-neutral-700">
      <UserHeader />
      <UserBody />
      <UserFooter />
    </div>
  );
}
