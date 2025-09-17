import Dashboard  from "../Dashboard/Main"
import { Outlet } from "react-router-dom";

export default function Index({isCollapsed}) {
  return (
    <div className="bg-sky-100 flex flex-col flex-1 p-7">
      <Outlet />
    </div>
    )
}