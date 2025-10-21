import { useEffect, useState } from "react";
import { ArrowBigRight, ArrowBigLeft } from "lucide-react";

export default function Carousel({ details, bullets, images, CATEGORY_ID, onChange, addItem, removeItem }) {
  const [currentImage, setCurrentImage] = useState(0);

   const [cards, setCards] = useState([
    { img: "", title: "", details: "" },
  ]);
  return (
    <div className="grid grid-cols-1  gap-15 items-center">
      <div className="p-4 rounded">
        <div>
          <>
            {details.map((d, i) => (
              <div key={i} className="">
                  <input
                  className="text-lg font-semibold uppercase border p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={d.Header ?? ""}
                  placeholder="Enter header..."
                  onChange={(e) =>
                    onChange("details", i, { Header: e.target.value })
                  }
                />
                <input
                  className="text-5xl font-semibold uppercase border p-2 mb-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={d.Title ?? ""}
                  placeholder="Enter title..."
                  onChange={(e) =>
                    onChange("details", i, { Title: e.target.value })
                  }
                />
                <textarea
                  className="text-xl border w-full p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                  value={d.Content ?? ""}
                  placeholder="Enter content..."
                  rows={4}
                  onChange={(e) =>
                    onChange("details", i, { Content: e.target.value })
                  }
                />
              </div>
            ))}
          </>


          

          {/* <button
            type="button"
            className="mt-2 px-3 py-1 bg-green-500 text-white rounded"
            onClick={() => addItem("bullets", { CATEGORY_ID, Header: "", Detail: "", CONTENT_ID: 0, isDeleted: false })}
          >
            + Add Bullet
          </button> */}
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
      </div>
      <div className="flex flex-col items-center">
        {/* Buttons above */}
        <div className="flex gap-2 mb-2">
           <button
    type="button"
    onClick={() => {
      // Add empty placeholders for both
      addItem("images", {
        CATEGORY_ID,
        IMG_URL: "",
        Upload_Date: new Date().toISOString(),
        Upload_By: "currentUser",
        CONTENT_ID: 0,
        preview: "",
        isDeleted: false,
      });

      addItem("bullets", {
        CATEGORY_ID,
        Header: "",
        Detail: "",
        CONTENT_ID: 0,
        isDeleted: false,
      });
    }}
    className="mt-4 py-2 px-4 mb-5 bg-sky-500 text-white rounded-lg shadow hover:bg-sky-600 transition"
  >
    ➕ Add Card
  </button>

          {/* <button
            type="button"
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            disabled={images.length === 0}
            onClick={() => removeItem("images", currentImage)}
          >
            – Remove
          </button> */}
        </div>
<div className="flex gap-6">
 {images.map((img, i) => {
  const bullet = bullets[i] || {};
  if (!img || img.isDeleted || bullet.isDeleted) return null; // 🌸 hide deleted
  
  return (
    <div
      key={i}
      className="relative border rounded-xl shadow-md p-4 bg-white max-w-md"
    >
      {/* Remove Button */}
      <button
        type="button"
        onClick={() => {
          onChange("images", i, { ...img, isDeleted: true });
          onChange("bullets", i, { ...bullet, isDeleted: true });
        }}
        className="absolute -top-3 -right-3 text-white bg-red-500 p-2 pl-3 pr-3 rounded-full hover:bg-red-700"
      >
        ✕
      </button>

      {/* Image or Upload Placeholder */}
      {img?.IMG_URL || img?.preview ? (
        <img
          src={img.IMG_URL || img.preview}
          alt={`Preview ${i}`}
          className="w-full h-64 object-cover border rounded mb-4"
        />
      ) : (
        <label
          htmlFor={`file-upload-${i}`}
          className="w-full h-64 flex items-center justify-center border-2 border-dashed rounded bg-gray-100 text-gray-400 mb-4 cursor-pointer hover:bg-gray-200"
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
                  CONTENT_ID: 0,
                  preview: URL.createObjectURL(file),
                  isDeleted: false,
                };
                onChange("images", i, newImage);
              }
            }}
          />
        </label>
      )}

      {/* Header */}
      <input
        className="text-base font-semibold text-gray-700 border rounded p-2 mb-2 w-full"
        placeholder="Enter header..."
        value={bullet.Header || ""}
        onChange={(e) =>
          onChange("bullets", i, { ...bullet, Header: e.target.value })
        }
      />

      {/* Detail */}
      <textarea
        className="text-sm text-gray-600 border rounded p-2 resize-none w-full"
        placeholder="Enter details..."
        value={bullet.Detail || ""}
        rows={3}
        onChange={(e) =>
          onChange("bullets", i, { ...bullet, Detail: e.target.value })
        }
      />
    </div>
  );
})}



</div>



        {/* Thumbnails below */}
        {/* <div className="flex gap-2 mt-4 overflow-x-auto">
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
        </div> */}
      </div>

    </div>
  );
};
