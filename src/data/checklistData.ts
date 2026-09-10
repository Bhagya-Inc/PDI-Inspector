import { ChecklistItem } from '../types/pdi';

export const CHECKLIST_ITEMS: ChecklistItem[] = [
  // =========================================================================
  // CATEGORY 01 — VEHICLE & DOCUMENT VERIFICATION (8 Checks)
  // =========================================================================
  {
    id: 'c01-01',
    categoryId: 'cat-01',
    title: 'Manufacturer, Model & Brand Name Verification',
    whatToCheck: 'Confirm that the vehicle delivered matches the manufacturer and model booked (Tata Nexon).',
    whereToFind: 'Tax invoice, booking receipt, front grille emblem, and tailgate lettering.',
    howToCheck: [
      'Inspect tax invoice header and delivery challan.',
      'Check front grille Tata badge and rear "NEXON" tailgate lettering.',
      'Verify steering wheel horn pad branding.'
    ],
    normalCondition: 'Vehicle is clearly branded Tata Nexon across all paperwork and physical emblems.',
    rejectCondition: 'Model mismatch, missing lettering, or discrepancy in manufacturer name.',
    severity: 'critical',
    whyItMatters: 'Guarantees the fundamental legal identity of the vehicle matches your booking.'
  },
  {
    id: 'c01-02',
    categoryId: 'cat-01',
    title: 'Exact Variant & Trim Confirmation',
    whatToCheck: 'Verify that the vehicle delivered is the specific trim level ordered (Pure Plus iCNG).',
    whereToFind: 'Tax invoice description, tailgate iCNG branding, and standard variant features.',
    howToCheck: [
      'Check variant line item on tax invoice.',
      'Check rear tailgate for iCNG emblem.',
      'Verify standard Pure Plus equipment: touchscreen infotainment, roof rails, and wheel covers.'
    ],
    normalCondition: 'Delivered variant matches the exact purchased trim (Pure Plus iCNG).',
    rejectCondition: 'Lower trim delivered or missing advertised variant equipment.',
    severity: 'critical',
    whyItMatters: 'Trim mix-ups can omit major features you paid for.'
  },
  {
    id: 'c01-03',
    categoryId: 'cat-01',
    title: 'Fuel Type Specification in Documentation',
    whatToCheck: 'Ensure fuel type is officially specified as Dual Fuel: CNG + Petrol across all paperwork.',
    whereToFind: 'Tax invoice, insurance certificate, and Form 20/21/22.',
    howToCheck: [
      'Check the fuel type column on the tax invoice.',
      'Check the insurance cover note schedule.',
      'Check Form 22 (Roadworthiness certificate).'
    ],
    normalCondition: 'Explicitly indicated as "CNG / Petrol" or "Bi-Fuel CNG".',
    rejectCondition: 'Listed only as Petrol without factory CNG endorsement.',
    severity: 'critical',
    whyItMatters: 'Crucial for road tax calculation, RTO registration, and factory warranty compliance.',
    applicableTo: { fuelTypes: ['CNG'] }
  },
  {
    id: 'c01-04',
    categoryId: 'cat-01',
    title: 'Transmission Type & Gear Shifter Pattern',
    whatToCheck: 'Verify that the gearbox is 6-speed Manual Transmission as booked.',
    whereToFind: 'Gear shifter knob inside cabin and tax invoice.',
    howToCheck: [
      'Check gear lever: must show 1-2-3-4-5-6-R pattern with pull-up reverse collar.',
      'Confirm clutch pedal is present in driver footwell.',
      'Verify invoice specifies "Manual" or "6MT".'
    ],
    normalCondition: 'Manual 6-speed gear shifter with clutch pedal installed.',
    rejectCondition: 'Wrong transmission installed or transmission mismatch on invoice.',
    severity: 'critical',
    whyItMatters: 'Ensures correct vehicle mechanical drivetrain.',
    applicableTo: { transmissions: ['Manual'] }
  },
  {
    id: 'c01-05',
    categoryId: 'cat-01',
    title: 'Exterior Paint Colour Match',
    whatToCheck: 'Confirm vehicle exterior color matches the booked color code (Pristine White).',
    whereToFind: 'Vehicle exterior in bright daylight and tax invoice.',
    howToCheck: [
      'Inspect the car all around in open sunlight.',
      'Verify the color name on the invoice matches "Pristine White".',
      'Check paint code plate inside driver door jamb B-pillar.'
    ],
    normalCondition: 'Clean, uniform Pristine White color matching invoice.',
    rejectCondition: 'Color mismatch, mismatched roof color, or wrong invoice paint code.',
    severity: 'major',
    whyItMatters: 'RTO registration documents record vehicle color permanently.'
  },
  {
    id: 'c01-06',
    categoryId: 'cat-01',
    title: 'Customer Name & Personal Details on Invoice',
    whatToCheck: 'Verify that customer name, address, and PAN/Aadhaar match your ID proof exactly.',
    whereToFind: 'Tax invoice and booking dossier.',
    howToCheck: [
      'Check spelling of your first, middle, and last name.',
      'Verify postal address, PIN code, and mobile number.',
      'Check PAN / GSTIN number if applicable.'
    ],
    normalCondition: 'Zero typographical or spelling errors in customer identity.',
    rejectCondition: 'Spelling mistakes in name or address that will cause RTO rejection.',
    severity: 'major',
    whyItMatters: 'Spelling mistakes on invoice will cause ownership transfer or insurance claim rejections.'
  },
  {
    id: 'c01-07',
    categoryId: 'cat-01',
    title: 'Insurance Policy Schedule & Add-on Riders',
    whatToCheck: 'Verify insurance cover note details, vehicle ID, IDV, and requested zero-dep add-ons.',
    whereToFind: 'Insurance policy document / cover note.',
    howToCheck: [
      'Verify customer name and vehicle variant.',
      'Check engine and chassis numbers against vehicle.',
      'Verify agreed add-ons: Zero Depreciation, Engine Protect, Return to Invoice, Consumables, Roadside Assistance.',
      'Confirm CNG kit endorsement is included in insurance cover.'
    ],
    normalCondition: 'Active policy with correct details and all agreed zero-depreciation riders.',
    rejectCondition: 'CNG endorsement missing, missing zero-dep add-ons, or wrong VIN on policy.',
    severity: 'critical',
    whyItMatters: 'Driving without proper insurance or missing CNG endorsement invalidates accident claims.',
    applicableTo: { fuelTypes: ['CNG'] }
  },
  {
    id: 'c01-08',
    categoryId: 'cat-01',
    title: 'Original Keys Handover Count (2 Keys)',
    whatToCheck: 'Confirm presence of two factory keys (both remotes or one flip remote + one mechanical).',
    whereToFind: 'Handed over by sales executive with key tag.',
    howToCheck: [
      'Count exactly 2 physical factory keys.',
      'Note the plastic/metal key code tag attached (needed to duplicate lost keys).',
      'Test lock, unlock, and boot release buttons on both keys.'
    ],
    normalCondition: '2 original keys provided with intact key code tag, both functioning properly.',
    rejectCondition: 'Only 1 key provided, keys showing wear, or key tag missing.',
    severity: 'major',
    whyItMatters: 'Ordering a replacement key later costs thousands and requires dealer ECU reprogramming.'
  },

  // =========================================================================
  // CATEGORY 02 — VIN & MANUFACTURING VERIFICATION (6 Checks)
  // =========================================================================
  {
    id: 'c02-01',
    categoryId: 'cat-02',
    title: 'Physical Chassis VIN Stamping Visibility',
    whatToCheck: 'Locate and inspect the 17-character Vehicle Identification Number physically punched onto the chassis.',
    whereToFind: 'Under the driver seat floor flap or under the bonnet on the driver-side firewall/crossmember.',
    howToCheck: [
      'Ask the dealer representative to lift the floor flap under the front seat.',
      'Shine your phone flashlight directly on the punched metal.',
      'Take a clear photograph of all 17 characters.'
    ],
    normalCondition: '17 characters clearly stamped into metal with uniform factory embossing.',
    rejectCondition: 'VIN is illegible, scratched over, unevenly restamped, or cannot be found.',
    severity: 'critical',
    whyItMatters: 'The VIN is the legal identity of the car. Any defect or illegibility causes severe registration failure.',
    photoRecommended: true
  },
  {
    id: 'c02-02',
    categoryId: 'cat-02',
    title: 'VIN Matches Tax Invoice & Insurance Character-by-Character',
    whatToCheck: 'Compare the 17 physical VIN characters with the VIN printed on invoice and insurance policy.',
    whereToFind: 'Compare stamped metal photo with tax invoice header and insurance policy.',
    howToCheck: [
      'Read characters 1 through 17 one-by-one from the physical vehicle stamping.',
      'Verify every single letter and digit against the invoice.',
      'Pay special attention to letters like B vs 8, D vs 0, Z vs 2.'
    ],
    normalCondition: '100% exact character match between metal chassis stamping and all delivery documents.',
    rejectCondition: 'Any single character difference between vehicle and documents.',
    severity: 'critical',
    whyItMatters: 'A 1-digit mismatch means you are paying for or registering a completely different vehicle.'
  },
  {
    id: 'c02-03',
    categoryId: 'cat-02',
    title: 'Manufacturing VIN Plate / B-Pillar Sticker',
    whatToCheck: 'Inspect the black printed VIN barcode sticker / metal compliance plate on the B-pillar.',
    whereToFind: 'Driver-side B-pillar door frame (visible when driver door is opened).',
    howToCheck: [
      'Open the driver door.',
      'Inspect the VIN sticker/plate on the lower B-pillar jamb.',
      'Verify VIN, gross vehicle weight (GVW), and seating capacity.'
    ],
    normalCondition: 'Intact, unpeeled factory sticker with crisp barcode and matching 17-digit VIN.',
    rejectCondition: 'Sticker is peeling, scratched off, damaged, or displays a different VIN.',
    severity: 'major',
    photoRecommended: true
  },
  {
    id: 'c02-04',
    categoryId: 'cat-02',
    title: 'Physical Engine Number Stamping & Document Match',
    whatToCheck: 'Locate physical engine number stamped on engine block and reconcile with invoice.',
    whereToFind: 'Engine cylinder block (ask dealer technician to point flashlight).',
    howToCheck: [
      'Ask technician to show the engine serial stamping.',
      'Read and take a photo of the alphanumeric engine number.',
      'Verify exact match with invoice and Form 22.'
    ],
    normalCondition: 'Clean, legible engine serial number stamped by Tata plant matching all paperwork.',
    rejectCondition: 'Engine number is illegible, mismatched, or shows signs of grind/restamp.',
    severity: 'critical',
    whyItMatters: 'Engine number is recorded in RTO registration and police databases.',
    photoRecommended: true
  },
  {
    id: 'c02-05',
    categoryId: 'cat-02',
    title: 'Manufacturing Month & Year Decoding',
    whatToCheck: 'Decode the manufacturing month and year from the 10th and 12th VIN characters or Form 22.',
    whereToFind: '10th and 12th digits of Tata VIN and Form 22 issue date.',
    howToCheck: [
      'Check 10th VIN character (indicates manufacturing year: e.g. R=2024, S=2025, T=2026).',
      'Check 12th VIN character (indicates month: A=Jan, B=Feb, C=Mar... H=Aug, J=Sep).',
      'Confirm the car was built within the last 1 to 3 months from delivery date.'
    ],
    normalCondition: 'Manufacturing date is recent (typically within 1 to 3 months of delivery).',
    rejectCondition: 'Vehicle is older than 6 months without prior buyer disclosure and substantial discount.',
    severity: 'major',
    whyItMatters: 'Older vehicles may have stood idle in open dealer stockyards exposed to sun, rodents, or rust.'
  },
  {
    id: 'c02-06',
    categoryId: 'cat-02',
    title: 'No Evidence of Chassis / VIN Tampering',
    whatToCheck: 'Ensure the metal surrounding the VIN has original factory electro-deposition primer and no weld marks.',
    whereToFind: 'Chassis stamping area under floor / crossmember.',
    howToCheck: [
      'Examine the paint texture directly around the punched numbers.',
      'Check for grinding marks, welded patches, or rough non-factory spray paint.'
    ],
    normalCondition: 'Smooth, unbroken factory paint around cleanly stamped characters.',
    rejectCondition: 'Uneven paint, cut lines, grind marks, or suspicious metal plate welds around VIN.',
    severity: 'critical',
    whyItMatters: 'Any VIN tampering indicates stolen, cloned, or major rebuild vehicles.',
    photoRecommended: true
  },

  // =========================================================================
  // CATEGORY 03 — ODOMETER & USAGE (3 Checks)
  // =========================================================================
  {
    id: 'c03-01',
    categoryId: 'cat-03',
    title: 'Current Odometer Reading Recorded',
    whatToCheck: 'Note the exact delivery kilometer reading on the digital instrument cluster.',
    whereToFind: 'Digital speedometer screen on dashboard.',
    howToCheck: [
      'Turn ignition ON.',
      'Read and record the primary odometer kilometer number.',
      'Take a clear photograph of the instrument cluster showing the reading.'
    ],
    normalCondition: 'Exact mileage recorded (typically between 10 km and 60 km for a new factory car).',
    rejectCondition: 'Odometer reading cannot be displayed or odometer error shown.',
    severity: 'major',
    photoRecommended: true
  },
  {
    id: 'c03-02',
    categoryId: 'cat-03',
    title: 'Reasonable Delivery Mileage Range',
    whatToCheck: 'Evaluate if the odometer reading is reasonable for factory-to-stockyard transit.',
    whereToFind: 'Digital instrument cluster.',
    howToCheck: [
      'Compare reading against typical dealership delivery norm (usually under 60-80 km).',
      'If vehicle was driven by road from regional stockyard, verify transit distance.'
    ],
    normalCondition: 'Odometer is under 80 km (or under 150 km if stockyard road-transit was pre-disclosed).',
    rejectCondition: 'Odometer exceeds 150-200 km without satisfactory documented explanation from dealership.',
    severity: 'major',
    whyItMatters: 'Excessive mileage may indicate the car was used as a customer test-drive vehicle or dealer shuttle.'
  },
  {
    id: 'c03-03',
    categoryId: 'cat-03',
    title: 'No Discrepancy Between Cluster and Gate Pass',
    whatToCheck: 'Compare instrument cluster reading with the odometer figure written on gate pass/challan.',
    whereToFind: 'Vehicle delivery challan / gate pass document.',
    howToCheck: [
      'Check the kilometer figure recorded on the delivery challan.',
      'Confirm it matches the live digital odometer reading on the car.'
    ],
    normalCondition: 'Delivery challan records the exact live kilometer reading.',
    rejectCondition: 'Challan shows a significantly lower fake number (e.g. 10 km when car has 95 km).',
    severity: 'minor',
    whyItMatters: 'Accurate delivery mileage is vital for warranty dispute resolution.'
  },

  // =========================================================================
  // CATEGORY 04 — EXTERIOR 360° INSPECTION (10 Checks)
  // =========================================================================
  {
    id: 'c04-01',
    categoryId: 'cat-04',
    title: 'Front Bumper, Lower Skid Plate & Grille',
    whatToCheck: 'Inspect front bumper for scrapes, cracks, stone chips, and secure grille mounting.',
    whereToFind: 'Front of the vehicle, lower fascia and silver/gray faux skid plate.',
    howToCheck: [
      'Kneel down in front of the vehicle in bright daylight.',
      'Inspect lower edges for ramp scrape marks from transport trailers.',
      'Gently push bumper corners to ensure all plastic retaining clips are engaged.'
    ],
    normalCondition: 'Flawless paint, intact lower lip, no scrape marks, firm clip retention.',
    rejectCondition: 'Cracked plastic, gouges on lower skid plate, or detached bumper clip.',
    severity: 'major',
    photoRecommended: true
  },
  {
    id: 'c04-02',
    categoryId: 'cat-04',
    title: 'Bonnet / Hood Surface & Leading Edge',
    whatToCheck: 'Inspect bonnet for stone chips, transport hail dents, or ripple distortions.',
    whereToFind: 'Top bonnet panel and front nose edge.',
    howToCheck: [
      'Sight along the plane of the bonnet from both left and right sides.',
      'Run clean fingertips lightly over the metal to feel for small pin dents.',
      'Check leading front edge for transit stone chips.'
    ],
    normalCondition: 'Smooth, mirror-like reflection without dings, dents, or chips.',
    rejectCondition: 'Visible hail dents, transit stone chips, or repainted patches.',
    severity: 'major',
    photoRecommended: true
  },
  {
    id: 'c04-03',
    categoryId: 'cat-04',
    title: 'Left Front Wing / Fender & Cladding',
    whatToCheck: 'Inspect left front quarter panel for denting, wheel arch cladding fit, and alignment.',
    whereToFind: 'Between front bumper, bonnet, and driver door.',
    howToCheck: [
      'Check paint reflection and black plastic wheel arch molding.',
      'Ensure black cladding is clipped flush against the fender sheet metal.'
    ],
    normalCondition: 'Pristine paint and tightly seated wheel arch cladding.',
    rejectCondition: 'Dents, scratched plastic cladding, or protruding clips.',
    severity: 'minor',
    photoRecommended: true
  },
  {
    id: 'c04-04',
    categoryId: 'cat-04',
    title: 'Left Side Doors (Front & Rear Passenger)',
    whatToCheck: 'Inspect left front and rear door panels for car-park dings, creases, and edge paint chips.',
    whereToFind: 'Left side doors.',
    howToCheck: [
      'Look along the door line from rear to front at an angle.',
      'Check waistline character crease for straightness.',
      'Inspect door trailing edges for chip marks.'
    ],
    normalCondition: 'Uniform straight reflection with no creases, dings, or chipped edges.',
    rejectCondition: 'Door ding, wavy panel distortion, or scratch through clear coat.',
    severity: 'major',
    photoRecommended: true
  },
  {
    id: 'c04-05',
    categoryId: 'cat-04',
    title: 'Left Rear Quarter Panel & Fuel Lid Surround',
    whatToCheck: 'Inspect left C-pillar, rear shoulder, and fuel flap surround.',
    whereToFind: 'Left rear body structure above and behind rear wheel.',
    howToCheck: [
      'Inspect curve around rear wheel arch and fuel flap.',
      'Ensure paint depth and gloss match adjacent doors.'
    ],
    normalCondition: 'Flawless paint match and secure arch cladding.',
    rejectCondition: 'Scratch or dent on fixed quarter panel (difficult to replace).',
    severity: 'major',
    photoRecommended: true
  },
  {
    id: 'c04-06',
    categoryId: 'cat-04',
    title: 'Tailgate, Rear Bumper & Skid Plate',
    whatToCheck: 'Inspect rear tailgate skin, badging, rear bumper, reflectors, and lower skid plate.',
    whereToFind: 'Rear of vehicle.',
    howToCheck: [
      'Inspect sheet metal beneath rear windshield.',
      'Check reverse parking sensor bezels are flush.',
      'Inspect silver faux skid plate for ramp scrapes.'
    ],
    normalCondition: 'Sensors flush, skid plate unmarked, firm bumper attachment.',
    rejectCondition: 'Recessed parking sensor, cracked reflector, or scrape gouges.',
    severity: 'major',
    photoRecommended: true
  },
  {
    id: 'c04-07',
    categoryId: 'cat-04',
    title: 'Right Rear Quarter Panel',
    whatToCheck: 'Inspect right rear fixed side panel, rear wheel arch, and C-pillar.',
    whereToFind: 'Right side rear panel.',
    howToCheck: [
      'Sight along panel in daylight to verify uninterrupted reflections.'
    ],
    normalCondition: 'Even paint gloss, smooth curve, no indentations.',
    rejectCondition: 'Crease dent or paint defect on quarter panel.',
    severity: 'major',
    photoRecommended: true
  },
  {
    id: 'c04-08',
    categoryId: 'cat-04',
    title: 'Right Side Doors & Front Fender',
    whatToCheck: 'Inspect right side doors, door handles, and front wing panel.',
    whereToFind: 'Right side of vehicle.',
    howToCheck: [
      'Inspect sheet metal reflection along the entire right side.',
      'Check door edges and wheel arch cladding.'
    ],
    normalCondition: 'Smooth paint, undamaged cladding, flush panel seams.',
    rejectCondition: 'Scratches, parking dings, or loose cladding.',
    severity: 'major',
    photoRecommended: true
  },
  {
    id: 'c04-09',
    categoryId: 'cat-04',
    title: 'Outside Rear View Mirrors (ORVM) Housings',
    whatToCheck: 'Inspect left and right ORVM mirror skull caps and integrated turn indicator lenses.',
    whereToFind: 'Driver and passenger side door mirrors.',
    howToCheck: [
      'Check painted or gloss black skull cap for scrape marks.',
      'Check clear indicator LED lens for internal moisture or cracks.',
      'Gently pivot mirror to ensure sturdy pivot mount.'
    ],
    normalCondition: 'Unmarked mirror caps, crystal-clear lenses, sturdy pivot action.',
    rejectCondition: 'Scraped mirror cap, cracked indicator lens, or loose mirror housing.',
    severity: 'major',
    photoRecommended: true
  },
  {
    id: 'c04-10',
    categoryId: 'cat-04',
    title: 'Roof Panel, Roof Rails & Lower Side Sills',
    whatToCheck: 'Inspect roof for transport strap dents/hail damage and inspect lower body side sills.',
    whereToFind: 'Vehicle roof top and lower body sill claddings.',
    howToCheck: [
      'Sight across roof surface for depressions caused by transit tie-down straps.',
      'Check roof rails (if equipped) are bolted firmly.',
      'Inspect lower plastic side sills for curb scraping.'
    ],
    normalCondition: 'Flat, dent-free roof and intact lower sill claddings.',
    rejectCondition: 'Transit strap depression dent, hail dings, or cracked lower sill.',
    severity: 'major',
    photoRecommended: true
  },

  // =========================================================================
  // CATEGORY 05 — PAINT & BODY CONDITION (8 Checks)
  // =========================================================================
  {
    id: 'c05-01',
    categoryId: 'cat-05',
    title: 'Overall Colour & Shade Consistency',
    whatToCheck: 'Verify that paint shade on plastic bumpers matches metal doors and fenders in natural daylight.',
    whereToFind: 'Transition seams between bumper and fender, bonnet and wing.',
    howToCheck: [
      'Step back 3–4 meters in daylight and observe the car from various angles.',
      'Compare plastic bumper shade to adjacent metal fender.'
    ],
    normalCondition: 'Consistent Pristine White shade across all metal and plastic body panels.',
    rejectCondition: 'Noticeable yellowish or mismatched color variation between adjacent panels.',
    severity: 'major',
    whyItMatters: 'Noticeable color differences indicate aftermarket respraying after transit damage.',
    photoRecommended: true
  },
  {
    id: 'c05-02',
    categoryId: 'cat-05',
    title: 'Surface Scratches & Swirl Marks',
    whatToCheck: 'Inspect the clear coat for dry-cloth scratches, swirl marks, or deep scratches.',
    whereToFind: 'Bonnet, roof, and door panels under direct sun or flashlight.',
    howToCheck: [
      'Inspect reflections under direct sunlight or phone LED flashlight.',
      'Check if swirl marks or dealership washing scratches are present.'
    ],
    normalCondition: 'Clear, deep gloss without deep key scratches or heavy circular swirl marks.',
    rejectCondition: 'Deep scratch catching fingernail, or widespread dealership washing swirl damage.',
    severity: 'minor',
    photoRecommended: true
  },
  {
    id: 'c05-03',
    categoryId: 'cat-05',
    title: 'Stone Chips, Runs & Sagging',
    whatToCheck: 'Check for small stone chips down to primer, and inspect panel edges for wavy paint drips.',
    whereToFind: 'Front nose, bonnet edge, and bottom edges of doors.',
    howToCheck: [
      'Look closely at forward-facing surfaces for stone chips.',
      'Inspect lower panel hem lines for teardrop paint drips.'
    ],
    normalCondition: 'Zero paint chips; uniform robotic factory paint without sags or runs.',
    rejectCondition: 'Multiple stone chips exposing primer, or visible paint drip runs.',
    severity: 'major',
    photoRecommended: true
  },
  {
    id: 'c05-04',
    categoryId: 'cat-05',
    title: 'Overspray on Rubber Weatherstrips & Plastics',
    whatToCheck: 'Check for white paint mist or tape lines on black rubber seals and glass beadings.',
    whereToFind: 'Door window rubber channels, headlight gasket seals, and underbody plastic liners.',
    howToCheck: [
      'Examine black rubber gaskets touching painted metal.',
      'Check for white paint residue or sharp masking tape transition lines.'
    ],
    normalCondition: 'Rubber beadings and plastic trim are 100% free of paint residue.',
    rejectCondition: 'Paint overspray mist or masking tape lines on rubber/plastic components.',
    severity: 'major',
    whyItMatters: 'Conclusive evidence of a post-factory paint repair job.',
    photoRecommended: true
  },
  {
    id: 'c05-05',
    categoryId: 'cat-05',
    title: 'Consistent Panel Gaps (Left vs Right Symmetry)',
    whatToCheck: 'Compare bonnet-to-fender and door-to-door gap widths on left side versus right side.',
    whereToFind: 'Gaps between bonnet and front wings, doors and B-pillars, tailgate and rear quarters.',
    howToCheck: [
      'Compare left and right symmetry using a finger or visual measurement.',
      'Check that gaps are parallel from top to bottom (approx 3.5mm to 5mm).'
    ],
    normalCondition: 'Even, parallel, and symmetrical panel gaps between driver and passenger sides.',
    rejectCondition: 'Severely tapered gaps, one side twice as wide as the other, or panels rubbing.',
    severity: 'major',
    whyItMatters: 'Uneven gaps indicate misaligned chassis, hinges, or replaced panels.',
    photoRecommended: true
  },
  {
    id: 'c05-06',
    categoryId: 'cat-05',
    title: 'Door Flushness & Hinge Alignment',
    whatToCheck: 'Verify that doors sit completely flush with the body when closed.',
    whereToFind: 'Seams where front door meets rear door, and rear door meets quarter panel.',
    howToCheck: [
      'Run palm across the seam between front and rear doors.',
      'Check that front door trailing edge does not protrude or sink below the rear door.'
    ],
    normalCondition: 'Doors are completely flush with body side profile within ~1mm tolerance.',
    rejectCondition: 'Door visibly sticks out past body line, causing wind noise or water intrusion.',
    severity: 'major',
    photoRecommended: true
  },
  {
    id: 'c05-07',
    categoryId: 'cat-05',
    title: 'Tool Marks on Accessible Door & Bonnet Fasteners',
    whatToCheck: 'Inspect bolt heads on door hinges, bonnet hinges, and tailgate brackets for socket wrench tool marks.',
    whereToFind: 'Hinge bolts visible when doors, bonnet, and tailgate are opened.',
    howToCheck: [
      'Look closely at painted bolt heads holding door and bonnet hinges.',
      'Check for cracked paint on bolt shoulders or raw metal exposed by socket tools.'
    ],
    normalCondition: 'Original unbroken factory paint on all hinge bolt heads.',
    rejectCondition: 'Stripped paint or heavy socket wrench bite marks showing panel was removed/adjusted.',
    severity: 'major',
    whyItMatters: 'Fastener tool marks suggest panels were removed or adjusted after factory delivery, likely due to damage repair.',
    photoRecommended: true
  },
  {
    id: 'c05-08',
    categoryId: 'cat-05',
    title: 'Evidence of Accident or Transport Damage Repair',
    whatToCheck: 'Scan for multiple combined indicators of transit collision repairs.',
    whereToFind: 'A-pillars, inner wheel wells, radiator core support.',
    howToCheck: [
      'Combine observations: tool marks + mismatched paint + overspray + rough welding.',
      'Ask dealer directly if any transit incident occurred.'
    ],
    normalCondition: 'Zero cumulative evidence of structural repair or repainting.',
    rejectCondition: 'Multiple signs pointing to collision damage repair.',
    severity: 'critical',
    whyItMatters: 'Never accept a new car that has suffered structural transit collision damage.',
    photoRecommended: true
  },

  // =========================================================================
  // CATEGORY 06 — GLASS & WINDOWS (6 Checks)
  // =========================================================================
  {
    id: 'c06-01',
    categoryId: 'cat-06',
    title: 'Front Windshield Laminated Glass Condition',
    whatToCheck: 'Inspect laminated front windshield for cracks, stone bullseyes, or wiper scratches.',
    whereToFind: 'Front windshield.',
    howToCheck: [
      'Sit in driver seat and look outward into sunlight to detect distortion.',
      'Inspect glass from outside for stone chips or edge cracks.'
    ],
    normalCondition: 'Optically clear, chip-free, crack-free laminated glass.',
    rejectCondition: 'Any stone bullseye, star crack, or edge fracture (cracks spread rapidly).',
    severity: 'critical',
    whyItMatters: 'A cracked windshield fails safety certification and requires complete replacement.',
    photoRecommended: true
  },
  {
    id: 'c06-02',
    categoryId: 'cat-06',
    title: 'All Side Door Window Glasses',
    whatToCheck: 'Inspect all 4 side door window glasses for scratches and smooth movement.',
    whereToFind: 'Front and rear door windows on both sides.',
    howToCheck: [
      'Roll all 4 windows down and up completely.',
      'Inspect glass surfaces for vertical scratch marks or chips.'
    ],
    normalCondition: 'Clean, scratch-free glass panes operating smoothly in channels.',
    rejectCondition: 'Deep vertical gouges, cracked pane, or glass rattling in channel.',
    severity: 'minor'
  },
  {
    id: 'c06-03',
    categoryId: 'cat-06',
    title: 'Rear Tailgate Windshield Glass',
    whatToCheck: 'Inspect rear windshield for cracks, scratches, and secure bonding.',
    whereToFind: 'Tailgate window.',
    howToCheck: [
      'Inspect glass perimeter and around high-mount stop lamp.'
    ],
    normalCondition: 'Solid, scratch-free glass properly bonded to tailgate frame.',
    rejectCondition: 'Cracks, chips, or unglued glass perimeter sections.',
    severity: 'critical',
    photoRecommended: true
  },
  {
    id: 'c06-04',
    categoryId: 'cat-06',
    title: 'Glass Manufacturer Markings & Code Consistency',
    whatToCheck: 'Verify that all glass panes bear identical manufacturer logos and matching date codes.',
    whereToFind: 'Corner etching logo on all window panes (e.g. Asahi India AIS / Saint-Gobain Sekurit).',
    howToCheck: [
      'Inspect bottom corner logo on front windshield, side windows, and rear glass.',
      'Check manufacturer brand name and year dot pattern.'
    ],
    normalCondition: 'Consistent glass manufacturer logo and corresponding production date codes across all panes.',
    rejectCondition: 'One window has a completely different brand logo or much newer date code (indicates post-accident replacement).',
    severity: 'major',
    whyItMatters: 'Mismatched glass is a classic red flag for stockyard transit glass breakage or collision.',
    photoRecommended: true
  },
  {
    id: 'c06-05',
    categoryId: 'cat-06',
    title: 'Rear Defogger Copper Grid Lines',
    whatToCheck: 'Inspect horizontal heating lines printed on rear windshield for breaks.',
    whereToFind: 'Inside surface of rear windshield.',
    howToCheck: [
      'Look closely across all horizontal copper heating filament tracks.',
      'Ensure no scratches have cut through any copper line.'
    ],
    normalCondition: 'Continuous, unbroken heating lines across the entire rear glass.',
    rejectCondition: 'Broken or scratched-through defogger tracks (breaks circuit and stops defrosting).',
    severity: 'major',
    photoRecommended: true
  },
  {
    id: 'c06-06',
    categoryId: 'cat-06',
    title: 'Wiper Blades & Washer Spray Jets',
    whatToCheck: 'Check front and rear wiper rubber condition and washer spray trajectories.',
    whereToFind: 'Wipers on front windshield and rear tailgate.',
    howToCheck: [
      'Lift wiper arms gently; check rubber squeegee for tears or hardening.',
      'Spray washer fluid: ensure dual jets spray properly on glass sweep zones.'
    ],
    normalCondition: 'Supple rubber, streak-free wipe, and forceful, properly aimed washer jets.',
    rejectCondition: 'Torn rubber blade scratching glass or completely clogged washer nozzles.',
    severity: 'minor'
  },

  // =========================================================================
  // CATEGORY 07 — TYRES & WHEELS (8 Checks)
  // =========================================================================
  {
    id: 'c07-01',
    categoryId: 'cat-07',
    title: 'All 4 Road Tyres Tread Condition & Molding Whiskers',
    whatToCheck: 'Inspect all 4 road tyres for factory rubber mold whiskers, unused tread, and absence of damage.',
    whereToFind: 'All 4 road wheels.',
    howToCheck: [
      'Look at tread surfaces: factory rubber mold vent whiskers should be visible on shoulders.',
      'Check tread grooves for stones, nails, or abnormal scrub wear.'
    ],
    normalCondition: 'Fresh, unused tread with factory molding nubs; zero cuts or punctures.',
    rejectCondition: 'Heavily scrubbed tread, embedded nail, flat spot, or gouged rubber.',
    severity: 'major',
    photoRecommended: true
  },
  {
    id: 'c07-02',
    categoryId: 'cat-07',
    title: 'Tyre Brand Consistency Across All Road Wheels',
    whatToCheck: 'Confirm all 4 road tyres are identical brand and model (e.g. Goodyear / Bridgestone / MRF / Apollo).',
    whereToFind: 'Outer sidewall brand embossment on all 4 tyres.',
    howToCheck: [
      'Read brand name and model on all 4 wheels.'
    ],
    normalCondition: 'All 4 road tyres are the exact same make and model line.',
    rejectCondition: 'Mismatched tyre brands or model patterns across the 4 road wheels.',
    severity: 'critical',
    whyItMatters: 'Brand mismatch on a new car indicates a punctured or damaged tyre was replaced with whatever the dealer had in stock.'
  },
  {
    id: 'c07-03',
    categoryId: 'cat-07',
    title: 'Tyre Size Specification Match',
    whatToCheck: 'Verify tyre size matches variant specifications (e.g. 195/60 R16 or 215/60 R16).',
    whereToFind: 'Tyre sidewall and driver B-pillar tyre placard.',
    howToCheck: [
      'Read the size code on all 4 tyres.',
      'Compare against the factory tyre pressure sticker on the driver door jamb.'
    ],
    normalCondition: 'All 4 tyres match the exact factory specified size and load/speed rating.',
    rejectCondition: 'Incorrect tyre width, profile, or rim size.',
    severity: 'critical',
    whyItMatters: 'Incorrect tyre dimensions alter speedometer calibration, ABS calibration, and ground clearance.'
  },
  {
    id: 'c07-04',
    categoryId: 'cat-07',
    title: 'Tyre Sidewall Bulge & Kerb Damage Inspection',
    whatToCheck: 'Check outer and inner tyre sidewalls for impact bulges, bubbles, or deep cuts.',
    whereToFind: 'Sidewalls of all 4 road wheels.',
    howToCheck: [
      'Shine flashlight along the vertical plane of each tyre sidewall.',
      'Check for egg-shaped protrusions (hernias) caused by potholes or kerb hits during transit.'
    ],
    normalCondition: 'Smooth, uniform sidewall surface without any bulges, blisters, or cuts.',
    rejectCondition: 'Any bubble/bulge on tyre sidewall (indicates severed internal cord; blowout risk).',
    severity: 'critical',
    whyItMatters: 'A sidewall bubble is a catastrophic failure waiting to happen at highway speeds.',
    photoRecommended: true
  },
  {
    id: 'c07-05',
    categoryId: 'cat-07',
    title: 'Tyre Manufacturing Date Code (DOT Code)',
    whatToCheck: 'Decode the 4-digit DOT week/year code stamped on each tyre sidewall.',
    whereToFind: 'Oval depression on tyre sidewall following "DOT" lettering (e.g. [2426]).',
    howToCheck: [
      'Find the 4-digit oval stamp on each tyre.',
      'First 2 digits = week of manufacture; last 2 digits = year.',
      'Ensure tyre manufacturing date is within 2–4 months of car assembly date.'
    ],
    normalCondition: 'All tyres manufactured within a few weeks of each other and within 6 months of car delivery.',
    rejectCondition: 'Tyre is over 1 year old or one tyre is significantly older than the others.',
    severity: 'major',
    whyItMatters: 'Old stock tyres suffer from hardened rubber compound and reduced braking performance.'
  },
  {
    id: 'c07-06',
    categoryId: 'cat-07',
    title: 'Wheel Rim / Alloy Wheel Finish & Curb Scrapes',
    whatToCheck: 'Inspect steel wheel rims / wheel covers / alloy wheels for scratches, gouges, or bends.',
    whereToFind: 'Outer rim lips on all 4 wheels.',
    howToCheck: [
      'Inspect outer perimeter lip of each wheel where it meets the tyre.',
      'Check wheel covers (if equipped) are firmly snapped on and free of scuffs.'
    ],
    normalCondition: 'Flawless paint/diamond-cut finish with zero curb gouges or lip deformation.',
    rejectCondition: 'Bent rim lip, deep curb rash, or cracked plastic wheel cover.',
    severity: 'major',
    photoRecommended: true
  },
  {
    id: 'c07-07',
    categoryId: 'cat-07',
    title: 'Wheel Lug Nuts Presence & Security',
    whatToCheck: 'Confirm all 4 wheel nuts are present and torqued on every wheel.',
    whereToFind: 'Wheel center hubs (all 4 wheels).',
    howToCheck: [
      'Count 4 wheel nuts per wheel.',
      'Check for missing nuts or loose nuts.'
    ],
    normalCondition: 'All 16 lug nuts present, clean, and properly tightened.',
    rejectCondition: 'Any missing lug nut, stripped stud, or loose wheel nut.',
    severity: 'critical',
    whyItMatters: 'A missing or loose lug nut is an extreme safety hazard.',
    photoRecommended: true
  },
  {
    id: 'c07-08',
    categoryId: 'cat-07',
    title: 'Spare Tyre / Puncture Repair Kit Condition',
    whatToCheck: 'Inspect spare tyre under boot floor / underbody, or Tyre Mobility Kit (compressor + sealant) for iCNG.',
    whereToFind: 'Boot storage or under-chassis mount.',
    howToCheck: [
      'In Tata Nexon iCNG with twin cylinders, check the designated spare tyre mount or factory 12V tyre inflator & sealant bottle kit.',
      'Check expiry date on chemical tyre sealant canister.',
      'Test 12V tyre inflator plug.'
    ],
    normalCondition: 'Spare tyre or complete, unexpired tyre puncture repair kit and 12V pump present.',
    rejectCondition: 'Missing spare tyre / missing 12V inflator kit or expired sealant bottle.',
    severity: 'major',
    photoRecommended: true
  },

  // =========================================================================
  // CATEGORY 08 — ENGINE BAY (6 Checks)
  // =========================================================================
  {
    id: 'c08-01',
    categoryId: 'cat-08',
    title: 'Engine Bay Cleanliness & Absence of Rodent Marks',
    whatToCheck: 'Inspect under-bonnet area for dust, leaves, chewed insulation, or rodent droppings.',
    whereToFind: 'Engine compartment under bonnet.',
    howToCheck: [
      'Pull bonnet release lever in driver footwell and open bonnet.',
      'Engage bonnet stay rod securely into marked slot.',
      'Shine flashlight around engine bay, firewall, and corners.',
      'Look for rodent hair, droppings, food bones, or chewed foam.'
    ],
    normalCondition: 'Clean factory engine bay free of dirt accumulation, rodent droppings, or chewed parts.',
    rejectCondition: 'Rodent droppings, chewed wires, or nests (common in open dealership stockyards).',
    severity: 'critical',
    whyItMatters: 'Rodent damage can silently chew wiring harnesses causing intermittent electrical shorts and fire risk.',
    photoRecommended: true
  },
  {
    id: 'c08-02',
    categoryId: 'cat-08',
    title: 'Visible Engine Oil Seepage or Weeping',
    whatToCheck: 'Inspect cylinder head cover, gasket seams, and timing cover for fresh oil wetness.',
    whereToFind: 'Top and front of the 1.2L Revotron engine block.',
    howToCheck: [
      'Shine flashlight around valve cover gasket perimeter.',
      'Touch cylinder head seams with clean finger; check for wet oil.'
    ],
    normalCondition: 'Completely bone-dry metal seams and gaskets.',
    rejectCondition: 'Fresh wet engine oil weeping from cylinder head gasket or valve cover.',
    severity: 'critical',
    whyItMatters: 'Oil leaks on a brand-new factory engine indicate defective gaskets or improper factory assembly torque.',
    photoRecommended: true
  },
  {
    id: 'c08-03',
    categoryId: 'cat-08',
    title: 'Coolant Hose Connections & Radiator Seals',
    whatToCheck: 'Inspect upper and lower radiator rubber hoses, spring clamps, and thermostat housing.',
    whereToFind: 'Front of engine bay connecting engine block to radiator.',
    howToCheck: [
      'Check rubber hoses for cuts, kinked bends, or soft spots.',
      'Inspect hose ends for white/pink crusty dried coolant stains.'
    ],
    normalCondition: 'Supple rubber hoses, spring clamps centered in marked zones, zero coolant residue.',
    rejectCondition: 'Pink/green crusty coolant leak stains, kinked hose, or loose hose clamp.',
    severity: 'critical',
    safetyWarning: 'Do not touch hot engine components or open pressurized cooling systems.',
    photoRecommended: true
  },
  {
    id: 'c08-04',
    categoryId: 'cat-08',
    title: 'Wiring Harness Routing, Clips & Loom Integrity',
    whatToCheck: 'Verify main electrical wiring harnesses are neatly routed and properly secured in plastic conduit.',
    whereToFind: 'Throughout engine bay, running to ECU, fuse box, and sensors.',
    howToCheck: [
      'Inspect corrugated plastic loom covering wire bundles.',
      'Ensure harnesses are snapped into factory plastic stay-clips and not dangling near hot exhaust.',
      'Check for exposed copper wires or electrical tape wrap.'
    ],
    normalCondition: 'Neat factory routing, all harness clips snapped in, corrugated sheath intact.',
    rejectCondition: 'Dangling wires rubbing against pulleys/exhaust, or spliced wires wrapped with manual PVC tape.',
    severity: 'critical',
    photoRecommended: true
  },
  {
    id: 'c08-05',
    categoryId: 'cat-08',
    title: '12V Starter Battery Mounting, Terminals & Brand',
    whatToCheck: 'Confirm 12V starter battery is clamped down securely and terminals are clean and tight.',
    whereToFind: 'Engine bay 12V battery tray.',
    howToCheck: [
      'Grip battery body firmly; verify hold-down clamp is tight.',
      'Inspect terminal posts: ensure clean tight clamps coated with protective petroleum gel.',
      'Check green charge indicator eye and battery warranty card.'
    ],
    normalCondition: 'Solidly clamped battery, clean tight terminals, green state-of-charge indicator.',
    rejectCondition: 'Loose battery in tray, white sulfate powder corrosion, or loose terminal clamp.',
    severity: 'major',
    photoRecommended: true
  },
  {
    id: 'c08-06',
    categoryId: 'cat-08',
    title: 'Front Aprons & Strut Towers Structural Integrity',
    whatToCheck: 'Inspect suspension strut towers and front inner fender aprons for original spot welds.',
    whereToFind: 'Left and right metal inner aprons supporting front shock absorbers.',
    howToCheck: [
      'Inspect circular factory spot welds and robotic seam sealer.',
      'Ensure identical appearance on left and right shock towers.',
      'Check for cracked paint, ripples, or fresh spray paint.'
    ],
    normalCondition: 'Uniform factory spot welds with intact primer and clear coat.',
    rejectCondition: 'Wrinkled metal, uneven weld beads, or cracked paint indicating collision rebuild.',
    severity: 'critical',
    whyItMatters: 'Any structural damage or straightening on strut towers compromises vehicle crash safety.',
    photoRecommended: true
  },

  // =========================================================================
  // CATEGORY 09 — FLUIDS & VISIBLE MECHANICAL COMPONENTS (5 Checks)
  // =========================================================================
  {
    id: 'c09-01',
    categoryId: 'cat-09',
    title: 'Engine Oil Level & Clarity on Dipstick',
    whatToCheck: 'Check oil level, consistency, and color using the engine oil dipstick.',
    whereToFind: 'Yellow/bright ring dipstick handle on engine front.',
    howToCheck: [
      'Ensure vehicle is parked on level ground and engine has been off for a few minutes.',
      'Pull out dipstick, wipe clean with clean tissue, reinsert fully, and pull out again.',
      'Verify oil film sits comfortably between "MIN" and "MAX" hole markers.',
      'Inspect oil color: should be translucent golden-amber, not jet black or milky.'
    ],
    normalCondition: 'Oil level between MIN and MAX marks; clear golden-amber appearance.',
    rejectCondition: 'Oil below MIN mark, overfilled well above MAX, or milky/frothy (indicates coolant contamination).',
    severity: 'critical',
    whyItMatters: 'Running with low or contaminated oil permanently damages engine bearings.',
    photoRecommended: true
  },
  {
    id: 'c09-02',
    categoryId: 'cat-09',
    title: 'Engine Coolant Level in Expansion Tank',
    whatToCheck: 'Inspect coolant level in translucent plastic surge tank.',
    whereToFind: 'Plastic expansion tank near radiator with coolant symbol.',
    howToCheck: [
      'Look through translucent plastic tank side without opening cap.',
      'Check coolant liquid line relative to molded "MIN" and "MAX" ridges.',
      'Confirm bright pink or blue/green color of OEM coolant.'
    ],
    normalCondition: 'Coolant level between MIN and MAX marks; clear bright fluid.',
    rejectCondition: 'Coolant tank completely dry, below MIN, or containing oily film/sludge.',
    severity: 'critical',
    safetyWarning: 'Never open coolant expansion tank cap while engine is warm or hot!',
    photoRecommended: true
  },
  {
    id: 'c09-03',
    categoryId: 'cat-09',
    title: 'Brake & Clutch Fluid Reservoir Level',
    whatToCheck: 'Verify brake fluid level in transparent master cylinder reservoir.',
    whereToFind: 'Mounted on brake booster at driver-side firewall.',
    howToCheck: [
      'Shine flashlight through side of reservoir.',
      'Check fluid level is between "MIN" and "MAX" lines.',
      'Check fluid clarity: should be clear/straw yellow.'
    ],
    normalCondition: 'Fluid level near MAX line; clear light-amber fluid.',
    rejectCondition: 'Fluid below MIN line or dark dirty brown color.',
    severity: 'critical',
    whyItMatters: 'Brake fluid level drops indicate hydraulic leaks in braking or clutch lines.',
    photoRecommended: true
  },
  {
    id: 'c09-04',
    categoryId: 'cat-09',
    title: 'Windshield Washer Fluid Level',
    whatToCheck: 'Check washer reservoir fluid level and secure cap closure.',
    whereToFind: 'Blue cap with windshield wiper symbol in engine bay.',
    howToCheck: [
      'Flip open blue cap and verify fluid is filled.',
      'Snap cap back down firmly.'
    ],
    normalCondition: 'Washer reservoir filled with clean fluid and cap secured.',
    rejectCondition: 'Reservoir empty or cap broken/missing.',
    severity: 'minor'
  },
  {
    id: 'c09-05',
    categoryId: 'cat-09',
    title: 'Ground Underbody Fluid Stains / Drips',
    whatToCheck: 'Inspect dealership showroom/pavement floor directly beneath the parked car for fresh fluid puddles.',
    whereToFind: 'Floor beneath engine sump, gearbox, and radiator.',
    howToCheck: [
      'Look under the car at the floor with flashlight before moving car.',
      'Check for oily spots (engine/gear oil), sweet pink puddles (coolant), or clear oily drips (brake fluid).'
    ],
    normalCondition: 'Dry floor beneath car (clear water drips from AC drain pipe after running AC are completely normal).',
    rejectCondition: 'Fresh oil, coolant, or brake fluid puddle on floor beneath engine.',
    severity: 'critical',
    whyItMatters: 'Puddles on the floor indicate an active mechanical leak requiring dealer workshop attention.',
    photoRecommended: true
  },

  // =========================================================================
  // CATEGORY 10 — CNG SYSTEM SAFETY INSPECTION (10 Checks)
  // =========================================================================
  {
    id: 'c10-01',
    categoryId: 'cat-10',
    title: 'CNG Filler Receptacle & Dust Cap',
    whatToCheck: 'Inspect high-pressure NGV1 CNG refilling nozzle and protective rubber/brass dust plug.',
    whereToFind: 'Inside fuel flap door alongside petrol filler neck.',
    howToCheck: [
      'Open the fuel filler door.',
      'Check the CNG filler nipple: threads clean, O-ring intact, brass receptacle undamaged.',
      'Confirm the protective dust cap with tether is firmly installed over the nozzle.'
    ],
    normalCondition: 'Clean brass/steel receptacle, intact inner sealing O-ring, and secure dust cap.',
    rejectCondition: 'Damaged filler nozzle, missing sealing O-ring, or missing dust cap allowing grit into gas lines.',
    severity: 'critical',
    safetyWarning: 'Visual inspection only. Never insert screwdrivers, tools, or depressurized objects into CNG filler.',
    photoRecommended: true,
    applicableTo: { fuelTypes: ['CNG'] }
  },
  {
    id: 'c10-02',
    categoryId: 'cat-10',
    title: 'Fuel Flap Micro-Switch Safety Interlock',
    whatToCheck: 'Inspect the micro-switch that prevents engine start while fuel lid is open (Tata iCNG safety feature).',
    whereToFind: 'Rim of fuel filler compartment housing.',
    howToCheck: [
      'Locate small rubber-booted spring microswitch on fuel flap perimeter.',
      'Verify switch plunges freely and rubber boot is intact.',
      'Confirm in user manual: car should disable engine cranking while flap is ajar.'
    ],
    normalCondition: 'Intact rubber boot, smooth plunger action, no loose wiring behind switch.',
    rejectCondition: 'Broken switch plunger, cut microswitch wires, or bypassed safety switch.',
    severity: 'critical',
    whyItMatters: 'Safety interlock prevents accidental drive-away while CNG dispenser nozzle is connected at gas station.',
    photoRecommended: true,
    applicableTo: { fuelTypes: ['CNG'] }
  },
  {
    id: 'c10-03',
    categoryId: 'cat-10',
    title: 'CNG Mandatory Safety Warning Labels & Plate',
    whatToCheck: 'Confirm official statutory CNG warning labels and compliance plate are affixed.',
    whereToFind: 'Inside fuel lid, near battery, on boot floor, and on windshield.',
    howToCheck: [
      'Check for green "CNG" circular stickers on front and rear windshields (mandated by RTO).',
      'Check for CNG compliance information plate showing test date and cylinder serial numbers.'
    ],
    normalCondition: 'All regulatory CNG warning stickers, RTO windshield emblems, and compliance data plates present.',
    rejectCondition: 'Missing CNG compliance plate or missing statutory stickers.',
    severity: 'major',
    photoRecommended: true,
    applicableTo: { fuelTypes: ['CNG'] }
  },
  {
    id: 'c10-04',
    categoryId: 'cat-10',
    title: 'Twin CNG Cylinders Physical Enclosure & Packaging',
    whatToCheck: 'Inspect the dual-cylinder compartment packaging in the boot of Nexon iCNG.',
    whereToFind: 'Under the raised boot luggage floor.',
    howToCheck: [
      'Lift the modular boot floor carpet.',
      'Inspect the protective steel cage and composite cover housing the twin tanks.',
      'Ensure the luggage floor panel sits flat over the enclosure.'
    ],
    normalCondition: 'Solid, rigid packaging structure; twin tanks protected by factory enclosure.',
    rejectCondition: 'Damaged enclosure frame, loose cover, or floor lid unable to sit flat.',
    severity: 'major',
    photoRecommended: true,
    applicableTo: { fuelTypes: ['CNG'] }
  },
  {
    id: 'c10-05',
    categoryId: 'cat-10',
    title: 'CNG Cylinder Mounting Brackets & Fastener Security',
    whatToCheck: 'Verify heavy-duty cylinder mounting cradle bolts are securely fastened to vehicle chassis floor.',
    whereToFind: 'Base of cylinder cradle in boot floor.',
    howToCheck: [
      'Inspect visible cradle mounting bolts and rubber isolation pads.',
      'Ensure lock nuts have intact factory torque mark paint stripes.'
    ],
    normalCondition: 'Heavy steel brackets bolted solidly with rubber isolation bushes and intact factory paint marks.',
    rejectCondition: 'Loose cradle bolts, missing rubber vibration dampers, or cracked bracket.',
    severity: 'critical',
    whyItMatters: 'Loose cylinder mountings could shift under heavy braking or accident impact.',
    photoRecommended: true,
    applicableTo: { fuelTypes: ['CNG'] }
  },
  {
    id: 'c10-06',
    categoryId: 'cat-10',
    title: 'Visual Cylinder Surface Condition (Zero Scratches/Dents)',
    whatToCheck: 'Visually inspect visible painted surfaces of the steel cylinders through access openings.',
    whereToFind: 'Cylinder shell surfaces.',
    howToCheck: [
      'Shine flashlight across cylinder outer paint.',
      'Check for transport scrapes, gouges, corrosion, or tool marks.'
    ],
    normalCondition: 'Smooth, unbroken factory paint on cylinders with zero gouges, dents, or rust spots.',
    rejectCondition: 'Deep metal scratch, dent in cylinder shell, or corrosion on tank surface.',
    severity: 'critical',
    safetyWarning: 'Never impact or tamper with high pressure cylinders.',
    photoRecommended: true,
    applicableTo: { fuelTypes: ['CNG'] }
  },
  {
    id: 'c10-07',
    categoryId: 'cat-10',
    title: 'High-Pressure Stainless Steel CNG Pipe Integrity',
    whatToCheck: 'Inspect visible high-pressure gas routing lines in engine bay and underbody entry points.',
    whereToFind: 'Engine bay firewall and underbody routing channels.',
    howToCheck: [
      'Inspect stainless steel high-pressure tubes.',
      'Ensure pipes are clipped into rubber-lined chassis brackets and have no sharp bends or kinks.',
      'Ensure pipes maintain safe clearance from hot exhaust headers.'
    ],
    normalCondition: 'Smooth, unkinked stainless steel lines cleanly clipped with proper heat shielding.',
    rejectCondition: 'Kinked, flattened, bent, or dented gas pipe, or pipe touching hot exhaust.',
    severity: 'critical',
    whyItMatters: 'Kinked gas pipes can burst under 200 bar storage pressures.',
    photoRecommended: true,
    applicableTo: { fuelTypes: ['CNG'] }
  },
  {
    id: 'c10-08',
    categoryId: 'cat-10',
    title: 'CNG Odor Check (Zero Mercaptan / Rotten Egg Smell)',
    whatToCheck: 'Use your nose to smell for odorized natural gas (distinct sulfur/rotten egg odor).',
    whereToFind: '1) Inside cabin, 2) inside boot luggage area, 3) around fuel filler lid, 4) in engine bay.',
    howToCheck: [
      'Sniff carefully around the boot area with boot open.',
      'Sniff near the fuel flap.',
      'Sniff inside closed cabin after car has been sitting.',
      'Sniff inside engine bay near pressure regulator.'
    ],
    normalCondition: '100% free of any gas odor in all areas.',
    rejectCondition: 'Any detectable smell of CNG / sulfur odorant anywhere on the vehicle.',
    severity: 'critical',
    safetyWarning: 'If any CNG gas smell is detected, STOP inspection immediately, move away from ignition sources, and notify dealership emergency personnel.',
    whyItMatters: 'A gas smell indicates an active high-pressure gas leak, creating immediate fire/explosion hazard.',
    applicableTo: { fuelTypes: ['CNG'] }
  },
  {
    id: 'c10-09',
    categoryId: 'cat-10',
    title: 'CNG Fuel Level Gauge & Mode Indicator on Cluster',
    whatToCheck: 'Verify digital instrument cluster displays the CNG gas level indicator bar and active fuel LED.',
    whereToFind: 'Instrument cluster display screen.',
    howToCheck: [
      'Turn ignition ON.',
      'Check for dedicated CNG fuel gauge with green CNG icon.',
      'Confirm fuel bar displays current gas pressure in cylinders.'
    ],
    normalCondition: 'Cluster clearly displays CNG fuel level bars matching dealer fill level.',
    rejectCondition: 'CNG fuel gauge blank, flashing error bars, or unlit indicator.',
    severity: 'major',
    photoRecommended: true,
    applicableTo: { fuelTypes: ['CNG'] }
  },
  {
    id: 'c10-10',
    categoryId: 'cat-10',
    title: 'CNG Cylinder Hydrostatic Test Certificate & Serial Numbers',
    whatToCheck: 'Reconcile stamped cylinder serial numbers with the OEM Hydrostatic Test Certificate.',
    whereToFind: 'Documentation dossier and cylinder neck plate.',
    howToCheck: [
      'Examine the official PESO / cylinder manufacturing test certificate.',
      'Confirm cylinder serial number and test date (valid for 3 years from manufacture).',
      'Verify matching serial numbers on Form 22.'
    ],
    normalCondition: 'Original stamped test certificate provided with 100% matching cylinder serial numbers.',
    rejectCondition: 'Missing cylinder test certificate or mismatched cylinder serial numbers.',
    severity: 'critical',
    whyItMatters: 'Mandatory document for vehicle registration and future mandatory 3-year cylinder re-testing.',
    photoRecommended: true,
    applicableTo: { fuelTypes: ['CNG'] }
  },

  // =========================================================================
  // CATEGORY 11 — BOOT & LUGGAGE AREA (6 Checks)
  // =========================================================================
  {
    id: 'c11-01',
    categoryId: 'cat-11',
    title: 'Tailgate Gas Struts Lifting Action',
    whatToCheck: 'Test twin pneumatic tailgate lift supports for smooth opening and holding force.',
    whereToFind: 'Sides of tailgate opening.',
    howToCheck: [
      'Press electric tailgate release button and guide lid up.',
      'Ensure struts lift the tailgate smoothly to maximum height without manual force.',
      'Check that tailgate remains held up securely without sagging down.'
    ],
    normalCondition: 'Smooth, silent opening; struts hold tailgate firmly open.',
    rejectCondition: 'Weak struts allowing tailgate to drop, oily residue on strut pistons, or loud hissing.',
    severity: 'major',
    photoRecommended: true
  },
  {
    id: 'c11-02',
    categoryId: 'cat-11',
    title: 'Tailgate Electric Latch & Soft-Touch Release',
    whatToCheck: 'Test electric tailgate microswitch and motorized latch mechanism.',
    whereToFind: 'Under tailgate handle recess and inner lock striker.',
    howToCheck: [
      'Close tailgate with moderate pressure: latch should engage solidly on first click.',
      'Press exterior release switch: latch should unlock instantly with clean motorized click.'
    ],
    normalCondition: 'Locks securely on first try; releases instantly via button.',
    rejectCondition: 'Requires slamming to latch, or electric release button fails to unlock.',
    severity: 'major'
  },
  {
    id: 'c11-03',
    categoryId: 'cat-11',
    title: 'Boot Floor Carpet & Modular Tray Fitment',
    whatToCheck: 'Inspect boot floor carpet panel covering the iCNG cylinders for fit and cleanliness.',
    whereToFind: 'Luggage compartment floor.',
    howToCheck: [
      'Inspect carpet surface for stains, water marks, or tearing.',
      'Confirm floor board sits flat on its perimeter support ledges.'
    ],
    normalCondition: 'Clean, flat, well-supported floor carpet without bowing.',
    rejectCondition: 'Warped board, torn carpet, or inability to support normal luggage.',
    severity: 'minor'
  },
  {
    id: 'c11-04',
    categoryId: 'cat-11',
    title: 'Moisture & Water Ingress Under Boot Carpet',
    whatToCheck: 'Check metal floor pan and corners beneath carpet for water accumulation.',
    whereToFind: 'Deep corners of boot floor pan and spare wheel well.',
    howToCheck: [
      'Lift boot floor board and inspect metal floor corners with flashlight.',
      'Feel for dampness or pooled water from dealership pressure washing.'
    ],
    normalCondition: 'Completely dry, clean painted metal floor.',
    rejectCondition: 'Dampness, pooling water, or musty mildew smell (indicates leaking taillight or tailgate gasket seal).',
    severity: 'major',
    whyItMatters: 'Water leaks inside the boot lead to chronic rusting, mold, and electrical shorts in rear harnesses.',
    photoRecommended: true
  },
  {
    id: 'c11-05',
    categoryId: 'cat-11',
    title: 'Vehicle Tool Kit, Jack & Handle Completeness',
    whatToCheck: 'Verify complete factory emergency tool pouch and mechanical scissor jack are provided.',
    whereToFind: 'Dedicated foam organizer in boot or tool compartment.',
    howToCheck: [
      'Check wheel nut spanner, reversible screwdriver, and jack handle.',
      'Inspect scissor jack threads for clean factory lubrication.'
    ],
    normalCondition: 'Complete, unused factory tool kit and functional jack present.',
    rejectCondition: 'Missing tool pouch or missing wheel nut spanner/jack.',
    severity: 'major'
  },
  {
    id: 'c11-06',
    categoryId: 'cat-11',
    title: 'Emergency Tow Hook, Warning Triangle & Boot Lamp',
    whatToCheck: 'Verify reflective hazard warning triangle, screw-in towing eye, and boot illumination light.',
    whereToFind: 'Boot side compartments and trim wall.',
    howToCheck: [
      'Check foldable red reflective triangle in carrying case.',
      'Confirm threaded screw-in steel towing eye bolt is present.',
      'Verify boot courtesy lamp illuminates when tailgate opens.'
    ],
    normalCondition: 'Triangle and tow eye present; boot light illuminates automatically.',
    rejectCondition: 'Missing mandatory reflective triangle or dead boot lamp.',
    severity: 'minor'
  },

  // =========================================================================
  // CATEGORY 12 — INTERIOR CONDITION (6 Checks)
  // =========================================================================
  {
    id: 'c12-01',
    categoryId: 'cat-12',
    title: 'Dashboard Fit, Seams & Air Vent Louvers',
    whatToCheck: 'Inspect dashboard assembly, mid-pad trim pieces, and air vent surrounds.',
    whereToFind: 'Full dashboard fascia.',
    howToCheck: [
      'Sight along the full width of the dashboard.',
      'Press gently around glovebox, center console, and air vents to check for loose assembly or creaks.',
      'Check alignment of decorative trim inserts.'
    ],
    normalCondition: 'Tight, even fitment across all dashboard panels without creaks or misaligned edges.',
    rejectCondition: 'Misaligned trim pieces, visible gaps between dashboard sections, or broken vent louvers.',
    severity: 'major',
    photoRecommended: true
  },
  {
    id: 'c12-02',
    categoryId: 'cat-12',
    title: 'Door Trim Panels & Armrests Condition',
    whatToCheck: 'Inspect all 4 door inner cards, armrests, and bottle holders for scratches.',
    whereToFind: 'Inside face of all 4 doors.',
    howToCheck: [
      'Inspect plastic mold lines and fabric/soft inserts on armrests.',
      'Check door map pockets for grease or scuff marks.'
    ],
    normalCondition: 'Spotless surfaces with clean fabric and firmly attached door cards.',
    rejectCondition: 'Deep scratches on plastic, loose door card clips, or stained armrests.',
    severity: 'minor',
    photoRecommended: true
  },
  {
    id: 'c12-03',
    categoryId: 'cat-12',
    title: 'Center Console & Storage Compartment',
    whatToCheck: 'Inspect center console tunnel, handbrake surround, cup holders, and armrest storage.',
    whereToFind: 'Between front driver and passenger seats.',
    howToCheck: [
      'Open center storage box / armrest lid.',
      'Check cup holders and ensure console is anchored securely without rocking sideways.'
    ],
    normalCondition: 'Sturdy, firmly anchored center console with smooth lid action.',
    rejectCondition: 'Wobbly console, broken hinge, or cracked plastic.',
    severity: 'minor'
  },
  {
    id: 'c12-04',
    categoryId: 'cat-12',
    title: 'Roof Headliner (Roof Fabric) Cleanliness & Sagging',
    whatToCheck: 'Inspect fabric headliner across entire ceiling for oil stains, handprints, or sagging.',
    whereToFind: 'Vehicle ceiling from windshield to tailgate.',
    howToCheck: [
      'Look across roof fabric under daylight.',
      'Check around sun visors, grab handles, and cabin dome lights.',
      'Look for greasy mechanic fingerprints from factory assembly.'
    ],
    normalCondition: 'Immaculately clean, taut fabric without sagging, wrinkles, or grease marks.',
    rejectCondition: 'Black grease fingerprints, sagging fabric, or water stain marks on headliner.',
    severity: 'major',
    whyItMatters: 'Headliner grease stains are nearly impossible to clean completely and often require roof replacement.',
    photoRecommended: true
  },
  {
    id: 'c12-05',
    categoryId: 'cat-12',
    title: 'Cabin Reading Lights & Sun Visors',
    whatToCheck: 'Test front map reading lights, central dome light, and driver/passenger sun visors.',
    whereToFind: 'Center roof console and upper windshield frame.',
    howToCheck: [
      'Test switch positions: "ON", "OFF", and "DOOR".',
      'Open door: verify light turns on; close door: verify theater dimming effect.',
      'Swivel sun visors: check firm clipping and passenger vanity mirror.'
    ],
    normalCondition: 'Bright, instant illumination with functioning theater dimming; visors stay clipped firmly.',
    rejectCondition: 'Bulb/LED dead, switch loose, or drooping sun visor that falls down while driving.',
    severity: 'minor'
  },
  {
    id: 'c12-06',
    categoryId: 'cat-12',
    title: 'Floor Carpeting, Mats & Door Weatherstrips',
    whatToCheck: 'Check molded floor carpet, driver mat security pegs, and cabin door rubber surrounds.',
    whereToFind: 'Passenger footwells and body door apertures.',
    howToCheck: [
      'Feel deep into driver and passenger footwells: check for dampness or oil stains.',
      'Verify driver mat has cutout holes locking onto floor retention hooks.',
      'Inspect continuous rubber door surround seals.'
    ],
    normalCondition: 'Dry, clean, tautly fitted carpet with secured driver mat and supple door seals.',
    rejectCondition: 'Dampness under carpet (indicates AC drain leak or door leak) or unanchored driver mat.',
    severity: 'major',
    photoRecommended: true
  },

  // =========================================================================
  // CATEGORY 13 — SEATS & SEAT BELTS (5 Checks)
  // =========================================================================
  {
    id: 'c13-01',
    categoryId: 'cat-13',
    title: 'Driver Seat Manual Height, Recline & Slide Adjustments',
    whatToCheck: 'Test all mechanical adjustment levers on driver seat.',
    whereToFind: 'Driver seat base and outer side.',
    howToCheck: [
      'Slide seat fully forward and backward on rails: verify smooth locking in every notch.',
      'Pump height adjustment lever up and down: verify seat raises and lowers smoothly.',
      'Test backrest recline lever: verify solid lock in various angles.'
    ],
    normalCondition: 'Effortless sliding, positive rail latching, smooth height pumping and recline locking.',
    rejectCondition: 'Seat sticks on rails, height mechanism slips, or recline fails to lock solidly.',
    severity: 'critical',
    whyItMatters: 'A driver seat that fails to lock solidly can slide backward during acceleration or collision.',
    photoRecommended: true
  },
  {
    id: 'c13-02',
    categoryId: 'cat-13',
    title: 'Seat Upholstery, Fabric & Stitching Integrity',
    whatToCheck: 'Inspect seat fabric/leatherette surfaces for loose threads, tears, stains, or puckering.',
    whereToFind: 'All front and rear seat cushions and backrests.',
    howToCheck: [
      'Inspect seam stitching along bolsters and center panels.',
      'Check for grease stains, snags, or crooked seam lines.'
    ],
    normalCondition: 'Flawless fabric with uniform, tight stitching and no stains or tears.',
    rejectCondition: 'Unraveling seam stitching, fabric cuts, burns, or prominent grease stains.',
    severity: 'major',
    photoRecommended: true
  },
  {
    id: 'c13-03',
    categoryId: 'cat-13',
    title: 'Front & Rear 3-Point Seat Belts & Inertial Retractor Lock',
    whatToCheck: 'Test driver, front passenger, and all rear seatbelt buckles, smooth retraction, and emergency lock.',
    whereToFind: 'Front and rear seatbelt assemblies.',
    howToCheck: [
      'Pull belt out smoothly: should unwind without jamming.',
      'Give belt a rapid, sharp jerk forward: inertial reel must lock immediately.',
      'Insert tongue into red buckle receiver: verify solid click; press red release: verify spring ejection.',
      'Release belt: verify it retracts smoothly all the way back into B-pillar.'
    ],
    normalCondition: 'Smooth payout, instantaneous inertial locking on sharp pull, crisp buckle click, full retraction.',
    rejectCondition: 'Failure to lock on sharp jerk, sluggish/jammed retraction, or loose buckle anchor bolt.',
    severity: 'critical',
    whyItMatters: 'Primary life-saving restraint system. Any failure to lock makes vehicle unsafe to drive.',
    photoRecommended: true
  },
  {
    id: 'c13-04',
    categoryId: 'cat-13',
    title: 'Headrests Adjustment & Locking (All Positions)',
    whatToCheck: 'Test vertical height adjustment and locking clicks on all front and rear headrests.',
    whereToFind: 'Top of front and rear seat backrests.',
    howToCheck: [
      'Pull each headrest up: should click into locking notches.',
      'Press side release button and push headrest down.'
    ],
    normalCondition: 'Headrests lock firmly at height notches and release easily via button.',
    rejectCondition: 'Loose headrest that collapses under pressure or missing headrest.',
    severity: 'major'
  },
  {
    id: 'c13-05',
    categoryId: 'cat-13',
    title: 'ISOFIX Child Seat Mounts & Rear Door Child Locks',
    whatToCheck: 'Locate lower ISOFIX anchor loops and test mechanical child-proof lock toggles on both rear doors.',
    whereToFind: 'Rear seat crease and trailing edge of rear doors.',
    howToCheck: [
      'Slide hand into rear seat crease to verify steel ISOFIX loops.',
      'Engage child lock on rear door: confirm inside handle cannot open door while outside handle works.'
    ],
    normalCondition: 'Clear ISOFIX loops and reliable child lock engagement.',
    rejectCondition: 'Blocked ISOFIX anchors or defective child lock mechanism.',
    severity: 'major'
  },

  // =========================================================================
  // CATEGORY 14 — DASHBOARD & INSTRUMENT CLUSTER (6 Checks)
  // =========================================================================
  {
    id: 'c14-01',
    categoryId: 'cat-14',
    title: 'Ignition Self-Check Bulb / Warning Light Sequence',
    whatToCheck: 'Observe initial dashboard bulb check when ignition is switched to ON (before cranking engine).',
    whereToFind: 'Instrument cluster display.',
    howToCheck: [
      'Turn ignition key to position II (ON) without starting engine.',
      'All warning icons should illuminate simultaneously for self-check: Check Engine, ABS, Airbag, Battery, Oil Pressure, Steering, ESC.',
      'Most icons should extinguish after 3–5 seconds, leaving only Battery, Oil Pressure, and Handbrake lit.'
    ],
    normalCondition: 'Complete, bright self-test icon illumination followed by systematic extinguishing of temporary lamps.',
    rejectCondition: 'Any critical safety warning icon (Airbag / ABS / Check Engine) fails to light up during initial bulb test (indicates disabled/tampered warning LED).',
    severity: 'critical',
    whyItMatters: 'Dealerships or rogue mechanics sometimes tamper with or disconnect warning LEDs to mask pre-existing faults.',
    photoRecommended: true
  },
  {
    id: 'c14-02',
    categoryId: 'cat-14',
    title: 'Check Engine Warning Light Extinguishes After Start',
    whatToCheck: 'Confirm amber "Check Engine" (MIL) light goes out immediately once engine fires up.',
    whereToFind: 'Instrument cluster display.',
    howToCheck: [
      'Start the engine and let it idle.',
      'Look closely at instrument cluster: verify amber engine outline light turns off completely within 2 seconds.'
    ],
    normalCondition: 'Check engine icon extinguishes completely after engine start.',
    rejectCondition: 'Check engine warning light remains continuously illuminated or flashes while engine is running.',
    severity: 'critical',
    whyItMatters: 'A persistent check engine light means the engine control unit has recorded active diagnostic trouble codes.',
    photoRecommended: true
  },
  {
    id: 'c14-03',
    categoryId: 'cat-14',
    title: 'Airbag (SRS) Warning Light Extinguishes',
    whatToCheck: 'Confirm red airbag warning light turns off after self-test and remains off.',
    whereToFind: 'Instrument cluster display.',
    howToCheck: [
      'Observe airbag symbol during key ON and after engine start.'
    ],
    normalCondition: 'Airbag icon extinguishes within ~4 seconds after ignition ON and stays off.',
    rejectCondition: 'Airbag light stays continuously illuminated or flashes while driving.',
    severity: 'critical',
    whyItMatters: 'Airbag fault light indicates supplemental restraint system is disabled in a crash.',
    photoRecommended: true
  },
  {
    id: 'c14-04',
    categoryId: 'cat-14',
    title: 'ABS, Steering (EPS) & Brake Warning Lights Extinguish',
    whatToCheck: 'Verify yellow ABS light, steering assist icon, and brake warning light turn off.',
    whereToFind: 'Instrument cluster.',
    howToCheck: [
      'Confirm ABS and EPS steering icons turn off after start.',
      'Release parking brake: confirm red (!) brake light turns off.'
    ],
    normalCondition: 'ABS and EPS icons extinguish; brake warning light responds accurately to parking brake lever.',
    rejectCondition: 'ABS or EPS light stays lit, or brake warning remains on with handbrake fully down.',
    severity: 'critical',
    photoRecommended: true
  },
  {
    id: 'c14-05',
    categoryId: 'cat-14',
    title: 'Digital Speedometer, Tachometer & Fuel Gauges',
    whatToCheck: 'Check digital numeric speedometer display, tachometer RPM bar, and petrol/CNG fuel levels.',
    whereToFind: 'Center of digital instrument panel.',
    howToCheck: [
      'Confirm 0 km/h is displayed at standstill.',
      'Gently blip throttle in neutral: verify digital RPM bar rises and falls smoothly.',
      'Check both petrol and CNG fuel bar levels are displayed.'
    ],
    normalCondition: 'Crisp, bright digits with responsive RPM bar and clear dual fuel levels.',
    rejectCondition: 'Dead display segments, flickering screen, or blank fuel gauge.',
    severity: 'major'
  },
  {
    id: 'c14-06',
    categoryId: 'cat-14',
    title: 'Absence of Any Persistent Warning Lights / Messages',
    whatToCheck: 'Confirm zero warning messages remain on cluster while engine is running and handbrake is released.',
    whereToFind: 'Full instrument cluster screen.',
    howToCheck: [
      'With engine idling in neutral and seatbelt buckled, inspect every corner of cluster.',
      'Verify zero amber or red warning lights remain lit.'
    ],
    normalCondition: 'Clean instrument cluster showing only normal operating dials without any fault symbols.',
    rejectCondition: 'Any unresolved warning light (tyre pressure, engine, electrical, safety).',
    severity: 'critical',
    whyItMatters: 'A brand-new car should have zero active error warnings before you drive away.',
    photoRecommended: true
  },

  // =========================================================================
  // CATEGORY 15 — LIGHTS & EXTERIOR ELECTRICALS (6 Checks)
  // =========================================================================
  {
    id: 'c15-01',
    categoryId: 'cat-15',
    title: 'Daytime Running Lights (DRL) Illumination & Brightness',
    whatToCheck: 'Inspect signature LED DRL strips on front headlight assemblies.',
    whereToFind: 'Front headlight upper light strips.',
    howToCheck: [
      'Turn ignition ON: verify both left and right white LED DRLs light up evenly.',
      'Check that both sides have identical brightness and color temperature.'
    ],
    normalCondition: 'Even, bright white LED illumination across left and right DRL modules.',
    rejectCondition: 'One DRL dim, flickering, dead LED segment, or yellowed color mismatch.',
    severity: 'major',
    photoRecommended: true
  },
  {
    id: 'c15-02',
    categoryId: 'cat-15',
    title: 'Low Beam Headlights & Leveling Aim Cutoff',
    whatToCheck: 'Test low beam headlights for brightness, cutoff line, and motorized leveling adjustment.',
    whereToFind: 'Front headlamp clusters.',
    howToCheck: [
      'Turn rotary light switch to Low Beam against a dealership wall: verify crisp cutoff line.',
      'Rotate headlight leveling thumbwheel from 0 to 3: verify both beams tilt downward.'
    ],
    normalCondition: 'Crisp low beam cutoff and smooth motorized beam leveling.',
    rejectCondition: 'Bulb dead, severe beam misaim, or leveling motor inoperative.',
    severity: 'critical',
    photoRecommended: true
  },
  {
    id: 'c15-03',
    categoryId: 'cat-15',
    title: 'High Beam Headlights & Stalk Flasher',
    whatToCheck: 'Test high beam projection and instantaneous stalk pass flasher.',
    whereToFind: 'Front headlamps.',
    howToCheck: [
      'Push stalk forward: verify high beams lock on with blue cluster telltale.',
      'Pull stalk toward you: verify high beam pass-flasher triggers instantly.'
    ],
    normalCondition: 'Powerful high beam throw and instant flashing response.',
    rejectCondition: 'High beam inoperative or pass-flasher switch defective.',
    severity: 'critical'
  },
  {
    id: 'c15-04',
    categoryId: 'cat-15',
    title: 'Turn Signals & Hazard Emergency Flashers',
    whatToCheck: 'Test front, rear, and mirror turn signals and central hazard emergency button.',
    whereToFind: 'All 6 exterior indicator locations and dashboard hazard switch.',
    howToCheck: [
      'Turn on hazard switch: all front, mirror, and rear indicators must flash synchronously.',
      'Verify steady flashing cadence (~80-90 flashes/min).'
    ],
    normalCondition: 'Synchronous 360° flashing of all exterior turn signals.',
    rejectCondition: 'One indicator bulb dead, rapid double-speed flashing, or hazard switch failure.',
    severity: 'critical'
  },
  {
    id: 'c15-05',
    categoryId: 'cat-15',
    title: 'Tail Lamps & Brake Lights (Including High-Mount Stop Lamp)',
    whatToCheck: 'Test red parking tail lamps, connected center bar, and all 3 brake lights under pedal pressure.',
    whereToFind: 'Rear taillights and top rear spoiler center.',
    howToCheck: [
      'Turn parking lights ON: verify rear light signature glows evenly.',
      'Have someone press brake pedal: verify corner brake lights and high-mount spoiler light illuminate brightly.'
    ],
    normalCondition: 'Instant illumination of all three brake lights upon pedal touch.',
    rejectCondition: 'Any of the three brake lights fails to illuminate (major rear-end collision hazard).',
    severity: 'critical',
    whyItMatters: 'Working brake lights are legally mandatory and prevent deadly rear-end collisions.',
    photoRecommended: true
  },
  {
    id: 'c15-06',
    categoryId: 'cat-15',
    title: 'Reverse Backup Light & Number Plate Lamps',
    whatToCheck: 'Test white reverse lamp when reverse gear is engaged and verify number plate lamps.',
    whereToFind: 'Rear bumper / taillamp lower section and license plate recess.',
    howToCheck: [
      'With ignition ON, engage Reverse gear: verify white reverse lamp is brightly lit.',
      'Inspect license plate recess: confirm both white plate illumination bulbs are glowing.'
    ],
    normalCondition: 'Bright white reverse light in reverse gear; clean license plate illumination.',
    rejectCondition: 'Reverse light fails to illuminate or dead number plate bulb.',
    severity: 'major'
  },

  // =========================================================================
  // CATEGORY 16 — CONTROLS, SWITCHES & ELECTRICALS (6 Checks)
  // =========================================================================
  {
    id: 'c16-01',
    categoryId: 'cat-16',
    title: 'Dual Horn Pitch & Tone Clarity',
    whatToCheck: 'Test vehicle horn sound for strong, dual-tone volume and responsiveness.',
    whereToFind: 'Steering wheel horn pad.',
    howToCheck: [
      'Press steering wheel horn pad in center, left, and right zones.',
      'Listen for clear, dual-frequency trumpet tone without muffled buzzing.'
    ],
    normalCondition: 'Sharp, loud, authoritative dual horn blast with easy pad actuation.',
    rejectCondition: 'Single weak moped-like squeak (one horn trumpet dead) or sticking horn switch.',
    severity: 'major'
  },
  {
    id: 'c16-02',
    categoryId: 'cat-16',
    title: 'Power Windows Operation (All 4 Doors) & Lockout',
    whatToCheck: 'Test all 4 power window switches from master driver console and individual door buttons.',
    whereToFind: 'Door armrest switch consoles.',
    howToCheck: [
      'Cycle each window down and up completely.',
      'Press window lockout button: ensure rear passenger switches are disabled.'
    ],
    normalCondition: 'Smooth, quiet window movement from all switches; lockout button works.',
    rejectCondition: 'Motor strains, window tilts in channel, or switch inoperative.',
    severity: 'major'
  },
  {
    id: 'c16-03',
    categoryId: 'cat-16',
    title: 'Central Door Locking & Remote Fob Operation',
    whatToCheck: 'Test central locking from dashboard button, key remote, and speed sensing.',
    whereToFind: 'Center dashboard door lock switch and remote key fobs.',
    howToCheck: [
      'Press central lock button on dashboard: all 4 doors and tailgate must lock simultaneously with crisp solenoid clunk.',
      'Press unlock: all doors must unlock.',
      'Test remote key fob lock and unlock buttons from 5 meters away.'
    ],
    normalCondition: 'All actuators lock and unlock synchronously without lag.',
    rejectCondition: 'One door fails to lock (defective door actuator solenoid).',
    severity: 'critical',
    whyItMatters: 'A door that fails to lock leaves vehicle vulnerable to theft and occupant ejection in an accident.',
    photoRecommended: true
  },
  {
    id: 'c16-04',
    categoryId: 'cat-16',
    title: 'Fuel Flap Release Lever & Boot Release',
    whatToCheck: 'Test fuel filler flap release lever in driver footwell and boot release button.',
    whereToFind: 'Driver seat floor lever and remote/dashboard boot buttons.',
    howToCheck: [
      'Pull fuel lid release lever: fuel flap door should spring open cleanly.',
      'Test boot release button: tailgate latch should release cleanly.'
    ],
    normalCondition: 'Fuel flap springs open reliably; boot release unlocks instantly.',
    rejectCondition: 'Flap sticks shut or latch cable fails to release flap.',
    severity: 'major'
  },
  {
    id: 'c16-05',
    categoryId: 'cat-16',
    title: 'ORVM Electrically Adjustable & Folding Mirrors',
    whatToCheck: 'Test electric 4-way joystick adjusting left and right side mirror glass and power fold.',
    whereToFind: 'Driver door armrest mirror switch.',
    howToCheck: [
      'Move joystick Up, Down, Left, Right for both Left and Right mirrors.',
      'Press mirror fold button (if equipped): both mirrors should fold inward smoothly.'
    ],
    normalCondition: 'Smooth motorized glass adjustment in all directions; synchronized folding.',
    rejectCondition: 'Motor clicks without moving glass, or one direction inoperative.',
    severity: 'major'
  },
  {
    id: 'c16-06',
    categoryId: 'cat-16',
    title: 'Windshield Wiper Speeds (Intermittent, Low, High, Mist)',
    whatToCheck: 'Cycle front wiper stalk through all speed settings.',
    whereToFind: 'Right-hand steering column stalk.',
    howToCheck: [
      'Switch to Intermittent (INT): verify timed pauses between sweeps.',
      'Switch to Low (LO) and High (HI): verify progressive continuous sweeps.',
      'Test Single Mist tap.'
    ],
    normalCondition: 'Distinct, proper speeds and wiper blades park neatly at bottom of glass.',
    rejectCondition: 'High speed inoperative, or wipers stop in middle of glass when turned off.',
    severity: 'critical',
    whyItMatters: 'Wipers that fail in rain pose an immediate driving hazard.'
  },

  // =========================================================================
  // CATEGORY 17 — INFOTAINMENT & CONNECTIVITY (6 Checks)
  // =========================================================================
  {
    id: 'c17-01',
    categoryId: 'cat-17',
    title: 'Touchscreen Boot-up Speed & Touch Response',
    whatToCheck: 'Observe infotainment bootup animation and test touch responsiveness across display.',
    whereToFind: 'Center dashboard touchscreen.',
    howToCheck: [
      'Turn ignition key ON: verify bootup completes within ~10 seconds.',
      'Tap icons in all 4 corners and swipe across pages to verify touch registration.'
    ],
    normalCondition: 'Smooth boot-up and precise touch response across entire screen surface.',
    rejectCondition: 'Screen remains black, gets stuck in reboot loop, or has dead touch zones.',
    severity: 'critical',
    photoRecommended: true
  },
  {
    id: 'c17-02',
    categoryId: 'cat-17',
    title: 'Bluetooth Phone Pairing & Hands-Free Audio Calls',
    whatToCheck: 'Pair your smartphone via Bluetooth to verify pairing handshake, music, and call clarity.',
    whereToFind: 'Infotainment Bluetooth settings menu and roof microphone.',
    howToCheck: [
      'Pair phone via Bluetooth PIN and stream music track.',
      'Make a test call: verify clear caller voice through speakers and clean microphone pickup.'
    ],
    normalCondition: 'Fast pairing with clean Bluetooth music streaming and clear hands-free calling.',
    rejectCondition: 'Bluetooth fails to discover devices, drops connection, or microphone is dead.',
    severity: 'minor'
  },
  {
    id: 'c17-03',
    categoryId: 'cat-17',
    title: 'FM / AM Radio Tuner & Aerial Reception',
    whatToCheck: 'Tune to local FM radio station to test antenna reception.',
    whereToFind: 'Radio application.',
    howToCheck: [
      'Auto-scan FM stations.',
      'Play a local station and listen for static-free reception.'
    ],
    normalCondition: 'Picks up multiple local stations with clean stereo sound.',
    rejectCondition: 'Pure static on all frequencies (disconnected antenna wire).',
    severity: 'minor'
  },
  {
    id: 'c17-04',
    categoryId: 'cat-17',
    title: 'All Cabin Speakers Sound Balance & Fader',
    whatToCheck: 'Test front left, front right, rear left, rear right speakers and tweeters.',
    whereToFind: 'Sound settings menu (Equalizer / Balance / Fader).',
    howToCheck: [
      'Drag sound fader circle to each of the 4 corners.',
      'Listen to each speaker independently: check for buzzing, blown cone distortion, or dead speaker.'
    ],
    normalCondition: 'Rich, clear sound from all 4 door speakers and A-pillar tweeters with zero vibration.',
    rejectCondition: 'One speaker completely dead or severe crackling/rattling sound from door pad.',
    severity: 'major'
  },
  {
    id: 'c17-05',
    categoryId: 'cat-17',
    title: 'Android Auto & Apple CarPlay Smartphone Projection',
    whatToCheck: 'Connect smartphone via USB or wireless to verify projection interface.',
    whereToFind: 'Smartphone projection app on infotainment.',
    howToCheck: [
      'Connect phone via data cable or wireless pairing.',
      'Verify Android Auto / Apple CarPlay UI launches promptly.',
      'Launch Google Maps or navigation: check smooth map rendering.'
    ],
    normalCondition: 'Smooth launch of phone projection with responsive navigation maps.',
    rejectCondition: 'Fails to recognize phone, frequent disconnections, or black projection screen.',
    severity: 'major'
  },
  {
    id: 'c17-06',
    categoryId: 'cat-17',
    title: 'Screen Hardware Stability (Zero Random Reboots)',
    whatToCheck: 'Keep infotainment running throughout inspection to confirm firmware stability.',
    whereToFind: 'Touchscreen display.',
    howToCheck: [
      'Leave audio playing while conducting other checks.',
      'Observe if system reboots randomly or screen flickers.'
    ],
    normalCondition: 'Rock-solid system stability with zero random restarts.',
    rejectCondition: 'System crashes, freezes, or reboots during inspection.',
    severity: 'major',
    photoRecommended: true
  },

  // =========================================================================
  // CATEGORY 18 — AIR CONDITIONING (5 Checks)
  // =========================================================================
  {
    id: 'c18-01',
    categoryId: 'cat-18',
    title: 'AC Compressor Engagement & Cooling Speed',
    whatToCheck: 'Confirm AC compressor engages with a crisp click and vents blow cold chilled air.',
    whereToFind: 'AC control panel and dashboard air vents.',
    howToCheck: [
      'With engine idling in neutral, press AC button (snowflake icon).',
      'Listen for compressor engagement and verify radiator fan spins.',
      'Set temperature to lowest: air should feel chillingly cold within 2–3 minutes.'
    ],
    normalCondition: 'Audible compressor engagement, immediate radiator fan start, rapid delivery of cold air.',
    rejectCondition: 'No compressor click, fan fails to spin, or air remains at ambient room temperature.',
    severity: 'critical',
    whyItMatters: 'A car with an inoperative AC is unusable in Indian climate and indicates expensive HVAC repair.',
    photoRecommended: true
  },
  {
    id: 'c18-02',
    categoryId: 'cat-18',
    title: 'Blower Fan Speeds (1, 2, 3, 4) & Noise Check',
    whatToCheck: 'Test blower rotary switch or digital buttons across all speed settings.',
    whereToFind: 'AC control console.',
    howToCheck: [
      'Switch blower through Speed 1, 2, 3, and 4 (Maximum).',
      'Verify airflow increases progressively without bearing squeaks or leaf fluttering noise.'
    ],
    normalCondition: 'Smooth progressive airflow increase across all steps without bearing rattle.',
    rejectCondition: 'Blower inoperative on one or more speeds or loud rattling noise in blower fan.',
    severity: 'major'
  },
  {
    id: 'c18-03',
    categoryId: 'cat-18',
    title: 'Airflow Direction Modes (Face, Foot, Defog)',
    whatToCheck: 'Test mode selector dial to ensure air diverts accurately to various cabin vents.',
    whereToFind: 'AC direction controls.',
    howToCheck: [
      'Select Face: air should blow from dashboard vents.',
      'Select Foot: air should divert down to footwells.',
      'Select Windshield Defrost: air should shoot forcefully against windshield base.'
    ],
    normalCondition: 'Flap actuators redirect airflow crisply to the selected vent locations.',
    rejectCondition: 'Air remains stuck blowing to only one zone; actuator motor clicking continuously.',
    severity: 'major'
  },
  {
    id: 'c18-04',
    categoryId: 'cat-18',
    title: 'Recirculation Flap & Rear Air Vents (If Equipped)',
    whatToCheck: 'Test recirculation button and inspect rear console air vents.',
    whereToFind: 'AC button panel and rear passenger console.',
    howToCheck: [
      'Toggle Recirculation: listen for subtle acoustic change as cabin air loop closes.',
      'Check airflow volume and direction louvers from rear AC vents.'
    ],
    normalCondition: 'Smooth recirculation flap action and cool airflow delivered to rear seats.',
    rejectCondition: 'Recirculation flap jammed or broken rear vent louvers.',
    severity: 'minor'
  },
  {
    id: 'c18-05',
    categoryId: 'cat-18',
    title: 'Heater Core Temperature Output & Cabin Odor',
    whatToCheck: 'Verify heater produces hot air when temperature dial is turned to RED / High.',
    whereToFind: 'AC temperature control knob.',
    howToCheck: [
      'With engine warmed up to operating temperature, rotate temperature dial to maximum HEAT.',
      'Feel air from vents: should switch from cold to hot; ensure no foul chemical or burning odors.'
    ],
    normalCondition: 'Noticeably hot air delivered through vents; clean odorless airflow.',
    rejectCondition: 'Air remains cold (blocked heater core) or burning chemical/musty mold smell.',
    severity: 'major'
  },

  // =========================================================================
  // CATEGORY 19 — CAMERAS & PARKING ASSISTANCE (4 Checks)
  // =========================================================================
  {
    id: 'c19-01',
    categoryId: 'cat-19',
    title: 'Reverse Parking Camera Video Feed & Clarity',
    whatToCheck: 'Verify reverse camera feed appears on touchscreen instantly when reverse gear is engaged.',
    whereToFind: 'Center infotainment display and physical camera lens on tailgate.',
    howToCheck: [
      'With ignition ON, depress clutch and shift into Reverse gear.',
      'Verify camera feed pops up on touchscreen within 1.5 seconds.',
      'Check image clarity: rear bumper should be visible at bottom for reference.'
    ],
    normalCondition: 'Instant, crisp, level video feed displayed without lag or blurry lens.',
    rejectCondition: 'Screen stays black, displays "No Signal", or takes over 5 seconds to load.',
    severity: 'critical',
    photoRecommended: true
  },
  {
    id: 'c19-02',
    categoryId: 'cat-19',
    title: 'Parking Guidelines (Static or Dynamic Steering)',
    whatToCheck: 'Check colored distance guidelines (Green, Yellow, Red) overlaid on camera feed.',
    whereToFind: 'Touchscreen reverse camera overlay.',
    howToCheck: [
      'Observe guide lines on camera view.',
      'Turn steering wheel: check if guidelines curve with steering input (dynamic guidelines) or remain fixed.'
    ],
    normalCondition: 'Clear colored distance zones overlaid accurately on video feed.',
    rejectCondition: 'Distorted, misaligned, or missing guidelines.',
    severity: 'minor'
  },
  {
    id: 'c19-03',
    categoryId: 'cat-19',
    title: 'Rear Ultrasonic Parking Sensors & Audio Beep Cadence',
    whatToCheck: 'Test rear bumper ultrasonic parking sensors for progressive proximity beeps.',
    whereToFind: 'Rear bumper sensors and cabin speaker chimes.',
    howToCheck: [
      'With car in Reverse and foot on brake, have a person walk toward rear bumper.',
      'Verify slow intermittent beep starts at ~1.5 meters.',
      'Beep frequency should increase to continuous steady tone as person reaches ~30 cm.'
    ],
    normalCondition: 'Progressive, accurate audio beeping matching obstacle distance.',
    rejectCondition: 'Sensors silent despite obstacle, or continuous false alarm beep with no obstacle behind.',
    severity: 'major',
    whyItMatters: 'Faulty sensors lead to reversing into low walls or invisible obstacles.'
  },
  {
    id: 'c19-04',
    categoryId: 'cat-19',
    title: 'Instrument Cluster Visual Parking Distance Display',
    whatToCheck: 'Check if multi-information display shows vehicle graphic with segmented obstacle bars.',
    whereToFind: 'Instrument cluster MID screen.',
    howToCheck: [
      'Observe cluster screen when reversing: check graphic showing left, center, and right sensor zones.'
    ],
    normalCondition: 'Visual obstacle indicator bars correspond accurately with audio chimes.',
    rejectCondition: 'Sensor error message displayed on instrument cluster.',
    severity: 'minor'
  },

  // =========================================================================
  // CATEGORY 20 — ENGINE START & IDLE (4 Checks)
  // =========================================================================
  {
    id: 'c20-01',
    categoryId: 'cat-20',
    title: 'Engine Cranking Sound & Starter Motor Response',
    whatToCheck: 'Observe engine cranking speed and immediate firing on key turn.',
    whereToFind: 'From driver seat with windows cracked open.',
    howToCheck: [
      'Depress clutch fully, ensure gear in Neutral, and crank key.',
      'Listen to starter motor: should spin briskly and fire engine within 1 to 2 seconds.',
      'No prolonged straining crank or grinding metallic starter noise.'
    ],
    normalCondition: 'Crisp, energetic starter engagement; engine starts cleanly on first turn.',
    rejectCondition: 'Sluggish, slow cranking (weak battery), repeated starting attempts needed, or starter pinion grind.',
    severity: 'critical',
    whyItMatters: 'Sluggish start indicates discharged battery or starter alignment issues.',
    photoRecommended: true
  },
  {
    id: 'c20-02',
    categoryId: 'cat-20',
    title: 'Warm Idle RPM Stability & Settlement',
    whatToCheck: 'Observe tachometer needle settling from cold start down to steady warm idle (~800-850 RPM).',
    whereToFind: 'Digital tachometer on instrument cluster.',
    howToCheck: [
      'Watch RPM needle immediately upon engine start.',
      'Needle should hold slightly elevated idle briefly, then settle smoothly around 800–850 RPM.',
      'Ensure needle does not hunt, bounce, or surge up and down.'
    ],
    normalCondition: 'Smooth, rock-steady idle RPM without hunting or rpm drop.',
    rejectCondition: 'Erratic idle bouncing by ±200 RPM, engine surging, or engine stalling when idling.',
    severity: 'critical',
    whyItMatters: 'Idle hunting indicates vacuum leaks, throttle body issues, or faulty fuel pressure regulation.',
    photoRecommended: true
  },
  {
    id: 'c20-03',
    categoryId: 'cat-20',
    title: 'Engine Idle Vibration in Cabin, Steering Wheel & Pedals',
    whatToCheck: 'Feel cabin vibration at idle (Tata 3-cylinder Revotron engine characteristics).',
    whereToFind: 'Steering wheel rim, gear shifter lever, and foot pedals at idle.',
    howToCheck: [
      'Place hands on steering wheel and gear knob while idling in neutral.',
      'Mild 3-cylinder pulse is normal; excessive violent shaking that vibrates seats or dashboard is not.'
    ],
    normalCondition: 'Well-damped, civilized idle feel without excessive steering wheel or seat shudder.',
    rejectCondition: 'Violent steering wheel shaking or dashboard buzzing at idle (bad engine mount or misfire).',
    severity: 'major'
  },
  {
    id: 'c20-04',
    categoryId: 'cat-20',
    title: 'Exhaust Tailpipe Emissions & Smoke Color Check',
    whatToCheck: 'Inspect exhaust smoke color exiting rear tailpipe at idle and light throttle blip.',
    whereToFind: 'Rear exhaust tailpipe.',
    howToCheck: [
      'Walk to rear while engine idles.',
      'Check exhaust plume: should be virtually invisible (slight white steam on cold mornings is harmless water vapor).',
      'Have someone blip throttle to 2500 RPM: watch for colored smoke.'
    ],
    normalCondition: 'Clean, colorless exhaust; slight clear water condensation dripping from tailpipe is normal.',
    rejectCondition: 'Blue smoke (burning engine oil), thick black smoke (unburnt fuel/rich mixture), or dense sweet-smelling white smoke (burning coolant).',
    severity: 'critical',
    whyItMatters: 'Blue or black smoke indicates severe internal engine or sensor defects.',
    photoRecommended: true
  },

  // =========================================================================
  // CATEGORY 21 — CLUTCH & TRANSMISSION (4 Checks)
  // =========================================================================
  {
    id: 'c21-01',
    categoryId: 'cat-21',
    title: 'Clutch Pedal Travel & Progressive Resistance Feel',
    whatToCheck: 'Feel clutch pedal stroke, spring resistance, and smooth return.',
    whereToFind: 'Driver footwell left pedal.',
    howToCheck: [
      'Depress clutch pedal down to the floor carpet slowly.',
      'Check for smooth hydraulic resistance without gritty friction, sticky spots, or creaks.',
      'Release pedal: should spring back smoothly against foot.'
    ],
    normalCondition: 'Light, progressive pedal effort with smooth return travel and zero squeaks.',
    rejectCondition: 'Heavy pedal requiring excessive force, sticky pedal that stays on floor, or grinding sensation.',
    severity: 'major',
    applicableTo: { transmissions: ['Manual'] }
  },
  {
    id: 'c21-02',
    categoryId: 'cat-21',
    title: 'Clutch Biting Point & Smooth Engagement',
    whatToCheck: 'Observe the engagement point where clutch begins moving vehicle forward.',
    whereToFind: 'Driving at creeping speed in dealership yard.',
    howToCheck: [
      'Engage 1st gear on level ground.',
      'Slowly release clutch without throttle: car should begin creeping forward smoothly.',
      'Check that biting point is progressive in mid-travel, not right at the very floor or very top.'
    ],
    normalCondition: 'Smooth progressive clutch bite in the middle of pedal stroke without judder.',
    rejectCondition: 'Severe clutch shudder/judder that shakes vehicle, or clutch slipping with engine revving freely without moving car.',
    severity: 'critical',
    whyItMatters: 'Clutch judder indicates warped pressure plate or contaminated clutch disc requiring gearbox removal.',
    photoRecommended: true,
    applicableTo: { transmissions: ['Manual'] }
  },
  {
    id: 'c21-03',
    categoryId: 'cat-21',
    title: 'Gear Shift Gates & Reverse Lockout Collar Action',
    whatToCheck: 'Test slotting into 1st, 2nd, and Reverse gear using the pull-up safety collar.',
    whereToFind: 'Center console gear shifter.',
    howToCheck: [
      'Shift smoothly between 1st, 2nd, and neutral.',
      'Lift pull-up safety collar under gear knob and slot into Reverse: verify clean engagement.',
      'Release collar in neutral and push forward without collar: must safely enter 1st gear, NOT Reverse.'
    ],
    normalCondition: 'Crisp shift gates and reliable reverse lock collar preventing accidental engagement.',
    rejectCondition: 'Gear grind when shifting into Reverse, or reverse lock ring sticks open.',
    severity: 'major',
    applicableTo: { transmissions: ['Manual'] }
  },
  {
    id: 'c21-04',
    categoryId: 'cat-21',
    title: 'Gearbox Noise (Whining / Bearing Chatter in Neutral)',
    whatToCheck: 'Listen for input shaft bearing chatter when releasing clutch in neutral.',
    whereToFind: 'Cabin floor / gearbox tunnel.',
    howToCheck: [
      'With engine idling in Neutral, press clutch to floor and release.',
      'Listen for metallic whirring or rattling that disappears when clutch is pressed down.'
    ],
    normalCondition: 'Virtually silent transition when clutch is released in neutral.',
    rejectCondition: 'Loud rattling or whirring noise when clutch pedal is released in neutral (bad release/input bearing).',
    severity: 'critical',
    photoRecommended: true,
    applicableTo: { transmissions: ['Manual'] }
  },

  // =========================================================================
  // CATEGORY 22 — STEERING & BRAKES (4 Checks)
  // =========================================================================
  {
    id: 'c22-01',
    categoryId: 'cat-22',
    title: 'Electric Power Steering Feel & Effort at Standstill',
    whatToCheck: 'Test steering effort from lock to lock with engine running.',
    whereToFind: 'Steering wheel in driver seat.',
    howToCheck: [
      'With engine idling, rotate steering wheel full turns from left lock to right lock.',
      'Check for light, effortless, buttery smooth power assist.',
      'Listen for electric motor whining, clicking, or notchiness.'
    ],
    normalCondition: 'Light, effortless rotation with silent electric assist across entire rotation.',
    rejectCondition: 'Heavy, stiff steering (failed EPS assist), jerky resistance, or loud grinding noises.',
    severity: 'critical',
    whyItMatters: 'Loss of power steering assist impairs emergency vehicle maneuverability.',
    photoRecommended: true
  },
  {
    id: 'c22-02',
    categoryId: 'cat-22',
    title: 'Steering Wheel Center Alignment (Straight Tracking)',
    whatToCheck: 'Verify steering wheel spoke is horizontally level when driving straight.',
    whereToFind: 'Steering wheel horizontal spokes during test drive.',
    howToCheck: [
      'Drive straight on a flat dealership yard road.',
      'Observe steering wheel center badge: should sit level without being cocked to left or right.'
    ],
    normalCondition: 'Steering wheel perfectly level when vehicle tracks in a straight line.',
    rejectCondition: 'Steering wheel is turned noticeably off-center (by 5° or more) while driving straight.',
    severity: 'major',
    whyItMatters: 'Off-center steering indicates poor wheel alignment or tie-rod transit impact.',
    photoRecommended: true
  },
  {
    id: 'c22-03',
    categoryId: 'cat-22',
    title: 'Brake Pedal Firmness & Vacuum Booster Assist',
    whatToCheck: 'Test brake pedal firmness with engine off, and vacuum brake booster assist upon start.',
    whereToFind: 'Driver footwell center pedal.',
    howToCheck: [
      'With engine OFF, pump brake pedal 3–4 times: pedal should become hard and high.',
      'Hold foot firmly on hard pedal and start engine: pedal should gently sink 1–2 inches under foot (proves vacuum booster works).',
      'Hold firm pressure: pedal must hold solid and NOT slowly sink to the floor carpet.'
    ],
    normalCondition: 'Pedal becomes rock-firm with engine off, drops slightly upon start, and holds rock-solid pressure.',
    rejectCondition: 'Brake pedal feels spongy or slowly creeps down to the floor (indicates hydraulic master cylinder internal leak).',
    severity: 'critical',
    whyItMatters: 'A sinking brake pedal indicates fatal hydraulic failure risking complete loss of brakes.',
    photoRecommended: true
  },
  {
    id: 'c22-04',
    categoryId: 'cat-22',
    title: 'Mechanical Parking Brake (Handbrake) Lever Travel & Hold',
    whatToCheck: 'Test handbrake ratchet clicks and holding capability on slope/in gear.',
    whereToFind: 'Center console handbrake lever.',
    howToCheck: [
      'Pull handbrake lever up steadily: count audible ratchet clicks (should lock firm within 4 to 6 clicks).',
      'With handbrake firmly pulled, gently engage clutch in 1st gear: rear wheels should hold car firmly against movement.',
      'Push thumb button: lever should drop smoothly with zero binding.'
    ],
    normalCondition: 'Locks firmly within 4–6 clicks, holds vehicle securely, and releases cleanly.',
    rejectCondition: 'Pulls all the way up to the armrest stop without holding, or rear brakes drag when released.',
    severity: 'critical',
    photoRecommended: true
  },

  // =========================================================================
  // CATEGORY 23 — SUSPENSION & DRIVING BEHAVIOUR (4 Checks)
  // =========================================================================
  {
    id: 'c23-01',
    categoryId: 'cat-23',
    title: 'Low-Speed Bump Absorption & Shock Absorber Damping',
    whatToCheck: 'Drive over a speed bump or small yard ramp to evaluate suspension damping.',
    whereToFind: 'Dealership yard speed breakers.',
    howToCheck: [
      'Drive over small bump at 10–15 km/h.',
      'Observe rebound: car should settle in a single damped motion without bouncy oscillation.'
    ],
    normalCondition: 'Supple bump absorption with immediate controlled settling.',
    rejectCondition: 'Violent bottoming out, continuous pogo-stick bouncing, or loud metallic crash.',
    severity: 'major'
  },
  {
    id: 'c23-02',
    categoryId: 'cat-23',
    title: 'Suspension Bushing & Strut Top Noise (No Thuds/Knocks)',
    whatToCheck: 'Listen for clunking or knocking noises from front and rear suspension.',
    whereToFind: 'Front and rear wheel arches during bump transit.',
    howToCheck: [
      'Drive over uneven yard cobblestones or small curb edge with windows down.',
      'Listen for metallic clunks, loose stabilizer bar drop link rattle, or strut mount knocking.'
    ],
    normalCondition: 'Muffled, solid thuds of tyres with zero loose metal clanking.',
    rejectCondition: 'Sharp metallic knock, rattling sway bar link, or loose shock absorber mount.',
    severity: 'critical',
    photoRecommended: true
  },
  {
    id: 'c23-03',
    categoryId: 'cat-23',
    title: 'Interior Cabin Squeaks, Buzzes & Trim Rattles',
    whatToCheck: 'Listen for cabin trim squeaks or vibrations during motion.',
    whereToFind: 'Dashboard, door cards, pillar plastics, and boot shelf.',
    howToCheck: [
      'Drive over slightly rough yard pavement.',
      'Listen for high-pitched plastic buzzes, loose glovebox rattles, or rear parcel shelf chatter.'
    ],
    normalCondition: 'Quiet, solidly assembled cabin free of persistent buzzing or plastic rattles.',
    rejectCondition: 'Persistent, annoying buzz from dashboard or loose B-pillar trim.',
    severity: 'minor'
  },
  {
    id: 'c23-04',
    categoryId: 'cat-23',
    title: 'Engine Acceleration Smoothness (No Hesitation or Bogging)',
    whatToCheck: 'Test throttle response in 1st and 2nd gears under gentle acceleration.',
    whereToFind: 'Engine response while driving.',
    howToCheck: [
      'Press accelerator progressively in 2nd gear from 15 km/h.',
      'Engine should build power cleanly without stumbling, jerking, or flat spots.'
    ],
    normalCondition: 'Linear, clean acceleration without hesitation or engine misfire.',
    rejectCondition: 'Engine stumbles, jerks violently, or bogs down under acceleration.',
    severity: 'critical',
    whyItMatters: 'Stumbling indicates fuel injection faults, turbo lag anomalies, or ignition coil issues.',
    photoRecommended: true
  },

  // =========================================================================
  // CATEGORY 24 — CNG / PETROL OPERATION (4 Checks)
  // =========================================================================
  {
    id: 'c24-01',
    categoryId: 'cat-24',
    title: 'Push-Button Fuel Changeover Switch Operation',
    whatToCheck: 'Test dedicated CNG/Petrol toggle switch on dashboard/center console.',
    whereToFind: 'Driver right switch bank or center console.',
    howToCheck: [
      'With engine idling, press fuel mode button.',
      'Observe button status indicator LED and instrument cluster display.'
    ],
    normalCondition: 'Crisp button tactile feedback with status LED toggling accurately.',
    rejectCondition: 'Switch stuck, unresponsive, or fails to initiate fuel changeover.',
    severity: 'critical',
    applicableTo: { fuelTypes: ['CNG'] }
  },
  {
    id: 'c24-02',
    categoryId: 'cat-24',
    title: 'Smooth Fuel Mode Transition (Petrol to CNG & Vice Versa)',
    whatToCheck: 'Observe engine behavior during live changeover between Petrol and CNG mode.',
    whereToFind: 'Engine running during idle and low speed.',
    howToCheck: [
      'Switch from Petrol to CNG: listen for rear high-pressure gas solenoid click and injector transition.',
      'Verify engine continues idling smoothly without jerking, RPM dip, or stalling.',
      'Switch back from CNG to Petrol: verify equally seamless transition.'
    ],
    normalCondition: 'Seamless, virtually imperceptible transition between fuel modes with no stalling.',
    rejectCondition: 'Engine shudders violently, coughs, or dies when switching fuel modes.',
    severity: 'critical',
    whyItMatters: 'Seamless dual-fuel transition is the core engineering highlight of Tata iCNG; jerking indicates ECU calibration faults.',
    photoRecommended: true,
    applicableTo: { fuelTypes: ['CNG'] }
  },
  {
    id: 'c24-03',
    categoryId: 'cat-24',
    title: 'Direct Start in CNG Mode (Tata iCNG Feature)',
    whatToCheck: 'Confirm capability of vehicle to start directly in CNG mode.',
    whereToFind: 'Engine start sequence.',
    howToCheck: [
      'With CNG selected as primary mode, start engine: verify vehicle starts smoothly in CNG mode without requiring forced petrol warmup.'
    ],
    normalCondition: 'Engine starts cleanly directly on CNG fuel.',
    rejectCondition: 'Engine fails to start on CNG, or forces petrol start with error message.',
    severity: 'major',
    applicableTo: { fuelTypes: ['CNG'] }
  },
  {
    id: 'c24-04',
    categoryId: 'cat-24',
    title: 'Absence of Gas Odor During Active CNG Operation',
    whatToCheck: 'Verify zero gas smell inside cabin or under bonnet while engine is running on CNG.',
    whereToFind: 'Cabin air vents and exhaust.',
    howToCheck: [
      'Let car idle on CNG mode for 3 minutes with AC fan running.',
      'Check for any trace of odorized gas escaping through AC vents.'
    ],
    normalCondition: 'Zero odor inside cabin during active CNG fuel consumption.',
    rejectCondition: 'Smell of gas entering cabin vents while operating on CNG mode.',
    severity: 'critical',
    safetyWarning: 'If gas odor enters cabin, switch off engine immediately and exit vehicle.',
    photoRecommended: true,
    applicableTo: { fuelTypes: ['CNG'] }
  },

  // =========================================================================
  // CATEGORY 25 — UNDERBODY INSPECTION (4 Checks)
  // =========================================================================
  {
    id: 'c25-01',
    categoryId: 'cat-25',
    title: 'Engine Sump Guard & Underbody Splash Shield',
    whatToCheck: 'Inspect plastic or metal engine protective under-shield from ground level.',
    whereToFind: 'Directly beneath engine and radiator.',
    howToCheck: [
      'Crouch down with phone flashlight and look under front bumper.',
      'Ensure under-tray is securely bolted and not hanging or dragging on ground.'
    ],
    normalCondition: 'Firmly fastened protective shield with zero gouges or missing clips.',
    rejectCondition: 'Hanging plastic shield, broken fasteners, or cracked skid plate.',
    severity: 'major',
    photoRecommended: true
  },
  {
    id: 'c25-02',
    categoryId: 'cat-25',
    title: 'Chassis Frame Rails & Crossmembers (Zero Scrapes / Dents)',
    whatToCheck: 'Inspect lower longitudinal chassis rails for loading ramp scrape marks.',
    whereToFind: 'Left and right chassis rails beneath floor pan.',
    howToCheck: [
      'Shine flashlight down the length of underbody rails.',
      'Check for scrape marks down to bare steel caused by steep car transporter trailer ramps.'
    ],
    normalCondition: 'Undamaged factory anti-chip rubberized coating on all chassis rails.',
    rejectCondition: 'Deep metal gouges, dented chassis rail, or stripped protective undercoating.',
    severity: 'critical',
    whyItMatters: 'Underbody impacts during trailer loading frequently cause hidden structural floor damage.',
    photoRecommended: true
  },
  {
    id: 'c25-03',
    categoryId: 'cat-25',
    title: 'Brake Fluid Lines & Fuel Lines Underbody Routing',
    whatToCheck: 'Inspect rigid steel brake and fuel lines running along floor pan.',
    whereToFind: 'Recessed underbody channels.',
    howToCheck: [
      'Look for black coated metal brake and gas lines clipped to chassis.',
      'Ensure they sit safely inside protective floor channel recesses.'
    ],
    normalCondition: 'Straight, securely clipped lines without kinks or chafing.',
    rejectCondition: 'Dented/pinched brake line or line dislodged from its plastic retention clip.',
    severity: 'critical',
    photoRecommended: true
  },
  {
    id: 'c25-04',
    categoryId: 'cat-25',
    title: 'Absence of Active Oil / Fluid Drips on Mechanical Casings',
    whatToCheck: 'Inspect bottom of engine oil pan (sump) and transmission gearbox casing for wetness.',
    whereToFind: 'Underside of engine and gearbox.',
    howToCheck: [
      'Shine light on oil drain plug and bottom of gearbox bellhousing.',
      'Check for hanging drops of golden engine oil or red/green gearbox oil.'
    ],
    normalCondition: 'Completely dry, clean aluminium casings.',
    rejectCondition: 'Hanging oil drops or wet fluid slick across bottom of gearbox.',
    severity: 'critical',
    photoRecommended: true
  },

  // =========================================================================
  // CATEGORY 26 — ACCESSORIES & EQUIPMENT (4 Checks)
  // =========================================================================
  {
    id: 'c26-01',
    categoryId: 'cat-26',
    title: 'Both Primary & Spare Remote Smart Keys Handover',
    whatToCheck: 'Verify both original remote key fobs are physically handed over with serial tag.',
    whereToFind: 'Dealership delivery pouch.',
    howToCheck: [
      'Count 2 keys.',
      'Verify both keys have battery charge and operate door locks.'
    ],
    normalCondition: '2 factory keys present, tested, and working.',
    rejectCondition: 'Dealer promises to give second key "after a week" (never accept delivery without both original keys).',
    severity: 'critical',
    whyItMatters: 'Never accept delivery with only one key; lost keys can invalidate insurance theft claims.'
  },
  {
    id: 'c26-02',
    categoryId: 'cat-26',
    title: 'Key Metal Emergency Blade & Mechanical Door Lock Test',
    whatToCheck: 'Slide out mechanical emergency key blade from smart fob and test driver door lock.',
    whereToFind: 'Inside remote key fob casing.',
    howToCheck: [
      'Slide release catch on key fob to extract mechanical metal key blade.',
      'Insert blade into physical driver door keyhole; turn to verify mechanical lock and unlock.',
      'Ensure metal blade works smoothly (vital if car battery ever drains completely).'
    ],
    normalCondition: 'Mechanical key slides out easily and unlocks driver door manually.',
    rejectCondition: 'Wrong key blade cut that does not turn in vehicle door lock.',
    severity: 'major'
  },
  {
    id: 'c26-03',
    categoryId: 'cat-26',
    title: 'All Standard Cabin Accessories (Mud Flaps, Mats, Tow Hook)',
    whatToCheck: 'Confirm all standard delivery kit items are physically in the car.',
    whereToFind: 'Car interior and boot.',
    howToCheck: [
      'Reconcile against standard equipment checklist: floor mats, mud flaps, warning triangle, tool pouch.'
    ],
    normalCondition: 'All standard equipment accounted for and installed.',
    rejectCondition: 'Missing standard accessories included in on-road price.',
    severity: 'minor'
  },
  {
    id: 'c26-04',
    categoryId: 'cat-26',
    title: 'Paid Optional Accessories Fitment & Finish Quality',
    whatToCheck: 'Inspect any dealership accessories billed on separate invoice (e.g. seat covers, scuff plates, sun film).',
    whereToFind: 'Fitted across vehicle.',
    howToCheck: [
      'Cross-check accessory billing sheet.',
      'Ensure accessories are fitted neatly without damaged wiring or peeled adhesive tape.'
    ],
    normalCondition: 'Clean, professional accessory fitment matching paid invoice.',
    rejectCondition: 'Shoddy fitment, peeled 3M tape, spliced wires, or billed items missing.',
    severity: 'major',
    photoRecommended: true
  },

  // =========================================================================
  // CATEGORY 27 — FINAL DOCUMENTATION (5 Checks)
  // =========================================================================
  {
    id: 'c27-01',
    categoryId: 'cat-27',
    title: 'Tax Invoice Reconciliation (VIN, Engine, Price, Taxes)',
    whatToCheck: 'Verify complete tax invoice has correct vehicle details, breakdown of GST/Cess, and dealer signature.',
    whereToFind: 'Official tax invoice document.',
    howToCheck: [
      'Check chassis number, engine number, and model variant.',
      'Ensure payment receipt voucher reflects full advance/down payment made.'
    ],
    normalCondition: 'Accurate, signed, sealed tax invoice.',
    rejectCondition: 'Errors in chassis/engine numbers or unsigned invoice.',
    severity: 'critical'
  },
  {
    id: 'c27-02',
    categoryId: 'cat-27',
    title: 'Form 22 (Roadworthiness & Emissions Certificate)',
    whatToCheck: 'Inspect manufacturer Form 22 issued by Tata Motors plant certifying BS6 Phase 2 emission compliance.',
    whereToFind: 'Delivery documentation pack.',
    howToCheck: [
      'Verify Form 22 contains printed chassis number, engine number, and date of factory signoff.'
    ],
    normalCondition: 'Original OEM Form 22 roadworthiness certificate present.',
    rejectCondition: 'Missing Form 22 (RTO registration cannot be completed without it).',
    severity: 'critical'
  },
  {
    id: 'c27-03',
    categoryId: 'cat-27',
    title: 'Permanent / Temporary Registration Certificate (RC / CRTM)',
    whatToCheck: 'Verify official RTO registration details or temporary CRTM document.',
    whereToFind: 'RTO documentation folder.',
    howToCheck: [
      'Verify vehicle number plate / temporary registration plate matches paperwork.'
    ],
    normalCondition: 'Valid RTO documentation with matching vehicle details.',
    rejectCondition: 'Discrepancy in RTO paperwork or expired temporary permit.',
    severity: 'critical'
  },
  {
    id: 'c27-04',
    categoryId: 'cat-27',
    title: 'Active Insurance Cover Note with Zero-Depreciation & CNG',
    whatToCheck: 'Verify insurance is active with policy number, valid dates, and full add-on riders.',
    whereToFind: 'Insurance policy document.',
    howToCheck: [
      'Confirm start date covers delivery time.',
      'Check chassis and engine numbers.',
      'Verify CNG endorsement is printed on policy schedule.'
    ],
    normalCondition: 'Active policy with 100% correct details and CNG endorsement.',
    rejectCondition: 'Unendorsed policy, missing CNG coverage, or inactive policy.',
    severity: 'critical'
  },
  {
    id: 'c27-05',
    categoryId: 'cat-27',
    title: 'Stamped Warranty Booklet & CNG Cylinder Certificate',
    whatToCheck: 'Ensure service warranty booklet has dealer PDI stamp and CNG PESO test certificate is supplied.',
    whereToFind: 'Service booklet inside glovebox and CNG file.',
    howToCheck: [
      'Open PDI certification page in warranty booklet: confirm dealer has stamped and signed.',
      'Verify CNG cylinder certificate is present with matching serial numbers.'
    ],
    normalCondition: 'Dealer seal and signature stamped on official PDI coupon; valid CNG certificate.',
    rejectCondition: 'Blank, unstamped warranty book or missing CNG test certificate.',
    severity: 'critical'
  },

  // =========================================================================
  // CATEGORY 28 — FINAL ACCEPTANCE REVIEW (1 Check)
  // =========================================================================
  {
    id: 'c28-01',
    categoryId: 'cat-28',
    title: 'Consolidated Inspection Review & Defect Tally Sign-off',
    whatToCheck: 'Review all recorded observations, rejected items, and incomplete checks before signing delivery challan.',
    whereToFind: 'PDI Inspector App Review Screen.',
    howToCheck: [
      'Review all flagged items with the dealership delivery manager.',
      'Ensure any minor defect is documented in writing on the dealer delivery gate pass with promised fix date.',
      'If critical safety defects exist, stop delivery until dealer resolves or replaces vehicle.'
    ],
    normalCondition: 'All critical checks passed; minor observations documented in writing by dealer.',
    rejectCondition: 'Unresolved critical safety issues or dealer refusal to acknowledge documented defects.',
    severity: 'critical',
    whyItMatters: 'Once you sign the delivery challan and drive off the showroom floor, the dealership has no legal obligation to fix pre-delivery cosmetic or transit defects.'
  }
];
