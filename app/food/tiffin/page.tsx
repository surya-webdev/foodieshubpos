// "use client";
// @ts-nocheck

import { MenuLayout } from "@/app/_components/MenuLayout";
import { getStarter, getTiffin } from "@/app/lib/actions";
import { itemTypes } from "@/app/types";

export default async function Page() {
  const res = await getTiffin();

  // (res);
  const vegData = res?.filter((item: itemTypes) => item.typedish === "veg");
  const nonVegData = res?.filter(
    (item: itemTypes) => item.typedish.toLowerCase() === "dosa",
  );
  const eggs = res?.filter(
    (item: itemTypes) => item.typedish.toLowerCase() === "egg",
  );

  return (
    <aside className="px-4 py-2">
      <div className="flex flex-col">
        <div className="my-2 text-xl font-bold">
          <h2 className="text-xl font-bold">Tiifin</h2>
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {vegData?.map((item: itemTypes) => (
            <MenuLayout item={item} key={item.id} />
          ))}
        </div>
      </div>
      <div className="flex flex-col py-8">
        <div className="my-2 text-xl font-bold">
          <p>Dosa</p>
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {nonVegData?.map((item: itemTypes) => (
            <MenuLayout item={item} key={item.id} />
          ))}
        </div>
      </div>
      <div className="flex flex-col py-8">
        <div className="my-2 text-xl font-bold">
          <p>Eggs</p>
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {eggs?.map((item: itemTypes) => (
            <MenuLayout item={item} key={item.id} />
          ))}
        </div>
      </div>
    </aside>
  );
}
