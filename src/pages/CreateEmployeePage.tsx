import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createEmployee, type CreateEmployeePayload } from "../api/employees";
import { toast } from "react-toastify";

function CreateEmployeePage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<CreateEmployeePayload>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    designation: "",
    joiningDate: "",
    employmentType: "FULL_TIME",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    try {
      const result = await createEmployee(formData);

      if (result.success) {
        navigate("/employees");
        toast.success("Employee created successfully.");
      }
    } catch (error) {
      console.error("Failed to create employee:", error);
      toast.error("Failed to create employee");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Add New Employee</h2>
        <p className="mt-1 text-sm text-gray-500">
          Fill in the employee details below to create a new profile.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              placeholder="John"
              value={formData.firstName}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  firstName: event.target.value,
                })
              }
              className="mt-1.5 block w-full rounded-md border border-gray-300 px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Doe"
              value={formData.lastName}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  lastName: event.target.value,
                })
              }
              className="mt-1.5 block w-full rounded-md border border-gray-300 px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              placeholder="john.doe@example.com"
              value={formData.email}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  email: event.target.value,
                })
              }
              className="mt-1.5 block w-full rounded-md border border-gray-300 px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  phone: event.target.value,
                })
              }
              className="mt-1.5 block w-full rounded-md border border-gray-300 px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Designation
            </label>
            <input
              type="text"
              placeholder="Software Engineer"
              value={formData.designation}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  designation: event.target.value,
                })
              }
              className="mt-1.5 block w-full rounded-md border border-gray-300 px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Joining Date
            </label>
            <input
              type="date"
              value={formData.joiningDate}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  joiningDate: event.target.value,
                })
              }
              className="mt-1.5 block w-full rounded-md border border-gray-300 px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Employment Type
          </label>
          <select
            value={formData.employmentType}
            onChange={(event) =>
              setFormData({
                ...formData,
                employmentType: event.target
                  .value as CreateEmployeePayload["employmentType"],
              })
            }
            className="mt-1.5 block w-full rounded-md border border-gray-300 px-3.5 py-2 text-sm text-gray-900 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
          >
            <option value="FULL_TIME">Full Time</option>
            <option value="PART_TIME">Part Time</option>
            <option value="CONTRACT">Contract</option>
            <option value="INTERN">Intern</option>
          </select>
        </div>

        <div className="pt-3">
          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-indigo-400"
          >
            {loading ? (
              <>
                <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Creating...
              </>
            ) : (
              "Create Employee"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateEmployeePage;
