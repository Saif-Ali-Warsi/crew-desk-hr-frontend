import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getEmployeeById,
  updateEmployee,
  type CreateEmployeePayload,
} from "../api/employees";
import { toast } from "react-toastify";

function EditEmployeePage() {
  const { id } = useParams<{ id: string }>();
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

  const [loading, setLoading] = useState(true);

  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
    designation?: string;
    joiningDate?: string;
    employmentType?: string;
  }>({});

  const validate = () => {
    const newErrors: {
      firstName?: string;
      lastName?: string;
      email?: string;
      designation?: string;
      joiningDate?: string;
      employmentType?: string;
    } = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required.";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.designation.trim()) {
      newErrors.designation = "Designation is required.";
    }

    if (!formData.joiningDate) {
      newErrors.joiningDate = "Joining date is required.";
    }

    if (!formData.employmentType) {
      newErrors.employmentType = "Employment type is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchEmployee = async () => {
      try {
        const result = await getEmployeeById(id);

        if (result.success) {
          const employee = result.data;

          setFormData({
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            phone: employee.phone ?? "",
            designation: employee.designation,
            joiningDate: employee.joiningDate.split("T")[0],
            employmentType: employee.employmentType,
          });
        }
      } catch (error) {
        console.error("Failed to fetch employee:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!id || !validate()) {
      return;
    }

    setLoading(true);

    try {
      const result = await updateEmployee(id, {
        ...formData,
        joiningDate: new Date(`${formData.joiningDate}T00:00:00`).toISOString(),
      });

      if (result.success) {
        navigate(`/employees/${id}`);
        toast.success("Employee updated successfully")
      }
    } catch (error) {
      console.error("Failed to update employee:", error);
        toast.error("Failed to update employee")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">Edit Employee</h2>
        <p className="mt-1 text-sm text-gray-500">
          Fill in the employee details below to edit employee details.
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
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-1 ${
                errors.firstName
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-teal-500 focus:ring-teal-500"
              }`}
            />
            {errors.firstName && (
              <p className="text-xs text-red-600">{errors.firstName}</p>
            )}
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
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-1 ${
                errors.lastName
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-teal-500 focus:ring-teal-500"
              }`}
            />
            {errors.lastName && (
              <p className="text-xs text-red-600">{errors.lastName}</p>
            )}
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
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-1 ${
                errors.email
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-teal-500 focus:ring-teal-500"
              }`}
            />
            {errors.email && (
              <p className="text-xs text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="+1 (555) 000-0000 (Optional)"
              value={formData.phone}
              onChange={(event) =>
                setFormData({
                  ...formData,
                  phone: event.target.value,
                })
              }
              className="mt-1.5 block w-full rounded-md border border-gray-300 px-3.5 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
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
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-1 ${
                errors.designation
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-teal-500 focus:ring-teal-500"
              }`}
            />
            {errors.designation && (
              <p className="text-xs text-red-600">{errors.designation}</p>
            )}
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
              className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-1 ${
                errors.joiningDate
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-teal-500 focus:ring-teal-500"
              }`}
            />
            {errors.joiningDate && (
              <p className="text-xs text-red-600">{errors.joiningDate}</p>
            )}
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
            className={`mt-1 block w-full rounded-md border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-1 ${
              errors.employmentType
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:border-teal-500 focus:ring-teal-500"
            }`}
          >
            <option value="FULL_TIME">Full Time</option>
            <option value="PART_TIME">Part Time</option>
            <option value="CONTRACT">Contract</option>
            <option value="INTERN">Intern</option>
          </select>
          {errors.employmentType && (
            <p className="text-xs text-red-600">{errors.employmentType}</p>
          )}
        </div>

        <div className="pt-3">
          <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center rounded-md border border-transparent bg-teal-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-teal-400">
            {loading ? "Updating..." : "Update Employee"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditEmployeePage;
