"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Scissors, MapPin, Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";

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

// Static Data
const services = [
  { id: 1, name: "Beard Trim & Shape", desc: "Sharp lines, soft finish", price: "$20.00", time: "20 min" },
  { id: 2, name: "Kids Cut", desc: "For gentlemen under 12", price: "$25.00", time: "25 min" },
  { id: 3, name: "Classic Haircut", desc: "Precision cut tailored to your style", price: "$35.00", time: "30 min" },
  { id: 4, name: "Hair & Scalp Treatment", desc: "Deep cleanse and conditioning", price: "$40.00", time: "40 min" },
  { id: 5, name: "Hot Towel Shave", desc: "Traditional straight-razor shave with hot towel", price: "$45.00", time: "45 min" },
  { id: 6, name: "Haircut + Beard", desc: "The full grooming package", price: "$55.00", time: "50 min" },
];

const timeSlots = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "12:00 PM",
  "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM", "2:30 PM",
  "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM",
  "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM"
];

export default function BookPage() {
  const router = useRouter();
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Helper to get the selected service object
  const activeService = services.find(s => s.id === selectedService);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeService || !selectedDate || !selectedTime) return;

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const token = localStorage.getItem("access_token");
      
      // Format time from "10:00 AM" to "10:00:00" for Django backend
      const convertTo24Hour = (timeStr: string) => {
        const [time, modifier] = timeStr.split(" ");
        let [hours, minutes] = time.split(":");
        if (hours === "12") {
          hours = modifier === "PM" ? "12" : "00";
        } else if (modifier === "PM") {
          hours = String(parseInt(hours, 10) + 12);
        }
        return `${hours.padStart(2, '0')}:${minutes}:00`;
      };

      const formattedTime = convertTo24Hour(selectedTime);
      const formattedDate = `2026-08-${String(selectedDate).padStart(2, '0')}`;

      const response = await fetch("http://localhost:8000/api/appointments/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          service: activeService.name,
          barber: "Master Barber", // Default barber value
          date: formattedDate,
          time: formattedTime,
          notes: notes
        }),
      });

      if (response.ok) {
        router.push('/appointments?success=true');
      } else {
        const data = await response.json();
        setErrorMessage(data.detail || "Failed to create appointment. Please try again.");
        setIsSubmitting(false);
      }
    } catch (err) {
      setErrorMessage("Network error. Make sure the backend server is running.");
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#dfb771] selection:text-black flex flex-col relative pb-32">

      {/* ================= REUSABLE NAVBAR ================= */}
      <Navbar isAuth={true} />

      {/* ================= MAIN BOOKING CONTENT ================= */}
      <div className="flex-grow w-full max-w-5xl mx-auto px-8 py-16">

        {/* Header */}
        <div className="mb-16">
          <span className="text-[#dfb771] text-xs tracking-[0.2em] font-medium uppercase mb-4 block">
            Book a chair
          </span>
          <h1 className="text-4xl md:text-6xl font-serif">Reserve your moment.</h1>
        </div>

        {errorMessage && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
            {errorMessage}
          </div>
        )}

        {/* Step 1: Choose Service */}
        <div className="mb-16">
          <h2 className="text-2xl font-serif mb-8 flex items-center gap-2">
            <span className="text-[#dfb771]">1.</span> Choose a service
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <button
                key={service.id}
                onClick={() => {
                  setSelectedService(service.id);
                  // Reset downstream selections if service changes
                  setSelectedDate(null);
                  setSelectedTime(null);
                  setShowCalendar(false);
                }}
                className={`text-left p-6 rounded-xl border transition-all duration-300 flex flex-col justify-between h-40 
                  ${selectedService === service.id 
                    ? "bg-[#1a1a1a] border-[#dfb771] shadow-[0_0_15px_rgba(223,183,113,0.1)]" 
                    : "bg-[#111111] border-white/5 hover:border-white/20"
                  }`}
              >
                <div>
                  <h3 className="text-xl font-serif mb-2">{service.name}</h3>
                  <p className="text-gray-400 text-sm">{service.desc}</p>
                </div>
                <div className="w-full flex justify-between items-center text-sm">
                  <span className="text-[#dfb771] font-medium">{service.price}</span>
                  <span className="text-gray-500">{service.time}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Pick Date & Time (Only shows if a service is selected) */}
        {selectedService && (
          <div className="mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-serif mb-8 flex items-center gap-2">
              <span className="text-[#dfb771]">2.</span> Pick a date & time
            </h2>

            <div className="flex flex-col md:flex-row gap-8 items-start">

              {/* Date Picker Section */}
              <div className="relative w-full md:w-auto">
                <button 
                  onClick={() => setShowCalendar(!showCalendar)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-lg border transition-colors w-full md:w-64
                    ${selectedDate ? "border-[#dfb771] text-white" : "border-white/10 text-gray-400 hover:border-white/30 hover:text-white"}`}
                >
                  <CalendarIcon size={20} className={selectedDate ? "text-[#dfb771]" : ""} />
                  {selectedDate ? `Fri, Aug ${selectedDate}, 2026` : "Select a date"}
                </button>

                {/* Dropdown Calendar UI */}
                {showCalendar && (
                  <div className="absolute top-full left-0 mt-2 w-72 bg-[#0a0a0a] border border-white/10 rounded-xl p-4 z-20 shadow-2xl">
                    <div className="flex justify-between items-center mb-4">
                      <button className="p-1 hover:bg-white/10 rounded"><ChevronLeft size={16} /></button>
                      <span className="font-medium text-sm">August 2026</span>
                      <button className="p-1 hover:bg-white/10 rounded"><ChevronRight size={16} /></button>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2">
                      <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
                    </div>

                    <div className="grid grid-cols-7 gap-1 text-center text-sm">
                      {/* Greyed out past dates */}
                      <div className="p-2 text-white/20">26</div><div className="p-2 text-white/20">27</div>
                      <div className="p-2 text-white/20">28</div><div className="p-2 text-white/20">29</div>
                      <div className="p-2 text-white/20">30</div><div className="p-2 text-white/20">31</div>
                      <div className="p-2 text-white/20">1</div><div className="p-2 text-white/20">2</div>
                      <div className="p-2 text-white/20">3</div><div className="p-2 text-white/20">4</div>
                      <div className="p-2 text-white/20">5</div><div className="p-2 text-white/20">6</div>
                      <div className="p-2 text-white/20">7</div><div className="p-2 text-white/20">8</div>
                      <div className="p-2 text-white/20">9</div><div className="p-2 text-white/20">10</div>
                      <div className="p-2 text-white/20">11</div><div className="p-2 text-white/20">12</div>
                      <div className="p-2 text-white/20">13</div><div className="p-2 text-white/20">14</div>
                      <div className="p-2 text-white/20">15</div><div className="p-2 text-white/20">16</div>
                      <div className="p-2 text-white/20">17</div><div className="p-2 text-white/20">18</div>

                      {/* Active Dates for August 2026 */}
                      {[19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31].map(date => (
                        <button 
                          key={date}
                          onClick={() => {
                            setSelectedDate(date);
                            setShowCalendar(false);
                            setSelectedTime(null); // Reset time when date changes
                          }}
                          className={`p-2 rounded hover:bg-white/10 transition-colors ${selectedDate === date ? 'bg-[#dfb771] text-black font-medium hover:bg-[#dfb771]' : ''}`}
                        >
                          {date}
                        </button>
                      ))}
                      {/* Next month overflow */}
                      <div className="p-2 text-white/20">1</div><div className="p-2 text-white/20">2</div>
                      <div className="p-2 text-white/20">3</div><div className="p-2 text-white/20">4</div>
                      <div className="p-2 text-white/20">5</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Time Slots Section (Only shows if a date is selected) */}
              {selectedDate && (
                <div className="flex-grow w-full animate-in fade-in duration-500">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-3 px-2 text-sm rounded border transition-all text-center
                          ${selectedTime === time 
                            ? "bg-[#dfb771] border-[#dfb771] text-black font-medium" 
                            : "border-white/5 hover:border-white/20 text-gray-300"}`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 3: Notes (Only shows if time is selected) */}
        {selectedTime && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl font-serif mb-6 flex items-center gap-2">
              <span className="text-[#dfb771]">3.</span> Anything we should know?
            </h2>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional notes for your barber..."
              className="w-full bg-[#111111] border border-white/10 rounded-xl p-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#dfb771] focus:ring-1 focus:ring-[#dfb771] transition-all min-h-[120px] resize-y"
            />
          </div>
        )}
      </div>

      {/* ================= STICKY CONFIRMATION BAR ================= */}
      {selectedTime && activeService && (
        <div className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a]/90 backdrop-blur-md border-t border-[#dfb771]/20 py-4 px-8 z-50 animate-in slide-in-from-bottom-full duration-300">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-[#dfb771] p-3 rounded-lg text-black">
                <Scissors size={20} />
              </div>
              <div>
                <h4 className="font-serif text-lg">{activeService.name}</h4>
                <p className="text-sm text-gray-400">
                  Fri, Aug {selectedDate} • {selectedTime} • {activeService.price}
                </p>
              </div>
            </div>

            <button 
              onClick={handleBooking}
              disabled={isSubmitting}
              className="w-full sm:w-auto bg-[#dfb771] text-black px-8 py-3 rounded-lg font-medium hover:bg-[#cda661] transition-colors disabled:opacity-70"
            >
              {isSubmitting ? "Confirming..." : "Confirm booking"}
            </button>
          </div>
        </div>
      )}

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