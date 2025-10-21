import React, { useEffect, useState } from "react";
import { getRoleList } from "../../../../API/ContentManagement/Maintenance_Repository";

export default function Role() {
  const [roles, setRoles] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const res = await getRoleList(0);
        console.log("✅ Role data:", res);
        setRoles(res.Roles || []);
      } catch (error) {
        console.error("❌ Failed to load roles:", error);
      }
    };
    fetchRoles();
  }, []);

  const filteredRoles = roles.filter(
    (role) =>
      role.Name.toLowerCase().includes(search.toLowerCase()) ||
      role.Description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-4xl font-bold text-sky-700">Manage Roles</h1>
      </div>
      <div className="flex justify-between items-center mb-4">
        {/* Left: Search */}
        <div className="flex flex-row">
          <label className="text-sm text-[#004c91] font-medium mb-1">Search:</label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#004c91]"
            placeholder="Search roles..."
          />
        </div>

        {/* Right: Add Role button */}
        <button className="bg-[#0074d9] hover:bg-[#005fa3] text-white px-4 py-2 rounded-md text-sm font-medium">
          + Add Role
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-sky-200 rounded-xl shadow-lg overflow-hidden">
          <thead className="bg-gradient-to-r from-sky-700 to-sky-900 text-sky-50">
            <tr className="">
              <th className="px-4 py-3 text-left font-semibold">Role Name</th>
              <th className="px-4 py-3 text-left font-semibold">Role Description</th>
              <th className="px-4 py-3 text-left font-semibold">Added By</th>
              <th className="px-4 py-3 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-sky-100">
            {filteredRoles.length > 0 ? (
              filteredRoles.map((role, index) => (
                <tr
                  key={role.Id}
                  className="group hover:bg-sky-300  transition-colors duration-150 odd:bg-white even:bg-sky-50"
                >
                  <td className="py-2 px-4 font-medium text-sky-700 group-hover:text-sky-100">
                    {role.Name}
                  </td>
                  <td className="py-2 px-4 text-gray-600 group-hover:text-sky-100">
                    {role.Description}
                  </td>
                  <td className="py-2 px-4  text-gray-600 group-hover:text-sky-100">
                    {role.AddedBy || "-"}
                  </td>
                  <td className="py-2 px-4 text-center text-gray-600 group-hover:text-sky-100">
                    <a href="#" className="text-blue-600 hover:underline mr-3">
                      Manage
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="text-center py-4 font-medium text-sky-700 italic"
                >
                  No roles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
