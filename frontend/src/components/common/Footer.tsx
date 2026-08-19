import React from 'react';
import { Link } from 'react-router-dom';
import { Car, Phone, Mail, MapPin, ShieldCheck, Heart, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-950 border-t border-dark-800 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white shadow-glow-sm">
                <Car className="w-5 h-5" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight text-white">
                Drive<span className="text-brand-500">Ease</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              DriveEase is India’s premium automotive rental platform. Experience pristine vehicles, zero-overlap guaranteed bookings, transparent pricing, and 24/7 dedicated roadside assistance.
            </p>
            <div className="flex items-center gap-4 text-xs font-semibold text-slate-300">
              <span className="flex items-center gap-1.5 bg-dark-900 border border-dark-700/80 px-3 py-1.5 rounded-full">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Insured Fleet
              </span>
              <span className="flex items-center gap-1.5 bg-dark-900 border border-dark-700/80 px-3 py-1.5 rounded-full">
                <Heart className="w-4 h-4 text-rose-400" /> 4.9★ Average Rating
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">
              Explore Fleet
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/cars?category=LUXURY" className="hover:text-brand-400 transition-colors">
                  Luxury Executive Sedans
                </Link>
              </li>
              <li>
                <Link to="/cars?category=SUV" className="hover:text-brand-400 transition-colors">
                  Premium & Rugged SUVs
                </Link>
              </li>
              <li>
                <Link to="/cars?category=EV" className="hover:text-brand-400 transition-colors">
                  Electric Vehicles (EV)
                </Link>
              </li>
              <li>
                <Link to="/cars?category=SEDAN" className="hover:text-brand-400 transition-colors">
                  Comfort City Sedans
                </Link>
              </li>
              <li>
                <Link to="/cars?category=HATCHBACK" className="hover:text-brand-400 transition-colors">
                  Compact Hatchbacks
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">
              Top Locations
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-400" />
                <span>Mumbai Airport T2</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-400" />
                <span>Delhi Aerocity Hub</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-400" />
                <span>Bengaluru Indiranagar</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-400" />
                <span>Hyderabad Hitec City</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-brand-400" />
                <span>Goa Dabolim Airport</span>
              </li>
            </ul>
          </div>

          {/* Support & Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-200 mb-4">
              Customer Support
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+91 1800-DRIVE-EASE</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-400 shrink-0" />
                <span>concierge@driveease.com</span>
              </li>
              <li className="pt-2">
                <a
                  href="/swagger-ui.html"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-brand-300 transition-colors"
                >
                  Developer API Docs (Swagger)
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-dark-800/80 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} DriveEase Inc. All rights reserved. Built for professional portfolio and placement.</p>
          <div className="flex items-center gap-6">
            <span className="text-slate-400 font-medium">Tagline: "Your journey, your choice."</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
