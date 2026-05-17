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
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', service: 'Product Strategy', message: '' });
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
                    <label className="block text-xs text-zinc-400 font-semibold mb-2 uppercase tracking-wider">Expertise Required</label>
                    <select
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-900 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-blue-500/50 transition-colors text-sm cursor-pointer"
                    >
                      {services.map((service) => (
                        <option key={service} value={service} className="bg-zinc-950 text-white">
                          {service}
                        </option>
                      ))}
                    </select>
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
                    className="w-full py-4 bg-white hover:bg-zinc-200 text-black font-semibold rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50 text-sm"
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
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
