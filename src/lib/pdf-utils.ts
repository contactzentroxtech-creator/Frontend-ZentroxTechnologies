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

function formatPrice(n: number) {
  return "₹" + Math.round(n).toLocaleString("en-IN");
}

export async function generatePDF(data: PDFData) {
  const doc = new jsPDF("p", "mm", "a4");
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  let y = 0;

  // ═══════ HEADER — BRANDED ═══════
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 45, "F");

  // Logo
  try {
    const img = new Image();
    img.src = "/Zentrox-Logo1.png";
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
    });
    doc.addImage(img, "PNG", 15, 10, 25, 25);
  } catch {
    // Logo fail — skip
  }

  // Company name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(20);
  doc.setFont("helvetica", "bold");
  doc.text("ZENTROX TECHNOLOGIES", 45, 20);

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(203, 213, 225);
  doc.text("Software & Digital Growth Partner", 45, 26);
  doc.text("Mohali & Chandigarh, Punjab, India", 45, 31);
  doc.text("contact.zentroxtech@gmail.com  |  +91 89881 83513", 45, 36);

  y = 55;

  // ═══════ DOCUMENT TITLE ═══════
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("Project Estimate & Quote", pageWidth / 2, y, { align: "center" });

  y += 6;
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(100, 116, 139);
  const quoteId = `ZT-${Date.now().toString().slice(-8)}`;
  doc.text(`Quote ID: ${quoteId}`, pageWidth / 2, y, { align: "center" });

  y += 5;
  const date = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  doc.text(`Date: ${date}`, pageWidth / 2, y, { align: "center" });

  y += 12;

  // ═══════ CLIENT DETAILS ═══════
  doc.setFillColor(248, 250, 252);
  doc.rect(15, y, pageWidth - 30, 40, "F");

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text("CLIENT DETAILS", 20, y + 8);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 65, 85);
  doc.text(`Name:  ${data.clientName}`, 20, y + 16);
  doc.text(`Email:  ${data.clientEmail}`, 20, y + 23);
  doc.text(`Phone:  ${data.clientPhone}`, 20, y + 30);
  doc.text(`Service:  ${data.service}`, 20, y + 37);

  y += 50;

  // ═══════ PROJECT DETAILS ═══════
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text("PROJECT REQUIREMENTS", 15, y);

  y += 8;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 65, 85);

  data.fieldDetails.forEach((field) => {
    doc.text(`${field.label}:`, 20, y);
    doc.setFont("helvetica", "bold");
    doc.text(field.value, 90, y);
    doc.setFont("helvetica", "normal");
    y += 7;
  });

  y += 5;

  // ═══════ ADD-ONS ═══════
  if (data.addOns.length > 0) {
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(15, 23, 42);
    doc.text("ADD-ONS", 15, y);
    y += 8;

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(51, 65, 85);

    data.addOns.forEach((addon) => {
      doc.text(`•  ${addon.label}`, 20, y);
      doc.setFont("helvetica", "bold");
      doc.text(formatPrice(addon.price), 160, y, { align: "right" });
      doc.setFont("helvetica", "normal");
      y += 7;
    });

    y += 5;
  }

  // ═══════ TIMELINE ═══════
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text(`Timeline:`, 20, y);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 65, 85);
  doc.text(data.timeline, 90, y);
  y += 12;

  // ═══════ PRICE BREAKDOWN ═══════
  doc.setFillColor(239, 246, 255);
  doc.rect(15, y, pageWidth - 30, 55, "F");

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(37, 99, 235);
  doc.text("PRICE BREAKDOWN", 20, y + 8);

  y += 16;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(51, 65, 85);

  doc.text("Base Price:", 20, y);
  doc.text(formatPrice(data.estimate.base), 160, y, { align: "right" });
  y += 7;

  if (data.estimate.addOns > 0) {
    doc.text("Add-Ons:", 20, y);
    doc.text(formatPrice(data.estimate.addOns), 160, y, { align: "right" });
    y += 7;
  }

  doc.text("Subtotal:", 20, y);
  doc.text(formatPrice(data.estimate.subtotal), 160, y, { align: "right" });
  y += 7;

  if (data.referralApplied && data.estimate.discount > 0) {
    doc.setTextColor(5, 150, 105);
    doc.text(`Referral Discount (${data.referralDiscount}%):`, 20, y);
    doc.text(`-${formatPrice(data.estimate.discount)}`, 160, y, { align: "right" });
    doc.setTextColor(51, 65, 85);
    y += 7;
  }

  doc.setFont("helvetica", "bold");
  doc.setTextColor(15, 23, 42);
  doc.text("Final Amount:", 20, y);
  doc.text(formatPrice(data.estimate.final), 160, y, { align: "right" });
  y += 10;

  if (data.estimate.adSpend > 0) {
    doc.setFont("helvetica", "normal");
    doc.setTextColor(180, 83, 9);
    doc.text("Note: Ad spend is separate", 20, y);
    doc.text(formatPrice(data.estimate.adSpend), 160, y, { align: "right" });
    y += 7;
  }

  y += 12;

  // ═══════ FINAL RANGE ═══════
  doc.setFillColor(15, 23, 42);
  doc.rect(15, y, pageWidth - 30, 25, "F");

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(203, 213, 225);
  doc.text("ESTIMATED RANGE", 20, y + 9);

  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(255, 255, 255);
  doc.text(
    `${formatPrice(data.estimate.low)}  –  ${formatPrice(data.estimate.high)}`,
    20,
    y + 19
  );

  y += 35;

  // ═══════ TERMS ═══════
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(148, 163, 184);
  doc.text("Terms & Conditions:", 15, y);
  y += 4;
  doc.text("• This is a ballpark estimate. Final quote may vary based on detailed requirements.", 15, y);
  y += 4;
  doc.text("• Domain & hosting charges are separate and not included.", 15, y);
  y += 4;
  doc.text("• Prices are valid for 30 days from the date of this quote.", 15, y);
  y += 4;
  doc.text("• GST applicable as per government regulations.", 15, y);

  // ═══════ FOOTER ═══════
  doc.setFillColor(15, 23, 42);
  doc.rect(0, pageHeight - 15, pageWidth, 15, "F");

  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225);
  doc.text(
    "Zentrox Technologies  |  zentroxtechnologies.com  |  contact.zentroxtech@gmail.com  |  +91 89881 83513",
    pageWidth / 2,
    pageHeight - 6,
    { align: "center" }
  );

  // ═══════ SAVE ═══════
  doc.save(`Zentrox-Quote-${quoteId}.pdf`);
}
