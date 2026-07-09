import { useCallback, useState } from "react";
import * as materialService from "../services/materialService";

export const useMaterials = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadMaterials = useCallback(async () => {
    setLoading(true);
    try {
      const data = await materialService.getAllMaterials();
      setMaterials(data);
    } catch (error) {
      console.error("Error loading materials:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addMaterial = useCallback(
    async (formData) => {
      setLoading(true);
      try {
        await materialService.createMaterial(formData);
        await loadMaterials();
        return true;
      } catch (error) {
        console.error("Error adding material:", error);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [loadMaterials]
  );

  const updateMaterial = useCallback(
    async (id, formData) => {
      setLoading(true);
      try {
        await materialService.updateMaterial(id, formData);
        await loadMaterials();
        return true;
      } catch (error) {
        console.error("Error updating material:", error);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [loadMaterials]
  );

  const deleteMaterial = useCallback(
    async (id) => {
      setLoading(true);
      try {
        await materialService.deleteMaterial(id);
        await loadMaterials();
        return true;
      } catch (error) {
        console.error("Error deleting material:", error);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [loadMaterials]
  );

  return {
    materials,
    loading,
    loadMaterials,
    addMaterial,
    updateMaterial,
    deleteMaterial,
  };
};
