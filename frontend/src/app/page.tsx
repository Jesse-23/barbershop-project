import Link from "next/link";
import Navbar from "@/components/Navbar";
import { 
  Scissors, 
  Clock, 
  Award, 
  Sparkles, 
  Star, 
  MapPin, 
  ArrowRight 
} from "lucide-react";

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

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#dfb771] selection:text-black">
      
      {/* ================= REUSABLE NAVBAR ================= */}
      <Navbar isAuth={false} />

      {/* ================= HERO SECTION ================= */}
      {/* Added pt-28 so the fixed navbar doesn't overlap the top of the hero content */}
      <section className="relative min-h-screen flex flex-col pt-28">
        {/* Background Image & Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/45 z-10" />
          <div 
            className="absolute inset-0 bg-[url('/hero-image/hero-barber-bg.jpg')] bg-cover bg-center bg-no-repeat opacity-85"
          />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 flex-grow flex items-center px-8 max-w-7xl mx-auto w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-8 bg-[#dfb771]"></div>
              <span className="text-[#dfb771] text-sm tracking-[0.2em] font-medium">EST. 1998</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-serif leading-[1.1] mb-6">
              The <br /> gentleman's <br /> 
              <span className="text-[#dfb771] italic">barber shop.</span>
            </h1>
            
            <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-xl leading-relaxed">
              Precision cuts, hot towel shaves and the slowest, sharpest beard work in the city. Book your chair in under a minute.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/signup" 
                className="flex items-center justify-center gap-2 bg-[#dfb771] text-black px-8 py-4 rounded font-medium hover:bg-[#cda661] transition-colors"
              >
                Book your chair <ArrowRight size={18} />
              </Link>
              <Link 
                href="/login" 
                className="flex items-center justify-center px-8 py-4 rounded border border-white/20 font-medium hover:bg-white/5 transition-colors"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================= WHY US SECTION ================= */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-[#dfb771] text-xs tracking-[0.2em] font-medium uppercase mb-4 block">Why Us</span>
          <h2 className="text-4xl md:text-5xl font-serif">
            Old-world craft, <span className="text-[#dfb771] italic">new-world<br /> ease.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-[#111111] border border-white/5 p-8 rounded-xl hover:border-white/10 transition-colors">
            <div className="bg-[#dfb771] w-12 h-12 rounded flex items-center justify-center mb-6">
              <Scissors size={24} className="text-black" />
            </div>
            <h3 className="text-xl font-serif mb-3">Master craftsmen</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Every barber on our floor has a decade of training behind every cut.</p>
          </div>

          {/* Card 2 */}
          <div className="bg-[#111111] border border-white/5 p-8 rounded-xl hover:border-white/10 transition-colors">
            <div className="bg-[#dfb771] w-12 h-12 rounded flex items-center justify-center mb-6">
              <Clock size={24} className="text-black" />
            </div>
            <h3 className="text-xl font-serif mb-3">Book in 60 seconds</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Pick a service, pick a slot, you're done. Reminders included.</p>
          </div>

          {/* Card 3 */}
          <div className="bg-[#111111] border border-white/5 p-8 rounded-xl hover:border-white/10 transition-colors">
            <div className="bg-[#dfb771] w-12 h-12 rounded flex items-center justify-center mb-6">
              <Award size={24} className="text-black" />
            </div>
            <h3 className="text-xl font-serif mb-3">Award-winning shop</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Voted city's best barbershop three years running. Come see why.</p>
          </div>

          {/* Card 4 */}
          <div className="bg-[#111111] border border-white/5 p-8 rounded-xl hover:border-white/10 transition-colors">
            <div className="bg-[#dfb771] w-12 h-12 rounded flex items-center justify-center mb-6">
              <Sparkles size={24} className="text-black" />
            </div>
            <h3 className="text-xl font-serif mb-3">The full ritual</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Hot towels, straight razor, leather chair. The way it was meant to be done.</p>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS SECTION ================= */}
      <section className="py-24 px-8 max-w-7xl mx-auto border-t border-white/5">
        <div className="text-center mb-16">
          <span className="text-[#dfb771] text-xs tracking-[0.2em] font-medium uppercase mb-4 block">Word on the street</span>
          <h2 className="text-4xl md:text-5xl font-serif">From our chairs.</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Review 1 */}
          <div className="bg-[#111111] border border-white/5 p-8 rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex gap-1 mb-6 text-[#dfb771]">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-xl font-serif mb-8 leading-snug">"Best fade in the city. The hot towel finish is something else."</p>
            </div>
            <div>
              <p className="font-medium text-sm">Thomas O.</p>
              <p className="text-gray-500 text-xs mt-1">Regular since 2021</p>
            </div>
          </div>

          {/* Review 2 */}
          <div className="bg-[#111111] border border-white/5 p-8 rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex gap-1 mb-6 text-[#dfb771]">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-xl font-serif mb-8 leading-snug">"Walked in for a haircut, walked out a new man. Booking again next week."</p>
            </div>
            <div>
              <p className="font-medium text-sm">James K.</p>
              <p className="text-gray-500 text-xs mt-1">First-time client</p>
            </div>
          </div>

          {/* Review 3 */}
          <div className="bg-[#111111] border border-white/5 p-8 rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex gap-1 mb-6 text-[#dfb771]">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-xl font-serif mb-8 leading-snug">"Old-school craft, modern booking. I'm never going back to chain shops."</p>
            </div>
            <div>
              <p className="font-medium text-sm">Daniel R.</p>
              <p className="text-gray-500 text-xs mt-1">Member</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-24 px-8 max-w-7xl mx-auto">
        <div className="bg-[#111111] border border-white/5 rounded-2xl p-16 text-center relative overflow-hidden">
          {/* Subtle glow effect behind text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#dfb771]/5 blur-[100px] rounded-full pointer-events-none" />
          
          <h2 className="text-4xl md:text-6xl font-serif mb-6 relative z-10">
            Your chair is <span className="text-[#dfb771] italic">waiting.</span>
          </h2>
          <p className="text-gray-400 mb-10 max-w-lg mx-auto relative z-10">
            Reserve in seconds. Get a confirmation. Show up looking sharp.
          </p>
          <Link 
            href="/signup" 
            className="inline-block bg-[#dfb771] text-black px-8 py-4 rounded font-medium hover:bg-[#cda661] transition-colors relative z-10"
          >
            Book an appointment
          </Link>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 pt-16 pb-8 px-8 max-w-7xl mx-auto text-sm">
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
