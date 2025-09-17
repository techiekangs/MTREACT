import { useState, useEffect } from "react";
import api from "../../API/api";

export default function EditContent({ category }) {
  const [data, setData] = useState({
    details: [],
    bullets: [],
    images: [],
    contact: {},
  });

  useEffect(() => {
    const fetchSectionDetails = async () => {
      try {
        const response = await api.get(
          "ContentManagement/Detail/List/Bullets",
          {
            params: { CategoryId: category },
            headers: {
              Authorization: "bearer " + localStorage.getItem("token"),
              IpAddress: "::1",
              AppName: "MT",
            },
          }
        );

        const res = response.data;
        console.log("Details:", res.Details);
        console.log("Bullets:", res.Bullets);
        console.log("Images:", res.Images);
        console.log("Contact:", res.Contact);

        setData({
          details: res.Details || [],
          bullets: res.Bullets || [],
          images: res.Images || [],
          contact: res.Contact || {},
        });
      } catch (error) {
        console.error("❌ Failed to load section details:", error);
      }
    };

    fetchSectionDetails();
  }, [category]);

  // 🌼 Local image handler
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");

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

  return (
    <div className="p-4 space-y-6">
      {/* 🌼 Details */}
      {data.details.map((d, i) => (
        <div key={i} className="space-y-2 border-b pb-4">
          <label className="block font-semibold">Title</label>
          <input
            type="text"
            defaultValue={d.Title}
            className="border p-2 rounded w-full"
          />

          <label className="block font-semibold">Content</label>
          <textarea
            defaultValue={d.Content}
            className="border p-2 rounded w-full"
          />

          {/* 🌼 Image Selector with Error Catch */}
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
            defaultValue={d.Effectivity_Date?.split("T")[0]}
            className="border p-2 rounded w-full"
          />

          <label className="block font-semibold">Expiration Date</label>
          <input
            type="date"
            defaultValue={d.Expiration_Date?.split("T")[0]}
            className="border p-2 rounded w-full"
          />
        </div>
      ))}

      {/* 🌼 Bullets */}
      <div>
        <h2 className="font-bold text-lg mb-2">Bullets</h2>
        {data.bullets.map((b, i) => (
          <div key={i} className="mb-3 space-y-2 border-b pb-2">
            <label className="block font-semibold">Detail</label>
            <input
              type="text"
              defaultValue={b.Detail}
              className="border p-2 rounded w-full"
            />
          </div>
        ))}
      </div>

      {/* 🌼 Contact */}
      {data.contact && (
        <div className="space-y-2">
          <h2 className="font-bold text-lg">Contact</h2>
          <label className="block font-semibold">Email</label>
          <input
            type="email"
            defaultValue={data.contact.Email || ""}
            className="border p-2 rounded w-full"
          />

          <label className="block font-semibold">Phone</label>
          <input
            type="text"
            defaultValue={data.contact.Phone || ""}
            className="border p-2 rounded w-full"
          />
        </div>
      )}
    </div>
  );
}