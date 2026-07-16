import api from "./api";

const unwrap = (response) => response.data?.data ?? response.data;

export const getStatistics = async (role) => {
  const response = await api.get("/statistics");

  return {
    ...unwrap(response),
    role,
  };
};

// Kontrak export disiapkan di service; backend yang membentuk isi file statistik.
export const exportStatistics = async (format = "spss") => ({
  blob: new Blob(["Dummy export statistik dari backend."], { type: "text/plain" }),
  filename: `statistik-${format}-dummy.txt`,
});
