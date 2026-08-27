import { useState } from "react";
import { registerCompany } from "../api/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Ripples from "react-ripples";

const SafeRipples = Ripples as React.ComponentType<any>;

function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    companyName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState<{
    companyName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const validate = () => {
    const newErrors: {
      companyName?: string;
      email?: string;
      password?: string;
      confirmPassword?: string;
    } = {};

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Company name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear the field error while typing
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      const response = await registerCompany({
        companyName: formData.companyName.trim(),
        email: formData.email.trim(),
        password: formData.password,
      });

      if (response.success) {
        toast.success(response.message);

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error: any) {
      console.error("Registration failed:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to register company."
      );
    } finally {
      setLoading(false);
    }
  };

return (
  <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-400 via-teal-500 to-emerald-600 p-6 sm:p-12 transition-all duration-500 overflow-hidden">
    

    <div 
      className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none"
      style={{
        backgroundImage: `url('https://www.image2url.com/r2/default/images/1787160173091-abcee5eb-16c0-4139-8637-f55e79f09b55.png')`,
      }}
    />


    <div className="relative z-10 flex w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl min-h-[550px] transition-all duration-300 hover:shadow-teal-900/20">


      <div className="flex w-full flex-col items-center justify-center bg-[#fff] p-8 sm:p-12 md:w-1/2">
        <div className="w-full max-w-xs space-y-8">


         <div className="flex items-center justify-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 p-1.5 shadow-xs ring-1 ring-teal-500/10 transition-transform duration-300 hover:scale-105">
            <img 
              src="https://www.image2url.com/r2/default/images/1787239332865-2edc4dd1-17a6-49a8-8f65-394a957ccbd9.png" 
              alt="Crew Desk HR Logo" 
              className="h-full w-full object-contain"
            />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            Crew Desk <span className="text-[#009689]">HR</span>
          </span>
        </div>

          <div>
            <h1 className="text-center text-2xl font-bold text-gray-900">
              Create your account
            </h1>

            <p className="mt-2 text-center text-sm text-gray-500">
              Register your company to get started.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >


            <div className="group relative">
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Company name"
                className={`block w-full border-b-2 py-2.5 text-sm font-semibold text-gray-800 placeholder-gray-400 transition-all duration-300 focus:outline-none ${
                  errors.companyName
                    ? "border-red-500"
                    : "border-gray-200 focus:border-teal-600"
                }`}
              />

              {errors.companyName && (
                <p className="mt-1 text-xs font-bold text-red-500 animate-pulse">
                  {errors.companyName}
                </p>
              )}
            </div>

            <div className="group relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="company@gmail.com"
                className={`block w-full border-b-2 py-2.5 text-sm font-semibold text-gray-800 placeholder-gray-400 transition-all duration-300 focus:outline-none ${
                  errors.email
                    ? "border-red-500"
                    : "border-gray-200 focus:border-teal-600"
                }`}
              />

              {errors.email && (
                <p className="mt-1 text-xs font-bold text-red-500 animate-pulse">
                  {errors.email}
                </p>
              )}
            </div>

            <div className="group relative">
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className={`block w-full border-b-2 py-2.5 text-sm font-semibold text-gray-800 placeholder-gray-400 transition-all duration-300 focus:outline-none ${
                  errors.password
                    ? "border-red-500"
                    : "border-gray-200 focus:border-teal-600"
                }`}
              />

              {errors.password && (
                <p className="mt-1 text-xs font-bold text-red-500 animate-pulse">
                  {errors.password}
                </p>
              )}
            </div>

            <div className="group relative">
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm password"
                className={`block w-full border-b-2 py-2.5 text-sm font-semibold text-gray-800 placeholder-gray-400 transition-all duration-300 focus:outline-none ${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-gray-200 focus:border-teal-600"
                }`}
              />

              {errors.confirmPassword && (
                <p className="mt-1 text-xs font-bold text-red-500 animate-pulse">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="flex justify-center pt-4">
              <SafeRipples
                  color="#ffffff27"
                  during={1200}
                  className="rounded-full overflow-hidden"
                >
 <button
                type="submit"
                disabled={loading}
                className="cursor-pointer rounded-full bg-teal-600 px-12 py-3 text-sm font-extrabold text-white shadow-lg shadow-teal-600/30 transition-all duration-300 hover:bg-teal-700 hover:shadow-xl hover:shadow-teal-600/40 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading
                  ? "Creating account.."
                  : "Create Account"}
              </button>

                </SafeRipples>
             
            </div>

            <div className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="cursor-pointer font-semibold text-teal-600 hover:text-teal-700"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="hidden w-1/2 items-center justify-center bg-[#fff] p-8 md:flex transition-all duration-300">
        <img
          src="https://www.image2url.com/r2/default/images/1786891265146-fb6c9cab-0ffa-4722-bea5-a16d797c966c.jpg"
          alt="Workspace Illustration"
          className="animate-pulse max-h-full w-full object-contain transition-transform duration-500 hover:scale-105"
        />
      </div>
    </div>
  </div>
);
}

export default SignupPage;