import { useLocation } from "react-router-dom";
import React, { useEffect,useState, useMemo } from "react";
import { getContentList, getUserList, addPermission } from "../../../../API/ContentManagement/Maintenance_Repository";

export default function UserDetails() {
    const location = useLocation();
    const { userID } = location.state || {};
     const [users, setUsers] = useState([]);
     const [contents, setContents] = useState([]);
       const [search, setSearch] = useState("");
       const [loading, setLoading] = useState(true);
       const [error, setError] = useState(null);

useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await getUserList(userID); // Replace with actual userId if needed
        console.log("✅ User data:", res);
        setUsers(res.CM_USER || []); // Set user data here
      } catch (error) {
        setError("Failed to load user data. Please try again.");
        console.error("❌ Failed to load user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);
  useEffect(() => {
    const fetchContents = async () => {
      try {
        setLoading(true);
        const res = await getContentList(userID);
        console.log("✅ Content data:", res);
        setContents(res.List || []); // use List directly
      } catch (error) {
        console.error("❌ Failed to load user data:", error);
        setError("Failed to load user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (userID) fetchContents();
  }, [userID]);

const allowPermission = async (item, checked) => {
   setContents((prev) =>
    prev.map((c) =>
      c.ID === item.ID ? { ...c, Allowed: checked } : c
    )
  );

    const permission = {
      USER_ID: users[0]?.Id || userID, // use either from state or prop
      CONTENT_LIST_ID: item.ID,
      EFFECTIVITY_DATE: item.EffectivityDate,
      EXPIRATION_DATE: item.ExpirationDate,
      ALLOWED: checked,
    };

    console.log("Sending permission:", permission);

    try {
      const response = await addPermission(users[0]?.Id, permission);
      console.log("✅ Permission updated:", response);
    } catch (error) {
      console.error("❌ Failed to update permission:", error);
    }
  };

const content = useMemo(
    () =>
      contents.filter(
        (item) =>
          item.Title.toLowerCase().includes(search.toLowerCase()) ||
          item.ExpirationDate.includes(search) ||
          item.EffectivityDate.includes(search) 
      ),
    [contents, search]
  );
  return (
    <div className="bg-[#e6f4ff] p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold text-[#004c91]">User Details</h1>
        <a href="/ContentManagement/Maintenance/User"><button className="bg-[#0074d9] hover:bg-[#005fa3] text-white px-4 py-2 rounded-md text-sm font-medium">
          ← Back to List
        </button></a>
      </div>

      <div className="flex items-start gap-4 w-full">
        {/* Left Section */}
        <div className="space-y-3 bg-white p-5 rounded-lg w-full md:w-1/3">
          <div>
            <label className="text-md text-[#004c91] font-semibold">User ID</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-2 py-1 text-md focus:outline-none focus:ring-1 focus:ring-[#004c91]"
              value={users[0]?.Id}
              readOnly
            />
          </div>
           <div>
            <label className="text-md text-[#004c91] font-semibold">Username</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-2 py-1 text-md focus:outline-none focus:ring-1 focus:ring-[#004c91]"
              value={users[0]?.Username}
              readOnly
            />
          </div>
          <div>
            <label className="text-md text-[#004c91] font-semibold">Email Address</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-2 py-1 text-md focus:outline-none focus:ring-1 focus:ring-[#004c91]"
              value={users[0]?.EmailAddress}
              readOnly
            />
          </div>
          <div>
            <label className="text-md text-[#004c91] font-semibold">Contact Number</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-2 py-1 text-md focus:outline-none focus:ring-1 focus:ring-[#004c91]"
              value={users[0]?.ContactNumber}
              readOnly
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 w-full md:w-2/3 bg-white p-3 rounded-lg">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-2xl font-semibold text-[#004c91]">Content List</h2>
            <div className="flex items-center gap-2">
              <label className="text-md text-[#004c91] font-medium">Search:</label>
              <input
                type="text"
                placeholder="Search..."
                className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#004c91]"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Table */}
         {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="bg-white rounded-lg overflow-hidden shadow-sm">
          <table className="w-full border-collapse">
            <thead className="bg-[#004c91] text-white text-md font-medium">
              <tr>
                <th className="px-4 py-2 text-left">Allowed</th>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Effectivity Date</th>
                <th className="px-4 py-2 text-left">Expiration Date</th>
              </tr>
            </thead>
            <tbody className="text-md text-gray-800">
              {content.length > 0 ? (
                content.map((item, i) => (
                  <tr
                    key={item.ID}
                    className={i % 2 === 0 ? "bg-[#e9f6ff]" : "bg-white"}
                  >
                    <td className="px-4 py-2">
                      <input
                        type="checkbox"
                        checked={item.Allowed}
                        onChange={(e) => allowPermission(item, e.target.checked)}
                        className="accent-[#004c91]"
                      />
                    </td>
                    <td className="px-4 py-2 font-medium text-[#004c91]">
                      {item.Title}
                    </td>
                    <td className="px-4 py-2">
                      {item.EffectivityDate || "N/A"}
                    </td>
                    <td className="px-4 py-2">
                      {item.ExpirationDate || "N/A"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-4 py-3 text-center text-gray-500"
                  >
                    No content found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
        </div>
      </div>
    </div>
  );
}
