import { createCrudStorage } from "./crudStorage";

const initialUsers = [
  {
    id: 1,
    user: "Super Admin",
    userId: "SA001",
    department: "Manajemen",
    role: "Super Admin",
  },
  {
    id: 2,
    user: "Admin Utama",
    userId: "AD001",
    department: "IT",
    role: "Admin",
  },
  {
    id: 3,
    user: "Karyawan A",
    userId: "KY001",
    department: "Pelayanan",
    role: "Karyawan",
  },
];

const userStorage = createCrudStorage({
  storageKey: "rsabl_users",
  initialData: initialUsers,
});

export const getData = async () => userStorage.getData();

export const saveData = async (data) => userStorage.saveData(data);

export const addItem = async (userData) => userStorage.addItem(userData);

export const updateItem = async (id, userData) =>
  userStorage.updateItem(id, userData);

export const deleteItem = async (id) => userStorage.deleteItem(id);

export const getAllUsers = getData;
export const createUser = addItem;
export const updateUser = updateItem;
export const deleteUser = deleteItem;
