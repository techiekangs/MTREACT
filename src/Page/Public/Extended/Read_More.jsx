import { getSectionDetails } from "../../../API/ContentManagement/CM_Repository";
import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";

export default function () {

  const { sectionTitle, bulletHeader } = useParams();
  const location = useLocation();
  const { categoryID, index } = location.state || {}; // retrieve from Link state

  console.log("sectionTitle:", sectionTitle);
  console.log("bulletHeader:", bulletHeader);
  console.log("categoryID:", categoryID);
  console.log("index:", index);

    const [originalData, setOriginalData] = useState({
        details: [],
        bullets: [],
        images: [],
        contact: {},
    });

    useEffect(() => {
        const fetchSectionDetails = async () => {
            try {
                const res = await getSectionDetails(categoryID);
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

            } catch (error) {
                console.error("❌ Failed to load section details:", error);
            }
        };

        fetchSectionDetails();
    }, [categoryID]);
    return (
       <div className="relative h-screen pt-24 px-10">
  <h4 className="text-xl font-semibold text-pink-700">
    {originalData?.details?.[originalData?.details?.[index]?.Header ? index : 0]?.Header}
  </h4>
  <h1 className="text-5xl font-bold text-gray-900 max-w-3xl">
    {originalData?.details?.[originalData?.details?.[index]?.Header ? index : 0]?.Title}
  </h1>
  <img
    src={originalData?.images?.[index]?.IMG_URL}
    alt="Icon"
    className="my-6 w-[480px] object-cover rounded-xl shadow-lg"
  />
  <p className="mt-4 text-gray-500 text-xl font-medium max-w-2xl">
    {originalData?.details?.[originalData?.details?.[index]?.Header ? index : 0]?.Content}
  </p>
</div>

    )
}