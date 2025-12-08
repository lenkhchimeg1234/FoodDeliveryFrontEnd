import DarkNomNomIcon from "@/app/Icons/DarkNomNomIcon";

export function UserFooter() {
  return (
    <div lassName="flex w-[1440px] h-[755px] px-[88px] py-3 gap-[88px] bg-(--background-bg-primary,#18181B)">
      <div className="flex w-[1440px] px-[98px] py-7 items-center gap-[34px] bg-[#EF4444]">
        <h2 className="text-[#FAFAFA] font-inter text-[30px] font-semibold leading-9 tracking-[-0.75px]">
          Flash fast delivered
        </h2>
      </div>
      <div>
        <div className="flex gap-3">
          <DarkNomNomIcon />
          <div className="flex flex-col">
            <div className="font-inter text-[20px] font-semibold leading-7 tracking-[-0.5px] flex">
              <div className=" text-(--text-text-primary-foreground,#FAFAFA) ">
                Nom
              </div>
              <div className="  text-(--Tailwind-red---Text-color-500,#EF4444)">
                Nom
              </div>
            </div>

            <div className=" text-(--text-text-secondary,#F4F4F5) text-center  font-inter text-[12px] font-normal  leading-4">
              Swift delivery
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
