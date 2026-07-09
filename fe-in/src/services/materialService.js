import { createCrudStorage } from "./crudStorage";
import { deleteFile, getFile, saveFile } from "./fileStorage";

const materialStorage = createCrudStorage({
  storageKey: "rsabl_materials",
  initialData: [],
});

const buildFileStorageKey = (id) => `material-${id}`;

const splitMaterialPayload = (materialData) => {
  const { fileData, fileType, fileName, ...metadata } = materialData;

  return {
    metadata: {
      ...metadata,
      fileName,
      fileType,
    },
    filePayload: fileData
      ? {
          fileData,
          fileType,
          fileName,
        }
      : null,
  };
};

const mergeStoredFile = async (material) => {
  if (!material.fileStorageKey) return material;

  try {
    const storedFile = await getFile(material.fileStorageKey);
    return {
      ...material,
      fileData: storedFile?.fileData || "",
      fileType: storedFile?.fileType || material.fileType || "",
      fileName: storedFile?.fileName || material.fileName || "",
    };
  } catch (error) {
    return {
      ...material,
      fileData: "",
    };
  }
};

export const getData = async () => {
  const materials = materialStorage.getData();
  return Promise.all(materials.map(mergeStoredFile));
};

export const saveData = async (data) => materialStorage.saveData(data);

export const addItem = async (materialData) => {
  const { metadata, filePayload } = splitMaterialPayload(materialData);
  const createdMaterial = materialStorage.addItem({
    ...metadata,
    fileStorageKey: null,
  });

  if (!filePayload) return createdMaterial;

  const fileStorageKey = buildFileStorageKey(createdMaterial.id);
  await saveFile(fileStorageKey, filePayload);

  const updatedMaterial = materialStorage.updateItem(createdMaterial.id, {
    ...createdMaterial,
    fileStorageKey,
  });

  return {
    ...updatedMaterial,
    ...filePayload,
  };
};

export const updateItem = async (id, materialData) => {
  const { metadata, filePayload } = splitMaterialPayload(materialData);
  const currentMaterial = materialStorage.getData().find((item) => item.id === id);

  if (!currentMaterial) {
    throw new Error("Material not found");
  }

  let fileStorageKey = currentMaterial.fileStorageKey;

  if (filePayload) {
    fileStorageKey = fileStorageKey || buildFileStorageKey(id);
    await saveFile(fileStorageKey, filePayload);
  }

  return materialStorage.updateItem(id, {
    ...currentMaterial,
    ...metadata,
    fileStorageKey,
  });
};

export const deleteItem = async (id) => {
  const currentMaterial = materialStorage.getData().find((item) => item.id === id);

  if (currentMaterial?.fileStorageKey) {
    await deleteFile(currentMaterial.fileStorageKey);
  }

  return materialStorage.deleteItem(id);
};

export const getAllMaterials = getData;
export const createMaterial = addItem;
export const updateMaterial = updateItem;
export const deleteMaterial = deleteItem;
