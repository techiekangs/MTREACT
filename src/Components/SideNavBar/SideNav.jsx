import { useEffect, useState } from "react";
import api from "../../API/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../fontawesome";

export default function SideNav({ isCollapsed }) {
  const [menu, setMenus] = useState([]);
   const [openMenus, setOpenMenus] = useState({});


  const toggleMenu = (key) => {
    setOpenMenus((prev) => ({
      ...prev,
      [key]: !prev[key], // toggle open/close
    }));
  };

  useEffect(() => {
    // runs once when SideNav is mounted
    const fetchMenus = async () => {
      try {
        const response = await api.get("/Common/Menus", {
          headers: {
            Authorization: "bearer " + localStorage.getItem("token"),
            IpAddress: "::1",
            AppName: "MT",
          },
        });

        setMenus(response.data);
        console.log("✅ Menus loaded:", response.data);
      } catch (error) {
        console.error("❌ Failed to load menus:", error);
      }
    };

    fetchMenus();
  }, []); 

  return (
    <div className="">
    <aside className={`${
        isCollapsed ? "w-20" : "w-64"
      } h-screen bg-sky-900 shadow-lg fixed left-0 top-0 flex flex-col transition-all duration-300 ease-in-out`}>
      {/* Logo */}
      <div className={`p-2font-bold text-sky-100  text-center ${isCollapsed ? "text-3xl p-6" : "text-8xl"}`}>
        <FontAwesomeIcon icon="laptop-code"  className="mr-2" />
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-3">
          {menu.MainMenuList?.map((key) => {
            const item = menu.MenuD[key]?.MenuProperty;
            const isOpen = openMenus[key];
            return (
              <div key={key}>
                <button
                  onClick={() => {
                    if (item?.Url) {
                      window.location.href = item.Url;
                    } else {
                      toggleMenu(key);
                    }
                  }}
                  className="flex items-center justify-between w-full px-3 py-2 rounded-md hover:bg-sky-200 hover:text-sky-900 text-sky-100"
                >
                  <div className="flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={item?.LeftIcon || "circle"} // 🌼 dynamic icon
                      className="mr-2"
                    />
                    {!isCollapsed && <span>{item?.Description}</span>}
                  </div>

                  {/* Only show dropdown arrow if submenu exists */}
                  {item?.SubMenu && !isCollapsed && (
                    <span className={`transition-transform ${isOpen ? "rotate-90" : ""}`}>
                      ▶
                    </span>
                  )}
                </button>

                {/* Submenu */}
                {item?.SubMenu && isOpen && (
                  <div className="ml-6 mt-1 space-y-2">
                    {item.SubMenu.map((sub, idx) => (
                      <a
                        key={idx}
                        href={sub.Url?.replace("href=", "")}
                        className="block px-3 py-1 rounded-md text-sky-200 hover:bg-sky-300 hover:text-sky-900"
                      >
                        {sub.Description}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
      </nav>

      {/* Footer */}
      {/* <div className="p-4 border-t border-pink-200 text-sm text-pink-700">
        © 2025 MySite
      </div> */}
    </aside>
    </div>
  );
}
