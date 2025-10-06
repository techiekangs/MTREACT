import { useLocation } from "react-router-dom";
import EditContent from "./EditContent";

export default function AboutMain() {
  const location = useLocation();
  const { layoutStyle } = location.state || {};
  const { sectionID } = location.state || {};
  return (
    <div className="">
      <EditContent category={sectionID} layoutStyle={layoutStyle} />
    </div>
  );
}