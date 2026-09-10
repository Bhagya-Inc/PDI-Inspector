import { VehicleProfile } from '../types/pdi';

export const DEFAULT_VEHICLE: VehicleProfile = {
  id: 'session-tata-nexon-default',
  manufacturer: 'Tata',
  model: 'Nexon',
  variant: 'Pure Plus iCNG',
  fuelTypes: ['CNG', 'Petrol'],
  transmission: 'Manual',
  color: 'Pristine White',
  vin: '',
  engineNumber: '',
  registrationNumber: '',
  dealerName: '',
  inspectionDate: new Date().toISOString().split('T')[0],
  inspectorName: '',
  odometerReading: '',
  manufacturingMonthYear: ''
};

export interface VehicleCatalogItem {
  manufacturer: string;
  models: {
    name: string;
    variants: string[];
    fuelOptions: string[][];
    transmissions: string[];
  }[];
}

export const VEHICLE_CATALOG: VehicleCatalogItem[] = [
  {
    manufacturer: 'Tata',
    models: [
      {
        name: 'Nexon',
        variants: ['Smart', 'Smart Plus', 'Pure', 'Pure Plus', 'Pure Plus iCNG', 'Creative', 'Fearless'],
        fuelOptions: [['CNG', 'Petrol'], ['Petrol'], ['Diesel'], ['EV']],
        transmissions: ['Manual', 'AMT', 'DCA (DCT)']
      },
      {
        name: 'Punch',
        variants: ['Pure', 'Adventure', 'Accomplished', 'Creative', 'Adventure iCNG', 'Accomplished iCNG'],
        fuelOptions: [['CNG', 'Petrol'], ['Petrol'], ['EV']],
        transmissions: ['Manual', 'AMT']
      },
      {
        name: 'Curvv',
        variants: ['Smart', 'Pure Plus', 'Creative', 'Accomplished'],
        fuelOptions: [['Petrol'], ['Diesel'], ['EV']],
        transmissions: ['Manual', 'DCA (DCT)']
      },
      {
        name: 'Harrier',
        variants: ['Smart', 'Pure', 'Adventure', 'Fearless'],
        fuelOptions: [['Diesel']],
        transmissions: ['Manual', 'Automatic (Torque Converter)']
      }
    ]
  },
  {
    manufacturer: 'Maruti Suzuki',
    models: [
      {
        name: 'Brezza',
        variants: ['LXi', 'VXi', 'ZXi', 'ZXi Plus', 'VXi S-CNG', 'ZXi S-CNG'],
        fuelOptions: [['CNG', 'Petrol'], ['Petrol']],
        transmissions: ['Manual', 'Automatic (Torque Converter)']
      },
      {
        name: 'Grand Vitara',
        variants: ['Sigma', 'Delta', 'Zeta', 'Alpha', 'Delta CNG', 'Zeta CNG'],
        fuelOptions: [['CNG', 'Petrol'], ['Petrol'], ['Strong Hybrid']],
        transmissions: ['Manual', 'Automatic', 'e-CVT']
      },
      {
        name: 'Fronx',
        variants: ['Sigma', 'Delta', 'Delta Plus', 'Zeta', 'Alpha', 'Sigma S-CNG'],
        fuelOptions: [['CNG', 'Petrol'], ['Petrol'], ['Turbo Petrol']],
        transmissions: ['Manual', 'AMT', 'Automatic']
      }
    ]
  },
  {
    manufacturer: 'Hyundai',
    models: [
      {
        name: 'Creta',
        variants: ['E', 'EX', 'S', 'S(O)', 'SX', 'SX Tech', 'SX(O)'],
        fuelOptions: [['Petrol'], ['Diesel'], ['Turbo Petrol']],
        transmissions: ['Manual', 'IVT (CVT)', 'Automatic (AT)', 'DCT']
      },
      {
        name: 'Venue',
        variants: ['E', 'S', 'S+', 'S(O)', 'SX', 'SX(O)'],
        fuelOptions: [['Petrol'], ['Diesel'], ['Turbo Petrol']],
        transmissions: ['Manual', 'DCT']
      }
    ]
  },
  {
    manufacturer: 'Kia',
    models: [
      {
        name: 'Sonet',
        variants: ['HTE', 'HTK', 'HTK Plus', 'HTX', 'HTX Plus', 'GTX Plus', 'X-Line'],
        fuelOptions: [['Petrol'], ['Diesel'], ['Turbo Petrol']],
        transmissions: ['Manual', 'iMT', 'Automatic', 'DCT']
      },
      {
        name: 'Seltos',
        variants: ['HTE', 'HTK', 'HTX', 'HTX Plus', 'GTX Plus', 'X-Line'],
        fuelOptions: [['Petrol'], ['Diesel'], ['Turbo Petrol']],
        transmissions: ['Manual', 'iMT', 'IVT', 'Automatic', 'DCT']
      }
    ]
  },
  {
    manufacturer: 'Mahindra',
    models: [
      {
        name: 'XUV 3XO',
        variants: ['MX1', 'MX2', 'MX3', 'AX5', 'AX7', 'AX7 Luxury'],
        fuelOptions: [['Petrol'], ['Diesel'], ['TGDi Turbo Petrol']],
        transmissions: ['Manual', 'Automatic (TC)']
      },
      {
        name: 'Scorpio-N',
        variants: ['Z2', 'Z4', 'Z6', 'Z8', 'Z8L'],
        fuelOptions: [['Petrol'], ['Diesel']],
        transmissions: ['Manual', 'Automatic']
      }
    ]
  }
];
