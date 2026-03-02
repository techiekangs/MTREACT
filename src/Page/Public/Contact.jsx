import { getContacts } from "../../API/ContentManagement/CM_Repository";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../fontawesome";
import FAQS_img from "../../Components/Images/Messages-rafiki.png"

// ── Social media detection helper ──
const SOCIAL_PLATFORMS = [
  {
    key: "facebook",
    match: (url, header) =>
      url?.includes("facebook.com") || header?.toLowerCase().includes("facebook"),
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.883v2.271h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
      </svg>
    ),
    color: "text-blue-600",
    bg: "bg-blue-50 hover:bg-blue-100",
    border: "border-blue-200",
    label: "Facebook",
  },
  {
    key: "x",
    match: (url, header) =>
      url?.includes("x.com") ||
      url?.includes("twitter.com") ||
      header?.toLowerCase().includes("twitter") ||
      header?.toLowerCase() === "x",
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
    color: "text-gray-900",
    bg: "bg-gray-50 hover:bg-gray-100",
    border: "border-gray-200",
    label: "X (Twitter)",
  },
  {
    key: "instagram",
    match: (url, header) =>
      url?.includes("instagram.com") || header?.toLowerCase().includes("instagram"),
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
    color: "text-pink-600",
    bg: "bg-pink-50 hover:bg-pink-100",
    border: "border-pink-200",
    label: "Instagram",
  },
  {
    key: "youtube",
    match: (url, header) =>
      url?.includes("youtube.com") ||
      url?.includes("youtu.be") ||
      header?.toLowerCase().includes("youtube"),
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
    color: "text-red-600",
    bg: "bg-red-50 hover:bg-red-100",
    border: "border-red-200",
    label: "YouTube",
  },
  {
    key: "linkedin",
    match: (url, header) =>
      url?.includes("linkedin.com") || header?.toLowerCase().includes("linkedin"),
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: "text-blue-700",
    bg: "bg-blue-50 hover:bg-blue-100",
    border: "border-blue-200",
    label: "LinkedIn",
  },
  {
    key: "tiktok",
    match: (url, header) =>
      url?.includes("tiktok.com") || header?.toLowerCase().includes("tiktok"),
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
    color: "text-gray-900",
    bg: "bg-gray-50 hover:bg-gray-100",
    border: "border-gray-200",
    label: "TikTok",
  },
];

const getSocialPlatform = (url, header) => {
  return SOCIAL_PLATFORMS.find((p) => p.match(url, header)) || null;
};

