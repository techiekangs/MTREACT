import api from "../api";

export const getImageList = async (categoryId) => {
  const response = await api.get("ContentManagement/Gallery/Images", {
    params: { CategoryId: categoryId},
    headers: {
      Authorization: "bearer " + localStorage.getItem("token"),
      IpAddress: "::1",
      AppName: "MT",
    },
  });

  
  return response.data;
};
export const deleteImage = async (imageData) => {
  const response = await api.post(
    "MTBooking/Delete/Images",
    {
      CATEGORY_ID: imageData.CATEGORY_ID,
      CONTENT_ID: imageData.CONTENT_ID,
      IMAGE_URL: imageData.IMG_URL,
      UPLOAD_DATE: imageData.Upload_Date,
      UPLOAD_BY: imageData.Upload_By,
      FILE_NAME: imageData.FILE_NAME,
      FILE_TYPE: imageData.FILE_TYPE,
      FILE_SIZE: imageData.FILE_SIZE,
      FILE_BYTE: imageData.FILE_BYTE
    },
    {
      headers: {
        Authorization: "bearer " + localStorage.getItem("token"),
        IpAddress: "::1",
        AppName: "MT",
      },
    }
  );
  
  return response.data;
};