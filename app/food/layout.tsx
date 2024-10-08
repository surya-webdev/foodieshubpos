// import { Billing } from "../_components/Billing";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="grid grid-cols-[2.5fr_1.5fr] grid-rows-[auto_1fr]">
        <>{children}</>
        <div className="h-screen bg-slate-400">{/* <Billing /> */}</div>
      </section>
    </>
  );
}
