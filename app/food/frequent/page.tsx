// @ts-nocheck
import { MenuLayout } from "@/app/_components/MenuLayout";
import { getFrequent } from "@/app/lib/actions";
import { itemMenu } from "@/app/types";

export default async function Page() {
  const res = await getFrequent();

  const vegData = res?.filter((item: any) => item.type === "veg");
    const nonVegData = res?.filter(
      (item: any) => item.type.toLowerCase() === "nonveg",
    ).reverse();
  return (
    <aside className="px-4 py-2">
      <div className="flex flex-col py-8">
        <div className="my-4 text-xl font-bold">
          <p>Frequent Food Items <span className="text-[#de432f]">(Non-Veg)</span></p>
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {nonVegData?.map((item: itemMenu) => (
            <MenuLayout item={item} key={item.id} />
          ))}
        </div>
      </div>

        <div className="flex flex-col py-8">
        <div className="my-4 text-xl font-bold">
          <p className="text-green-600"> <span>Veg</span></p>
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {vegData?.map((item: itemMenu) => (
            <MenuLayout item={item} key={item.id} />
          ))}
        </div>
      </div>
      
    </aside>
  );
}
