import { Billing } from "../_components/Billing";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="grid h-screen grid-cols-[2.5fr_1.5fr]">
        <div className="flex flex-col">{children}</div>
        <Billing />
      </section>
    </>
  );
}
