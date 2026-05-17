'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Calendar, Clock, Video, ArrowRight, User, Mail, Building, Check, ChevronRight, Star 
} from 'lucide-react';
import Image from 'next/image';

interface SchedulerModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode?: boolean;
}

export default function SchedulerModal({ isOpen, onClose, isDarkMode = true }: SchedulerModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Direct Meet Custom Booking states
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingForm, setBookingForm] = useState({ name: '', email: '', company: '', notes: '' });
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [meetLink, setMeetLink] = useState('');
  const [userTimeZone, setUserTimeZone] = useState('Asia/Kolkata');
  
  // Checklist Services Multi-selection
  const services = [
    'Product Strategy',
    'UI/UX Direction',
    'Applied AI & Automation',
    'Full-Stack Development',
    'Custom Brand Strategy'
  ];
  const [selectedServices, setSelectedServices] = useState<string[]>(['Product Strategy']);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const detected = Intl.DateTimeFormat().resolvedOptions().timeZone;
        if (detected) {
          setUserTimeZone(detected);
        }
      } catch (e) {
        console.error("TimeZone detection error:", e);
      }
    }
  }, []);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Click outside listener
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  // Custom booking calendar calculations
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const getDaysInMonth = (y: number, m: number) => {
    return new Date(y, m + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (y: number, m: number) => {
    return new Date(y, m, 1).getDay();
  };

  const yearNum = currentDate.getFullYear();
  const monthNum = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(yearNum, monthNum);
  const firstDay = getFirstDayOfMonth(yearNum, monthNum);

  // Generate days grid array
  const daysArray: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    daysArray.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    daysArray.push(new Date(yearNum, monthNum, d));
  }

  const getAvailableSlots = (date: Date | null) => {
    if (!date) return [];
    
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    
    // Native availability hours in Asia/Kolkata timezone:
    // Weekdays: 7:00 PM - 11:00 PM (19:00, 20:00, 21:00, 22:00 starting hours for 60-min slots)
    // Weekends: 11:00 AM - 11:00 PM (11:00 to 22:00 starting hours for 60-min slots)
    const kolkataHours = isWeekend 
      ? [11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22]
      : [19, 20, 21, 22];

    const slots: string[] = [];
    
    kolkataHours.forEach(hour => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hh = String(hour).padStart(2, '0');
      const isoStr = `${year}-${month}-${day}T${hh}:00:00+05:30`;
      const slotDate = new Date(isoStr);
      
      const formattedTime = slotDate.toLocaleTimeString([], {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
      
      let dayBadge = '';
      if (slotDate.getDate() !== date.getDate()) {
        const diffTime = slotDate.getTime() - date.getTime();
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays > 0) {
          dayBadge = ' (+1d)';
        } else if (diffDays < 0) {
          dayBadge = ' (-1d)';
        }
      }
      
      slots.push(`${formattedTime}${dayBadge}`);
    });
    
    return slots;
  };

  const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingForm.name || !bookingForm.email || !bookingForm.notes) return;
    setBookingStatus('submitting');
    setTimeout(() => {
      const randomId = Math.random().toString(36).substring(2, 5) + "-" + 
                       Math.random().toString(36).substring(2, 6) + "-" + 
                       Math.random().toString(36).substring(2, 5);
      setMeetLink(`meet.google.com/${randomId}`);
      setBookingStatus('success');
    }, 1500);
  };

  const handleResetBooking = () => {
    setSelectedTime(null);
    setBookingForm({ name: '', email: '', company: '', notes: '' });
    setBookingStatus('idle');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          onClick={handleBackdropClick}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className={`relative w-full max-w-5xl rounded-3xl border backdrop-blur-xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 ${
              isDarkMode 
                ? 'border-white/10 bg-[#090e1a]/95 text-white shadow-cyan-950/20' 
                : 'border-slate-200 bg-white text-slate-800 shadow-slate-200/50'
            }`}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className={`absolute top-5 right-5 p-2 rounded-full border transition-all z-20 cursor-pointer ${
                isDarkMode 
                  ? 'border-white/10 hover:bg-white/5 text-zinc-400 hover:text-white' 
                  : 'border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-900'
              }`}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Panel: Direct Session Context Details */}
            <div className={`p-8 lg:p-10 lg:col-span-5 flex flex-col justify-between border-b lg:border-b-0 lg:border-r transition-colors relative ${
              isDarkMode 
                ? 'border-white/5 text-white bg-zinc-950/40' 
                : 'border-slate-100 text-slate-800 bg-slate-50/50'
            }`}>
              <div className="space-y-6 flex-grow">
                {/* Profile Details */}
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#00C3FF]">
                    <Image 
                      src="/assets/profile-picture-dhaval-sqr.png" 
                      alt="Dhaval Vadgama avatar"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#00C3FF] tracking-wider block">Lead Systems Architect</span>
                    <h4 className="text-sm font-bold">Dhaval Vadgama</h4>
                    <span className="inline-flex items-center gap-1 mt-0.5 text-[9px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping" /> Available Online
                    </span>
                  </div>
                </div>

                {/* alignment content info */}
                <div className="space-y-3">
                  <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">60-Min Technical & Design Alignment</h3>
                  <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                    An intensive discovery workshop to map out system requirements, outline backend pipelines, evaluate UI visual fidelity benchmarks, and review project timelines.
                  </p>
                </div>

                {/* Bullets */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2.5 text-xs font-semibold">
                    <Clock className="w-4 h-4 text-[#00C3FF]" />
                    <span>60 Minutes Duration</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-xs font-semibold">
                    <Video className="w-4 h-4 text-[#00C3FF]" />
                    <span>Google Meet</span>
                  </div>
                </div>

                {/* 📌 Services Checklist Multi-Selection in free space */}
                <div className="pt-4 border-t border-white/5 space-y-3">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 block">
                    Services Required (Select Multiple)
                  </span>
                  <div className="space-y-2">
                    {services.map((service) => {
                      const isChecked = selectedServices.includes(service);
                      return (
                        <label 
                          key={service} 
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold cursor-pointer select-none transition-all duration-300 border ${
                            isChecked
                              ? 'bg-[#00C3FF]/10 text-[#00C3FF] border-[#00C3FF]/30'
                              : 'bg-white/5 text-zinc-400 border-white/5 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => {
                              if (isChecked) {
                                if (selectedServices.length > 1) {
                                  setSelectedServices(selectedServices.filter((s) => s !== service));
                                }
                              } else {
                                setSelectedServices([...selectedServices, service]);
                              }
                            }}
                            className="rounded border-white/15 bg-zinc-900 text-[#00C3FF] focus:ring-0 focus:ring-offset-0 cursor-pointer w-4 h-4"
                          />
                          <span>{service}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Confidence Building Stats / Ratings */}
              <div className="pt-6 mt-6 border-t border-white/5 w-full space-y-4">
                <div className={`p-4 rounded-2xl border transition-colors ${
                  isDarkMode 
                    ? 'bg-white/[0.02] border-white/5 text-zinc-300' 
                    : 'bg-slate-50 border-slate-100 text-slate-700'
                }`}>
                  <div className="flex items-center gap-1.5 text-amber-400 mb-1.5">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <Star className="w-3.5 h-3.5 fill-current animate-pulse" />
                    <span className={`text-[10px] font-extrabold ml-1.5 px-2 py-0.5 rounded-md uppercase tracking-wider ${
                      isDarkMode ? 'bg-[#00C3FF]/10 text-[#00C3FF]' : 'bg-slate-900/10 text-slate-800'
                    }`}>
                      4.9/5 Rating
                    </span>
                  </div>
                  <p className={`text-[10px] leading-relaxed ${isDarkMode ? 'text-zinc-400' : 'text-slate-500'}`}>
                    "Dhaval’s architecture workshops are incredibly dense, hyper-practical, and immediately actionable."
                  </p>
                  <span className="text-[9px] font-bold block mt-1.5 opacity-80">— Founder, Applied AI Automation</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className={`p-3 rounded-2xl border text-center transition-colors ${
                    isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-slate-100'
                  }`}>
                    <span className="text-lg font-black text-[#00C3FF] block tracking-tight">40+</span>
                    <span className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 block mt-0.5">Systems Scaled</span>
                  </div>
                  <div className={`p-3 rounded-2xl border text-center transition-colors ${
                    isDarkMode ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-slate-100'
                  }`}>
                    <span className="text-lg font-black text-[#00C3FF] block tracking-tight">100%</span>
                    <span className="text-[9px] uppercase font-bold tracking-wider text-zinc-500 block mt-0.5">Direct Collaboration</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel: Calendar Grid & Form Step Controllers */}
            <div className="p-8 lg:p-10 lg:col-span-7 flex flex-col justify-center max-h-[90vh] overflow-y-auto">
              <AnimatePresence mode="wait">
                
                {bookingStatus === 'idle' && (
                  <motion.div
                    key="scheduler"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-6"
                  >
                    {!selectedTime ? (
                      <div>
                        {/* Step 1: Calendar View */}
                        <div className="flex items-center justify-between mb-6">
                          <div>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-[#00C3FF] block">Step 01 of 02</span>
                            <h4 className="text-lg font-bold">Select Date & Time</h4>
                          </div>
                          
                          {/* Calendar Navigation */}
                          <div className="flex items-center gap-2">
                            <button 
                              type="button"
                              onClick={handlePrevMonth}
                              className={`p-2 rounded-full border transition-all cursor-pointer ${isDarkMode ? 'border-white/10 hover:bg-white/5' : 'border-slate-200 hover:bg-slate-50'}`}
                            >
                              <ChevronRight className="w-4 h-4 rotate-180" />
                            </button>
                            <span className="text-xs font-extrabold uppercase tracking-wider min-w-[90px] text-center">
                              {monthNames[monthNum]} {yearNum}
                            </span>
                            <button 
                              type="button"
                              onClick={handleNextMonth}
                              className={`p-2 rounded-full border transition-all cursor-pointer ${isDarkMode ? 'border-white/10 hover:bg-white/5' : 'border-slate-200 hover:bg-slate-50'}`}
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Calendar Grid */}
                        <div className="grid grid-cols-7 gap-1.5 text-center text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-2">
                          <span>Su</span><span>Mo</span><span>Tu</span><span>We</span><span>Th</span><span>Fr</span><span>Sa</span>
                        </div>
                        <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-6">
                          {daysArray.map((dateItem, idx) => {
                            if (!dateItem) return <div key={`empty-${idx}`} />;
                            
                            const isToday = dateItem.toDateString() === new Date().toDateString();
                            const isSelected = selectedDate ? dateItem.toDateString() === selectedDate.toDateString() : false;
                            const todayCheck = new Date();
                            todayCheck.setHours(0, 0, 0, 0);
                            const isPastDate = dateItem.getTime() < todayCheck.getTime();
                            const isWeekend = dateItem.getDay() === 0 || dateItem.getDay() === 6;

                            return (
                              <button
                                type="button"
                                key={`day-${idx}`}
                                disabled={isPastDate}
                                onClick={() => {
                                  setSelectedDate(dateItem);
                                  setSelectedTime(null);
                                }}
                                className={`aspect-square w-full rounded-full flex flex-col items-center justify-center text-xs font-semibold relative transition-all duration-300 cursor-pointer ${
                                  isSelected 
                                    ? 'bg-[#00C3FF] text-black font-extrabold shadow-lg shadow-[#00C3FF]/30 scale-105' 
                                    : isPastDate 
                                      ? 'text-zinc-600 opacity-20 cursor-not-allowed' 
                                      : isDarkMode 
                                        ? 'text-white hover:bg-white/5' 
                                        : 'text-slate-800 hover:bg-slate-100'
                                }`}
                              >
                                <span>{dateItem.getDate()}</span>
                                {isToday && !isSelected && (
                                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#00C3FF]" />
                                )}
                                {isWeekend && !isPastDate && !isSelected && (
                                  <span className="absolute top-1 right-1 text-[8px] opacity-40 font-bold">WE</span>
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {/* Step 2: Time Slots Strip */}
                        {selectedDate && (
                          <div className="space-y-3 pt-4 border-t transition-colors border-white/5">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider text-zinc-400 block">
                              Available slots for {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                            </span>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-[140px] overflow-y-auto pr-1">
                              {getAvailableSlots(selectedDate).map((time, i) => (
                                <button
                                  type="button"
                                  key={`slot-${i}`}
                                  onClick={() => setSelectedTime(time)}
                                  className={`py-2 rounded-xl text-xs font-bold transition-all duration-300 border cursor-pointer ${
                                    isDarkMode 
                                      ? 'border-white/5 hover:border-[#00C3FF]/50 bg-white/5 text-white hover:bg-[#00C3FF]/10' 
                                      : 'border-slate-200 hover:border-cyan-500 bg-slate-50 text-slate-700 hover:bg-cyan-50/50'
                                  }`}
                                >
                                  {time}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      /* Booking Details Form input overlay */
                      <form onSubmit={handleBookingSubmit} className="space-y-4">
                        <div className="flex items-center justify-between pb-3 border-b transition-colors border-white/5">
                          <div>
                            <span className="text-[10px] uppercase font-bold tracking-wider text-[#00C3FF] block">Step 02 of 02</span>
                            <h4 className="text-lg font-bold">Guest Booking Details</h4>
                          </div>
                          <button
                            type="button"
                            onClick={() => setSelectedTime(null)}
                            className={`text-xs font-bold underline transition-colors cursor-pointer ${isDarkMode ? 'text-zinc-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
                          >
                            Change Date/Time
                          </button>
                        </div>

                        <div className="p-3.5 rounded-xl border text-xs font-semibold flex items-center gap-3 transition-colors duration-300 border-dashed border-[#00C3FF]/30 bg-[#00C3FF]/5">
                          <Calendar className="w-4 h-4 text-[#00C3FF]" />
                          <div>
                            <span className="text-[9px] uppercase tracking-wider block text-zinc-400">Appointment Period</span>
                            <span>{selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })} at {selectedTime}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-extrabold uppercase text-zinc-400">Your Full Name *</label>
                            <div className="relative">
                              <User className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                              <input 
                                type="text"
                                required
                                value={bookingForm.name}
                                onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                                placeholder="e.g. Sterling Dynamics"
                                className={`w-full h-10 pl-10 pr-4 rounded-xl text-xs border focus:outline-none transition-all ${
                                  isDarkMode 
                                    ? 'bg-zinc-950/60 border-white/10 text-white focus:border-[#00C3FF]/80 focus:bg-zinc-900' 
                                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-cyan-500 focus:bg-white'
                                }`}
                              />
                            </div>
                          </div>
                          
                          <div className="space-y-1.5">
                            <label className="text-[10px] font-extrabold uppercase text-zinc-400">Your Email Address *</label>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                              <input 
                                type="email"
                                required
                                value={bookingForm.email}
                                onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                                placeholder="e.g. alex@dynamics.com"
                                className={`w-full h-10 pl-10 pr-4 rounded-xl text-xs border focus:outline-none transition-all ${
                                  isDarkMode 
                                    ? 'bg-zinc-950/60 border-white/10 text-white focus:border-[#00C3FF]/80 focus:bg-zinc-900' 
                                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-cyan-500 focus:bg-white'
                                }`}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-extrabold uppercase text-zinc-400">Company Name (Optional)</label>
                          <div className="relative">
                            <Building className="absolute left-3 top-3 w-4 h-4 text-zinc-500" />
                            <input 
                              type="text"
                              value={bookingForm.company}
                              onChange={(e) => setBookingForm({ ...bookingForm, company: e.target.value })}
                              placeholder="e.g. Sterling Dynamics Inc."
                              className={`w-full h-10 pl-10 pr-4 rounded-xl text-xs border focus:outline-none transition-all ${
                                isDarkMode 
                                  ? 'bg-zinc-950/60 border-white/10 text-white focus:border-[#00C3FF]/80 focus:bg-zinc-900' 
                                  : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-cyan-500 focus:bg-white'
                              }`}
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label className="text-[10px] font-extrabold uppercase text-zinc-400">Brief Project Objectives *</label>
                          <textarea 
                            required
                            rows={3}
                            value={bookingForm.notes}
                            onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                            placeholder="Please outline the architecture, integrations, design system goals or product timelines..."
                            className={`w-full p-3.5 rounded-xl text-xs border focus:outline-none transition-all resize-none ${
                              isDarkMode 
                                ? 'bg-zinc-950/60 border-white/10 text-white focus:border-[#00C3FF]/80 focus:bg-zinc-900' 
                                : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-cyan-500 focus:bg-white'
                            }`}
                          />
                        </div>

                        <button 
                          type="submit"
                          className="w-full h-11 rounded-full font-bold text-xs sm:text-sm tracking-wide mt-4 bg-[#00C3FF] text-black hover:bg-[#FFE600] shadow-[inset_0_-2px_4px_0_rgba(255,255,255,0.4)] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          Confirm System Call Appointment <ArrowRight className="w-4 h-4" />
                        </button>
                      </form>
                    )}
                  </motion.div>
                )}

                {bookingStatus === 'submitting' && (
                  <motion.div
                    key="submitting"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center py-20 text-center space-y-4"
                  >
                    <div className="w-12 h-12 rounded-full border-2 border-t-transparent border-[#00C3FF] animate-spin" />
                    <h4 className="text-base font-bold">Locking Appointment slot...</h4>
                    <p className="text-xs text-zinc-500">Generating direct Google Meet video routing connection details.</p>
                  </motion.div>
                )}

                {bookingStatus === 'success' && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center justify-center text-center space-y-6 py-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/10 border-2 border-emerald-500 flex items-center justify-center text-emerald-400">
                      <Check className="w-8 h-8" />
                    </div>
                    
                    <div>
                      <h4 className="text-xl sm:text-2xl font-extrabold tracking-tight">Discovery Call Confirmed!</h4>
                      <p className="text-xs text-zinc-400 mt-2 max-w-sm mx-auto">
                        Simulated meeting invite dispatched. A Google Meet invitation link has been successfully generated for your technical alignment session.
                      </p>
                    </div>

                    <div className={`p-4 rounded-2xl border w-full max-w-md text-left text-xs ${isDarkMode ? 'bg-zinc-950/60 border-white/5' : 'bg-slate-50 border-slate-200'}`}>
                      <div className="flex justify-between border-b pb-2.5 transition-colors border-white/5">
                        <span className="text-zinc-500 font-bold uppercase text-[9px] tracking-wider">Session Partner</span>
                        <span className="font-semibold">{bookingForm.name}</span>
                      </div>
                      <div className="flex justify-between border-b py-2.5 transition-colors border-white/5">
                        <span className="text-zinc-500 font-bold uppercase text-[9px] tracking-wider">Date & Time</span>
                        <span className="font-semibold">{selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })} at {selectedTime}</span>
                      </div>
                      <div className="flex flex-col gap-1.5 py-2.5">
                        <span className="text-zinc-500 font-bold uppercase text-[9px] tracking-wider block">Google Meet Room Link</span>
                        <div className="flex items-center justify-between gap-3 bg-[#00C3FF]/5 p-2 border border-[#00C3FF]/20 rounded-xl">
                          <span className="font-mono text-[#00C3FF] select-all font-bold overflow-hidden text-ellipsis whitespace-nowrap">{meetLink}</span>
                          <button
                            type="button"
                            onClick={() => navigator.clipboard.writeText(meetLink)}
                            className="text-[9px] font-bold uppercase px-2.5 py-1 rounded bg-[#00C3FF] text-black hover:bg-[#FFE600] transition-all cursor-pointer"
                          >
                            Copy Link
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 w-full max-w-xs">
                      <a
                        href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=60m+Technical+Alignment+with+Dhaval&dates=${selectedDate?.toISOString().replace(/[-:]/g, "").split(".")[0]}Z/${selectedDate?.toISOString().replace(/[-:]/g, "").split(".")[0]}Z&details=Google+Meet+Discovery+Call+with+Dhaval+Vadgama`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 h-10 rounded-full font-bold text-xs flex items-center justify-center bg-white/5 border border-white/10 hover:bg-white/10 text-white transition-all duration-300"
                      >
                        Add to Calendar
                      </a>
                      <button
                        type="button"
                        onClick={handleResetBooking}
                        className="flex-1 h-10 rounded-full font-bold text-xs bg-[#00C3FF] text-black hover:bg-[#FFE600] transition-all duration-300 cursor-pointer"
                      >
                        Book Another
                      </button>
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
