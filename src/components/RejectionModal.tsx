import React, { useState, useRef } from 'react';
import { ChecklistItem } from '../types/pdi';
import { compressImage } from '../services/imageUtils';
import { AlertTriangle, ShieldAlert, Camera, X, Check, Loader2 } from 'lucide-react';

interface RejectionModalProps {
  item: ChecklistItem | null;
  isOpen: boolean;
  initialNotes?: string;
  initialPhotoUrl?: string;
  onClose: () => void;
  onConfirm: (itemId: string, notes: string, photoUrl?: string) => void;
}

export const RejectionModal: React.FC<RejectionModalProps> = ({
  item,
  isOpen,
  initialNotes = '',
  initialPhotoUrl,
  onClose,
  onConfirm
}) => {
  if (!isOpen || !item) return null;

  const [notes, setNotes] = useState(initialNotes);
  const [photoUrl, setPhotoUrl] = useState<string | undefined>(initialPhotoUrl);
  const [isCompressing, setIsCompressing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsCompressing(true);
      setErrorMsg('');
      const compressed = await compressImage(file, 800, 0.65);
      setPhotoUrl(compressed);
    } catch (err) {
      console.error('Photo compression error', err);
      setErrorMsg('Failed to process image. Please try another photo.');
    } finally {
      setIsCompressing(false);
    }
  };

  const handleConfirm = () => {
    if (!notes.trim()) {
      setErrorMsg('Please enter a rejection reason describing what defect you observed.');
      return;
    }
    onConfirm(item.id, notes.trim(), photoUrl);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 bg-slate-50 border-b border-slate-200 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-100 flex items-center justify-center text-rose-600 flex-shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Mark item as REJECTED?</h3>
              <p className="text-xs text-slate-500 mt-0.5">{item.title}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Instruction snippet */}
          <p className="text-xs text-slate-600 leading-relaxed">
            This item should be rejected if the observed condition does not meet the normal condition or if there is a
            significant defect.
          </p>

          {/* Critical Severity Callout */}
          {item.severity === 'critical' && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-900 space-y-1.5">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-rose-600 flex-shrink-0" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-800">
                  ⚠ Critical Issue Detected
                </h4>
              </div>
              <p className="text-xs font-medium leading-relaxed pl-7 text-rose-800">
                We recommend stopping the PDI and asking the dealer to resolve or professionally inspect this issue before
                accepting the vehicle.
              </p>
            </div>
          )}

          {/* Reference: Normal vs Red flag */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <div>
              <span className="font-bold text-emerald-800">Normal Condition: </span>
              <span className="text-slate-700">{item.normalCondition}</span>
            </div>
            <div>
              <span className="font-bold text-rose-800">Reject Condition: </span>
              <span className="text-slate-700">{item.rejectCondition}</span>
            </div>
          </div>

          {/* Rejection reason / notes input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-800">
              Rejection reason / observation notes <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => {
                setNotes(e.target.value);
                if (errorMsg) setErrorMsg('');
              }}
              placeholder='Describe what you found. Example: "Scratch approximately 10 cm long on left rear door lower section."'
              className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:outline-none"
            />
            {errorMsg && <p className="text-xs text-rose-600 font-medium">{errorMsg}</p>}
          </div>

          {/* Optional Photo Attachment */}
          <div className="space-y-2 pt-1">
            <label className="block text-xs font-bold text-slate-800">
              Photo Evidence (Optional, highly recommended for body/VIN issues)
            </label>

            {photoUrl ? (
              <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 max-h-48 flex items-center justify-center group">
                <img src={photoUrl} alt="Inspection rejection evidence" className="object-contain max-h-48 w-full" />
                <button
                  type="button"
                  onClick={() => setPhotoUrl(undefined)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-900/80 text-white hover:bg-rose-600 transition-colors shadow-sm"
                  title="Remove Photo"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <button
                  type="button"
                  disabled={isCompressing}
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3 px-4 rounded-xl border-2 border-dashed border-slate-300 hover:border-slate-400 bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  {isCompressing ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-sky-600" />
                      <span>Optimizing photo...</span>
                    </>
                  ) : (
                    <>
                      <Camera className="w-4 h-4 text-slate-500" />
                      <span>Take Photo / Upload Image</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleConfirm}
            className="px-5 py-2 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 transition-colors shadow-sm shadow-rose-600/20 flex items-center gap-1.5"
          >
            <Check className="w-4 h-4" />
            <span>Confirm Reject</span>
          </button>
        </div>
      </div>
    </div>
  );
};
