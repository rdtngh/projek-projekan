import api from "./api";

const mapToApiPayload = (payload) => ({
  employee_number: payload.userId,
  name: payload.user,
  department: payload.department,
  role: payload.role,
});

const mapFromApiResponse = (user) => ({
  id: user.id,
  user: user.user,
  userId: user.userId,
  department: user.department,
  role: user.role,
});

export const getAllUsers = async () => {
  const response = await api.get("/users");
  return response.data?.data?.map(mapFromApiResponse) ?? [];
};

export const createUser = async (payload) => {
  await api.post("/users", mapToApiPayload(payload));
};

export const updateUser = async (id, payload) => {
  await api.put(`/users/${id}`, mapToApiPayload(payload));
};

export const deleteUser = async (id) => {
  await api.delete(`/users/${id}`);
};
