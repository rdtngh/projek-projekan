import DashboardLayout from "../../components/dashboard/DashboardLayout";
import MaterialListCard from "../../components/employee/MaterialListCard";
import PreTestRequiredDialog from "../../components/employee/PreTestRequiredDialog";
import "./EmployeeMaterials.css";

// Bentuk data ini mengikuti response API agar mudah diganti saat backend siap.
const EMPLOYEE_MATERIAL_RESPONSE = {
  training: {
    id: 1,
    title: "Pelatihan Keselamatan Pasien",
    pre_test_completed: false,
    all_material_completed: false,
  },
  materials: [
    { id: 1, title: "Materi 1", completed: true },
    { id: 2, title: "Materi 2", completed: true },
    { id: 3, title: "Materi 3", completed: false },
    { id: 4, title: "Materi 4", completed: false },
    { id: 5, title: "Materi 5", completed: false },
    { id: 6, title: "Materi 6", completed: true },
    { id: 7, title: "Materi 7", completed: true },
    { id: 8, title: "Materi 8", completed: false },
    { id: 9, title: "Materi 9", completed: false },
    { id: 10, title: "Materi 10", completed: false },
  ],
};

function EmployeeMaterials({ data = EMPLOYEE_MATERIAL_RESPONSE }) {
  const preTestCompleted = Boolean(data.training?.pre_test_completed);

  return (
    <DashboardLayout role="employee">
      <div className="employee-material-page">
        <MaterialListCard
          materials={data.materials ?? []}
          disabled={!preTestCompleted}
        />
      </div>

      {!preTestCompleted && <PreTestRequiredDialog />}
    </DashboardLayout>
  );
}

export default EmployeeMaterials;
