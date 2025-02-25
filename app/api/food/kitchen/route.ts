import { NextRequest, NextResponse } from "next/server";
import {
  BreakLine,
  characterSet,
  PrinterTypes,
  ThermalPrinter,
} from "node-thermal-printer";
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

export async function POST(req: NextRequest) {
  const { items } = await req.json();

  if (items.length === 0) return;

  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0];
  const hour = today.getHours();
  const minutes = today.getMinutes();
  const seconds = today.getSeconds();

  try {
    printer.setTypeFontB();
    printer.bold(true);
    printer.alignCenter();

    printer.println("KITCHEN ORDER");
    printer.alignRight();
    printer.println(formattedDate);
    printer.println(
      `${hour}:${minutes < 9 ? "0" + minutes : minutes}:${seconds < 9 ? "0" + seconds : seconds}`,
    );
    printer.setTextNormal();
    printer.tableCustom([
      { text: "Food Item", align: "LEFT", bold: true },
      { text: "Quantity", align: "RIGHT", bold: true },
    ]);
    printer.newLine();
    {
      items.map((item: itemTypes) => {
        return (
          printer.tableCustom([
            { text: item.name, align: "LEFT", bold: true },
            {
              text: String(item.quantity ? item.quantity : "1"),
              align: "RIGHT",
              bold: true,
            },
          ]),
          printer.drawLine("-")
        );
      });
    }

    printer.newLine();
    printer.cut();

    const res = await printer.execute();

    if (res.toLowerCase().split(" ").join("") === "printdone") {
      return NextResponse.json({
        message: "SUCESS",
      });
    }
  } catch (error) {
    console.error("error", error);
    throw new Error("PRINTER EXCUTION PROBLEM");
  }
}
