import { NextRequest, NextResponse } from "next/server";
import { PrinterTypes, ThermalPrinter } from "node-thermal-printer";

const printer = new ThermalPrinter({
  type: PrinterTypes.EPSON,
  interface: "//localhost/POS-80-Series1",
  options: {
    timeout: 1000,
  },
});

// try {
//   let execute = printer.execute();
//   console.log("Print done!");
// } catch (error) {
//   console.error("Print failed:", error);
// }

export async function GET(req: NextRequest) {
  try {
    printer.tableCustom([
      // Prints table with custom settings (text, align, width, cols, bold)
      { text: "Left", align: "LEFT", width: 0.5 },
      { text: "Center", align: "CENTER", width: 0.25, bold: true },
      { text: "Right", align: "RIGHT", cols: 8 },
    ]);

    // printer.leftRight(`${left}`, `${right}`);
    // printer.alignCenter();
    printer.println("HEY wassup????????????????????????????????????//");
    printer.cut();

    await printer.execute();

    return NextResponse.json({
      message: "SUCESS",
    });
  } catch (error) {
    console.error("error message", error);
    return NextResponse.json({ error: "error" });
  }
}

export async function POST(req: NextRequest) {
  async function printItems(item: any) {
    item?.map((item) => {
      printer.println(item?.name);
      printer.println(item?.price);
    });
    // await printer.execute();
    // printer.print()
  }

  const item = await req.json();
  try {
    printItems(item?.items);
    printer.println(item?.totalPrice);
    printer.cut();
    await printer.execute();
    return NextResponse.json({ item });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "error" });
  }
}
