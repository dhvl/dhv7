'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InquiryModal({ isOpen, onClose }: InquiryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Product Strategy',
    message: ''
  });
  const [selectedServices, setSelectedServices] = useState<string[]>(['Product Strategy']);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const services = [
    'Product Strategy',
    'UI/UX Direction',
    'Applied AI & Automation',
    'Full-Stack Development',
    'Custom Brand Strategy'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage('Please fill out all required fields.');
      return;
    }

    setStatus('submitting');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          service: selectedServices.join(', ')
        })
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', service: 'Product Strategy', message: '' });
        setSelectedServices(['Product Strategy']);
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage('Network error. Please try again.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', duration: 0.5 }}
            className="relative w-full max-w-lg overflow-hidden rounded-[32px] border border-white/10 bg-zinc-950 p-8 md:p-10 shadow-2xl z-10 glass-panel"
          >
            {/* Corner ambient glow */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-[40px] pointer-events-none -z-10" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Inquiry Launched!</h3>
                <p className="text-zinc-400 text-sm md:text-base max-w-xs mx-auto mb-8 leading-relaxed">
                  Thank you for reaching out. Dhaval will review your request and get back to you shortly.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-white text-black font-semibold rounded-full text-sm hover:bg-zinc-200 transition-all cursor-pointer"
                >
                  Return to Portfolio
                </button>
              </motion.div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-blue-400" />
                  <span className="text-xs uppercase tracking-widest text-zinc-400 font-semibold">Start a Project</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-6 tracking-tight">Let's Collaborate.</h3>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs text-zinc-400 font-semibold mb-2 uppercase tracking-wider">Your Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Dhaval Vadgama"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 font-semibold mb-2 uppercase tracking-wider">Your Email *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@domain.com"
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 transition-colors text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 font-semibold mb-3 uppercase tracking-wider">Expertise Required (Select Multiple)</label>
                    <div className="flex flex-wrap gap-2">
                      {services.map((service) => {
                        const isSelected = selectedServices.includes(service);
                        return (
                          <button
                            key={service}
                            type="button"
                            onClick={() => {
                              if (isSelected) {
                                if (selectedServices.length > 1) {
                                  setSelectedServices(selectedServices.filter((s) => s !== service));
                                }
                              } else {
                                setSelectedServices([...selectedServices, service]);
                              }
                            }}
                            className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all duration-300 cursor-pointer ${
                              isSelected
                                ? 'bg-blue-500/20 text-blue-300 border-blue-500/40 shadow-[0_0_12px_rgba(59,130,246,0.15)]'
                                : 'bg-white/5 text-zinc-400 border-white/10 hover:text-white hover:bg-white/10'
                            }`}
                          >
                            {service}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs text-zinc-400 font-semibold mb-2 uppercase tracking-wider">Project Details *</label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your product vision, brand goals, or technical orchestration requirements..."
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 transition-colors text-sm resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-rose-400 text-xs font-semibold">{errorMessage}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-4 bg-white hover:bg-zinc-200 text-black font-semibold rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 text-sm font-heading tracking-wide shadow-[inset_0_-2px_4px_0_rgba(255,255,255,0.4)]"
                  >
                    {status === 'submitting' ? (
                      'Sending Inquiry...'
                    ) : (
                      <>
                        Launch Inquiry
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center my-4">
                    <div className="flex-grow border-t border-white/5"></div>
                    <span className="mx-3.5 text-[10px] text-zinc-500 uppercase tracking-widest font-extrabold">or</span>
                    <div className="flex-grow border-t border-white/5"></div>
                  </div>

                  <a
                    href="https://wa.me/918128181213?text=Hi%2C%20I%20just%20saw%20your%20profile%20on%20dhv7.com%20and"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-[#25D366] text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all duration-300 text-sm hover:scale-[1.02] animate-whatsapp-breathe cursor-pointer"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.454 5.709 1.455h.008c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413"/>
                    </svg>
                    Send a WhatsApp
                  </a>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
