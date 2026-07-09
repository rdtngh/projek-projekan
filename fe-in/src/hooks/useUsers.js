import { useCallback, useState } from "react";
import * as userService from "../services/userService";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await userService.getAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error loading users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addUser = useCallback(
    async (formData) => {
      setLoading(true);
      try {
        await userService.createUser(formData);
        await loadUsers();
        return true;
      } catch (error) {
        console.error("Error adding user:", error);
        return error.response?.data?.message || "Gagal menambahkan pengguna.";
      } finally {
        setLoading(false);
      }
    },
    [loadUsers]
  );

  const updateUser = useCallback(
    async (id, formData) => {
      setLoading(true);
      try {
        await userService.updateUser(id, formData);
        await loadUsers();
        return true;
      } catch (error) {
        console.error("Error updating user:", error);
        return error.response?.data?.message || "Gagal memperbarui pengguna.";
      } finally {
        setLoading(false);
      }
    },
    [loadUsers]
  );

  const deleteUser = useCallback(
    async (id) => {
      setLoading(true);
      try {
        await userService.deleteUser(id);
        await loadUsers();
        return true;
      } catch (error) {
        console.error("Error deleting user:", error);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [loadUsers]
  );

  return {
    users,
    loading,
    loadUsers,
    addUser,
    updateUser,
    deleteUser,
  };
};
