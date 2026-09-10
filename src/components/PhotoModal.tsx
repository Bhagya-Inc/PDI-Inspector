import React from 'react';
import { X } from 'lucide-react';

interface PhotoModalProps {
  photoUrl: string | null;
  onClose: () => void;
}

export const PhotoModal: React.FC<PhotoModalProps> = ({ photoUrl, onClose }) => {
  if (!photoUrl) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
      <div className="relative max-w-4xl max-h-[90vh] bg-slate-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        <div className="p-3 bg-slate-950 flex items-center justify-between text-white border-b border-slate-800">
          <span className="text-xs font-semibold tracking-wide text-slate-300">Photo Evidence Preview</span>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-2 flex items-center justify-center overflow-auto max-h-[80vh]">
          <img src={photoUrl} alt="Enlarged photo evidence" className="max-w-full max-h-[75vh] object-contain rounded-lg" />
        </div>
      </div>
    </div>
  );
};