export default function Contact() {
  const { sectionTitle } = useParams();
  const location = useLocation();
  const { categoryID } = location.state || {};
  const [searchTerm, setSearchTerm] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [loaded, setLoaded] = useState(false);

  const [originalData, setOriginalData] = useState({
    contact: {},
    bullets: [],
  });

  const filteredBullets = originalData?.bullets?.filter((bullet) => {
    const term = searchTerm.toLowerCase();
    return (
      !bullet.isDeleted &&
      (bullet.Header?.toLowerCase().includes(term) ||
        bullet.Detail?.toLowerCase().includes(term))
    );
  });

  useEffect(() => {
    const fetchSectionDetails = async () => {
      try {
        const res = await getContacts("CONTACT_MAIN");
        const fetchedData = {
          contact: res?.Contact ?? {},
          bullets: (res?.Bullets ?? []).map((b) => ({ ...b, isDeleted: false })),
        };
        setOriginalData(fetchedData);
        setTimeout(() => setLoaded(true), 100);
      } catch (error) {
        console.error("❌ Failed to load section details:", error);
      }
    };
    fetchSectionDetails();
  }, [categoryID]);

  const toggleAccordion = (i) => {
    setActiveIndex(activeIndex === i ? null : i);
  };

  const { contact } = originalData;

  const infoItems = [
    { icon: "mobile", label: "Call Us", value: contact.Contact_No },
    { icon: "phone", label: "Telephone", value: contact.Tel_No },
    { icon: "at", label: "Email", value: contact.Email },
    { icon: "map", label: "Address", value: contact.Address },
    {
      icon: "calendar",
      label: "Business Hours",
      value: [contact.Schedule1, contact.Schedule2, contact.Schedule3]
        .filter(Boolean)
        .join("\n"),
    },
  ].filter((item) => item.value);

  // Build Google Maps embed URL from address or location
  const mapQuery = contact.Address || contact.Location || "";
  const mapEmbedUrl = mapQuery
    ? `https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${encodeURIComponent(mapQuery)}`
    : null;

  // Separate bullets: social vs regular
  const socialBullets = filteredBullets.filter((b) => getSocialPlatform(b.Detail, b.Header));
  const regularBullets = filteredBullets.filter((b) => !getSocialPlatform(b.Detail, b.Header));

  return (
    <div className="min-h-screen">

      {/* ── HERO BANNER ── */}
      <div className="relative  bg-purple-200 overflow-hidden flex items-center justify-between px-50 pt-16 gap-10 min-h-[340px]">
        {/* Pink blob top-left */}


        {/* Left: Text */}
        <div className="relative z-10 flex-1">
          <h1 className="mt-4 text-gray-700 text-5xl  max-w-3xl font-bold">
            {sectionTitle || "Contact Us"}
          </h1>
          <p className="mt-4 text-gray-700 text-xl font-medium max-w-2xl">
            We'd love to hear from you. Reach out and we'll get back to you shortly.
          </p>
        </div>

        {/* 🌷 RIGHT SIDE - IMAGE */}
        <div className="flex justify-end">
          <img
            src={FAQS_img}
            alt="FAQs"
            className="w-[480px] object-cover"
          />
        </div>
      </div>

      {/* ── CONTACT BODY ── */}
      <div
        className={`max-w-6xl mx-auto flex gap-10 px-20 py-16 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
      >
        {/* LEFT: Info Items */}
        <div className="flex-1 flex flex-col gap-7">
          {infoItems.map((item, i) => (
            <div key={i}>
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-full bg-pink-300 flex items-center justify-center text-lg flex-shrink-0">
                  <FontAwesomeIcon
                    icon={item?.icon || "circle"} // 🌼 dynamic icon
                    className="text-pink-800"
                  />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-900 mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm text-gray-500 leading-relaxed break-words whitespace-pre-line">
                    {item.value?.startsWith("http") ? (
                      <a href={item.value} target="_blank" rel="noreferrer" className="text-pink-500 hover:underline">
                        {item.value}
                      </a>
                    ) : item.value?.includes("@") ? (
                      <a href={`mailto:${item.value}`} className="text-pink-500 hover:underline">
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* RIGHT: Google Map */}
        <div className="flex-1 bg-white rounded-2xl overflow-hidden shadow-md min-h-[360px]">
          {mapEmbedUrl ? (
            <iframe
              title="Office Location"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`}
              className="w-full h-full min-h-[360px] border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <iframe
              title="Office Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4152.893938233819!2d120.98384727541871!3d14.582750985901487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397ca276a7527bd%3A0xa386850c734bca7c!2s918%20United%20Nations%20Ave%2C%20Paco%2C%20Manila%2C%201007%20Metro%20Manila!5e1!3m2!1sen!2sph!4v1772422513081!5m2!1sen!2sph"
              className="w-full h-full min-h-[360px] border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          )}
        </div>
      </div>

      {/* ── QUICK LINKS / BULLETS ── */}
      {originalData.bullets.length > 0 && (
        <div className="max-w-6xl mx-auto px-20 pb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-pink-400 mb-4">
            Quick Links
          </p>

          {/* Social Media Cards (shown as direct link buttons, not accordion) */}
          {socialBullets.length > 0 && (
            <div className="flex flex-wrap gap-3 mb-6">
              {socialBullets.map((bullet, i) => {
                const platform = getSocialPlatform(bullet.Detail, bullet.Header);
                return (
                  <a
                    key={i}
                    href={bullet.Detail}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex items-center gap-2 px-5 py-3 rounded-2xl border font-medium text-sm transition-all duration-200 ${platform.color} ${platform.bg} ${platform.border}`}
                  >
                    {platform.icon}
                    <span>{bullet.Header || platform.label}</span>
                  </a>
                );
              })}
            </div>
          )}

          {/* Regular Accordion Bullets */}
          {regularBullets.length > 0 && (
            <>
              {/* Search */}
              <div className="relative mb-5">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-base">🔍</span>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-2xl bg-white text-sm text-gray-800 placeholder-gray-300 outline-none focus:border-pink-300 focus:ring-2 focus:ring-pink-100"
                />
              </div>

              {regularBullets.length === 0 ? (
                <div className="text-center py-12 text-gray-300 text-sm">No results found.</div>
              ) : (
                <div className="flex flex-col gap-3">
                  {regularBullets.map((bullet, i) => (
                    <div
                      key={i}
                      className={`border rounded-2xl overflow-hidden shadow-sm transition-colors duration-200 ${activeIndex === i ? "border-pink-300" : "border-gray-200"
                        }`}
                    >
                      <button
                        onClick={() => toggleAccordion(i)}
                        className={`w-full flex justify-between items-center px-6 py-5 text-left transition-colors duration-200 ${activeIndex === i ? "bg-pink-50" : "bg-gray-50 hover:bg-pink-50"
                          }`}
                      >
                        <span className="font-semibold text-gray-800 text-base">
                          {bullet.Header}
                        </span>
                        <span
                          className={`text-2xl font-bold text-pink-400 leading-none transition-transform duration-300 ${activeIndex === i ? "rotate-45" : ""
                            }`}
                        >
                          +
                        </span>
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-300 ${activeIndex === i ? "max-h-72 opacity-100" : "max-h-0 opacity-0"
                          }`}
                      >
                        <div className="px-6 py-4 text-sm text-gray-500 leading-relaxed border-t border-gray-100">
                          {bullet.Detail?.startsWith("http") ? (
                            <a href={bullet.Detail} target="_blank" rel="noreferrer" className="text-pink-500 font-medium hover:underline">
                              {bullet.Detail}
                            </a>
                          ) : (
                            bullet.Detail
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* If only social bullets exist and search returned nothing else */}
          {regularBullets.length === 0 && socialBullets.length === 0 && (
            <div className="text-center py-12 text-gray-300 text-sm">No results found.</div>
          )}
        </div>
      )}
    </div>
  );
}