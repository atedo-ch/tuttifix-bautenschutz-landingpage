import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface HubSpotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const HubSpotModal: React.FC<HubSpotModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      // Load HubSpot forms script
      const script = document.createElement('script');
      script.src = '//js-eu1.hsforms.net/forms/embed/v2.js';
      script.charset = 'utf-8';
      script.type = 'text/javascript';
      script.async = true;

      script.onload = () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const hsWindow = window as any;
        if (hsWindow.hbspt) {
          hsWindow.hbspt.forms.create({
            portalId: "147689950",
            formId: "0b771fd7-841b-4bc1-94e7-cbcd2cc18c42",
            region: "eu1",
            target: "#hubspot-form-container"
          });
        }
      };

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-white w-full max-w-4xl rounded-sm overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 text-brand-dark/50 hover:text-brand-red transition-colors"
            >
              <X size={24} />
            </button>

            {/* Left Column: Visual */}
            <div className="hidden md:block md:w-2/5 bg-brand-lightGray">
              <img
                src="https://raw.githubusercontent.com/atedo-ch/tuttifix-brandassets/main/300x484_Display-Whitepaper.png"
                alt="Whitepaper Visual"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Right Column: Form */}
            <div className="flex-1 p-8 md:p-12 overflow-y-auto">
              <div className="mb-8">
                <h3 className="font-h2 text-brand-dark mb-2">Leitfaden herunterladen</h3>
                <p className="text-brand-dark/70">Bitte füllen Sie das Formular aus, um den SIA-469-Leitfaden zu erhalten.</p>
              </div>
              <div id="hubspot-form-container" className="min-h-[400px]">
                {/* Form will be injected here */}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default HubSpotModal;
