const memoryStore = {};

const cloneData = (data) => JSON.parse(JSON.stringify(data));

const canUseLocalStorage = () =>
  typeof window !== "undefined" && typeof window.localStorage !== "undefined";

const readStorage = (storageKey, defaultData) => {
  if (!canUseLocalStorage()) {
    if (!memoryStore[storageKey]) {
      memoryStore[storageKey] = cloneData(defaultData);
    }
    return cloneData(memoryStore[storageKey]);
  }

  const storedValue = window.localStorage.getItem(storageKey);
  if (!storedValue) {
    window.localStorage.setItem(storageKey, JSON.stringify(defaultData));
    return cloneData(defaultData);
  }

  try {
    return JSON.parse(storedValue);
  } catch {
    window.localStorage.setItem(storageKey, JSON.stringify(defaultData));
    return cloneData(defaultData);
  }
};

const writeStorage = (storageKey, data) => {
  if (!canUseLocalStorage()) {
    memoryStore[storageKey] = cloneData(data);
    return cloneData(data);
  }

  window.localStorage.setItem(storageKey, JSON.stringify(data));
  return cloneData(data);
};

const getNextId = (items) =>
  Math.max(...items.map((item) => Number(item.id) || 0), 0) + 1;

export const createCrudStorage = ({ storageKey, initialData = [] }) => {
  const getData = () => readStorage(storageKey, initialData);

  const saveData = (data) => writeStorage(storageKey, data);

  const addItem = (payload) => {
    const data = getData();
    const newItem = {
      id: payload.id ?? getNextId(data),
      ...payload,
    };

    saveData([...data, newItem]);
    return cloneData(newItem);
  };

  const updateItem = (id, payload) => {
    const data = getData();
    const itemExists = data.some((item) => item.id === id);

    if (!itemExists) {
      throw new Error("Item not found");
    }

    const updatedData = data.map((item) =>
      item.id === id ? { ...item, ...payload, id } : item
    );
    saveData(updatedData);

    return cloneData(updatedData.find((item) => item.id === id));
  };

  const deleteItem = (id) => {
    const data = getData();
    const itemExists = data.some((item) => item.id === id);

    if (!itemExists) {
      throw new Error("Item not found");
    }

    saveData(data.filter((item) => item.id !== id));
    return true;
  };

  return {
    getData,
    saveData,
    addItem,
    updateItem,
    deleteItem,
  };
};
