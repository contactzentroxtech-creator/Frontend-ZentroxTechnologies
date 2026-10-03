import jsPDF from "jspdf";

interface PDFData {
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  service: string;
  serviceId: string;
  fieldDetails: { label: string; value: string }[];
  addOns: { label: string; price: number }[];
  timeline: string;
  estimate: {
    base: number;
    addOns: number;
    subtotal: number;
    discount: number;
    adSpend: number;
    final: number;
    totalWithAdSpend: number;
    low: number;
    high: number;
  };
  referralApplied: boolean;
  referralCode: string;
  referralDiscount: number;
}

/* ═══════════════════════════════════════════════════════════════
   Format price — "Rs." use karo (₹ symbol jsPDF mein render nahi hota)
═══════════════════════════════════════════════════════════════ */
function formatPrice(n: number): string {
  return "Rs. " + Math.round(n).toLocaleString("en-IN");
}

export async function generatePDF(data: PDFData): Promise<void> {
  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 15;
  const contentWidth = pageWidth - margin * 2;

  const quoteId = `ZT-${Date.now().toString().slice(-8)}`;
  const date = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  let y = 0;

  /* ═══════════════════════════════════════════════════════════════
     HEADER — DARK NAVY BAR
  ═══════════════════════════════════════════════════════════════ */
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 42, "F");

  try {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/Zentrox-Logo1.png";

    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject();
      setTimeout(() => reject(), 2000);
    });

    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin, 8, 26, 26, 3, 3, "F");
    doc.addImage(img, "PNG", margin + 2, 10, 22, 22);
  } catch {
    doc.setFillColor(255, 255, 255);
    doc.roundedRect(margin, 8, 26, 26, 3, 3, "F");
    doc.setTextColor(37, 99, 235);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Z", margin + 13, 26, { align: "center" });
  }

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("ZENTROX TECHNOLOGIES", margin + 32, 18);

  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(203, 213, 225);
  doc.text("Software & Digital Growth Partner", margin + 32, 24);
  doc.text(
    "Mohali & Chandigarh, Punjab, India  |  contact.zentroxtech@gmail.com",
    margin + 32,
    29
  );
  doc.text("+91 89881 83513  |  +91 94592 85513", margin + 32, 34);

  y = 55;

  /* ═══════════════════════════════════════════════════════════════
     TITLE
  ═══════════════════════════════════════════════════════════════ */
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Project Estimate & Quote", pageWidth / 2, y, { align: "center" });

  y += 6;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  doc.text(`Quote ID: ${quoteId}    |    Date: ${date}`, pageWidth / 2, y, {
    align: "center",
  });

  y += 12;

  /* ═══════════════════════════════════════════════════════════════
     CLIENT DETAILS BOX
  ═══════════════════════════════════════════════════════════════ */
  const clientBoxHeight = 32;
  doc.setFillColor(248, 250, 252);
  doc.roundedRect(margin, y, contentWidth, clientBoxHeight, 3, 3, "F");

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(37, 99, 235);
  doc.text("CLIENT DETAILS", margin + 5, y + 7);

  y += 12;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 65, 85);

  const col1X = margin + 5;
  const col2X = margin + contentWidth / 2 + 5;

  doc.text(`Name:`, col1X, y);
  doc.setFont("helvetica", "bold");
  doc.text(data.clientName || "N/A", col1X + 14, y);

  doc.setFont("helvetica", "normal");
  doc.text(`Email:`, col2X, y);
  doc.setFont("helvetica", "bold");
  doc.text(data.clientEmail || "N/A", col2X + 14, y);

  y += 6;
  doc.setFont("helvetica", "normal");
  doc.text(`Phone:`, col1X, y);
  doc.setFont("helvetica", "bold");
  doc.text(data.clientPhone || "N/A", col1X + 14, y);

  doc.setFont("helvetica", "normal");
  doc.text(`Service:`, col2X, y);
  doc.setFont("helvetica", "bold");
  doc.text(data.service, col2X + 17, y);

  y += 6;
  doc.setFont("helvetica", "normal");
  doc.text(`Date:`, col1X, y);
  doc.setFont("helvetica", "bold");
  doc.text(date, col1X + 14, y);

  y += 14;

  /* ═══════════════════════════════════════════════════════════════
     PROJECT REQUIREMENTS
  ═══════════════════════════════════════════════════════════════ */
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(37, 99, 235);
  doc.text("PROJECT REQUIREMENTS", margin, y);
  y += 2;

  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.2);
  doc.line(margin, y, pageWidth - margin, y);
  y += 6;

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 65, 85);

  data.fieldDetails.forEach((field) => {
    doc.setFont("helvetica", "normal");
    doc.text(`${field.label}:`, margin + 3, y);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text(field.value, margin + 60, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(51, 65, 85);
    y += 6;
  });

  doc.setFont("helvetica", "normal");
  doc.text("Timeline:", margin + 3, y);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  const timelineText =
    data.timeline === "flexible"
      ? "Flexible"
      : data.timeline === "fast"
      ? "Fast-Track"
      : data.timeline === "urgent"
      ? "Urgent (ASAP)"
      : "Standard";
  doc.text(timelineText, margin + 60, y);
  y += 12;

  /* ═══════════════════════════════════════════════════════════════
     ADD-ONS
  ═══════════════════════════════════════════════════════════════ */
  if (data.addOns.length > 0) {
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(37, 99, 235);
    doc.text("ADD-ONS", margin, y);
    y += 2;

    doc.setDrawColor(226, 232, 240);
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(51, 65, 85);

    data.addOns.forEach((addon) => {
      doc.text(`• ${addon.label}`, margin + 3, y);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(15, 23, 42);
      doc.text(formatPrice(addon.price), pageWidth - margin - 3, y, {
        align: "right",
      });
      doc.setFont("helvetica", "normal");
      doc.setTextColor(51, 65, 85);
      y += 6;
    });

    y += 6;
  }

  /* ═══════════════════════════════════════════════════════════════
     PRICE BREAKDOWN BOX
  ═══════════════════════════════════════════════════════════════ */
  const priceBoxHeight = 58;
  doc.setFillColor(239, 246, 255);
  doc.roundedRect(margin, y, contentWidth, priceBoxHeight, 3, 3, "F");

  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(37, 99, 235);
  doc.text("PRICE BREAKDOWN", margin + 5, y + 8);

  y += 16;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 65, 85);

  const labelX = margin + 5;
  const valueX = pageWidth - margin - 5;

  doc.text("Base Price:", labelX, y);
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.text(formatPrice(data.estimate.base), valueX, y, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 65, 85);
  y += 6;

  if (data.estimate.addOns > 0) {
    doc.text("Add-Ons Total:", labelX, y);
    doc.setTextColor(15, 23, 42);
    doc.setFont("helvetica", "bold");
    doc.text(formatPrice(data.estimate.addOns), valueX, y, { align: "right" });
    doc.setFont("helvetica", "normal");
    doc.setTextColor(51, 65, 85);
    y += 6;
  }

  doc.text("Subtotal:", labelX, y);
  doc.setTextColor(15, 23, 42);
  doc.setFont("helvetica", "bold");
  doc.text(formatPrice(data.estimate.subtotal), valueX, y, { align: "right" });
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 65, 85);
  y += 6;

  if (data.referralApplied && data.estimate.discount > 0) {
    doc.setTextColor(5, 150, 105);
    doc.setFont("helvetica", "bold");
    doc.text(`Referral Discount (${data.referralDiscount}%):`, labelX, y);
    doc.text(`-${formatPrice(data.estimate.discount)}`, valueX, y, {
      align: "right",
    });
    doc.setFont("helvetica", "normal");
    doc.setTextColor(51, 65, 85);
    y += 6;
  }

  doc.setDrawColor(37, 99, 235);
  doc.setLineWidth(0.3);
  doc.line(labelX, y, valueX, y);
  y += 6;

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text("Final Amount:", labelX, y);
  doc.setTextColor(37, 99, 235);
  doc.setFontSize(12);
  doc.text(formatPrice(data.estimate.final), valueX, y, { align: "right" });

  y += 8;

  if (data.estimate.adSpend > 0) {
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(180, 83, 9);
    doc.text(
      `Note: Ad spend of ${formatPrice(data.estimate.adSpend)} is separate`,
      labelX,
      y
    );
    y += 6;
  }

  y += 6;

  /* ═══════════════════════════════════════════════════════════════
     ESTIMATED RANGE
  ═══════════════════════════════════════════════════════════════ */
  const rangeBoxHeight = 26;
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(margin, y, contentWidth, rangeBoxHeight, 3, 3, "F");

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(148, 163, 184);
  doc.text("TOTAL ESTIMATED RANGE", margin + 5, y + 8);

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text(
    `${formatPrice(data.estimate.low)}  -  ${formatPrice(data.estimate.high)}`,
    margin + 5,
    y + 20
  );

  y += rangeBoxHeight + 10;

  /* ═══════════════════════════════════════════════════════════════
     TERMS
  ═══════════════════════════════════════════════════════════════ */
  doc.setFontSize(9);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text("Terms & Conditions", margin, y);
  y += 5;

  doc.setFontSize(7.5);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);

  const terms = [
    "• This is a ballpark estimate. Final quote may vary based on detailed requirements.",
    "• Domain & hosting charges are separate and not included in this estimate.",
    "• Prices are valid for 30 days from the date of this quote.",
    "• GST applicable as per government regulations.",
    "• Payment terms: 50% advance, 50% on delivery (unless agreed otherwise).",
  ];

  terms.forEach((term) => {
    doc.text(term, margin, y);
    y += 4;
  });

  /* ═══════════════════════════════════════════════════════════════
     FOOTER
  ═══════════════════════════════════════════════════════════════ */
  const footerY = pageHeight - 14;

  doc.setFillColor(15, 23, 42);
  doc.rect(0, footerY, pageWidth, 14, "F");

  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text("Zentrox Technologies", margin, footerY + 6);

  doc.setFont("helvetica", "normal");
  doc.setTextColor(148, 163, 184);
  doc.text(
    "zentroxtechnologies.com  |  contact.zentroxtech@gmail.com  |  +91 89881 83513",
    margin,
    footerY + 10
  );

  doc.text("MSME Registered", pageWidth - margin, footerY + 8, {
    align: "right",
  });

  /* ═══════════════════════════════════════════════════════════════
     SAVE
  ═══════════════════════════════════════════════════════════════ */
  doc.save(`Zentrox-Quote-${quoteId}.pdf`);
}
