import { NextRequest, NextResponse } from "next/server";
import {
  BreakLine,
  characterSet,
  PrinterTypes,
  ThermalPrinter,
} from "node-thermal-printer";
import prisma from "@/app/lib/db";
import { itemTypes } from "@/app/types";

const printer = new ThermalPrinter({
  type: PrinterTypes.EPSON,
  width: 48,
  characterSet: characterSet.PC850_MULTILINGUAL,
  removeSpecialCharacters: false,
  interface: "//localhost/POS-80-Series1",
  lineCharacter: "2", // Set character for lines - default: "-"
  breakLine: BreakLine.WORD, // Break line after WORD or CHARACTERS. Disabled with NONE - default: WORD
  options: {
    timeout: 15000,
  },
});

const rupees = "Rs.";

export async function POST(req: NextRequest) {
  const { items, totalPrice } = await req.json();

  if (items.length === 0 || !totalPrice) return;
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const hour = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();
  try {
    printer.setTypeFontB();
    printer.alignRight();
    printer.println(formattedDate);
    printer.println(
      `${hour}:${minutes < 9 ? "0" + minutes : minutes}:${seconds < 9 ? "0" + seconds : seconds}`,
    );
    printer.newLine();
    printer.newLine();
    //
    printer.getWidth();
    printer.setTextDoubleWidth();
    printer.setTextDoubleHeight();
    printer.setTextQuadArea();
    printer.alignCenter();
    printer.bold(true);
    printer.println("FOODIE's Hub");
    // Draws a line
    printer.newLine();
    printer.newLine();

    printer.setTextNormal();
    printer.tableCustom([
      { text: "Food", align: "LEFT" },
      { text: "Quantity", align: "CENTER", bold: true },
      { text: "Price", align: "RIGHT" },
    ]);
    printer.newLine();

    {
      items.map((item: itemTypes) => {
        return (
          printer.tableCustom([
            { text: item.name, align: "LEFT", bold: true },
            // { text: " space", align: "LEFT" },
            {
              text: String(item.quantity ? item.quantity : "1"),
              align: "CENTER",
              bold: true,
            },
            {
              text: String(`${rupees}${item.price}`),
              align: "RIGHT",
            },
          ]),
          printer.newLine()
        );
      });
    }
    printer.underline(true);
    printer.drawLine("-");
    printer.setTextDoubleWidth();
    printer.setTextDoubleHeight();

    printer.setTextQuadArea();
    printer.alignRight();
    printer.bold(true);
    printer.println("TOTAL");
    printer.newLine();
    printer.println(`${rupees}${totalPrice}`);
    printer.newLine();

    printer.setTextDoubleWidth();
    printer.setTextDoubleHeight();
    printer.alignCenter();
    printer.bold(true);
    printer.println("Thanks For Coming.");
    printer.println("Please Visit Again!");
    printer.newLine();
    printer.printQR("https://maps.app.goo.gl/wfUG7B2J2bXvW4KL6");
    printer.partialCut();

    await prisma.dashboard.create({
      data: {
        sale: totalPrice,
      },
    });

    const res = await printer.execute();

    if (res.toLowerCase().split(" ").join("") === "printdone") {
      return NextResponse.json({
        message: "success",
      });
    }
  } catch (error) {
    console.error("error", error);
    return NextResponse.json({
      message: "failed",
      error: "PRINTER EXCUTION PROBLEM",
    });
  }
}


