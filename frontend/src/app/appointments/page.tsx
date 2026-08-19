"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Scissors, MapPin, CheckCircle2, Calendar, Clock } from "lucide-react";

// Social Icons
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

// We need to wrap the component using useSearchParams in Suspense
function AppointmentsContent() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [showToast, setShowToast] = useState(false);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if we just redirected here from a successful booking
    if (searchParams.get("success") === "true") {
      setShowToast(true);
      // Auto-hide toast after 5 seconds
      const timer = setTimeout(() => setShowToast(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/appointments/`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (response.ok) {
          const data = await response.json();
          setAppointments(data);
        }
      } catch (err) {
        console.error("Failed to fetch appointments", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Filter logic based on tabs
  const filteredAppointments = appointments.filter((apt) => {
    const today = new Date().toISOString().split('T')[0];
    if (activeTab === "Upcoming") {
      return apt.date >= today;
    } else if (activeTab === "Past") {
      return apt.date < today;
    }
    return true; // "All"
  });

  return (
    <div className="flex-grow flex flex-col relative w-full">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="absolute top-4 right-8 bg-[#e8f5e9] text-[#2e7d32] px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-top-4 fade-in duration-300 z-50">
          <CheckCircle2 size={20} className="text-[#4caf50]" />
          <span className="font-medium text-sm">Appointment requested — we'll confirm shortly.</span>
        </div>
      )}

      {/* Main Content Area */}
      <div className="w-full max-w-5xl mx-auto px-8 py-16 flex-grow">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-6">
          <div>
            <span className="text-[#dfb771] text-xs tracking-[0.2em] font-medium uppercase mb-4 block">
              Your bookings
            </span>
            <h1 className="text-4xl font-serif">My appointments</h1>
          </div>
          <Link 
            href="/book" 
            className="bg-[#dfb771] text-black px-6 py-2.5 rounded font-medium hover:bg-[#cda661] transition-colors text-sm whitespace-nowrap"
          >
            Book another
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="bg-[#111111] border border-white/5 p-1 rounded-lg inline-flex mb-8">
          {["Upcoming", "Past", "All"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab 
                  ? "bg-[#1a1a1a] text-white" 
                  : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-2 border-[#dfb771] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : filteredAppointments.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {filteredAppointments.map((apt) => (
              <div key={apt.id} className="bg-[#111111] border border-white/5 rounded-2xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[#dfb771]/10 text-[#dfb771] p-3 rounded-xl mt-1">
                    <Scissors size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif mb-2">{apt.service}</h3>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1.5"><Calendar size={16} className="text-[#dfb771]" /> {apt.date}</span>
                      <span className="flex items-center gap-1.5"><Clock size={16} className="text-[#dfb771]" /> {apt.time}</span>
                      <span>Barber: <strong className="text-white">{apt.barber}</strong></span>
                    </div>
                    {apt.notes && (
                      <p className="text-xs text-gray-500 mt-2">Notes: {apt.notes}</p>
                    )}
                  </div>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    apt.status === 'Confirmed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {apt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Empty State Box */
          <div className="bg-[#111111] border border-white/5 rounded-2xl p-16 flex flex-col items-center justify-center text-center">
            <Scissors size={40} className="text-[#dfb771]/50 mb-6" />
            <h3 className="text-2xl font-serif mb-2">Nothing here yet.</h3>
            <p className="text-gray-400 mb-8">Book your next visit.</p>
            <Link 
              href="/book" 
              className="bg-[#dfb771] text-black px-8 py-3 rounded font-medium hover:bg-[#cda661] transition-colors text-sm"
            >
              Book now
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}

export default function AppointmentsPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#dfb771] selection:text-black flex flex-col">
      
      {/* ================= REUSABLE NAVBAR ================= */}
      <Navbar isAuth={true} />

      {/* ================= MAIN CONTENT WITH SUSPENSE ================= */}
      {/* We use Suspense here because useSearchParams needs to be wrapped when statically rendering */}
      <Suspense fallback={<div className="flex-grow flex items-center justify-center"><div className="w-8 h-8 border-2 border-[#dfb771] border-t-transparent rounded-full animate-spin"></div></div>}>
        <AppointmentsContent />
      </Suspense>

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