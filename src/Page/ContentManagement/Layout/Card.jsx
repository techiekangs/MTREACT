import { useState } from "react";

export default function Card({
  details,
  bullets,
  images,
  CATEGORY_ID,
  onChange,
  addItem,
  removeItem,
}) {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="grid grid-cols-1 gap-10">
      {/* LOOP THROUGH EACH CARD */}
      {details.map((d, i) => {
        const bullet = bullets[i] || {};
        const img = images[i] || {};

        if (d.isDeleted) return null;

        return (
          <div
            key={i}
            className="p-4 grid grid-cols-2 gap-10 items-start border rounded-lg shadow bg-white mb-5"
          >
            {/* LEFT SIDE: IMAGE */}
            <div className="flex flex-col items-center">
              {/* Remove Button */}
              <button
                type="button"
                onClick={() => {
                  onChange("details", i, { ...d, isDeleted: true });
                  onChange("images", i, { ...img, isDeleted: true });
                  onChange("bullets", i, { ...bullet, isDeleted: true });
                }}
                className="self-end mb-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                ✕ Remove
              </button>

              {img?.IMG_URL || img?.preview ? (
                <img
                  src={img.IMG_URL || img.preview}
                  alt={`Preview ${i}`}
                  className="w-full h-64 object-cover border rounded mb-4"
                />
              ) : (
                <label
                  htmlFor={`file-upload-${i}`}
                  className="w-full h-64 flex items-center justify-center border-2 border-dashed rounded bg-gray-100 text-gray-400 cursor-pointer hover:bg-gray-200"
                >
                  + Upload Image
                  <input
                    id={`file-upload-${i}`}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        const file = e.target.files[0];
                        const newImage = {
                          CATEGORY_ID,
                          IMG_URL: URL.createObjectURL(file),
                          Upload_Date: new Date().toISOString(),
                          Upload_By: "currentUser",
                          CONTENT_ID: d.CONTENT_ID ?? 0,
                          preview: URL.createObjectURL(file),
                          isDeleted: false,
                        };
                        onChange("images", i, newImage);
                      }
                    }}
                  />
                </label>
              )}
            </div>

            {/* RIGHT SIDE: TEXT INPUTS */}
            <div>
              <input
                className="text-lg font-semibold uppercase border p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={d.Header ?? ""}
                placeholder="Enter header..."
                onChange={(e) => onChange("details", i, { Header: e.target.value })}
              />

              <input
                className="text-3xl font-bold border p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={d.Title ?? ""}
                placeholder="Enter title..."
                onChange={(e) => onChange("details", i, { Title: e.target.value })}
              />

              <textarea
                className="border w-full p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={d.Content ?? ""}
                placeholder="Enter content..."
                rows={4}
                onChange={(e) => onChange("details", i, { Content: e.target.value })}
              />

              <input
                className="text-base font-semibold border rounded p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter bullet header..."
                value={bullet.Header || ""}
                onChange={(e) =>
                  onChange("bullets", i, { ...bullet, Header: e.target.value })
                }
              />

              <textarea
                className="text-sm text-gray-600 border rounded p-2 resize-none w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Enter bullet details..."
                value={bullet.Detail || ""}
                rows={3}
                onChange={(e) =>
                  onChange("bullets", i, { ...bullet, Detail: e.target.value })
                }
              />
            </div>
          </div>
        );
      })}

      {/* ADD CARD BUTTON */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => {
            console.log("AddCard clicked!");

            const newDetail = {
              CATEGORY_ID,
              Content: "",
              Effectivity_Date: new Date().toISOString(),
              Expiration_Date: new Date(
                Date.now() + 30 * 24 * 60 * 60 * 1000
              ).toISOString(),
              Header: "",
              IMG_URL: "",
              Title: "",
              isDeleted: false,
            };

            const newImage = {
              CATEGORY_ID,
              IMG_URL: "",
              Upload_Date: new Date().toISOString(),
              Upload_By: "currentUser",
              CONTENT_ID: 0,
              preview: "",
              isDeleted: false,
            };

            const newBullet = {
              CATEGORY_ID,
              Header: "",
              Detail: "",
              CONTENT_ID: 0,
              isDeleted: false,
            };

            // Trigger parent’s addItem only once per type
            addItem("details", newDetail);
            addItem("images", newImage);
            addItem("bullets", newBullet);
          }}
          className="py-2 px-4 bg-sky-500 text-white rounded-lg shadow hover:bg-sky-600 transition"
        >
          ➕ Add Card
        </button>
      </div>
    </div>
  );
}
