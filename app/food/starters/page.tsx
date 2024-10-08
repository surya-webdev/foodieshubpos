// "use client";

import { MenuLayout } from "@/app/_components/MenuLayout";
import { getStarter } from "@/app/lib/actions";
import { itemTypes } from "@/app/types";

export default async function Home() {
  const res = await getStarter();
  const vegData = res.filter((item: itemTypes) => item.type === "veg");
  const nonVegData = res.filter((item: itemTypes) => item.type === "nonveg");

  console.log(vegData);

  return (
    <aside className="py-2">
      <div className="flex flex-col">
        <div className="my-2 text-xl font-bold">
          <h2 className="text-xl font-bold">VEG</h2>
        </div>
        <div className="flex">
          {vegData?.map((item: itemTypes) => (
            <MenuLayout item={item} key={item.id} />
          ))}
        </div>
      </div>
      <div className="flex flex-col py-8">
        <div className="my-2 text-xl font-bold">
          <p>Non VEG</p>
        </div>
        <div className="flex gap-6">
          {nonVegData?.map((item: itemTypes) => (
            <MenuLayout item={item} key={item.id} />
          ))}
        </div>
      </div>
    </aside>
  );
}
