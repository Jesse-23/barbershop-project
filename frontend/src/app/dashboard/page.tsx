import Link from "next/link";
import Navbar from "@/components/Navbar";
import { 
  Scissors, 
  Calendar, 
  Clock, 
  TrendingUp, 
  ArrowRight,
  LogOut,
  MapPin
} from "lucide-react";

// Keeping the custom social icons for the footer
const Instagram = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const Facebook = ({ size = 24 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

export default function Dashboard() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#dfb771] selection:text-black flex flex-col">
      
      {/* ================= REUSABLE NAVBAR ================= */}
      <Navbar isAuth={true} />

      {/* ================= MAIN DASHBOARD CONTENT ================= */}
      <div className="flex-grow w-full max-w-7xl mx-auto px-8 py-12">
        
        {/* Welcome Header */}
        <div className="mb-12">
          <span className="text-[#dfb771] text-xs tracking-[0.2em] font-medium uppercase mb-4 block">
            Welcome back
          </span>
          <h1 className="text-4xl font-serif mb-2">Gentleman.</h1>
          <p className="text-gray-400">Here's what's on your calendar.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          {/* Stat 1: Upcoming */}
          <div className="bg-[#111111] border border-[#dfb771]/30 p-6 rounded-xl relative overflow-hidden group">
            {/* Subtle glow effect on the active card */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-[#dfb771]/10 blur-[40px] rounded-full pointer-events-none" />
            
            <div className="flex justify-between items-start mb-4 relative z-10">
              <span className="text-gray-400 text-xs tracking-wider font-medium uppercase">Upcoming</span>
              <Calendar size={20} className="text-[#dfb771]" />
            </div>
            <div className="text-4xl font-serif relative z-10">0</div>
          </div>

          {/* Stat 2: Total Visits */}
          <div className="bg-[#111111] border border-white/5 p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <span className="text-gray-400 text-xs tracking-wider font-medium uppercase">Total Visits</span>
              <Scissors size={20} className="text-gray-500" />
            </div>
            <div className="text-4xl font-serif">0</div>
          </div>

          {/* Stat 3: Pending */}
          <div className="bg-[#111111] border border-white/5 p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <span className="text-gray-400 text-xs tracking-wider font-medium uppercase">Pending Approval</span>
              <Clock size={20} className="text-gray-500" />
            </div>
            <div className="text-4xl font-serif">0</div>
          </div>

          {/* Stat 4: Lifetime Spend */}
          <div className="bg-[#111111] border border-white/5 p-6 rounded-xl">
            <div className="flex justify-between items-start mb-4">
              <span className="text-gray-400 text-xs tracking-wider font-medium uppercase">Lifetime Spend</span>
              <TrendingUp size={20} className="text-gray-500" />
            </div>
            <div className="text-4xl font-serif">$0.00</div>
          </div>
        </div>

        {/* Upcoming Appointments Section */}
        <div className="mb-6 flex justify-between items-end">
          <h2 className="text-3xl font-serif">Upcoming appointments</h2>
          <Link 
            href="/book" 
            className="hidden sm:flex items-center gap-2 bg-[#dfb771] text-black px-5 py-2.5 rounded font-medium hover:bg-[#cda661] transition-colors text-sm"
          >
            Book another <ArrowRight size={16} />
          </Link>
        </div>

        {/* Empty State Box */}
        <div className="bg-[#111111] border border-white/5 rounded-2xl p-16 flex flex-col items-center justify-center text-center mb-12">
          <Scissors size={40} className="text-[#dfb771]/50 mb-6" />
          <h3 className="text-2xl font-serif mb-2">No upcoming visits.</h3>
          <p className="text-gray-400 mb-8">Reserve your next chair in seconds.</p>
          <Link 
            href="/book" 
            className="bg-[#dfb771] text-black px-6 py-3 rounded font-medium hover:bg-[#cda661] transition-colors text-sm"
          >
            Book now
          </Link>
        </div>
        
        {/* Mobile Book Button (visible only on small screens) */}
        <Link 
          href="/book" 
          className="sm:hidden flex items-center justify-center gap-2 w-full bg-[#dfb771] text-black px-5 py-3 rounded font-medium hover:bg-[#cda661] transition-colors text-sm mb-12"
        >
          Book another <ArrowRight size={16} />
        </Link>
      </div>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 pt-16 pb-8 px-8 max-w-7xl mx-auto w-full text-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <Link href="/" className="flex items-center gap-2 text-[#dfb771] mb-6">
              <Scissors size={20} />
              <span className="text-lg font-serif tracking-wide">CutCraft</span>
            </Link>
            <p className="text-gray-400 leading-relaxed max-w-xs">
              Traditional craftsmanship. Modern precision. <br />
              The gentleman's barber shop since 1998.
            </p>
          </div>

          <div>
            <h4 className="text-[#dfb771] font-serif text-lg mb-6">Visit</h4>
            <div className="flex items-start gap-3 text-gray-400 mb-4">
              <MapPin size={18} className="shrink-0 mt-0.5" />
              <p>12 Old Town Road<br />Transekulu, Enugu 10003</p>
            </div>
            <p className="text-gray-400 pl-7">Tue – Sat · 10am – 8pm</p>
          </div>

          <div>
            <h4 className="text-[#dfb771] font-serif text-lg mb-6">Follow</h4>
            <div className="flex gap-4 text-gray-400">
              <a href="#" className="hover:text-[#dfb771] transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-[#dfb771] transition-colors"><Facebook size={20} /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-gray-500 text-xs">
          <p>© 2026 CutCraft. All rights reserved.</p>
        </div>
      </footer>

    </main>
  );
}