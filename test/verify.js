import { CHECKLIST_ITEMS } from '../src/data/checklistData.ts';
import { CATEGORIES } from '../src/data/categories.ts';
import { DEFAULT_VEHICLE } from '../src/data/defaultVehicle.ts';
import { getApplicableChecks, calculateInspectionSummary } from '../src/services/storage.ts';

let errors = 0;
function assert(condition, message) {
  if (!condition) {
    console.error('❌ FAIL: ' + message);
    errors++;
  } else {
    console.log('✅ PASS: ' + message);
  }
}

console.log('=== RUNNING PDI CHECKER AUDIT & VERIFICATION ===\n');

// 1. Verify 28 categories in exact order
assert(CATEGORIES.length === 28, `Exactly 28 categories present (found ${CATEGORIES.length})`);
const expectedCategoryNames = [
  'Vehicle & Document Verification',
  'VIN & Manufacturing Verification',
  'Odometer & Usage',
  'Exterior 360° Inspection',
  'Paint & Body Condition',
  'Glass & Windows',
  'Tyres & Wheels',
  'Engine Bay',
  'Fluids & Visible Mechanical Components',
  'CNG System Safety Inspection',
  'Boot & Luggage Area',
  'Interior Condition',
  'Seats & Seat Belts',
  'Dashboard & Instrument Cluster',
  'Lights & Exterior Electricals',
  'Controls, Switches & Electricals',
  'Infotainment & Connectivity',
  'Air Conditioning',
  'Cameras & Parking Assistance',
  'Engine Start & Idle',
  'Clutch & Transmission',
  'Steering & Brakes',
  'Suspension & Driving Behaviour',
  'CNG/Petrol Operation',
  'Underbody Inspection',
  'Accessories & Equipment',
  'Final Documentation',
  'Final Acceptance Review'
];

CATEGORIES.forEach((cat, idx) => {
  const expectedName = expectedCategoryNames[idx];
  assert(cat.name === expectedName, `Category ${idx + 1} is "${cat.name}" (expected "${expectedName}")`);
  const expectedNumber = String(idx + 1).padStart(2, '0');
  assert(cat.number === expectedNumber, `Category ${idx + 1} has number "${cat.number}"`);
});

// 2. Check total checks count (target: 120-150 checks)
console.log(`\nTotal checklist items across all categories: ${CHECKLIST_ITEMS.length}`);
assert(
  CHECKLIST_ITEMS.length >= 120 && CHECKLIST_ITEMS.length <= 160,
  `Checklist item count ${CHECKLIST_ITEMS.length} is within target 120–160`
);

// 3. Verify every check item has complete 5-point guidance:
// What to check, Where to find, How to check (array), Normal condition, Reject condition, Severity
let allChecksValid = true;
let invalidCheckReason = '';
for (const item of CHECKLIST_ITEMS) {
  if (!item.id || !item.categoryId || !item.title) {
    allChecksValid = false;
    invalidCheckReason = `Item missing core fields: ${JSON.stringify(item)}`;
    break;
  }
  if (!item.whatToCheck || item.whatToCheck.length < 5) {
    allChecksValid = false;
    invalidCheckReason = `Item ${item.id} missing whatToCheck`;
    break;
  }
  if (!item.whereToFind || item.whereToFind.length < 3) {
    allChecksValid = false;
    invalidCheckReason = `Item ${item.id} missing whereToFind`;
    break;
  }
  if (!Array.isArray(item.howToCheck) || item.howToCheck.length === 0) {
    allChecksValid = false;
    invalidCheckReason = `Item ${item.id} missing howToCheck steps array`;
    break;
  }
  if (!item.normalCondition || item.normalCondition.length < 5) {
    allChecksValid = false;
    invalidCheckReason = `Item ${item.id} missing normalCondition`;
    break;
  }
  if (!item.rejectCondition || item.rejectCondition.length < 5) {
    allChecksValid = false;
    invalidCheckReason = `Item ${item.id} missing rejectCondition`;
    break;
  }
  if (!['critical', 'major', 'minor'].includes(item.severity)) {
    allChecksValid = false;
    invalidCheckReason = `Item ${item.id} has invalid severity: ${item.severity}`;
    break;
  }
}
assert(allChecksValid, `All items fulfill 5-point guidance framework: ${invalidCheckReason || '100% compliant'}`);

