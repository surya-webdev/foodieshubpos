import { NextRequest, NextResponse } from "next/server";
import { PrinterTypes, ThermalPrinter } from "node-thermal-printer";
import { itemTypes } from "@/app/types";

const printer = new ThermalPrinter({
  type: PrinterTypes.EPSON,
  width: 48,
  // margin: "0 0 0 0",
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
    // printer.tableCustom([
    //   // Prints table with custom settings (text, align, width, cols, bold)
    //   { text: "Left", align: "LEFT", width: 0.5 },
    //   { text: "Center", align: "CENTER", width: 0.25, bold: true },
    //   { text: "Right", align: "RIGHT", cols: 8 },
    // ]);

    const item = [
      {
        id: 1,
        name: "chilli",
        quantity: 2,
        price: "200",
      },

      {
        id: 2,
        name: "Gobi",
        quantity: 2,
        price: "100",
      },
      {
        id: 3,
        name: "idly",
        quantity: 2,
        price: "200",
      },
      {
        id: 4,
        name: "briyani",
        quantity: 2,
        price: "200",
      },
    ];

    // printer.setTextSize(1, 1);
    printer.tableCustom([
      // Prints table with custom settings (text, align, width, cols, bold)
      { text: "Food", align: "LEFT" },
      { text: "Quantity", align: "CENTER", bold: true },
      { text: "Price", align: "RIGHT" },
    ]);

    {
      item.map((item) =>
        printer.tableCustom([
          { text: item.name, align: "LEFT", bold: true },
          { text: String(item.quantity), align: "CENTER", bold: true },
          { text: item.price, align: "RIGHT" },
        ]),
      );
    }

    printer.alignRight();
    printer.println("toatl");
    // printer.println("111111");

    printer.partialCut();
    await printer.execute();

    return NextResponse.json({
      message: "SUCESS",
    });

    // }
  } catch (error) {
    console.error("error message", error);
    return NextResponse.json({ error: error });
  }
}

export async function POST(req: NextRequest) {
  const { items, totalPrice } = await req.json();
  console.log(items);
  if (items.length === 0 && !totalPrice) return;

  try {
    // prin ter.
    // printer.setTextSize(1, 1);
    printer.alignRight();
    printer.println("Oct 26 2024");
    printer.println("08:30pm");

    // printer.setTextSize(2, 2);
    // printer.buffer.write([0x1b, 0x21, 0x01]); // Standard font size
    printer.getWidth();
    printer.setTextDoubleWidth();
    printer.setTextDoubleHeight();
    printer.setTextQuadArea();
    printer.alignCenter();
    printer.bold(true);
    printer.println("FOODIE's Hub");

    // printer.setTextSize(1, 1);
    printer.setTextNormal();
    printer.tableCustom([
      // Prints table with custom settings (text, align, width, cols, bold)
      { text: "Food", align: "LEFT" },
      { text: "Quantity", align: "CENTER", bold: true },
      { text: "Price", align: "RIGHT" },
    ]);
    // printer.print("       ");
    {
      items.map((item: () => void) =>
        printer.tableCustom([
          { text: item.name, align: "LEFT", bold: true },
          // { text: " space", align: "LEFT" },
          {
            text: String(item?.quantity ? item.quantity : "1"),
            align: "CENTER",
            bold: true,
          },
          // { text: " space", align: "CENTER" },
          { text: item?.price, align: "RIGHT" },
          // { text: " space", align: "RIGHT" },
        ]),
      );
    }
    printer.setTextDoubleWidth();
    printer.setTextDoubleHeight();

    printer.setTextQuadArea();
    printer.alignRight();
    printer.println("total");
    printer.println(totalPrice);

    printer.setTextDoubleWidth();
    printer.setTextDoubleHeight();
    printer.alignCenter();
    printer.printQR("https://maps.app.goo.gl/wfUG7B2J2bXvW4KL6");

    printer.partialCut();
    // printer.getBuffer();
    // printer.clear();
    await printer.execute();

    return NextResponse.json({
      message: "SUCESS",
    });
  } catch (error) {
    console.error("error", error);
    throw new Error("PRINTER EXCUTION PROBLEM");
  }

  // //////////////////////////////////////////
  // async function printItems(item: any) {
  //   item?.map((item) => {
  //     printer.println(item?.name);
  //     printer.println(item?.price);
  //   });
  // }
  // const item = await req.json();
  // try {
  //   printItems(item?.items);
  //   printer.println(item?.totalPrice);
  //   printer.cut();
  //   await printer.execute();
  //   return NextResponse.json({ item });
  // } catch (error) {
  //   console.error(error);
  //   return NextResponse.json({ message: "error" });
  // }
}
