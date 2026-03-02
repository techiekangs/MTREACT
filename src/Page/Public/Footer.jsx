import { NavLink } from "react-router-dom";
import { getContacts } from "../../API/ContentManagement/CM_Repository";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../fontawesome";

export default function Footer() {
  const [contact, setContact] = useState({});

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getContacts("CONTACT_MAIN");
        setContact(res?.Contact ?? {});
      } catch (e) {
        console.error("Footer contact fetch failed", e);
      }
    };
    fetch();
  }, []);

  const handleScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", `#${id}`);
    }
  };

  const schedules = [contact.Schedule1, contact.Schedule2, contact.Schedule3].filter(Boolean);

  return (
    <footer className="bg-gray-800 text-gray-300">

      {/* ── TOP WAVE ── */}
      <div className="w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 60" className="w-full h-12 fill-pink-300" preserveAspectRatio="none">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,0 L0,0 Z" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-10 py-14 grid grid-cols-1 md:grid-cols-3 gap-12">

        {/* ── COL 1: BRAND ── */}
        <div>
          <p className="text-2xl font-bold text-pink-400 mb-3">🌸 Philippine Teachers</p>
          <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
            Empowering educators across the Philippines. Join our community of passionate teachers dedicated to quality education.
          </p>

          {/* Social icons from contact if available */}
          <div className="flex gap-3 mt-5">
            {contact.Facebook && (
              <a href={contact.Facebook} target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full bg-gray-700 hover:bg-pink-400 flex items-center justify-center transition-colors duration-200">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.883v2.271h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>
              </a>
            )}
            {contact.Instagram && (
              <a href={contact.Instagram} target="_blank" rel="noreferrer"
                className="w-9 h-9 rounded-full bg-gray-700 hover:bg-pink-400 flex items-center justify-center transition-colors duration-200">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            )}
          </div>
        </div>

        {/* ── COL 2: NAVIGATION ── */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-pink-400 mb-5">Navigation</p>
          <ul className="space-y-3 text-sm">
            <li>
              <NavLink to="/" className="hover:text-pink-400 transition-colors duration-200">Home</NavLink>
            </li>
            <li>
              <button onClick={() => handleScroll("About")} className="hover:text-pink-400 transition-colors duration-200">About</button>
            </li>
            <li>
              <button onClick={() => handleScroll("News")} className="hover:text-pink-400 transition-colors duration-200">News</button>
            </li>
            <li>
              <button onClick={() => handleScroll("Events")} className="hover:text-pink-400 transition-colors duration-200">Events</button>
            </li>
            <li>
              <NavLink to="/FAQs" className="hover:text-pink-400 transition-colors duration-200">FAQs</NavLink>
            </li>
            <li>
              <NavLink to="/Contact" className="hover:text-pink-400 transition-colors duration-200">Contact</NavLink>
            </li>
            <li>
              <NavLink to="/Careers" className="hover:text-pink-400 transition-colors duration-200">Careers</NavLink>
            </li>
          </ul>
        </div>

        {/* ── COL 3: CONTACT DETAILS ── */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-pink-400 mb-5">Contact Us</p>
          <ul className="space-y-4 text-sm">

            {contact.Contact_No && (
              <li className="flex items-start gap-3">
                <FontAwesomeIcon
                    icon="mobile" // 🌼 dynamic icon
                    className="text-pink-200"
                  />
                <span>{contact.Contact_No}</span>
              </li>
            )}

            {contact.Tel_No && (
              <li className="flex items-start gap-3">
                <FontAwesomeIcon
                    icon="phone" // 🌼 dynamic icon
                    className="text-pink-200"
                  />
                <span>{contact.Tel_No}</span>
              </li>
            )}

            {contact.Email && (
              <li className="flex items-start gap-3">
                <FontAwesomeIcon
                    icon="at" // 🌼 dynamic icon
                    className="text-pink-200"
                  />
                <a href={`mailto:${contact.Email}`} className="hover:text-pink-400 transition-colors duration-200">
                  {contact.Email}
                </a>
              </li>
            )}

            {(contact.Address || contact.Location) && (
              <li className="flex items-start gap-3">
                <FontAwesomeIcon
                    icon="map" // 🌼 dynamic icon
                    className="text-pink-200"
                  />
                <span className="leading-relaxed">{contact.Address || contact.Location}</span>
              </li>
            )}

            {schedules.length > 0 && (
              <li className="flex items-start gap-3">
                <FontAwesomeIcon
                    icon="clock" // 🌼 dynamic icon
                    className="text-pink-200"
                  />
                <span className="leading-relaxed whitespace-pre-line">
                  {schedules.join("\n")}
                </span>
              </li>
            )}

          </ul>
        </div>

      </div>

      {/* ── BOTTOM BAR ── */}
      <div className="border-t border-gray-700 py-5 px-10 flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-gray-500">
        <p>© {new Date().getFullYear()} Philippine Teachers. All rights reserved.</p>
        <div className="flex gap-5">
          <a href="https://manilateachersonline.com/Registration_Page_1" className="hover:text-pink-400 transition-colors duration-200">Register</a>
          <a href="https://manilateachersonline.com/Login" className="hover:text-pink-400 transition-colors duration-200">Login</a>
        </div>
      </div>

    </footer>
  );
}