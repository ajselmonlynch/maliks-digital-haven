import { useState } from "react";
import { Phone, MessageCircle, X, ChevronUp } from "lucide-react";

const WHATSAPP_NUMBER = "16175550199";
const PHONE_NUMBER = "+16175550199";
const WHATSAPP_MESSAGE =
  "Hi! I'm interested in a solar backup or grow automation system. Can you help me find the right solution?";

const ConsultationCTA = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2"
      aria-label="Expert consultation options"
    >
      {/* Expanded options */}
      {expanded && (
        <div className="flex flex-col gap-2 mb-1 animate-in fade-in slide-in-from-bottom-2 duration-200">
          {/* WhatsApp */}
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-semibold px-4 py-2.5 rounded-sm shadow-lg transition-all"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle size={16} />
            WhatsApp Us
          </a>

          {/* Phone */}
          <a
            href={`tel:${PHONE_NUMBER}`}
            className="flex items-center gap-3 bg-card hover:bg-secondary border border-border text-foreground text-sm font-semibold px-4 py-2.5 rounded-sm shadow-lg transition-all"
            aria-label="Call us"
          >
            <Phone size={16} className="text-primary" />
            (617) 555-0199
          </a>
        </div>
      )}

      {/* Main toggle button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-4 py-3 rounded-sm shadow-glow-red-sm hover:shadow-glow-red transition-all"
        aria-expanded={expanded}
        aria-label="Speak to an expert"
      >
        {expanded ? (
          <>
            <X size={15} />
            Close
          </>
        ) : (
          <>
            <Phone size={15} />
            Speak to an Expert
            <ChevronUp size={13} className="ml-1" />
          </>
        )}
      </button>
    </div>
  );
};

export default ConsultationCTA;
