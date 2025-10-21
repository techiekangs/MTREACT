import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react"
import { getSectionDetails, saveBullets, saveImages, saveLayoutStyle, saveSectionDetails } from "../../../../API/ContentManagement/CM_Repository"; // adjust path if needed
//SELECT_LAYOUT SP//
import Classic from "../../Layout/Classic";
import Carousel from "../../Layout/Carousel";
import Card from "../../Layout/Card";
import CardImg from "../../../../Components/Images/Card.png";
import CarouselImg from "../../../../Components/Images/Carousel.png";
import ClassicImg from "../../../../Components/Images/Classic.png";

export default function EditContent({ category, layoutStyle }) {
  const [activeTab, setActiveTab] = useState("current"); // current | compare
  const [effectivity_date, setEffectivityDate] = useState("");
  const [expiration_date, setExpirationDate] = useState("");
  console.log("layoutStyle: ", layoutStyle);
  const [selectedLayout, setSelectedLayout] = useState(
    layoutStyle || ""
  );
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
  });

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [error, setError] = useState("");
  const [docked, setDocked] = useState(false);

  // 🌼 Fetch section details
  useEffect(() => {
    const fetchSectionDetails = async () => {
      try {
        const res = await getSectionDetails(category);
        console.log("res:", res)

        const fetchedData = {
          details: res?.Details ?? [],
          bullets: (res?.Bullets ?? []).map((b) => ({
            ...b,
            isDeleted: false, // 🌸 add flag for bullets
          })),
          images: (res?.Images ?? []).map((img) => ({
            ...img,
            isDeleted: false, // 🌼 add flag for images
          })),
          contact: res?.Contact ?? {},
        };

        setOriginalData(fetchedData);
        const cloned = JSON.parse(JSON.stringify(fetchedData));
        cloned.layoutStyle = layoutStyle || 0;

        setEffectivityDate(fetchedData.details?.[0]?.Effectivity_Date || "");
        setExpirationDate(fetchedData.details?.[0]?.Expiration_Date || "");

        setEditedData(cloned); // deep clone
        console.log(fetchedData);
      } catch (error) {
        console.error("❌ Failed to load section details:", error);
      }
    };

    fetchSectionDetails();
  }, [category]);

  const handleChange = (field, index, value) => {
    setEditedData((prev) => {
      let updated = { ...prev };

      if (Array.isArray(prev[field]) && typeof index === "number") {
        // merge with existing object at that index
        const copy = [...prev[field]];
        copy[index] = { ...copy[index], ...value };
        updated[field] = copy;
      } else {
        // update whole field (non-array fields)
        updated[field] = value;
      }

      console.log("📌 Updated editedData:", updated);
      return updated;
    });
  };

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

  const handleSave = async () => {
    try {
      const payload = {
        details: editedData.details,
        images: editedData.images,
        bullets: editedData.bullets,
        layoutStyle: editedData.layoutStyle
      };
      console.log("saving..:", editedData.details[0]);
      const result = await saveSectionDetails(editedData.details);
      const resultBullet = await saveBullets(editedData.bullets);
      const resultImages = await saveImages(editedData.images);
      const resultLayout = await saveLayoutStyle(category, editedData.layoutStyle);
      navigate(location.pathname, {
        replace: true,
        state: { layoutStyle, sectionID: category }
      });
      alert("Section details saved successfully! 🌸");
    } catch (error) {
      alert("Failed to save section details ❌", error);
    }
  };

  const handleClear = () => {
    setEditedData(JSON.parse(JSON.stringify(originalData)));
    setPreview("");
    setFile(null);
    setError("");
  };

  // 🌼 Compare highlight function
  const highlightChange = (original, edited) =>
    original !== edited ? "bg-yellow-100" : "";

  const layouts = {
    1: Classic,
    2: Carousel,
    3: Card,
  };

  const layoutOptions = [
    { id: 1, key: "Classic", img: ClassicImg, label: "Classic" },
    { id: 2, key: "Carousel", img: CarouselImg, label: "Carousel" },
    { id: 3, key: "Card", img: CardImg, label: "Card" },
  ];


  const handleSelect = (id) => {
    setEditedData((prev) => ({
      ...prev,
      layoutStyle: id, // store number
    }));
  };

  // Add item to an array field
  const addItem = (field, newItem) => {
    console.log('addItem called!');
    setEditedData((prev) => {
      const updated = { ...prev };
      updated[field] = [...(prev[field] || []), newItem];
      console.log(`➕ Added to ${field}:`, updated[field]);
      return updated;
    });
  };


  // Remove item from an array field
  // const removeItem = (field, index) => {
  //   setEditedData((prev) => {
  //     const updated = { ...prev };
  //     updated[field] = prev[field].filter((_, i) => i !== index);
  //     console.log(`➖ Removed index ${index} from ${field}:`, updated[field]);
  //     return updated;
  //   });
  // };
  const removeItem = (field, index) => {
    setEditedData((prev) => {
      const updated = { ...prev };

      updated[field] = prev[field].map((item, i) =>
        i === index ? { ...item, isDeleted: true } : item
      );

      console.log(`🚫 Marked index ${index} from ${field} as deleted:`, updated[field]);
      return updated;
    });
  };


  const SelectedLayout = layouts[layoutStyle] || Classic;
  console.log("selectedLayout:", SelectedLayout);
  return (
    <div className="p-4 space-y-6 rounded">
      {/* 🌼 Tabs */}
      <div className="flex items-center border-b pb-2">
        {/* Left side buttons */}
        <div className="flex space-x-6">
          <button
            onClick={() => setActiveTab("current")}
            className={`${activeTab === "current" ? "font-bold border-b-2 border-sky-500" : ""
              }`}
          >
            Current Content
          </button>
          <button
            onClick={() => setActiveTab("compare")}
            className={`${activeTab === "compare" ? "font-bold border-b-2 border-sky-500" : ""
              }`}
          >
            Compare
          </button>
        </div>

        {/* Spacer pushes right-side buttons */}
        <div className="flex-grow"></div>

        {/* Right side buttons */}
        <div className="flex space-x-4">
          {!docked && (
            <button
              onClick={() => setDocked(true)}
              className="px-3 py-1 border rounded bg-sky-500 text-white hover:bg-sky-600 transition"
            >
              Show Panel
            </button>
          )}

          <button className="px-3 py-1 border rounded hover:bg-sky-200">
            Preview
          </button>

          {/* 🌼 Show when panel is hidden */}

          <button className="px-3 py-1 border rounded bg-blue-900 text-sky-100 hover:bg-sky-200">
            New Btn 2
          </button>
        </div>
      </div>

      {/* 🌼 Current Content */}
      {activeTab === "current" && (
        <div
          className={`grid gap-6 ${docked ? "grid-cols-3" : "grid-cols-1"
            } transition-all duration-500 ease-in-out`}
        >
          {/* 🌸 Left Column - Content & Bullets */}
          <div
            className={`space-y-6 bg-sky-50 m-2 p-6 transition-all duration-500 ${docked ? "col-span-2" : "col-span-1"
              }`}
          >
            <SelectedLayout
              details={editedData.details}
              bullets={editedData.bullets}
              images={editedData.images}
              CATEGORY_ID={category}
              onChange={handleChange}
              addItem={addItem}
              removeItem={removeItem}
            />


            {/* Bullets
            <div>
              <h2 className="font-bold text-lg mb-2">Bullets</h2>
              {editedData.bullets.map((b, i) => (
                <div key={i} className="mb-3 space-y-2">
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
            </div> */}


          </div>

          {/* 🌸 Right Column - Sticky Effectivity, Expiration & Actions */}
          <div
            className={`
              space-y-4 pl-4 sticky top-4 self-start m-2
              transition-transform duration-500 ease-in-out
              ${docked ? "translate-x-0 opacity-100" : "translate-x-100 opacity-0"}
            `}
          >
            <div className="bg-sky-50 p-6 relative rounded shadow">
              {/* Dock close button */}
              <button
                onClick={() => setDocked(false)}
                className="absolute top-2 right-2 px-2 py-1 text-xs border rounded bg-white hover:bg-sky-100"
              >
                ✕
              </button>

  
                <div  className="space-y-2">
                  <label className="block font-semibold text-sky-700">
                    Effectivity Date
                  </label>
                  <input
                    type="date"
                    value={editedData.details[0]?.Effectivity_Date?.split("T")[0] || ""}
                    onChange={(e) => { handleChange("details", 0, { Effectivity_Date: e.target.value, }); }}
                    className="border p-2 rounded w-full"
                  />

                  <label className="block font-semibold text-sky-700">
                    Expiration Date
                  </label>
                  <input
                    type="date"
                    value={editedData.details[0]?.Expiration_Date?.split("T")[0] || ""}
                    onChange={(e) => { handleChange("details", 0, { Expiration_Date: e.target.value, }); }}
                    className="border p-2 rounded w-full"
                  />
                </div>

              <label className="block font-semibold text-sky-700">
                Layout Style
              </label>
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                {layoutOptions.map((layout) => (
                  <div
                    key={layout.id}
                    onClick={() => handleSelect(layout.id)}
                    className={`flex items-center gap-3 border-2 rounded-lg cursor-pointer overflow-hidden 
        transition-transform hover:scale-105 p-3
        ${editedData.layoutStyle === layout.id
                        ? "border-sky-500 shadow-md bg-blue-50" // highlight when selected
                        : "border-gray-300"
                      }`}
                  >
                    {/* Preview image */}
                    <img
                      src={layout.img}
                      alt={layout.label}
                      className="w-24 h-full object-contain rounded-md border"
                    />

                    {/* Layout Name */}
                    <div className="font-medium text-gray-700">{layout.label}</div>
                  </div>
                ))}
              </div>


              <div className="flex gap-2 mt-4 justify-end">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-sky-600 text-white rounded hover:bg-sky-700"
                >
                  Save
                </button>
                <button
                  onClick={handleClear}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
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
