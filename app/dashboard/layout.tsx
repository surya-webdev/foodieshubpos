import { Sale } from "../_components/Sale";
import { SideNavigation } from "../_components/SideNavigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[16rem_1fr]">
      <div>
        <SideNavigation></SideNavigation>
      </div>
      <div>
        <Sale></Sale>
        {children}
      </div>
    </div>
  );
}
