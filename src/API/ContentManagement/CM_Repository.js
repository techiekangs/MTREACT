import api from "../api"; // your axios instance

// Fetch details by category
export const getSection = async (sectionId) => {
  const response = await api.get("/ContentManagement/Detail/Sections", {
    params: { SectionId: sectionId },
    headers: {
      Authorization: "bearer " + localStorage.getItem("token"),
      IpAddress: "::1",
      AppName: "MT",
    },
  });
  console.log("response data:", response.data)
  return response.data;
};

// Fetch details by category
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
export const getContacts = async (categoryId) => {
  const response = await api.get("ContentManagement/Detail/List/Contacts", {
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
export const getSectionContents= async (categoryId) => {
  const response = await api.get("ContentManagement/Detail/List/SectionContents", {
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
// Save details
export const saveSectionDetails = async (payload) => {
  console.log("data payload:", payload);

  if (!payload || payload.length === 0) return null;

  const headers = {
    Authorization: "bearer " + localStorage.getItem("token"),
    IpAddress: "::1",
    AppName: "MT",
  };

  const results = [];

  for (const item of payload) {
    let response;

    // 🔹 Case 1: Deleted detail
    if (item.isDeleted) {
      response = await api.post(
        "MTBooking/Delete/SectionDetails",
        {
          CATEGORY_ID: item.CATEGORY_ID,
          Title: item.Title,
          Content: item.Content,
          IMG_URL: item.IMG_URL,
          Effectivity_Date: item.Effectivity_Date,
          Expiration_Date: item.Expiration_Date,
          CONTENT_ID: item.CONTENT_ID,
          Header: item.Header,
        },
        { headers }
      );
    }

    // 🔹 Case 2: New detail (insert)
    else if (!item.CONTENT_ID || item.CONTENT_ID === 0) {
      response = await api.post(
        "MTBooking/Insert/SectionDetails",
        {
          CATEGORY_ID: item.CATEGORY_ID,
          Title: item.Title,
          Content: item.Content,
          IMG_URL: item.IMG_URL,
          Effectivity_Date: item.Effectivity_Date,
          Expiration_Date: item.Expiration_Date,
          CONTENT_ID: item.CONTENT_ID ?? 0,
          Header: item.Header,
        },
        { headers }
      );
    }

    // 🔹 Case 3: Update existing detail
    else {
      response = await api.post(
        "MTBooking/Update/SectionDetails",
        {
          CATEGORY_ID: item.CATEGORY_ID,
          Title: item.Title,
          Content: item.Content,
          IMG_URL: item.IMG_URL,
          Effectivity_Date: item.Effectivity_Date,
          Expiration_Date: item.Expiration_Date,
          CONTENT_ID: item.CONTENT_ID,
          Header: item.Header,
        },
        { headers }
      );
    }

    results.push(response.data);
  }

  return results;
};
export const saveContacts = async (payload) => {
  console.log("data payload:", payload);

  if (!payload || payload.length === 0) return null;

  const headers = {
    Authorization: "bearer " + localStorage.getItem("token"),
    IpAddress: "::1",
    AppName: "MT",
  };

  const results = [];


    let response;


      response = await api.post(
        "MTBooking/Update/Contacts",
        {
          Contact_No: payload.Contact_No,
          Tel_No: payload.Tel_No,
          Address: payload.Address,
          Location: payload.Location,
          Email: payload.Email,
          Schedule1: payload.Schedule1,
          Schedule2: payload.Schedule2,
          Schedule3: payload.Schedule3,
          CATEGORY_ID: payload.CATEGORY_ID,
        },
        { headers }
      );

    results.push(response.data);
  

  return results;
};
export const saveLayoutStyle = async (categoryId, layoutStyle) => {
  console.log("data layout:", { SectionId: categoryId, LayoutStyle: layoutStyle });

  const response = await api.post(
    "/Section/LayoutStyle",
    { 
      SectionId: categoryId, 
      LayoutStyle: layoutStyle 
    }, // 👈 send as body
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


export const saveBullets = async (payload) => {
  console.log("data payload:", payload);

  if (!payload || payload.length === 0) return null;

  const headers = {
    Authorization: "bearer " + localStorage.getItem("token"),
    IpAddress: "::1",
    AppName: "MT",
  };

  const results = [];

  for (const item of payload) {
    let response;

    // 🔹 Case 1: Deleted
    if (item.isDeleted) {
      response = await api.post(
        "MTBooking/Delete/Bullets",
        {
          CATEGORY_ID: item.CATEGORY_ID,
          HEADER: item.Header,
          DETAIL: item.Detail,
          CONTENT_ID: item.CONTENT_ID,
        },
        { headers }
      );
    }
    // 🔹 Case 2: New bullet (insert)
    else if (!item.CONTENT_ID || item.CONTENT_ID === 0) {
      response = await api.post(
        "MTBooking/Insert/Bullets",
        {
          CATEGORY_ID: item.CATEGORY_ID,
          HEADER: item.Header,
          DETAIL: item.Detail,
          Effectivity_Date: item.Effectivity_Date,
          Expiration_Date: item.Expiration_Date,
          Show_Date: item.Show_Date,
          CONTENT_ID: item.CONTENT_ID ?? 0,
        },
        { headers }
      );
    }
    // 🔹 Case 3: Update existing bullet
    else {
      response = await api.post(
        "MTBooking/Update/Bullets",
        {
          CATEGORY_ID: item.CATEGORY_ID,
          HEADER: item.Header,
          DETAIL: item.Detail,
          Effectivity_Date: item.Effectivity_Date,
          Expiration_Date: item.Expiration_Date,
          Show_Date: item.Show_Date,
          CONTENT_ID: item.CONTENT_ID,
        },
        { headers }
      );
    }

    results.push(response.data);
  }

  return results;
};


export const saveImages = async (payload) => {
  console.log("image payload:", payload);

  if (!payload || payload.length === 0) return null;

  const headers = {
    Authorization: "bearer " + localStorage.getItem("token"),
    IpAddress: "::1",
    AppName: "MT",
  };

  const results = [];

  for (const item of payload) {
    let response;

    // 🔹 Case 1: Deleted
    if (item.isDeleted) {
      response = await api.post(
        "MTBooking/Delete/Images",
        {
          CATEGORY_ID: item.CATEGORY_ID,
          IMAGE_URL: item.IMAGE_URL,
          UPLOAD_DATE: item.Upload_Date,
          UPLOAD_BY: item.Upload_By,
          CONTENT_ID: item.CONTENT_ID,
          FILE_NAME: item.FILE_NAME,
          FILE_TYPE: item.FILE_TYPE,
          FILE_SIZE: item.FILE_SIZE,
          FILE_BYTE: item.FILE_BYTE
        },
        { headers }
      );
    }
    // 🔹 Case 2: New image (insert)
    else if (!item.CONTENT_ID || item.CONTENT_ID === 0) {
      response = await api.post(
        "MTBooking/Insert/Images",
        {
          CATEGORY_ID: item.CATEGORY_ID,
          IMAGE_URL: item.IMAGE_URL,
          UPLOAD_DATE: item.Upload_Date,
          UPLOAD_BY: item.Upload_By,
          CONTENT_ID: item.CONTENT_ID ?? 0,
          FILE_NAME: item.FILE_NAME,
          FILE_TYPE: item.FILE_TYPE,
          FILE_SIZE: item.FILE_SIZE,
          FILE_BYTE: item.FILE_BYTE
        },
        { headers }
      );
    }
    // 🔹 Case 3: Update existing image
    else {
      response = await api.post(
        "MTBooking/Update/Images",
        {
          CATEGORY_ID: item.CATEGORY_ID,
          IMAGE_URL: item.IMAGE_URL,
          UPLOAD_DATE: item.Upload_Date,
          UPLOAD_BY: item.Upload_By,
          CONTENT_ID: item.CONTENT_ID,
          FILE_NAME: item.FILE_NAME,
          FILE_TYPE: item.FILE_TYPE,
          FILE_SIZE: item.FILE_SIZE,
          FILE_BYTE: item.FILE_BYTE
        },
        { headers }
      );
    }

    results.push(response.data);
  }

  return results;
};

export const userLogin = async (username, password) => {

  const response = await api.post(
    "Users/Login",
    { 
      Username: username, 
      Password: password 
    }, // 👈 send as body
    {
      headers: {
        IpAddress: "::1",
        AppName: "MT",
      },
    }
  );

  return response.data;
};