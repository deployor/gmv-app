import { getServerAuthSession } from "@/lib/auth";

import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore – bwip-js has no official TS types
import bwipjs from "bwip-js";

// A4 dimensions in points (1 pt = 1/72 inch)
const A4_WIDTH = 595.28;
const A4_HEIGHT = 841.89;

export async function GET() {
  const session = await getServerAuthSession();

  if (!session || !session.user || !session.user.studentId) {
    return new Response("Unauthorized", { status: 401 });
  }

  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([A4_WIDTH, A4_HEIGHT]);

  const { width, height } = page.getSize();

  // Card dimensions (credit-card size) in points
  const cardWidth = 243; // ≈ 85.6 mm
  const cardHeight = 153; // ≈ 54 mm

  // Center card on page
  const cardX = (width - cardWidth) / 2;
  const cardY = height - cardHeight - 100; // 100pt top margin

  // Draw cut-out rectangle (dashed outline)
  page.drawRectangle({
    x: cardX,
    y: cardY,
    width: cardWidth,
    height: cardHeight,
    borderColor: rgb(0.5, 0.5, 0.5),
    borderWidth: 1,
  });

  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Header – School name & card title
  page.drawText("Eduze Academy", {
    x: cardX + 16,
    y: cardY + cardHeight - 22,
    size: 14,
    font: fontBold,
    color: rgb(0, 0, 0),
  });

  page.drawText("Temporary Student ID", {
    x: cardX + 16,
    y: cardY + cardHeight - 40,
    size: 12,
    font: fontRegular,
    color: rgb(0.2, 0.2, 0.2),
  });

  // Small "TEMPORARY" label in the corner
  page.drawText("TEMPORARY", {
    x: cardX + cardWidth - 60,
    y: cardY + cardHeight - 20,
    size: 8,
    font: fontBold,
    color: rgb(0.9, 0, 0),
  });

  // Personal details with consistent spacing
  const nameY = cardY + cardHeight - 60;
  const lineGap = 15;

  page.drawText(`Name: ${session.user.name ?? ""}`, {
    x: cardX + 16,
    y: nameY,
    size: 12,
    font: fontRegular,
  });

  page.drawText(`Email: ${session.user.email ?? ""}`, {
    x: cardX + 16,
    y: nameY - lineGap,
    size: 12,
    font: fontRegular,
  });

  page.drawText(`ID #: ${session.user.studentId}`, {
    x: cardX + 16,
    y: nameY - lineGap * 2,
    size: 12,
    font: fontRegular,
  });

  if (session.user.grade) {
    page.drawText(`Grade: ${session.user.grade}`, {
      x: cardX + 16,
      y: nameY - lineGap * 3,
      size: 12,
      font: fontRegular,
    });
  }

  // Embed profile photo if available
  if (session.user.image) {
    try {
      const imgRes = await fetch(session.user.image);
      if (imgRes.ok) {
        const arrayBuffer = await imgRes.arrayBuffer();
        const bytes = new Uint8Array(arrayBuffer);
        const contentType = imgRes.headers.get("content-type") || "";
        let photo;
        if (contentType.includes("png")) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          photo = await pdfDoc.embedPng(bytes);
        } else if (contentType.includes("jpg") || contentType.includes("jpeg")) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          photo = await pdfDoc.embedJpg(bytes);
        }
        if (photo) {
          const photoWidth = 50;
          const photoHeight = 50;
          const photoX = cardX + cardWidth - photoWidth - 16;
          const photoY = nameY - lineGap * 2; // align roughly with ID line
          page.drawImage(photo, {
            x: photoX,
            y: photoY,
            width: photoWidth,
            height: photoHeight,
          });
        }
      }
    } catch {
      // Ignore failures fetching avatar
    }
  }

  // Generate barcode image with bwip-js
  const barcodePng = await bwipjs.toBuffer({
    bcid: "code128",
    text: session.user.studentId,
    scale: 3,
    height: 10,
    includetext: false,
    backgroundcolor: "FFFFFF",
  });

  const barcodeImage = await pdfDoc.embedPng(barcodePng);
  const scaled = barcodeImage.scale(0.6);

  page.drawImage(barcodeImage, {
    x: cardX + (cardWidth - scaled.width) / 2,
    y: cardY + 20,
    width: scaled.width,
    height: scaled.height,
  });

  // Footer note
  page.drawText(
    "TEMPORARY — Valid for 30 days • Replace with official ID as soon as possible.",
    {
      x: 40,
      y: 40,
      size: 10,
      font: fontRegular,
      color: rgb(0, 0, 0),
    }
  );

  const pdfBytes = await pdfDoc.save();

  return new Response(pdfBytes, {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=temporary-id.pdf",
    },
  });
} 