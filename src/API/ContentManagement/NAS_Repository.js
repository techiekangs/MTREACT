import api from "../api";

export const fetchFTPImage = async (filePath, fileName) => {
  const response = await api.get("NAS/RetrieveImage", {
    params: { FILE_PATH: filePath, FILE_NAME: fileName },
    headers: {
      Authorization: "bearer " + localStorage.getItem("token"),
      IpAddress: "::1",
      AppName: "MT",
    },
  });

  const base64Url = `data:image/png;base64,${response.data.base64}`;
  return base64Url;
};