// 4. Test applicability filtering on Default Vehicle (Tata Nexon Pure Plus iCNG, Manual, CNG + Petrol)
const applicableNexon = getApplicableChecks(DEFAULT_VEHICLE, CHECKLIST_ITEMS);
console.log(`\nApplicable checks for Tata Nexon iCNG MT: ${applicableNexon.length}`);
assert(applicableNexon.length >= 120, `Nexon iCNG MT has ${applicableNexon.length} applicable checks`);

// Verify CNG checks are included
const cngChecks = applicableNexon.filter((c) => c.categoryId === 'cat-10');
assert(cngChecks.length > 10, `CNG category 10 has ${cngChecks.length} checks for Nexon iCNG`);

// Verify manual transmission checks are included
const mtChecks = applicableNexon.filter((c) => c.categoryId === 'cat-21');
assert(mtChecks.length > 5, `Manual transmission category 21 has ${mtChecks.length} checks`);

// Test EV vehicle filtering: should NOT include CNG checks
const evVehicle = {
  ...DEFAULT_VEHICLE,
  fuelTypes: ['EV'],
  transmission: 'Automatic'
};
const applicableEV = getApplicableChecks(evVehicle, CHECKLIST_ITEMS);
const cngInEV = applicableEV.filter((c) => c.categoryId === 'cat-10');
assert(cngInEV.length === 0, `EV profile correctly excludes CNG checks (found ${cngInEV.length})`);
const mtInEV = applicableEV.filter((c) => c.categoryId === 'cat-21');
assert(mtInEV.length === 0, `EV profile correctly excludes Manual clutch checks (found ${mtInEV.length})`);

// 5. Test Decision Logic
console.log('\n--- Testing Decision Matrix Logic ---');
const dummySession = {
  id: 'test-session',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  vehicle: DEFAULT_VEHICLE,
  results: {},
  isCompleted: false
};

// Test INCOMPLETE when nothing checked
let summary = calculateInspectionSummary(dummySession);
assert(summary.decision === 'INCOMPLETE', `Decision when nothing checked is INCOMPLETE (got ${summary.decision})`);

// Mark all checks as passed
applicableNexon.forEach((item) => {
  dummySession.results[item.id] = { itemId: item.id, status: 'passed' };
});
summary = calculateInspectionSummary(dummySession);
assert(summary.decision === 'PASSED', `Decision when all passed is PASSED (got ${summary.decision})`);

// Mark 1 minor issue as rejected
const minorItem = applicableNexon.find((c) => c.severity === 'minor');
if (minorItem) {
  dummySession.results[minorItem.id] = { itemId: minorItem.id, status: 'rejected', notes: 'Scratch' };
}
summary = calculateInspectionSummary(dummySession);
assert(
  summary.decision === 'PASSED WITH OBSERVATIONS',
  `Decision with minor defect is PASSED WITH OBSERVATIONS (got ${summary.decision})`
);

// Mark 1 major issue as rejected
const majorItem = applicableNexon.find((c) => c.severity === 'major');
if (majorItem) {
  dummySession.results[majorItem.id] = { itemId: majorItem.id, status: 'rejected', notes: 'Door misaligned' };
}
summary = calculateInspectionSummary(dummySession);
assert(
  summary.decision === 'ACTION REQUIRED',
  `Decision with major defect is ACTION REQUIRED (got ${summary.decision})`
);

// Mark 1 critical issue as rejected
const criticalItem = applicableNexon.find((c) => c.severity === 'critical');
if (criticalItem) {
  dummySession.results[criticalItem.id] = { itemId: criticalItem.id, status: 'rejected', notes: 'VIN mismatch' };
}
summary = calculateInspectionSummary(dummySession);
assert(
  summary.decision === 'STOP / PROFESSIONAL REVIEW RECOMMENDED',
  `Decision with critical defect is STOP / PROFESSIONAL REVIEW RECOMMENDED (got ${summary.decision})`
);

if (errors === 0) {
  console.log('\n🎉 ALL TESTS PASSED WITH 0 ERRORS!');
  process.exit(0);
} else {
  console.error(`\n❌ ${errors} TEST(S) FAILED!`);
  process.exit(1);
}
