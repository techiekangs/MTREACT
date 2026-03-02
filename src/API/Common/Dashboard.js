import api from "../api";

export const getSectionDetails = async (categoryId) => {
  const response = await api.get("ContentManagement/Detail/List/Quote", {
    params: { CategoryId: categoryId },
    headers: {
      Authorization: "bearer " + localStorage.getItem("token"),
      IpAddress: "::1",
      AppName: "MT",
    },
  });
  console.log("response data:", response.data)
  return response.data;
};
