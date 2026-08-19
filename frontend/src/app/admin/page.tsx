"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  DollarSign, 
  Search, 
  ChevronDown,
  Check,
  X,
  Trash2,
  Plus,
  Edit2,
  Scissors,
  MapPin
} from "lucide-react";

// Custom Social Icons
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

// Mock Services (Kept static since we haven't built a Service database model yet)
const mockServices = [
  { id: 1, name: "Classic Haircut", desc: "Precision cut tailored to your style", price: "$35.00", time: "30 min" },
  { id: 2, name: "Beard Trim & Shape", desc: "Sharp lines, soft finish", price: "$20.00", time: "20 min" },
  { id: 3, name: "Hot Towel Shave", desc: "Traditional straight-razor shave with hot towel", price: "$45.00", time: "45 min" },
  { id: 4, name: "Haircut + Beard", desc: "The full grooming package", price: "$55.00", time: "50 min" },
  { id: 5, name: "Kids Cut", desc: "For gentlemen under 12", price: "$25.00", time: "25 min" },
  { id: 6, name: "Hair & Scalp Treatment", desc: "Deep cleanse and conditioning", price: "$40.00", time: "40 min" }
];

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Overview");
  const [isAuthorized, setIsAuthorized] = useState(false);
  
  // New State for Backend Data
  const [stats, setStats] = useState({ total_bookings: 0, pending_approval: 0, completed: 0, revenue: 0 });
  const [appointments, setAppointments] = useState<any[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // Fetch real data from the Django API
  const fetchAdminData = useCallback(async () => {
    try {
      const token = localStorage.getItem("access_token");
      const headers = { "Authorization": `Bearer ${token}` };

      // Fetch Stats
      const statsRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/stats/`, { headers });
      if (statsRes.ok) {
        setStats(await statsRes.json());
      }

      // Fetch Appointments
      const aptRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/appointments/`, { headers });
      if (aptRes.ok) {
        setAppointments(await aptRes.json());
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setIsLoadingData(false);
    }
  }, []);

  useEffect(() => {
    // Check localStorage to verify if the logged-in user is you
    const storedName = localStorage.getItem("user_name");
    const storedEmail = localStorage.getItem("user_email");
    
    // Authorization check
    if (storedName === "jessemaduka85" || storedEmail === "your-email@example.com") {
      setIsAuthorized(true);
      fetchAdminData(); // Only fetch data if authorized
    } else {
      router.push("/dashboard"); // Kick unauthorized users back to regular dashboard
    }
  }, [router, fetchAdminData]);

  // Handle changing appointment status
  const handleUpdateStatus = async (id: number, newStatus: string) => {
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/appointments/${id}/`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        fetchAdminData(); // Refresh data immediately
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  // Handle deleting an appointment
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this appointment?")) return;
    try {
      const token = localStorage.getItem("access_token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/appointments/${id}/`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
        }
      });
      if (res.ok) {
        fetchAdminData(); // Refresh data immediately
      }
    } catch (err) {
      console.error("Failed to delete appointment", err);
    }
  };

  // Dynamic styling for status badges
  const getStatusBadgeStyle = (status: string) => {
    if (status === 'Completed') return 'border-blue-500/30 text-blue-400 bg-blue-500/10';
    if (status === 'Confirmed') return 'border-green-500/30 text-green-400 bg-green-500/10';
    return 'border-[#dfb771]/30 text-[#dfb771] bg-[#dfb771]/10'; // Default to Pending styling
  };

  // Prevent the admin UI from flashing before the check completes
  if (!isAuthorized || isLoadingData) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#dfb771] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#dfb771] selection:text-black flex flex-col pt-24">
      
      <Navbar isAuth={true} />

      <div className="flex-grow w-full max-w-7xl mx-auto px-8 py-12">
        
        {/* Header */}
        <div className="mb-12">
          <span className="text-[#dfb771] text-xs tracking-[0.2em] font-medium uppercase mb-4 block">
            Control Room
          </span>
          <h1 className="text-4xl md:text-5xl font-serif">Admin dashboard</h1>
        </div>

        {/* Tabs */}
        <div className="bg-[#111111] border border-white/5 p-1 rounded-lg inline-flex mb-8">
          {["Overview", "Appointments", "Services"].map((tab) => (
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

        {/* ================= OVERVIEW TAB ================= */}
        {activeTab === "Overview" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-300">
            {/* Stat 1 */}
            <div className="bg-[#111111] border border-[#dfb771]/30 p-6 rounded-xl relative overflow-hidden">
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#dfb771]/10 blur-[40px] rounded-full pointer-events-none" />
              <div className="flex justify-between items-start mb-6 relative z-10">
                <span className="text-gray-400 text-xs tracking-wider font-medium uppercase">Total Bookings</span>
                <Calendar size={20} className="text-[#dfb771]" />
              </div>
              <div className="text-4xl font-serif relative z-10">{stats.total_bookings}</div>
            </div>

            {/* Stat 2 */}
            <div className="bg-[#111111] border border-white/5 p-6 rounded-xl">
              <div className="flex justify-between items-start mb-6">
                <span className="text-gray-400 text-xs tracking-wider font-medium uppercase">Pending Approval</span>
                <Clock size={20} className="text-gray-500" />
              </div>
              <div className="text-4xl font-serif">{stats.pending_approval}</div>
            </div>

            {/* Stat 3 */}
            <div className="bg-[#111111] border border-white/5 p-6 rounded-xl">
              <div className="flex justify-between items-start mb-6">
                <span className="text-gray-400 text-xs tracking-wider font-medium uppercase">Completed</span>
                <CheckCircle2 size={20} className="text-gray-500" />
              </div>
              <div className="text-4xl font-serif">{stats.completed}</div>
            </div>

            {/* Stat 4 */}
            <div className="bg-[#111111] border border-white/5 p-6 rounded-xl">
              <div className="flex justify-between items-start mb-6">
                <span className="text-gray-400 text-xs tracking-wider font-medium uppercase">Revenue</span>
                <DollarSign size={20} className="text-gray-500" />
              </div>
              <div className="text-4xl font-serif">${stats.revenue.toFixed(2)}</div>
            </div>
          </div>
        )}

        {/* ================= APPOINTMENTS TAB ================= */}
        {activeTab === "Appointments" && (
          <div className="animate-in fade-in duration-300">
            
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input 
                  type="text" 
                  placeholder="Search by client or service..." 
                  className="w-full bg-[#111111] border border-white/5 rounded-xl py-3 pl-12 pr-4 text-white placeholder-gray-500 focus:outline-none focus:border-[#dfb771]/50 transition-colors"
                />
              </div>
              <div className="relative">
                <select className="bg-[#111111] border border-white/5 rounded-xl py-3 pl-4 pr-10 text-white appearance-none focus:outline-none focus:border-[#dfb771]/50 transition-colors sm:w-48 w-full cursor-pointer">
                  <option>All statuses</option>
                  <option>Pending</option>
                  <option>Confirmed</option>
                  <option>Completed</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
              </div>
            </div>

            {/* Appointments List */}
            {appointments.length === 0 ? (
              <div className="text-center py-12 border border-white/5 rounded-xl bg-[#111111]">
                <p className="text-gray-500">No appointments found in the database.</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {appointments.map((apt) => (
                  <div key={apt.id} className="bg-[#111111] border border-white/5 rounded-xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-colors hover:border-white/10">
                    <div>
                      <div className="mb-1">
                        {/* Note: If the backend serializer doesn't provide client name, we use "Client" fallback */}
                        <span className="text-white font-medium text-lg">{apt.client_name || "Client Booking"}</span>
                        <span className="text-gray-500 text-sm ml-2">· {apt.service}</span>
                      </div>
                      <div className="text-gray-500 text-sm">
                        {apt.date} · {apt.time}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                      <span className={`text-xs font-medium px-3 py-1 border rounded tracking-wide uppercase ${getStatusBadgeStyle(apt.status)}`}>
                        {apt.status}
                      </span>
                      <div className="flex items-center gap-2">
                        {/* Approve Button */}
                        <button 
                          onClick={() => handleUpdateStatus(apt.id, 'Confirmed')}
                          className="p-2 border border-white/10 rounded hover:bg-white/10 hover:text-green-400 transition-colors" 
                          title="Confirm Appointment"
                        >
                          <Check size={18} />
                        </button>
                        {/* Complete Button */}
                        <button 
                          onClick={() => handleUpdateStatus(apt.id, 'Completed')}
                          className="p-2 border border-white/10 rounded hover:bg-white/10 hover:text-blue-400 transition-colors" 
                          title="Mark as Completed"
                        >
                          <CheckCircle2 size={18} />
                        </button>
                        {/* Delete Button */}
                        <button 
                          onClick={() => handleDelete(apt.id)}
                          className="p-2 border border-white/10 rounded hover:bg-white/10 hover:text-red-400 transition-colors ml-2" 
                          title="Delete Appointment"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ================= SERVICES TAB ================= */}
        {activeTab === "Services" && (
          <div className="animate-in fade-in duration-300">
            
            {/* Header Action */}
            <div className="flex justify-end mb-6">
              <button className="bg-[#dfb771] text-black px-5 py-2.5 rounded-lg font-medium hover:bg-[#cda661] transition-colors flex items-center gap-2 text-sm">
                <Plus size={18} /> New service
              </button>
            </div>

            {/* Services List */}
            <div className="flex flex-col gap-4">
              {mockServices.map((srv) => (
                <div key={srv.id} className="bg-[#111111] border border-white/5 rounded-xl p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-colors hover:border-white/10">
                  <div>
                    <h3 className="text-xl font-serif text-white mb-1">{srv.name}</h3>
                    <p className="text-gray-500 text-sm">{srv.desc}</p>
                  </div>
                  
                  <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex items-center gap-4">
                      <span className="text-[#dfb771] font-bold">{srv.price}</span>
                      <span className="text-gray-500 text-sm w-12">{srv.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-white transition-colors">
                        <Edit2 size={18} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-red-400 transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 pt-16 pb-8 px-8 max-w-7xl mx-auto w-full text-sm mt-12">
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
              <p>12 Old Mason Street<br />Downtown, NY 10003</p>
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