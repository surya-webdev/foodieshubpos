// "use client";

import { MenuLayout } from "@/app/_components/MenuLayout";
import { getMainCourse } from "@/app/lib/actions";
import { itemTypes } from "@/app/types";

export default async function Page() {
  const res = await getMainCourse();
<<<<<<< HEAD
  // (res);
=======
>>>>>>> 63a4e79ad9d02a8bd5d541f5eb417cac5bc1e12f

  const vegData = res?.filter((item) => item?.type === "veg");
  // @ts-ignore
  const nonVegData = res?.filter(
    // @ts-ignore
    (item) => item?.type.toLowerCase() === "nonveg",
  );

  return (
    <aside className="px-4 py-2">
      <div className="flex flex-col">
        <div className="my-2 text-xl font-bold">
          <h2 className="text-xl font-bold">VEG</h2>
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {vegData?.map((item: any) => (
            <MenuLayout item={item} key={item.id} />
          ))}
        </div>
      </div>
      <div className="flex flex-col py-8">
        <div className="my-2 text-xl font-bold">
          <p>Non VEG</p>
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {nonVegData?.map((item: any) => (
            <MenuLayout item={item} key={item.id} />
          ))}
        </div>
      </div>
    </aside>
  );
}
