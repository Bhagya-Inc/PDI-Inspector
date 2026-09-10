import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { InspectionSession, InspectionSummary } from '../types/pdi';
import { CATEGORIES } from '../data/categories';
import { getApplicableChecks } from './storage';
import { formatReportTimestamp } from './dateUtils';

async function loadImageDataUrl(src: string): Promise<string | null> {
  try {
    const response = await fetch(src);
    if (!response.ok) return null;
    const blob = await response.blob();

    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(typeof reader.result === 'string' ? reader.result : null);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

export async function generatePdfReport(session: InspectionSession, summary: InspectionSummary): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const v = session.vehicle;
  const applicableChecks = getApplicableChecks(v);
  const logoDataUrl = await loadImageDataUrl('/apple-touch-icon.png');

  // Helper for text colors
  const darkColor = [30, 41, 59]; // slate-800
  const grayColor = [100, 116, 139]; // slate-500
  const redColor = [225, 29, 72]; // rose-600
  const amberColor = [217, 119, 6]; // amber-600
  const greenColor = [22, 163, 74]; // green-600

  let y = 18;

  // Header Banner
  doc.setFillColor(15, 23, 42); // slate-900
  doc.rect(0, 0, pageWidth, 32, 'F');

  if (logoDataUrl) {
    doc.addImage(logoDataUrl, 'PNG', 14, 5, 18, 18);
  }

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.text('VEHICLE PRE-DELIVERY INSPECTION REPORT', 36, 13);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(203, 213, 225); // slate-300
  doc.text('Customer PDI Assistant - Independent Pre-Delivery Audit', 36, 20);

  doc.text(`Inspector: ${v.inspectorName || 'Customer'}`, 36, 26);
  doc.text(`Generated: ${formatReportTimestamp(session.updatedAt)}`, pageWidth - 14, 26, { align: 'right' });

  y = 40;

  // Vehicle Information Section Title
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.text('1. Vehicle & Inspection Details', 14, y);
  y += 4;

  const vehicleInfoRows = [
    ['Manufacturer', v.manufacturer || 'Tata', 'Model & Variant', `${v.model} ${v.variant}`],
    ['Fuel Type', v.fuelTypes.join(' + ') || 'CNG + Petrol', 'Transmission', v.transmission || 'Manual'],
    ['Exterior Colour', v.color || 'Pristine White', 'VIN / Chassis No.', v.vin || 'Not Recorded'],
    ['Engine Number', v.engineNumber || 'Not Recorded', 'Odometer Reading', v.odometerReading ? `${v.odometerReading} km` : 'Not Recorded'],
    ['Manufacturing Date', v.manufacturingMonthYear || 'Not Recorded', 'Inspection Date', v.inspectionDate || 'Not Recorded'],
    ['Dealership Name', v.dealerName || 'Not Recorded', 'Inspector Name', v.inspectorName || 'Customer']
  ];

  autoTable(doc, {
    startY: y,
    head: [],
    body: vehicleInfoRows,
    theme: 'grid',
    styles: {
      fontSize: 8.5,
      cellPadding: 2.2,
      lineColor: [226, 232, 240],
      textColor: [30, 41, 59]
    },
    columnStyles: {
      0: { fontStyle: 'bold', fillColor: [248, 250, 252], cellWidth: 35 },
      1: { cellWidth: 58 },
      2: { fontStyle: 'bold', fillColor: [248, 250, 252], cellWidth: 38 },
      3: { cellWidth: 55 }
    },
    margin: { left: 14, right: 14 }
  });

  // @ts-expect-error autoTable adds lastAutoTable to doc
  y = doc.lastAutoTable.finalY + 8;

  // Executive Summary & Overall Result Banner
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.text('2. Executive Summary & Audit Result', 14, y);
  y += 5;

  // Decision banner box
  let bannerFill = greenColor;
  let bannerText = summary.decision;
  if (summary.decision.includes('STOP') || summary.criticalIssues > 0) {
    bannerFill = redColor;
  } else if (summary.decision === 'INCOMPLETE') {
    bannerFill = [100, 116, 139]; // slate
  } else if (summary.decision === 'ACTION REQUIRED') {
    bannerFill = amberColor;
  } else if (summary.decision === 'PASSED WITH OBSERVATIONS') {
    bannerFill = [202, 138, 4]; // yellow-600
  }

  doc.setFillColor(bannerFill[0], bannerFill[1], bannerFill[2]);
  doc.roundedRect(14, y, pageWidth - 28, 14, 2, 2, 'F');

  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.text(`PDI RESULT: ${bannerText}`, 20, y + 9);
  y += 18;

  // Statistics Table
  autoTable(doc, {
    startY: y,
    head: [['Total Checks', 'Passed', 'Rejected', 'Not Checked', 'Critical Defects', 'Major Defects', 'Minor Defects']],
    body: [[
      String(summary.total),
      `${summary.passed} (${Math.round((summary.passed / (summary.total || 1)) * 100)}%)`,
      String(summary.rejected),
      String(summary.notChecked),
      String(summary.criticalIssues),
      String(summary.majorIssues),
      String(summary.minorIssues)
    ]],
    theme: 'grid',
    headStyles: {
      fillColor: [51, 65, 85],
      textColor: [255, 255, 255],
      fontSize: 8,
      fontStyle: 'bold',
      halign: 'center'
    },
    styles: {
      fontSize: 8.5,
      halign: 'center',
      cellPadding: 2.5
    },
    margin: { left: 14, right: 14 }
  });

  // @ts-expect-error autoTable adds lastAutoTable to doc
  y = doc.lastAutoTable.finalY + 8;

  // If Critical Issues exist, show Critical Alert Callout
  const rejectedItems = applicableChecks
    .filter((item) => session.results[item.id]?.status === 'rejected')
    .map((item) => {
      const res = session.results[item.id];
      const cat = CATEGORIES.find((c) => c.id === item.categoryId);
      return {
        item,
        categoryName: cat ? `${cat.number} ${cat.name}` : 'General',
        notes: res?.notes || 'No specific notes recorded.',
        photoUrl: res?.photoUrl
      };
    });

  const criticalRejections = rejectedItems.filter((r) => r.item.severity === 'critical');

  if (criticalRejections.length > 0) {
    doc.setFillColor(254, 242, 242); // red-50
    doc.setDrawColor(248, 113, 113); // red-400
    doc.roundedRect(14, y, pageWidth - 28, 20 + criticalRejections.length * 5, 2, 2, 'FD');

    doc.setTextColor(190, 18, 60); // rose-700
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.text('⚠ CRITICAL ISSUES DETECTED — PROFESSIONAL RESOLUTION RECOMMENDED', 18, y + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(159, 18, 57);
    doc.text(
      'We recommend pausing delivery sign-off and requiring dealership management to resolve or professionally inspect the following critical items:',
      18,
      y + 11
    );

    let alertY = y + 16;
    criticalRejections.forEach((cr, idx) => {
      doc.setFont('helvetica', 'bold');
      doc.text(`${idx + 1}. [${cr.categoryName}] ${cr.item.title}: ${cr.notes}`, 20, alertY);
      alertY += 5;
    });

    y = alertY + 6;
  }

  // Section 3: Rejected Items Table
  if (rejectedItems.length > 0) {
    if (y > 230) {
      doc.addPage();
      y = 18;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text(`3. Detailed Defect & Observation Log (${rejectedItems.length} Issues)`, 14, y);
    y += 4;

    const tableRows = rejectedItems.map((r, index) => [
      String(index + 1),
      r.categoryName,
      r.item.title,
      r.item.severity.toUpperCase(),
      'REJECT',
      r.notes
    ]);

    autoTable(doc, {
      startY: y,
      head: [['#', 'Category', 'Inspection Check', 'Severity', 'Status', 'Defect Observation / Notes']],
      body: tableRows,
      theme: 'grid',
      headStyles: {
        fillColor: [30, 41, 59],
        textColor: [255, 255, 255],
        fontSize: 8,
        fontStyle: 'bold'
      },
      styles: {
        fontSize: 7.5,
        cellPadding: 2.2,
        textColor: [30, 41, 59]
      },
      columnStyles: {
        0: { cellWidth: 8, halign: 'center' },
        1: { cellWidth: 36 },
        2: { cellWidth: 42, fontStyle: 'bold' },
        3: { cellWidth: 18, halign: 'center' },
        4: { cellWidth: 16, halign: 'center', textColor: [225, 29, 72], fontStyle: 'bold' },
        5: { cellWidth: 62 }
      },
      margin: { left: 14, right: 14 }
    });

    // @ts-expect-error autoTable adds lastAutoTable to doc
    y = doc.lastAutoTable.finalY + 8;
  }

  // Section 4: Category Summary Table
  if (y > 210) {
    doc.addPage();
    y = 18;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.text('4. Category-by-Category Summary', 14, y);
  y += 4;

  const catRows = CATEGORIES.map((cat) => {
    const stats = summary.categoryStats[cat.id] || { total: 0, passed: 0, rejected: 0, notChecked: 0 };
    if (stats.total === 0) return null;

    let status = 'PASSED';
    if (stats.rejected > 0) status = `${stats.rejected} REJECTED`;
    else if (stats.notChecked > 0) status = `${stats.notChecked} INCOMPLETE`;

    return [
      cat.number,
      cat.name,
      String(stats.total),
      String(stats.passed),
      String(stats.rejected),
      String(stats.notChecked),
      status
    ];
  }).filter(Boolean) as string[][];

  autoTable(doc, {
    startY: y,
    head: [['No.', 'Inspection Category', 'Checks', 'Passed', 'Rejected', 'Remaining', 'Result']],
    body: catRows,
    theme: 'grid',
    headStyles: {
      fillColor: [51, 65, 85],
      fontSize: 7.5,
      halign: 'center'
    },
    styles: {
      fontSize: 7.5,
      cellPadding: 1.8
    },
    columnStyles: {
      0: { cellWidth: 10, halign: 'center' },
      1: { cellWidth: 65 },
      2: { cellWidth: 16, halign: 'center' },
      3: { cellWidth: 16, halign: 'center' },
      4: { cellWidth: 16, halign: 'center' },
      5: { cellWidth: 18, halign: 'center' },
      6: { cellWidth: 25, halign: 'center', fontStyle: 'bold' }
    },
    margin: { left: 14, right: 14 }
  });

  // @ts-expect-error autoTable adds lastAutoTable to doc
  y = doc.lastAutoTable.finalY + 8;

  // Section 5: Photo Evidence Appendix (if photos attached)
  const itemsWithPhotos = rejectedItems.filter((r) => Boolean(r.photoUrl));

  if (itemsWithPhotos.length > 0) {
    doc.addPage();
    y = 18;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
    doc.text(`5. Photographic Evidence Appendix (${itemsWithPhotos.length} Photo${itemsWithPhotos.length > 1 ? 's' : ''})`, 14, y);
    y += 8;

    itemsWithPhotos.forEach((itemPhoto, idx) => {
      if (y > 220) {
        doc.addPage();
        y = 18;
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
      doc.text(`Photo ${idx + 1}: [${itemPhoto.categoryName}] ${itemPhoto.item.title}`, 14, y);
      y += 4;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
      doc.text(`Severity: ${itemPhoto.item.severity.toUpperCase()} • Note: ${itemPhoto.notes}`, 14, y);
      y += 4;

      try {
        if (itemPhoto.photoUrl) {
          // Add image: width 70mm, height ~50mm
          doc.addImage(itemPhoto.photoUrl, 'JPEG', 14, y, 75, 52);
          y += 58;
        }
      } catch (err) {
        console.warn('Could not embed photo in PDF', err);
        y += 10;
      }
    });
  }

  // Section 6: Inspector & Dealership Sign-off Declaration
  if (y > 230) {
    doc.addPage();
    y = 18;
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.text('6. Pre-Delivery Sign-off & Mutual Declaration', 14, y);
  y += 5;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
  const disclaimerText =
    'DISCLAIMER: This report records observations made during a customer-performed pre-delivery visual and operational inspection. It is not a substitute for an OEM computerized OBD diagnostic scan or certified mechanical workshop assessment. All highlighted defects should be acknowledged in writing on the official Dealership Delivery Gate Pass prior to taking physical possession of the vehicle.';
  const splitDisclaimer = doc.splitTextToSize(disclaimerText, pageWidth - 28);
  doc.text(splitDisclaimer, 14, y);
  y += splitDisclaimer.length * 3.5 + 8;

  // Signatures table / boxes
  const boxWidth = (pageWidth - 36) / 2;

  // Inspector box
  doc.setDrawColor(203, 213, 225);
  doc.rect(14, y, boxWidth, 32);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.setTextColor(darkColor[0], darkColor[1], darkColor[2]);
  doc.text('INSPECTOR / CUSTOMER SIGNATURE', 18, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text(`Name: ${v.inspectorName || 'Customer'}`, 18, y + 14);
  doc.text(`Timestamp: ${formatReportTimestamp(session.updatedAt)}`, 18, y + 20);
  doc.text('Signature: ___________________________', 18, y + 27);

  // Dealer Representative box
  doc.rect(14 + boxWidth + 8, y, boxWidth, 32);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8);
  doc.text('DEALER REPRESENTATIVE SIGNATURE', 14 + boxWidth + 12, y + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.text(`Dealership: ${v.dealerName || 'Authorized Dealership'}`, 14 + boxWidth + 12, y + 14);
  doc.text(`Timestamp: ${formatReportTimestamp(session.updatedAt)}`, 14 + boxWidth + 12, y + 20);
  doc.text('Signature & Seal: ____________________', 14 + boxWidth + 12, y + 27);

  // Auto-generate filename
  const cleanMfr = (v.manufacturer || 'Vehicle').replace(/[^a-zA-Z0-9]/g, '_');
  const cleanModel = (v.model || 'Model').replace(/[^a-zA-Z0-9]/g, '_');
  const cleanVariant = (v.variant || 'Variant').replace(/[^a-zA-Z0-9]/g, '_');
  const vinSnippet = v.vin ? `${v.vin.slice(-7)}_` : '';
  const dateStr = v.inspectionDate || new Date().toISOString().split('T')[0];

  const filename = `${cleanMfr}_${cleanModel}_${cleanVariant}_PDI_${vinSnippet}${dateStr}.pdf`;

  // Save / trigger browser download
  doc.save(filename);
}
