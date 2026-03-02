import api from "../../../API/api.js";
import { Link } from "react-router-dom";
import { getSectionContents } from "../../../API/ContentManagement/CM_Repository";
import { getUserList} from "../../../API/ContentManagement/Maintenance_Repository";
import { getImageList} from "../../../API/ContentManagement/Image_Repository";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Glance() {

const [eventCount, setEventsCount] = useState(0);
const [newsCount, setNewsCount] = useState(0);
const [userCount, setUserCount] = useState(0);
const [imageCount, setImageCount] = useState(0);
const [loading, setLoading] = useState(false);

useEffect(() => {
  const fetchEvents = async () => {
    try {
      const res = await getSectionContents("EVENTS_MAIN");
      
      const bullets = res?.Bullets ?? [];
      const images = res?.Images ?? [];
      
      // Count only items where both bullet and image exist at same index
      let count = 0;
      const maxLength = Math.max(bullets.length, images.length);
      
      for (let i = 0; i < maxLength; i++) {
        if (bullets[i] && images[i]) {
          count++;
        }
      }
      
      console.log("Paired items count:", count);
      setEventsCount(count);
      
    } catch (error) {
      console.error("❌ Failed to load sections:", error);
      setEventsCount(0);
    } finally {
      setLoading(false);
    }
  };

  fetchEvents();
}, []);

useEffect(() => {
  const fetchImages = async () => {
    try {
      setLoading(true);
      const res = await getImageList("");
      console.log("✅ Image data:", res);
      
      const imgData = res.Images || [];
      setImageCount(imgData.length);
      
      console.log("User count:", imgData.length);
    } catch (error) {
      setError("Failed to load user data. Please try again.");
      console.error("❌ Failed to load user data:", error);
      setUserCount(0);
    } finally {
      setLoading(false);
    }
  };
  fetchImages();
}, []);

useEffect(() => {
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await getUserList("");
      console.log("✅ User data:", res);
      
      const userData = res.CM_USER || [];
      setUserCount(userData.length);
      
      console.log("User count:", userData.length);
    } catch (error) {
      setError("Failed to load user data. Please try again.");
      console.error("❌ Failed to load user data:", error);
      setUserCount(0);
    } finally {
      setLoading(false);
    }
  };
  fetchUsers();
}, []);
useEffect(() => {
  const fetchNews = async () => {
    try {
      const res = await getSectionContents("NEWS_MAIN");
      
      const bullets = res?.Bullets ?? [];
      const images = res?.Images ?? [];
      
      // Count only items where both bullet and image exist at same index
      let count = 0;
      const maxLength = Math.max(bullets.length, images.length);
      
      for (let i = 0; i < maxLength; i++) {
        if (bullets[i] && images[i]) {
          count++;
        }
      }
      
      console.log("Paired items count:", count);
      setNewsCount(count);
      
    } catch (error) {
      console.error("❌ Failed to load sections:", error);
      setNewsCount(0);
    } finally {
      setLoading(false);
    }
  };

  fetchNews();
}, []);


  return (
 <div className="flex flex-col p-4 w-full">
  <div className="text-2xl font-bold text-gray-700 mb-6">At A Glance</div>
  
  <div className="flex flex-col gap-4">
    {/* First Row */}
    <div className="flex flex-row">
      <div className="flex-1 flex items-center gap-3 bg-white">
        <FontAwesomeIcon icon="newspaper"  className="mr-2 text-sky-800" />
          <a href="" className=" text-sky-900">{newsCount} News</a> 
      </div>
      
      <div className="flex-1 flex items-center gap-3  bg-white ">
        <FontAwesomeIcon icon="user"  className="mr-2 text-sky-800" />
          <div className=" text-sky-900">{userCount}</div>
          <div className=" text-sky-900">Users</div>
      </div>
    </div>
    
    {/* Second Row */}
    <div className="flex flex-row">
      <div className="flex-1 flex items-center gap-3 bg-white">
        <FontAwesomeIcon icon="calendar"  className="mr-2 text-sky-800" />
           <a href="" className=" text-sky-900">{eventCount} Events</a>
      </div>
      
      <div className="flex-1 flex items-center gap-3 bg-white">
        <FontAwesomeIcon icon="image"  className="mr-2 text-sky-800" />
           <a href="" className=" text-sky-900">{imageCount} Images</a>
      </div>
    </div>
  </div>
</div>
) 
}