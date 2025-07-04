import { MenuLayout } from "@/app/_components/MenuLayout";
import { getBbqCourse } from "@/app/lib/actions";

export default async function Page() {
  const res = await getBbqCourse();
  return (
    <aside className="px-4 py-2">
      <div className="flex flex-col py-8">
        <div className="my-2 text-xl font-bold">
          <p>Grill & Tandoori</p>
        </div>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {res?.map((item: any) => (
            <MenuLayout item={item} key={item.id} />
          ))}
        </div>
      </div>
    </aside>
  );
}
