import { createCrudStorage } from "./crudStorage";

const materialStorage = createCrudStorage({
  storageKey: "rsabl_materials",
  initialData: [],
});

export const getData = async () => materialStorage.getData();

export const saveData = async (data) => materialStorage.saveData(data);

export const addItem = async (materialData) =>
  materialStorage.addItem(materialData);

export const updateItem = async (id, materialData) =>
  materialStorage.updateItem(id, materialData);

export const deleteItem = async (id) => materialStorage.deleteItem(id);

export const getAllMaterials = getData;
export const createMaterial = addItem;
export const updateMaterial = updateItem;
export const deleteMaterial = deleteItem;
