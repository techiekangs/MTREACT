import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { getRoleList, getUserList } from "../../../../API/ContentManagement/Maintenance_Repository";

export default function User() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await getUserList(""); // Replace with actual userId if needed
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

  // Memoize filtered users based on search criteria
  const filteredUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          user.Username.toLowerCase().includes(search.toLowerCase()) ||
          user.EmailAddress.toLowerCase().includes(search.toLowerCase())
      ),
    [users, search]
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold text-sky-700">Manage Users</h1>
      </div>

      <div className="flex justify-between items-center mb-4">
        {/* Left: Search */}
        <div className="flex flex-row items-center">
          <label className="text-md text-[#004c91] font-medium mb-1 mr-2">Search:</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-md focus:outline-none focus:ring-1 focus:ring-[#004c91]"
            placeholder="Search users..."
          />
        </div>

        {/* Right: Add User button */}
        <button className="bg-[#0074d9] hover:bg-[#005fa3] text-white px-4 py-2 rounded-md text-md font-medium">
          + Add User
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-sky-200 rounded-xl shadow-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-sky-700 to-sky-900 text-sky-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Username</th>
              <th className="px-4 py-3 text-left font-semibold">Email Address</th>
              <th className="px-4 py-3 text-left font-semibold">Contact Number</th>
              <th className="px-4 py-3 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sky-100">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr
                  key={user.Id}
                  className="group hover:bg-sky-300 transition-colors duration-150 odd:bg-white even:bg-sky-50"
                >
                  <td className="py-2 px-4 font-medium text-sky-700 group-hover:text-sky-100">
                    {user.Username}
                  </td>
                  <td className="py-2 px-4 text-gray-600 group-hover:text-sky-100">
                    {user.EmailAddress}
                  </td>
                  <td className="py-2 px-4 text-gray-600 group-hover:text-sky-100">
                    {user.ContactNumber || "-"}
                  </td>
                  <td className="py-2 px-4 text-center text-gray-600 group-hover:text-sky-100">
                    <Link
                      to="/ContentManagement/Maintenance/User/Manage"
                      state={{ userID: user.Id }}
                      className="text-blue-600 hover:underline mr-3"
                    >
                      Manage
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-4 font-medium text-sky-700 italic"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
