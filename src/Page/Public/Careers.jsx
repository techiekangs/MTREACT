import { getSectionDetails } from "../../API/ContentManagement/CM_Repository";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MapPin, Briefcase, Building2 } from "lucide-react";
import CAREER_img from "../../Components/Images/Shared goals-rafiki.png";

export default function Career() {

  const locationState = useLocation();
  const { categoryID } = locationState.state || {};

  /* 🌸 DATA */
  const [originalData, setOriginalData] = useState({
    details: [],
    bullets: [],
  });

  /* 🌼 FILTER STATE */
  const [searchTerm, setSearchTerm] = useState("");
  const [employmentFilter, setEmploymentFilter] = useState([]);
  const [departmentFilter, setDepartmentFilter] = useState([]);
  const [locationFilter, setLocationFilter] = useState([]);

  const [sortBy, setSortBy] = useState("title");

  /* 🌷 DROPDOWN OPEN STATE */
  const [openFilter, setOpenFilter] = useState(null);



  /* 🌸 FETCH */
  useEffect(() => {

    const fetchData = async () => {

      const res = await getSectionDetails("CAREER_MAIN");

      setOriginalData({
        details: res?.Details ?? [],
        bullets: res?.Bullets ?? [],
      });

    };

    fetchData();

  }, [categoryID]);



  /* 🌼 MERGE JOB DATA */
  const jobs = originalData.details.slice(1).map((detail, i) => {

    const bullet = originalData.bullets[i + 1] || {};

    return {

      employmentType: detail.Header,
      title: detail.Title,
      description: detail.Content,
      department: bullet.Header || "",

      locations:
        (bullet.Detail || "")
          .split(",")
          .map(l => l.trim())
          .filter(Boolean)

    };

  });



  /* 🌷 UNIQUE FILTER VALUES */
  const employmentTypes = [
    ...new Set(jobs.map((j) => j.employmentType?.toLowerCase().trim()))
  ]
    .filter(Boolean)
    .map((t) => t.replace(/\b\w/g, (c) => c.toUpperCase()));

  const departments =
    [...new Set(jobs.map(j => j.department))];

  const locations =
    [...new Set(
      jobs.flatMap(j => j.locations)
    )];



  /* 🌸 CLEAR FILTER */
  const clearFilters = () => {

    setEmploymentFilter([]);
    setDepartmentFilter([]);
    setLocationFilter([]);
    setSearchTerm("");

  };



  /* 🌼 FILTER LOGIC */
  let filteredJobs = jobs.filter((job => {

    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.locations.join(" ").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesEmployment =
      employmentFilter.length === 0 ||
      employmentFilter.includes(job.employmentType?.toLowerCase().trim());

    const matchesDepartment =
      departmentFilter.length === 0 ||
      departmentFilter.includes(job.department);

    const matchesLocation =
      locationFilter.length === 0 ||
      job.locations.some(loc =>
        locationFilter.includes(loc)
      );

    return (
      matchesSearch &&
      matchesEmployment &&
      matchesDepartment &&
      matchesLocation
    );

  }));



  /* 🌷 SORT */
  filteredJobs.sort((a, b) => {

    if (sortBy === "title")
      return a.title.localeCompare(b.title);

    if (sortBy === "department")
      return a.department.localeCompare(b.department);

    return 0;

  });



  /* 🌸 CHECKBOX HANDLER */
  const toggleCheckbox = (value, list, setList) => {

    if (list.includes(value))
      setList(list.filter(v => v !== value));
    else
      setList([...list, value]);

  };



  /* 🌼 FILTER DROPDOWN COMPONENT */
  const FilterDropdown = ({ title, values, selected, setSelected }) => (

    <div className="border rounded-lg">

      <button
        onClick={() =>
          setOpenFilter(openFilter === title ? null : title)
        }
        className="w-full text-left px-4 py-2 font-semibold bg-gray-50"
      >
        {title}
      </button>


      {openFilter === title && (

        <div className="p-3 space-y-1">

          {values.map(val => (

            <label key={val} className="flex gap-2">

              <input
                type="checkbox"
                checked={selected.includes(val)}
                onChange={() =>
                  toggleCheckbox(val, selected, setSelected)
                }
              />

              {val}

            </label>

          ))}

        </div>

      )}

    </div>

  );



  return (
    <div>


      {/* 🌸 HERO */}
      <div className="relative pt-24 px-50 py-10 flex items-center justify-between bg-purple-200">

        {/* 🌸 LEFT SIDE - TEXT */}
        <div className="max-w-l">
          <h4 className="text-xl font-semibold text-pink-700">
            {originalData?.details?.[0]?.Header}
          </h4>


          <h1 className="text-5xl font-bold text-gray-800 max-w-3xl">
            {originalData?.details?.[0]?.Title
              ?.toLowerCase()
              .replace(/\b\w/g, (char) => char.toUpperCase())}
          </h1>

          <p className="mt-4 text-gray-700 text-xl font-medium max-w-2xl">
            {originalData?.details?.[0]?.Content}
          </p>
          <div className="mt-6">
            {/* <input
    type="text"
    placeholder="Search questions or answers..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full max-w-md px-4 py-3 border border-pink-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400"
  /> */}
          </div>
        </div>

        <div className="flex justify-end">
          <img
            src={CAREER_img}
            alt="Career"
            className="w-[480px] object-cover"
          />
        </div>

      </div>



      {/* 🌼 MAIN */}
      <div className="px-50 py-16">

        <div className="grid grid-cols-3 gap-12">


          {/* 🌷 FILTERS */}
          <div className="space-y-4">

            <div className="flex justify-between">

              <h2 className="font-bold text-xl">
                Filters
              </h2>

              <button
                onClick={clearFilters}
                className="text-pink-600 text-sm"
              >
                Clear
              </button>

            </div>


            <FilterDropdown
              title="Employment Type"
              values={employmentTypes}
              selected={employmentFilter}
              setSelected={setEmploymentFilter}
            />


            <FilterDropdown
              title="Department"
              values={departments}
              selected={departmentFilter}
              setSelected={setDepartmentFilter}
            />


            <FilterDropdown
              title="Location"
              values={locations}
              selected={locationFilter}
              setSelected={setLocationFilter}
            />


          </div>



          {/* 🌸 JOB LIST */}
          <div className="col-span-2">


            {/* Search + Sort */}
            <div className="flex gap-4 mb-6">

              <input
                type="text"
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={e =>
                  setSearchTerm(e.target.value)
                }
                className="w-full px-4 py-2 border rounded-lg"
              />


              <select
                value={sortBy}
                onChange={e =>
                  setSortBy(e.target.value)
                }
                className="px-4 py-2 border rounded-lg"
              >
                <option value="title">
                  Sort by Title
                </option>

                <option value="department">
                  Sort by Department
                </option>

              </select>

            </div>



            {/* JOB CARDS */}
            <div className="space-y-6">

              {filteredJobs.map((job, i) => (

                <div
                  key={i}
                  className="border rounded-xl p-6"
                >

                  <h3 className="text-xl font-bold">
                    {job.title}
                  </h3>


                  <div className="flex gap-6 text-gray-600 mt-2">

                    <div className="flex gap-1 items-center">
                      <Briefcase size={16} />
                      {job.employmentType}
                    </div>


                    <div className="flex gap-1 items-center">
                      <Building2 size={16} />
                      {job.department}
                    </div>


                    <div className="flex gap-1 items-center">
                      <MapPin size={16} />
                      {job.locations.join(", ")}
                    </div>

                  </div>


                  <p className="mt-4 text-gray-700">
                    {job.description}
                  </p>


                  <button className="mt-4 px-4 py-2 bg-pink-500 text-white rounded-lg">
                    Apply Now
                  </button>


                </div>

              ))}


              {filteredJobs.length === 0 && (

                <div>No jobs found.</div>

              )}

            </div>


          </div>


        </div>

      </div>


    </div>
  );

}