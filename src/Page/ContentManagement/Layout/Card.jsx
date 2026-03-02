import { useEffect, useState } from "react";
import { fetchFTPImage } from "../../../API/ContentManagement/NAS_Repository";

export default function Card({
  details,
  bullets,
  images,
  CATEGORY_ID,
  onChange,
  addItem,
  removeItem,
}) {
  const [loadedImages, setLoadedImages] = useState([]);

  // Load FTP images when images prop changes
  useEffect(() => {
    if (images && images.length > 0) {
      loadAllFTPImages();
    } else {
      setLoadedImages([]);
    }
  }, [images]);

  const loadAllFTPImages = async () => {
    const updated = await Promise.all(
      images.map(async (img, idx) => {
        if (img.isDeleted || img.ftpBase64 || !img.IMG_URL || !img.FILE_NAME) {
          return img;
        }
        try {
          const base64 = await fetchFTPImage(img.IMG_URL, img.FILE_NAME);
          return { ...img, ftpBase64: base64 };
        } catch (err) {
          console.error("FTP load failed:", img.FILE_NAME);
          return img;
        }
      })
    );
    setLoadedImages(updated);
  };

  // EXACTLY LIKE YOUR WORKING CLASSIC COMPONENT
  const handleImageUpload = (e, index) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      const fullBase64 = reader.result;                    // data:image/jpeg;base64,...
      const pureBase64 = fullBase64.split(",")[1];          // only base64 part
      console.log(pureBase64);
      const newImage = {
        CATEGORY_ID,
        CONTENT_ID: 0,
        FILE_NAME: file.name,           // Correct
        FILE_TYPE: file.type,           // Correct (e.g., image/jpeg)
        FILE_SIZE: file.size,           // Correct (bytes)
        FILE_BYTE: pureBase64,          // Correct — pure Base64 string
        IMG_URL: "",                    // Will be set after save
        Upload_Date: new Date().toISOString(),
        Upload_By: "currentUser",
        isDeleted: false,
        ftpBase64: fullBase64,          // For instant preview
      };

      // This replaces the image at the correct index
      onChange("images", index, newImage);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="grid grid-cols-1 gap-10">
      {/* LOOP THROUGH EACH CARD */}
      {details.map((d, i) => {
        const bullet = bullets[i] || {};
        const img = loadedImages[i] || images[i] || {};

        if (d.isDeleted) return null;

        const displaySrc = img.ftpBase64 || img.IMG_URL;

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
                Remove Card
              </button>

              {/* Image Display or Upload Area */}
              {displaySrc ? (
                <img
                  src={displaySrc}
                  alt={`Preview ${i}`}
                  className="w-full h-64 object-cover border rounded mb-4"
                />
              ) : (
                <label
                  htmlFor={`file-upload-${i}`}
                  className="w-full h-64 flex items-center justify-center border-2 border-dashed rounded bg-gray-100 text-gray-400 cursor-pointer hover:bg-gray-200"
                >
                  + Upload Image
                </label>
              )}

              {/* Hidden File Input */}
              <input
                id={`file-upload-${i}`}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e, i)}
              />

              {/* Change Image Button (appears only if image exists) */}
              {displaySrc && (
                <label
                  htmlFor={`file-upload-${i}`}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white text-sm rounded cursor-pointer hover:bg-blue-700"
                >
                  Change Image
                </label>
              )}
            </div>

            {/* RIGHT SIDE: TEXT INPUTS */}
            <div>
              <input
                className="text-lg font-semibold uppercase border p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={d.Header ?? ""}
                placeholder="Enter header..."
                onChange={(e) =>
                  onChange("details", i, { ...d, Header: e.target.value })
                }
              />
              <input
                className="text-3xl font-bold border p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={d.Title ?? ""}
                placeholder="Enter title..."
                onChange={(e) =>
                  onChange("details", i, { ...d, Title: e.target.value })
                }
              />
              <textarea
                className="border w-full p-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={d.Content ?? ""}
                placeholder="Enter content..."
                rows={4}
                onChange={(e) =>
                  onChange("details", i, { ...d, Content: e.target.value })
                }
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
          </div>
        );
      })}

      {/* ADD CARD BUTTON */}
      <div className="flex justify-center">
        <button
          type="button"
          onClick={() => {
            const newDetail = {
              CATEGORY_ID,
              Content: "",
              Effectivity_Date: new Date().toISOString(),
              Expiration_Date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
              Header: "",
              Title: "",
              isDeleted: false,
            };
            const newImage = {
              CATEGORY_ID,
              CONTENT_ID: 0,
              FILE_NAME: "",
              FILE_TYPE: "",
              FILE_SIZE: 0,
              FILE_BYTE: "",
              IMG_URL: "",
              ftpBase64: "",
              isDeleted: false,
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
            addItem("details", newDetail);
            addItem("images", newImage);
            addItem("bullets", newBullet);
          }}
          className="py-2 px-4 bg-sky-500 text-white rounded-lg shadow hover:bg-sky-600 transition"
        >
          Add Card
        </button>
      </div>
    </div>
  );
}