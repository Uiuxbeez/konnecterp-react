import { Layers } from 'lucide-react';

const NAV_ITEMS = ['Dashboard', 'Finance', 'Inventory', 'Purchase', 'Sales', 'Production', 'Reports'];
const STATS = [
  { l: 'Revenue', v: '₹1.24 Cr', d: '+18%', up: true },
  { l: 'Expenses', v: '₹42.1L', d: '+4%', up: false },
  { l: 'Net Profit', v: '₹82.3L', d: '+31%', up: true },
];
const BARS = [40, 55, 48, 72, 60, 85, 68, 92, 78, 88, 70, 100];
const MONTHS = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

// A lightweight, fake ERP dashboard mockup — mirrors the visual language used
// in the Home page's product mockups, for reuse on inner pages/hero visuals.
export function MiniDashboardMock() {
  return (
    <div className="flex bg-[#f8fafc] aspect-[16/10] w-full">
      <div className="w-28 sm:w-36 flex flex-col py-4 px-2.5 gap-1 shrink-0" style={{ background: 'linear-gradient(160deg, #0B1F4A 0%, #162d66 100%)' }}>
        <div className="text-white font-bold text-[10px] px-1.5 mb-2.5 flex items-center gap-1"><Layers className="w-3 h-3" /> KonnectERP</div>
        {NAV_ITEMS.map((item, i) => (
          <div key={item} className={`flex items-center gap-1.5 px-1.5 py-1 rounded text-[8px] sm:text-[9px] font-medium ${i === 0 ? 'bg-white/20 text-white' : 'text-blue-200/70'}`}>
            <div className="w-1 h-1 rounded-full bg-current opacity-60" />{item}
          </div>
        ))}
      </div>
      <div className="flex-1 p-3 sm:p-4 overflow-hidden">
        <div className="text-[9px] sm:text-[10px] font-bold text-gray-700 mb-2">Financial Overview — FY 2025–26</div>
        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-2">
          {STATS.map((s) => (
            <div key={s.l} className="bg-white rounded-md border border-gray-100 p-1.5 sm:p-2 shadow-sm">
              <div className="text-[7px] sm:text-[8px] text-gray-400 mb-0.5">{s.l}</div>
              <div className="text-[10px] sm:text-xs font-black text-gray-800">{s.v}</div>
              <div className={`text-[7px] sm:text-[8px] font-semibold ${s.up ? 'text-emerald-500' : 'text-red-400'}`}>{s.d} vs last yr</div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-md border border-gray-100 p-2 sm:p-3 shadow-sm">
          <div className="text-[7px] sm:text-[8px] text-gray-400 mb-1.5">Monthly Revenue</div>
          <div className="flex items-end gap-0.5 sm:gap-1 h-10 sm:h-14">
            {BARS.map((h, i) => (
              <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: i === 11 ? '#F97316' : 'rgba(249,115,22,0.2)' }} />
            ))}
          </div>
          <div className="hidden sm:flex justify-between text-[6px] text-gray-300 mt-1">
            {MONTHS.map((m) => <span key={m}>{m}</span>)}
          </div>
        </div>
      </div>
    </div>
  );
}
