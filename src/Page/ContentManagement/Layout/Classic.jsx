import { useEffect, useState } from "react";
import { ArrowBigRight, ArrowBigLeft } from "lucide-react";

export default function Classic({ details, bullets, images, CATEGORY_ID, onChange, addItem, removeItem }) {
  const [currentImage, setCurrentImage] = useState(0);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-15 items-center">
      <div className="p-4 rounded">
        <div>
          {details.map((d, i) => (
            <div key={i} className="mb-4">
                            <input className="text-lg font-semibold uppercase border p-1 mb-2 w-full" value={d.Header || 'Lorem Ipsum'} onChange={(e) => { onChange("details", 0, { Header: e.target.value, }); }} />
              <input className="text-5xl font-semibold uppercase border p-1 mb-2 w-full" value={d.Title || 'Lorem Ipsum'} onChange={(e) => { onChange("details", 0, { Title: e.target.value, }); }} />
              <textarea className="text-xl border w-full p-1" value={d.Content || 'Amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'} onChange={(e) => { onChange("details", 0, { Content: e.target.value, }); }} />
              {bullets.length > 0 && bullets.map((b, j) => !b.isDeleted && (
                <div key={j} className="flex items-center gap-2 mb-2">
                  <input
                    className="text-sm text-gray-600 mt-1 border p-1 flex-1"
                    value={b.Detail || ""}
                    onChange={(e) => {
                      onChange("bullets", j, { ...b, Detail: e.target.value });
                    }}
                  />
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
                className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
                onClick={() => addItem("bullets", { CATEGORY_ID, Header: "", Detail: "", CONTENT_ID: 0, isDeleted: false })}
              >
                + Add Bullet
              </button>
              {/* {(d.IMG_URL || d.preview) && (
              <img
                src={d.IMG_URL || d.preview}
                alt="Preview"
                className="w-32 h-32 object-cover mt-2 border rounded shadow"
              />
            )} */}
              {/* <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const updated = [...details];
                updated[i].preview = URL.createObjectURL(e.target.files[0]);
                onChange('details', updated);
              }}
              className="mt-2 p-2 border rounded w-full"
            /> */}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col items-center">
        {/* Buttons above */}
        <div className="flex gap-2 mb-2">
          <label
            htmlFor="file-upload"
            className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            + Add Image
          </label>
          <input
            id="file-upload"
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
                  CONTENT_ID: 0,
                  preview: URL.createObjectURL(file),
                  isDeleted: false
                };
                addItem("images", newImage);
                setCurrentImage(images.length); // show newly added
              }
            }}
          />

          <button
            type="button"
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            disabled={images.length === 0}
            onClick={() => removeItem("images", currentImage)}
          >
            – Remove
          </button>
        </div>

        {/* Main image preview */}
        {images.length > 0 ? (
          <img
            src={images[currentImage]?.IMG_URL || images[currentImage]?.preview}
            alt="Main Preview"
            className="w-[420px] md:w-[480px] object-cover border rounded shadow"
          />
        ) : (
          <div className="w-[420px] md:w-[480px] h-64 flex items-center justify-center border rounded bg-gray-100 text-gray-400">
            No Image
          </div>
        )}

        {/* Thumbnails below */}
        <div className="flex gap-2 mt-4 overflow-x-auto">
          {images.map((img, i) => !img.isDeleted && (
            <img
              key={i}
              src={img.IMG_URL || img.preview}
              alt={`Thumbnail ${i + 1}`}
              className={`w-20 h-20 object-cover border rounded cursor-pointer ${i === currentImage ? "ring-2 ring-blue-500" : ""
                }`}
              onClick={() => setCurrentImage(i)}
            />
          ))}
        </div>
      </div>

    </div>
  );
};
