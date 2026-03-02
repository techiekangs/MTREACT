import { useEffect, useState } from "react";
import { fetchFTPImage } from "../../../API/ContentManagement/NAS_Repository";

export default function Contact({
    details,
    bullets,
    CATEGORY_ID,
    onChange,
    onChange2,
    addItem,
    removeItem
}) {
    return (
        <div className="rounded-2xl p-6">

            {/* Title */}
            <h2 className="text-xl font-bold text-sky-700 mb-4">
                Contact Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Mobile */}
                <div className="flex flex-col">
                    <label className="text-sm font-semibold text-sky-700">
                        Mobile Number
                    </label>
                    <input
                        type="text"
                        value={details?.Contact_No || ""}
                        onChange={(e) => { onChange("Contact_No", e.target.value); }}
                        className="border rounded-lg p-2 focus:ring-2 focus:ring-sky-400 outline-none"
                    />
                </div>

                {/* Telephone */}
                <div className="flex flex-col">
                    <label className="text-sm font-semibold text-sky-700">
                        Telephone
                    </label>
                    <input
                        type="text"
                        value={details?.Telephone || ""}
                        onChange={(e) => { onChange("Telephone", e.target.value); }}
                        className="border rounded-lg p-2 focus:ring-2 focus:ring-sky-400 outline-none"
                    />
                </div>

                {/* Email */}
                <div className="flex flex-col md:col-span-2">
                    <label className="text-sm font-semibold text-sky-700">
                        Email
                    </label>
                    <input
                        type="email"
                        value={details?.Email || ""}
                        onChange={(e) => { onChange("Email", e.target.value); }}
                        className="border rounded-lg p-2 focus:ring-2 focus:ring-sky-400 outline-none"
                    />
                </div>

                {/* Address */}
                <div className="flex flex-col md:col-span-2">
                    <label className="text-sm font-semibold text-sky-700">
                        Address
                    </label>
                    <textarea
                        value={details?.Address || ""}
                        onChange={(e) => { onChange("Address", e.target.value); }}
                        rows={2}
                        className="border rounded-lg p-2 focus:ring-2 focus:ring-sky-400 outline-none"
                    />
                </div>

                {/* Location */}
                <div className="flex flex-col md:col-span-2">
                    <label className="text-sm font-semibold text-sky-700">
                        Location
                    </label>
                    <input
                        type="text"
                        value={details?.Location || ""}
                        onChange={(e) => { onChange("Location", e.target.value); }}
                        className="border rounded-lg p-2 focus:ring-2 focus:ring-sky-400 outline-none"
                    />
                </div>

                {/* Schedule 1 */}
                <div className="flex flex-col md:col-span-2">
                    <label className="text-sm font-semibold text-sky-700">
                        Schedule 1 🌼
                    </label>
                    <input
                        type="text"
                        value={details?.Schedule1 || ""}
                        onChange={(e) => { onChange("Schedule1", e.target.value); }}
                        className="border rounded-lg p-2 focus:ring-2 focus:ring-sky-400 outline-none"
                    />
                </div>

                {/* Schedule 2 */}
                <div className="flex flex-col md:col-span-2">
                    <label className="text-sm font-semibold text-sky-700">
                        Schedule 2
                    </label>
                    <input
                        type="text"
                        value={details?.Schedule2 || ""}
                        onChange={(e) => { onChange("Schedule2", e.target.value); }}
                        className="border rounded-lg p-2 focus:ring-2 focus:ring-sky-400 outline-none"
                    />
                </div>

                {/* Schedule 3 */}
                <div className="flex flex-col md:col-span-2">
                    <label className="text-sm font-semibold text-sky-700">
                        Schedule 3
                    </label>
                    <input
                        type="text"
                        value={details?.Schedule3 || ""}
                        onChange={(e) => { onChange("Schedule3", e.target.value); }}
                        className="border rounded-lg p-2 focus:ring-2 focus:ring-sky-400 outline-none"
                    />
                </div>

            </div>

            {/* Category display
      <div className="mt-4 text-xs text-gray-400">
        Category: {CATEGORY_ID} 🌺
      </div> */}
            <h2 className="text-xl font-bold text-sky-700 mb-4 mt-4">
                Social Media Accounts
            </h2>

            {bullets.length > 0 && bullets.map((b, j) => !b.isDeleted && (
                <div key={j} className="flex items-center gap-2 mb-2">
                    <div className="w-full">
                        <input
                             className="border rounded-lg mt-2 p-2 focus:ring-2 focus:ring-sky-400 outline-none block w-full"
                            value={b.Header || ""}
                            onChange={(e) => {
                                onChange2( j, { Header: e.target.value });
                            }}
                            
                        />


                        <input
                            className="border rounded-lg mt-2 p-2 focus:ring-2 focus:ring-sky-400 outline-none block w-full"
                            value={b.Detail || ""}
                            onChange={(e) => {
                                onChange2(j, { Detail: e.target.value });
                            }}
                        />
                    </div>
                <button
                    type="button"
                    className="px-2 py-1 bg-red-500 text-white rounded"
                    onClick={() => removeItem("bullets", j)}
                  >
                    –
                  </button>
                </div>
            ))}
<button
                type="button"
                className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
                onClick={() => addItem("bullets", { CATEGORY_ID, Header: "", Detail: "", CONTENT_ID: 0, isDeleted: false })}
              >
                + Add Bullet
              </button>
        </div>
    );
}