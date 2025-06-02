import { Billing } from "../_components/Billing";
import { SideNavigation } from "../_components/SideNavigation";


// export const revalidate = 0;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="grid h-screen grid-cols-[16rem_1fr] grid-rows-[auto_1fr] gap-4">
        <div></div>
        <SideNavigation />
        <section className="grid h-screen grid-cols-[2.5fr_1.5fr]">
          <div className="flex flex-col w-full h-screen overflow-y-scroll">{children}</div>
          <Billing />
        </section>
      </section>
    </>
  );
}
