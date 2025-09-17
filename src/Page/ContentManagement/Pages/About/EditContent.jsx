import { useEffect, useState } from "react";
import api from "../../../../API/api"; // adjust path if needed

export default function EditContent({ category }) {
  const [activeTab, setActiveTab] = useState("current"); // current | compare

  // 🌼 States
  const [originalData, setOriginalData] = useState({
    details: [],
    bullets: [],
    images: [],
    contact: {},
  });

  const [editedData, setEditedData] = useState({
    details: [],
    bullets: [],
    images: [],
    contact: {},
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");

  // 🌼 Fetch section details
  useEffect(() => {
    const fetchSectionDetails = async () => {
      try {
        const response = await api.get("ContentManagement/Detail/List/Bullets", {
          params: { CategoryId: category },
          headers: {
            Authorization: "bearer " + localStorage.getItem("token"),
            IpAddress: "::1",
            AppName: "MT",
          },
        });

        const res = response.data;

        const fetchedData = {
          details: res?.Details ?? [],
          bullets: res?.Bullets ?? [],
          images: res?.Images ?? [],
          contact: res?.Contact ?? {},
        };

        setOriginalData(fetchedData);
        setEditedData(JSON.parse(JSON.stringify(fetchedData))); // deep clone
      } catch (error) {
        console.error("❌ Failed to load section details:", error);
      }
    };

    fetchSectionDetails();
  }, [category]);

  // 🌼 Handlers
  const handleFileChange = (e, i) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setError("");
    }
  };

  const handleImageError = () => {
    setError("⚠️ Image not found or failed to load.");
    setPreview("");
  };

  const handleSaveImage = async () => {
    if (!file) {
      setError("⚠️ No image selected.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();
      console.log("✅ Uploaded image URL:", result.url);
      setError("");
    } catch (err) {
      setError("❌ Upload failed. Try again.");
    }
  };

  // 🌼 Compare highlight function
  const highlightChange = (original, edited) =>
    original !== edited ? "bg-yellow-100" : "";

  return (
    <div className="p-4 space-y-6 bg-sky-50 rounded">
      {/* 🌼 Tabs */}
      <div className="flex space-x-6 border-b pb-2">
        <button
          onClick={() => setActiveTab("current")}
          className={`${
            activeTab === "current" ? "font-bold border-b-2 border-sky-500" : ""
          }`}
        >
          Current Content
        </button>
        <button
          onClick={() => setActiveTab("compare")}
          className={`${
            activeTab === "compare" ? "font-bold border-b-2 border-sky-500" : ""
          }`}
        >
          Compare
        </button>
      </div>

      {/* 🌼 Current Content */}
      {activeTab === "current" && (
        <div className="space-y-6">
          {editedData.details.map((d, i) => (
            <div key={i} className="space-y-2 border-b pb-4">
              <label className="block font-semibold">Title</label>
              <input
                type="text"
                value={d.Title}
                onChange={(e) => {
                  const updated = [...editedData.details];
                  updated[i].Title = e.target.value;
                  setEditedData({ ...editedData, details: updated });
                }}
                className="border p-2 rounded w-full"
              />

              <label className="block font-semibold">Content</label>
              <textarea
                value={d.Content}
                onChange={(e) => {
                  const updated = [...editedData.details];
                  updated[i].Content = e.target.value;
                  setEditedData({ ...editedData, details: updated });
                }}
                className="border p-2 rounded w-full"
              />

              {/* 🌼 Image Selector */}
              <label className="block font-semibold">Image</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, i)}
                className="border p-2 rounded w-full"
              />

              {(preview || d.IMG_URL) && (
                <img
                  src={preview || d.IMG_URL}
                  alt="Preview"
                  onError={handleImageError}
                  className="w-48 h-48 object-cover border rounded shadow"
                />
              )}

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <button
                type="button"
                onClick={handleSaveImage}
                className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
              >
                Save Image
              </button>

              <label className="block font-semibold">Effectivity Date</label>
              <input
                type="date"
                value={d.Effectivity_Date?.split("T")[0] || ""}
                onChange={(e) => {
                  const updated = [...editedData.details];
                  updated[i].Effectivity_Date = e.target.value;
                  setEditedData({ ...editedData, details: updated });
                }}
                className="border p-2 rounded w-full"
              />

              <label className="block font-semibold">Expiration Date</label>
              <input
                type="date"
                value={d.Expiration_Date?.split("T")[0] || ""}
                onChange={(e) => {
                  const updated = [...editedData.details];
                  updated[i].Expiration_Date = e.target.value;
                  setEditedData({ ...editedData, details: updated });
                }}
                className="border p-2 rounded w-full"
              />
            </div>
          ))}

          {/* Bullets */}
          <div>
            <h2 className="font-bold text-lg mb-2">Bullets</h2>
            {editedData.bullets.map((b, i) => (
              <div key={i} className="mb-3 space-y-2 border-b pb-2">
                <label className="block font-semibold">Detail</label>
                <input
                  type="text"
                  value={b.Detail}
                  onChange={(e) => {
                    const updated = [...editedData.bullets];
                    updated[i].Detail = e.target.value;
                    setEditedData({ ...editedData, bullets: updated });
                  }}
                  className="border p-2 rounded w-full"
                />
              </div>
            ))}
          </div>

          {/* Contact */}
          {category !== "VM_MAIN" && editedData.contact && (
            <div className="space-y-2">
              <h2 className="font-bold text-lg">Contact</h2>
              <label className="block font-semibold">Email</label>
              <input
                type="email"
                value={editedData.contact.Email || ""}
                onChange={(e) =>
                  setEditedData({
                    ...editedData,
                    contact: { ...editedData.contact, Email: e.target.value },
                  })
                }
                className="border p-2 rounded w-full"
              />

              <label className="block font-semibold">Phone</label>
              <input
                type="text"
                value={editedData.contact.Phone || ""}
                onChange={(e) =>
                  setEditedData({
                    ...editedData,
                    contact: { ...editedData.contact, Phone: e.target.value },
                  })
                }
                className="border p-2 rounded w-full"
              />
            </div>
          )}
        </div>
      )}

      {/* 🌼 Compare */}
      {activeTab === "compare" && (
        <div className="grid grid-cols-2 gap-6">
          {/* Original */}
          <div>
            <h3 className="font-bold mb-2">Original</h3>
            {originalData.details.map((d, i) => (
              <div key={i} className="mb-4">
                <p className="font-semibold">Title:</p>
                <div className="border p-2">{d.Title}</div>
                <p className="font-semibold">Content:</p>
                <div className="border p-2">{d.Content}</div>
                {d.IMG_URL && (
                  <img
                    src={d.IMG_URL}
                    alt="Original"
                    className="w-32 h-32 object-cover border rounded mt-2"
                  />
                )}
              </div>
            ))}

            <h4 className="font-bold">Bullets</h4>
            <ul className="list-disc ml-5 mb-4">
              {originalData.bullets.map((b, i) => (
                <li key={i}>{b.Detail}</li>
              ))}
            </ul>

            {category !== "VM_MAIN" && (
              <div>
                <h4 className="font-bold">Contact</h4>
                <p>Email: {originalData.contact.Email}</p>
                <p>Phone: {originalData.contact.Phone}</p>
              </div>
            )}
          </div>

          {/* Edited */}
          <div>
            <h3 className="font-bold mb-2">Edited</h3>
            {editedData.details.map((d, i) => (
              <div key={i} className="mb-4">
                <p className="font-semibold">Title:</p>
                <div
                  className={`border p-2 ${highlightChange(
                    originalData.details[i]?.Title,
                    d.Title
                  )}`}
                >
                  {d.Title}
                </div>
                <p className="font-semibold">Content:</p>
                <div
                  className={`border p-2 ${highlightChange(
                    originalData.details[i]?.Content,
                    d.Content
                  )}`}
                >
                  {d.Content}
                </div>
                {(preview || d.IMG_URL) && (
                  <img
                    src={preview || d.IMG_URL}
                    alt="Edited"
                    className="w-32 h-32 object-cover border rounded mt-2"
                  />
                )}
              </div>
            ))}

            <h4 className="font-bold">Bullets</h4>
            <ul className="list-disc ml-5 mb-4">
              {editedData.bullets.map((b, i) => (
                <li
                  key={i}
                  className={highlightChange(
                    originalData.bullets[i]?.Detail,
                    b.Detail
                  )}
                >
                  {b.Detail}
                </li>
              ))}
            </ul>

            {category !== "VM_MAIN" && (
              <div>
                <h4 className="font-bold">Contact</h4>
                <p
                  className={highlightChange(
                    originalData.contact.Email,
                    editedData.contact.Email
                  )}
                >
                  Email: {editedData.contact.Email}
                </p>
                <p
                  className={highlightChange(
                    originalData.contact.Phone,
                    editedData.contact.Phone
                  )}
                >
                  Phone: {editedData.contact.Phone}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
