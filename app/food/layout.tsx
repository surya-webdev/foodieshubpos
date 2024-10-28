import { Billing } from "../_components/Billing";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <section className="grid h-screen grid-cols-[2.5fr_1fr]">
        <div className="flex flex-col">{children}</div>
        <div className="h-screen min-h-[100dvh] bg-slate-100 px-4 py-10">
          <Billing />
        </div>
      </section>
    </>
  );
}
