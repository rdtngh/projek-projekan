import api from "./api";

const DEFAULT_TRAINING_ID = 1;

const mapMaterialFromApi = (m) => ({
  id: m.id,
  title: m.title,
  description: m.description,
  speaker: m.speaker,
  order_number: m.order_number,
  files: m.files || [],
  fileName: m.files?.[0]?.file_name || "",
  fileType: m.files?.[0]?.file_type || "",
});

export const getAllMaterials = async () => {
  // fetch materials for default training
  const res = await api.get(`/trainings/${DEFAULT_TRAINING_ID}/materials`);
  return (res.data?.data || []).map(mapMaterialFromApi);
};

export const createMaterial = async (materialData) => {
  const fd = new FormData();
  fd.append("title", materialData.title);
  fd.append("training_id", materialData.training_id || DEFAULT_TRAINING_ID);
  if (materialData.description) fd.append("description", materialData.description);

  if (materialData.file) {
    fd.append("files[]", materialData.file, materialData.fileName || materialData.file.name);
  }

  const res = await api.post("/materials", fd);
  return mapMaterialFromApi(res.data.data);
};

export const createMaterialsBulk = async (materialData) => {
  const fd = new FormData();
  fd.append("training_id", materialData.training_id || DEFAULT_TRAINING_ID);

  materialData.items.forEach((item) => {
    fd.append("titles[]", item.title);
    fd.append("files[]", item.file, item.fileName || item.file.name);
  });

  const res = await api.post("/materials/bulk", fd);
  return (res.data?.data || []).map(mapMaterialFromApi);
};

export const updateMaterial = async (id, materialData) => {
  const fd = new FormData();
  if (materialData.title) fd.append("title", materialData.title);
  if (materialData.description) fd.append("description", materialData.description);
  if (materialData.file) {
    fd.append("files[]", materialData.file, materialData.fileName || materialData.file.name);
  }

  fd.append("_method", "PUT");

  const res = await api.post(`/materials/${id}`, fd);
  return mapMaterialFromApi(res.data.data);
};

export const deleteMaterial = async (id) => {
  await api.delete(`/materials/${id}`);
  return true;
};
