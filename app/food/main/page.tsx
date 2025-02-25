// "use client";

import { MenuLayout } from "@/app/_components/MenuLayout";
import { getMainCourse } from "@/app/lib/actions";
import { itemTypes } from "@/app/types";

export default async function Page() {
  const res = await getMainCourse();
  // (res);

  const vegData = res?.filter((item: itemTypes) => item.type === "veg");
  const nonVegData = res?.filter(
    (item: itemTypes) => item.type.toLowerCase() === "nonveg",
  );

  return (
    <aside className="px-4 py-2">
      <div className="flex flex-col">
        <div className="my-2 text-xl font-bold">
          <h2 className="text-xl font-bold">VEG</h2>
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {vegData?.map((item: itemTypes) => (
            <MenuLayout item={item} key={item.id} />
          ))}
        </div>
      </div>
      <div className="flex flex-col py-8">
        <div className="my-2 text-xl font-bold">
          <p>Non VEG</p>
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {nonVegData?.map((item: itemTypes) => (
            <MenuLayout item={item} key={item.id} />
          ))}
        </div>
      </div>
    </aside>
  );
}
