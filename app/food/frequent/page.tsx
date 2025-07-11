// @ts-nocheck
import { MenuLayout } from "@/app/_components/MenuLayout";
import { getFrequent } from "@/app/lib/actions";
import { itemMenu } from "@/app/types";

export default async function Page() {
  const res = await getFrequent();
  
  return (
    <aside className="px-4 py-2">
      <div className="flex flex-col py-8">
        <div className="my-2 text-xl font-bold">
          <p>Food</p>
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {res?.map((item: itemMenu) => (
            <MenuLayout item={item} key={item.id} />
          ))}
        </div>
      </div>
      
    </aside>
  );
}
