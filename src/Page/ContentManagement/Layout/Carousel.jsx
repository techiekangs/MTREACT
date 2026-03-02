import { useEffect, useState } from "react";
import { fetchFTPImage } from "../../../API/ContentManagement/NAS_Repository";

export default function Carousel({
  details,
  bullets,
  images,
  CATEGORY_ID,
  onChange,
  addItem,
  removeItem,
}) {
  const [loadedImages, setLoadedImages] = useState([]);

  useEffect(() => {
    if (images?.length > 0) loadAllFTPImages();
  }, [images]);

  const loadAllFTPImages = async () => {
    const updated = await Promise.all(
      images.map(async (img) => {
        if (img.isDeleted || img.ftpBase64 || !img.IMG_URL || !img.FILE_NAME) return img;
        try {
          const base64 = await fetchFTPImage(img.IMG_URL, img.FILE_NAME);
          const pureBase64 = base64.includes(',') ? base64.split(',')[1] : base64;
          return { ...img, ftpBase64: base64, FILE_BYTE: pureBase64 };
        } catch { return img; }
      })
    );
    setLoadedImages(updated);
  };

  const handleImageUpload = (e, index) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const fullBase64 = reader.result;
      const pureBase64 = fullBase64.split(",")[1];

      const newImage = {
        ...images[index], // Keep existing properties from parent
        FILE_NAME: file.name,
        FILE_TYPE: file.type,
        FILE_SIZE: file.size,
        FILE_BYTE: pureBase64,
        IMG_URL: "",
        Upload_Date: new Date().toISOString(),
        Upload_By: "currentUser",
        isDeleted: false,
        ftpBase64: fullBase64,
      };

      onChange("images", index, newImage);

      // Update loadedImages at the exact index
      setLoadedImages(prev => {
        const updated = [...prev];
        updated[index] = newImage;
        return updated;
      });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="grid grid-cols-1 gap-15 items-center">
      {/* LEFT: Shared Text Inputs */}
      <div className="p-4 rounded">
        {details.map((d, i) => (
          <div key={i}>
            <input
              className="text-lg font-semibold uppercase border p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={d.Header ?? ""}
              placeholder="Enter header..."
              onChange={(e) => onChange("details", i, { Header: e.target.value })}
            />
            <input
              className="text-5xl font-semibold uppercase border p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={d.Title ?? ""}
              placeholder="Enter title..."
              onChange={(e) => onChange("details", i, { Title: e.target.value })}
            />
            <textarea
              className="text-xl border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={d.Content ?? ""}
              placeholder="Enter content..."
              rows={4}
              onChange={(e) => onChange("details", i, { Content: e.target.value })}
            />
          </div>
        ))}
      </div>

      {/* RIGHT: Horizontal Scrollable Cards */}
      <div className="flex flex-col items-center">
        <button
          type="button"
          onClick={() => {
            const newImg = {
              CATEGORY_ID,
              CONTENT_ID: 0,
              FILE_NAME: "",
              FILE_TYPE: "",
              FILE_SIZE: 0,
              FILE_BYTE: "",
              IMG_URL: "",
              ftpBase64: "",
              isDeleted: false
            };
            const newBullet = {
              CATEGORY_ID,
              Header: "",
              Detail: "",
              CONTENT_ID: 0,
              isDeleted: false,
              Effectivity_Date: new Date().toISOString(),
              Expiration_Date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
              Show_Date: bullets[0].Show_Date
            };

            addItem("images", newImg);
            addItem("bullets", newBullet);

            // Keep loadedImages in sync
            setLoadedImages(prev => [...prev, newImg]);
          }}
          className="mt-4 py-2 px-6 mb-6 bg-sky-500 text-white rounded-lg shadow hover:bg-sky-600 transition font-medium"
        >
          Add Card
        </button>

        <div className="w-full overflow-x-auto">
          <div className="flex gap-8 pb-12 px-4 min-w-max">
            {images.map((img, i) => {
              const bullet = bullets[i] || {};
              const displayImg = loadedImages[i] || img;
              const hasImage = displayImg.ftpBase64 || displayImg.IMG_URL;

              if (!img || img.isDeleted) return null;

              return (
                <div
                  key={i}
                  className="relative w-96 bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col"
                >
                  {/* X Button — Top-right corner, inside card */}
                  <button
                    type="button"
                    onClick={() => {
                      onChange("images", i, { ...img, isDeleted: true });
                      onChange("bullets", i, { ...bullet, isDeleted: true });
                    }}
                    className="absolute top-4 right-4 z-20 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center text-2xl font-light hover:bg-red-600 shadow-md transition"
                  >
                    ×
                  </button>

                  {/* Image */}
                  {hasImage ? (
                    <img
                      src={hasImage}
                      alt={`Card ${i + 1}`}
                      className="w-full h-64 object-cover rounded-t-3xl"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-100 border-2 border-dashed border-gray-300 rounded-t-3xl flex items-center justify-center text-gray-400">
                      <span className="text-xl">No Image</span>
                    </div>
                  )}

                  {/* Text Content */}
                  <div className="p-6 space-y-5 flex-1">
                    <input
                      className="w-full text-2xl font-bold text-gray-800 placeholder-gray-400 focus:outline-none border-b-2 border-transparent focus:border-blue-500 transition"
                      placeholder="Enter header..."
                      value={bullet.Header || ""}
                      onChange={(e) => onChange("bullets", i, { ...bullet, Header: e.target.value })}
                    />
                    <textarea
                      className="w-full text-gray-600 text-base leading-relaxed resize-none focus:outline-none"
                      rows={3}
                      placeholder="Enter details..."
                      value={bullet.Detail || ""}
                      onChange={(e) => onChange("bullets", i, { ...bullet, Detail: e.target.value })}
                    />
                    {["NEWS_MAIN", "EVENTS_MAIN", "CAREER_MAIN"].includes(CATEGORY_ID) && (
                      <>
                        <label className="block font-semibold text-sky-700">
                          Effectivity Date
                        </label>
                        <input
                          type="date"
                          value={bullet.Effectivity_Date?.split("T")[0] || ""}
                          onChange={(e) =>
                            onChange("bullets", i, {
                              ...bullet,
                              Effectivity_Date: e.target.value,
                            })
                          }
                          className="border p-2 rounded w-full"
                        />

                        <label className="block font-semibold text-sky-700">
                          Expiration Date
                        </label>
                        <input
                          type="date"
                          value={bullet.Expiration_Date?.split("T")[0] || ""}
                          onChange={(e) =>
                            onChange("bullets", i, {
                              ...bullet,
                              Expiration_Date: e.target.value,
                            })
                          }
                          className="border p-2 rounded w-full"
                        />
                      </>
                    )}
                  </div>

                  {/* Change Image Button — BELOW TEXT, at bottom */}
                  <div className="px-6 pb-6">
                    <label
                      htmlFor={`file-upload-${i}`}
                      className="block w-full py-3 bg-blue-600 text-white text-center font-medium rounded-lg cursor-pointer hover:bg-blue-700 shadow transition"
                    >
                      {hasImage ? "Change Image" : "Upload Image"}
                    </label>
                    <input
                      id={`file-upload-${i}`}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e, i)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}