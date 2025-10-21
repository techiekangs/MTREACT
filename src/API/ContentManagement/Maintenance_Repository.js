import api from "../api";

export const getRoleList = async (roleId) => {
  const response = await api.get("Role/Detail/List", {
    params: { RoleId: roleId },
    headers: {
      Authorization: "bearer " + localStorage.getItem("token"),
      IpAddress: "::1",
      AppName: "MT",
    },
  });
  console.log("response data:", response.data);
  return response.data;
};

export const getUserList = async (userId) => {
  const response = await api.get("Users/Maintenance/List", {
    params: { UserId: userId },
    headers: {
      Authorization: "bearer " + localStorage.getItem("token"),
      IpAddress: "::1",
      AppName: "MT",
    },
  });
  console.log("response data:", response.data);
  return response.data;
};

export const getContentList = async (userId) => {
  const response = await api.get("Users/Maintenance/ContentList", {
    params: { UserId: userId },
    headers: {
      Authorization: "bearer " + localStorage.getItem("token"),
      IpAddress: "::1",
      AppName: "MT",
    },
  });
  console.log("response data:", response.data);
  return response.data;
};

export const addPermission = async (employeeNumber, permissionData) => {
  const response = await api.post(
    "Users/Detail/AddUserPermission", 
    permissionData, // <-- this is the request body
    {
      params: { EmployeeNumber: employeeNumber }, // <-- query parameter
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
        IpAddress: "::1",
        AppName: "MT",
      },
    }
  );

  console.log("response data:", response.data);
  return response.data;
};
