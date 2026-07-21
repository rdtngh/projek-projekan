import api from "./api";

const unwrap = (response) => response.data?.data ?? response.data;

export const getStatistics = async (role) => {
  const response = await api.get("/statistics");

  return {
    ...unwrap(response),
    role,
  };
};

export const resetStatistics = async () => {
  const response = await api.post("/statistics/reset");
  return unwrap(response);
};

const filenameFromDisposition = (disposition) => {
  const match = disposition?.match(/filename="?([^"]+)"?/i);
  return match?.[1];
};

export const exportStatistics = async (format = "xlsx") => {
  let response;

  try {
    response = await api.get("/statistics/export", {
      params: { format },
      responseType: "blob",
    });
  } catch (error) {
    const data = error.response?.data;

    if (data instanceof Blob && data.type.includes("application/json")) {
      error.response.data = JSON.parse(await data.text());
    }

    throw error;
  }

  return {
    blob: response.data,
    filename:
      filenameFromDisposition(response.headers["content-disposition"]) ||
      `statistik-${format}.xlsx`,
  };
};
