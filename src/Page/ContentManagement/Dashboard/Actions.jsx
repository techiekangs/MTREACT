import { useState, useEffect } from 'react';
import api from "../../../API/api.js";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Actions() {
  const [sections, setSections] = useState([]);
  const [permission, setPerm] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user?.Username;
  const userId = user?.User_ID;
  const [currentTime, setCurrentTime] = useState(new Date());

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentTime(new Date());
  //   }, 1000);

  //   return () => clearInterval(timer);
  // }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await api.get("/ContentManagement/Detail/Sections", {
          params: { SectionId: '' },
          headers: {
            Authorization: "bearer " + localStorage.getItem("token"),
            IpAddress: "::1",
            AppName: "MT",
          },
        });

        // ✅ Pick only the Sections array
        setSections(Array.isArray(response.data.Sections) ? response.data.Sections : []);
        console.log("✅ Sections loaded:", response.data.Sections);
      } catch (error) {
        console.error("❌ Failed to load sections:", error);
      }
    };

    fetchSections();
  }, []);
  console.log(user);
  useEffect(() => {
    const fetchPermission = async () => {
      try {
        const response = await api.get("/Users/Maintenance/ContentList", {
          params: { UserId: userId },
          headers: {
            Authorization: "bearer " + localStorage.getItem("token"),
            IpAddress: "::1",
            AppName: "MT",
          },
        });

        console.log("✅ pERMISSIONS loaded:", response.data.List);
        setPerm(Array.isArray(response.data.List) ? response.data.List : []);
      } catch (error) {
        console.error("❌ Failed to load sections:", error);
      }
    };

    fetchPermission();
  }, []);


  // 🌺 Merge filteredSections with permissions
  const mergedSections = sections.map((sec) => {
    // Find the permission object that matches this section's CONTENT_ID
    const perm = permission.find((p) => p.Title === sec.Title);

    return {
      ...sec,
      allowed: perm ? perm.Allowed : false   // set allowed flag
    };
  });
  const allowedSections = mergedSections.filter(sec => sec.allowed);
  console.log("allowedSections:", allowedSections);
  const recentSections = allowedSections
    .sort((a, b) => new Date(b.LastModified) - new Date(a.LastModified))
    .slice(0, 3);

  console.log("recent:", recentSections);
  return (

    <div className="flex flex-col p-5  w-full text-gray-700">
      <div className="">
        <p className="text-3xl font-bold text-sky-700">Welcome, {username}!</p>
        {/* <p>{formatDate(currentTime)} {formatTime(currentTime)}</p> */}
      </div>
      <div className="flex flex-row mt-4">
        <div className="basis-1/3"><p className="text-xl font-bold text-sky-850">Recent Updated</p>
          <ul>
            {recentSections.map((section) => (
              <li key={section.SECTION_ID} className="text-sky-800">
                ⮞  <Link
                  to={`/ContentManagement/Pages/Editor/${section.Title
                    .trim()
                    .replace(/\s+/g, '-')
                    .replace(/[^\w-]/g, '')
                    .toLowerCase()}`}
                  state={{ layoutStyle: section.LayoutStyle, sectionID: section.SECTION_ID }}
                  className="text-sky-800 hover:underline transition-colors"
                >
                  {section.Title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="basis-1/3"><p className="text-xl font-bold text-sky-850">Quick Actions</p>
          <ul>
            <li>
               <FontAwesomeIcon icon="table-columns"  className="mr-2 text-sky-800" /><Link className="text-sky-800 hover:underline transition-colors">View Sections</Link>
            </li>
            <li>
              <FontAwesomeIcon icon="upload"  className="mr-2 text-sky-800" /><Link className="text-sky-800 hover:underline transition-colors">Upload Files</Link>
            </li>
            <li>
              <FontAwesomeIcon icon="user-plus"  className="mr-2 text-sky-800" /><Link className="text-sky-800 hover:underline transition-colors">Add Users</Link>
            </li>
          </ul>
        </div>
        <div className="basis-1/3"><p className="text-xl font-bold text-sky-850">More Actions</p>
          <ul>
            <li>
              <FontAwesomeIcon icon="users"  className="mr-2 text-sky-800" /><Link className="text-sky-800 hover:underline transition-colors">View Users</Link>
            </li>
            <li>
              <FontAwesomeIcon icon="key"  className="mr-2 text-sky-800" /><Link className="text-sky-800 hover:underline transition-colors">Change Password</Link>
            </li>
            <li>
              <FontAwesomeIcon icon="images"  className="mr-2 text-sky-800" /><Link className="text-sky-800 hover:underline transition-colors">Media Library</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}