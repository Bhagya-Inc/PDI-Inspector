import React, { useState } from 'react';
import { VehicleProfile } from '../types/pdi';
import { DEFAULT_VEHICLE, VEHICLE_CATALOG } from '../data/defaultVehicle';
import { ArrowLeft, Car, Sparkles, Check } from 'lucide-react';

interface NewInspectionPageProps {
  onBack: () => void;
  onStartInspection: (vehicle: VehicleProfile) => void;
}

export const NewInspectionPage: React.FC<NewInspectionPageProps> = ({
  onBack,
  onStartInspection
}) => {
  const [formData, setFormData] = useState<VehicleProfile>({
    ...DEFAULT_VEHICLE,
    inspectionDate: new Date().toISOString().split('T')[0]
  });

  const [selectedManufacturer, setSelectedManufacturer] = useState('Tata');
  const [selectedModel, setSelectedModel] = useState('Nexon');

  // Handle Preset Selection
  const handleManufacturerChange = (mfr: string) => {
    setSelectedManufacturer(mfr);
    const mfrData = VEHICLE_CATALOG.find((c) => c.manufacturer === mfr);
    if (mfrData && mfrData.models.length > 0) {
      const firstModel = mfrData.models[0];
      setSelectedModel(firstModel.name);
      setFormData((prev) => ({
        ...prev,
        manufacturer: mfr,
        model: firstModel.name,
        variant: firstModel.variants[0] || '',
        fuelTypes: firstModel.fuelOptions[0] || ['Petrol'],
        transmission: firstModel.transmissions[0] || 'Manual'
      }));
    } else {
      setFormData((prev) => ({ ...prev, manufacturer: mfr }));
    }
  };

  const handleModelChange = (modelName: string) => {
    setSelectedModel(modelName);
    const mfrData = VEHICLE_CATALOG.find((c) => c.manufacturer === selectedManufacturer);
    const modData = mfrData?.models.find((m) => m.name === modelName);
    if (modData) {
      setFormData((prev) => ({
        ...prev,
        model: modelName,
        variant: modData.variants[0] || '',
        fuelTypes: modData.fuelOptions[0] || ['Petrol'],
        transmission: modData.transmissions[0] || 'Manual'
      }));
    } else {
      setFormData((prev) => ({ ...prev, model: modelName }));
    }
  };

  const handleFuelToggle = (fuel: string) => {
    setFormData((prev) => {
      const exists = prev.fuelTypes.includes(fuel);
      if (exists && prev.fuelTypes.length > 1) {
        return { ...prev, fuelTypes: prev.fuelTypes.filter((f) => f !== fuel) };
      } else if (!exists) {
        return { ...prev, fuelTypes: [...prev.fuelTypes, fuel] };
      }
      return prev;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartInspection(formData);
  };

  const currentMfrCatalog = VEHICLE_CATALOG.find((c) => c.manufacturer === selectedManufacturer);
  const currentModelCatalog = currentMfrCatalog?.models.find((m) => m.name === selectedModel);

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <span className="text-xs text-slate-500">Step 1 of 2: Vehicle Setup</span>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold mb-2">
            <Car className="w-3.5 h-3.5" />
            <span>Inspection Dossier</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">Vehicle Information</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Pre-populated with default Tata Nexon Pure Plus iCNG (Manual). You can customize any field below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Quick Model Selector Pills */}
          <div className="space-y-3 p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700">Quick Vehicle Presets</span>
              <span className="text-[11px] text-slate-400">Extensible catalog</span>
            </div>

            {/* Manufacturer Selector */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {VEHICLE_CATALOG.map((cat) => (
                <button
                  key={cat.manufacturer}
                  type="button"
                  onClick={() => handleManufacturerChange(cat.manufacturer)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedManufacturer === cat.manufacturer
                      ? 'bg-sky-600 text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-200/60 border border-slate-200'
                  }`}
                >
                  {cat.manufacturer}
                </button>
              ))}
            </div>

            {/* Model Selector */}
            {currentMfrCatalog && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none pt-1">
                {currentMfrCatalog.models.map((mod) => (
                  <button
                    key={mod.name}
                    type="button"
                    onClick={() => handleModelChange(mod.name)}
                    className={`px-3 py-1 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                      selectedModel === mod.name
                        ? 'bg-slate-900 text-white shadow-xs font-bold'
                        : 'bg-white text-slate-600 hover:bg-slate-200/60 border border-slate-200'
                    }`}
                  >
                    {mod.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Core Vehicle Specifications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Manufacturer *</label>
              <input
                type="text"
                required
                value={formData.manufacturer}
                onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Model Name *</label>
              <input
                type="text"
                required
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Variant *</label>
              <input
                type="text"
                required
                value={formData.variant}
                onChange={(e) => setFormData({ ...formData, variant: e.target.value })}
                list="variant-options"
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
              {currentModelCatalog && (
                <datalist id="variant-options">
                  {currentModelCatalog.variants.map((v) => (
                    <option key={v} value={v} />
                  ))}
                </datalist>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Exterior Paint Colour *</label>
              <input
                type="text"
                required
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            {/* Fuel Type Multi-Select Pills */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Fuel Type(s) *</label>
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {['CNG', 'Petrol', 'Diesel', 'EV', 'Strong Hybrid'].map((fuel) => {
                  const selected = formData.fuelTypes.includes(fuel);
                  return (
                    <button
                      key={fuel}
                      type="button"
                      onClick={() => handleFuelToggle(fuel)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-all ${
                        selected
                          ? 'bg-emerald-600 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {selected && <Check className="w-3 h-3" />}
                      <span>{fuel}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Transmission Select */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Transmission *</label>
              <select
                value={formData.transmission}
                onChange={(e) => setFormData({ ...formData, transmission: e.target.value })}
                className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white"
              >
                <option value="Manual">Manual</option>
                <option value="Automatic">Automatic (Torque Converter)</option>
                <option value="AMT">AMT</option>
                <option value="DCT">DCT / DCA</option>
                <option value="CVT">CVT / IVT</option>
              </select>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Delivery & Identification Details Grid */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-3">Identification & Delivery Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">VIN / Chassis Number</label>
                <input
                  type="text"
                  placeholder="e.g. MAT878023TAHC2764"
                  autoCapitalize='characters'
                  value={formData.vin}
                  onChange={(e) => setFormData({ ...formData, vin: e.target.value.toUpperCase() })}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none font-mono tracking-wider"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Engine Number</label>
                <input
                  type="text"
                  placeholder="e.g. AB21ABJ3I89090"
                  autoCapitalize='characters'
                  value={formData.engineNumber}
                  onChange={(e) => setFormData({ ...formData, engineNumber: e.target.value.toUpperCase() })}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Odometer Reading (km)</label>
                <input
                  type="text"
                  placeholder="e.g. 24"
                  value={formData.odometerReading}
                  onChange={(e) => setFormData({ ...formData, odometerReading: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Manufacturing Month / Year</label>
                <input
                  type="text"
                  placeholder="e.g. Aug 2026"
                  value={formData.manufacturingMonthYear}
                  onChange={(e) => setFormData({ ...formData, manufacturingMonthYear: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Dealership Name</label>
                <input
                  type="text"
                  placeholder="e.g. Tata Motors Showroom"
                  value={formData.dealerName}
                  onChange={(e) => setFormData({ ...formData, dealerName: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Inspector / Buyer Name</label>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={formData.inspectorName}
                  onChange={(e) => setFormData({ ...formData, inspectorName: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Inspection Date</label>
                <input
                  type="date"
                  value={formData.inspectionDate}
                  onChange={(e) => setFormData({ ...formData, inspectionDate: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Registration / CRTM Number</label>
                <input
                  type="text"
                  placeholder="Temporary or Applied For"
                  value={formData.registrationNumber || ''}
                  onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                  className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onBack}
              className="px-5 py-3 rounded-2xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-8 py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-bold shadow-md shadow-sky-600/20 transition-all active:scale-98 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Inspection Session</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
