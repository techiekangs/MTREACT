import Actions from "../Dashboard/Actions";
import Events from "../Dashboard/Events";
import News from "../Dashboard/News";
import Glance from "../Dashboard/Glance";

export default function Dashboard() {
  return (
    <div className="flex flex-col w-full">
      <div className="flex w-full bg-white mt-4 rounded-md shadow-md">
        <Actions />
      </div>
      <div className="flex gap-2 w-full mt-4">
        <div className="flex flex-col gap-2 flex-1 mr-2">
          <div className="flex w-full bg-white mb-2 rounded-md shadow-md">
            <Glance />
          </div>
          <div className="flex w-full bg-white rounded-md shadow-md">
            <Events />
          </div>
        </div>
        <div className="flex flex-1 bg-white rounded-md shadow-md">
          <News />
        </div>
      </div>
    </div>
  );
}