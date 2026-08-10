import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Building, Mail, Phone, ChevronDown, CheckCircle2, ArrowRight } from 'lucide-react';

const COMPANY_SIZES = ['1–10', '11–50', '51–200', '201–500', '500+'];

export function DemoModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', size: '', module: '' });
  const [errors, setErrors] = useState<Partial<typeof form>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) { setStep('form'); setForm({ name: '', company: '', email: '', phone: '', size: '', module: '' }); setErrors({}); }
  }, [open]);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = 'Full name is required';
    if (!form.company.trim()) e.company = 'Company name is required';
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid business email is required';
    if (!form.phone.trim() || !/^\+?[\d\s\-()]{7,}$/.test(form.phone)) e.phone = 'Valid phone number is required';
    if (!form.size) e.size = 'Please select company size';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep('success'); }, 1400);
  };

  const field = (key: keyof typeof form, value: string) =>
    setForm(f => ({ ...f, [key]: value }));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden"
            onClick={e => e.stopPropagation()}
          >
            <div className="px-8 pt-8 pb-6" style={{ background: 'linear-gradient(135deg, #F97316 0%, #0B1F4A 100%)' }}>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <p className="text-blue-100 text-sm mt-1">See How Manufacturing Industry-Specific Konnect ERP Fits Your Operations</p>
            </div>

            <AnimatePresence mode="wait">
              {step === 'form' ? (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="px-8 py-6 space-y-4 max-h-[60vh] overflow-y-auto"
                  noValidate
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => field('name', e.target.value)}
                        placeholder="Rajesh Kumar"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm transition-colors outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'}`}
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Company Name <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={form.company}
                        onChange={e => field('company', e.target.value)}
                        placeholder="Acme Manufacturing Ltd."
                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm transition-colors outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] ${errors.company ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'}`}
                      />
                    </div>
                    {errors.company && <p className="text-red-500 text-xs mt-1">{errors.company}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Email <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => field('email', e.target.value)}
                        placeholder="rajesh@acme.com"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm transition-colors outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] ${errors.email ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'}`}
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={e => field('phone', e.target.value)}
                        placeholder="+91 98765 43210"
                        className={`w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm transition-colors outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'}`}
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Company Size <span className="text-red-500">*</span></label>
                      <div className="relative">
                        <select
                          value={form.size}
                          onChange={e => field('size', e.target.value)}
                          className={`w-full appearance-none pl-3 pr-8 py-2.5 rounded-lg border text-sm transition-colors outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316] ${errors.size ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-gray-50'}`}
                        >
                          <option value="">Employees</option>
                          {COMPANY_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                      </div>
                      {errors.size && <p className="text-red-500 text-xs mt-1">{errors.size}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Specific Requirements</label>
                      <div className="relative">
                        <input
                          type="text"
                          value={form.module}
                          onChange={e => field('module', e.target.value)}
                          placeholder="Describe any specific requirements"
                          className="w-full pl-3 pr-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none focus:ring-2 focus:ring-[#F97316]/30 focus:border-[#F97316]"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-11 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-2 hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #F97316 0%, #0B1F4A 100%)' }}
                  >
                    {loading ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                          className="block w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        />
                        Scheduling your demo...
                      </>
                    ) : (
                      <>Book Free Demo <ArrowRight className="w-4 h-4" /></>
                    )}
                  </button>

                  <p className="text-center text-xs text-gray-400">No credit card required. Our team will reach out within 24 hours.</p>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="px-8 py-10 flex flex-col items-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', bounce: 0.5, delay: 0.1 }}
                    className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
                  >
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">You're all set, {form.name.split(' ')[0]}!</h3>
                  <p className="text-gray-500 text-sm mb-1">
                    We've received your demo request for <strong>{form.company}</strong>.
                  </p>
                  <p className="text-gray-500 text-sm mb-6">
                    Our team will contact you at <strong>{form.email}</strong> within 24 hours to confirm your slot.
                  </p>
                  <div className="w-full bg-orange-50 rounded-xl p-4 text-left space-y-2 mb-6">
                    <p className="text-xs font-semibold text-[#F97316] uppercase tracking-wide">What to expect</p>
                    {['30-minute personalised product walkthrough', 'Live Q&A with an ERP specialist', 'Custom pricing tailored to your business'].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                        <span className="text-sm text-gray-600">{item}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={onClose}
                    className="w-full h-11 text-white font-semibold rounded-lg transition-all hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, #F97316 0%, #0B1F4A 100%)' }}
                  >
                    Back to KonnectERP
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
