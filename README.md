# Vehicle PDI Inspector Web App

A modern, responsive, client-side Pre-Delivery Inspection (PDI) web application for new car buyers. Designed to help everyday buyers perform an organized, professional inspection at the dealership using only their eyes, hands, ears, smartphone camera, and vehicle controls — without dismantling any parts or requiring expensive diagnostic equipment.

Initially tailored for the **Tata Nexon Pure Plus iCNG (Manual Transmission, Dual Fuel CNG + Petrol)**, but built with an extensible, data-driven architecture that adapts to any manufacturer, fuel type, and transmission.

---

## Key Features

- **28 Structured Categories in Physical Flow Order**:
  1. Vehicle & Document Verification
  2. VIN & Manufacturing Verification
  3. Odometer & Usage
  4. Exterior 360° Inspection
  5. Paint & Body Condition
  6. Glass & Windows
  7. Tyres & Wheels
  8. Engine Bay
  9. Fluids & Visible Mechanical Components
  10. CNG System Safety Inspection
  11. Boot & Luggage Area
  12. Interior Condition
  13. Seats & Seat Belts
  14. Dashboard & Instrument Cluster
  15. Lights & Exterior Electricals
  16. Controls, Switches & Electricals
  17. Infotainment & Connectivity
  18. Air Conditioning
  19. Cameras & Parking Assistance
  20. Engine Start & Idle
  21. Clutch & Transmission
  22. Steering & Brakes
  23. Suspension & Driving Behaviour
  24. CNG/Petrol Operation
  25. Underbody Inspection
  26. Accessories & Equipment
  27. Final Documentation
  28. Final Acceptance Review

- **5-Point Inspection Framework for Every Check**:
  - **What**: Exactly what to inspect.
  - **Where**: Precise location on the vehicle.
  - **How**: Step-by-step instructions for non-technical users.
  - **Normal**: What good condition looks, feels, and sounds like.
  - **Reject / Red Flag**: Defect threshold that warrants rejection or dealer escalation.
  - **Why It Matters**: Plain-language explanation of importance.
  - **Safety Warnings**: Safe visual inspections only; strict safety guidelines for hot engines and high-pressure CNG components.

- **Mobile-First & Dealership Ready**:
  - High-contrast outdoor-friendly UI.
  - Sticky bottom action bar with **"Mark Pass & Next"** quick flow.
  - Live progress counters and multi-segment visual progress bar.
  - Real-time search and filter chips (`All`, `✓ Passed`, `✕ Rejected`, `○ Remaining`, `⚠ Critical`, `Major`, `Minor`).

- **Defect Logging with Photos**:
  - Rejection modal requiring observation notes.
  - Camera capture and photo upload via HTML `<canvas>` image compression to ensure local storage limits are never exceeded.
  - Critical Issue alert banner for safety-critical defects.

- **Zero-Backend / 100% Client-Side Privacy**:
  - All sessions persist in browser `localStorage`.
  - Automatic auto-save after every action with last-saved timestamp.
  - Multi-session manager: Resume active inspection, view past reports, or delete sessions.
  - No database, no accounts, and no tracking.

- **Professional PDF Report Generation**:
  - Client-side PDF generation using `jspdf` and `jspdf-autotable`.
  - Color-coded executive result badge.
  - Prominent Critical Issues callout box.
  - Itemized defect log with category, severity, notes, and embedded photo evidence appendix.
  - Official inspector & dealer representative signature and sign-off declaration.
  - Automatic filename generation: `${Mfr}_${Model}_${Variant}_PDI_${VIN}_${Date}.pdf`.

---

## Technology Stack

- **React 18** + **TypeScript**
- **Vite 6** (Fast bundler)
- **Tailwind CSS 3** (Utility-first styling)
- **Lucide React** (Modern iconography)
- **jsPDF** & **jspdf-autotable** (Client-side PDF compilation)
- **canvas-confetti** (Inspection completion animation)

---

## Getting Started

### Development Mode
```bash
npm run dev
```
Open `http://localhost:5173` in your browser.

### Production Build
```bash
npm run build
```

### Run Automated Test Suite
```bash
node test/run-test.js
```
Runs 38 automated assertions verifying category sequence, 5-point guidance completeness, applicability filtering, and decision matrix logic.
