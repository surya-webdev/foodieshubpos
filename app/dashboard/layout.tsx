import { Sale } from "../_components/Sale";
import { SideNavigation } from "../_components/SideNavigation";
import { SaleContext } from "../lib/SaleContext";


export const revalidate = 0;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SaleContext>
    <div className="grid grid-cols-[16rem_1fr]">
      <div>
        <SideNavigation></SideNavigation>
      </div>
      <div className="flex flex-col gap-10 p-10">
        <Sale></Sale>
        {children}
      </div>
    </div>
    </SaleContext>
  );
}
